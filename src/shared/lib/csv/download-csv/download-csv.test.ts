import { beforeEach, describe, expect, it, vi } from "vitest";
import { downloadFile } from "../download-file";
import { toCSV } from "../to-csv";
import { downloadCSV } from "./download-csv";

vi.mock("../to-csv");

vi.mock("../download-file");

const mockToCSV = vi.mocked(toCSV);
const mockDownloadFile = vi.mocked(downloadFile);

beforeEach(() => {
  vi.clearAllMocks();
  mockToCSV.mockReturnValue("header\nvalue");
});

describe("downloadCSV", () => {
  it("calls toCSV with data and columns", () => {
    const data = [{ id: 1, name: "test" }];
    const columns = ["id", "name"] as const;
    const fileName = "test.csv";

    downloadCSV(data, columns, fileName);

    expect(mockToCSV).toHaveBeenCalledWith(data, columns);
  });

  it("calls downloadFile with csv string and fileName", () => {
    const data = [{ id: 1, name: "test" }];
    const columns = ["id", "name"] as const;
    const fileName = "test.csv";

    downloadCSV(data, columns, fileName);

    expect(mockDownloadFile).toHaveBeenCalledWith({
      data: "header\nvalue",
      fileName: "test.csv",
      fileType: "text/csv",
    });
  });
});
