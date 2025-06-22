import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useOrders } from '../../contexts/OrderContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  color: #333;
`;

const EmptyOrders = styled.div`
  text-align: center;
  padding: 40px;
  background-color: #f8f8f8;
  border-radius: 8px;
`;

const EmptyOrdersText = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
`;

const ShopNowButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background: linear-gradient(135deg, #38a169, #48bb78);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #2f855a, #38a169);
  }
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const OrderCard = styled.div`
  background-color: #f8f8f8;
  border-radius: 8px;
  overflow: hidden;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #e0e0e0;
`;

const OrderNumber = styled.span`
  font-weight: bold;
`;

const OrderDate = styled.span`
  color: #666;
`;

const OrderStatus = styled.div<{ status: string }>`
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${props => {
    switch (props.status) {
      case 'pending': return '#FFF3CD';
      case 'processing': return '#D1ECF1';
      case 'shipped': return '#D4EDDA';
      case 'delivered': return '#C3E6CB';
      case 'cancelled': return '#F8D7DA';
      default: return '#e0e0e0';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'pending': return '#856404';
      case 'processing': return '#0C5460';
      case 'shipped': return '#155724';
      case 'delivered': return '#155724';
      case 'cancelled': return '#721C24';
      default: return '#333';
    }
  }};
`;

const OrderContent = styled.div`
  padding: 20px;
`;

const OrderItems = styled.div`
  margin-bottom: 20px;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ItemImage = styled.div`
  width: 50px;
  height: 50px;
  background-color: #e0e0e0;
  margin-right: 15px;
`;

const ItemDetails = styled.div``;

const ItemName = styled.div`
  font-weight: 500;
`;

const ItemPrice = styled.div`
  color: #666;
  font-size: 14px;
`;

const ItemQuantity = styled.div`
  color: #666;
`;

const OrderSummary = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
`;

const OrderTotal = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const ViewDetailsButton = styled(Link)`
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
  margin-right: 10px;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #c82333;
  }
  
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const OrderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: number;
  userId: number;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
}

interface OrdersProps {
  orders: Order[];
}

interface OrdersComponentState {
  cancellingOrderId: number | null;
}

const Orders: React.FC<OrdersProps> = ({ orders }) => {
  const { cancelOrder } = useOrders();
  const [cancellingOrderId, setCancellingOrderId] = useState<number | null>(null);
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
  
  const handleCancelOrder = async (orderId: number) => {
    if (!window.confirm('Tem certeza que deseja cancelar este pedido?')) {
      return;
    }
    
    setCancellingOrderId(orderId);
    
    try {
      const success = cancelOrder(orderId);
      
      if (success) {
        alert('Pedido cancelado com sucesso!');
      } else {
        alert('Não foi possível cancelar o pedido.');
      }
    } catch (error) {
      console.error('Erro ao cancelar pedido:', error);
      alert('Ocorreu um erro ao cancelar o pedido.');
    } finally {
      setCancellingOrderId(null);
    }
  };
  
  return (
    <Container>
      <Title>Meus Pedidos</Title>
      
      {orders.length === 0 ? (
        <EmptyOrders>
          <EmptyOrdersText>Você ainda não realizou nenhum pedido.</EmptyOrdersText>
          <ShopNowButton to="/">Comprar Agora</ShopNowButton>
        </EmptyOrders>
      ) : (
        <OrdersList>
          {orders.map(order => (
            <OrderCard key={order.id}>
              <OrderHeader>
                <OrderNumber>Pedido #{order.id}</OrderNumber>
                <OrderDate>{order.date}</OrderDate>
                <OrderStatus status={order.status}>
                  {getStatusText(order.status)}
                </OrderStatus>
              </OrderHeader>
              
              <OrderContent>
                <OrderItems>
                  {order.items.slice(0, 3).map(item => (
                    <OrderItem key={item.id}>
                      <ItemInfo>
                        <ItemImage>
                          {item.image && <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                        </ItemImage>
                        <ItemDetails>
                          <ItemName>{item.name}</ItemName>
                          <ItemPrice>R${item.price.toFixed(2)}</ItemPrice>
                        </ItemDetails>
                      </ItemInfo>
                      <ItemQuantity>x{item.quantity}</ItemQuantity>
                    </OrderItem>
                  ))}
                  
                  {order.items.length > 3 && (
                    <div style={{ textAlign: 'center', color: '#666', marginTop: '10px' }}>
                      + {order.items.length - 3} itens adicionais
                    </div>
                  )}
                </OrderItems>
                
                <OrderSummary>
                  <OrderTotal>Total: R${order.total.toFixed(2)}</OrderTotal>
                  <OrderActions>
                    <ViewDetailsButton to={`/order/${order.id}`}>Ver Detalhes</ViewDetailsButton>
                    {canCancelOrder(order.status) && (
                      <CancelButton 
                        onClick={() => handleCancelOrder(order.id)}
                        disabled={cancellingOrderId === order.id}
                      >
                        {cancellingOrderId === order.id ? 'Cancelando...' : 'Cancelar'}
                      </CancelButton>
                    )}
                  </OrderActions>
                </OrderSummary>
              </OrderContent>
            </OrderCard>
          ))}
        </OrdersList>
      )}
    </Container>
  );
};

export default Orders;