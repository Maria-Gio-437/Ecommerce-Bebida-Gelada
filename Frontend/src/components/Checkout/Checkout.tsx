import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../Cart/Cart';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 30px;
  }
`;

const Title = styled.h1`
  margin-bottom: 30px;
  color: #333;
  width: 100%;
`;

const CheckoutForm = styled.div`
  flex: 1;
  margin-bottom: 30px;
  
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const FormSection = styled.div`
  margin-bottom: 30px;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
`;

const OrderSummary = styled.div`
  flex: 0 0 350px;
`;

const SummaryCard = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  position: sticky;
  top: 20px;
`;

const SummaryTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  
  &:last-of-type {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #ddd;
    font-weight: bold;
    font-size: 16px;
  }
`;

const ItemsList = styled.div`
  margin-bottom: 20px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
`;

const ItemName = styled.span`
  flex: 1;
`;

const ItemQuantity = styled.span`
  color: #666;
  margin: 0 10px;
`;

const ItemPrice = styled.span`
  font-weight: 500;
`;

const PlaceOrderButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #45a049;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

interface CheckoutProps {
  cartItems: CartItem[];
  onPlaceOrder: (shippingInfo: ShippingInfo, paymentInfo: PaymentInfo) => void;
}

export interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PaymentInfo {
  method: string;
  cardNumber?: string;
  cardName?: string;
  expiryDate?: string;
  cvv?: string;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, onPlaceOrder }) => {
  const navigate = useNavigate();
  
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: 'credit',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };
  
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentInfo({
      ...paymentInfo,
      method: e.target.value
    });
  };
  
  const handlePaymentDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPlaceOrder(shippingInfo, paymentInfo);
    navigate('/order-confirmation');
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  const subtotal = calculateSubtotal();
  const shipping = 10;
  const total = subtotal + shipping;
  
  const isFormValid = () => {
    const isShippingValid = (
      shippingInfo.address.trim() !== '' &&
      shippingInfo.city.trim() !== '' &&
      shippingInfo.state.trim() !== '' &&
      shippingInfo.zipCode.trim() !== ''
    );
    
    let isPaymentValid = true;
    
    if (paymentInfo.method === 'credit' || paymentInfo.method === 'debit') {
      isPaymentValid = (
        paymentInfo.cardNumber?.trim() !== '' &&
        paymentInfo.cardName?.trim() !== '' &&
        paymentInfo.expiryDate?.trim() !== '' &&
        paymentInfo.cvv?.trim() !== ''
      );
    }
    
    return isShippingValid && isPaymentValid && cartItems.length > 0;
  };
  
  return (
    <Container>
      <div style={{ width: '100%' }}>
        <Title>Finalizar Compra</Title>
      </div>
      
      <CheckoutForm>
        <form onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>Endereço de Entrega</SectionTitle>
            <InputGroup>
              <Label htmlFor="address">Endereço</Label>
              <Input 
                type="text" 
                id="address" 
                name="address" 
                value={shippingInfo.address}
                onChange={handleShippingChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="city">Cidade</Label>
              <Input 
                type="text" 
                id="city" 
                name="city" 
                value={shippingInfo.city}
                onChange={handleShippingChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="state">Estado</Label>
              <Input 
                type="text" 
                id="state" 
                name="state" 
                value={shippingInfo.state}
                onChange={handleShippingChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="zipCode">CEP</Label>
              <Input 
                type="text" 
                id="zipCode" 
                name="zipCode" 
                value={shippingInfo.zipCode}
                onChange={handleShippingChange}
                required
              />
            </InputGroup>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Forma de Pagamento</SectionTitle>
            <InputGroup>
              <Label htmlFor="paymentMethod">Método de Pagamento</Label>
              <Select 
                id="paymentMethod" 
                name="method" 
                value={paymentInfo.method}
                onChange={handlePaymentMethodChange}
              >
                <option value="credit">Cartão de Crédito</option>
                <option value="debit">Cartão de Débito</option>
                <option value="pix">PIX</option>
                <option value="boleto">Boleto Bancário</option>
              </Select>
            </InputGroup>
            
            {(paymentInfo.method === 'credit' || paymentInfo.method === 'debit') && (
              <>
                <InputGroup>
                  <Label htmlFor="cardNumber">Número do Cartão</Label>
                  <Input 
                    type="text" 
                    id="cardNumber" 
                    name="cardNumber" 
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentDetailChange}
                    required
                  />
                </InputGroup>
                <InputGroup>
                  <Label htmlFor="cardName">Nome no Cartão</Label>
                  <Input 
                    type="text" 
                    id="cardName" 
                    name="cardName" 
                    value={paymentInfo.cardName}
                    onChange={handlePaymentDetailChange}
                    required
                  />
                </InputGroup>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <InputGroup style={{ flex: 1 }}>
                    <Label htmlFor="expiryDate">Data de Validade</Label>
                    <Input 
                      type="text" 
                      id="expiryDate" 
                      name="expiryDate" 
                      placeholder="MM/AA"
                      value={paymentInfo.expiryDate}
                      onChange={handlePaymentDetailChange}
                      required
                    />
                  </InputGroup>
                  <InputGroup style={{ flex: 1 }}>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      type="text" 
                      id="cvv" 
                      name="cvv" 
                      value={paymentInfo.cvv}
                      onChange={handlePaymentDetailChange}
                      required
                    />
                  </InputGroup>
                </div>
              </>
            )}
            
            {paymentInfo.method === 'pix' && (
              <div style={{ marginTop: '15px' }}>
                <p>Após finalizar o pedido, você receberá um QR Code para pagamento via PIX.</p>
              </div>
            )}
            
            {paymentInfo.method === 'boleto' && (
              <div style={{ marginTop: '15px' }}>
                <p>Após finalizar o pedido, você receberá o boleto para pagamento.</p>
              </div>
            )}
          </FormSection>
        </form>
      </CheckoutForm>
      
      <OrderSummary>
        <SummaryCard>
          <SummaryTitle>Resumo do Pedido</SummaryTitle>
          
          <ItemsList>
            {cartItems.map(item => (
              <Item key={item.id}>
                <ItemName>{item.name}</ItemName>
                <ItemQuantity>x{item.quantity}</ItemQuantity>
                <ItemPrice>R${(item.price * item.quantity).toFixed(2)}</ItemPrice>
              </Item>
            ))}
          </ItemsList>
          
          <SummaryItem>
            <span>Subtotal</span>
            <span>R${subtotal.toFixed(2)}</span>
          </SummaryItem>
          <SummaryItem>
            <span>Frete</span>
            <span>R${shipping.toFixed(2)}</span>
          </SummaryItem>
          <SummaryItem>
            <span>Total</span>
            <span>R${total.toFixed(2)}</span>
          </SummaryItem>
          
          <PlaceOrderButton 
            type="submit" 
            disabled={!isFormValid()}
            onClick={handleSubmit}
          >
            Finalizar Pedido
          </PlaceOrderButton>
        </SummaryCard>
      </OrderSummary>
    </Container>
  );
};

export default Checkout;