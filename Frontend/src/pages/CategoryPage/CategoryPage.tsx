import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useProducts } from '../../contexts/ProductContext';

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

const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px;
  background-color: #f8f8f8;
  border-radius: 8px;
  color: #666;
  font-size: 18px;
`;

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { getProductsByCategory } = useProducts();
  
  const products = categoryName ? getProductsByCategory(categoryName) : [];
  
  // Função para formatar o nome da categoria
  const formatCategoryName = (name: string) => {
    switch(name?.toLowerCase()) {
      case 'cervejas': return 'Cervejas';
      case 'destilados': return 'Destilados';
      case 'vinhos': return 'Vinhos';
      case 'sem-alcool': return 'Sem Alcool';
      default: return name || 'Categoria';
    }
  };
  
  return (
    <Container>
      <Title>{formatCategoryName(categoryName || '')}</Title>
      
      {products.length > 0 ? (
        <ProductGrid>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      ) : (
        <EmptyMessage>
          Nenhum produto encontrado nesta categoria.
        </EmptyMessage>
      )}
    </Container>
  );
};

export default CategoryPage;