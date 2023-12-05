import React, { useCallback, useEffect, useState } from "react";
import { HStack, VStack, FlatList, Heading, Text, useToast } from "native-base";
import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";
import ExerciseCard from "@components/ExerciseCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";
import { api } from "@services/axios";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [groupSelected, setGroupSelected] = useState("antebraço");

  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);

  const toast = useToast();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate("exercise", { exerciseId });
  }

  async function fetchGroups() {
    try {
      const response = await api.get("/groups");
      setGroups(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível carregar os grupos musculares";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
        alignItems: "center",
        textAlign: "center",
      });
    }
  }

  async function fetchExerciseByGroup() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/bygroup/${groupSelected}`);
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível carregar os exercícios";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
        alignItems: "center",
        textAlign: "center",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExerciseByGroup();
    }, [groupSelected])
  );

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={groups}
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
      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={8}>
          <HStack justifyContent={"space-between"} mb={5}>
            <Heading color="gray.200" fontSize="md" fontFamily={"heading"}>
              Exercicios
            </Heading>
            <Text color="gray.200" fontSize="sm">
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
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
