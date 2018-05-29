import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Http, HttpModule} from '@angular/http';
import { IonicModule, NavController, NavParams, Platform,
          PopoverController, ToastController, AlertController } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { Contacts } from '@ionic-native/contacts';

import { NavMock, NavParamsMock } from '../../../test-config/mocks/mocks';
import { StorageMock } from '../../../test-config/mocks/storage.mock';
import { asyncData, asyncError } from '../../../test-config/mocks/async-observable-helpers';
import { PlatformMock} from '../../../test-config/mocks/platform.mock';

import { MyApp } from '../../app/app.component';
import { TransactionComponent } from './transaction.component';

import { Logger } from "../../common/log/logger.service";
import { UtilService } from "../../common/util/util.service";
import { TransactionService } from './transaction.service';

let comp: TransactionComponent;
let fixture: ComponentFixture<TransactionComponent>;
let de: DebugElement;
let el: HTMLElement;

let toastSpy,
    toastCtrlSpy,
    alertSpy,
    alertCtrlSpy,
    loggerSpy,
    utilServiceSpy,
    navCtrlSpy,
    transactionServiceSpy;

// Change default timeout of jasmine. It would be helpful to test AJAX.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('Page: TransactionList Page', () => {

    beforeEach(async(() => {
      // Used spy to mock services.
      NavParamsMock.setParams({
        transaction: { 
          id: "a4445",
          title: "Marriage",
          icon: "people",
          price: 20000,
        },
        transactionIndex: 0,
        title: 'Update Transaction',
        theme: 'royal',
        CATEGORIES_KEY: 'people',
        SEPARATOR: '-'
      });

      toastSpy = jasmine.createSpyObj('Toast', ['present']);
      toastCtrlSpy = jasmine.createSpyObj('ToastController', ['create']);
      toastCtrlSpy.create.and.callFake(function () {
        return toastSpy;
      });

      alertSpy = jasmine.createSpyObj('Alert', ['present']);
      alertCtrlSpy = jasmine.createSpyObj('AlertController', ['create']);
      alertCtrlSpy.create.and.callFake(function () {
        return alertSpy;
      });

      navCtrlSpy = jasmine.createSpyObj('NavController', ['push', 'pop', 'getActive', 'setRoot']),
      loggerSpy = jasmine.createSpyObj('Logger', ['error']),
      utilServiceSpy = jasmine.createSpyObj('UtilService', ['getTheme', 'getTotal', 'sort']);
      transactionServiceSpy = jasmine.createSpyObj('TransactionService', ['getBean']);

      TestBed.configureTestingModule({

        declarations: [
          MyApp, TransactionComponent
        ],

        providers: [
          {
            provide: NavController,
            useValue: navCtrlSpy
          },
          {
            provide: NavParams,
            useClass: NavParamsMock
          },
          {
            provide: ToastController,
            useValue: toastCtrlSpy
          },
          {
            provide: AlertController,
            useValue: alertCtrlSpy
          },
          {
            provide: Storage,
            useFactory: () => StorageMock.instance()
          },
          Contacts,
          {
            provide: Platform,
            useClass: PlatformMock
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
            provide: TransactionService,
            useValue: transactionServiceSpy
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

        fixture = TestBed.createComponent(TransactionComponent);
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
    
    it('#displayToast() should display toast', async(() => {
      comp.displayToast('Export fail');
      expect(toastSpy.present).toHaveBeenCalled();
      comp.displayToast(null);
      expect(loggerSpy.error).toHaveBeenCalled();
    }));
}); 