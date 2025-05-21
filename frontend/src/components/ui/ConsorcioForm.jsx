import { useState } from 'react';
import API_URL from '../../config/api';

const initialForm = {
  tipoConsorcio: '',
  valorInvestimento: '',
  nome: '',
  telefone: '',
  email: '',
  horarioContato: '',
};

export default function ConsorcioForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [erro, setErro] = useState('');
  const [fieldError, setFieldError] = useState('');

  // Simple validation functions
  const isEmailValid = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneValid = phone => phone.replace(/\D/g, '').length >= 10; // Basic: at least 10 digits
  const isValueValid = v => v && Number(v) > 0;

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => (s > 0 ? s - 1 : s));

  const handleChange = field => e => {
    setForm({ ...form, [field]: e.target.value });
    setFieldError('');
  };

  const handleNext = () => {
    // Step validation before proceeding
    setFieldError('');
    switch (step) {
      case 1:
        if (!form.tipoConsorcio) return setFieldError('Escolha um tipo de consórcio.');
        break;
      case 2:
        if (!isValueValid(form.valorInvestimento)) return setFieldError('Informe um valor válido.');
        break;
      case 3:
        if (!form.nome || form.nome.trim().length < 2) return setFieldError('Informe seu nome completo.');
        break;
      case 4:
        if (!isPhoneValid(form.telefone)) return setFieldError('Informe um telefone ou WhatsApp válido.');
        break;
      case 5:
        if (!isEmailValid(form.email)) return setFieldError('Digite um e-mail válido.');
        break;
      case 6:
        if (!form.horarioContato) return setFieldError('Escolha um horário para contato.');
        break;
      default:
        break;
    }
    nextStep();
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setSuccess('');
    setErro('');
    setFieldError('');

    try {
      const res = await fetch(`${API_URL}/api/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `Lead Consórcio - ${form.tipoConsorcio} - ${form.nome}`,
          text:
            `Tipo: ${form.tipoConsorcio}\n` +
            `Valor: ${form.valorInvestimento}\n` +
            `Nome: ${form.nome}\n` +
            `Telefone: ${form.telefone}\n` +
            `E-mail: ${form.email}\n` +
            `Horário de contato: ${form.horarioContato}`,
          html: `
            <h3 style="color:#1e293b">Novo lead de consórcio</h3>
            <ul style="list-style:none;padding:0;font-size:17px">
              <li><b>Tipo:</b> ${form.tipoConsorcio}</li>
              <li><b>Valor:</b> ${form.valorInvestimento}</li>
              <li><b>Nome:</b> ${form.nome}</li>
              <li><b>Telefone:</b> ${form.telefone}</li>
              <li><b>Email:</b> ${form.email}</li>
              <li><b>Horário de contato:</b> ${form.horarioContato}</li>
            </ul>
          `
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess('Mensagem enviada com sucesso! Em breve um especialista da Fuerza irá te contatar 😉');
        setForm(initialForm);
        setStep(0);
      } else {
        setErro(data.message || 'Erro ao enviar, tente novamente.');
      }
    } catch {
      setErro('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  // Visual feedback
  const spinner = <svg className="animate-spin h-5 w-5 text-white inline ml-2" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.48 0 2 4.48 2 10h2zm2 5.291V18c0 1.1.9 2 2 2h1.555A7.963 7.963 0 014 12c0-1.657.53-3.195 1.43-4.455l1.43 1.43A6.978 6.978 0 006 12c0 1.238.36 2.393.979 3.355z"></path></svg>;

  const steps = [
    <div key="step0" className="text-center flex flex-col items-center">
      <h2 className="text-2xl font-bold text-blue-900 mb-3">Simule seu consórcio</h2>
      <p className="mb-6 text-gray-700">Com a Fuerza é rapidinho. Preencha as etapas para receber atendimento personalizado.</p>
      <button
        className="bg-blue-900 text-white px-10 py-3 rounded-lg shadow-md text-lg font-semibold transition hover:bg-blue-800"
        onClick={nextStep}
        type="button"
        autoFocus
      >
        Simular agora
      </button>
    </div>,

    <div key="step1" className="text-center">
      <h2 className="text-xl font-bold mb-2">Qual tipo de consórcio?</h2>
      <div className="flex gap-4 justify-center my-4">
        {['Imóveis', 'Carros'].map((tipo) => (
          <button
            key={tipo}
            type="button"
            aria-pressed={form.tipoConsorcio === tipo}
            className={`border transition p-4 w-36 rounded-lg shadow-sm text-lg font-medium ${
              form.tipoConsorcio === tipo
                ? 'bg-blue-50 border-blue-700 text-blue-900'
                : 'border-gray-300 bg-white text-gray-800'
            }`}
            onClick={() => setForm({ ...form, tipoConsorcio: tipo })}
            autoFocus={form.tipoConsorcio === tipo}
          >
            {tipo}
          </button>
        ))}
      </div>
      {fieldError && <div className="text-red-600 mb-2">{fieldError}</div>}
      <button
        className="bg-blue-900 text-white px-8 py-2 rounded font-semibold hover:bg-blue-800 transition"
        onClick={handleNext}
        type="button"
      >
        OK
      </button>
    </div>,

    <div key="step2" className="text-center">
      <h2 className="text-xl font-bold mb-2">Quanto quer investir?</h2>
      <input
        className="border-b-2 border-blue-900 outline-none text-2xl my-4 w-full text-center placeholder-gray-400"
        type="number"
        value={form.valorInvestimento}
        onChange={handleChange('valorInvestimento')}
        placeholder="Digite o valor"
        autoFocus
      />
      {fieldError && <div className="text-red-600 mb-2">{fieldError}</div>}
      <button
        className="bg-blue-900 text-white px-8 py-2 rounded font-semibold hover:bg-blue-800 transition"
        onClick={handleNext}
        type="button"
      >
        OK
      </button>
    </div>,

    <div key="step3" className="text-center">
      <h2 className="text-xl font-bold mb-2">Qual seu nome?</h2>
      <input
        className="border-b-2 border-blue-900 outline-none text-2xl my-4 w-full text-center placeholder-gray-400"
        type="text"
        value={form.nome}
        onChange={handleChange('nome')}
        placeholder="Seu nome completo"
        autoFocus
      />
      {fieldError && <div className="text-red-600 mb-2">{fieldError}</div>}
      <button
        className="bg-blue-900 text-white px-8 py-2 rounded font-semibold hover:bg-blue-800 transition"
        onClick={handleNext}
        type="button"
      >
        OK
      </button>
    </div>,

    <div key="step4" className="text-center">
      <h2 className="text-xl font-bold mb-2">Telefone ou Whatsapp?</h2>
      <input
        className="border-b-2 border-blue-900 outline-none text-2xl my-4 w-full text-center placeholder-gray-400"
        type="tel"
        value={form.telefone}
        onChange={handleChange('telefone')}
        placeholder="(XX) XXXXX-XXXX"
        autoFocus
      />
      {fieldError && <div className="text-red-600 mb-2">{fieldError}</div>}
      <button
        className="bg-blue-900 text-white px-8 py-2 rounded font-semibold hover:bg-blue-800 transition"
        onClick={handleNext}
        type="button"
      >
        OK
      </button>
    </div>,

    <div key="step5" className="text-center">
      <h2 className="text-xl font-bold mb-2">Qual seu e-mail?</h2>
      <input
        className="border-b-2 border-blue-900 outline-none text-2xl my-4 w-full text-center placeholder-gray-400"
        type="email"
        value={form.email}
        onChange={handleChange('email')}
        placeholder="seu@email.com"
        autoFocus
      />
      {fieldError && <div className="text-red-600 mb-2">{fieldError}</div>}
      <button
        className="bg-blue-900 text-white px-8 py-2 rounded font-semibold hover:bg-blue-800 transition"
        onClick={handleNext}
        type="button"
      >
        OK
      </button>
    </div>,

    <div key="step6" className="text-center">
      <h2 className="text-xl font-bold mb-2">Horário preferido para contato?</h2>
      <div className="flex flex-col gap-2 mb-4">
        {['Manhã', 'Tarde', 'Noite'].map((horario) => (
          <button
            key={horario}
            type="button"
            className={`w-full border rounded p-3 transition font-medium ${
              form.horarioContato === horario
                ? 'border-blue-900 bg-blue-50 text-blue-900'
                : 'border-gray-300 bg-white text-gray-800'
            }`}
            onClick={() => setForm({ ...form, horarioContato: horario })}
            autoFocus={form.horarioContato === horario}
          >
            {horario}
          </button>
        ))}
      </div>
      {fieldError && <div className="text-red-600 mb-2">{fieldError}</div>}
      <button
        className="mt-2 block mx-auto bg-blue-900 text-white px-8 py-2 rounded font-semibold shadow-md hover:bg-blue-800 transition disabled:opacity-50"
        onClick={handleSubmit}
        disabled={!form.horarioContato || loading}
        type="button"
      >
        {loading ? <>Enviando...{spinner}</> : 'Enviar'}
      </button>
      {success && <div className="text-green-600 mt-4 font-medium text-lg">{success}</div>}
      {erro && <div className="text-red-600 mt-4 font-medium text-lg">{erro}</div>}
    </div>,
  ];

  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-2xl rounded-xl p-6 sm:p-8 my-10 overflow-x-hidden border border-blue-100">
      {steps[step]}
      {step > 0 && step < steps.length - 1 && (
        <button
          className="mt-4 text-sm underline text-gray-500 hover:text-blue-900 transition"
          onClick={prevStep}
          type="button"
        >
          Voltar
        </button>
      )}
    </div>
  );
}
