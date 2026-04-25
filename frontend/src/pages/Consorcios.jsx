import { useEffect, useState, useRef } from "react";
import BlogCard from "../components/ui/BlogCard";
import API_URL from "../config/api";
import DEFAULT_THUMBNAIL from "../assets/images/default-thumbnail.png";
import CotacaoSection from "../components/ui/CotacaoSection";
import { optimizedAttachmentUrl } from "../utils/attachmentUrls";

export default function Consorcios() {
  const [posts, setPosts] = useState([]);
  const [cotacaoSelection, setCotacaoSelection] = useState(null);
  const cotacaoRef = useRef(null);

  // Mantém o fundo azul igual ao HeroSection
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#1A365D";
    return () => (document.body.style.backgroundColor = prev);
  }, []);

  useEffect(() => {
    const fetchConsorciosOrdenados = async () => {
      const tagConsorcio = "consórcio";

      const norm = (s = "") =>
        s
          .toString()
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

      try {
        const postsRes = await fetch(`${API_URL}/api/blog`);
        const postsData = await postsRes.json();

        const postsById = {};
        postsData.forEach((p) => (postsById[p._id] = p));

        const orderRes = await fetch(
          `${API_URL}/api/post-order/${tagConsorcio}`
        );

        let orderedPostIds = [];
        if (orderRes.ok) {
          const orderData = await orderRes.json();
          orderedPostIds = Array.isArray(orderData.orderedPostIds)
            ? orderData.orderedPostIds
            : [];
        }

        const isConsorcioPost = (p) =>
          p &&
          p.active === "y" &&
          Array.isArray(p.tags) &&
          p.tags.map(norm).includes(norm(tagConsorcio));

        const ordered = orderedPostIds
          .map((id) => postsById[id])
          .filter(isConsorcioPost);

        const fallback = postsData.filter(isConsorcioPost);

        const finalList = ordered.length > 0 ? ordered : fallback;

        const mapped = finalList.map((post) => ({
          _id: post._id,
          image: post.cover
            ? optimizedAttachmentUrl(post.cover, { width: 640, quality: 70 })
            : DEFAULT_THUMBNAIL,
          category: post.tags?.[0] || "consórcio",
          title: post.title || "sem título",
          excerpt:
            post.htmlContent
              ?.replace(/<img[^>]*>/gi, "")
              .replace(/<[^>]+>/g, "")
              .slice(0, 120) + "…" || "",
          author: post.author || "Equipe Fuerza",
          date: post.createdAt
            ? new Date(post.createdAt).toLocaleDateString("pt-BR")
            : "",
        }));

        setPosts(mapped);
      } catch (err) {
        console.error("Erro ao buscar posts de consórcios:", err);
      }
    };

    fetchConsorciosOrdenados();
  }, []);

  // Scroll suave + preselect
  const goToCotacao = (type = null) => {
    setCotacaoSelection(type);

    if (type) localStorage.setItem("cotacao_preselect", type);
    else localStorage.removeItem("cotacao_preselect");

    cotacaoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full min-h-screen bg-[#1A365D] overflow-x-hidden">

      {/* HERO — estilo igual ao HeroSection */}
      <section className="w-full bg-[#1A365D] text-white pt-28 md:pt-32">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row md:items-center gap-10">
          <div className="flex flex-col max-w-xl text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-wide leading-tight">
              FUERZA <br />
              <span className="text-fuerza-laranja font-bold">CONSÓRCIOS</span>
            </h1>

            <p className="mt-4 text-sm md:text-base text-white/80 tracking-wide">
              Descubra a forma mais inteligente de conquistar seus objetivos.
              Com nosso consórcio, você tem acesso a crédito sem juros,
              com taxas e parcelas que cabem no seu orçamento.
            </p>

            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">

              {/* 👉 Agora pré-seleciona consorcio */}
              <button
                onClick={() => goToCotacao("consorcio")}
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
        <h2 className="text-sm font-semibold text-[#1A365D] uppercase tracking-[0.25em]">
          Nossos produtos de
        </h2>
        <p className="text-3xl font-bold text-fuerza-laranja tracking-wide mt-1 uppercase">
          Consórcio
        </p>
        <p className="mt-4 text-gray-600 text-sm md:text-base tracking-wide max-w-2xl mx-auto">
          Escolha o consórcio ideal para suas necessidades.
          Temos soluções para diversas finalidades.
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
          Você pode utilizar um consórcio para realizar todo tipo de sonhos:
          cirurgias, viagens, cursos, formaturas, imóveis, veículos, barcos…
          <br /><br />
          Fale com nossos especialistas e consulte possibilidades e planos.
        </p>
      </section>

      {/* COTAÇÃO */}
      <section
        ref={cotacaoRef}
        id="cotacao"
        className="w-full bg-[#1A365D] py-16 text-center px-6"
      >
        <h3 className="text-white text-xl md:text-2xl font-bold tracking-wide uppercase">
          Pronto para começar?
        </h3>

        <p className="text-white/80 mt-3 text-sm md:text-base tracking-wide max-w-2xl mx-auto">
          Simule sem compromisso e descubra qual consórcio é ideal para você.
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
