import { GridItem, GridItemProps, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface Props extends GridItemProps {
  children: React.ReactNode;
  isDark?: boolean;
}

const darkBg = "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)";

const GridItemCard = ({ children, isDark, ...rest }: Props) => {
  return (
    <GridItem
      bg={useColorModeValue(
        isDark ? darkBg : "white",
        isDark ? darkBg : "gray.900"
      )}
      borderRadius={20}
      boxShadow="sm"
      p={4}
      {...rest}
    >
      {children}
    </GridItem>
  );
};

export default GridItemCard;
