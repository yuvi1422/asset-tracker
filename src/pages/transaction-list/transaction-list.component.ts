import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { TransactionComponent } from '../transaction/transaction.component';

@Component({
  selector: 'page-home',
  templateUrl: 'transaction-list.component.html'
})
export class TransactionListComponent {

  private parentData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.parentData = navParams.get('item').prop1;
  }

/**
   * @description Function to load the Transaction Page
   */
  loadTransactionPage() {
    this.navCtrl.push(TransactionComponent, {
      item: {
          prop1: 'TransactionListComponent Data'
        }
    });
  }
}
