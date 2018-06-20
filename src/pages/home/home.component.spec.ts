import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, PopoverController} from 'ionic-angular';

import { NavMock } from '../../../test-config/mocks/mocks';
import { StorageMock } from '../../../test-config/mocks/storage.mock';
import { asyncData, asyncError } from '../../../test-config/mocks/async-observable-helpers';

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
      // Used spy to mock services.
      let loggerSpy = jasmine.createSpyObj('Logger', ['error']),
          utilServiceSpy = jasmine.createSpyObj('UtilService', ['getTheme', 'getTotal', 'sort']),
          urlServiceSpy = jasmine.createSpyObj('UrlService', ['getAddBtnImageUrl', 'getAppName']),
          categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['setCategories']),
          homeServiceSpy = jasmine.createSpyObj('HomeService', ['getData']),
          accountabilityServiceSpy = jasmine.createSpyObj('AccountabilityService', ['getData']);

          urlServiceSpy.getAddBtnImageUrl.and.returnValue('assets/images/add_btn_message.jpg');
          const expectedHomeServiceData = {
            categories: [
              { id: "people", title: "Borrowers", icon: "people", price: 0, thresholdLimit: 100000 },
              { id: "fd", title: "FD", icon: "lock", price: 0, thresholdLimit: 100000 },
              { id: "gold", title: "Gold", icon: "ios-star-half", price: 0, thresholdLimit: 50000 },
              { id: "mf", title: "Mutual Fund", icon: "pulse", price: 0, thresholdLimit: 50000 }
            ]
          };
          homeServiceSpy.getData.and.returnValue(asyncData(expectedHomeServiceData));
          utilServiceSpy.sort.and.returnValue(expectedHomeServiceData);
          accountabilityServiceSpy.getData.and.callFake(function(id) {
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
        comp    = fixture.componentInstance;

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
                                name:  'primary',
                                color: 'primary'
            });
    });

    it('#loadData() should load data', () => {

      comp.loadData();
      expect(comp.addBtnImageUrl).toEqual('assets/images/add_btn_message.jpg');
    });


}); 