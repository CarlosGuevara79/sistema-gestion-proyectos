import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = async (email, password) => {
    // Simulación simple (reemplazar por API real luego)
    if(email === "usuario@test.com" && password === "password") {
      const fakeUser = { id: 1, email };
      setUser(fakeUser);
      localStorage.setItem('user', JSON.stringify(fakeUser));
      router.push('/dashboard');
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/');
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if(storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
