import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { SequelizeModule } from '@nestjs/sequelize';

describe('boards Service', () => {
  let service: PostsService;

  beforeEach(async () => {
    jest.useFakeTimers();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'PASSWORD',
          database: 'b_hub',
          synchronize: true,
        }),
      ],
      providers: [PostsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  describe('create', () => {
    it('생성한 게시글을 리턴해야한다', async () => {
      const post: Post = await service.create({
        title: '제목',
        content: '내용',
      });
      console.log(post);
      expect(post).toBeDefined();
      expect(post.title).toEqual('제목');
    });
  });
});
