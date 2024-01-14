import {describe, expect, it, vi} from 'vitest';
import {taskService} from "../../src/services/taskApi";
import {editTask} from "../../src/composables/editTask";
import {AxiosError} from "axios";
import {ref, Ref} from "vue";
import {mockTaskUpdateRequest} from "../helper/mockResponse";


describe('editTask tests', () => {
  const id = 1;
  const request = {title: 'New Task', completed: false};
  const isLoading: Ref<boolean> = ref(false);
  const isNetworkError: Ref<boolean> = ref(false);
  const axiosError: Ref<AxiosError | unknown> = ref(null);
  const navigateToTasksView = vi.fn();

  it('when update task is called then expect success path', async () => {
    taskService.updateTask = async () => ({data: mockTaskUpdateRequest});


    await editTask(id, request, isLoading, isNetworkError, axiosError, navigateToTasksView);

    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(false);
    expect(axiosError.value).toBe(null);
    expect(navigateToTasksView).toHaveBeenCalled();
  });

  it('when update task is called then expect network error', async () => {
    const errorMessage = 'Network error';
    const mockError = new AxiosError(errorMessage);
    taskService.updateTask = vi.fn(() => Promise.reject(mockError));

    await editTask(id, request, isLoading, isNetworkError, axiosError, navigateToTasksView);

    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(true);
    expect(axiosError.value).toEqual(mockError);
    expect(mockError.message).toEqual(errorMessage);
  });
});
