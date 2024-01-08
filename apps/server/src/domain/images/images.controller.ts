import {
  Body,
  Controller,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ImagesService } from './images.service';

import { imageSchema, uploadImageSchema } from './schemas/image.schema';

import { FileStorageHelper } from '@server/helpers/file-storage.helper';

import { ROUTES } from '@server/constants/routes.constants';

@ApiTags(ROUTES.images)
@Controller(ROUTES.images)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiOperation({
    summary: 'upload picture image',
  })
  @Post('/upload-picture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: FileStorageHelper('pictures'),
    }),
  )
  public async uploadPicture(
    @Body() body: uploadImageSchema,
    @UploadedFile(
      new ParseFilePipe({
        validators: [],
      }),
    )
    file: Express.Multer.File,
  ): Promise<imageSchema> {
    const pictureData = {
      file: file,
      alt: body.alt,
      type: body.type,
    };

    const imageData = await this.imagesService.upload(pictureData);

    return imageData;
  }

  @ApiOperation({
    summary: 'upload blog image',
  })
  @Post('/upload-blog')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: FileStorageHelper('blog'),
    }),
  )
  public async uploadBlog(
    @Body() body: uploadImageSchema,
    @UploadedFile(
      new ParseFilePipe({
        validators: [],
      }),
    )
    file: Express.Multer.File,
  ): Promise<imageSchema> {
    const pictureData = {
      file: file,
      alt: body.alt,
      type: body.type,
    };

    const imageData = await this.imagesService.upload(pictureData);

    return imageData;
  }
}
