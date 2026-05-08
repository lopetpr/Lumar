import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  providers: [CloudinaryProvider, FilesService],
  exports: [FilesService],
})
export class FilesModule {}
