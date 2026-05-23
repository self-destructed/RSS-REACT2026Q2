interface DownloadFileOptions {
  data: BlobPart;
  fileName: string;
  fileType: string;
}

export function downloadFile({
  data,
  fileName,
  fileType,
}: DownloadFileOptions): void {
  const blob = new Blob([data], { type: fileType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.download = fileName;
  a.href = url;

  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  a.dispatchEvent(clickEvt);
  a.remove();
  URL.revokeObjectURL(url);
}
