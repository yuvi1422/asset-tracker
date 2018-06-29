import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpClientModule } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';

import { asyncData, asyncError } from '../../../test-config/mocks/async-observable-helpers';
import { Platform } from 'ionic-angular';
import { httpSpy, accountabilityServiceSpy, categoryServiceSpy, utilServiceSpy} from '../../../test-config/spies/other.spies';
import { platformSpy } from '../../../test-config/spies/platform.spie';

import { AccountabilityService } from './accountability.service';
import { CategoryService } from "../../common/category/category.service";
import { UtilService } from "../../common/util/util.service";

describe('Service: Accountability Service', () => {

    let accountabilityServiceSpy;
    beforeEach(async(() => {
      // Used spy to mock services.
      accountabilityServiceSpy = new AccountabilityService(<any> httpSpy, platformSpy, categoryServiceSpy);
    }));

    it('#getData() should get data', () => {
      const expectedData = {
        title: "Accountability List",
        accountabilities: []
      };

      httpSpy.get.and.returnValue(asyncData(expectedData));

      accountabilityServiceSpy.getData('people').subscribe(
        value => {
          expect<any>(value).toEqual(expectedData, 'expected data');
        },
        fail
      );
    });

    it('#getThresholdLimit() should get Threshold Limit', () => {
      accountabilityServiceSpy.getThresholdLimit('people');
      expect(categoryServiceSpy.getCategoryById).toHaveBeenCalled();
    });
});   