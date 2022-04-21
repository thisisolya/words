import React from 'react';
import { Container, Stack, Typography } from '@mui/material';
import ButtonContained from '../shared/button-contained';

function EmptyGallery({ clickHandler }: { clickHandler: ()=> void }) {
  return (
    <Container>
      <Stack spacing={3}>
        <Typography>
          You have no cards yet. Woud you like to add some?
        </Typography>
        <ButtonContained
          text="Create card"
          clickHandler={clickHandler}
        />
      </Stack>
    </Container>
  );
}

export default EmptyGallery;
