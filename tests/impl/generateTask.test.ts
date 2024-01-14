import {describe, expect, it, vi} from 'vitest';
import {taskService} from "../../src/services/taskApi";
import {generateTask} from "../../src/composables/generateTask";
import {Ref, ref} from "vue";
import {AxiosError} from "axios";
import {mockTaskCreateRequest} from "../helper/mockResponse";

describe('generateTask tests', () => {
  const request = {title: 'New Task', completed: false};
  const isLoading: Ref<boolean> = ref(false);
  const isNetworkError: Ref<boolean> = ref(false);
  const axiosError: Ref<AxiosError | unknown> = ref(null);
  const navigateToTasksView = vi.fn();

  it('when create task is called then expect success path', async () => {
    taskService.createTask = async () => ({data: mockTaskCreateRequest});

    await generateTask(request, isLoading, isNetworkError, axiosError, navigateToTasksView);

    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(false);
    expect(axiosError.value).toBe(null);
    expect(navigateToTasksView).toHaveBeenCalled();
  });

  it('when create task is called then expect network error', async () => {
    const errorMessage = 'Network error';
    const mockError = new AxiosError(errorMessage);
    taskService.createTask = vi.fn(() => Promise.reject(mockError));

    await generateTask(request, isLoading, isNetworkError, axiosError, navigateToTasksView);

    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(true);
    expect(axiosError.value).toEqual(mockError);
    expect(mockError.message).toEqual(errorMessage);
  });
});
