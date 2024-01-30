import { Module } from '@nestjs/common';

import { ImagesRouter } from './images.router';

import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { TrpcService } from '../trpc/trpc.service';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
  imports: [PrismaModule],
  controllers: [ImagesController],
  providers: [ImagesService, ImagesRouter, JwtService, TrpcService],
  exports: [ImagesService],
})
export class ImagesModule {}
