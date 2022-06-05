import { Module } from '@nestjs/common';
import { ScannerService } from './scanner.service';
import { ScannerController } from './scanner.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT'),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ScannerController],
  providers: [ScannerService],
})
export class ScannerModule {}
