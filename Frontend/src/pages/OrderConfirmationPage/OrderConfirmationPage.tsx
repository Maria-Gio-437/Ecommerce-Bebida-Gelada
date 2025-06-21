import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
// import { FaCheckCircle } from 'react-icons/fa';
import { useOrders } from '../../contexts/OrderContext';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
`;

const SuccessIcon = styled.div`
  font-size: 80px;
  color: #4CAF50;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #333;
`;

const OrderNumber = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
`;

const Message = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled(Link)<{ primary?: boolean }>`
  display: inline-block;
  padding: 12px 24px;
  background-color: ${props => props.primary ? '#4CAF50' : '#f8f8f8'};
  color: ${props => props.primary ? 'white' : '#333'};
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s;
  border: ${props => props.primary ? 'none' : '1px solid #ddd'};
  
  &:hover {
    background-color: ${props => props.primary ? '#45a049' : '#e0e0e0'};
  }
`;

const OrderSummary = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  margin-top: 40px;
  text-align: left;
`;

const SummaryTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 20px;
  color: #333;
`;

const ItemsList = styled.div`
  margin-bottom: 20px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.span`
  flex: 1;
`;

const ItemQuantity = styled.span`
  color: #666;
  margin: 0 10px;
`;

const ItemPrice = styled.span`
  font-weight: 500;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 18px;
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #e0e0e0;
`;

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById } = useOrders();
  
  const order = orderId ? getOrderById(parseInt(orderId)) : undefined;
  
  if (!order) {
    return (
      <Container>
        <Title>Pedido não encontrado</Title>
        <Message>Não foi possível encontrar os detalhes do seu pedido.</Message>
        <Button primary to="/">Voltar para a Loja</Button>
      </Container>
    );
  }
  
  return (
    <Container>
      <SuccessIcon>
        ✅
      </SuccessIcon>
      <Title>Pedido Realizado com Sucesso!</Title>
      <OrderNumber>Número do Pedido: #{order.id}</OrderNumber>
      <Message>
        Obrigado por comprar conosco! Seu pedido foi recebido e está sendo processado.
        <br />
        Você receberá um e-mail com os detalhes do seu pedido e informações de entrega.
      </Message>
      
      <OrderSummary>
        <SummaryTitle>Resumo do Pedido</SummaryTitle>
        <ItemsList>
          {order.items.map(item => (
            <Item key={item.id}>
              <ItemName>{item.name}</ItemName>
              <ItemQuantity>x{item.quantity}</ItemQuantity>
              <ItemPrice>R${(item.price * item.quantity).toFixed(2)}</ItemPrice>
            </Item>
          ))}
        </ItemsList>
        <TotalRow>
          <span>Total</span>
          <span>R${order.total.toFixed(2)}</span>
        </TotalRow>
      </OrderSummary>
      
      <ButtonContainer>
        <Button to="/orders">Ver Meus Pedidos</Button>
        <Button primary to="/">Continuar Comprando</Button>
      </ButtonContainer>
    </Container>
  );
};

export default OrderConfirmationPage;