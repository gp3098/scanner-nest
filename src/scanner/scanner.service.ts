import { SerialPortStream } from '@serialport/stream';
import { MockBinding } from '@serialport/binding-mock';
import { ConfigService } from '@nestjs/config';

import { Injectable } from '@nestjs/common';
import { DelimiterParser, SerialPort } from 'serialport';
import { HttpService } from '@nestjs/axios';
import { Stream } from 'stream';

@Injectable()
export class ScannerService {
  scanner: Stream;
  port: any;
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.scannerCreator();
  }
  scannerCreator() {
    const parser = new DelimiterParser({ delimiter: '\r\n' });
    const isMockScanner = this.configService.get('mockScanner');
    if (isMockScanner) {
      MockBinding.createPort('/dev/mock', { echo: true, record: true });
      this.port = new SerialPortStream({
        binding: MockBinding,
        path: '/dev/mock',
        baudRate: 9600,
      });
    } else {
      this.port = new SerialPort({
        path: this.configService.get('path'),
        baudRate: this.configService.get('baudRate'),
        autoOpen: this.configService.get('autoOpen'),
      });
    }

    this.scanner = this.port.pipe(parser);
    this.scanner.on('data', this.receiveData);
    return this.scanner;
  }
  list() {
    // this.port.port.emitData('list data\r\n');
    return SerialPort.list();
  }
  receiveData(buffer) {
    // this.httpService.get('http://www.baidu.com').subscribe((res) => {
    //   console.log(res);
    // });
    console.log('buffer', buffer);
    return buffer;
  }
}
