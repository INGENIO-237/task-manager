import { UserRepository } from "../repositories/users.repository";
import { CreateUserInput } from "../schemas/users.schemas";
import ApiError from "../utils/errors/errors.base";
import HTTP_RESPONSE_CODES from "../utils/http.codes";

const userRepository = UserRepository;

export const UserService = {
  getAllUsers: async () => {
    const users = await userRepository.getAllUsers();
    return users;
  },
  createUser: async (user: CreateUserInput["body"]) => {
    const existingUser = await userRepository.getUserByEmail(user.email);

    if (existingUser) throw new ApiError("Email already in use", HTTP_RESPONSE_CODES.BAD_REQUEST);

    const createdUser = await userRepository.createUser(user);

    return createdUser;
  },
  getUserByEmail: async (email: string) => {
    return await userRepository.getUserByEmail(email);
  },
};
