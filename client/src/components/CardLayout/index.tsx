import React from 'react';
import CustomCard from './styles';

interface CardProps {
  children: React.ReactNode;
  size: 'small' | 'medium' | 'large';
}

function CardLayout({ children, size }: CardProps) {
  return (
    <CustomCard size={size}>
      {children}
    </CustomCard>
  );
}

export default CardLayout;
