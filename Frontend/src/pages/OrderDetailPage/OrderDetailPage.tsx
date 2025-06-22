import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useOrders } from '../../contexts/OrderContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #007bff;
  text-decoration: none;
  margin-bottom: 20px;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
  
  &::before {
    content: '← ';
    margin-right: 5px;
  }
`;

const OrderHeader = styled.div`
  background: white;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const OrderTitle = styled.h1`
  margin: 0 0 20px 0;
  color: #333;
  font-size: 28px;
`;

const OrderInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const InfoItem = styled.div`
  h3 {
    margin: 0 0 5px 0;
    color: #666;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
  }
  
  p {
    margin: 0;
    color: #333;
    font-size: 16px;
    font-weight: 600;
  }
`;

const OrderStatus = styled.span<{ status: string }>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  
  ${props => {
    switch (props.status) {
      case 'pending':
        return 'background-color: #fff3cd; color: #856404;';
      case 'processing':
        return 'background-color: #d1ecf1; color: #0c5460;';
      case 'shipped':
        return 'background-color: #d4edda; color: #155724;';
      case 'delivered':
        return 'background-color: #d4edda; color: #155724;';
      case 'cancelled':
        return 'background-color: #f8d7da; color: #721c24;';
      default:
        return 'background-color: #e2e3e5; color: #383d41;';
    }
  }}
`;

const OrderContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SectionTitle = styled.h2`
  margin: 0 0 20px 0;
  color: #333;
  font-size: 20px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa;
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 15px;
  background: #f0f0f0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  margin: 0 0 5px 0;
  color: #333;
  font-size: 16px;
`;

const ItemPrice = styled.p`
  margin: 0;
  color: #666;
  font-size: 14px;
`;

const ItemQuantity = styled.div`
  color: #333;
  font-weight: 600;
  margin-right: 15px;
`;

const ItemTotal = styled.div`
  color: #007bff;
  font-weight: 600;
  font-size: 16px;
`;

const OrderSummary = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid #f0f0f0;
  text-align: right;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  
  &:last-child {
    margin-bottom: 0;
    font-size: 18px;
    font-weight: 600;
    color: #333;
    border-top: 1px solid #e0e0e0;
    padding-top: 10px;
    margin-top: 10px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
`;

const Button = styled.button<{ variant?: 'primary' | 'danger' }>`
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.variant === 'danger' ? `
    background-color: #dc3545;
    color: white;
    
    &:hover {
      background-color: #c82333;
    }
    
    &:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
  ` : `
    background-color: #007bff;
    color: white;
    
    &:hover {
      background-color: #0056b3;
    }
  `}
`;

const ErrorMessage = styled.div`
  background: white;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ErrorTitle = styled.h2`
  color: #333;
  margin-bottom: 15px;
`;

const ErrorText = styled.p`
  color: #666;
  margin-bottom: 20px;
`;

const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { getOrderById, cancelOrder } = useOrders();
  const [isLoading, setIsLoading] = useState(false);

  const order = orderId ? getOrderById(parseInt(orderId)) : undefined;

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'processing': return 'Em processamento';
      case 'shipped': return 'Enviado';
      case 'delivered': return 'Entregue';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const canCancelOrder = (status: string) => {
    return status === 'pending' || status === 'processing';
  };

  const handleCancelOrder = async () => {
    if (!order || !window.confirm('Tem certeza que deseja cancelar este pedido?')) {
      return;
    }

    setIsLoading(true);
    
    try {
      const success = cancelOrder(order.id);
      
      if (success) {
        alert('Pedido cancelado com sucesso!');
        // Recarregar a página para mostrar o status atualizado
        window.location.reload();
      } else {
        alert('Não foi possível cancelar o pedido. Verifique se o pedido pode ser cancelado.');
      }
    } catch (error) {
      console.error('Erro ao cancelar pedido:', error);
      alert('Ocorreu um erro ao cancelar o pedido. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!order) {
    return (
      <Container>
        <BackButton to="/orders">Voltar para Meus Pedidos</BackButton>
        <ErrorMessage>
          <ErrorTitle>Pedido não encontrado</ErrorTitle>
          <ErrorText>Não foi possível encontrar os detalhes do pedido solicitado.</ErrorText>
          <Button onClick={() => navigate('/orders')}>Voltar para Meus Pedidos</Button>
        </ErrorMessage>
      </Container>
    );
  }

  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 10;

  return (
    <Container>
      <BackButton to="/orders">Voltar para Meus Pedidos</BackButton>
      
      <OrderHeader>
        <OrderTitle>Pedido #{order.id}</OrderTitle>
        <OrderInfo>
          <InfoItem>
            <h3>Data do Pedido</h3>
            <p>{order.date}</p>
          </InfoItem>
          <InfoItem>
            <h3>Status</h3>
            <p>
              <OrderStatus status={order.status}>
                {getStatusText(order.status)}
              </OrderStatus>
            </p>
          </InfoItem>
          <InfoItem>
            <h3>Total</h3>
            <p>R$ {order.total.toFixed(2)}</p>
          </InfoItem>
        </OrderInfo>
        
        {canCancelOrder(order.status) && (
          <ActionButtons>
            <Button 
              variant="danger" 
              onClick={handleCancelOrder}
              disabled={isLoading}
            >
              {isLoading ? 'Cancelando...' : 'Cancelar Pedido'}
            </Button>
          </ActionButtons>
        )}
      </OrderHeader>

      <OrderContent>
        <SectionTitle>Itens do Pedido</SectionTitle>
        <ItemsList>
          {order.items.map(item => (
            <OrderItem key={item.id}>
              <ItemImage>
                {item.image && (
                  <img src={item.image} alt={item.name} />
                )}
              </ItemImage>
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>R$ {item.price.toFixed(2)} cada</ItemPrice>
              </ItemInfo>
              <ItemQuantity>x{item.quantity}</ItemQuantity>
              <ItemTotal>R$ {(item.price * item.quantity).toFixed(2)}</ItemTotal>
            </OrderItem>
          ))}
        </ItemsList>

        <OrderSummary>
          <SummaryRow>
            <span>Subtotal:</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Frete:</span>
            <span>R$ {shipping.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Total:</span>
            <span>R$ {order.total.toFixed(2)}</span>
          </SummaryRow>
        </OrderSummary>
      </OrderContent>
    </Container>
  );
};

export default OrderDetailPage;