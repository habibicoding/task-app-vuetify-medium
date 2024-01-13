import {taskService} from "@/services/taskApi";
import {AxiosError} from "axios";
import logRequestError from "@/composables/logRequestError";
import {Ref} from "vue";

export async function removeTask(
  id: number,
  isLoading: Ref<boolean>,
  isNetworkError: Ref<boolean>,
  axiosError: Ref<AxiosError | unknown>,
  fetchTasks: (taskType: string) => Promise<void>,
  taskType: string
): Promise<void> {
  isLoading.value = true;
  await taskService.deleteTask(id).then(() => {
    fetchTasks(taskType);
    isLoading.value = false;
  }).catch((err: AxiosError | unknown) => {
    logRequestError('removeTask', err);
    axiosError.value = err instanceof AxiosError ? err : undefined;
    isNetworkError.value = true;
  }).finally(() => {
    isLoading.value = false;
  });
}
