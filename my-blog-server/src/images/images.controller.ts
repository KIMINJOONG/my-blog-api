import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('images'))
  async uploadFile(
    @UploadedFiles() files: Express.MulterS3.File[],
  ): Promise<string[]> {
    return this.imagesService.uploadFiles(files);
    // return await files.map((v) => v.key);
  }
}
