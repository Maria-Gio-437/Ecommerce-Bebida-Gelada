import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Checkout, { ShippingInfo, PaymentInfo } from '../../components/Checkout/Checkout';
import { useCart } from '../../contexts/CartContext';
import { useOrders } from '../../contexts/OrderContext';
import { useAuth } from '../../contexts/AuthContext';

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
  margin-bottom: 20px;
`;

const LoginPromptText = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #45a049;
  }
`;

const CheckoutPage: React.FC = () => {
  const { items, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handlePlaceOrder = async (shippingInfo: ShippingInfo, paymentInfo: PaymentInfo) => {
    try {
      const orderId = await createOrder(items, shippingInfo, paymentInfo);
      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      alert('Ocorreu um erro ao finalizar o pedido. Por favor, tente novamente.');
    }
  };
  
  const handleLoginClick = () => {
    navigate('/login', { state: { returnTo: '/checkout' } });
  };
  
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <Container>
      {!isAuthenticated && (
        <LoginPrompt>
          <LoginPromptText>
            Para uma melhor experiência, recomendamos que você faça login antes de finalizar sua compra.
          </LoginPromptText>
          <LoginButton onClick={handleLoginClick}>Fazer Login</LoginButton>
        </LoginPrompt>
      )}
      
      <Checkout cartItems={items} onPlaceOrder={handlePlaceOrder} />
    </Container>
  );
};

export default CheckoutPage;