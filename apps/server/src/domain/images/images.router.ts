import { Injectable } from '@nestjs/common';

import { z } from 'zod';
import { TrpcService } from '../trpc/trpc.service';
import { ImagesService } from './images.service';
import { imageSchema, uploadImageSchema } from './schemas/image.schema';

@Injectable()
export class ImagesRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly imagesService: ImagesService,
  ) {}

  imagesRouter = this.trpc.router({
    getAll: this.trpc.procedure.query(async () => {
      return await this.imagesService.findAll();
    }),
    upload: this.trpc.procedure
      .input(uploadImageSchema)
      .query(async ({ input }) => {
        return await this.imagesService.upload(input);
      }),
    update: this.trpc.procedure.input(imageSchema).query(async ({ input }) => {
      return await this.imagesService.update(input);
    }),
    remove: this.trpc.procedure
      .input(z.string())
      .mutation(async ({ input }) => {
        return await this.imagesService.remove(input);
      }),
  });
}
