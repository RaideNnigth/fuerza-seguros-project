import { useEffect, useState, useRef } from "react";
import BlogCard from "../components/ui/BlogCard";
import API_URL from "../config/api";
import DEFAULT_THUMBNAIL from "../assets/images/default-thumbnail.png";
import CotacaoSection from "../components/ui/CotacaoSection";
import { optimizedAttachmentUrl } from "../utils/attachmentUrls";

export default function Seguros() {
  const [posts, setPosts] = useState([]);
  const [cotacaoSelection, setCotacaoSelection] = useState(null);
  const cotacaoRef = useRef(null);

  // fundo azul igual ao HeroSection
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#1A365D";
    return () => (document.body.style.backgroundColor = prev);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const tag = "seguro";

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

        // buscar ordem via API
        const orderRes = await fetch(`${API_URL}/api/post-order/${tag}`);
        let orderedIds = [];

        if (orderRes.ok) {
          const orderData = await orderRes.json();
          orderedIds = Array.isArray(orderData.orderedPostIds)
            ? orderData.orderedPostIds
            : [];
        }

        const isSeguro = (p) =>
          p &&
          p.active === "y" &&
          Array.isArray(p.tags) &&
          p.tags.map(norm).includes(norm(tag));

        const ordered = orderedIds
          .map((id) => postsById[id])
          .filter(isSeguro);

        const fallback = data.filter(isSeguro);

        const finalList = ordered.length > 0 ? ordered : fallback;

        // mapar pro componente
        const mapped = finalList.map((post) => ({
          _id: post._id,
          image: post.cover
            ? optimizedAttachmentUrl(post.cover, { width: 640, quality: 70 })
            : DEFAULT_THUMBNAIL,
          category: post.tags?.[0] || "seguro",
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
        console.error("Erro ao buscar posts de seguros:", err);
      }
    };

    fetchPosts();
  }, []);

  // lógica de rolagem + pré-seleção SEGURO
  const goToCotacao = () => {
    setCotacaoSelection("seguro");
    localStorage.setItem("cotacao_preselect", "seguro");

    cotacaoRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#1A365D] overflow-x-hidden">

      {/* HERO IGUAL AO DE CONSÓRCIOS */}
      <section className="w-full bg-[#1A365D] text-white pt-28 md:pt-32">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row md:items-center gap-10">
          <div className="flex flex-col max-w-xl text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-wide leading-tight">
              FUERZA <br />
              <span className="text-fuerza-laranja font-bold">SEGUROS</span>
            </h1>

            <p className="mt-4 text-sm md:text-base text-white/80 tracking-wide">
              Consultoria especializada para identificar a melhor estratégia de
              proteção para sua vida, empresa ou patrimônio, com atendimento 
              humanizado e soluções completas.
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
          Soluções em <span className="text-fuerza-laranja">Seguros</span>
        </p>

        <p className="mt-4 text-gray-600 text-sm md:text-base tracking-wide max-w-2xl mx-auto">
          Soluções completas para proteção pessoal, empresarial e patrimonial.
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
          Outros produtos
        </h2>

        <p className="mt-4 text-gray-700 text-sm md:text-base tracking-wide max-w-3xl mx-auto leading-relaxed">
          Seguro Agrícola • Responsabilidade Civil • Transportes e Cargas •
          Seguro Garantia • Riscos de Engenharia • Frota de Veículos •
          Equipamentos • Empresarial • Condominial e muito mais.
        </p>
      </section>

      {/* COTAÇÃO */}
      <section
        ref={cotacaoRef}
        id="cotacao"
        className="w-full bg-[#1A365D] py-16 text-center px-6"
      >
        <h3 className="text-white text-xl md:text-2xl font-bold tracking-wide uppercase">
          Solicite sua cotação agora mesmo
        </h3>

        <p className="text-white/80 mt-3 text-sm md:text-base tracking-wide max-w-2xl mx-auto">
          Fale com nossa equipe especializada e encontre o seguro ideal para você.
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
