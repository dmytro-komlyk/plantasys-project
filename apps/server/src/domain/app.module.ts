import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TrpcModule } from '@server/domain/trpc/trpc.module';
// import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    TrpcModule,
    ImagesModule,
    // AuthModule,
    // UsersModule,
    // NotificationsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
