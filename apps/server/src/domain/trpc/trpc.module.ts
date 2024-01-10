import { Module } from '@nestjs/common';
import { CardsProductRouter } from '../cardsProduct/cardsProduct.router';
import { CardsProductService } from '../cardsProduct/cardsProduct.service';
import { ImagesRouter } from '../images/images.router';
import { ImagesService } from '../images/images.service';
import { LinesRouter } from '../lines/lines.router';
import { LinesService } from '../lines/lines.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductsLineRouter } from '../productsLine/productsLine.router';
import { ProductsLineService } from '../productsLine/productsLine.service';
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
    ProductsLineService,
    ProductsLineRouter,
    LinesService,
    LinesRouter,
  ],
  exports: [TrpcService],
})
export class TrpcModule {}
