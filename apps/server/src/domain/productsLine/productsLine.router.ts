import { Injectable } from '@nestjs/common';

import { TrpcService } from '../trpc/trpc.service';
import { ProductsLineService } from './productsLine.service';

import z from 'zod';
import {
  createProductLineSchema,
  outputProductLineSchema,
  updateProductLineSchema,
} from './schemas/productsLine.schema';

@Injectable()
export class ProductsLineRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly productsLineService: ProductsLineService,
  ) {}

  productsLineRouter = this.trpc.router({
    getAllProducts: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getAllProducts',
          tags: ['productsLine'],
          summary: 'Read all line`s products',
        },
      })
      .input(z.void())
      .output(z.object({ items: z.array(outputProductLineSchema) }))
      .query(async ({ ctx }) => {
        const items = await this.productsLineService.findAll();
        return { items };
      }),
    getByIdProduct: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getByIdProduct',
          tags: ['productsLine'],
          summary: 'Read a line`s product by id',
        },
      })
      .input(z.object({ id: z.string() }))
      .output(z.object({ item: outputProductLineSchema }))
      .query(async ({ input, ctx }) => {
        const item = await this.productsLineService.findById(input.id);
        return { item };
      }),
    createProduct: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/createProduct',
          tags: ['productsLine'],
          // protect: true,
          summary: 'Create a new line`s product',
        },
      })
      .input(createProductLineSchema)
      .output(z.object({ item: outputProductLineSchema }))
      .mutation(async ({ input, ctx }) => {
        const item = await this.productsLineService.create({ ...input });
        return { item };
      }),
    updateProduct: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/updateProduct',
          tags: ['productsLine'],
          // protect: true,
          summary: 'Update an existing line`s product',
        },
      })
      .input(updateProductLineSchema)
      .output(z.object({ item: outputProductLineSchema }))
      .mutation(async ({ input, ctx }) => {
        const item = await this.productsLineService.update(input);
        return { item };
      }),
    removeProduct: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/removeProduct',
          tags: ['productsLine'],
          // protect: true,
          summary: 'Delete a line`s product',
        },
      })
      .input(z.object({ id: z.string() }))
      .output(z.object({ id: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const id = await this.productsLineService.remove(input.id);
        return { id };
      }),
  });
}
