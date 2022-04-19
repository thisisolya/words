import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { negate } from 'ramda';

interface CardContainerProps {
  children: React.ReactNode;
  paginateForwards: boolean;
  cardId: number;
}

const transitionValue = 100;
const positiveTransition = `${transitionValue}%`;
const negativeTransition = `${negate(transitionValue)}%`;

function CardContainer({
  children, cardId, paginateForwards,
}: CardContainerProps) {
  return (
    <AnimatePresence>
      <div style={{ overflow: 'hidden' }}>
        <motion.div
          key={cardId}
          initial={{
            x: paginateForwards ? positiveTransition : negativeTransition,
            opacity: 0,
          }}
          animate={{ x: 0, opacity: 1 }}
          exit={{
            x: paginateForwards ? negativeTransition : positiveTransition,
            opacity: 0,
          }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default CardContainer;
