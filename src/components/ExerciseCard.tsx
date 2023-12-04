import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";

interface ExerciseCardProps extends TouchableOpacityProps {
  name: string;
}

export default function ExerciseCard({ name, ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg={"gray.500"}
        alignItems={"center"}
        p={2}
        pr={4}
        rounded={"md"}
        mb={3}
      >
        <Image
          source={{
            uri: "https://thumb.mais.uol.com.br/16669847-large.jpg?ver=0",
          }}
          alt="Imagem do exercicio"
          w={16}
          h={16}
          rounded={"md"}
          mr={4}
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily={"heading"}>
            {name}
          </Heading>
          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>
        <Icon as={<Entypo name="chevron-right" />} color="gray.300" size="sm" />
      </HStack>
    </TouchableOpacity>
  );
}