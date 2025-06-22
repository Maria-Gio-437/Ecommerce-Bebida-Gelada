import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOutRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const PopupOverlay = styled.div<{ isVisible: boolean; isClosing: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  pointer-events: ${props => props.isVisible ? 'auto' : 'none'};
`;

const PopupContainer = styled.div<{ isVisible: boolean; isClosing: boolean }>`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  width: 320px;
  text-align: left;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 2px solidrgb(47, 220, 38);
  animation: ${props => props.isVisible && !props.isClosing ? slideInRight : props.isClosing ? slideOutRight : 'none'} 0.4s ease;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 20px;
  color: var(--color-gray);
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: var(--color-light-gray);
    color: var(--color-dark-gray);
  }
`;

const IconContainer = styled.div`
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SuccessIconWrapper = styled.div`
  font-size: 24px;
  color:rgb(38, 220, 59);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  color: #1f2937;
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  flex: 1;
`;

const Message = styled.p`
  color: #6b7280;
  margin: 8px 0 16px 0;
  font-size: 14px;
  line-height: 1.4;
`;

const ProductInfo = styled.div`
  background-color: #f9fafb;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  border-left: 3px solidrgb(74, 220, 38);
`;

const ProductName = styled.h3`
  color: #1f2937;
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
`;

const ProductDetails = styled.p`
  color: #6b7280;
  margin: 0;
  font-size: 13px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const ContinueButton = styled.button`
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #e5e7eb;
    border-color: #9ca3af;
  }
`;

const ViewCartButton = styled.button`
  background: linear-gradient(135deg, #38a169, #48bb78);
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: linear-gradient(135deg, #2f855a, #38a169);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(56, 161, 105, 0.3);
  }
`;

interface CartPopupProps {
  isVisible: boolean;
  onClose: () => void;
  productName: string;
  quantity: number;
  price: number;
  onViewCart: () => void;
}

const CartPopup: React.FC<CartPopupProps> = ({
  isVisible,
  onClose,
  productName,
  quantity,
  price,
  onViewCart
}) => {
  const [isClosing, setIsClosing] = React.useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsClosing(false);
      // Auto-close after 3 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const handleViewCart = () => {
    handleClose();
    setTimeout(() => {
      onViewCart();
    }, 300);
  };

  if (!isVisible && !isClosing) return null;

  return (
    <PopupOverlay isVisible={isVisible} isClosing={isClosing}>
      <PopupContainer 
        isVisible={isVisible} 
        isClosing={isClosing}
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative' }}
      >
        <CloseButton onClick={handleClose}>
          <FaTimes />
        </CloseButton>
        
        <IconContainer>
          <SuccessIconWrapper>
            <FaCheckCircle />
          </SuccessIconWrapper>
          <Title>Produto Adicionado!</Title>
        </IconContainer>
        
        <Message>
          Seu produto foi adicionado ao carrinho com sucesso.
        </Message>
        
        <ProductInfo>
          <ProductName>{productName}</ProductName>
          <ProductDetails>
            Quantidade: {quantity} | Preço: R$ {(price * quantity).toFixed(2)}
          </ProductDetails>
        </ProductInfo>
        
        <ButtonContainer>
          <ContinueButton onClick={handleClose}>
            Continuar Comprando
          </ContinueButton>
          <ViewCartButton onClick={handleViewCart}>
            Ver Carrinho
          </ViewCartButton>
        </ButtonContainer>
      </PopupContainer>
    </PopupOverlay>
  );
};

export default CartPopup;