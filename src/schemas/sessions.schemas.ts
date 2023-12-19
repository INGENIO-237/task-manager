import { TypeOf, boolean, object, optional, string } from "zod";

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email format"),
    password: string({ required_error: "Password is required" }),
  }),
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>;

export const filterSessionsSchema = object({
  query: optional(
    object({
      user: optional(
        string({ invalid_type_error: "User id must be a string" })
      ),
      valid: optional(
        boolean({ invalid_type_error: "Valid must be a boolean" })
      ),
    })
  ),
});

export type FilterSessionsQuery = TypeOf<typeof filterSessionsSchema>;
