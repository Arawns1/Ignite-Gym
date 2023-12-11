import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { memo } from "react";
import { HStack, Heading, Text, VStack, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/axios";
import { Image } from "expo-image";

interface ExerciseCardProps extends TouchableOpacityProps {
  data: ExerciseDTO;
}

function ExerciseCardComponent({ data, ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest} testID="exerciseCard">
      <HStack bg={"gray.500"} alignItems={"center"} p={2} pr={4} rounded={"md"} mb={3}>
        <Image
          testID="exerciseImage"
          source={`${api.defaults.baseURL}/exercise/thumb/${data.thumb}`}
          contentFit="cover"
          style={{ width: 64, height: 64, marginRight: 16, borderRadius: 8 }}
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily={"heading"}>
            {data.name}
          </Heading>
          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </VStack>
        <Icon as={<Entypo name="chevron-right" />} color="gray.300" size="sm" />
      </HStack>
    </TouchableOpacity>
  );
}
export const ExerciseCard = memo(ExerciseCardComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.data, nextProps.data);
});
