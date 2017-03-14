import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { HomeComponent } from '../pages/home/home.component';
import { AccountabilityComponent } from '../pages/accountability/accountability.component';
import { TransactionListComponent } from '../pages/transaction-list/transaction-list.component';
import { TransactionComponent } from '../pages/transaction/transaction.component';

@NgModule({
  declarations: [
    MyApp,
    HomeComponent,
    AccountabilityComponent,
    TransactionListComponent,
    TransactionComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomeComponent,
    AccountabilityComponent,
    TransactionListComponent,
    TransactionComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
