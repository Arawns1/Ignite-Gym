import React from "react";
import { HStack, Heading, Icon, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import BodySVG from "@assets/body.svg";
export default function ExerciseHeader() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <VStack px={4} bg="gray.600" pt={12}>
      <TouchableOpacity onPress={handleGoBack}>
        <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
      </TouchableOpacity>
      <HStack
        justifyContent={"space-between"}
        mt={4}
        mb={8}
        alignItems={"center"}
      >
        <Heading
          color="gray.100"
          fontSize="lg"
          flexShrink={1}
          fontFamily={"heading"}
        >
          Puxada Frontal
        </Heading>
        <HStack alignItems={"center"}>
          <BodySVG />
          <Text color="gray.200" ml={1} textTransform={"capitalize"}>
            Costas
          </Text>
        </HStack>
      </HStack>
    </VStack>
  );
}
