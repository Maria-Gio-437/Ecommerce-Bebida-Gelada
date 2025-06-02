import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #45a049;
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
  display: inline-block;
  padding: 8px 15px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #45a049;
  }
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
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
}

interface OrdersProps {
  orders: Order[];
}

const Orders: React.FC<OrdersProps> = ({ orders }) => {
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
                  <ViewDetailsButton to={`/order/${order.id}`}>Ver Detalhes</ViewDetailsButton>
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