import User from "../models/users.model";
import { CreateUserInput } from "../schemas/users.schemas";

export const UserRepository = {
  getAllUsers: async () => {
    const users = await User.find().select("-password").exec();
    return users;
  },
  createUser: async (user: CreateUserInput["body"]) => await User.create(user),
  getUserByEmail: async (email: string) => await User.findOne({ email }),
};
