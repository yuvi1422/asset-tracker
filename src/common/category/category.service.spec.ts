import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpClientModule } from '@angular/common/http';

import 'rxjs/add/operator/map';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';

import { asyncData, asyncError } from '../../../test-config/mocks/async-observable-helpers';
import { httpSpy, utilServiceSpy} from '../../../test-config/spies/other.spies';

import { categoriesMock }from '../../../test-config/mocks/mocks';
import { platformSpy} from '../../../test-config/spies/platform.spie';
import { Platform } from 'ionic-angular';

import { CategoryService } from "./category.service";
import { UtilService } from "../../common/util/util.service";

describe('Service: Category Service', () => {

    let categoryServiceSpy: CategoryService,
      expectedData;

    beforeEach(async(() => {
      // Used spy to mock services.

      utilServiceSpy.getObjFromArray.and.callFake(function(param1, param2, param3) {
        return expectedData[0];
      });
      categoryServiceSpy = new CategoryService(<any> httpSpy, platformSpy, utilServiceSpy);

      expectedData = categoriesMock;
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
    });
});