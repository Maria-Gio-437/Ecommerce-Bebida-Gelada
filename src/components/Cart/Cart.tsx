import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Product } from '../ProductCard/ProductCard';
// import { FaTrash } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  color: #333;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 40px;
  background-color: #f8f8f8;
  border-radius: 8px;
`;

const EmptyCartText = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
`;

const ContinueShoppingButton = styled(Link)`
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

const CartItemsContainer = styled.div`
  margin-bottom: 30px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f0f0f0;
  margin-right: 15px;
  flex-shrink: 0;
`;

const ItemInfo = styled.div`
  flex-grow: 1;
`;

const ItemName = styled.h3`
  margin: 0 0 5px 0;
  font-size: 16px;
`;

const ItemPrice = styled.div`
  color: #666;
`;

const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  margin: 0 20px;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const QuantityInput = styled.input`
  width: 40px;
  height: 30px;
  border: 1px solid #ddd;
  text-align: center;
  margin: 0 5px;
`;

const ItemTotal = styled.div`
  font-weight: bold;
  margin: 0 20px;
  width: 100px;
  text-align: right;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #f44336;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #d32f2f;
  }
`;

const CartSummary = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  
  &:last-child {
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid #e0e0e0;
    font-weight: bold;
    font-size: 18px;
  }
`;

const CheckoutButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 15px;
  background-color: #4CAF50;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  margin-top: 20px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #45a049;
  }
`;

export interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemoveItem }) => {
  const handleQuantityChange = (item: CartItem, value: string) => {
    const quantity = parseInt(value);
    if (!isNaN(quantity) && quantity > 0) {
      onUpdateQuantity(item.id, quantity);
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <Container>
      <Title>Carrinho de Compras</Title>
      
      {items.length === 0 ? (
        <EmptyCart>
          <EmptyCartText>Seu carrinho está vazio.</EmptyCartText>
          <ContinueShoppingButton to="/">Continuar Comprando</ContinueShoppingButton>
        </EmptyCart>
      ) : (
        <>
          <CartItemsContainer>
            {items.map(item => (
              <CartItem key={item.id}>
                <ItemImage>
                  {item.image && <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </ItemImage>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>R${item.price.toFixed(2)}</ItemPrice>
                </ItemInfo>
                <ItemQuantity>
                  <QuantityButton onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                    -
                  </QuantityButton>
                  <QuantityInput 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => handleQuantityChange(item, e.target.value)} 
                    min="1"
                  />
                  <QuantityButton onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                    +
                  </QuantityButton>
                </ItemQuantity>
                <ItemTotal>R${(item.price * item.quantity).toFixed(2)}</ItemTotal>
                <RemoveButton onClick={() => onRemoveItem(item.id)}>
                  🗑️
                </RemoveButton>
              </CartItem>
            ))}
          </CartItemsContainer>
          
          <CartSummary>
            <SummaryRow>
              <span>Subtotal</span>
              <span>R${subtotal.toFixed(2)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Frete</span>
              <span>R${shipping.toFixed(2)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Total</span>
              <span>R${total.toFixed(2)}</span>
            </SummaryRow>
            <CheckoutButton to="/checkout">Finalizar Compra</CheckoutButton>
          </CartSummary>
        </>
      )}
    </Container>
  );
};

export default Cart;