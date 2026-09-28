/** File formats the application can safely export from in-memory content. */
export const DOWNLOAD_FORMATS = {
  txt: { label: 'Plain text (.txt)', mimeType: 'text/plain;charset=utf-8' },
  csv: { label: 'Spreadsheet (.csv)', mimeType: 'text/csv;charset=utf-8' },
  json: { label: 'JSON data (.json)', mimeType: 'application/json' },
} as const;

export type DownloadFormat = keyof typeof DOWNLOAD_FORMATS;

/**
 * Downloads in-memory content with a sanitized filename and a constrained format.
 * Custom formats can be added to `DOWNLOAD_FORMATS` with an explicit MIME type.
 * @param content Text or a Blob to save.
 * @param filename Desired filename; path separators and unsafe characters are removed.
 * @param format A supported key from `DOWNLOAD_FORMATS`.
 */
export function downloadFile(content: string | Blob, filename: string, format: DownloadFormat): void {
  const { mimeType } = DOWNLOAD_FORMATS[format];
  const safeName = filename.replace(/[\\/:*?"<>|\u0000-\u001f]/g, '_').replace(/\.+$/g, '').slice(0, 120) || 'download';
  const extension = `.${format}`;
  const baseName = safeName.toLowerCase().endsWith(extension) ? safeName.slice(0, -extension.length) : safeName;
  const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${baseName}${extension}`;
  anchor.rel = 'noopener';
  anchor.style.display = 'none';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
