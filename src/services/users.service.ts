import { UserRepository } from "../repositories/users.repository";
import { CreateUserInput } from "../schemas/users.schemas";
import { OperationalError } from "../utils/errors.utils";

const userRepository = UserRepository;

export const UserService = {
  getAllUsers: async () => {
    const users = await userRepository.getAllUsers();
    return users;
  },
  createUser: async (user: CreateUserInput["body"]) => {
    const existingUser = await userRepository.getUserByEmail(user.email);

    if (existingUser) throw new OperationalError("Email already in use");

    const createdUser = await userRepository.createUser(user);

    return createdUser;
  },
  getUserByEmail: async (email: string) => {
    return await userRepository.getUserByEmail(email);
  },
};
