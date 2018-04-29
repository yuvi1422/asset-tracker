import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, PopoverController} from 'ionic-angular';
import { NavMock, StorageMock} from '../../mocks';
import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from '../../app/app.component';
import { HomeComponent } from './home.component';

import { Storage } from '@ionic/storage';

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

describe('Page: Home Page', () => {

    beforeEach(async(() => {
      // Used spy to mock services.
      let loggerSpy = jasmine.createSpyObj('Logger', ['error']),
          utilServiceSpy = jasmine.createSpyObj('UtilService', ['getTheme', 'getTotal', 'sort']),
          urlServiceSpy = jasmine.createSpyObj('UrlService', ['getAddBtnImageUrl', 'getAppName']),
          categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['setCategories']),
          homeServiceSpy = jasmine.createSpyObj('HomeService', ['getData']),
          accountabilityServiceSpy = jasmine.createSpyObj('AccountabilityService', ['getData']);

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
                    useClass: StorageMock
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
                IonicModule.forRoot(MyApp)
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

    it('initialises page properties', () => {
        expect(comp['SEPARATOR']).toEqual('-');
        expect(comp['STORE_KEY']).toEqual('asset-tracker-store');
        expect(comp['theme']).toEqual({
                                name:  'primary',
                                color: 'primary'
                            });
    });

/*    it('can set the title to a supplied value', () => {
        de = fixture.debugElement.query(By.css('ion-title'));
        el = de.nativeElement; 
        comp.changeTitle('Your Page');
        fixture.detectChanges();
        expect(comp['title']).toEqual('Your Page');
        expect(el.textContent).toContain('Your Page');
    });*/

}); 