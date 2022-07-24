import { Body, Controller, HttpCode, Post, Req, UseGuards } from "@nestjs/common";
import { RegisterDto } from "./dtos/register-user.dto";
import RequestWithUser from "./interfaces/requestWithUser.interface";
import { LocalAuthenticationGuard } from "./localAuthentication.guard";
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

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}