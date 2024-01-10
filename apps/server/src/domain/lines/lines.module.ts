import { Module } from '@nestjs/common';

import { LinesRouter } from './lines.router';

import { PrismaModule } from '../prisma/prisma.module';
import { TrpcService } from '../trpc/trpc.service';
import { LinesService } from './lines.service';

@Module({
  imports: [PrismaModule],
  providers: [LinesService, LinesRouter, TrpcService],
  exports: [LinesService],
})
export class LinesModule {}
