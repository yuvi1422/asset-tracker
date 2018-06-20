import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, NavParams, PopoverController} from 'ionic-angular';

import { NavMock, NavParamsMock } from '../../../test-config/mocks/mocks';
import { StorageMock } from '../../../test-config/mocks/storage.mock';
import { asyncData, asyncError } from '../../../test-config/mocks/async-observable-helpers';

import { Http, HttpModule} from '@angular/http';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { MyApp } from '../../app/app.component';
import { AccountabilityComponent } from './accountability.component';

import { TransactionListComponent } from '../transaction-list/transaction-list.component';

import { Logger } from "../../common/log/logger.service";
import { UtilService } from "../../common/util/util.service";

import { AccountabilityService } from './accountability.service';

let comp: AccountabilityComponent;
let fixture: ComponentFixture<AccountabilityComponent>;
let de: DebugElement;
let el: HTMLElement;


// Change default timeout of jasmine. It would be helpful to test AJAX.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('Page: Accountability Page', () => {
    let loggerSpy,
      utilServiceSpy,
      homeServiceSpy,
      accountabilityServiceSpy;
    beforeEach(async(() => {
      // Used spy to mock services.
      NavParamsMock.setParams({
          item: { id: "people", title: "Borrowers", icon: "people", price: 0, thresholdLimit: 100000 },
          theme: 'royal',
          CATEGORIES_KEY: 'asset-tracker-store-categories',
          SEPARATOR: '-',
          categoryId: 'people'
      });
      loggerSpy = jasmine.createSpyObj('Logger', ['log', 'warn', 'error', 'info']);
      utilServiceSpy = jasmine.createSpyObj('UtilService', ['getTheme', 'getTotal', 'sort']);
      homeServiceSpy = jasmine.createSpyObj('HomeService', ['getData']);
      accountabilityServiceSpy = jasmine.createSpyObj('AccountabilityService', ['getData', 'getThresholdLimit']);

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
          MyApp, AccountabilityComponent
        ],

        providers: [
          {
            provide: NavController,
            useClass: NavMock
          },
          {
            provide: NavParams,
            useClass: NavParamsMock
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

        fixture = TestBed.createComponent(AccountabilityComponent);
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

    it('#loadData() should load data', () => {

      comp.loadData();
      // TODO: Test promise response
      expect(comp.title).toEqual('Borrowers');
    });

    it('#loadTransactionListPage() should load transaction list page', () => {

      comp.loadTransactionListPage({});
      expect(accountabilityServiceSpy.getThresholdLimit).toHaveBeenCalled();
    });
}); 