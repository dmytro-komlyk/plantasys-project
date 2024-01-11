import { Injectable } from '@nestjs/common';

import { TrpcService } from '../trpc/trpc.service';
import { ProductsBoosterService } from './productsBooster.service';

import z from 'zod';
import {
  createProductBoosterSchema,
  outputProductBoosterSchema,
  updateProductBoosterSchema,
} from './schemas/productsBooster.schema';

@Injectable()
export class ProductsBoosterRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly productsBoosterService: ProductsBoosterService,
  ) {}

  productsBoosterRouter = this.trpc.router({
    getAllProductsBooster: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getAllProductsBooster',
          tags: ['productsBooster'],
          summary: 'Read all booster`s products',
        },
      })
      .input(z.void())
      .output(z.object({ items: z.array(outputProductBoosterSchema) }))
      .query(async ({ ctx }) => {
        const items = await this.productsBoosterService.findAll();
        return { items };
      }),
    getByIdProductBooster: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getByIdProductBooster',
          tags: ['productsBooster'],
          summary: 'Read a booster`s product by id',
        },
      })
      .input(z.object({ id: z.string() }))
      .output(z.object({ item: outputProductBoosterSchema }))
      .query(async ({ input, ctx }) => {
        const item = await this.productsBoosterService.findById(input.id);
        return { item };
      }),
    createProductBooster: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/createProductBooster',
          tags: ['productsBooster'],
          // protect: true,
          summary: 'Create a new booster`s product',
        },
      })
      .input(createProductBoosterSchema)
      .output(z.object({ item: outputProductBoosterSchema }))
      .mutation(async ({ input, ctx }) => {
        const item = await this.productsBoosterService.create({ ...input });
        return { item };
      }),
    updateProductBooster: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/updateProductBooster',
          tags: ['productsBooster'],
          // protect: true,
          summary: 'Update an existing booster`s product',
        },
      })
      .input(updateProductBoosterSchema)
      .output(z.object({ item: updateProductBoosterSchema }))
      .mutation(async ({ input, ctx }) => {
        const item = await this.productsBoosterService.update(input);
        return { item };
      }),
    removeProductBooster: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/removeProductBooster',
          tags: ['productsBooster'],
          // protect: true,
          summary: 'Delete a booster`s product',
        },
      })
      .input(z.object({ id: z.string() }))
      .output(z.object({ id: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const id = await this.productsBoosterService.remove(input.id);
        return { id };
      }),
  });
}
