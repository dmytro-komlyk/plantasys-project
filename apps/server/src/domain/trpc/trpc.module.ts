import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRouter } from '../auth/auth.router';
import { AuthService } from '../auth/auth.service';
import { CardsProductRouter } from '../cardsProduct/cardsProduct.router';
import { CardsProductService } from '../cardsProduct/cardsProduct.service';
import { CategoriesRouter } from '../categories/categories.router';
import { CategoriesService } from '../categories/categories.service';
import { ImagesRouter } from '../images/images.router';
import { ImagesService } from '../images/images.service';
import { LinesRouter } from '../lines/lines.router';
import { LinesService } from '../lines/lines.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductsBoosterRouter } from '../productsBooster/productsBooster.router';
import { ProductsBoosterService } from '../productsBooster/productsBooster.service';
import { ProductsLineRouter } from '../productsLine/productsLine.router';
import { ProductsLineService } from '../productsLine/productsLine.service';
import { TrpcRouter } from '../trpc/trpc.router';
import { TrpcService } from '../trpc/trpc.service';
import { UserRouter } from '../users/users.router';
import { UserService } from '../users/users.service';

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
    CategoriesService,
    CategoriesRouter,
    ProductsBoosterService,
    ProductsBoosterRouter,
    AuthService,
    AuthRouter,
    UserService,
    UserRouter,
    JwtService,
  ],
  exports: [TrpcService],
})
export class TrpcModule {}
