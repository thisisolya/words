import React from 'react';
import { Stack } from '@mui/material';
import styled from '@emotion/styled';
import palette from '../../theme/palette';

interface CustomCardProps {
  size: 'small' | 'medium' | 'large';
}
interface CardProps {
  children: React.ReactNode;
  size: 'small' | 'medium' | 'large';
}
const CustomCard = styled(Stack)<CustomCardProps>`
  background-color: ${palette.primary.light};
  border-radius: 5px; 
  box-shadow: ${(props) => (props.size === 'small' ? `3px 3px 1px 0.1px ${palette.primary.main}` : `5px 5px 1px 2px ${palette.primary.main}`)};
  box-shadow: ${(props) => (props.size === 'large' && `3px 3px 1px 1px ${palette.primary.main}`)};
  justify-content: ${(props) => (props.size === 'small' ? 'space-evenly' : 'center')};
  min-height: ${(props) => (props.size === 'small' ? '90px' : '150px')}; 
  min-width: ${(props) => (props.size === 'large' ? '200px' : '280px')};
  min-width: ${(props) => (props.size === 'small' && '100px')};
  gap: ${(props) => (props.size !== 'small' ? '15px' : undefined)};
  padding: ${(props) => (props.size !== 'medium' ? '5px 10px' : '25px')}; 
  margin: ${(props) => (props.size !== 'small' && '10px')};
`;
function Card({ children, size }: CardProps) {
  return <CustomCard size={size}>{children}</CustomCard>;
}

export default Card;
