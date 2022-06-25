import { Injectable } from '@nestjs/common';
import { CreateLogReaderDto } from './dto/create-log-reader.dto';
import { UpdateLogReaderDto } from './dto/update-log-reader.dto';

@Injectable()
export class LogReaderService {
  constructor() {
    this.init();
  }
  init() {

	}
}
