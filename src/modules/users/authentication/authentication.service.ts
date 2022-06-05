import { CreateUserDto } from "../dtos/create-user.dto";
import { UsersService } from "../services/users.service";
import * as bcrypt from 'bcrypt'
import { HttpException, HttpStatus } from "@nestjs/common";

export class AuthenticationService {

  constructor (
    private readonly usersService: UsersService
  ) {}

  public async registerUser (createUser: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUser.password, 10);
    try {
      const newUser = await this.usersService.create({
        ...createUser,
        password: hashedPassword
      });
      delete newUser.password
      return newUser
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAuthenticatedUser (email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getUserByEmail(email)
      await this.verifyPassword(plainTextPassword, user.password);
      delete user.password
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }
}