import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticationService } from "../authentication/services/authentication.service"; 
import { CreateUserDto } from "./dtos/create-user.dto";

@Controller('users')
export default class UsersController {
}