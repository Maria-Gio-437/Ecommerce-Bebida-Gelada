import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useProducts } from '../../contexts/ProductContext';
import { useCart } from '../../contexts/CartContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  color: #333;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 18px;
  color: #666;
`;

const CategorySection = styled.div`
  margin-bottom: 40px;
`;

const CategoryTitle = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e0e0e0;
`;

const Home: React.FC = () => {
  const { products, categories, isLoading, getProductsByCategory } = useProducts();
  const { addItem } = useCart();
  
  const handleAddToCart = (productId: number, quantity: number = 1) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addItem(product, quantity);
    }
  };
  
  if (isLoading) {
    return (
      <Container>
        <LoadingContainer>Carregando produtos...</LoadingContainer>
      </Container>
    );
  }
  
  return (
    <Container>
      <Title>Bebidas Geladas</Title>
      
      {categories.map(category => {
        const categoryProducts = getProductsByCategory(category);
        
        if (categoryProducts.length === 0) return null;
        
        return (
          <CategorySection key={category}>
            <CategoryTitle>{category}</CategoryTitle>
            <ProductGrid>
              {categoryProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                />
              ))}
            </ProductGrid>
          </CategorySection>
        );
      })}
    </Container>
  );
};

export default Home;