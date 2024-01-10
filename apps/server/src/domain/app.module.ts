import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TrpcModule } from '@server/domain/trpc/trpc.module';
// import { AuthModule } from './auth/auth.module';
import { CardsProductModule } from './cardsProduct/cardsProduct.module';
import { ImagesModule } from './images/images.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ProductsLineModule } from './productsLine/productsLine.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    TrpcModule,
    ImagesModule,
    CardsProductModule,
    ProductsLineModule,
    // AuthModule,
    // UsersModule,
    // NotificationsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
