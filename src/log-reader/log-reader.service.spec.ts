import { Test, TestingModule } from '@nestjs/testing';
import { LogReaderService } from './log-reader.service';

describe('LogReaderService', () => {
  let service: LogReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogReaderService],
    }).compile();

    service = module.get<LogReaderService>(LogReaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
