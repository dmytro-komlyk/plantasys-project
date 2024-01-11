import { Injectable } from '@nestjs/common';

import { TrpcService } from '../trpc/trpc.service';
import { CardsProductService } from './cardsProduct.service';

import z from 'zod';
import {
  createCardProductSchema,
  outputCardProductSchema,
  updateCardProductSchema,
} from './schemas/cardsProduct.schema';

@Injectable()
export class CardsProductRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly cardsProductService: CardsProductService,
  ) {}

  cardsProductRouter = this.trpc.router({
    getAllCards: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getAllCards',
          tags: ['cardsProduct'],
          summary: 'Read all product`s cards',
        },
      })
      .input(z.void())
      .output(z.object({ items: z.array(outputCardProductSchema) }))
      .query(async ({ ctx }) => {
        const items = await this.cardsProductService.findAll();
        return { items };
      }),
    getByIdCard: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getByIdCard',
          tags: ['cardsProduct'],
          summary: 'Read a product`s card by id',
        },
      })
      .input(z.object({ id: z.string() }))
      .output(z.object({ item: outputCardProductSchema }))
      .query(async ({ input, ctx }) => {
        const item = await this.cardsProductService.findById(input.id);
        return { item };
      }),
    createCard: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/createCard',
          tags: ['cardsProduct'],
          // protect: true,
          summary: 'Create a new product`s card',
        },
      })
      .input(createCardProductSchema)
      .output(z.object({ item: outputCardProductSchema }))
      .mutation(async ({ input, ctx }) => {
        const item = await this.cardsProductService.create({ ...input });
        return { item };
      }),
    updateCard: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/updateCard',
          tags: ['cardsProduct'],
          // protect: true,
          summary: 'Update an existing product`s card',
        },
      })
      .input(updateCardProductSchema)
      .output(z.object({ item: outputCardProductSchema }))
      .mutation(async ({ input, ctx }) => {
        const item = await this.cardsProductService.update(input);
        return { item };
      }),
    removeCard: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/removeCard',
          tags: ['cardsProduct'],
          // protect: true,
          summary: 'Delete a product`s card',
        },
      })
      .input(z.object({ id: z.string() }))
      .output(z.object({ id: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const id = await this.cardsProductService.remove(input.id);
        return { id };
      }),
  });
}