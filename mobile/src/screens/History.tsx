import HistoryCard from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import ScreenHeader from "@components/ScreenHeader";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/axios";
import { AppError } from "@utils/AppError";
import { Center, Heading, VStack, SectionList, Text, useToast } from "native-base";
import { useCallback, useState } from "react";

export default function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercise, setExercise] = useState<HistoryByDayDTO[]>([]);

  const toast = useToast();

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get(`/history`);
      setExercise(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível carregar o histórico ";
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

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Componentes" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercise}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section }) => (
            <Heading color={"gray.200"} fontSize={"md"} mt={10} mb={3} fontFamily={"heading"}>
              {section.title}
            </Heading>
          )}
          contentContainerStyle={exercise.length === 0 && { flex: 1, justifyContent: "center" }}
          ListEmptyComponent={() => (
            <Text color={"gray.100"} textAlign={"center"}>
              Não há exercícios registrados ainda.{"\n"} Vamos fazer exercícios hoje?
            </Text>
          )}
          px={8}
        />
      )}
    </VStack>
  );
}
