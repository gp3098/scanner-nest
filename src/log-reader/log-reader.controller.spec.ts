import { Test, TestingModule } from '@nestjs/testing';
import { LogReaderController } from './log-reader.controller';
import { LogReaderService } from './log-reader.service';

describe('LogReaderController', () => {
  let controller: LogReaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogReaderController],
      providers: [LogReaderService],
    }).compile();

    controller = module.get<LogReaderController>(LogReaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
