import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { downloadFile } from "./download-file";

let createObjectURL: ReturnType<typeof vi.fn>;
let revokeObjectURL: ReturnType<typeof vi.fn>;

beforeEach(() => {
  createObjectURL = vi
    .spyOn(URL, "createObjectURL")
    .mockReturnValue("blob:test") as never;
  revokeObjectURL = vi
    .spyOn(URL, "revokeObjectURL")
    .mockImplementation(() => {}) as never;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("downloadFile", () => {
  it("creates Blob with correct type", () => {
    const blob = vi.spyOn(globalThis, "Blob" as never);

    downloadFile({ data: "a,b,c", fileName: "f.csv", fileType: "text/csv" });

    expect(blob).toHaveBeenCalledWith(["a,b,c"], { type: "text/csv" });
  });

  it("creates object URL from Blob", () => {
    downloadFile({ data: "test", fileName: "f.csv", fileType: "text/csv" });

    expect(createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
  });

  it("dispatches click on anchor element", () => {
    const dispatch = vi.spyOn(
      HTMLAnchorElement.prototype,
      "dispatchEvent",
    ) as never;

    downloadFile({ data: "test", fileName: "f.csv", fileType: "text/csv" });

    expect(dispatch).toHaveBeenCalled();
  });

  it("removes anchor element after click", () => {
    const remove = vi.spyOn(HTMLAnchorElement.prototype, "remove") as never;

    downloadFile({ data: "test", fileName: "f.csv", fileType: "text/csv" });

    expect(remove).toHaveBeenCalled();
  });

  it("revokes object URL", () => {
    downloadFile({ data: "test", fileName: "f.csv", fileType: "text/csv" });

    expect(revokeObjectURL).toHaveBeenCalledWith("blob:test");
  });
});
