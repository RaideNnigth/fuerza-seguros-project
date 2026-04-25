import { useEffect, useState, useRef } from "react";
import BlogCard from "../components/ui/BlogCard";
import API_URL from "../config/api";
import DEFAULT_THUMBNAIL from "../assets/images/default-thumbnail.png";
import CotacaoSection from "../components/ui/CotacaoSection";
import { optimizedAttachmentUrl } from "../utils/attachmentUrls";

export default function SolucoesImobiliarias() {
  const [posts, setPosts] = useState([]);
  const [cotacaoSelection, setCotacaoSelection] = useState(null);
  const cotacaoRef = useRef(null);

  // fundo da página igual ao Hero
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#1A365D";
    return () => (document.body.style.backgroundColor = prev);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const tag = "solução imobiliária"; // <-- altere aqui se sua TAG for outra!

      const norm = (s = "") =>
        s
          .toString()
          .toLowerCase()
          .trim()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

      try {
        const res = await fetch(`${API_URL}/api/blog`);
        const data = await res.json();

        const postsById = {};
        data.forEach((p) => (postsById[p._id] = p));

        // buscar ordem salva
        const orderRes = await fetch(`${API_URL}/api/post-order/${tag}`);
        let orderedIds = [];

        if (orderRes.ok) {
          const orderData = await orderRes.json();
          orderedIds = Array.isArray(orderData.orderedPostIds)
            ? orderData.orderedPostIds
            : [];
        }

        const isImobiliaria = (p) =>
          p &&
          p.active === "y" &&
          Array.isArray(p.tags) &&
          p.tags.map(norm).includes(norm(tag));

        const ordered = orderedIds
          .map((id) => postsById[id])
          .filter(isImobiliaria);

        const fallback = data.filter(isImobiliaria);

        const finalList = ordered.length > 0 ? ordered : fallback;

        const mapped = finalList.map((post) => ({
          _id: post._id,
          image: post.cover
            ? optimizedAttachmentUrl(post.cover, { width: 640, quality: 70 })
            : DEFAULT_THUMBNAIL,
          category: post.tags?.[0] || "solução imobiliária",
          title: post.title || "Sem título",
          excerpt:
            post.htmlContent
              ?.replace(/<img[^>]*>/gi, "")
              .replace(/<[^>]+>/g, "")
              .slice(0, 160) + "…" || "",
          author: post.author || "Equipe Fuerza",
          date: post.createdAt
            ? new Date(post.createdAt).toLocaleDateString("pt-BR")
            : "",
        }));

        setPosts(mapped);
      } catch (err) {
        console.error("Erro ao buscar posts de soluções imobiliárias:", err);
      }
    };

    fetchPosts();
  }, []);

  // rolar pro formulário + pré-selecionar imobiliaria
  const goToCotacao = () => {
    setCotacaoSelection("imobiliaria");
    localStorage.setItem("cotacao_preselect", "imobiliaria");

    cotacaoRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#1A365D] overflow-x-hidden">

      {/* HERO */}
      <section className="w-full bg-[#1A365D] text-white pt-28 md:pt-32">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row md:items-center gap-10">
          <div className="flex flex-col max-w-xl text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-wide leading-tight">
              FUERZA <br />
              <span className="text-fuerza-laranja font-bold">SOLUÇÕES IMOBILIÁRIAS</span>
            </h1>

            <p className="mt-4 text-sm md:text-base text-white/80 tracking-wide">
              Realize seu sonho com estratégia, segurança e planejamento.
              Trabalhamos com ferramentas e suporte especializado para transformar
              seu objetivo imobiliário em realidade.
            </p>

            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
              <button
                onClick={goToCotacao}
                className="bg-fuerza-laranja px-6 py-2 rounded-md text-white font-semibold hover:bg-orange-500 transition tracking-wide uppercase"
              >
                Solicite uma cotação
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUTOS */}
      <section className="w-full bg-white text-center py-16">
        <h2 className="text-xs md:text-sm tracking-[0.25em] uppercase text-gray-500">
          Conheça nossas
        </h2>

        <p className="text-3xl md:text-4xl font-bold text-[#1A365D] mt-1 tracking-wide uppercase">
          Soluções <span className="text-fuerza-laranja">Imobiliárias</span>
        </p>

        <p className="mt-4 text-gray-600 text-sm md:text-base tracking-wide max-w-2xl mx-auto">
          Trabalhamos com crédito, planejamento financeiro e consultoria dedicada
          para facilitar a conquista do seu imóvel.
        </p>
      </section>

      {/* GRID */}
      <section className="w-full bg-white pb-16 px-6">
        <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard post={post} key={post._id} />
          ))}
        </div>
      </section>

      {/* OUTRAS FINALIDADES */}
      <section className="w-full bg-white text-center py-16">
        <h2 className="text-2xl font-semibold tracking-wide text-fuerza-laranja uppercase">
          Outras finalidades
        </h2>

        <p className="mt-4 text-gray-700 text-sm md:text-base tracking-wide max-w-3xl mx-auto leading-relaxed">
          Financiamento imobiliário • Refinanciamento • Consultoria de crédito •
          Planejamento de compra • Regularização de imóveis • Avaliação mercadológica
          e muito mais.
        </p>
      </section>

      {/* FORMULÁRIO */}
      <section
        ref={cotacaoRef}
        id="cotacao"
        className="w-full bg-[#1A365D] py-16 text-center px-6"
      >
        <h3 className="text-white text-xl md:text-2xl font-bold tracking-wide uppercase">
          Solicite sua cotação agora mesmo
        </h3>

        <p className="text-white/80 mt-3 text-sm md:text-base tracking-wide max-w-2xl mx-auto">
          Receba orientação especializada e encontre a solução perfeita para seu projeto.
        </p>

        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-xl">
            <CotacaoSection initialType={cotacaoSelection} />
          </div>
        </div>
      </section>

    </div>
  );
}
