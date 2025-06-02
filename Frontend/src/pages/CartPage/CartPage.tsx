import React from 'react';
import styled from 'styled-components';
import Cart from '../../components/Cart/Cart';
import { useCart } from '../../contexts/CartContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem } = useCart();
  
  return (
    <Container>
      <Cart 
        items={items} 
        onUpdateQuantity={updateQuantity} 
        onRemoveItem={removeItem} 
      />
    </Container>
  );
};

export default CartPage;