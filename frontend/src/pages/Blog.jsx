import { useEffect, useState } from "react";
import BlogCard from "../components/ui/BlogCard";
import API_URL from "../config/api";
import DEFAULT_THUMBNAIL from "../assets/images/default-thumbnail.png";
import { optimizedAttachmentUrl } from "../utils/attachmentUrls";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  // fundo azul igual aos outros
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#1A365D";
    return () => (document.body.style.backgroundColor = prev);
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`${API_URL}/api/blog`);
        const data = await res.json();

        const mapped = data
          .filter((post) => post.active === "y")
          .map((post) => ({
            ...post,
            image: post.cover
              ? optimizedAttachmentUrl(post.cover, { width: 640, quality: 70 })
              : DEFAULT_THUMBNAIL,
            category: post.tags?.[0]?.toLowerCase() || "blog",
            title: post.title || "Sem título",
            excerpt:
              post.htmlContent
                ?.replace(/<img[^>]*>/gi, "")
                .replace(/<[^>]+>/g, "")
                .slice(0, 150) + "…" || "",
            author: post.author || "Equipe Fuerza",
            date: post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("pt-BR")
              : "",
          }));

        setPosts(mapped);
      } catch (err) {
        console.error("Erro ao buscar posts:", err);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-[#1A365D]">

      {/* HERO */}
      <section className="w-full text-white pt-28 md:pt-32">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-wide leading-tight">
            FUERZA <br />
            <span className="text-fuerza-laranja font-bold">BLOG</span>
          </h1>

          <p className="mt-4 text-sm md:text-base text-white/80 max-w-xl mx-auto tracking-wide">
            Conteúdos exclusivos sobre seguros, consórcios, investimentos e muito mais.
            Atualizações, dicas e informações produzidas pela equipe Fuerza.
          </p>
        </div>
      </section>

      {/* SEÇÃO BRANCA – LISTA DE POSTS */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          
          {/* TITULO */}
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1A365D]">
              Explore
            </h2>

            <p className="text-3xl md:text-4xl font-bold text-fuerza-laranja tracking-wide mt-1 uppercase">
              Últimos Artigos
            </p>

            <p className="text-gray-600 text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              Veja os conteúdos mais recentes produzidos por nossa equipe.
              Aprenda, se informe e acompanhe o melhor do mercado.
            </p>
          </div>

          {/* GRID */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard post={post} key={post._id} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
