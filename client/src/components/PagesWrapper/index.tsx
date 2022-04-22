import React from 'react';
import { Stack } from '@mui/material';
import styled from '@emotion/styled';

const CustomizedWrapper = styled(Stack)`
  margin-top: 10vh;
`;

function PagesWrapper({ children }: { children: React.ReactNode }) {
  return <CustomizedWrapper>{children}</CustomizedWrapper>;
}

export default PagesWrapper;
