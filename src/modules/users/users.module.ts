import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "./entity/user.entity";
import { UsersService } from "./services/users.service";
import UsersController from "./users.controller";


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})

export class UsersModule {}