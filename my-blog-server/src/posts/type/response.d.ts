import { PostDto } from '../dto/post.dto';

export interface IPostsResponse {
  totalCount: number;
  posts: PostDto[];
}
