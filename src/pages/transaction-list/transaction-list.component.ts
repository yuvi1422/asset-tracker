import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { TransactionComponent } from '../transaction/transaction.component';

import { LoggerService } from "../../common/log/logger.service";

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
   * @description Function to load data related to this component
   */  
  loadData() {
    var context = this;

    if (!context.parentData || !context.parentData.item.title || !context.parentData.item.transactions) {
      context.logger.error('TransactionListComponent --> Error in retrieving parent data');
      return;
    }
    context.items = context.parentData.item.transactions;
    context.title = context.parentData.item.title;
  }

/**
 * @description Function to load the Transaction Page
 */
  loadTransactionPage(selectedItem) {
    var context = this;
    context.navCtrl.push(TransactionComponent, {
      parentData: {
        title: 'From List Transaction Details',
        item: selectedItem,
        accountability: context.parentData.item
      }
    });
  }
}
