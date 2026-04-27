import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppFloatButton from './components/ui/WhatsAppFloatButton';

import ArticleView from './components/ui/ArticleView';

import Home from './pages/Home';
import Consorcios from './pages/Consorcios';
import Seguros from './pages/Seguros';
import SolucoesImobiliarias from './pages/SolucoesImobiliarias'; // ⭐ novo
import Blog from './pages/Blog';
import AdminLogin from './pages/AdminLogin';
import AdminDashBoard from './pages/AdminDashboard';
import CreateArticle from './pages/CreateArticle';

import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main style={{ minHeight: isAdminRoute ? '100vh' : '80vh' }}>
        <Routes>

          <Route path="/" element={<Home />} /> 
          <Route path="/consorcios" element={<Consorcios />} />
          <Route path="/seguros" element={<Seguros />} />

          {/* ⭐ NOVO ROUTE */}
          <Route path="/solucoes-imobiliarias" element={<SolucoesImobiliarias />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<ArticleView />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* 🔐 Rotas protegidas */}
          <Route 
            path="/admin/dashboard" 
            element={
              <PrivateRoute>
                <AdminDashBoard />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/admin/create-article" 
            element={
              <PrivateRoute>
                <CreateArticle />
              </PrivateRoute>
            } 
          />

        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppFloatButton />}
    </>
  );
}

export default App;
