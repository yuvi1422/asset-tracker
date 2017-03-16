import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { TransactionListComponent } from '../transaction-list/transaction-list.component';

import { LoggerService } from "../../common/log/logger.service";
import { AccountabilityService } from './accountability.service';

@Component({
  selector: 'page-home',
  templateUrl: 'accountability.component.html'
})
export class AccountabilityComponent {

  private parentData: any = null;
  private items: Array<any>;
  private title:string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private logger: LoggerService,
    private accountabilityService: AccountabilityService) {

      this.parentData = navParams.get('parentData');
      this.loadData();
  }

  /**
   * @description Function to load the list of items and other data related to this component
   */
  loadData() {
    var context = this;
    
    if(!context.parentData || !context.parentData.item ) {
      context.logger.error('AccountabilityComponent --> Error in retrieving parent data');
      return;
    }
     context.accountabilityService.getData(context.parentData.item.id).subscribe(data => {
        context.items = data.categories;
        context.title = data.title;
     });
    }

  /**
   * @description Function to load the Transaction List Page
   * @param item {Accountability Object} Selected object from Accountability List
   */
  loadTransactionListPage(selectedItem) {
    this.navCtrl.push(TransactionListComponent, {
       parentData: {
        item: selectedItem
      }
    });
  }
}
