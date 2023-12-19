import { CreateUserInput } from "../schemas/users.schemas";
import { UserService } from "../services/users.service";
import { Request, Response } from "express";

const userService = UserService;

export const UserController = {
  getAllUsers: async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();

    return res.json({ users });
  },
  createUser: async (
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response
  ) => {
    const user = await userService.createUser(req.body);

    return res.status(201).json({ user });
  },
};
