import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { motion } from "motion/react";
interface CardProps {
  dia: string;
  img_src: string;
  max_temp: number;
  min_temp: number;
}
export function Card({ img_src, dia, max_temp, min_temp }: CardProps) {
  return (
    <motion.div
      whileHover={{
        scale: [null, 1.2],
        transition: {
          duration: 0.2,
          times: [0, 1],
          ease: ["easeInOut", "easeOut"],
        },
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      <Flex
        background={"#046b8d70"}
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"column"}
        padding={"25px 5px"}
        borderRadius={"10px"}
        height={"250px"}
        scrollSnapAlign={"start"}
        width={"130px"}
        flexShrink={0}
      >
        <Box>
          <Text textTransform={"uppercase"}>{dia}</Text>
        </Box>
        <Box>
          <img src={img_src} alt="Ícone do tempo" width={"90px"} />
        </Box>
        <Box fontSize={20} textAlign={"center"}>
          <Text>Max: {max_temp}</Text>
          <Text>Min: {min_temp}</Text>
        </Box>
      </Flex>
    </motion.div>
  );
}
