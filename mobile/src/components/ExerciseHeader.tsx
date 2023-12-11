import React from "react";
import { HStack, Heading, Icon, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import BodySVG from "@assets/body.svg";

type ExerciseHeaderProps = {
  name: string;
  type: string;
};

export default function ExerciseHeader({ name, type }: ExerciseHeaderProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <VStack px={4} bg="gray.600" pt={12} testID="exerciseHeader">
      <TouchableOpacity onPress={handleGoBack} testID="exerciseHeader__backButton">
        <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
      </TouchableOpacity>
      <HStack justifyContent={"space-between"} mt={4} mb={8} alignItems={"center"}>
        <Heading color="gray.100" fontSize="lg" flexShrink={1} fontFamily={"heading"}>
          {name}
        </Heading>
        <HStack alignItems={"center"}>
          <BodySVG />
          <Text color="gray.200" ml={1} textTransform={"capitalize"}>
            {type}
          </Text>
        </HStack>
      </HStack>
    </VStack>
  );
}
