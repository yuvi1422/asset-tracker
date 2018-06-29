import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpClientModule } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { Platform } from 'ionic-angular';

import { asyncData, asyncError } from '../../../test-config/mocks/async-observable-helpers';
import { messagesMock } from '../../../test-config/mocks/mocks';
import { httpSpy, toastCtrlSpy, loggerSpy } from '../../../test-config/spies/other.spies';
import { platformSpy } from '../../../test-config/spies/platform.spie';

import { MessageService } from "./message.service";

describe('Service: Message Service', () => {

    let messageServiceSpy,
        expectedData = messagesMock;

    beforeEach(async(() => {
      // Use fake promise to get function so that it will work with subscribe.
      httpSpy.get.and.callFake(function() {
        return asyncData(expectedData);
      });
      messageServiceSpy = new MessageService(<any> httpSpy, toastCtrlSpy, <any> platformSpy, loggerSpy);
    }));

    it('#displayToast() should display toast', async(() => {
      messageServiceSpy.displayToast('Export fail' , 4000, 'bottom');
      expect(toastCtrlSpy.create).toHaveBeenCalled();
      messageServiceSpy.displayToast(null , 4000, 'bottom');
      expect(loggerSpy.error).toHaveBeenCalled();
    }));

    it('#loadMessages() should load messages', async(() => {
      messageServiceSpy.loadMessages();
      expect(httpSpy.get).toHaveBeenCalled();
    }));

    it('#getMessages() should get messages', () => {
      expect(messageServiceSpy.getMessages('anyRandomValue')).toBeNull();
      expect(loggerSpy.error).toHaveBeenCalled();
    });
});