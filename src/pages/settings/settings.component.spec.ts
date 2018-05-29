import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, ToastController, AlertController, ActionSheetController, Platform} from 'ionic-angular';

import { NavMock, NavParamsMock } from '../../../test-config/mocks/mocks';
import {PlatformMock} from '../../../test-config/mocks/platform.mock';

import { StorageMock } from '../../../test-config/mocks/storage.mock';
import { asyncData, asyncError } from '../../../test-config/mocks/async-observable-helpers';

import { Http, HttpModule} from '@angular/http';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file';

import { MyApp } from '../../app/app.component';
import { SettingsComponent } from "./settings.component";
import { SettingsService } from "./settings.service";

import { UrlService } from "../../common/util/url.service";
import { MessageService } from "../../common/util/message.service";
import { Logger } from "../../common/log/logger.service";

let comp: SettingsComponent;
let fixture: ComponentFixture<SettingsComponent>;
let de: DebugElement;
let el: HTMLElement;


// Change default timeout of jasmine. It would be helpful to test AJAX.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('Page: Settings Page', () => {

  let toastSpy,
    toastCtrlSpy,
    alertSpy,
    alertCtrlSpy,
    actionSheetSpy,
    actionSheetCtrlSpy,
    fileSpy,
    urlServiceSpy,
    messageServiceSpy,
    settingsServiceSpy,
    loggerSpy;

    beforeEach(async(() => {
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

      actionSheetSpy = jasmine.createSpyObj('ActionSheet', ['present']);
      actionSheetCtrlSpy = jasmine.createSpyObj('ActionSheetController', ['create']);
      actionSheetCtrlSpy.create.and.callFake(function () {
        return actionSheetSpy;
      });

      fileSpy = jasmine.createSpyObj('File', ['externalRootDirectory', 'listDir', 'createDir', 'writeFile']);

      urlServiceSpy = jasmine.createSpyObj('UrlService', 
                          ['getAppName', 'getAppKey', 'getPathSeparator', 'getStoreKey', 
                              'getCategoriesId', 'getCategoriesKey', 'getCategoriesTitleKey', 'getAccountabilityKey',
                              'getDeviceDataUrl', 'getAddBtnImageUrl', 'getCategoriesFileName']);

      messageServiceSpy = jasmine.createSpyObj('MessageService', ['displayToast', 'loadMessages', 'getMessages']);
      settingsServiceSpy = jasmine.createSpyObj('SettingsService', ['getData', 'importData', 'getBackupFileList']);
      loggerSpy = jasmine.createSpyObj('Logger', ['log', 'warn', 'error', 'info']);

      TestBed.configureTestingModule({

        declarations: [
          MyApp, SettingsComponent
        ],

        providers: [
          {
            provide: NavController,
            useClass: NavMock
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
            provide: ActionSheetController,
            useValue: actionSheetCtrlSpy
          },
          {
            provide: Storage,
            useFactory: () => StorageMock.instance()
          },
          {
            provide: File,
            useValue: fileSpy
          },
          {
            provide: Platform,
            useClass: PlatformMock
          },
          {
            provide: ToastController,
            useValue: toastCtrlSpy
          },
          {
            provide: UrlService,
            useValue: urlServiceSpy
          },
          {
            provide: MessageService,
            useValue: messageServiceSpy
          },
          {
            provide: SettingsService,
            useValue: settingsServiceSpy
          },
          {
            provide: Logger,
            useValue: loggerSpy
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

        fixture = TestBed.createComponent(SettingsComponent);
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

    it('#changeSettings should change settings', () => {
      comp.changeSettings('export');
      expect(urlServiceSpy.getAppName).toHaveBeenCalled();
      comp.changeSettings('import');
      expect(urlServiceSpy.getAppName).toHaveBeenCalled();
    });

    it('#displayToast() should display toast', async(() => {
      comp.displayToast('Export fail');
      expect(toastSpy.present).toHaveBeenCalled();
      comp.displayToast(null);
      expect(loggerSpy.error).toHaveBeenCalled();
    }));
}); 