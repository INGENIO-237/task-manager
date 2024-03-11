import { CreateUserInput } from "../schemas/users.schemas";
import { Request, Response } from "express";
import UserService from "../services/users.service";
import { Service } from "typedi";

@Service()
class UserController {
  constructor(private userService: UserService) {}

  async getUsers(req: Request, res: Response) {
    const users = await this.userService.getUsers();
    return res.json({ users });
  }
  async createUser(
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response
  ) {
    const user = await this.userService.createUser(req.body);

    return res.status(201).json({ user });
  }
}

export default UserController;
