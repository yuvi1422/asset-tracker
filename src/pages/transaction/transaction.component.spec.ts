import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { IonicModule, NavController, NavParams, Platform,
          PopoverController, ToastController, AlertController } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { Contacts } from '@ionic-native/contacts';

import { NavMock, NavParamsMock, getStubPromise, getPromise, accountabilityStub }
              from '../../../test-config/mocks/mocks';
import { asyncData, asyncError } from '../../../test-config/mocks/async-observable-helpers';
import { PlatformMock } from '../../../test-config/mocks/platform.mock';

import { contactsSpy, messageServiceSpy, utilServiceSpy} from '../../../test-config/spies/other.spies';
import { platformSpy } from '../../../test-config/spies/platform.spie';

import { MyApp } from '../../app/app.component';
import { TransactionComponent } from './transaction.component';

import { Logger } from "../../common/log/logger.service";
import { UtilService } from "../../common/util/util.service";
import { TransactionService } from './transaction.service';
import { MessageService } from "../../common/util/message.service";

let comp: TransactionComponent;
let fixture: ComponentFixture<TransactionComponent>;
let de: DebugElement;
let el: HTMLElement;

let toastSpy,
  toastCtrlSpy,
  alertSpy,
  alertCtrlSpy,
  storageSpy,
  loggerSpy,
  navCtrlSpy,
  transactionServiceSpy,
  parentData,
  transactionBean,
  categories,
  accountabilities,
  isCordova = false;

