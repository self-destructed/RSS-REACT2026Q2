import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { downloadCsv } from "./download-csv";
import { fetchCharacters } from "./fetch-characters";
import { toCsv, downloadFile } from "@shared/lib";
import type { Character } from "@shared/api";

vi.mock("./fetch-characters", () => ({ fetchCharacters: vi.fn() }));

vi.mock("@shared/lib", () => ({
  toCsv: vi.fn(),
  downloadFile: vi.fn(),
}));

const mockCharacters: Character[] = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth (C-137)", url: "" },
    location: { name: "Earth (Replacement)", url: "" },
    image: "",
    episode: [],
    url: "",
    created: "",
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth", url: "" },
    location: { name: "Earth", url: "" },
    image: "",
    episode: [],
    url: "",
    created: "",
  },
];

describe("downloadCsv", () => {
  beforeEach(() => {
    vi.mocked(fetchCharacters).mockResolvedValue(mockCharacters);
    vi.mocked(toCsv).mockReturnValue("csv,content");
    vi.mocked(downloadFile).mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("fetches characters by ids", async () => {
    await downloadCsv([1, 2]);

    expect(fetchCharacters).toHaveBeenCalledWith([1, 2]);
  });

  it("converts characters to CSV rows", async () => {
    vi.mocked(fetchCharacters).mockResolvedValue([mockCharacters[0]]);

    await downloadCsv([1]);

    expect(toCsv).toHaveBeenCalledWith(
      [
        {
          id: 1,
          name: "Rick Sanchez",
          status: "Alive",
          species: "Human",
          gender: "Male",
          origin: "Earth (C-137)",
          location: "Earth (Replacement)",
        },
      ],
      ["id", "name", "status", "species", "gender", "origin", "location"],
    );
  });

  it("includes count in filename", async () => {
    await downloadCsv([1, 2]);

    expect(downloadFile).toHaveBeenCalledWith(
      expect.objectContaining({ fileName: "2_items.csv" }),
    );
  });

  it("downloads CSV with correct type", async () => {
    vi.mocked(toCsv).mockReturnValue("id,name\n1,Rick");

    await downloadCsv([1]);

    expect(downloadFile).toHaveBeenCalledWith(
      expect.objectContaining({
        data: "id,name\n1,Rick",
        fileType: "text/csv",
      }),
    );
  });
});
