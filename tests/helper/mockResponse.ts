import {TaskCreateRequest, TaskFetchResponse, TaskUpdateRequest} from "../../src/dtos/taskDto";

export const mockTaskFetchResponse: TaskFetchResponse[] = [{
  "id": 23,
  "description": "test new nav",
  "isReminderSet": false,
  "isTaskOpen": false,
  "createdOn": "2023-12-26T17:53:53.045334",
  "priority": "LOW"
}, {
  "id": 25,
  "description": "Write new Unit Tests",
  "isReminderSet": true,
  "isTaskOpen": true,
  "createdOn": "2023-12-26T17:55:41.73961",
  "priority": "HIGH"
}]

export const mockTaskUpdateRequest: TaskUpdateRequest = {
  "description": "buy groceries",
  "isReminderSet": false,
  "isTaskOpen": true,
  "priority": "HIGH"
}

export const mockTaskCreateRequest: TaskCreateRequest= {
  "description": "workout",
  "isReminderSet": true,
  "isTaskOpen": true,
  "priority": "MEDIUM"
}
