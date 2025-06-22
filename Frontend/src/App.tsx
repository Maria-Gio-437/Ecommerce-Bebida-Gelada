import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

// Componentes
import Header from './components/Header/Header';
import AgeVerification from './components/AgeVerification/AgeVerification';

// Páginas
import Home from './pages/Home/Home';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage/OrderConfirmationPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage/OrderDetailPage';
import LoginPage from './pages/LoginPage/LoginPage';

// Contextos
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ProductProvider } from './contexts/ProductContext';
import { OrderProvider } from './contexts/OrderContext';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

const Footer = styled.footer`
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
`;

function App() {
  const [isAgeVerified, setIsAgeVerified] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Verificar se o usuário já confirmou a idade anteriormente
    const ageVerified = localStorage.getItem('ageVerified');
    if (ageVerified) {
      setIsAgeVerified(ageVerified === 'true');
    }
  }, []);
  
  const handleAgeVerification = (isAdult: boolean) => {
    setIsAgeVerified(isAdult);
    localStorage.setItem('ageVerified', isAdult.toString());
  };
  
  // Categorias para o cabeçalho
  const categories = ['Cervejas', 'Destilados', 'Vinhos', 'Sem Álcool'];
  
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>
              <AppContainer>
                {isAgeVerified === null && (
                  <AgeVerification onVerify={handleAgeVerification} />
                )}
                
                <Header />
                
                <MainContent>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:productId" element={<ProductDetailPage />} />
                    <Route path="/category/:categoryName" element={<CategoryPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/order/:orderId" element={<OrderDetailPage />} />
                    <Route path="/login" element={<LoginPage />} />
                  </Routes>
                </MainContent>
                
                <Footer>
                  <p>&copy; {new Date().getFullYear()} Bebida Gelada. Todos os direitos reservados.</p>
                  <p>Beba com moderação. Venda proibida para menores de 18 anos.</p>
                </Footer>
              </AppContainer>
            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
