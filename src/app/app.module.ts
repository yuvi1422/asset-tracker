import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { HomeComponent } from '../pages/home/home.component';
import { AccountabilityComponent } from '../pages/accountability/accountability.component';
import { TransactionListComponent } from '../pages/transaction-list/transaction-list.component';
import { TransactionComponent } from '../pages/transaction/transaction.component';

import { LoggerService } from "../common/log/logger.service";
import { HomeService } from '../pages/home/home.service';
import { AccountabilityService } from '../pages/accountability/accountability.service';

@NgModule({
  declarations: [
    MyApp,
    HomeComponent,
    AccountabilityComponent,
    TransactionListComponent,
    TransactionComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomeComponent,
    AccountabilityComponent,
    TransactionListComponent,
    TransactionComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
             LoggerService, HomeService, AccountabilityService]
})
export class AppModule {}
