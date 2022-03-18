import React from "react";
import { Stack } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

const Container = ({ children }: any) => {
  React.useEffect(() => {
    console.log(children);
  }, [children]);

  return (
    <AnimatePresence>
      <Stack
        m={2}
        key={children}
        spacing={2}
        component={motion.div}
        layout
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
      >
        {children}
      </Stack>
    </AnimatePresence>
  );
};

export default Container;
