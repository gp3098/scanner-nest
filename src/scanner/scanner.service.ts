import { SerialPortStream } from '@serialport/stream';
import { MockBinding } from '@serialport/binding-mock';
import { ConfigService } from '@nestjs/config';

import { Injectable } from '@nestjs/common';
import { SerialPort, DelimiterParser } from 'serialport';
import { HttpService } from '@nestjs/axios';
import { Stream } from 'stream';
import {
  catchError,
  delay,
  firstValueFrom,
  lastValueFrom,
  map,
  retry,
  retryWhen,
  take,
  tap,
  throwError,
} from 'rxjs';
@Injectable()
export class ScannerService {
  scanner: Stream;
  port: any;
  delimiter = '-';
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.scannerCreator();
  }
  scannerCreator() {
    const parser = new DelimiterParser({ delimiter: this.delimiter });

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
    // this.port.on('data', this.receiveData);
    return this.scanner;
  }
  list() {
    return SerialPort.list();
  }
  async send(msg: string) {
    const $postData = this.httpService
      .post('http://localhost:3001/api/scanner', { msg })
      .pipe(
        map((val) => {
          if (!val.data.success) {
            throw new Error(val.data.success);
          }
          return val.data;
        }),
        retryWhen((errors) =>
          errors.pipe(
            // log error message
            tap((val) => console.log(`retrying`, val.message)),
            // restart in 5 seconds
            delay(2000),
            take(4),
          ),
        ),
      );
    const res = await lastValueFrom($postData).catch((error) => {
      console.log('req err:', error);
    });
    console.log('request data: ', res);

    // this.port.port.emitData(`${msg}${this.delimiter}`);
  }
  receiveData(buffer) {
    // this.httpService.get('http://www.baidu.com').subscribe((res) => {
    //   console.log(res);
    // });

    this.httpService
      .post('http://localhost:3001/api/scanner', { msg: buffer.toString() })
      .subscribe((res) => {
        console.log(res);
      });

    console.log('buffer', buffer, buffer.toString());
    return buffer;
  }
}
