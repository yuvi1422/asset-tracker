import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, NavParams, PopoverController } from 'ionic-angular';

import { NavMock, NavParamsMock } from '../../../test-config/mocks/mocks';
import { StorageMock } from '../../../test-config/mocks/storage.mock';
import { asyncData, asyncError } from '../../../test-config/mocks/async-observable-helpers';
import { navCtrlSpy, loggerSpy, utilServiceSpy } from '../../../test-config/spies/other.spies';

import { Http, HttpModule } from '@angular/http';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { MyApp } from '../../app/app.component';
import { TransactionListComponent } from './transaction-list.component';

import { TransactionComponent } from '../transaction/transaction.component';

import { Logger } from "../../common/log/logger.service";
import { UtilService } from "../../common/util/util.service";


let comp: TransactionListComponent;
let fixture: ComponentFixture<TransactionListComponent>;
let de: DebugElement;
let el: HTMLElement;

// Change default timeout of jasmine. It would be helpful to test AJAX.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('Page: TransactionList', () => {

    beforeEach(async(() => {
      NavParamsMock.setParams({
        item: { 
          id: "a4445",
          title: "Prashant Jadhav",
          icon: "people",
          price: 0,
          transactions:[]
        },
        thresholdLimit: 100000,
        theme: 'royal',
        CATEGORIES_KEY: 'people',
        SEPARATOR: '-'
      });

      TestBed.configureTestingModule({

        declarations: [
          MyApp, TransactionListComponent
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
            provide: Logger,
            useValue: loggerSpy
          },
          {
            provide: UtilService,
            useValue: utilServiceSpy
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

        fixture = TestBed.createComponent(TransactionListComponent);
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
      expect(comp.title).toEqual('Prashant Jadhav');
    });

    it('#loadTransactionPage() should load transaction page', () => {
      comp.loadTransactionPage({}, 0);
      expect(navCtrlSpy.push).toHaveBeenCalled();
    });
}); 