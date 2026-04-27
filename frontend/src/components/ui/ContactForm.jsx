import { useState } from "react";
import API_URL from "../../config/api";
import {
  formatEmailInput,
  formatPhoneInput,
} from "../../utils/formFormatters";

const WHO_OPTIONS = [
  "Imobiliária",
  "Corretor de Imóveis",
  "Administrador de Condomínio",
  "Síndico",
  "Outros",
];

const BEST_TIME_OPTIONS = [
  "Manhã (08h–12h)",
  "Tarde (12h–18h)",
  "Noite (18h–21h)",
  "Qualquer horário",
];

export default function ContactForm({
  title = "Orce seu seguro",
  leadType = "seguro",
}) {
  const [form, setForm] = useState({
    who: "",
    produto: "",
    nome: "",
    telefone: "",
    email: "",
    horarioContato: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [erro, setErro] = useState("");
  const [fieldError, setFieldError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue =
      name === "telefone"
        ? formatPhoneInput(value)
        : name === "email"
          ? formatEmailInput(value)
          : value;

    setForm({ ...form, [name]: formattedValue });
    setFieldError("");
  };

  const validate = () => {
    if (!form.who) return "Selecione quem você é.";
    if (!form.produto) return "Selecione o produto desejado.";
    if (!form.nome?.trim()) return "Informe seu nome.";
    if (form.telefone.replace(/\D/g, "").length < 10)
      return "Informe um telefone válido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Informe um e-mail válido.";
    if (!form.horarioContato) return "Escolha um horário para contato.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setErro("");

    const err = validate();
    if (err) {
      setFieldError(err);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: `Lead ${leadType} - ${form.produto} - ${form.nome}`,
          text:
            `Quem você é: ${form.who}\n` +
            `Produto: ${form.produto}\n` +
            `Nome: ${form.nome}\n` +
            `Telefone: ${form.telefone}\n` +
            `E-mail: ${form.email}\n` +
            `Horário de contato: ${form.horarioContato}`,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Solicitação enviada com sucesso!");
        setForm({
          who: "",
          produto: "",
          nome: "",
          telefone: "",
          email: "",
          horarioContato: "",
        });
      } else {
        setErro(data.message || "Erro ao enviar, tente novamente.");
      }
    } catch {
      setErro("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full h-12 px-4 rounded-lg bg-[#cfe9ff] outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "text-sm font-semibold text-gray-800";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-lg border border-gray-200
                 w-full max-w-2xl mx-auto px-8 sm:px-10 py-8 space-y-4"
    >
      <h2 className="text-2xl font-extrabold uppercase text-center tracking-wide text-gray-900">
        {title}
      </h2>

      <div>
        <label className={labelClass}>Quem você é?</label>
        <select
          name="who"
          value={form.who}
          onChange={handleChange}
          required
          className={inputClass}
        >
          <option value="" disabled>Selecione</option>
          {WHO_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Selecione o produto desejado</label>
        <select
          name="produto"
          value={form.produto}
          onChange={handleChange}
          required
          className={inputClass}
        >
          <option value="" disabled>Selecione</option>
          {/* Ajusta aqui os seguros/imobiliário */}
          <option value="Seguro Residencial">Seguro Residencial</option>
          <option value="Seguro Empresarial">Seguro Empresarial</option>
          <option value="Seguro Auto">Seguro Auto</option>
          <option value="Outros">Outros</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Nome</label>
        <input
          name="nome"
          placeholder="Ex: Maria Silva"
          value={form.nome}
          onChange={handleChange}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Telefone</label>
        <input
          name="telefone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Ex: (11) 99999-9999"
          value={form.telefone}
          onChange={handleChange}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Email</label>
        <input
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Ex: nome@email.com"
          value={form.email}
          onChange={handleChange}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Melhor horário para contato</label>
        <select
          name="horarioContato"
          value={form.horarioContato}
          onChange={handleChange}
          required
          className={inputClass}
        >
          <option value="" disabled>Selecione</option>
          {BEST_TIME_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {fieldError && (
        <p className="text-red-600 text-center text-sm font-medium pt-1">
          {fieldError}
        </p>
      )}

      <div className="pt-4 flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="px-10 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold
                     hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Enviando..." : "Solicitar"}
        </button>
      </div>

      {success && (
        <p className="text-green-600 text-center font-medium">{success}</p>
      )}
      {erro && <p className="text-red-600 text-center font-medium">{erro}</p>}
    </form>
  );
}
