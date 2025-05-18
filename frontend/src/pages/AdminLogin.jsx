import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config/api';

function AdminLogin() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const isSenhaSegura = (senha) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    return regex.test(senha);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (!isSenhaSegura(trimmedPass)) {
      setErro('a senha deve conter ao menos 8 caracteres, incluindo letra maiúscula, minúscula, número e símbolo.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: trimmedUser, password: trimmedPass }),
      });

      if (!res.ok) throw new Error('login inválido');

      const data = await res.json();
      localStorage.setItem('token', data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4">login administrativo</h2>

        {erro && <p className="text-red-500 text-sm mb-2">{erro}</p>}

        <input
          type="text"
          placeholder="id do administrador"
          className="w-full mb-2 p-2 border rounded"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="senha"
            className="w-full p-2 border rounded pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="absolute right-2 top-2 cursor-pointer text-sm text-blue-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'ocultar' : 'mostrar'}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-[#00214d] text-white p-2 rounded hover:opacity-90"
        >
          entrar
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
