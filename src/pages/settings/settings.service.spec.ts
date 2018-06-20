import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpClientModule } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { Platform } from 'ionic-angular';

import { asyncData, asyncError } from '../../../test-config/mocks/async-observable-helpers';
import { PlatformMock} from '../../../test-config/mocks/platform.mock';

import { SettingsService } from "./settings.service";

describe('Service: Settings Service', () => {
    let httpSpy: { get: jasmine.Spy },
        platform = new PlatformMock(),
        settingsServiceSpy,
        expectedData = {
          title: 'Settings',
          items: [
            {
              id: 'export',
              title: 'Back Up'
            },
            {
              id: 'import',
              title: 'Restore'
            }
          ]
        };

    beforeEach(async(() => {
      // Used spy to mock services.
      httpSpy = jasmine.createSpyObj('Http', ['get']);
      // Use fake promise to get function so that it will work with subscribe.
      
      settingsServiceSpy = new SettingsService(<any> httpSpy, <any> platform);
    }));

    it('#getData() should get data', async(() => {
      httpSpy.get.and.returnValue(asyncData(expectedData));
      settingsServiceSpy.getData().subscribe(
          data => {
            expect<any>(data).toEqual(expectedData, 'expected data');
          },
          fail
      );
      expect(httpSpy.get.calls.count()).toBe(1, 'one call');
    }));

 
    it('#importData() should import data', async(() => {
      let backupData =    {
            accountabilities: {
                people: "{\"title\":\"Accountability List\",\"accountabilities\":[{\"icon\":{\"changingThisBreaksApplicationSecurity\":\"content:\/\/com.android.contacts\/contacts\/2737\/photo\"},\"title\":\"Abhijit Kurane\",\"price\":130,\"transactions\":[{\"titlePlaceholder\":\"Note\",\"pricePlaceholder\":0,\"id\":\"\",\"title\":\"Paratha\",\"icon\":\"assets\/avatar\/people\/person.ico\",\"price\":130,\"isActive\":true,\"date\":\"2017-08-09T14:06:41.857Z\",\"category\":{\"id\":\"people\",\"title\":\"Friends and Relatives\",\"icon\":\"people\",\"price\":0},\"accountability\":{\"icon\":{\"changingThisBreaksApplicationSecurity\":\"content:\/\/com.android.contacts\/contacts\/2737\/photo\"},\"title\":\"Abhijit Kurane\",\"price\":0,\"transactions\":[],\"id\":\"2737\",\"icon_uri\":\"content:\/\/com.android.contacts\/contacts\/2737\/photo\"}}],\"id\":\"2737\",\"icon_uri\":\"content:\/\/com.android.contacts\/contacts\/2737\/photo\"}]}"
            },
            categories: "[{\"id\":\"people\",\"title\":\"Friends and Relatives\",\"icon\":\"people\",\"price\":130},{\"id\":\"fd\",\"title\":\"FD\",\"icon\":\"lock\",\"price\":0},{\"id\":\"gold\",\"title\":\"Gold\",\"icon\":\"ios-star-half\",\"price\":0},{\"id\":\"mf\",\"title\":\"Mutual Fund\",\"icon\":\"pulse\",\"price\":0}]"
      };

      httpSpy.get.and.returnValue(asyncData(backupData));
      settingsServiceSpy.importData().subscribe(
          data => {
            expect<any>(data).toEqual(backupData, 'expected data');
          },
          fail
      );
      expect(httpSpy.get.calls.count()).toBe(1, 'one call');
    }));
});