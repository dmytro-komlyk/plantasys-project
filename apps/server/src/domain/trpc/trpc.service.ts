import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';

@Injectable()
export class TrpcService {
  createContext = () => ({});
  trpc = initTRPC
    .context<Awaited<ReturnType<typeof this.createContext>>>()
    .create();
  procedure = this.trpc.procedure;
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;
}
