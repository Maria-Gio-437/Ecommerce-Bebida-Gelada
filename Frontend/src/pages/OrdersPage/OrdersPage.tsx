import React from 'react';
import styled from 'styled-components';
import Orders from '../../components/Orders/Orders';
import { useOrders } from '../../contexts/OrderContext';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const LoginPrompt = styled.div`
  text-align: center;
  padding: 40px;
  background-color: #f8f8f8;
  border-radius: 8px;
`;

const LoginPromptText = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
`;

const LoginButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #45a049;
  }
`;

const OrdersPage: React.FC = () => {
  const { orders } = useOrders();
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return (
      <Container>
        <LoginPrompt>
          <LoginPromptText>
            Você precisa estar logado para ver seus pedidos.
          </LoginPromptText>
          <LoginButton to="/login">Fazer Login</LoginButton>
        </LoginPrompt>
      </Container>
    );
  }
  
  return (
    <Container>
      <Orders orders={orders} />
    </Container>
  );
};

export default OrdersPage;