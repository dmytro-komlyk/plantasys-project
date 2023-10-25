import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_DB_URI'),
        dbName: config.get<string>('MONGO_DB_NAME'),
        auth: {
          username: config.get<string>('MONGO_DB_AUTH_USERNAME'),
          password: config.get<string>('MONGO_DB_AUTH_PASSWORD'),
        },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
