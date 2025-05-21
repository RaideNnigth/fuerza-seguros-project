import { useState } from 'react';
import API_URL from '../../config/api';

export default function ConsorcioForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    tipoConsorcio: '',
    valorInvestimento: '',
    nome: '',
    telefone: '',
    email: '',
    horarioContato: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [erro, setErro] = useState('');

  const nextStep = () => setStep(step + 1);
  const prevStep = () => step > 0 && setStep(step - 1);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setSuccess('');
    setErro('');

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
            <h3>Novo lead de consórcio</h3>
            <ul>
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
        setSuccess('Mensagem enviada com sucesso! ✔');
        setForm({
          tipoConsorcio: '',
          valorInvestimento: '',
          nome: '',
          telefone: '',
          email: '',
          horarioContato: '',
        });
        setStep(0); // ou mantenha na etapa final, como preferir
      } else {
        setErro(data.message || 'Erro ao enviar, tente novamente.');
      }
    } catch (err) {
      setErro('Erro ao conectar com o servidor.', err.message);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    <div key="step0" className="text-center">
      <h2 className="text-xl font-bold">Simule seu consórcio com a Fuerza é rapidinho.</h2>
      <button className="mt-4 bg-blue-900 text-white px-8 py-3 rounded shadow-md" onClick={nextStep}>
        Simular
      </button>
    </div>,

    <div key="step1">
      <h2 className="text-xl font-bold">Escolha o tipo de consórcio:</h2>
      <div className="flex gap-4 justify-center my-4">
        {['Imóveis', 'Carros'].map((tipo) => (
          <button
            key={tipo}
            className={`border rounded-lg p-4 w-32 ${form.tipoConsorcio === tipo ? 'border-blue-700' : 'border-gray-300'}`}
            onClick={() => setForm({ ...form, tipoConsorcio: tipo })}
          >
            {tipo}
          </button>
        ))}
      </div>
      <button className="bg-blue-900 text-white px-6 py-2 rounded shadow-md" onClick={nextStep}>
        OK
      </button>
    </div>,

    <div key="step2">
      <h2 className="text-xl font-bold">Quanto quer investir no seu consórcio?</h2>
      <input
        className="border-b-2 border-blue-900 outline-none text-2xl my-4"
        type="number"
        value={form.valorInvestimento}
        onChange={handleChange('valorInvestimento')}
      />
      <button className="block mx-auto bg-blue-900 text-white px-6 py-2 rounded shadow-md" onClick={nextStep}>
        OK
      </button>
    </div>,

    <div key="step3">
      <h2 className="text-xl font-bold">Qual seu nome?</h2>
      <input
        className="border-b-2 border-blue-900 outline-none text-2xl my-4"
        type="text"
        value={form.nome}
        onChange={handleChange('nome')}
      />
      <button className="block mx-auto bg-blue-900 text-white px-6 py-2 rounded shadow-md" onClick={nextStep}>
        OK
      </button>
    </div>,

    <div key="step4">
      <h2 className="text-xl font-bold">Seu telefone ou Whatsapp?</h2>
      <input
        className="border-b-2 border-blue-900 outline-none text-2xl my-4"
        type="tel"
        value={form.telefone}
        onChange={handleChange('telefone')}
      />
      <button className="block mx-auto bg-blue-900 text-white px-6 py-2 rounded shadow-md" onClick={nextStep}>
        OK
      </button>
    </div>,

    <div key="step5">
      <h2 className="text-xl font-bold">Qual seu e-mail?</h2>
      <input
        className="border-b-2 border-blue-900 outline-none text-2xl my-4"
        type="email"
        value={form.email}
        onChange={handleChange('email')}
      />
      <button className="block mx-auto bg-blue-900 text-white px-6 py-2 rounded shadow-md" onClick={nextStep}>
        OK
      </button>
    </div>,

    <div key="step6">
      <h2 className="text-xl font-bold">Horário preferido para contato?</h2>
      {['Manhã', 'Tarde', 'Noite'].map((horario) => (
        <button
          key={horario}
          className={`block w-full my-2 border rounded p-2 ${form.horarioContato === horario ? 'border-blue-900' : 'border-gray-300'}`}
          onClick={() => setForm({ ...form, horarioContato: horario })}
        >
          {horario}
        </button>
      ))}
      <button
        className="mt-4 block mx-auto bg-blue-900 text-white px-6 py-2 rounded shadow-md"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
      {success && <div className="text-green-600 mt-4">{success}</div>}
      {erro && <div className="text-red-600 mt-4">{erro}</div>}
    </div>,
  ];

  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8 my-10 overflow-x-hidden">
      {steps[step]}
      {step > 0 && (
        <button className="mt-4 text-sm underline text-gray-500" onClick={prevStep}>
          Voltar
        </button>
      )}
    </div>
  );
}
