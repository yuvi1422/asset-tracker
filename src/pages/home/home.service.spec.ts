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

import { HomeService } from './home.service';

describe('Service: Home Service', () => {

    let httpSpy: { get: jasmine.Spy };
    let platform = new PlatformMock();
    let homeService: HomeService;

    beforeEach(async(() => {
      // Used spy to mock services.
      httpSpy = jasmine.createSpyObj('Http', ['get']);
      homeService = new HomeService(<any> httpSpy, new Platform());
    }));

    it('initialises service properties', () => {
      const expectedData = {
        categories: [
          {
            id:"people",title:"Borrowers",icon:"people",price:0,thresholdLimit:100000},
            {id:"fd",title:"FD",icon:"lock",price:0,thresholdLimit:100000},
            {id:"gold",title:"Gold",icon:"ios-star-half",price:0,thresholdLimit:50000},
            {id:"mf",title:"Mutual Fund",icon:"pulse",price:0,thresholdLimit:50000}
          ]};

      httpSpy.get.and.returnValue(asyncData(expectedData));

        homeService.getData().subscribe(
          value => {
            expect<any>(value).toEqual(expectedData, 'expected data');
          },
          fail
      );
      expect(httpSpy.get.calls.count()).toBe(1, 'one call');
    });
});