import aboutImage from '../../assets/images/about-image.jpg'

export default function About() {
  return (
<section className="bg-gray-100 py-12">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
    
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
    <div className="w-full flex justify-center">
      <img
        src={aboutImage}
        alt="Sobre a Fuerza"
        className="rounded-xl shadow-md w-full max-w-md object-contain transform transition-transform duration-500 hover:scale-105"
      />
    </div>

  </div>
</section>


  );
}
