const articles = [
  {
    slug: 'seguro-empresarial',
    title: 'Seguro Empresarial: Entenda Como Funciona',
    author: 'Márcio Tavares',
    date: '23/09/2023',
    category: 'Seguros',
    headings: [
      { id: 'o-que-e', title: 'O que é Seguro Empresarial?' },
      { id: 'coberturas', title: 'Coberturas Comuns' },
    ],
    images: [
      '/src/assets/empresarial.webp',
      '/src/assets/incendio.webp',
    ],
    html: `
      <h2 id="o-que-e">O que é Seguro Empresarial?</h2>
      <p>O seguro empresarial protege sua empresa contra danos materiais, lucros cessantes e outros riscos.</p>
      <h2 id="coberturas">Coberturas Comuns</h2>
      <p>As coberturas incluem incêndio, roubo, responsabilidade civil e danos elétricos.</p>
      <p>Para mais informações, <a href="https://fuerzaseguros.com.br">clique aqui</a>.</p>
    `
  },
  // outros artigos podem ser adicionados aqui
];

export default articles;
