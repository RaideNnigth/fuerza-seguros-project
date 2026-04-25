import API_URL from "../config/api";

export function attachmentUrl(id) {
  return `${API_URL}/api/attachments/${id}`;
}

export function optimizedAttachmentUrl(id, { width = 900, quality = 72 } = {}) {
  return `${API_URL}/api/attachments/${id}/optimized?w=${width}&q=${quality}`;
}

export function optimizeAttachmentImagesInHtml(html = "", options = {}) {
  const { width = 1200, quality = 75 } = options;

  return html.replace(
    /\/api\/attachments\/([a-f\d]{24})(?!\/optimized)(?=["'?&\s>])/gi,
    `/api/attachments/$1/optimized?w=${width}&q=${quality}`
  );
}
