import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./services/users.service";

@Controller('users')
export default class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post()
  async createPost(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

}