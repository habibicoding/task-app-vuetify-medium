import {AxiosError, AxiosResponse} from "axios";
import axios, {AxiosInstance} from "axios";
import {HTTP_STATUS} from "@/constants/appConstants";
import {TaskCreateRequest, TaskUpdateRequest} from "@/dtos/taskDto";


const baseURL = 'https://backend4frontend.onrender.com/api/v1/';
const api: AxiosInstance = axios.create({baseURL});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const {status} = error.response;
      if (status === HTTP_STATUS.BAD_REQUEST) {
        console.error("Bad Request: ", error.response.data);
      } else if (status === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
        console.error("Internal Server Error: ", error.response.data);
      }
    } else {
      console.error("Error: ", error.message);
    }
    return Promise.reject(error);
  }
);

interface TaskService {
  getTasks: (status: string) => Promise<AxiosResponse>;
  createTask: (data: TaskCreateRequest) => Promise<AxiosResponse>;
  deleteTask: (id: number) => Promise<AxiosResponse>;
  updateTask: (id: number, data: TaskUpdateRequest) => Promise<AxiosResponse>;
}

export const taskService: TaskService = {
  getTasks(status: string) {
    return api.get(`/tasks?status=${status}`);
  },
  createTask(data: TaskCreateRequest) {
    return api.post('/tasks', data)
  },
  deleteTask(id: number) {
    return api.delete(`/tasks/${id}`)
  },
  updateTask(id: number, data: TaskUpdateRequest) {
    return api.patch(`/tasks/${id}`, data)
  }
};
