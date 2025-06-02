import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  isAdult: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, birthDate: Date) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Verificar se há um usuário salvo no localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulação de login - em um ambiente real, isso seria uma chamada à API
      // Verificando se é um email de teste
      if (email === 'teste@email.com' && password === 'senha123') {
        const user = {
          id: 1,
          name: 'Usuário Teste',
          email: 'teste@email.com',
          isAdult: true
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  const register = async (name: string, email: string, password: string, birthDate: Date): Promise<boolean> => {
    try {
      // Verificar se o usuário é maior de idade
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const isAdult = age >= 18;
      
      // Simulação de registro - em um ambiente real, isso seria uma chamada à API
      const user = {
        id: Math.floor(Math.random() * 1000),
        name,
        email,
        isAdult
      };
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Erro ao registrar:', error);
      return false;
    }
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    register
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};