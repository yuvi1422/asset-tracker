import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpClientModule } from '@angular/common/http';

import 'rxjs/add/operator/map';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';

import { asyncData, asyncError } from '../../../test-config/mocks/async-observable-helpers';
import { platformSpy} from '../../../test-config/spies/platform.spie';
import { Platform } from 'ionic-angular';
import { categoriesMock }from '../../../test-config/mocks/mocks';
import { httpSpy } from '../../../test-config/spies/other.spies';

import { HomeService } from './home.service';

describe('Service: Home Service', () => {

  let homeService: HomeService;

  beforeEach(async(() => {
    homeService = new HomeService(<any>httpSpy, platformSpy);
  }));

  it('initialises service properties', () => {
    const expectedData = {
      categories: categoriesMock
    };

    httpSpy.get.and.returnValue(asyncData(expectedData));

    homeService.getData().subscribe(
      value => {
        expect<any>(value).toEqual(expectedData, 'expected data');
      },
      fail
    );
  });
});