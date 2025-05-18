import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import API_URL from '../../config/api';

export default function PrivateRoute({ children }) {
  const [isValid, setIsValid] = useState(null); // null = carregando

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/auth/verify`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setIsValid(data.msg === 'Token válido');
      } catch (err) {
        console.error('Erro ao verificar token:', err);
        setIsValid(false);
      }
    };

    verifyToken();
  }, []);

  if (isValid === null) {
    return <div className="text-center py-10">Verificando autenticação...</div>;
  }

  if (!isValid) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
