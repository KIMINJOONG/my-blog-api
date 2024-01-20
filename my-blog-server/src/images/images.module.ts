import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { S3Client } from '@aws-sdk/client-s3';
import * as mime from 'mime-types';
import * as multerS3 from 'multer-s3';

@Module({
  imports: [
    SequelizeModule.forFeature([]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const s3 = new S3Client({
          region: configService.get('AWS_REGION'),
          credentials: {
            accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
          },
        });

        return {
          storage: multerS3({
            s3,
            bucket: configService.get('AWS_S3_BUCKET_NAME'),
            acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: function (req, file, cb) {
              cb(
                null,
                `${new Date().getTime()}.${mime.extension(file.mimetype)}`,
              );
            },
          }),
          limits: {
            fileSize: 1024 * 1024 * 5, // 5 MB
            files: 1,
          },
          fileFilter(req, file, callback) {
            callback(null, true);
          },
        };
      },
    }),
  ],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
