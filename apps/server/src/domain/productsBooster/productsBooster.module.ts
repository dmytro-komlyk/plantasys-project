import { Module } from '@nestjs/common';

import { ProductsBoosterRouter } from './productsBooster.router';

import { PrismaModule } from '../prisma/prisma.module';
import { TrpcService } from '../trpc/trpc.service';
import { ProductsBoosterService } from './productsBooster.service';

@Module({
  imports: [PrismaModule],
  providers: [ProductsBoosterService, ProductsBoosterRouter, TrpcService],
  exports: [ProductsBoosterService],
})
export class ProductsBoosterModule {}
