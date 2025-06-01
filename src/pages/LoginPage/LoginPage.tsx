import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Container = styled.div`
  max-width: 500px;
  margin: 40px auto;
  padding: 30px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 15px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: ${props => props.active ? '#4CAF50' : '#666'};
  border-bottom: ${props => props.active ? '2px solid #4CAF50' : 'none'};
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    color: #4CAF50;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #45a049;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  margin-top: 20px;
  text-align: center;
`;

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Verificar se há um redirecionamento após o login
  const from = location.state?.returnTo || '/';
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setError('');
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    const success = await login(email, password);
    
    if (success) {
      navigate(from);
    } else {
      setError('Email ou senha incorretos.');
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !birthDate) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDateObj.getFullYear();
    
    // Verificar se o usuário é maior de idade
    const isAdult = age >= 18;
    
    const success = await register(name, email, password, birthDateObj);
    
    if (success) {
      navigate(from);
    } else {
      setError('Erro ao criar conta. Por favor, tente novamente.');
    }
  };
  
  return (
    <Container>
      <Title>Minha Conta</Title>
      
      <TabContainer>
        <Tab 
          active={activeTab === 'login'} 
          onClick={() => handleTabChange('login')}
        >
          Login
        </Tab>
        <Tab 
          active={activeTab === 'register'} 
          onClick={() => handleTabChange('register')}
        >
          Cadastro
        </Tab>
      </TabContainer>
      
      {activeTab === 'login' ? (
        <Form onSubmit={handleLogin}>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="password">Senha</Label>
            <Input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          
          <Button type="submit">Entrar</Button>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      ) : (
        <Form onSubmit={handleRegister}>
          <InputGroup>
            <Label htmlFor="name">Nome Completo</Label>
            <Input 
              type="text" 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="register-email">Email</Label>
            <Input 
              type="email" 
              id="register-email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="register-password">Senha</Label>
            <Input 
              type="password" 
              id="register-password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="birthDate">Data de Nascimento</Label>
            <Input 
              type="date" 
              id="birthDate" 
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </InputGroup>
          
          <Button type="submit">Criar Conta</Button>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      )}
    </Container>
  );
};

export default LoginPage;