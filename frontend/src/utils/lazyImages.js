export function addLazyLoadingToHtml(html = "") {
  if (!html || typeof document === "undefined") return html;

  const template = document.createElement("template");
  template.innerHTML = html;

  template.content.querySelectorAll("img").forEach((img) => {
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }

    if (!img.hasAttribute("decoding")) {
      img.setAttribute("decoding", "async");
    }
  });

  return template.innerHTML;
}
