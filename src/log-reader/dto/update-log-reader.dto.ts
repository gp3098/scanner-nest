import { PartialType } from '@nestjs/mapped-types';
import { CreateLogReaderDto } from './create-log-reader.dto';

export class UpdateLogReaderDto extends PartialType(CreateLogReaderDto) {}
