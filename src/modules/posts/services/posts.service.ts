import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePostDto } from "../dtos/create-post.dto";
import { UpdatePostDto } from "../dtos/update-post.dto";
import { InjectRepository } from '@nestjs/typeorm';
import Post from "../entity/post.entity";
import { Repository } from "typeorm";
import { PostRepository } from "../repository/post.repository";

@Injectable()
export default class PostsService {

  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<PostRepository>
  ) {}

  getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne(id);
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async replacePost(id: number, post: UpdatePostDto): Promise<Post> {
    await this.postsRepository.update(id, post as any);
    const updatedPost = await this.postsRepository.findOne(id);
    if (updatedPost) {
      return updatedPost as any
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }
 
  async createPost(post: CreatePostDto) {
    const newPost = await this.postsRepository.create(post as any);
    await this.postsRepository.save(newPost);
    return newPost;
  }
 
  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}