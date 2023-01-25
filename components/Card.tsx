import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";

interface Props extends BoxProps {
  children: React.ReactNode;
}

function Card({ children, ...rest }: Props) {
  return (
    <Box
      p="20px"
      bg={useColorModeValue("white", "gray.800")}
      borderRadius="20px"
      boxShadow="sm"
      {...rest}
    >
      {children}
    </Box>
  );
}

export default Card;
