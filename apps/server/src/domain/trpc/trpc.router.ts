import { INestApplication, Injectable } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';
import { OpenAPIV3 } from 'openapi-types';
import swaggerUi from 'swagger-ui-express';
import { generateOpenApiDocument } from 'trpc-openapi';
import { ImagesRouter } from '../images/images.router';
import { ImagesService } from '../images/images.service';
import { PrismaService } from '../prisma/prisma.service';
import { TrpcService } from '../trpc/trpc.service';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly images: ImagesRouter,
  ) {}

  appRouter = this.trpc.router({
    images: this.images.imagesRouter,
  });

  openApiDocument: OpenAPIV3.Document = generateOpenApiDocument(
    this.appRouter,
    {
      title: 'tRPC OpenAPI',
      version: '1.0.0',
      baseUrl: process.env.APP_BASE_URL as string,
    },
  );

  static getAppRouter(): AppRouter {
    const prismaService = new PrismaService({});
    const trpcService = new TrpcService();

    const trpcRouter = new TrpcRouter(
      trpcService,
      new ImagesRouter(trpcService, new ImagesService(prismaService)),
    );
    return trpcRouter.appRouter;
  }

  async applyMiddleware(app: INestApplication): Promise<void> {
    app.use(
      `/${process.env.APP_API}/${process.env.APP_TRPC}`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
        createContext: this.trpc.createContext,
      }),
    );
    // app.use(
    //   `/${process.env.APP_API}`,
    //   createOpenApiExpressMiddleware({
    //     router: this.appRouter,
    //     createContext: undefined,
    //     responseMeta: undefined,
    //     onError: undefined,
    //     maxBodySize: undefined,
    //   }),
    // );
    app.use(
      `/${process.env.APP_SWAGER}`,
      swaggerUi.serve,
      swaggerUi.setup(this.openApiDocument),
    );
  }
}

export const appRouter = TrpcRouter.getAppRouter();
export type AppRouter = TrpcRouter['appRouter'];
