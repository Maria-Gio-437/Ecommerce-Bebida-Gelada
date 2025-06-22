import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Product } from '../ProductCard/ProductCard';
import { useCart } from '../../contexts/CartContext';
import CartPopup from '../CartPopup/CartPopup';

const Container = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  gap: 60px;
  background: var(--color-white);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
    padding: 30px 20px;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  max-width: 500px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: var(--color-black);
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  min-height: 400px;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, var(--color-black) 0%, #333 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  font-size: 18px;
  font-weight: 500;
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px 0;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: var(--color-black);
  margin: 0;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: #666;
  margin: 0;
  padding: 16px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

const Price = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: var(--color-primary);
  margin: 10px 0;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 24px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #eee;
`;

const QuantityLabel = styled.span`
  font-weight: 600;
  color: var(--color-black);
  margin-right: 8px;
`;

const QuantityButton = styled.button`
  width: 44px;
  height: 44px;
  border: 2px solid var(--color-black);
  background: var(--color-white);
  border-radius: 8px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: var(--color-black);
  
  &:hover {
    background: var(--color-black);
    color: var(--color-white);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const QuantityInput = styled.input`
  width: 80px;
  height: 44px;
  border: 2px solid var(--color-black);
  border-radius: 8px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin: 0 8px;
  background: var(--color-white);
  color: var(--color-black);
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
`;

const AddToCartButton = styled.button`
  padding: 16px 32px;
  background: linear-gradient(135deg, #38a169, #48bb78);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 20px;
  width: 100%;
  
  &:hover {
    background: var(--color-secondary);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(220, 38, 38, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setShowPopup(true);
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  return (
    <>
      <Container>
        <ImageContainer>
          {product.image ? (
            <Image src={product.image} alt={product.name} />
          ) : (
            <ImagePlaceholder>Sem imagem</ImagePlaceholder>
          )}
        </ImageContainer>
        <InfoContainer>
          <Title>{product.name}</Title>
          <Description>
            Descrição detalhada do produto. Aqui você encontrará informações sobre o sabor, 
            origem, características e sugestões de consumo desta bebida premium.
          </Description>
          <Price>R$ {product.price.toFixed(2)}</Price>
          <QuantityContainer>
            <QuantityLabel>Quantidade:</QuantityLabel>
            <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
            <QuantityInput 
              type="number" 
              value={quantity} 
              onChange={handleQuantityChange} 
              min="1"
            />
            <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
          </QuantityContainer>
          <AddToCartButton onClick={handleAddToCart}>
            Adicionar ao Carrinho
          </AddToCartButton>
        </InfoContainer>
      </Container>
      
      <CartPopup
        isVisible={showPopup}
        onClose={() => setShowPopup(false)}
        productName={product.name}
        quantity={quantity}
        price={product.price}
        onViewCart={handleViewCart}
      />
    </>
  );
};

export default ProductDetail;