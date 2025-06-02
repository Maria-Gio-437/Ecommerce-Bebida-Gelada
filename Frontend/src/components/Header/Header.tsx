import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import { FaUser, FaShoppingCart, FaClipboardList } from 'react-icons/fa';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #e0e0e0;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
`;

const NavContainer = styled.nav`
  display: flex;
  gap: 20px;
  margin-top: 10px;
  padding: 10px 0;
  background-color: #f0f0f0;
  width: 100%;
  justify-content: center;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 5px 10px;
  transition: color 0.3s;
  
  &:hover {
    color: #4CAF50;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const IconLink = styled(Link)`
  color: #333;
  font-size: 20px;
  transition: color 0.3s;
  
  &:hover {
    color: #4CAF50;
  }
`;

interface HeaderProps {
  categories: string[];
}

const Header: React.FC<HeaderProps> = ({ categories }) => {
  return (
    <>
      <HeaderContainer>
        <Logo to="/">Logo</Logo>
        <IconsContainer>
          <IconLink to="/login" title="Entrar ou Cadastrar">
            👤
          </IconLink>
          <IconLink to="/cart" title="Carrinho">
            🛒
          </IconLink>
          <IconLink to="/orders" title="Meus Pedidos">
            📋
          </IconLink>
        </IconsContainer>
      </HeaderContainer>
      <NavContainer>
        {categories.map((category, index) => (
          <NavLink key={index} to={`/category/${category.toLowerCase()}`}>
            {category}
          </NavLink>
        ))}
      </NavContainer>
    </>
  );
};

export default Header;