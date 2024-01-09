import { Module } from '@nestjs/common';

import { CardsProductRouter } from './cardsProduct.router';

import { PrismaModule } from '../prisma/prisma.module';
import { TrpcService } from '../trpc/trpc.service';
import { CardsProductService } from './cardsProduct.service';

@Module({
  imports: [PrismaModule],
  providers: [CardsProductService, CardsProductRouter, TrpcService],
  exports: [CardsProductService],
})
export class CardsProductModule {}
