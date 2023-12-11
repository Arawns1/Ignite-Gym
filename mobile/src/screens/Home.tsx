import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeaderComponent";
import { Loading } from "@components/Loading";
import { Feather } from "@expo/vector-icons";
import { useExercise } from "@hooks/useExercise";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Box, FlatList, HStack, Heading, Icon, Text, VStack } from "native-base";
import React, { useState } from "react";
export default function Home() {
  const [groupSelected, setGroupSelected] = useState("antebraço");
  const { groupsQuery, exercisesQuery } = useExercise(groupSelected);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate("exercise", { exerciseId });
  }

  if (groupsQuery.error || exercisesQuery.error) {
    return (
      <VStack flex={1}>
        <HomeHeader />
        <Box flex={1} justifyContent="center" alignItems="center" opacity={0.8}>
          <Icon as={Feather} name="alert-triangle" size={12} color="gray.200" />
          <Text color="gray.200" fontSize="sm">
            Erro ao carregar exercícios
          </Text>
        </Box>
      </VStack>
    );
  }

  return (
    <VStack flex={1} testID="homeScreen">
      <HomeHeader />
      <FlatList
        data={groupsQuery.data}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toLocaleUpperCase() === String(item).toLocaleUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />

      {exercisesQuery.isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={8}>
          <HStack justifyContent={"space-between"} mb={5}>
            <Heading color="gray.200" fontSize="md" fontFamily={"heading"}>
              Exercícios
            </Heading>
            <Text color="gray.200" fontSize="sm">
              {exercisesQuery.data?.length || 0} exercícios
            </Text>
          </HStack>

          <FlatList
            data={exercisesQuery.data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard data={item} onPress={() => handleOpenExerciseDetails(item.id)} />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
          />
        </VStack>
      )}
    </VStack>
  );
}
