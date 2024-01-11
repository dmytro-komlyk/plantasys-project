import { Module } from '@nestjs/common';

import { CategoriesRouter } from './categories.router';

import { PrismaModule } from '../prisma/prisma.module';
import { TrpcService } from '../trpc/trpc.service';
import { CategoriesService } from './categories.service';

@Module({
  imports: [PrismaModule],
  providers: [CategoriesService, CategoriesRouter, TrpcService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
