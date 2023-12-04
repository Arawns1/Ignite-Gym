import ExerciseHeader from "@components/ExerciseHeader";
import {
  Center,
  Text,
  VStack,
  Image,
  Box,
  HStack,
  ScrollView,
} from "native-base";
import SeriesSVG from "@assets/series.svg";
import RepetitionsSVG from "@assets/repetitions.svg";
import Button from "@components/Button";
export default function Exercise() {
  return (
    <VStack flex={1}>
      <ExerciseHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack p={8}>
          <Image
            w="full"
            h={80}
            source={{
              uri: "https://thumb.mais.uol.com.br/16669847-large.jpg?ver=0",
            }}
            alt="Nome do exercício"
            mb={3}
            resizeMode="cover"
            rounded={"lg"}
          />
          <Box bg={"gray.600"} rounded={"md"} pb={4} px={4}>
            <HStack
              alignItems={"center"}
              justifyContent={"space-around"}
              mb={6}
              mt={5}
            >
              <HStack>
                <SeriesSVG />
                <Text color={"gray.200"} ml={2}>
                  3 séries
                </Text>
              </HStack>
              <HStack>
                <RepetitionsSVG />
                <Text color={"gray.200"} ml={2}>
                  12 repetições
                </Text>
              </HStack>
            </HStack>
            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
