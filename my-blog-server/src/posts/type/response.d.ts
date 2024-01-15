import { Post } from '../post.entity';

export interface IPostsResponse {
  totalCount: number;
  posts: Post[];
}
