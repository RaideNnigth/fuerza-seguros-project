import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../../config/api";

import Carousel from "./Carousel";
import RelatedPosts from "./RelatedPosts";
import CotacaoSection from "./CotacaoSection";

export default function ArticleView() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`${API_URL}/api/blog/${slug}`);
        const data = await res.json();

        setArticle({
          _id: data._id,
          title: data.title,
          html: data.htmlContent,
          category: data.tags?.[0] || "Blog",
          date: new Date(data.createdAt).toLocaleDateString("pt-BR"),
          author: data.author || "Equipe Fuerza",
          headings: [],
          images: [],
        });
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar artigo:", err);
        setLoading(false);
      }
    }

    fetchArticle();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="text-center py-20 text-slate-600">Carregando...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="max-w-2xl mx-auto p-10 text-center bg-white rounded-2xl shadow-lg border border-slate-100">
          <h1 className="text-2xl font-bold mb-4 text-slate-900">
            Artigo não encontrado
          </h1>
          <p className="text-slate-600">
            Verifique a URL ou retorne ao{" "}
            <a className="text-blue-600 underline" href="/blog">
              blog
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white pt-24 md:pt-28">
      {/* estilos locais pra render ficar igual ao TipTap/gerenciador */}
      <style>
        {`
          .article-html {
            font-size: 1rem;
            line-height: 1.7;
            color: #0f172a;
          }

          .article-html p {
            margin-bottom: 1em;
            font-family: "Times New Roman", Times, serif;
            font-size: 1.05rem;
            line-height: 1.75;
            text-align: justify;
            color: #334155;
          }

          .article-html h1 {
            font-size: 2.2rem;
            font-weight: 800;
            margin: 1.3em 0 0.7em 0;
            line-height: 1.1;
            font-family: "Novecento", ui-sans-serif, system-ui;
            color: #0f172a;
          }

          .article-html h2 {
            font-size: 1.5rem;
            font-weight: 700;
            margin: 1.2em 0 0.7em 0;
            line-height: 1.2;
            font-family: "Novecento", ui-sans-serif, system-ui;
            color: #0f172a;
          }

          .article-html h3 {
            font-size: 1.17rem;
            font-weight: 600;
            margin: 1.1em 0 0.5em 0;
            line-height: 1.2;
            font-family: "Novecento", ui-sans-serif, system-ui;
            color: #0f172a;
          }

          .article-html strong { font-weight: bold; color: #0f172a; }
          .article-html em { font-style: italic; }

          .article-html a {
            text-decoration: underline;
            color: #1A365D;
            font-weight: 600;
          }

          .article-html ul, .article-html ol {
            padding-left: 1.5em;
            margin-bottom: 1em;
          }

          .article-html li {
            margin: 0.25em 0;
            font-family: "Times New Roman", Times, serif;
            color: #334155;
          }

          .article-html table {
            width: 100%;
            border-collapse: collapse;
            margin: 1em 0;
            background: #f8fafc;
            border-radius: 8px;
            overflow: hidden;
            font-size: 0.95rem;
          }
          .article-html th, .article-html td {
            border: 1px solid #e2e8f0;
            padding: 8px 12px;
            text-align: left;
            vertical-align: top;
          }
          .article-html th {
            background: #f1f5f9;
            font-weight: bold;
          }

          .article-html img {
            max-width: 100%;
            height: auto;
            border-radius: 12px;
            margin: 1.2em auto;
            display: block;
            box-shadow: 0 4px 8px rgba(0,0,0,0.08);
          }

          .article-html blockquote {
            border-left: 4px solid #F97316;
            padding-left: 1rem;
            font-style: italic;
            color: #475569;
            margin: 1em 0;
          }
        `}
      </style>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Header clean */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            {article.title}
          </h1>

          <div className="mt-3 text-sm text-slate-600 flex flex-wrap items-center justify-center gap-2">
            <span className="italic">Por {article.author}</span>
            <span className="opacity-60">•</span>
            <span>{article.date}</span>
            <span className="opacity-60">•</span>
            <span className="uppercase font-semibold tracking-widest text-[#1A365D]">
              {article.category}
            </span>
          </div>

          <div className="mt-6 h-[2px] w-16 bg-[#F97316] mx-auto rounded-full" />
        </header>

        {/* Índice (se existir) */}
        {article.headings.length > 0 && (
          <nav className="mb-8 bg-white p-5 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-sm font-bold mb-2 text-slate-800 uppercase tracking-wider">
              Índice
            </h2>
            <ul className="list-disc list-inside text-sm text-[#1A365D] space-y-1">
              {article.headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="hover:underline">
                    {h.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Carousel (se existir) */}
        {article.images.length > 0 && (
          <div className="mb-8">
            <Carousel images={article.images} />
          </div>
        )}

        {/* Conteúdo HTML no mesmo estilo do gerenciador */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
          <div
            className="article-html"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />
        </section>
      </article>

      {/* RelatedPosts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 bg-white">
        <RelatedPosts category={article.category} currentId={article._id} />
      </section>

      {/* Cotação */}
      <section className="bg-white pb-12">
        <CotacaoSection />
      </section>
    </div>
  );
}
