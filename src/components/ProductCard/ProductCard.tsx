import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 250px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  text-decoration: none;
  color: inherit;
  background-color: #f8f8f8;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImagePlaceholder = styled.div`
  width: 80%;
  height: 80%;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
`;

const Content = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Title = styled.h3`
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #333;
`;

const Price = styled.span`
  font-weight: bold;
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
`;

const BuyButton = styled.button`
  padding: 8px 0;
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

export interface Product {
  category: any;
  id: number;
  name: string;
  price: number;
  image?: string;
  alcoholic: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Implementar lógica para adicionar ao carrinho
    console.log(`Produto ${product.name} adicionado ao carrinho`);
  };

  return (
    <Card to={`/product/${product.id}`}>
      <ImageContainer>
        {product.image ? (
          <Image src={product.image} alt={product.name} />
        ) : (
          <ImagePlaceholder>Imagem</ImagePlaceholder>
        )}
      </ImageContainer>
      <Content>
        <Title>{product.name}</Title>
        <Price>R${product.price.toFixed(2)}</Price>
        <BuyButton onClick={handleBuyClick}>Comprar</BuyButton>
      </Content>
    </Card>
  );
};

export default ProductCard;