import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaClipboardList, FaWineBottle, FaSignOutAlt } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, var(--primary-black) 0%, var(--dark-gray) 100%);
  color: var(--primary-white);
  box-shadow: var(--shadow-lg);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--gradient-primary);
  }
`;

const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 32px;
  font-weight: 800;
  color: var(--primary-white);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: -0.025em;
  
  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 10px rgba(229, 62, 62, 0.5));
  }
`;

const LogoIconWrapper = styled.span`
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 36px;
  display: flex;
  align-items: center;
  filter: drop-shadow(0 2px 4px rgba(229, 62, 62, 0.3));
`;

const NavContainer = styled.nav`
  background: var(--gradient-primary);
  padding: 14px 0;
  box-shadow: var(--shadow-md);
  position: relative;
  

`;

const NavContent = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const NavLink = styled(Link)`
  color: var(--primary-white);
  text-decoration: none;
  font-weight: 700;
  padding: 12px 20px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.025em;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
    
    &::before {
      transform: translateY(0);
    }
  }
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const IconLink = styled(Link)`
  color: var(--primary-white);
  font-size: 22px;
  padding: 12px;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  
  &:hover {
    color: var(--primary-red);
    background: var(--primary-white);
    transform: translateY(-2px) scale(1.1);
    box-shadow: var(--shadow-md);
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background: var(--gradient-primary);
  color: var(--primary-white);
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 12px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--primary-white);
  box-shadow: var(--shadow-sm);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: var(--primary-white);
  font-weight: 600;
`;

const UserName = styled.span`
  font-size: 14px;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: var(--primary-white);
  font-size: 18px;
  padding: 12px;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  
  &:hover {
    color: var(--primary-red);
    background: var(--primary-white);
    transform: translateY(-2px) scale(1.1);
    box-shadow: var(--shadow-md);
  }
`;

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
  };
  
  return (
    <HeaderContainer>
      <TopHeader>
        <Logo to="/">
          <LogoIconWrapper>
            <FaWineBottle />
          </LogoIconWrapper>
          BEER Bebida Gelada
        </Logo>
        <IconsContainer>
          {isAuthenticated && user ? (
            <UserInfo>
              <UserName>Olá, {user.name}</UserName>
              <LogoutButton onClick={handleLogout} title="Sair">
                <FaSignOutAlt />
              </LogoutButton>
            </UserInfo>
          ) : (
            <IconLink to="/login">
              <FaUser />
            </IconLink>
          )}
          <IconLink to="/cart">
            <FaShoppingCart />
            {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
          </IconLink>
          <IconLink to="/orders">
            <FaClipboardList />
          </IconLink>
        </IconsContainer>
      </TopHeader>
      
      <NavContainer>
        <NavContent>
          <NavLink to="/">Início</NavLink>
          <NavLink to="/category/cervejas">Cervejas</NavLink>
          <NavLink to="/category/vinhos">Vinhos</NavLink>
          <NavLink to="/category/destilados">Destilados</NavLink>
          <NavLink to="/category/sem-alcool">Sem alcool</NavLink>
        </NavContent>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;