import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { TransactionComponent } from '../transaction/transaction.component';

import { Logger } from "../../common/log/logger.service";
import { UtilService } from "../../common/util/util.service";

@Component({
  selector: 'page-home',
  templateUrl: 'transaction-list.component.html'
})
export class TransactionListComponent {

 /**
  * @description Data received from parent
  * @private 
  */
  private parentData: any = null;

  /**
  * @description Data received from parent
  * @public 
  */
  public items: Array<any>;

  /**
  * @description Data received from parent
  * @public 
  */
  public title: string;

/**
 * @description Sum of all the item's price
 * @public 
 */
  public totalAmount:number;

/**
  * @constructor 
  * @param {NavController} navCtrl - Navigation Controller
  * @param {NavParams} navParams - It is used to retrieve navigation parameters
  * @param {Logger} logger - Logger Service
  * @param {Utility} utilService - Utility Service
 */
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private logger: Logger,
    private utilService: UtilService) {

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
    context.items = context.utilService.sort(context.parentData.item.transactions, 'date', 'ascending');
    context.title = context.parentData.item.title;
    context.totalAmount = context.utilService.getTotal(context.items, 'price');
  }

  /**
  * @description Function to load the Transaction Detail Page
  * @param selectedItem {Object} Transaction Item clicked
  * @param transactionIndex {number} Index of Transaction Item clicked
  */
  loadTransactionPage(selectedItem, transactionIndex) {
    var context = this;
    context.navCtrl.push(TransactionComponent, {
      parentData: {
        title: 'Transaction',
        transaction: selectedItem,
        theme: this.parentData.theme,
        transactionIndex: transactionIndex,
        CATEGORIES_KEY: this.parentData.CATEGORIES_KEY,
        SEPARATOR: this.parentData.SEPARATOR
      }
    });
  }
}
