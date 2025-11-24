import { useEffect, useState } from "react";
import BlogCard from "../components/ui/BlogCard";
import API_URL from "../config/api";
import DEFAULT_THUMBNAIL from "../assets/images/default-thumbnail.png";
import CotacaoSection from "../components/ui/CotacaoSection";

export default function Consorcios() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // ✅ garante que qualquer espaço fora do componente (ex.: mt-10 do footer)
    // fique azul e não branco
    const prevBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#0B2D6B";
    return () => {
      document.body.style.backgroundColor = prevBg;
    };
  }, []);

  useEffect(() => {
    const fetchConsorciosOrdenados = async () => {
      const tagConsorcio = "consórcio"; // ✅ tag ORIGINAL

      // helper pra comparar tags ignorando maiúsculas/acentos
      const norm = (s = "") =>
        s
          .toString()
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, ""); // remove acentos

      try {
        // 1) busca todos posts
        const postsRes = await fetch(`${API_URL}/api/blog`);
        const postsData = await postsRes.json();

        // 2) index por id
        const postsById = {};
        postsData.forEach((p) => {
          postsById[p._id] = p;
        });

        // 3) busca ordem salva da TAG consórcio (mesmo padrão do carousel)
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

        // 4) lista ordenada (se existir)
        const ordered = orderedPostIds
          .map((id) => postsById[id])
          .filter(isConsorcioPost);

        // 5) fallback (todos os posts de consórcio)
        const fallback = postsData.filter(isConsorcioPost);

        const finalList = ordered.length > 0 ? ordered : fallback;

        // 6) map pro BlogCard
        const mapped = finalList.map((post) => ({
          _id: post._id,
          image: post.cover
            ? `${API_URL}/api/attachments/${post.cover}`
            : DEFAULT_THUMBNAIL,
          category: post.tags?.[0] || "consórcio",
          title: post.title || "sem título",
          excerpt: post.htmlContent
            ? post.htmlContent
                .replace(/<img[^>]*>/gi, "")
                .replace(/<[^>]+>/g, "")
                .slice(0, 120) + "..."
            : "",
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

  return (
    // ✅ wrapper azul full, sem bg-white geral pra não “vazar” branco
    <div className="w-full min-h-screen bg-[#0B2D6B] overflow-x-hidden">
      {/* HERO */}
      <section className="w-full bg-[#0B2D6B] text-white pt-28 md:pt-32">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20 min-h-[100px] flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
            FUERZA <br />
            <span className="text-[#F7931E]">CONSÓRCIOS</span>
          </h1>

          <p className="text-sm md:text-base mt-4 max-w-2xl leading-relaxed text-white/90">
            Descubra a forma mais inteligente de conquistar seus objetivos.
            Com nosso consórcio, você tem acesso a crédito sem juros,
            com taxas e parcelas que cabem no seu orçamento.
          </p>

          <div className="flex gap-3 mt-6 flex-wrap">
            <a
              href="#cotacao"
              className="px-5 py-2 bg-[#F7931E] text-white font-semibold rounded-md shadow hover:bg-[#d87f16] transition text-sm uppercase"
            >
              Criar consórcio
            </a>

            <a
              href="#cotacao"
              className="px-5 py-2 bg-transparent border border-white text-white font-semibold rounded-md shadow hover:bg-white/10 transition text-sm uppercase"
            >
              Fale conosco
            </a>
          </div>
        </div>
      </section>

      {/* BLOCO BRANCO: título produtos */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 pt-14 pb-8 text-center">
          <h2 className="text-sm font-bold tracking-widest text-[#0B2D6B] uppercase">
            Nossos produtos de
          </h2>
          <p className="text-2xl font-extrabold text-[#F7931E] mt-1 uppercase">
            Consórcio
          </p>
          <p className="text-gray-600 text-sm mt-2 max-w-3xl mx-auto">
            Escolha o consórcio ideal para suas necessidades. Temos soluções para
            diversas finalidades com condições especiais e atendimento personalizado.
          </p>
        </div>
      </section>

      {/* BLOCO BRANCO: grid */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 pb-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, idx) => (
              <BlogCard key={post._id || idx} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* BLOCO BRANCO: outras finalidades */}
      <section className="w-full bg-white">
        <div className="max-w-5xl mx-auto px-6 pt-8 pb-12 text-center">
          <h2 className="text-sm font-bold tracking-widest text-[#0B2D6B] uppercase">
            Outras finalidades
          </h2>

          <p className="text-gray-700 mt-4 leading-relaxed text-sm md:text-base">
            Você pode utilizar um consórcio para realizar todo tipo de sonhos.
            Cirurgias plásticas, procedimentos estéticos, fazer uma festa de casamento
            ou formatura, pagar a faculdade ou outros cursos técnicos, de especialização
            ou de idiomas. Até mesmo planejar aquela viagem dos sonhos!
            <br /><br />
            Se o seu sonho é navegar, você pode optar por comprar barcos, lanchas,
            jet ski, motores de popa, etc., novos ou usados.
            <br /><br />
            Fale com nossos especialistas e consulte possibilidades e planos.
          </p>
        </div>
      </section>

      {/* CTA + Cotação (azul) */}
      <section
        id="cotacao"
        className="w-full bg-[#0B2D6B] py-12 px-6 text-center"
      >
        <h3 className="text-white font-extrabold text-lg tracking-widest uppercase">
          Pronto para começar?
        </h3>
        <p className="text-white/90 text-sm mt-2 max-w-3xl mx-auto">
          Fale com nossos especialistas e descubra qual consórcio é ideal para você.
          Simule sem compromisso e tenha atendimento personalizado.
        </p>

        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-xl">
            <CotacaoSection />
          </div>
        </div>
      </section>
    </div>
  );
}
