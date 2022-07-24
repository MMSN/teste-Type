import { Body, Controller, Post } from "@nestjs/common";
import { RegisterDto } from "./dtos/register-user.dto";
import { AuthenticationService } from "./services/authentication.service";

@Controller('authentication')
export class AuthenticationController {

  constructor (
    private readonly authenticationService: AuthenticationService
  ) {}

  @Post('register')
  async register (@Body() registrationData: RegisterDto) {
    return this.authenticationService.registerUser(registrationData)
  }
}