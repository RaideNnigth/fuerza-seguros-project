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
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Header clean */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-['Novecento']">
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

        {/* Conteúdo HTML — Tailwind puro */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
          <div
            className="
              article-html font-sans text-slate-800 leading-relaxed text-base

              [&>p]:mb-4
              [&>p]:text-justify
              [&>p]:text-slate-700
              [&>p]:leading-relaxed

              [&>h1]:mt-8 [&>h1]:mb-4
              [&>h1]:text-3xl [&>h1]:sm:text-4xl
              [&>h1]:font-extrabold
              [&>h1]:leading-tight
              [&>h1]:font-['Novecento']
              [&>h1]:text-slate-900

              [&>h2]:mt-7 [&>h2]:mb-3
              [&>h2]:text-2xl [&>h2]:sm:text-3xl
              [&>h2]:font-bold
              [&>h2]:leading-snug
              [&>h2]:font-['Novecento']
              [&>h2]:text-slate-900

              [&>h3]:mt-6 [&>h3]:mb-2
              [&>h3]:text-xl [&>h3]:sm:text-2xl
              [&>h3]:font-semibold
              [&>h3]:leading-snug
              [&>h3]:font-['Novecento']
              [&>h3]:text-slate-900

              [&>strong]:font-bold
              [&_strong]:font-bold

              [&>em]:italic
              [&_em]:italic

              [&>a]:underline
              [&>a]:text-[#1A365D]
              [&>a]:font-semibold
              [&_a]:underline
              [&_a]:text-[#1A365D]
              [&_a]:font-semibold

              [&>ul]:pl-6 [&>ul]:list-disc [&>ul]:mb-4
              [&>ol]:pl-6 [&>ol]:list-decimal [&>ol]:mb-4
              [&>ul>li]:mb-1 [&>ol>li]:mb-1
              [&_li]:text-slate-700

              [&>blockquote]:border-l-4
              [&>blockquote]:border-[#F97316]
              [&>blockquote]:pl-4
              [&>blockquote]:italic
              [&>blockquote]:text-slate-600
              [&>blockquote]:my-4

              [&>table]:w-full
              [&>table]:border-collapse
              [&>table]:my-4
              [&>table]:text-sm
              [&>table]:bg-slate-50
              [&>table]:rounded-lg
              [&>table]:overflow-hidden

              [&>table_th]:bg-slate-100
              [&>table_th]:font-bold
              [&>table_th]:border
              [&>table_th]:border-slate-200
              [&>table_th]:px-3
              [&>table_th]:py-2

              [&>table_td]:border
              [&>table_td]:border-slate-200
              [&>table_td]:px-3
              [&>table_td]:py-2
              [&>table_td]:align-top

              [&>img]:max-w-full
              [&>img]:h-auto
              [&>img]:rounded-xl
              [&>img]:my-5
              [&>img]:mx-auto
              [&>img]:shadow
            "
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
