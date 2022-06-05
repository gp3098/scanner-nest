import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ServeStaticModule } from '@nestjs/serve-static';
import configuration from '../config/configuration';
// import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env.development.local', '.env.development', '.env'],
    }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('mongodb.uri'),
    //     dbName: configService.get<string>('mongodb.dbName'),
    //     replicaSet: configService.get<string>('mongodb.replicaSet'),
    //     authSource: configService.get<string>('mongodb.authSource'),
    //     auth: {
    //       username: configService.get<string>('mongodb.username'),
    //       password: configService.get<string>('mongodb.password'),
    //     },
    //   }),
    // inject: [ConfigService],
    // }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    // }),
  ],
})
export class BootstrapModule {}
