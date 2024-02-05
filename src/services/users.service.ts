import { Service } from "typedi";
import { UserDocument } from "../models/users.model";
import UserRepository from "../repositories/users.repository";
import { CreateUserInput } from "../schemas/users.schemas";
import ApiError from "../utils/errors/errors.base";
import HTTP_RESPONSE_CODES from "../utils/http.codes";

@Service()
class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers(): Promise<UserDocument[]> {
    return await this.userRepository.getUsers();
  }

  async createUser(user: CreateUserInput["body"]) {
    const existingUser = await this.userRepository.getUserByEmail(user.email);

    if (existingUser)
      throw new ApiError(
        "Email already in use",
        HTTP_RESPONSE_CODES.BAD_REQUEST
      );

    const createdUser = await this.userRepository.createUser(user);

    return createdUser;
  }
  async getUserByEmail(email: string) {
    return await this.userRepository.getUserByEmail(email);
  }
}

export default UserService;
