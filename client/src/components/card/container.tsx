import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface CardContainerProps {
  children: React.ReactNode;
  paginateForwards: boolean;
  cardId: number;
}

function CardContainer({
  children, cardId, paginateForwards,
}: CardContainerProps) {
  const transitionInitialValue = paginateForwards ? '100%' : '-100%';
  const transitionExitValue = paginateForwards ? '-100%' : '100%';

  return (
    <AnimatePresence>
      <div style={{ overflow: 'hidden' }}>
        <motion.div
          key={cardId}
          initial={{ x: transitionInitialValue, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: transitionExitValue, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default CardContainer;
