import API_URL from "../config/api";

export function attachmentUrl(id) {
  return `${API_URL}/api/attachments/${id}`;
}

export function optimizedAttachmentUrl(id, { width = 900, quality = 72 } = {}) {
  return `${API_URL}/api/attachments/${id}/optimized?w=${width}&q=${quality}`;
}
