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

import { CategoryService } from "./category.service";
import { UtilService } from "../../common/util/util.service";

describe('Service: Category Service', () => {

    let httpSpy: { get: jasmine.Spy },
      platform = new PlatformMock(),
      categoryServiceSpy: CategoryService,
      utilServiceSpy: any,
      expectedData;

    beforeEach(async(() => {
      // Used spy to mock services.
      httpSpy = jasmine.createSpyObj('Http', ['get']);
      utilServiceSpy = jasmine.createSpyObj('UtilService', 
                          ['getTotal', 'sort', 'getSanitizedUrl', 'loadThemes', 'getObjFromArray', 'getTheme']);

      utilServiceSpy.getObjFromArray.and.callFake(function(param1, param2, param3) {
        return expectedData[0];
      });
      categoryServiceSpy = new CategoryService(<any> httpSpy, new Platform(), utilServiceSpy);

      expectedData = [
        {id:"people",title:"Borrowers",icon:"people",price:0,thresholdLimit:100000},
        {id:"fd",title:"FD",icon:"lock",price:0,thresholdLimit:100000},
        {id:"gold",title:"Gold",icon:"ios-star-half",price:0,thresholdLimit:50000},
        {id:"mf",title:"Mutual Fund",icon:"pulse",price:0,thresholdLimit:50000}
      ];
    }));

    it('#getCategories() & #setCategories should work like getters/setters', () => {

      categoryServiceSpy.setCategories(expectedData);
      expect(categoryServiceSpy.getCategories()).toEqual(expectedData);
    });

    it('#getCategoryById() should get Category By Id', () => {

      expect(categoryServiceSpy.getCategoryById('people')).toBeNull();
      categoryServiceSpy.setCategories(expectedData);
      expect(categoryServiceSpy.getCategoryById('people')).toEqual(expectedData[0]);
    });

    it('#getCategoriesFromConfig() should get categories from config', () => {

      httpSpy.get.and.returnValue(asyncData(expectedData));

      categoryServiceSpy.getCategoriesFromConfig().subscribe(
          value => {
            expect<any>(value).toEqual(expectedData, 'expected data');
          },
          fail
      );
      expect(httpSpy.get.calls.count()).toBe(1, 'one call');
    });
});