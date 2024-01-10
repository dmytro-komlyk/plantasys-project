import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import { OpenApiMeta } from 'trpc-openapi';

@Injectable()
export class TrpcService {
  createContext = () => ({});
  trpc = initTRPC
    .context<Awaited<ReturnType<typeof this.createContext>>>()
    .meta<OpenApiMeta>()
    .create();
  procedure = this.trpc.procedure;
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;
}
