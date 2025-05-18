import { Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import ArticleView from './components/ui/ArticleView';

import Home from './pages/Home';
import Consorcios from './pages/Consorcios';
import Blog from './pages/Blog';
import Landing from './pages/Landing';
import AdminLogin from './pages/AdminLogin';
import AdminDashBoard from './pages/AdminDashboard';

function App() {

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/consorcios" element={<Consorcios />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<ArticleView />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashBoard />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
