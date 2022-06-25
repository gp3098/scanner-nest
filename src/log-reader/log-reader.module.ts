import { Module } from '@nestjs/common';
import { LogReaderService } from './log-reader.service';
import { LogReaderController } from './log-reader.controller';

@Module({
  controllers: [LogReaderController],
  providers: [LogReaderService],
})
export class LogReaderModule {}
