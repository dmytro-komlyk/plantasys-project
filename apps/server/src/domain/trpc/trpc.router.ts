import { INestApplication, Injectable } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';
import { OpenAPIV3 } from 'openapi-types';
import swaggerUi from 'swagger-ui-express';
import { generateOpenApiDocument } from 'trpc-openapi';
import { CardsProductRouter } from '../cardsProduct/cardsProduct.router';
import { ImagesRouter } from '../images/images.router';

import { CardsProductService } from '../cardsProduct/cardsProduct.service';
import { CategoriesRouter } from '../categories/categories.router';
import { CategoriesService } from '../categories/categories.service';
import { ImagesService } from '../images/images.service';
import { LinesRouter } from '../lines/lines.router';
import { LinesService } from '../lines/lines.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsBoosterRouter } from '../productsBooster/productsBooster.router';
import { ProductsBoosterService } from '../productsBooster/productsBooster.service';
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
    private readonly lines: LinesRouter,
    private readonly categories: CategoriesRouter,
    private readonly productsBooster: ProductsBoosterRouter,
  ) {}

  appRouter = this.trpc.router({
    images: this.images.imagesRouter,
    cardsProduct: this.cardsProduct.cardsProductRouter,
    productsLine: this.productsLine.productsLineRouter,
    lines: this.lines.linesRouter,
    categories: this.categories.categoriesRouter,
    productsBooster: this.productsBooster.productsBoosterRouter,
  });

  openApiDocument: OpenAPIV3.Document = generateOpenApiDocument(
    this.appRouter,
    {
      title: 'tRPC OpenAPI',
      description: 'OpenAPI compliant REST API built using tRPC with Express',
      version: '1.0.0',
      baseUrl: process.env.APP_BASE_URL as string,
      tags: [
        'cardsProduct',
        'productsLine',
        'lines',
        'categories',
        'productsBooster',
      ],
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
      new LinesRouter(trpcService, new LinesService(prismaService)),
      new CategoriesRouter(trpcService, new CategoriesService(prismaService)),
      new ProductsBoosterRouter(
        trpcService,
        new ProductsBoosterService(prismaService),
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
