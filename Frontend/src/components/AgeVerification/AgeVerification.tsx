import React, { useState } from 'react';
import styled from 'styled-components';

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const VerificationCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  width: 90%;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Description = styled.p`
  margin-bottom: 30px;
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  background: ${props => props.primary ? 'linear-gradient(135deg, #38a169, #48bb78)' : '#f44336'};
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.primary ? 'linear-gradient(135deg, #2f855a, #38a169)' : '#d32f2f'};
  }
`;

interface AgeVerificationProps {
  onVerify: (isAdult: boolean) => void;
}

const AgeVerification: React.FC<AgeVerificationProps> = ({ onVerify }) => {
  return (
    <OverlayContainer>
      <VerificationCard>
        <Title>Verificação de Idade</Title>
        <Description>
          Este site contém produtos alcoólicos. Você confirma que tem pelo menos 18 anos de idade?
        </Description>
        <ButtonContainer>
          <Button onClick={() => onVerify(false)}>Não, sou menor de 18 anos</Button>
          <Button primary onClick={() => onVerify(true)}>Sim, tenho 18 anos ou mais</Button>
        </ButtonContainer>
      </VerificationCard>
    </OverlayContainer>
  );
};

export default AgeVerification;