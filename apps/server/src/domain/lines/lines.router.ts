import { Injectable } from '@nestjs/common';

import { TrpcService } from '../trpc/trpc.service';
import { LinesService } from './lines.service';

import z from 'zod';
import {
  createLineSchema,
  outputLineSchema,
  updateLineSchema,
} from './schemas/productsLine.schema';

@Injectable()
export class LinesRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly linesService: LinesService,
  ) {}

  linesRouter = this.trpc.router({
    getAllLines: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getAllLines',
          tags: ['lines'],
          summary: 'Read all lines',
        },
      })
      .input(z.void())
      .output(z.object({ items: z.array(outputLineSchema) }))
      .query(async ({ ctx }) => {
        const items = await this.linesService.findAll();
        return { items };
      }),
    getByIdLine: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getByIdLine',
          tags: ['lines'],
          summary: 'Read a line by id',
        },
      })
      .input(z.object({ id: z.string() }))
      .output(z.object({ item: outputLineSchema }))
      .query(async ({ input, ctx }) => {
        const item = await this.linesService.findById(input.id);
        return { item };
      }),
    createLine: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/createLine',
          tags: ['lines'],
          // protect: true,
          summary: 'Create a new line',
        },
      })
      .input(createLineSchema)
      .output(z.object({ item: outputLineSchema }))
      .mutation(async ({ input, ctx }) => {
        const item = await this.linesService.create({ ...input });
        return { item };
      }),
    updateLine: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/updateLine',
          tags: ['lines'],
          // protect: true,
          summary: 'Update an existing line',
        },
      })
      .input(updateLineSchema)
      .output(z.object({ item: outputLineSchema }))
      .mutation(async ({ input, ctx }) => {
        const item = await this.linesService.update(input);
        return { item };
      }),
    removeLine: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/removeLine',
          tags: ['lines'],
          // protect: true,
          summary: 'Delete a line',
        },
      })
      .input(z.object({ id: z.string() }))
      .output(z.object({ id: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const id = await this.linesService.remove(input.id);
        return { id };
      }),
  });
}
