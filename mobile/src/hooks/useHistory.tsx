import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";
import { api } from "@services/axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export function useHistory() {
  const historyQuery = useQuery({ queryKey: ["history"], queryFn: getHistory, initialData: [] });
  const queryClient = useQueryClient();

  async function getHistory(): Promise<HistoryByDayDTO[]> {
    const response = await api.get(`/history`);
    return response.data;
  }

  const historyPost = useMutation({ mutationFn: handlePost });
  async function handlePost(exerciseId: string) {
    const response = await api.post(`/history`, { exercise_id: exerciseId });
    await queryClient.invalidateQueries({ queryKey: ["history"] });
    return response.data;
  }

  return { historyQuery, historyPost };
}

//TODO: implementar toast error
// const toast = useToast();
//   } catch (error) {
//     const isAppError = error instanceof AppError;
//     const title = isAppError ? error.message : "Não foi possível carregar o histórico ";
//     toast.show({
//       title,
//       placement: "top",
//       bgColor: "red.500",
//       alignItems: "center",
//       textAlign: "center",
//     });
//   }
