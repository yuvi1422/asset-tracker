import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AccountabilityComponent } from '../accountability/accountability.component';
import { TransactionComponent } from '../transaction/transaction.component';

import { HomeService } from './home.service';
import { LoggerService } from "../../common/log/logger.service";
import { UtilService } from "../../common/util/util.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent {

  private items: Array<any>;
  private title:string;
  private totalAmount:number;
  private STORE_KEY: string = 'asset-tracker-store';
  private CATEGORIES_KEY: string = this.STORE_KEY + '-categories';
  private TITLE_KEY: string = this.STORE_KEY + '-title';

  constructor(public navCtrl: NavController,
    private storage: Storage,
    private logger: LoggerService,
    private utilService: UtilService,
    private homeService: HomeService) {

    var context = this;
    storage.ready().then(() => {
      context.loadData();
    });
  }

  /**
   * @description Function to load the list of items and other data related to this component
   */
  loadData() {
    var context = this;

      context.deserialize(context.CATEGORIES_KEY).then((store) => {
        if (store === null || typeof store === 'undefined') {  //  True: when no value is stored in storage

          context.homeService.getData().subscribe(data => {
          context.items = data.categories;
          context.title = data.title;
          context.totalAmount = context.utilService.getTotal(context.items, 'price', 'isActive');
          context.serialize(context.CATEGORIES_KEY, JSON.stringify(context.items));
          context.serialize(context.TITLE_KEY, JSON.stringify(context.title));
          });
        } else {
          context.items = JSON.parse(store);
          context.totalAmount = context.utilService.getTotal(context.items, 'price', 'isActive');
          context.deserialize(context.TITLE_KEY).then((title) => {
            context.title = JSON.parse(title);
          });
        }
      });
    }


/**
 * @description Function to load the Accountibilty Page
 */
  loadAccountibiltyPage(selectedItem) {
    this.navCtrl.push(AccountabilityComponent, {
      parentData: {
        item: selectedItem
      }
    });
  }

/**
 * @description Function to load the Transaction Details Page
 */
  loadTransactionPage() {
    this.navCtrl.push(TransactionComponent, {
      parentData: {
        title: 'Transaction Details'
      }
    });
  }

  /**
   * @description Function to serialize the passed value with corresnds to key specified.
   * @param {string} key 
   * @param {string} value
   */
  serialize(key: string, value: string) {
    this.storage.set(key, value);
  }

  /**
   * @description Function to deserialize the passed value with corresnds to key specified.
   * @param {string} key 
   * @returns Promise that resolves with the value
   */
  deserialize(key: string) {
    return this.storage.get(key);
  }

}