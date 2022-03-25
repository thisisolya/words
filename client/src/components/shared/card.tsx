import React from 'react';
import { Stack, styled } from '@mui/material';
import palette from '../../theme/palette';

interface CardProps {
  children: React.ReactNode;
  size: 'small' | 'medium' | 'large';
}
const CustomCard = styled(Stack)(({ size }: { size: 'small' | 'medium' | 'large' }) => {
  const boxShadowSmallAndMedium = size === 'small'
    ? `3px 3px 1px 0.1px ${palette.primary.main}`
    : `5px 5px 1px 2px ${palette.primary.main}`;
  const minWidthSmallAndMedium = size === 'small' ? '100px' : '150px';
  const minHeightSmallAndLarge = size === 'small' ? '90px' : '150px';
  const paddingMediumAndLarge = size === 'medium' ? '25px' : '5px 10px';
  const marginMediumAndLarge = size === 'medium' ? '10px 15px' : '10px';

  return ({
    backgroundColor: palette.primary.light,
    borderRadius: '5px',
    justifyContent: size === 'small' ? 'space-evenly' : 'center',
    boxShadow: size === 'large' ? `3px 3px 1px 1px ${palette.primary.main}` : boxShadowSmallAndMedium,
    minHeight: size !== 'medium' ? minHeightSmallAndLarge : undefined,
    minWidth: size === 'large' ? '200px' : minWidthSmallAndMedium,
    gap: size !== 'small' ? '15px' : undefined,
    padding: size !== 'small' ? paddingMediumAndLarge : undefined,
    margin: size !== 'small' ? marginMediumAndLarge : undefined,
  });
});

function Card({ children, size }: CardProps) {
  return <CustomCard size={size}>{children}</CustomCard>;
}

export default Card;
