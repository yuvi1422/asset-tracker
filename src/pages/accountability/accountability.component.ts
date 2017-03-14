import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { TransactionListComponent } from '../transaction-list/transaction-list.component';

@Component({
  selector: 'page-home',
  templateUrl: 'accountability.component.html'
})
export class AccountabilityComponent {

  private parentData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.parentData = navParams.get('item').prop1;
  }

  /**
   * @description Function to load the Transaction List Page
   */
  loadTransactionListPage() {
    this.navCtrl.push(TransactionListComponent, {
      item: {
          prop1: 'AccountabilityComponent Data'
        }
    });
  }

}
