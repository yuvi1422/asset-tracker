import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, ToastController, AlertController, ActionSheetController, Platform} from 'ionic-angular';

import { NavMock, NavParamsMock, getStubPromise, getPromise, settingsMock } from '../../../test-config/mocks/mocks';
import { platformSpy } from '../../../test-config/spies/platform.spie';

import { storageSpy, toastCtrlSpy, alertCtrlSpy, actionSheetCtrlSpy,
             fileSpy, urlServiceSpy, messageServiceSpy,
             settingsServiceSpy, loggerSpy } 
                            from '../../../test-config/spies/other.spies';
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

  let expectedData = settingsMock;

    beforeEach(async(() => {

      storageSpy.get.and.callFake(function () {
        return getStubPromise();
      });

      settingsServiceSpy.getData.and.callFake(function () {
        return asyncData(expectedData);
      });

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
            useValue: storageSpy
          },
          {
            provide: File,
            useValue: fileSpy
          },
          {
            provide: Platform,
            useValue: platformSpy
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


    it('#loadData should load data', fakeAsync(() => {
      comp.title = null;
      comp.loadData();
      tick();
      expect(comp.title).toEqual(expectedData.title);
      
      comp.title = null;
      storageSpy.get.and.callFake(function () {
        return getPromise(JSON.stringify(expectedData));
      });
      comp.loadData();
      tick();
      fixture.detectChanges();
      expect(comp.title).toEqual(expectedData.title);
    }));


    it('#changeSettings should change settings', () => {
      comp.changeSettings('export');
      expect(urlServiceSpy.getAppName).toHaveBeenCalled();
      comp.changeSettings('import');
      expect(urlServiceSpy.getAppName).toHaveBeenCalled();
    });

    it('#displayToast() should display toast', async(() => {
      comp.displayToast('Export fail');
      expect(toastCtrlSpy.create).toHaveBeenCalled();
      comp.displayToast(null);
      expect(loggerSpy.error).toHaveBeenCalled();
    }));


      it('#writeToFile() should write to file', fakeAsync(() => {
        comp.writeToFile('rootPath', 'appDirectoryPath', 
                          'dirName', 'fileName', JSON.stringify(expectedData), 'options');        
        tick();
        fixture.detectChanges();
        expect(messageServiceSpy.getMessage.calls.mostRecent().args[1]).toEqual('exportSuccess');
      }));
}); 