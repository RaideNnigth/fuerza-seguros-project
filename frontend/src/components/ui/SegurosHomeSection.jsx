import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../../config/api";
import DEFAULT_THUMBNAIL from "../../assets/images/default-thumbnail.png";

export default function SegurosHomeSection() {
  const [seguros, setSeguros] = useState([]);

  useEffect(() => {
    const fetchSegurosOrdenados = async () => {
      const tagHomeSeguro = "home page seguro";

      try {
        // 1. Buscar todos os posts
        const postsRes = await fetch(`${API_URL}/api/blog`);
        const postsData = await postsRes.json();

        // 2. Criar dicionário de posts por ID
        const postsById = {};
        postsData.forEach((p) => {
          postsById[p._id] = p;
        });

        // 3. Buscar ordem salva da tag
        const orderRes = await fetch(`${API_URL}/api/post-order/${tagHomeSeguro}`);
        let orderedPostIds = [];

        if (orderRes.ok) {
          const orderData = await orderRes.json();
          orderedPostIds = Array.isArray(orderData.orderedPostIds)
            ? orderData.orderedPostIds
            : [];
        }

        // helper: verificar se o post contém a tag única
        const hasTagHomeSeguro = (p) => {
          const tags = Array.isArray(p.tags)
            ? p.tags.map((t) => t.toLowerCase().trim())
            : [];
          return tags.includes(tagHomeSeguro);
        };

        // 4. Lista ordenada
        const ordered = orderedPostIds
          .map((id) => postsById[id])
          .filter((p) => p && p.active === "y" && hasTagHomeSeguro(p));

        // 5. Fallback
        const fallback = postsData.filter(
          (p) => p.active === "y" && hasTagHomeSeguro(p)
        );

        // 6. Limitar a 2
        const finalList = (ordered.length > 0 ? ordered : fallback).slice(0, 2);

        // 7. Mapear campos
        const mapped = finalList.map((post) => ({
          ...post,
          image: post.cover
            ? `${API_URL}/api/attachments/${post.cover}`
            : DEFAULT_THUMBNAIL,
          category: post.tags?.[0]?.toLowerCase() || "blog",
          title: post.title || "sem título",
          excerpt: post.htmlContent
            ? post.htmlContent.replace(/<[^>]+>/g, "").slice(0, 180) + "..."
            : "",
          author: post.author || "Equipe Fuerza",
          date: post.createdAt
            ? new Date(post.createdAt).toLocaleDateString("pt-BR")
            : "",
        }));

        setSeguros(mapped);
      } catch (err) {
        console.error("Erro ao carregar seguros:", err);
      }
    };

    fetchSegurosOrdenados();
  }, []);

  return (
    <section className="bg-white py-14">
      <div className="max-w-6xl mx-auto px-4">

        {/* TÍTULO PADRONIZADO */}
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-gray-400">
            Conheça alguns dos nossos
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 uppercase">
            nossos <span className="text-fuerza-laranja">seguros</span>
          </h2>
        </div>

        {/* LISTA DE SEGUROS */}
        <div className="flex flex-col gap-10">
          {seguros.map((post, idx) => {
            const reverse = idx % 2 === 1; // alterna layout igual ao print

            return (
              <div
                key={post._id}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  reverse ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Texto */}
                <div className="w-full md:w-1/2">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <Link
                    to={`/blog/${post._id}`}
                    className={`inline-flex items-center px-4 py-2 rounded-md text-white text-xs font-semibold uppercase tracking-wide transition ${
                      reverse
                        ? "bg-fuerza-laranja hover:bg-orange-500"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    Solicite uma cotação
                  </Link>
                </div>

                {/* Imagem */}
                <div className="w-full md:w-1/2">
                  <div className="rounded-xl overflow-hidden shadow-md">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-[220px] md:h-[260px] object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
