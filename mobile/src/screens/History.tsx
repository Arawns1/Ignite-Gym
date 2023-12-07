import HistoryCard from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import ScreenHeader from "@components/ScreenHeader";
import { useFocusEffect } from "@react-navigation/native";
import { Heading, SectionList, Text, VStack } from "native-base";
import { useHistory } from "@hooks/useHistory";
import { useCallback } from "react";
export default function History() {
  const {historyQuery} = useHistory();

  // useFocusEffect(
  //   useCallback(() => {
  //     historyQuery.refetch();
  //   }, [])
  // );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Componentes" />

      {historyQuery.isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={historyQuery.data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section }) => (
            <Heading color={"gray.200"} fontSize={"md"} mt={10} mb={3} fontFamily={"heading"}>
              {section.title}
            </Heading>
          )}
          contentContainerStyle={
            historyQuery.data.length === 0 && { flex: 1, justifyContent: "center" }
          }
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
