import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_SEO, ROUTE_SEO, SITE_URL } from "../config/seo";

function upsertMeta(selector, createAttrs, content) {
  if (!content) return;

  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    Object.entries(createAttrs).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
}

function upsertJsonLd(data) {
  const id = "structured-data";
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

export default function SEO({
  title,
  description,
  path,
  type = "website",
  image = DEFAULT_SEO.image,
  noIndex = false,
  jsonLd,
}) {
  const { pathname } = useLocation();
  const routeSeo = ROUTE_SEO[pathname] || DEFAULT_SEO;
  const pageTitle = title || routeSeo.title || DEFAULT_SEO.title;
  const pageDescription =
    description || routeSeo.description || DEFAULT_SEO.description;
  const cleanPath = path || pathname;
  const canonical = `${SITE_URL}${cleanPath === "/" ? "/" : cleanPath}`;
  const absoluteImage = image?.startsWith("http")
    ? image
    : `${SITE_URL}${image?.startsWith("/") ? image : `/${image}`}`;

  useEffect(() => {
    document.documentElement.lang = "pt-BR";
    document.title = pageTitle;

    upsertCanonical(canonical);
    upsertMeta('meta[name="description"]', { name: "description" }, pageDescription);
    upsertMeta(
      'meta[name="robots"]',
      { name: "robots" },
      noIndex ? "noindex, nofollow" : "index, follow"
    );

    upsertMeta('meta[property="og:type"]', { property: "og:type" }, type);
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name" }, "Fuerza Seguros");
    upsertMeta('meta[property="og:locale"]', { property: "og:locale" }, "pt_BR");
    upsertMeta('meta[property="og:title"]', { property: "og:title" }, pageTitle);
    upsertMeta(
      'meta[property="og:description"]',
      { property: "og:description" },
      pageDescription
    );
    upsertMeta('meta[property="og:url"]', { property: "og:url" }, canonical);
    upsertMeta('meta[property="og:image"]', { property: "og:image" }, absoluteImage);

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, pageTitle);
    upsertMeta(
      'meta[name="twitter:description"]',
      { name: "twitter:description" },
      pageDescription
    );
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, absoluteImage);

    upsertJsonLd(
      jsonLd || {
        "@context": "https://schema.org",
        "@type": "InsuranceAgency",
        name: "Fuerza Seguros",
        url: SITE_URL,
        description: DEFAULT_SEO.description,
      }
    );
  }, [absoluteImage, canonical, jsonLd, noIndex, pageDescription, pageTitle, type]);

  return null;
}
