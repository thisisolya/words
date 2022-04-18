import React from 'react';
import { FormControlLabel, Stack, Switch } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import styled from '@emotion/styled';

const CustomizedWrapper = styled(Stack)`
height: 100%;
min-height: 100vh;
padding: 10vh 0;
overflow: hidden;
align-items: center;
position: relative;
`;

const Triangle = styled(motion.div)`
  height: 60px;
  width: 60px;
  clip-path: polygon(50% 0, 0% 100%, 100% 100%);
  background-color: #303f9f;
  position: absolute;
  top: 45%;
  left: 10%;
  transform: rotate(45deg);
`;
const TriangleSmall = styled(motion.div)`
  height: 15px;
  width: 15px;
  clip-path: polygon(50% 0, 0% 100%, 100% 100%);
  background-color:#ae52d4;
  position: absolute;
  top: 8%;
  left: 90%; 
`;

const Star = styled(motion.div)`
  height: 50px;
  width: 50px;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 0% 35%, 39% 35%);
  background:#ff5722; 
  position: absolute;
  top: 9%;
  left: 0;
  z-index: 10; 
  padding: 10px;
`;

const Hexagon = styled(motion.div)`
  height: 40px;
  width: 40px;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  background: #ff8f00;
  position: absolute;
  top: 35%;
  left: 80%;
  z-index: 10; 
`;

const HexagonSmall = styled(motion.div)`
  height: 25px;
  width: 25px;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  background:#66bb6a;
  position: absolute;
  top: 40%;
  left: 3%;
  z-index: 10; 
`;

const ModeSwitcher = styled(FormControlLabel)`
    position: absolute;
    top: 95vh;
    left: 5vw;
`;

function Wrapper({ children }: { children: React.ReactNode }) {
  const [playMode, setPlayMode] = React.useState(false);

  return (
    <CustomizedWrapper>
      <AnimatePresence>
        { playMode
      && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >

          <Triangle
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, repeatType: 'reverse', duration: 10 }}
          />
          <TriangleSmall
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, repeatType: 'reverse', duration: 5 }}
          />
          <Star
            animate={{ scale: [0.5, 1, 1, 0.5], rotate: 360 }}
            transition={{ repeat: Infinity, duration: 7 }}
          />
          <Hexagon
            animate={{ scale: [0.8, 1, 1, 0.8], rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
          <HexagonSmall
            animate={{ scale: [0.5, 1, 1, 0.5], rotate: 360 }}
            transition={{ repeat: Infinity, duration: 7 }}
          />
        </motion.div>
      )}
      </AnimatePresence>
      <ModeSwitcher label="play mode" control={<Switch onClick={() => setPlayMode(!playMode)} />} />
      {children}
    </CustomizedWrapper>
  );
}

export default Wrapper;
