import User from "../models/users.model";
import { createUserInput } from "../schemas/users.schemas";

export const UserRepository = {
  getAllUsers: async () => {
    const users = await User.find().select("-password").exec();
    return users;
  },
  createUser: async (user: createUserInput["body"]) => {
    const createdUser = await User.create(user);

    return createdUser;
  },
};
