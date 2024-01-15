import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@ApiTags('게시글 생성 요청 데이터')
export class CreatePostDto {
  @IsString()
  @ApiProperty({ type: String, description: '제목' })
  readonly title: string;

  @IsString()
  @ApiProperty({ type: String, description: '내용' })
  readonly content: string;

  //   @IsString()
  //   @ApiProperty({ type: String, description: '해쉬태그' })
  //   readonly hashtags;

  //   @IsNumber()
  //   @ApiProperty({ type: Array, description: '카테고리 id' })
  //   readonly categoryId: number;
}
