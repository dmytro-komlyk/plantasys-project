import { INestApplication, Injectable } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';
import { OpenAPIV3 } from 'openapi-types';
import swaggerUi from 'swagger-ui-express';
import { generateOpenApiDocument } from 'trpc-openapi';
import { CardsProductRouter } from '../cardsProduct/cardsProduct.router';
import { ImagesRouter } from '../images/images.router';

import { CardsProductService } from '../cardsProduct/cardsProduct.service';
import { ImagesService } from '../images/images.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsLineRouter } from '../productsLine/productsLine.router';
import { ProductsLineService } from '../productsLine/productsLine.service';
import { TrpcService } from '../trpc/trpc.service';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly images: ImagesRouter,
    private readonly cardsProduct: CardsProductRouter,
    private readonly productsLine: ProductsLineRouter,
  ) {}

  appRouter = this.trpc.router({
    images: this.images.imagesRouter,
    cardsProduct: this.cardsProduct.cardsProductRouter,
    productsLine: this.productsLine.productsLineRouter,
  });

  openApiDocument: OpenAPIV3.Document = generateOpenApiDocument(
    this.appRouter,
    {
      title: 'tRPC OpenAPI',
      description: 'OpenAPI compliant REST API built using tRPC with Express',
      version: '1.0.0',
      baseUrl: process.env.APP_BASE_URL as string,
      tags: ['cardsProduct', 'productsLine'],
    },
  );

  static getAppRouter(): AppRouter {
    const prismaService = new PrismaService({});
    const trpcService = new TrpcService();

    const trpcRouter = new TrpcRouter(
      trpcService,
      new ImagesRouter(trpcService, new ImagesService(prismaService)),
      new CardsProductRouter(
        trpcService,
        new CardsProductService(prismaService),
      ),
      new ProductsLineRouter(
        trpcService,
        new ProductsLineService(prismaService),
      ),
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
