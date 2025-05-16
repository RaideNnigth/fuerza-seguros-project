export default function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // aqui você pode integrar com seu backend futuramente
    alert('Mensagem enviada! (mock)');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg mt-16 space-y-4">
      <h3 className="text-lg font-semibold">Fale com um especialista</h3>
      <input
        type="text"
        placeholder="Seu nome"
        className="w-full p-2 rounded border"
        required
      />
      <input
        type="email"
        placeholder="Seu email"
        className="w-full p-2 rounded border"
        required
      />
      <textarea
        rows={4}
        placeholder="Sua mensagem"
        className="w-full p-2 rounded border"
        required
      ></textarea>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Enviar
      </button>
    </form>
  );
}
