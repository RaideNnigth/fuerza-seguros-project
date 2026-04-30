export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://www.fuerzaseguros.com.br"
).replace(/\/$/, "");

export const DEFAULT_SEO = {
  title: "Fuerza Seguros | Seguros, consorcios e solucoes imobiliarias",
  description:
    "Consultoria especializada em seguros, consorcios e solucoes imobiliarias, com atendimento humanizado para proteger sua vida, empresa e patrimonio.",
  image: "/logo.svg",
};

export const ROUTE_SEO = {
  "/": {
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
  },
  "/seguros": {
    title: "Seguros | Fuerza Seguros",
    description:
      "Conheca solucoes em seguros para vida, veiculos, empresas, residencias, condominios, viagem, equipamentos e patrimonio.",
  },
  "/consorcios": {
    title: "Consorcios | Fuerza Seguros",
    description:
      "Planos de consorcio para conquistar imoveis, veiculos e outros objetivos com planejamento, taxas competitivas e suporte especializado.",
  },
  "/solucoes-imobiliarias": {
    title: "Solucoes Imobiliarias | Fuerza Seguros",
    description:
      "Solucoes para compra, credito, financiamento e planejamento imobiliario com consultoria dedicada.",
  },
  "/blog": {
    title: "Blog | Fuerza Seguros",
    description:
      "Artigos e dicas sobre seguros, consorcios, solucoes imobiliarias e protecao patrimonial.",
  },
};
