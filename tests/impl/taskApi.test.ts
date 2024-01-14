import {describe, expect, it} from 'vitest';
import {taskService} from '../../src/services/taskApi';
import {rest} from "msw";
import {server} from "../../src/setupTests";
import {HTTP_STATUS} from "../../src/constants/appConstants";
import {Priority, TaskCreateRequest, TaskUpdateRequest} from "../../src/dtos/taskDto";

describe('taskService Unit Tests', () => {
  it('when fetch tasks is triggered then expect two items', async () => {
    const response = await taskService.getTasks('open');
    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.data.length).toBe(2);
  });

  it('when creating a task then expect response to be equal request', async () => {
    const request: TaskCreateRequest = {
      description: 'workout',
      isReminderSet: true,
      isTaskOpen: true,
      priority: Priority[Priority.MEDIUM]
    }
    const response = await taskService.createTask(request);
    expect(response.status).toBe(HTTP_STATUS.CREATED);
    expect(response.data).toEqual(request);
  });

  it('when delete a task request ist send then expect 204 back', async () => {
    const response = await taskService.deleteTask(9);
    expect(response.status).toBe(HTTP_STATUS.NO_CONTENT);
  });

  it('when updating a task then expect response to be equal request', async () => {
    const request: TaskUpdateRequest = {
      description: 'buy groceries',
      isTaskOpen: true,
      isReminderSet: false,
      priority: Priority[Priority.HIGH],
    };
    const response = await taskService.updateTask(4, request);
    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.data).toEqual(request);
  });

  it('when bad task creation request is send then expect 400 back ', async () => {
    server.use(
      rest.post("https://backend4frontend.onrender.com/api/v1/tasks", (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({message: "Bad Request"}));
      })
    );

    const request: TaskCreateRequest = {
      description: 'workout',
      isReminderSet: true,
      isTaskOpen: true,
      priority: Priority.MEDIUM
    };

    let errorResponse;
    try {
      await taskService.createTask(request);
    } catch (error) {
      errorResponse = error;
    }

    expect(errorResponse).toBeDefined();
    expect(errorResponse.response.status).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(errorResponse.response.data.message).toBe("Bad Request");
  });

  it('when wrong task creation request is send then expect 500 back', async () => {
    server.use(
      rest.post("https://backend4frontend.onrender.com/api/v1/tasks", (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({message: "Internal Server Error"}));
      })
    );

    const request: TaskCreateRequest = {
      description: 'workout',
      isReminderSet: true,
      isTaskOpen: true,
      priority: Priority.MEDIUM
    };

    let errorResponse;
    try {
      await taskService.createTask(request);
    } catch (error) {
      errorResponse = error;
    }

    expect(errorResponse).toBeDefined();
    expect(errorResponse.response.status).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(errorResponse.response.data.message).toBe("Internal Server Error");
  });
});
