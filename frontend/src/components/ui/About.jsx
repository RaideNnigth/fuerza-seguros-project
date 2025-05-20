import aboutImage from '../../assets/images/Aspect-ratio-4x3.svg'

export default function About() {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 px-4">
        {/* Texto */}
        <div className="w-full bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-500 ease-in-out">
          <h2 className="text-3xl font-bold mb-4 text-fuerza-azul">Nossa História</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            A Fuerza nasceu com o propósito de oferecer proteção personalizada e humana.
            Ao longo dos anos, nos consolidamos como referência em seguros empresariais,
            seguros pessoais e consórcios acessíveis.
          </p>
        </div>
        {/* Imagem */}
        <img
          src={aboutImage}
          alt="Sobre a Fuerza"
          className="rounded-xl shadow-md w-full max-w-md object-contain transform transition-transform duration-500 hover:scale-105"
        />
      </div>
    </section>
  );
}
