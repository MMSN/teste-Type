import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticationService } from "./authentication/authentication.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./services/users.service";

@Controller('users')
export default class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authenticationService: AuthenticationService
  ) {}

  @Post()
  async createPost(@Body() user: CreateUserDto) {
    return this.authenticationService.registerUser(user)
  }

}