import { Injectable } from '@nestjs/common';

import { TrpcService } from '../trpc/trpc.service';
import { CategoriesService } from './categories.service';

import z from 'zod';
import {
  createCategorySchema,
  outputCategorySchema,
  updateCategorySchema,
} from './schemas/categories.schema';

@Injectable()
export class CategoriesRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly categoriesService: CategoriesService,
  ) {}

  categoriesRouter = this.trpc.router({
    getAllCategories: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getAllCategories',
          tags: ['categories'],
          summary: 'Read all categories',
        },
      })
      .input(z.void())
      .output(z.object({ items: z.array(outputCategorySchema) }))
      .query(async ({ ctx }) => {
        const items = await this.categoriesService.findAll();
        return { items };
      }),
    getByIdCategory: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getByIdCategory',
          tags: ['categories'],
          summary: 'Read a category by id',
        },
      })
      .input(z.object({ id: z.string() }))
      .output(z.object({ item: outputCategorySchema }))
      .query(async ({ input, ctx }) => {
        const item = await this.categoriesService.findById(input.id);
        return { item };
      }),
    createCategory: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/createCategory',
          tags: ['categories'],
          // protect: true,
          summary: 'Create a new category',
        },
      })
      .input(createCategorySchema)
      .output(z.object({ item: outputCategorySchema }))
      .mutation(async ({ input, ctx }) => {
        const item = await this.categoriesService.create({ ...input });
        return { item };
      }),
    updateCategory: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/updateCategory',
          tags: ['categories'],
          // protect: true,
          summary: 'Update an existing category',
        },
      })
      .input(updateCategorySchema)
      .output(z.object({ item: outputCategorySchema }))
      .mutation(async ({ input, ctx }) => {
        const item = await this.categoriesService.update(input);
        return { item };
      }),
    removeCategory: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/removeCategory',
          tags: ['categories'],
          // protect: true,
          summary: 'Delete a category',
        },
      })
      .input(z.object({ id: z.string() }))
      .output(z.object({ id: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const id = await this.categoriesService.remove(input.id);
        return { id };
      }),
  });
}
