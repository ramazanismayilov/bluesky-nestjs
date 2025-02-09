import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v2 as cloudinary } from 'cloudinary';
import config from 'src/config';
import { UploadEntity } from 'src/entities/Upload.entiry';
import { Repository } from 'typeorm';


@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(UploadEntity)
    private uploadRepository: Repository<UploadEntity>
  ) {
    cloudinary.config({
      cloud_name: config.cloudinary.cloudName,
      api_key: config.cloudinary.apiKey,
      api_secret: config.cloudinary.apiToken,
    });
  }

  async uploadFile(file: Express.Multer.File) {
    let result: any = await new Promise((resolve, reject) =>
      cloudinary.uploader
        .upload_stream((err, result) => {
          if (err) return reject(err);
          resolve(result);
        })
        .end(file.buffer),
    );

    const upload = this.uploadRepository.create({ url: result.url })
    await this.uploadRepository.save(upload)

    return upload;
  }
}