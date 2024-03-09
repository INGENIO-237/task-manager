import { TypeOf, object, string } from "zod";

export const createUseSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Invalid email format"),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - 6 chars minimum"),
  }),
});

export type CreateUserInput = TypeOf<typeof createUseSchema>;
