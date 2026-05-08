import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { v2 as CloudinaryV2 } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class FilesService {
  constructor(
    @Inject('CLOUDINARY')
    private readonly cloudinary: typeof CloudinaryV2,
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const uploadStream = this.cloudinary.uploader.upload_stream(
        { folder: 'lumar/productos', resource_type: 'image' },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result.secure_url);
        },
      );
      Readable.from(file.buffer).pipe(uploadStream);
    }).catch(() => {
      throw new BadRequestException('Error al subir la imagen');
    });
  }
}
