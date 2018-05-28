import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpClientModule } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { Platform } from 'ionic-angular';

import { asyncData, asyncError } from '../../../test-config/mocks/async-observable-helpers';
import { PlatformMock} from '../../../test-config/mocks/platform.mock';

import { MessageService } from "./message.service";

describe('Service: Message Service', () => {

    let httpSpy: { get: jasmine.Spy },
        platform = new PlatformMock(),
        toastSpy,
        toastCtrlSpy,
        loggerSpy,
        messageServiceSpy,
        expectedData = {
            settings: {
              exportSuccess: 'Backup Taken Sucessfully.',
              exportFail: 'Error while writing data to backup file.',
              appDirFail: 'Error while creating App directory.',
              importSuccess: 'Data Restored Sucessfully.',
              importFail: 'Data Restore Failed.',
              backupNotFound: 'No Backup File Found',
              cordovaNotFound: 'Cordova Not Found.',
              backupListingFail: 'Error while listing backup files'
          }
        };

    beforeEach(async(() => {
      // Used spy to mock services.
      httpSpy = jasmine.createSpyObj('Http', ['get']);
      loggerSpy = jasmine.createSpyObj('Logger', ['log', 'warn', 'error', 'info']);
      // Use fake promise to get function so that it will work with subscribe.
      httpSpy.get.and.callFake(function() {
        return asyncData(expectedData);
      });
      toastSpy = jasmine.createSpyObj('Toast', ['present']);
      toastCtrlSpy = jasmine.createSpyObj('ToastController', ['create']);
      toastCtrlSpy.create.and.callFake(function () {
        return toastSpy;
      });
      messageServiceSpy = new MessageService(<any> httpSpy, toastCtrlSpy, <any> platform, loggerSpy);
    }));

    it('#displayToast() should display toast', async(() => {
      messageServiceSpy.displayToast('Export fail' , 4000, 'bottom');
      expect(toastSpy.present).toHaveBeenCalled();
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