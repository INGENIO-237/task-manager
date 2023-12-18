import { UserRepository } from "../repositories/users.repository";
import { createUserInput } from "../schemas/users.schemas";

const userRepository = UserRepository;

export const UserService = {
  getAllUsers: async () => {
    const users = await userRepository.getAllUsers();
    return users;
  },
  createUser: async (user: createUserInput["body"]) => {
    const createdUser = await userRepository.createUser(user);

    return createdUser;
  },
};
