import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScannerModule } from './scanner/scanner.module';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { LogReaderModule } from './log-reader/log-reader.module';

@Module({
  imports: [ScannerModule, BootstrapModule, LogReaderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
