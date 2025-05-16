import BlogCard from '../components/ui/BlogCard';

import img1 from '../assets/1.jpeg';
import img2 from '../assets/2.jpeg';

const posts = [
  {
    image: img1,
    category: 'Seguros',
    title: 'Quais as Coberturas de Seguro Empresarial?',
    excerpt: 'Neste artigo, apresentamos para você quais as coberturas do seguro empresarial e como você pode proteger seu negócio contra imprevistos financeiros.',
    author: 'Márcio Tavares',
    date: '26/09/2023'
  },
  {
    image: img2,
    category: 'Seguros',
    title: 'Seguro Empresarial: Entenda Como Funciona',
    excerpt: 'Você descobre como o seguro empresarial funciona e as coberturas e os benefícios que oferece.',
    author: 'Márcio Tavares',
    date: '23/09/2023'
  },
    {
    image: img1,
    category: 'Seguros',
    title: 'Quais as Coberturas de Seguro Empresarial?',
    excerpt: 'Neste artigo, apresentamos para você quais as coberturas do seguro empresarial e como você pode proteger seu negócio contra imprevistos financeiros.',
    author: 'Márcio Tavares',
    date: '26/09/2023'
  },
  {
    image: img2,
    category: 'Seguros',
    title: 'Seguro Empresarial: Entenda Como Funciona',
    excerpt: 'Você descobre como o seguro empresarial funciona e as coberturas e os benefícios que oferece.',
    author: 'Márcio Tavares',
    date: '23/09/2023'
  },
    {
    image: img1,
    category: 'Seguros',
    title: 'Quais as Coberturas de Seguro Empresarial?',
    excerpt: 'Neste artigo, apresentamos para você quais as coberturas do seguro empresarial e como você pode proteger seu negócio contra imprevistos financeiros.',
    author: 'Márcio Tavares',
    date: '26/09/2023'
  },
  {
    image: img2,
    category: 'Seguros',
    title: 'Seguro Empresarial: Entenda Como Funciona',
    excerpt: 'Você descobre como o seguro empresarial funciona e as coberturas e os benefícios que oferece.',
    author: 'Márcio Tavares',
    date: '23/09/2023'
  },
    {
    image: img1,
    category: 'Seguros',
    title: 'Quais as Coberturas de Seguro Empresarial?',
    excerpt: 'Neste artigo, apresentamos para você quais as coberturas do seguro empresarial e como você pode proteger seu negócio contra imprevistos financeiros.',
    author: 'Márcio Tavares',
    date: '26/09/2023'
  },
  {
    image: img2,
    category: 'Seguros',
    title: 'Seguro Empresarial: Entenda Como Funciona',
    excerpt: 'Você descobre como o seguro empresarial funciona e as coberturas e os benefícios que oferece.',
    author: 'Márcio Tavares',
    date: '23/09/2023'
  },
    {
    image: img1,
    category: 'Seguros',
    title: 'Quais as Coberturas de Seguro Empresarial?',
    excerpt: 'Neste artigo, apresentamos para você quais as coberturas do seguro empresarial e como você pode proteger seu negócio contra imprevistos financeiros.',
    author: 'Márcio Tavares',
    date: '26/09/2023'
  },
  {
    image: img2,
    category: 'Seguros',
    title: 'Seguro Empresarial: Entenda Como Funciona',
    excerpt: 'Você descobre como o seguro empresarial funciona e as coberturas e os benefícios que oferece.',
    author: 'Márcio Tavares',
    date: '23/09/2023'
  },
  // adicione mais posts
];

export default function Blog() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Últimos Artigos</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, idx) => (
          <BlogCard key={idx} post={post} />
        ))}
      </div>
    </section>
  );
}
