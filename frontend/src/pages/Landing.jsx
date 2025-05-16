import { useEffect } from 'react';

export default function Landing() {
  useEffect(() => {
    // Simulação do Pixel do Facebook
    window.fbq && window.fbq('track', 'PageView');
  }, []);

  return (
    <div>
      <h1>Landing Page</h1>
      <p>Obrigado por acessar! Em breve entraremos em contato.</p>
    </div>
  );
}
