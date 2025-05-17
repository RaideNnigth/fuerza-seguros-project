import { useState } from 'react';

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

  const nextStep = () => setStep(step + 1);
  const prevStep = () => step > 0 && setStep(step - 1);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
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
      >
        Enviar
      </button>
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
