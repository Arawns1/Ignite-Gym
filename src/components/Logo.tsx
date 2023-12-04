import LogoSVG from "@assets/logo.svg";
import { Center, Text } from "native-base";
export function Logo() {
  return (
    <Center my={24}>
      <LogoSVG />
      <Text fontSize="sm" color={"gray.100"}>
        Treine sua mente e o seu corpo
      </Text>
    </Center>
  );
}
