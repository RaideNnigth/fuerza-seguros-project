import { Link } from 'react-router-dom';

/**
 * Paleta contínua baseada nas cores reais do site.
 * Você pode ajustar/expandir esses hex conforme o seu design system.
 */
const COLOR_RANGE = [
  "#00214d", // azul fuerza (principal)
  "#0a397a", // azul médio
  "#3a7bd5", // azul claro
  "#f97316", // laranja fuerza
  "#16a34a", // verde
  "#7c3aed", // roxo destaque
  "#1f2937", // cinza escuro neutro
];

// HEX -> RGB
function hexToRgb(hex) {
  const sanitized = hex.replace("#", "");
  return {
    r: parseInt(sanitized.substring(0, 2), 16),
    g: parseInt(sanitized.substring(2, 4), 16),
    b: parseInt(sanitized.substring(4, 6), 16),
  };
}

// Interpolação linear entre 2 cores (retorna rgb sólido)
function interpolateColor(c1, c2, t) {
  const rgb1 = hexToRgb(c1);
  const rgb2 = hexToRgb(c2);

  const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * t);
  const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * t);
  const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * t);

  return `rgb(${r}, ${g}, ${b})`;
}

// Hash simples -> número entre 0 e 1
function hashToUnitInterval(str = "") {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h % 1000) / 1000;
}

// Cor sólida dinâmica dentro do range
function getDynamicSolidColor(tag = "") {
  const clean = tag.toLowerCase().trim();
  const t = hashToUnitInterval(clean); // 0..1

  const maxSeg = COLOR_RANGE.length - 1;
  const segment = Math.floor(t * maxSeg);
  const localT = (t * maxSeg) % 1;

  const c1 = COLOR_RANGE[segment];
  const c2 = COLOR_RANGE[Math.min(segment + 1, maxSeg)];

  return interpolateColor(c1, c2, localT);
}

export default function BlogCard({ post }) {
  const category =
    post.category?.toLowerCase() !== 'home page'
      ? post.category
      : '';

  return (
    <Link to={`/blog/${post._id}`} className="block h-full">
      <div
        style={{
          fontFamily: '"Times New Roman", Times, serif',
          minHeight: "360px",
          maxHeight: "360px",
        }}
        className="
          bg-white rounded-lg shadow hover:shadow-lg
          transition-all duration-300 overflow-hidden cursor-pointer
          flex flex-col h-full
        "
      >
        {/* Imagem padronizada */}
        <img
          src={post.image}
          alt={post.title}
          className="
            w-full h-[160px] object-cover
            hover:scale-105 transition-transform duration-300
          "
        />

        <div
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
          className="p-4 flex flex-col gap-2 flex-1"
        >
          {/* TAG com cor sólida dinâmica */}
          {category && (
            <span
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                backgroundColor: getDynamicSolidColor(category),
              }}
              className="
                text-[10px] text-white uppercase tracking-wide
                px-2 py-1 rounded w-fit shadow
              "
            >
              {category}
            </span>
          )}

          {/* Título */}
          <h2
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
            className="
              text-lg font-semibold text-gray-800
              hover:text-blue-600 transition-colors duration-300
              line-clamp-2
            "
          >
            {post.title}
          </h2>

          {/* Excerpt */}
          <div
            className="text-sm text-gray-600 line-clamp-3"
            style={{
              fontFamily: '"Times New Roman", Times, serif',
              minHeight: "55px",
            }}
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />

          {/* Rodapé */}
          <span
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
            className="text-xs text-gray-400 mt-auto"
          >
            {post.author} em {post.date}
          </span>
        </div>
      </div>
    </Link>
  );
}
