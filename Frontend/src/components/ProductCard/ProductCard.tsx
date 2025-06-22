import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import CartPopup from '../CartPopup/CartPopup';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--gradient-card);
  border: 1px solid var(--light-gray);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-primary);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: var(--shadow-xl);
    border-color: var(--primary-red);
    
    &::before {
      opacity: 1;
    }
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  flex: 1;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 240px;
  background: linear-gradient(145deg, var(--secondary-gray), var(--light-gray));
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  ${CardContainer}:hover &::after {
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${CardContainer}:hover & {
    transform: scale(1.08);
  }
`;

const ImagePlaceholder = styled.div`
  width: 80%;
  height: 80%;
  background-color: var(--light-gray);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-light);
  font-size: 18px;
  border-radius: 8px;
`;

const Content = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: var(--primary-white);
`;

const Title = styled.h3`
  margin: 0 0 16px 0;
  font-size: 19px;
  color: var(--text-dark);
  font-weight: 700;
  line-height: 1.4;
  min-height: 52px;
  letter-spacing: -0.025em;
`;

const Price = styled.div`
  font-weight: 800;
  font-size: 24px;
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  letter-spacing: -0.025em;
`;

const BuyButton = styled.button`
  padding: 16px 20px;
  background: linear-gradient(135deg, #38a169, #48bb78);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.025em;
  opacity: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4);
    background: linear-gradient(135deg, #15803d, #16a34a);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
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
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setShowPopup(true);
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  return (
    <>
      <CardContainer>
        <CardLink to={`/product/${product.id}`}>
          <ImageContainer>
            {product.image ? (
              <Image src={product.image} alt={product.name} />
            ) : (
              <ImagePlaceholder>Sem imagem</ImagePlaceholder>
            )}
          </ImageContainer>
          
          <Content>
            <Title>{product.name}</Title>
            <Price>R$ {product.price.toFixed(2)}</Price>
          </Content>
        </CardLink>
        
        <div style={{ padding: '0 24px 24px' }}>
          <BuyButton onClick={handleBuyClick}>
            Adicionar ao Carrinho
          </BuyButton>
        </div>
      </CardContainer>
      
      <CartPopup
        isVisible={showPopup}
        onClose={() => setShowPopup(false)}
        productName={product.name}
        quantity={1}
        price={product.price}
        onViewCart={handleViewCart}
      />
    </>
  );
};

export default ProductCard;