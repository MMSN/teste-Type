import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePostDto } from "../dtos/create-post.dto";
import { UpdatePostDto } from "../dtos/update-post.dto";

export interface Post {
  id: number;
  content: string;
  title: string;
}

@Injectable()
export default class PostsService {
  private lastPostId = 0;
  private posts: Post[] = [];

  getAllPosts() {
    return this.posts;
  }

  getPostById(id: number) {
    const post = this.posts.find(post => post.id === id);
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  replacePost(id: number, post: UpdatePostDto): Post {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex > -1) {
      this.posts[postIndex].title = post.title;
      this.posts[postIndex].content = post.content;
      return this.posts[postIndex];
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }
 
  createPost(post: CreatePostDto) {
    const newPost = {
      id: ++this.lastPostId,
      ...post
    }
    this.posts.push(newPost);
    return newPost;
  }
 
  deletePost(id: number) {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex > -1) {
      this.posts.splice(postIndex, 1);
    } else {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}