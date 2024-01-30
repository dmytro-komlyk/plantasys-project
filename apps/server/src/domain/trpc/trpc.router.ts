import { INestApplication, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import express from 'express';
import { OpenAPIV3 } from 'openapi-types';
import swaggerUi from 'swagger-ui-express';
import { generateOpenApiDocument } from 'trpc-openapi';

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
import { PrismaService } from '../prisma/prisma.service';
import { ProductsBoosterRouter } from '../productsBooster/productsBooster.router';
import { ProductsBoosterService } from '../productsBooster/productsBooster.service';
import { ProductsLineRouter } from '../productsLine/productsLine.router';
import { ProductsLineService } from '../productsLine/productsLine.service';
import { UserRouter } from '../users/users.router';
import { UserService } from '../users/users.service';
import { TrpcService } from './trpc.service';

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
    private readonly users: UserRouter,
    private readonly auth: AuthRouter,
  ) {}

  appRouter = this.trpc.router({
    images: this.images.imagesRouter,
    cardsProduct: this.cardsProduct.cardsProductRouter,
    productsLine: this.productsLine.productsLineRouter,
    lines: this.lines.linesRouter,
    categories: this.categories.categoriesRouter,
    productsBooster: this.productsBooster.productsBoosterRouter,
    users: this.users.usersRouter,
    auth: this.auth.authRouter,
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
        'users',
        'auth',
      ],
    },
  );

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static getAppRouter() {
    const prismaService = new PrismaService();
    const jwtService = new JwtService();
    const trpcService = new TrpcService(prismaService, jwtService);

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
      new UserRouter(trpcService, new UserService(prismaService)),
      new AuthRouter(
        trpcService,
        new UserService(prismaService),
        new AuthService(prismaService, jwtService),
      ),
    );
    return {
      appRouter: trpcRouter.appRouter,
      createCallerFactory: trpcRouter.trpc.createCallerFactory,
    };
  }

  async applyMiddleware(app: INestApplication): Promise<void> {
    app.use(express.json());

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    app.use((req: any, _res: any, next: any) => {
      // request logger
      console.log('⬅️ ', req.method, req.path, req.body, req.query);

      next();
    });

    app.use(
      `/${process.env.APP_API}/${process.env.APP_TRPC}`,
      createExpressMiddleware({
        router: this.appRouter,
        createContext: this.trpc.createContext,
      }),
    );

    app.use(
      `/${process.env.APP_SWAGER}`,
      swaggerUi.serve,
      swaggerUi.setup(this.openApiDocument),
    );
  }
}

export const { appRouter, createCallerFactory } = TrpcRouter.getAppRouter();
export type AppRouter = TrpcRouter['appRouter'];
