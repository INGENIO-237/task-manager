import { Service } from "typedi";
import User, { UserDocument } from "../models/users.model";
import { CreateUserInput } from "../schemas/users.schemas";

@Service()
class UserRepository {
  async getUsers(): Promise<UserDocument[]> {
    return await User.find().select("-password").exec();
  }
  async createUser(user: CreateUserInput["body"]) {
    return await User.create(user);
  }
  async getUserByEmail(email: string) {
    return await User.findOne({ email });
  }
}


export default UserRepository;
