import React, { createContext, useContext, useState, useEffect } from 'react';

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
  logout: () => Promise<void>;
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
      const response = await fetch('http://127.0.0.1:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha: password }),
      });

      if (response.ok) {
        const data = await response.json();
        const user = {
          id: data.user?.id || 1,
          name: data.user?.user_metadata?.nome || data.user?.email || 'Usuário',
          email: data.user?.email || email,
          isAdult: true
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', data.session?.access_token || '');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };
  
  const logout = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        await fetch('http://127.0.0.1:5000/users/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
        });
      }
    } catch (error) {
      console.error('Erro ao fazer logout no servidor:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    }
  };
  
  const register = async (name: string, email: string, password: string, birthDate: Date): Promise<boolean> => {
    try {
      // Calcular se o usuário é maior de idade
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const isAdult = age >= 18;
      
      const response = await fetch('http://127.0.0.1:5000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: name,
          email,
          senha: password,
          cpf: '00000000000', // Valor padrão - pode ser ajustado conforme necessário
          telefone: '0000000000', // Valor padrão - pode ser ajustado conforme necessário
          data_nascimento: birthDate.toISOString().split('T')[0],
          tipo_usuario: 'cliente'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const user = {
          id: data.user?.id || Math.floor(Math.random() * 1000),
          name,
          email,
          isAdult
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      } else {
        // Tentar obter a mensagem de erro do servidor
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || 'Erro desconhecido no servidor';
        console.error('Erro do servidor:', errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      // Re-lançar o erro para que possa ser capturado na UI
      throw error;
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