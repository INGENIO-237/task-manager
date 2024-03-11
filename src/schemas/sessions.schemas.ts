import { TypeOf, boolean, object, optional, string } from "zod";

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email format"),
    password: string({ required_error: "Password is required" }).min(
      6,
      "Password too short - 6 chars minimum"
    ),
  }),
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>;

export const filterSessionsSchema = object({
  query: optional(
    object({
      _id: optional(
        string({ invalid_type_error: "Session id must be a string" })
      ),
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

export const updateSessionsSchema = object({
  params: object({
    _id: string({
      invalid_type_error: "Session id must be a string",
      required_error: "Session id is required",
    }),
    valid: optional(boolean({ invalid_type_error: "Valid must be a boolean" })),
  }),
  body: object({
    user: optional(string({ invalid_type_error: "User id must be a string" })),
    valid: optional(boolean({ invalid_type_error: "Valid must be a boolean" })),
  }),
});

export type UpdateSessions = TypeOf<typeof updateSessionsSchema>;
