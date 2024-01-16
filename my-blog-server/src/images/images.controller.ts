import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ImagesService } from './images.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateBodyImageMulterOptions } from 'src/utils/multer.option';

@Controller('images')
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('file'))
  async uploadFile(
    @UploadedFiles() files: Express.MulterS3.File[],
  ): Promise<string[]> {
    this.imagesService.uploadFiles(files);
    return [''];
    // return await files.map((v) => v.key);
  }
}
