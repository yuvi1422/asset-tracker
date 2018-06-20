import { async } from '@angular/core/testing';

import { Logger } from "./logger.service";

describe('Service: Category Service', () => {

    let loggerSpy: Logger;

    beforeEach(async(() => {

      loggerSpy = new Logger();
    }));

    it('#log() should log the message', () => {
      loggerSpy.log('message');
    });

    it('#warn() should warn the message', () => {
      loggerSpy.warn('message');
    });

    it('#info() should info the message', () => {
      loggerSpy.info('message');
    });

    it('#error() should log the message', () => {
      loggerSpy.error('message');
    });
});