// Change default timeout of jasmine. It would be helpful to test AJAX.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('Page: Transaction', () => {

  parentData = {
    title: 'Add Transaction',
    theme: 'royal',
    isPristine: true,
    transactionIndex: 0,
    CATEGORIES_KEY: 'asset-tracker-store-categories',
    SEPARATOR: '-'
  };
  transactionBean = {
    titlePlaceholder: 'Note',
    pricePlaceholder: 'Price',
    id: '',
    title: '',
    icon: 'assets/avatar/people/person.ico',
    price: '',
    isActive: true,
    date: new Date(),
    category: null,
    accountability: {
      icon: 'assets/avatar/people/person.ico',
      title: 'Select Contact',
      price: 0,
      transactions: []
    }
  };
  categories = [
    { id: "people", title: "Borrowers", icon: "people", price: 0, thresholdLimit: 100000 },
    { id: "fd", title: "FD", icon: "lock", price: 0, thresholdLimit: 100000 },
    { id: "gold", title: "Gold", icon: "ios-star-half", price: 0, thresholdLimit: 50000 },
    { id: "mf", title: "Mutual Fund", icon: "pulse", price: 0, thresholdLimit: 50000 }
  ];
  accountabilities = {
    accountabilities: [{
      accountability: {
        icon: {
          changingThisBreaksApplicationSecurity: "content://com.android.contacts/contacts/2737/photo"
        },
        title: "Abhijit Kurane",
        price: 0,
        transactions: [],
        id: "2737",
        icon_uri: "content://com.android.contacts/contacts/2737/photo"
      }
    }]
  };

  // Used spy to mock services.

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

  storageSpy = jasmine.createSpyObj('Storage', 
                    ['get','set', 'driver', 'ready', 'remove', 'clear', 'length', 'keys', 'forEach']);

  storageSpy.ready.and.callFake(function () {
    return getStubPromise();
  });

  /**
   * @description Function to get store value for transaction component.
   * @param storeKey - key to retrieve store value from storage spy.
   */
  function getStoreForTransaction(storeKey) {
    if (storeKey === 'asset-tracker-store-categories') {
      return getPromise(JSON.stringify(categories));
    }
    if (storeKey === 'asset-tracker-store-categories-people') {
      let storedValue = comp.parentData.isPristine ? accountabilityStub : accountabilities;
      return getPromise(JSON.stringify(storedValue));
    }
    return getStubPromise();
  }

  navCtrlSpy = jasmine.createSpyObj('NavController', ['push', 'pop', 'getActive', 'setRoot']);

  loggerSpy = jasmine.createSpyObj('Logger', ['log', 'warn', 'error', 'info']);
  transactionServiceSpy = jasmine.createSpyObj('TransactionService', ['getBean']);
  transactionServiceSpy.getBean.and.callFake(function () {
    return transactionBean;
  });
  
  beforeEach(async(() => {

    NavParamsMock.setParams(parentData);

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
          useValue: storageSpy
        },
        {
          provide: Contacts,
          useValue: contactsSpy
        },
        {
          provide: Platform,
          useValue: platformSpy
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
          provide: MessageService,
          useValue: messageServiceSpy
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

    storageSpy.get.and.callFake(getStoreForTransaction);

    fixture = TestBed.createComponent(TransactionComponent);
    comp = fixture.componentInstance;
    comp.categories = categories;
    comp.transaction = transactionBean;
    comp.transaction.category = categories[0];
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    de = null;
    el = null;
    platformSpy._reset();
  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it('#loadData should load data', fakeAsync(() => {

    comp.parentData = null;
    comp.loadData();
    tick();
    expect(messageServiceSpy.getMessage.calls.mostRecent().args[1]).toEqual('parentDataError');

    storageSpy.get.and.callFake(function () {
      return getStubPromise();
    });
    comp.parentData = parentData;
    comp.loadData();
    tick();                         //  flushes all existing async calls.
    fixture.detectChanges();        // update view
    expect(messageServiceSpy.getMessage.calls.mostRecent().args[1]).toEqual('storageDataError');

    storageSpy.get.and.callFake(getStoreForTransaction);
    comp.parentData.isPristine = false;
    comp.parentData.transaction = transactionBean;
    comp.parentData.transaction.category = categories[0];
    comp.loadData();
    tick();                         //  flushes all existing async calls.
    fixture.detectChanges();        // update view
    expect(comp.transaction.category).toEqual(categories[0]);
  }));

  it('#loadAccountabilities should load accountabilities', async(() => {
    fixture.detectChanges(); // ngOnInit()
    expect(comp.accountabilities).toBeUndefined();
    
    // Clone object to make sure fresh object is used all time
    let tmpParentData = JSON.parse(JSON.stringify(comp.parentData)),
        tmpTransaction = JSON.parse(JSON.stringify(comp.transaction));

    comp.parentData = null;
    comp.loadAccountabilities();
    expect(loggerSpy.error).toHaveBeenCalled();

    comp.parentData = {};
    comp.loadAccountabilities();
    expect(loggerSpy.error).toHaveBeenCalled();

    comp.transaction = null;
    comp.loadAccountabilities();
    expect(loggerSpy.error).toHaveBeenCalled();

    comp.transaction = {};
    comp.loadAccountabilities();
    expect(loggerSpy.error).toHaveBeenCalled();

    comp.parentData = tmpParentData;
    comp.transaction = tmpTransaction;
    comp.loadAccountabilities();
    fixture.whenStable().then(() => { // wait for async to get complete
      fixture.detectChanges();        // update view
      if(comp.parentData.isPristine) {
        expect(comp.accountabilities.length).toEqual(0);
      }
    });
  }));

  it('#displayToast() should display toast', async(() => {
    comp.displayToast('Export fail');
    expect(toastSpy.present).toHaveBeenCalled();
    comp.displayToast(null);
    expect(loggerSpy.error).toHaveBeenCalled();
  }));

  it('#save() should save transaction', fakeAsync(() => {
    comp.save();
    expect(messageServiceSpy.getMessage.calls.mostRecent().args[1]).toEqual('fillupDetails');

    // Clone the transaction bean object to avoid changes by reference.
    comp.transaction = JSON.parse(JSON.stringify(transactionBean));
    comp.transaction.price = 10000;
    comp.transaction.title = "Marriage";
    platformSpy._set(true);
    comp.save();

    tick();
    fixture.detectChanges();
    expect(messageServiceSpy.getMessage.calls.mostRecent().args[1]).toEqual('selectContact');

    platformSpy._reset();
    comp.parentData.isPristine = true;
    comp.save();
    tick();
    fixture.detectChanges();
    expect(messageServiceSpy.getMessage.calls.mostRecent().args[1]).toEqual('transactionSuccess');

  }));

  it('#isRunningOnDevice() should check for weather app is running on device or not', () => {
    platformSpy._reset();
    expect(comp.isRunningOnDevice()).toBeFalsy();
    platformSpy._set(true);
    expect(comp.isRunningOnDevice()).toBeTruthy();
  });

  it('#pickContact() should pick Contact', async(() => {

    platformSpy._set(false);
    comp.pickContact();
    expect(comp.transaction.accountability.id).toBeUndefined();

    platformSpy._set(true);
    comp.pickContact();
    fixture.whenStable().then(() => {
      expect(comp.transaction.accountability.id).toEqual('2737');
      platformSpy._set(true);
      contactsSpy._set();
      comp.pickContact();
      fixture.whenStable().then(() => {
        expect(comp.transaction.accountability.photos).toBeUndefined();
      });
    });
  }));
}); 