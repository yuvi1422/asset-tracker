import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { Contacts } from '@ionic-native/contacts';  

import { MyApp } from './app.component';

import { PopoverListComponent } from '../common/popover/popover-list.component';

import { HomeComponent} from '../pages/home/home.component';
import { AccountabilityComponent } from '../pages/accountability/accountability.component';
import { TransactionListComponent } from '../pages/transaction-list/transaction-list.component';
import { TransactionComponent } from '../pages/transaction/transaction.component';

import { SettingsComponent } from '../pages/settings/settings.component';

import { LoggerService } from "../common/log/logger.service";
import { UtilService } from "../common/util/util.service";

import { HomeService } from '../pages/home/home.service';
import { AccountabilityService } from '../pages/accountability/accountability.service';
import { TransactionService } from "../pages/transaction/transaction.service";

import { SettingsService } from "../pages/settings/settings.service";

@NgModule({
  declarations: [
    MyApp,
    PopoverListComponent,
    HomeComponent,
    AccountabilityComponent,
    TransactionListComponent,
    TransactionComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PopoverListComponent,
    HomeComponent,
    AccountabilityComponent,
    TransactionListComponent,
    TransactionComponent,
    SettingsComponent
  ],
  providers: [
  	     StatusBar,
         SplashScreen,
         Contacts,
  	     {provide: ErrorHandler, useClass: IonicErrorHandler},
             LoggerService, UtilService,
              HomeService, AccountabilityService, TransactionService, SettingsService]
})
export class AppModule {}
