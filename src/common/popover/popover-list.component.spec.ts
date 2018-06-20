import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';

import { NavMock, NavParamsMock } from '../../../test-config/mocks/mocks';

import { MyApp } from '../../app/app.component';
import { PopoverListComponent } from './popover-list.component';

import { SettingsComponent } from '../../pages/settings/settings.component';

let comp: PopoverListComponent;
let fixture: ComponentFixture <PopoverListComponent>;
let de: DebugElement;
let el: HTMLElement;

// Change default timeout of jasmine. It would be helpful to test AJAX.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('PopoverList Component', () => {

    beforeEach(async(() => {
      // Used spy to mock services.

      let viewCtrlSpy = jasmine.createSpyObj('ViewController', 
                              ['data', 'readReady', 'writeReady', 'dismiss', '_setHeader', '_setNavbar', '_setIONContent', '_setIONContentRef']);
      viewCtrlSpy.data.items = [];

      TestBed.configureTestingModule({

        declarations: [
          MyApp, PopoverListComponent
        ],

        providers: [
          {
            provide: ViewController,
            useValue: viewCtrlSpy
          },
          {
            provide: NavController,
            useClass: NavMock
          }
        ],

        imports: [
          IonicModule.forRoot(MyApp)
        ]

      }).compileComponents();
  }));

    beforeEach(() => {

        fixture = TestBed.createComponent(PopoverListComponent);
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

    it('#open() should open page', () => {

      comp.open(0);
    });
}); 