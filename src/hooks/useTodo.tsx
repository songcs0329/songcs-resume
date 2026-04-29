import { useQuery } from '@tanstack/react-query';
import apiManager from '@/libs/apis/apiManager';

export default function useTodo(todoId: number | undefined) {
  return useQuery({
    queryKey: ['todo', todoId],
    queryFn: async function () {
      const { data } = await apiManager.getTodo(todoId!);
      return data;
    },
    enabled: !!todoId,
  });
}
