import { Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import ArticleView from './components/ui/ArticleView';

import Home from './pages/Home';
import Consorcios from './pages/Consorcios';
import Blog from './pages/Blog';
import Landing from './pages/Landing';
import AdminLogin from './pages/AdminLogin';

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
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
