import { Injectable, NotFoundException } from '@nestjs/common';
import { GetPostDto } from './dto/get-post.dto';
import { IPostsResponse } from './type/response';
import { FindAndCountOptions } from 'sequelize';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Category } from 'src/categories/category.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly categoriesService: CategoriesService) {}
  async getAll(query: GetPostDto): Promise<IPostsResponse> {
    const queryObject: FindAndCountOptions<any> = {
      include: [{ model: Category }],
      attributes: ['id', 'title', 'content', 'view', 'createdAt'],
      where: {},
      order: [['id', 'desc']],
      limit: parseInt(query.limit),
    };
    if (query.categoryId) {
      queryObject.where = { categoryId: query.categoryId };
    }

    let offset = 0;
    if (query.page && query.limit) {
      offset = parseInt(query.limit, 10) * parseInt(query.page, 10);
    }

    queryObject.offset = offset;

    const { count, rows } = await Post.findAndCountAll(queryObject);

    const postDtos: PostDto[] = [];
    const urlRegex = '<img[^>]*src=["\']?([^>"\']+)["\']?[^>]*>';
    for (const post of rows) {
      const postDto = new PostDto();
      postDto.id = post.id;
      postDto.title = post.title;
      if (post.content?.match(urlRegex) && post.content?.match(urlRegex)[1]) {
        const url = post.content?.match(urlRegex)[1];
        postDto.thumbnail = url;
      }
      postDto.view = post.view;
      postDto.categoryId = post.categoryId;
      postDto.category = post.category;
      postDto.createdAt = post.createdAt;
      postDtos.push(postDto);
    }

    return { totalCount: count, posts: postDtos };
  }

  async getOne(id: number): Promise<Post> {
    try {
      const post: Post = await Post.findOne({
        where: { id },
        include: ['category'],
      });
      if (!post) {
        throw new NotFoundException(`Board with ID ${post.id} not found.`);
      }
      return post;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteOne(id: number): Promise<Post> {
    try {
      const board: Post = await this.getOne(id);
      await board.destroy();
      return board;
    } catch (error) {}
  }

  async create(postData: CreatePostDto): Promise<Post> {
    try {
      //   const hashtags: string[] = postData.hashtags.match(/#[^\s]+/g);
      const post: Post = await Post.create({
        title: postData.title,
        content: postData.content,
      });

      const category = await this.categoriesService.getOne(postData.categoryId);
      post.category = category;

      //   if (hashtags) {
      //     await Promise.all(
      //       hashtags.map(async (tag: string) => {
      //         tag = tag.replace(/<(.|\n)*?>/g, '');
      //         tag = tag.trim();
      //         const newHashtags: Hashtag = await Hashtag.create({
      //           name: tag.slice(1).toLowerCase(),
      //         });
      //         board.$add('boardHashtag', newHashtags);
      //         return;
      //       }),
      //     );
      //   }

      await post.save();
      return post;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async update(seq: number, updateData: UpdatePostDto): Promise<Post> {
    try {
      const post: Post = await this.getOne(seq);

      //   const category = await this.categoriesService.getOne(1);
      //   board.category = category;

      post.title = updateData.title;
      post.content = updateData.content;
      await post.save();
      return post;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
