import { Injectable, NotFoundException } from '@nestjs/common';
import { GetPostDto } from './dto/get-post.dto';
import { IPostsResponse } from './type/response';
import { FindAndCountOptions } from 'sequelize';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor() {}
  async getAll(query: GetPostDto): Promise<IPostsResponse> {
    const queryObject: FindAndCountOptions<any> = {
      //   include: [{ model: Category }],
      attributes: ['id', 'title', 'view', 'createdAt'],
      where: {},
      order: [['id', 'desc']],
      limit: parseInt(query.limit),
    };
    // if (query.category) {
    //   queryObject.where = { categoryId: query.category };
    // }

    let offset = 0;
    if (query.page && query.limit) {
      offset = parseInt(query.limit, 10) * parseInt(query.page, 10);
    }

    queryObject.offset = offset;

    const { count, rows } = await Post.findAndCountAll(queryObject);
    return { totalCount: count, posts: rows };
  }

  async getOne(id: number): Promise<Post> {
    try {
      const post: Post = await Post.findOne({
        where: { id },
        // include: ['category'],
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

      //   const category = await this.categoriesService.getOne(1);
      //   board.category = category;

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
