import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import type { v2 as CloudinaryV2 } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class FilesService {
  private readonly logger = new Logger('FilesService');

  constructor(
    @Inject('CLOUDINARY')
    private readonly cloudinary: typeof CloudinaryV2,
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!file?.buffer) {
      throw new BadRequestException('Archivo invalido para subir imagen');
    }

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
      this.logger.error('Cloudinary upload failed');
      throw new BadRequestException('Error al subir la imagen');
    });
  }
}
