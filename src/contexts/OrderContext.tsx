import React, { createContext, useState, useContext, useEffect } from 'react';
import { Order } from '../components/Orders/Orders';
import { CartItem } from '../components/Cart/Cart';
import { ShippingInfo, PaymentInfo } from '../components/Checkout/Checkout';
import { useCart } from './CartContext';

interface OrderContextType {
  orders: Order[];
  createOrder: (items: CartItem[], shippingInfo: ShippingInfo, paymentInfo: PaymentInfo) => Promise<number>;
  getOrderById: (id: number) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

interface OrderProviderProps {
  children: React.ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { clearCart } = useCart();
  
  useEffect(() => {
    // Carregar pedidos do localStorage
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);
  
  useEffect(() => {
    // Salvar pedidos no localStorage sempre que houver alterações
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);
  
  const createOrder = async (items: CartItem[], shippingInfo: ShippingInfo, paymentInfo: PaymentInfo): Promise<number> => {
    try {
      // Gerar um ID único para o pedido
      const orderId = Date.now();
      
      // Calcular o total do pedido
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 10; // 10 é o valor do frete
      
      // Criar o novo pedido
      const newOrder: Order = {
        id: orderId,
        date: new Date().toLocaleDateString('pt-BR'),
        status: 'pending',
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        total
      };
      
      // Adicionar o novo pedido à lista de pedidos
      setOrders(prevOrders => [newOrder, ...prevOrders]);
      
      // Limpar o carrinho após a criação do pedido
      clearCart();
      
      return orderId;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw error;
    }
  };
  
  const getOrderById = (id: number) => {
    return orders.find(order => order.id === id);
  };
  
  const value = {
    orders,
    createOrder,
    getOrderById
  };
  
  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};