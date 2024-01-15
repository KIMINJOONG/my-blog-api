import {
  Bind,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { multerS3Options } from 'src/utils/multer.option';
import { IFile } from 'src/types/aws';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('images', null, multerS3Options))
  @Bind(UploadedFiles())
  async uploadFile(files: IFile[]): Promise<string[]> {
    return await files.map((v) => v.key);
  }
}
