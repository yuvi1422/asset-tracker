import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { TransactionComponent } from '../transaction/transaction.component';

import { LoggerService } from "../../common/log/logger.service";
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
  * @param navCtrl Navigation Controller
  * @param navParams It is used to retrieve navigation parameters
  * @param utilService Utility Service
  * @param logger Logger Service
 */
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private utilService: UtilService,
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
    context.totalAmount = context.utilService.getTotal(context.items, 'price', 'isActive');
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
        transactionIndex: transactionIndex,
        CATEGORIES_KEY: this.parentData.CATEGORIES_KEY,
        SEPARATOR: this.parentData.SEPARATOR
      }
    });
  }
}
