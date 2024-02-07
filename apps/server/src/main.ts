import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { AppModule } from './domain/app.module';
import { TrpcRouter } from './domain/trpc/trpc.router';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, PATCH, DELETE, OPTIONS',
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type', 'Accept', 'Range'],
    exposedHeaders: 'Content-Range',
  });

  app.setGlobalPrefix(process.env.APP_API as string);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useStaticAssets(`${process.cwd()}/${process.env.APP_STATIC_ASSETS}`, {
    prefix: `/${process.env.APP_STATIC_ASSETS}`,
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);

  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
