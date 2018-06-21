import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, PopoverController} from 'ionic-angular';

import { NavMock } from '../../../test-config/mocks/mocks';
import { StorageMock } from '../../../test-config/mocks/storage.mock';
import { asyncData, asyncError } from '../../../test-config/mocks/async-observable-helpers';
import { loggerSpy, utilServiceSpy, urlServiceSpy, categoryServiceSpy, homeServiceSpy, 
          accountabilityServiceSpy } from '../../../test-config/spies/other.spies';
import { categoriesMock }from '../../../test-config/mocks/mocks';

import { Http, HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { MyApp } from '../../app/app.component';
import { HomeComponent } from './home.component';

import { PopoverListComponent } from '../../common/popover/popover-list.component';

import { AccountabilityComponent } from '../accountability/accountability.component';
import { TransactionComponent } from '../transaction/transaction.component';

import { Logger } from "../../common/log/logger.service";
import { UtilService } from "../../common/util/util.service";
import { UrlService } from "../../common/util/url.service";
import { CategoryService } from "../../common/category/category.service";

import { HomeService } from './home.service';
import { AccountabilityService } from './../accountability/accountability.service';

let comp: HomeComponent;
let fixture: ComponentFixture<HomeComponent>;
let de: DebugElement;
let el: HTMLElement;

// Change default timeout of jasmine. It would be helpful to test AJAX.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('Page: Home Page', () => {

  beforeEach(async(() => {

    urlServiceSpy.getAddBtnImageUrl.and.returnValue('assets/images/add_btn_message.jpg');
    const expectedHomeServiceData = {
      categories: categoriesMock
    };
    homeServiceSpy.getData.and.returnValue(asyncData(expectedHomeServiceData));
    utilServiceSpy.sort.and.returnValue(expectedHomeServiceData);
    accountabilityServiceSpy.getData.and.callFake(function (id) {
      return asyncData({
        title: "Accountability List",
        accountabilities: []
      });
    });

    TestBed.configureTestingModule({

      declarations: [
        MyApp, HomeComponent
      ],

      providers: [
        {
          provide: NavController,
          useClass: NavMock
        },
        {
          provide: Storage,
          useFactory: () => StorageMock.instance()
        },
        {
          provide: Logger,
          useValue: loggerSpy
        },
        {
          provide: UtilService,
          useValue: utilServiceSpy
        },
        {
          provide: UrlService,
          useValue: urlServiceSpy
        },
        {
          provide: CategoryService,
          useValue: categoryServiceSpy
        },
        {
          provide: HomeService,
          useValue: homeServiceSpy
        },
        {
          provide: AccountabilityService,
          useValue: accountabilityServiceSpy
        }
      ],

      imports: [
        HttpModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
      ]

    }).compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(HomeComponent);
    comp = fixture.componentInstance;

  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    de = null;
    el = null;
  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it('initialises home page properties', () => {
    expect(comp['SEPARATOR']).toEqual('-');
    expect(comp['STORE_KEY']).toEqual('asset-tracker-store');
    expect(comp['theme']).toEqual({
      name: 'primary',
      color: 'primary'
    });
  });

  it('#loadData() should load data', () => {

    comp.loadData();
    expect(comp.addBtnImageUrl).toEqual('assets/images/add_btn_message.jpg');
  });
}); 