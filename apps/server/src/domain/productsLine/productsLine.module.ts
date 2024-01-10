import { Module } from '@nestjs/common';

import { ProductsLineRouter } from './productsLine.router';

import { PrismaModule } from '../prisma/prisma.module';
import { TrpcService } from '../trpc/trpc.service';
import { ProductsLineService } from './productsLine.service';

@Module({
  imports: [PrismaModule],
  providers: [ProductsLineService, ProductsLineRouter, TrpcService],
  exports: [ProductsLineService],
})
export class ProductsLineModule {}
