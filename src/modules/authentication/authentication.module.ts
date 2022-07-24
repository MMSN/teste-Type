import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./services/authentication.service";
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule
  ],
  providers: [AuthenticationService, LocalStrategy],
  exports: [AuthenticationService],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}