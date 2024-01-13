import {afterAll, afterEach, beforeAll} from "vitest";
import {rest} from "msw";
import "whatwg-fetch";
import {setupServer} from "msw/native";
import {mockTaskCreateRequest, mockTaskFetchResponse, mockTaskUpdateRequest} from "../tests/helper/mockResponse";


export const restHandlers = [
  rest.get("https://backend4frontend.onrender.com/api/v1/tasks", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockTaskFetchResponse));
  }),
  // Add mocks for POST, DELETE, and PATCH
  rest.post("https://backend4frontend.onrender.com/api/v1/tasks", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(mockTaskCreateRequest)); // Assume successful creation
  }),
  rest.delete("https://backend4frontend.onrender.com/api/v1/tasks/:id", (req, res, ctx) => {
    return res(ctx.status(204)); // Assume successful deletion
  }),
  rest.patch("https://backend4frontend.onrender.com/api/v1/tasks/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockTaskUpdateRequest)); // Assume successful update
  })
];

export const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({onUnhandledRequest: "error"}));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
