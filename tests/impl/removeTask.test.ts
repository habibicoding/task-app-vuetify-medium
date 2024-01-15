import {describe, expect, it, vi} from 'vitest';
import {taskService} from "../../src/services/taskApi";
import {removeTask} from "../../src/composables/removeTask";
import {Ref, ref} from "vue";
import {AxiosError} from "axios";


describe('removeTask tests', () => {
  const id = 1;
  const isLoading: Ref<boolean> = ref(false);
  const isNetworkError: Ref<boolean> = ref(false);
  const axiosError: Ref<AxiosError | unknown> = ref(null);
  const fetchTasks = vi.fn();
  const taskType = 'completed';

  it('when delete task is called then expect success path', async () => {
    taskService.deleteTask = async () => ({});

    await removeTask(id, isLoading, isNetworkError, axiosError, fetchTasks, taskType);

    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(false);
    expect(fetchTasks).toHaveBeenCalled();
  });

  it('when delete task is called then expect network error', async () => {
    const errorMessage = 'Network error';
    const mockError = new AxiosError(errorMessage);
    taskService.deleteTask = vi.fn(() => Promise.reject(mockError));

    await removeTask(id, isLoading, isNetworkError, axiosError, fetchTasks, taskType);

    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(true);
    expect(axiosError.value).toEqual(mockError);
    expect(mockError.message).toEqual(errorMessage);
  });
});
