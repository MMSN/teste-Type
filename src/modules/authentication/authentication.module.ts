import { Module } from "@nestjs/common";
import { UsersService } from "../users/services/users.service";
import { UsersModule } from "../users/users.module";
import { AuthenticationService } from "./services/authentication.service";

@Module({
  imports: [
    UsersModule,
  ],
  providers: [AuthenticationService],
  exports: [AuthenticationService]
})
export class AuthenticationModule {}