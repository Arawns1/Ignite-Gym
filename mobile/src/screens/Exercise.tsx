import RepetitionsSVG from "@assets/repetitions.svg";
import SeriesSVG from "@assets/series.svg";
import Button from "@components/Button";
import ExerciseHeader from "@components/ExerciseHeader";
import { Loading } from "@components/Loading";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { useHistory } from "@hooks/useHistory";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/axios";
import { AppError } from "@utils/AppError";
import { Box, HStack, Image, ScrollView, Text, VStack, Toast } from "native-base";
import { useEffect, useState } from "react";

type RouteParamsProps = {
  exerciseId: string;
};

export default function Exercise() {
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute();
  const { historyPost } = useHistory();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
  const { exerciseId } = route.params as RouteParamsProps;

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);
      setExercise(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício ";
      Toast.show({
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

  async function handleExerciseHistoryRegister() {
    historyPost.mutate(exerciseId, {
      onSuccess: () => {
        Toast.show({
          title: "Parabéns! Exercício registrado no seu histórico.",
          placement: "top",
          bgColor: "green.500",
          alignItems: "center",
          textAlign: "center",
        });
        navigation.navigate("history");
      },
      onError: (error) => {
        const isAppError = error instanceof AppError;
        const title = isAppError ? error.message : "Não foi possível registrar o exercício ";
        Toast.show({
          title,
          placement: "top",
          bgColor: "red.500",
          alignItems: "center",
          textAlign: "center",
        });
      },
    });
  }
  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <ExerciseHeader name={exercise.name} type={exercise.group} />

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack p={8}>
            <Box rounded={"lg"} mb={3} overflow={"hidden"}>
              <Image
                w="full"
                h={80}
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                alt="Nome do exercício"
                resizeMode="cover"
                rounded={"lg"}
              />
            </Box>
            <Box bg={"gray.600"} rounded={"md"} pb={4} px={4}>
              <HStack alignItems={"center"} justifyContent={"space-around"} mb={6} mt={5}>
                <HStack>
                  <SeriesSVG />
                  <Text color={"gray.200"} ml={2}>
                    {exercise.series} séries
                  </Text>
                </HStack>
                <HStack>
                  <RepetitionsSVG />
                  <Text color={"gray.200"} ml={2}>
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>
              <Button
                title="Marcar como realizado"
                isLoading={historyPost.isPending}
                onPress={handleExerciseHistoryRegister}
              />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  );
}
