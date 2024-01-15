import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
  imports: [SequelizeModule.forFeature([])],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
