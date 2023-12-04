import HistoryCard from "@components/HistoryCard";
import ScreenHeader from "@components/ScreenHeader";
import { Center, Heading, VStack, SectionList, Text } from "native-base";
import { useState } from "react";

export default function History() {
  const [exercise, setExercise] = useState([
    {
      title: "26.11.23",
      data: ["Pizza", "Burger", "Risotto"],
    },
    {
      title: "23.11.23",
      data: ["Pizza", "Burger", "Risotto"],
    },
    {
      title: "20.11.23",
      data: ["Pizza", "Burger", "Risotto"],
    },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Componentes" />

      <SectionList
        sections={exercise}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading
            color={"gray.200"}
            fontSize={"md"}
            mt={10}
            mb={3}
            fontFamily={"heading"}
          >
            {section.title}
          </Heading>
        )}
        contentContainerStyle={
          exercise.length === 0 && { flex: 1, justifyContent: "center" }
        }
        ListEmptyComponent={() => (
          <Text color={"gray.100"} textAlign={"center"}>
            Não há exercícios registrados ainda.{"\n"} Vamos fazer exercícios
            hoje?
          </Text>
        )}
        px={8}
      />
    </VStack>
  );
}
