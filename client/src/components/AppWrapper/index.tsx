import React from 'react';
import { Stack } from '@mui/material';
import styled from '@emotion/styled';

const CustomizedWrapper = styled(Stack)`
  align-items: center;
  height: calc(100vh - 55px);
  overflow: hidden;
`;

function AppWrapper({ children }: { children: React.ReactNode }) {
  return <CustomizedWrapper>{children}</CustomizedWrapper>;
}

export default AppWrapper;
