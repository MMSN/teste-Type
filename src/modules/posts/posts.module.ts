import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostsController from './posts.controller';
import { PostRepository } from './repository/post.repository';
import PostsService from './services/posts.service';
 
@Module({
  imports: [TypeOrmModule.forFeature([PostRepository])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}