import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";
import React from "react";

interface ButtonProps extends IButtonProps {
  title: string;
  variant?: "solid" | "outline";
}

export default function Button({ title, variant = "solid", ...rest }: ButtonProps) {
  return (
    <ButtonNativeBase
      {...rest}
      w="full"
      h={14}
      bg={variant === "outline" ? "transparent" : "green.700"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor={"green.500"}
      _pressed={{ bg: variant === "outline" ? "gray.500" : "green.500" }}
      testID="buttonComponent"
    >
      <Text
        color={variant === "outline" ? "green.500" : "white"}
        fontFamily={"heading"}
        fontSize="sm"
        testID="buttonComponent__text"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
