import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user.dto";
import User from "../entity/user.entity";
import { UserRepository } from "../repository/user.repository";

@Injectable()
export class UsersService {

  constructor (
    private userRepository: UserRepository
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }
}