import { Injectable } from '@nestjs/common';

@Injectable()
export class ImagesService {
  async getAll(): Promise<[]> {
    return [];
  }
  async uploadFiles(files: Express.MulterS3.File[]): Promise<string[]> {
    console.log('files: ', files);
    return [''];
  }
}
