import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LogReaderService } from './log-reader.service';
import { CreateLogReaderDto } from './dto/create-log-reader.dto';
import { UpdateLogReaderDto } from './dto/update-log-reader.dto';

@Controller('log-reader')
export class LogReaderController {
  constructor(private readonly logReaderService: LogReaderService) {}

  // @Post()
  // create(@Body() createLogReaderDto: CreateLogReaderDto) {
  //   return this.logReaderService.create(createLogReaderDto);
  // }

  // @Get()
  // findAll() {
  //   return this.logReaderService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.logReaderService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLogReaderDto: UpdateLogReaderDto) {
  //   return this.logReaderService.update(+id, updateLogReaderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.logReaderService.remove(+id);
  // }
}
