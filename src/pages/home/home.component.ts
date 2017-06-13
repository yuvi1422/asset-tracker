import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AccountabilityComponent } from '../accountability/accountability.component';
import { TransactionComponent } from '../transaction/transaction.component';

import { HomeService } from './home.service';
import { LoggerService } from "../../common/log/logger.service";
import { UtilService } from "../../common/util/util.service";
import { AccountabilityService } from './../accountability/accountability.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent {

  
  /**
   * @description item list to be displayed
   * @private
   */
   private SEPARATOR: string = '-';

  /**
   * @description item list to be displayed
   * @public
   */
   public items: Array<any>;

   /**
   * @description Title of component
   * @public
   */
    public title:string;

   /**
   * @description Sum of all the item's price
   * @public
   */
   public totalAmount:number;

   /**
   * @description Storage key. It is used to store and retrieve data from storage
   * @private 
   */
   private STORE_KEY: string = 'asset-tracker-store';

   /**
   * @description Categories key. It is used to store and retrieve data from storage
   * @private
   */
   private CATEGORIES_KEY: string = this.STORE_KEY + this.SEPARATOR + 'categories';

   /**
   * @description Title key. It is used to store and retrieve data from storage
   * @private
   */
   private TITLE_KEY: string = this.STORE_KEY + this.SEPARATOR  + 'title';


 /**
  * @constructor
  * @param navCtrl Navigation Controller
  * @param storage Storage Service provided by Ionic
  * @param logger Logger Service
  * @param utilService Utility Service
  * @param homeService Home Page Service
  * @param accountabilityService Accountability Page Service
  */
  constructor(public navCtrl: NavController,
    private storage: Storage,
    private logger: LoggerService,
    private utilService: UtilService,
    private homeService: HomeService,
    private accountabilityService: AccountabilityService) {

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

      context.storage.get(context.CATEGORIES_KEY).then((store) => {
        if (store === null || typeof store === 'undefined') {  //  True: when no value is stored in storage

          context.homeService.getData().subscribe(data => {
          context.items = data.categories;
          context.title = data.title;
          context.totalAmount = context.utilService.getTotal(context.items, 'price');
          context.storage.set(context.CATEGORIES_KEY, JSON.stringify(context.items));
          context.storage.set(context.TITLE_KEY, JSON.stringify(context.title));
          

           data.categories.forEach(function(account) {
            context.accountabilityService.getData(account.id).subscribe(data => {
              context.storage.set(context.CATEGORIES_KEY + context.SEPARATOR + account.id, JSON.stringify(data));
            }, error => {
              context.storage.set(context.CATEGORIES_KEY + context.SEPARATOR + account.id, {});
              context.logger.error(account.id + ' is invalid: ' + error);
            });
           });

          });
        } else {
          context.items = JSON.parse(store);
          context.totalAmount = context.utilService.getTotal(context.items, 'price');
          context.storage.get(context.TITLE_KEY).then((title) => {
            context.title = JSON.parse(title);
          });
        }
      });
    }

  /**
   * @description Function to load the Accountibilty Page
   * @param selectedItem {Object} category Item clicked
   */  
  loadAccountibiltyPage(selectedItem) {
    this.navCtrl.push(AccountabilityComponent, {
      parentData: {
        item: selectedItem,
        CATEGORIES_KEY: this.CATEGORIES_KEY,
        SEPARATOR: this.SEPARATOR,
        categoryId: selectedItem.id
      }
    });
  }

/**
 * @description Function to load the Transaction Details Page
 */
  loadTransactionPage() {
    this.navCtrl.push(TransactionComponent, {
      parentData: {
        title: 'Transaction',
        isPristine: true,
        CATEGORIES_KEY: this.CATEGORIES_KEY,
        SEPARATOR: this.SEPARATOR
      }
    });
  }
}