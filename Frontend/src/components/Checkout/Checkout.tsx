import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../Cart/Cart';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="0.5" fill="%23000" opacity="0.02"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
    pointer-events: none;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 60px;
  }
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: 700;
  color: var(--color-black);
  margin-bottom: 50px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  width: 100%;
  position: relative;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    border-radius: 2px;
  }
`;

const CheckoutForm = styled.div`
  flex: 3;
  background: var(--color-white);
  border-radius: 16px;
  padding: 50px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%);
    border-radius: 16px 16px 0 0;
  }
  
  @media (max-width: 768px) {
    padding: 30px 20px;
    margin-bottom: 30px;
  }
`;

const FormSection = styled.div`
  margin-bottom: 40px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: var(--color-black);
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 3px solid var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--color-black);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  background: var(--color-white);
  color: var(--color-black);
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    background: #fafafa;
  }
  
  &:valid {
    border-color: #28a745;
  }
  
  &::placeholder {
    color: #adb5bd;
    transition: all 0.3s ease;
  }
  
  &:focus::placeholder {
    opacity: 0.7;
    transform: translateY(-2px);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  background: var(--color-white);
  color: var(--color-black);
  transition: all 0.3s ease;
  font-weight: 500;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    background: #fafafa;
  }
  
  &:hover {
    border-color: #ced4da;
  }
`;

const OrderSummary = styled.div`
  flex: 1;
  position: sticky;
  top: 40px;
  height: fit-content;
  min-width: 350px;
  
  @media (max-width: 768px) {
    position: static;
    min-width: auto;
  }
`;

const SummaryCard = styled.div`
  background: var(--color-white);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, transparent 0%, rgba(220, 38, 38, 0.02) 100%);
    pointer-events: none;
  }
`;

const SummaryTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: var(--color-black);
  margin-bottom: 24px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 500;
  color: var(--color-black);
  
  &:last-of-type {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 2px solid var(--color-primary);
    font-weight: 700;
    font-size: 20px;
    color: var(--color-primary);
  }
`;

const ItemsList = styled.div`
  margin-bottom: 24px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px 0;
  font-size: 15px;
  border-bottom: 1px solid #e9ecef;
  
  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
`;

const ItemName = styled.span`
  flex: 1;
  font-weight: 600;
  color: var(--color-black);
`;

const ItemQuantity = styled.span`
  color: #6c757d;
  margin: 0 12px;
  font-weight: 500;
  background: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 13px;
`;

const ItemPrice = styled.span`
  font-weight: 700;
  color: var(--color-primary);
  font-size: 16px;
`;

const PlaceOrderButton = styled.button`
  width: 100%;
  padding: 18px 32px;
  background: linear-gradient(135deg, #38a169, #48bb78);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 24px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(220, 38, 38, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(220, 38, 38, 0.3);
  }
  
  &:disabled {
    background: #adb5bd;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    
    &::before {
      display: none;
    }
  }
`;

const PaymentInfo = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  border-left: 4px solid var(--color-primary);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(220, 38, 38, 0.05) 0%, transparent 100%);
    pointer-events: none;
  }
  
  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

const InfoIcon = styled.span`
  font-size: 24px;
`;

const InfoText = styled.p`
  margin: 0;
  color: #495057;
  font-weight: 500;
  line-height: 1.5;
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
  const shipping = 10; // Frete fixo de R$ 10
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
      <Title>Finalizar Compra</Title>
      
      <MainContent>
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
              <PaymentInfo>
                <InfoIcon>💳</InfoIcon>
                <InfoText>Após finalizar o pedido, você receberá um QR Code para pagamento via PIX.</InfoText>
              </PaymentInfo>
            )}
            
            {paymentInfo.method === 'boleto' && (
              <PaymentInfo>
                <InfoIcon>📄</InfoIcon>
                <InfoText>Após finalizar o pedido, você receberá o boleto para pagamento.</InfoText>
              </PaymentInfo>
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
            <span>R$ {shipping.toFixed(2)}</span>
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
      </MainContent>
    </Container>
  );
};

export default Checkout;