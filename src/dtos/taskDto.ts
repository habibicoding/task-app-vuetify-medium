export enum Priority {
  LOW,
  MEDIUM,
  HIGH
}

export enum TaskState {
  OPEN,
  CLOSED,
}

export interface TaskCreateRequest {
  description: string,
  isReminderSet: boolean,
  isTaskOpen: boolean,
  priority: Priority
}

export interface TaskFetchResponse {
  id: number,
  description: string,
  isReminderSet: boolean | null,
  isTaskOpen: boolean | null,
  createdOn: string | null,
  priority: Priority | null
}

export interface TaskUpdateRequest {
  description: string | null,
  isReminderSet: boolean | null,
  isTaskOpen: boolean | null,
  priority: Priority | null
}
