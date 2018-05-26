import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpClientModule } from '@angular/common/http';

import 'rxjs/add/operator/map';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';

import { asyncData, asyncError } from '../../../test-config/mocks/async-observable-helpers';
import { PlatformMock} from '../../../test-config/mocks/platform.mock';
import { Platform } from 'ionic-angular';

import { AccountabilityService } from './accountability.service';
import { CategoryService } from "../../common/category/category.service";
import { UtilService } from "../../common/util/util.service";

describe('Service: Accountability Service', () => {

    let httpSpy: { get: jasmine.Spy },
      platform = new PlatformMock(),
      accountabilityServiceSpy: AccountabilityService,
      categoryServiceSpy: CategoryService,
      utilServiceSpy: UtilService;

    beforeEach(async(() => {
      // Used spy to mock services.
      httpSpy = jasmine.createSpyObj('Http', ['get']);
      categoryServiceSpy = jasmine.createSpyObj('UtilService',
                          ['getCategories', 'setCategories', 'getCategoryById', 'getCategoriesFromConfig']);
      utilServiceSpy = jasmine.createSpyObj('UtilService', 
                          ['getTotal', 'sort', 'getSanitizedUrl', 'loadThemes', 'getObjFromArray', 'getTheme']);
      accountabilityServiceSpy = new AccountabilityService(<any> httpSpy, new Platform(), categoryServiceSpy);
    }));

    it('#getData() should load data', () => {
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
      expect(httpSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('#getThresholdLimit() should get Threshold Limit', () => {
      accountabilityServiceSpy.getThresholdLimit('people');
      expect(categoryServiceSpy.getCategoryById).toHaveBeenCalled();
    });
}); 