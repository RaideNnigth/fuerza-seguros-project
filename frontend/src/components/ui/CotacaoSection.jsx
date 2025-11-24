import { useState } from "react";
import ConsorcioForm from "./ConsorcioForm";
import SeguroForm from "./SeguroForm";
import SolucaoImobiliariaForm from "./SolucaoImobiliariaForm";

const OPTIONS = [
  { key: "consorcio", label: "CONSÓRCIO" },
  { key: "seguro", label: "SEGURO" },
  { key: "imobiliaria", label: "SOLUÇÃO IMOBILIÁRIA" },
];

export default function CotacaoSection() {
  // começa sem nada selecionado
  const [active, setActive] = useState(null);

  return (
    <section className="w-full py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-6">

        {/* CARD DO SELETOR */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 space-y-5">
          <h2 className="text-lg font-bold uppercase text-center text-gray-900 tracking-wider">
            Solicite uma cotação
          </h2>

          <p className="text-center text-gray-600 text-sm">
            Aqui seu orçamento é rápido. Selecione o tipo de cotação e preencha
            os campos para que um corretor entre em contato.
          </p>

          {/* 3 botões */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {OPTIONS.map((opt) => {
              const isActive = active === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => setActive(opt.key)}
                  className={`w-full sm:w-1/3 px-6 py-4 rounded-xl font-bold text-white transition
                    ${isActive ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"}
                  `}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* FORM APARECE ABAIXO DO SELETOR */}
        {active === "consorcio" && (
          <ConsorcioForm />
        )}

        {active === "seguro" && (
          <SeguroForm />
        )}

        {active === "imobiliaria" && (
          <SolucaoImobiliariaForm />
        )}
      </div>
    </section>
  );
}
