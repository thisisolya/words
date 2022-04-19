import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Typography } from '@mui/material';

function ReadonlyWords({ text }: { text: string }) {
  return (
    <AnimatePresence>
      <Typography
        key={text}
        fontWeight="600"
        textAlign="center"
        component={motion.p}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {text}
      </Typography>
    </AnimatePresence>
  );
}

export default ReadonlyWords;
