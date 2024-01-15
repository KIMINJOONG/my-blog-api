import { Body, Controller, Get, Param, Query, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostModel } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostDto } from './dto/get-post.dto';
import { IPostsResponse } from './type/response';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAll(@Query() query: GetPostDto): Promise<IPostsResponse> {
    return this.postsService.getAll(query);
  }

  @Get('/:id')
  getOne(@Param('id') id: number): Promise<PostModel> {
    return this.postsService.getOne(id);
  }

  //   @UseGuards(JwtAuthGuard)
  //   @Delete('/:id')
  //   remove(@Param('id') id: number): Promise<Board> {
  //     return this.boardsService.deleteOne(id);
  //   }

  //   @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() boardData: CreatePostDto): Promise<PostModel> {
    return this.postsService.create(boardData);
  }

  //   @UseGuards(JwtAuthGuard)
  //   @Patch('/:id')
  //   patch(
  //     @Param('id') id: number,
  //     @Body() updateData: UpdateBoardDto,
  //   ): Promise<Board> {
  //     return this.boardsService.update(id, updateData);
  //   }
}
