import { ConfigService } from '@nestjs/config';

import { Injectable } from '@nestjs/common';
import { DelimiterParser, SerialPort } from 'serialport';
// const SerialPort = require("serialport");
// const { Readline, ByteLength, CCTalk, Delimiter } = SerialPort.parsers;

@Injectable()
export class ScannerService {
  scanner: any;
  constructor(private configService: ConfigService) {
    const parser = new DelimiterParser({ delimiter: '\r\n' });
    // const parser = new Delimiter({ delimiter: Buffer.from('\r') });
    // let scanner = new SerialPort(this.configService.get('path'), {
    //   baudRate: this.configService.get('baudRate') || 115200,
    //   autoOpen: this.configService.get('autoOpen'),
    // });
    const scanner = new SerialPort({
      path: this.configService.get('path'),
      baudRate: this.configService.get('baudRate'),
      autoOpen: this.configService.get('autoOpen'),
    });
    this.scanner = scanner.pipe(parser);
  }
  list() {
    return SerialPort.list();
  }
}
