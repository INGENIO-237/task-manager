import { TypeOf, boolean, object, optional, string } from "zod";

export const createTaskSchema = object({
  body: object({
    title: string({
      required_error: "Task title is required",
      invalid_type_error: "Task title must be a string",
    }),
  }),
});

export type CreateTaskInput = TypeOf<typeof createTaskSchema>;

export const filterTasksSchema = object({
  query: object({
    title: optional(
      string({ invalid_type_error: "Task title must be a string" })
    ),
    completed: optional(
      boolean({ invalid_type_error: "Completed must be a boolean" })
    ),
  }),
});

export type FilterTasksQuery = TypeOf<typeof filterTasksSchema>;
