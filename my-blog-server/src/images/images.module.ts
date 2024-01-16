import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { multerOptionsFactory } from 'src/utils/multer-options.factory';

@Module({
  imports: [
    SequelizeModule.forFeature([]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: multerOptionsFactory,
    }),
  ],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
