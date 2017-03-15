import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { LoggerService } from "../../common/log/logger.service";

import { TransactionComponent } from '../transaction/transaction.component';

@Component({
  selector: 'page-home',
  templateUrl: 'transaction-list.component.html'
})
export class TransactionListComponent {

  private parentData: any = null;
  private items: Array<any>;
  private title: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private logger: LoggerService) {

    this.parentData = navParams.get('parentData');
    this.loadData();
  }

  /**
   * @description Function to load the list of items and other data related to this component
   */  
  loadData() {
    var context = this;

    if (!context.parentData || !context.parentData.title || !context.parentData.transactions) {
      context.logger.error('Error in retriving parent data from Accountability Page');
      return;
    }
    context.items = context.parentData.transactions;
    context.title = context.parentData.title;
  }

/**
 * @description Function to load the Transaction Page
 */
  loadTransactionPage(item) {
    this.navCtrl.push(TransactionComponent, {
      parentData: item
    });
  }
}
