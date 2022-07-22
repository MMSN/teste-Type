import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthenticationService } from "./authentication/authentication.service";
import User from "./entity/user.entity";
import { UsersService } from "./services/users.service";
import UsersController from "./users.controller";


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthenticationService],
  exports: [UsersService]
})

export class UsersModule {}