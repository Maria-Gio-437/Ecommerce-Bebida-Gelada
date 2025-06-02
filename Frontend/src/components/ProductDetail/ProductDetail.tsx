import React, { useState } from 'react';
import styled from 'styled-components';
import { Product } from '../ProductCard/ProductCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 40px;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  height: 300px;
  
  @media (min-width: 768px) {
    margin-bottom: 0;
    height: 400px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0e0e0;
  color: #666;
  font-size: 24px;
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 0 0 15px 0;
  color: #333;
  font-size: 24px;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  background-color: #f8f8f8;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const QuantityInput = styled.input`
  width: 60px;
  height: 40px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 16px;
  margin: 0 10px;
`;

const AddToCartButton = styled.button`
  padding: 12px 20px;
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
`;

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

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
    onAddToCart(product, quantity);
  };

  return (
    <Container>
      <ImageContainer>
        {product.image ? (
          <Image src={product.image} alt={product.name} />
        ) : (
          <ImagePlaceholder>Imagem</ImagePlaceholder>
        )}
      </ImageContainer>
      <InfoContainer>
        <Title>{product.name}</Title>
        <Description>
          Descrição detalhada do produto. Aqui você encontrará informações sobre o sabor, 
          origem, características e sugestões de consumo.
        </Description>
        <Price>R${product.price.toFixed(2)}</Price>
        <QuantityContainer>
          <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
          <QuantityInput 
            type="number" 
            value={quantity} 
            onChange={handleQuantityChange} 
            min="1"
          />
          <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
        </QuantityContainer>
        <AddToCartButton onClick={handleAddToCart}>Adicionar ao Carrinho</AddToCartButton>
      </InfoContainer>
    </Container>
  );
};

export default ProductDetail;