import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
import { HStack, Heading, Text, VStack, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/axios";
import { Image } from "expo-image";

interface ExerciseCardProps extends TouchableOpacityProps {
  data: ExerciseDTO;
}

const blurhash =
  "|VQmCrIU_3%Mxut7xuogRjxuM{ay%Mt7WBM{WBay~qxuD%RjoLoLRPM{fkRjfkWBM{oft6xuofWBRjxuxuNGRjayWVofoft7oLofWVWBoffkWBWBRjM{RjxuofkCt7t7aexut7WBWBWBRjaeofogoft7ofWBaeRjWBt7of";

export default function ExerciseCard({ data, ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg={"gray.500"} alignItems={"center"} p={2} pr={4} rounded={"md"} mb={3}>
        <Image
          source={`${api.defaults.baseURL}/exercise/thumb/${data.thumb}`}
          contentFit="cover"
          transition={500}
          placeholder={blurhash}
          cachePolicy={"memory-disk"}
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
