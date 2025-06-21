import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import { useProducts } from '../../contexts/ProductContext';
import { useCart } from '../../contexts/CartContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const NotFoundContainer = styled.div`
  text-align: center;
  padding: 50px 20px;
`;

const NotFoundTitle = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const NotFoundText = styled.p`
  margin-bottom: 30px;
  color: #666;
`;

const BackButton = styled.button`
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

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addItem } = useCart();
  
  const product = productId ? getProductById(parseInt(productId)) : undefined;
  
  const handleAddToCart = (product: any, quantity: number) => {
    addItem(product, quantity);
    // Opcional: redirecionar para o carrinho ou mostrar uma mensagem de sucesso
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (!product) {
    return (
      <Container>
        <NotFoundContainer>
          <NotFoundTitle>Produto não encontrado</NotFoundTitle>
          <NotFoundText>O produto que você está procurando não existe ou foi removido.</NotFoundText>
          <BackButton onClick={handleGoBack}>Voltar</BackButton>
        </NotFoundContainer>
      </Container>
    );
  }
  
  return (
    <Container>
      <ProductDetail product={product} onAddToCart={handleAddToCart} />
    </Container>
  );
};

export default ProductDetailPage;