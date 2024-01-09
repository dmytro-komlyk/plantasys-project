import { Module } from '@nestjs/common';
import { CardsProductRouter } from '../cardsProduct/cardsProduct.router';
import { CardsProductService } from '../cardsProduct/cardsProduct.service';
import { ImagesRouter } from '../images/images.router';
import { ImagesService } from '../images/images.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TrpcRouter } from '../trpc/trpc.router';
import { TrpcService } from '../trpc/trpc.service';

@Module({
  imports: [PrismaModule],
  providers: [
    TrpcService,
    TrpcRouter,
    ImagesService,
    ImagesRouter,
    CardsProductService,
    CardsProductRouter,
  ],
  exports: [TrpcService],
})
export class TrpcModule {}
