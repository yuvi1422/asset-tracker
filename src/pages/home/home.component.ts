import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AccountabilityComponent } from '../accountability/accountability.component';
import { TransactionComponent } from '../transaction/transaction.component';

import { HomeService } from './home.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent {

  items: Array<any>;
  STORE_ID: string = 'asset-tracker-store';
  ITEMS_ID: string = this.STORE_ID + 'items';

  constructor(public navCtrl: NavController,
    private storage: Storage,
    private homeService: HomeService) {
    var context = this;
    storage.ready().then(() => {
      context.loadItems();
    });
  }

  /**
   * @description Function to load the Accountibilty Page
   */
  loadAccountibiltyPage() {
    this.navCtrl.push(AccountabilityComponent, {
      item: {
        prop1: 'HomeComponent Data'
      }
    });
  }

  /**
     * @description Function to load the Transaction Details Page
     */
  loadTransactionPage() {
    this.navCtrl.push(TransactionComponent);
  }


/**
   * @description Function to load the list of items
   */
  loadItems() {
    var context = this;

      context.deserialize(context.ITEMS_ID).then((store) => {
        if (store === null || typeof store === 'undefined') {  //  True: when no value is stored in storage
          
          context.homeService.getCategories().subscribe(data => {
          context.items = data.categories;

          context.serialize(context.ITEMS_ID, JSON.stringify(context.items));
          });
        } else {
          context.items = JSON.parse(store);
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
   * 
   */
  deserialize(key: string) {
    return this.storage.get(key);
  }

}
