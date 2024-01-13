import {Ref} from "vue";
import {AxiosError} from "axios";
import {taskService} from "@/services/taskApi";
import logRequestError from "@/composables/logRequestError";
import {TaskUpdateRequest} from "@/dtos/taskDto";

export async function editTask(
  id: number,
  request: TaskUpdateRequest,
  isLoading: Ref<boolean>,
  isNetworkError: Ref<boolean>,
  axiosError: Ref<AxiosError | unknown>,
  navigateToTasksView: () => void): Promise<void> {
  isLoading.value = true;
  isNetworkError.value = false;
  await taskService.updateTask(id, request)
    .then(() => {
      isLoading.value = false;
      navigateToTasksView();
    })
    .catch((err: AxiosError | unknown) => {
      logRequestError('updateTask', err);
      axiosError.value = err instanceof AxiosError ? err : undefined;
      isNetworkError.value = true;
    })
    .finally(() => {
      isLoading.value = false;
    });
}
