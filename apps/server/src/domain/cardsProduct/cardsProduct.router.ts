import { Injectable } from '@nestjs/common';

import { TrpcService } from '../trpc/trpc.service';
import { CardsProductService } from './cardsProduct.service';

import z from 'zod';
import {
  createCardProductSchema,
  updateCardProductSchema,
} from './schemas/cardsProduct.schema';

@Injectable()
export class CardsProductRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly cardsProductService: CardsProductService,
  ) {}

  cardsProductRouter = this.trpc.router({
    getAll: this.trpc.procedure.query(async () => {
      return await this.cardsProductService.findAll();
    }),
    getById: this.trpc.procedure.input(z.string()).query(async ({ input }) => {
      return await this.cardsProductService.findById(input);
    }),
    create: this.trpc.procedure
      .input(createCardProductSchema)
      .mutation(async ({ input }) => {
        return await this.cardsProductService.create({ ...input });
      }),
    update: this.trpc.procedure
      .input(updateCardProductSchema)
      .mutation(async ({ input }) => {
        return await this.cardsProductService.update(input);
      }),
    remove: this.trpc.procedure
      .input(z.string())
      .mutation(async ({ input }) => {
        return await this.cardsProductService.remove(input);
      }),
  });
}
