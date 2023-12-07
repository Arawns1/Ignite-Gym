import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/axios";
import { useQuery } from "@tanstack/react-query";

export function useExercise(groupSelected: string) {
  const groupsQuery = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
  });

  const exercisesQuery = useQuery({
    queryKey: ["exercises", groupSelected],
    queryFn: getExercises,
  });

  async function getGroups(): Promise<string[]> {
    const response = await api.get("/groups");
    return response.data;
  }

  async function getExercises(): Promise<ExerciseDTO[]> {
    const response = await api.get(`/exercises/bygroup/${groupSelected}`);
    return response.data;
  }

  return { groupsQuery, exercisesQuery };
}
//TODO: Tratar erros com toasts
//const toast = useToast();
// if (groupsQuery.isError) {
//   const isAppError = groupsQuery.error instanceof AppError;
//   const title = isAppError ? groupsQuery.error.message : "Erro ao carregar exercícios";
//   toast.show({
//     title,
//     placement: "top",
//     bgColor: "red.500",
//     alignItems: "center",
//     textAlign: "center",
//   });
// }
