import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { HomeComponent } from '../home/home.component';

import { LoggerService } from "../../common/log/logger.service";
import { TransactionService } from "./transaction.service";

@Component({
  selector: 'page-home',
  templateUrl: 'transaction.component.html'
})
export class TransactionComponent {


  /**
   * @description Data received from parent
   * @private 
   */
  private parentData: any = null;

  /**
   * @description Title of component
   * @public 
   */
  public title: string = 'Transaction Details';

  /**
   * @description Transaction object
   * @public 
   */
  public transaction: any;

  /**
   * @description list of categories
   * @public 
   */
  public categories: any[];

  /**
   * @description list of accountabilities
   * @public 
   */
  public accountabilities: any[];

  /**
   * @description flag showing status of tranasction. true if transaction is new. i.e. true when -- > it is not update/delete tranasction
   * @public 
   */   
  public isPristine: boolean;

  /**
   * @constructor 
   * @param navCtrl Navigation Controller
   * @param navParams It is used to retrieve navigation parameters
   * @param storage Storage Service provided by Ionic
   * @param logger Logger Service
   */

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private logger: LoggerService,
    private transactionService: TransactionService) {

    var context = this;

    context.parentData = navParams.get('parentData');
    storage.ready().then(() => {
      context.loadData();
    });
  }

  /**
   * @description Function to load data related to this component
   */
  loadData() {

    var context = this;

    if(!context.parentData ||
      !context.parentData.title ||
      !context.parentData.CATEGORIES_KEY ||
      !context.parentData.SEPARATOR) {
        context.logger.error('TransactionComponent --> Error in retrieving parent data');
        return;
    }

    context.storage.get(context.parentData.CATEGORIES_KEY).then((storeData) => {
      if (storeData === null || typeof storeData === 'undefined') {  //  True: when no value is stored in storage
        context.logger.error('TransactionComponent --> Error in retrieving storage data');
        return;
      } else {
        context.categories = JSON.parse(storeData);
      }

      context.isPristine = (!context.parentData.item) ? true : false;

      if (context.isPristine) {                 // Add new transaction
        context.transaction = context.getBean();
        context.transaction.category = context.categories[0];  // Set first category as default
      } else {                                 // update/delete existing transaction
        context.transaction = context.parentData.item;
      }
      context.title = context.parentData.title;
      context.loadAccountabilities();
    });

  }

   /**
   * @description Function to load accountabilities related to selected category
   */
  loadAccountabilities() {
    this.storage.get(this.parentData.CATEGORIES_KEY + 
                     this.parentData.SEPARATOR + 
                     this.transaction.category.id).then((accountabilityData) => {

        this.accountabilities = JSON.parse(accountabilityData).accountabilities;
        this.transaction.accountability = this.accountabilities[0];
    });
 
  }

  /**
   * @description Function to save the Transaction
   */
  save() {
    var context = this;
    context.transaction.price = parseInt(context.transaction.price);

    if (context.isPristine) {
        let storeURL = context.parentData.CATEGORIES_KEY +
                     context.parentData.SEPARATOR +
                     this.transaction.category.id;

      context.storage.get(storeURL).then((store) => {

        store = JSON.parse(store);

        if (store === null || typeof store === 'undefined' ||   //  True: when account does not exist in store 
                            typeof store.accountabilities === 'undefined') {  //  True: when no value is stored in storage
          context.logger.error('FATAL ERROR: Error in retriving Accountability List.');
          return;
        } else {

              let selectedAccountabilityIndex = store.accountabilities.findIndex((obj => obj.id == context.transaction.accountability.id));
              store.accountabilities[selectedAccountabilityIndex].transactions.push(context.transaction);  // Add Transaction
              store.accountabilities[selectedAccountabilityIndex].price += context.transaction.price;      // Update Accountability Price
              context.storage.set(storeURL, JSON.stringify(store));                                        // Update Accountability Storage

              let selectedCategoryIndex = context.categories.findIndex((obj => obj.id == context.transaction.category.id));
              context.categories[selectedCategoryIndex].price += context.transaction.price;  // Update Category Price
              context.storage.set(context.parentData.CATEGORIES_KEY, JSON.stringify(context.categories)); //  Update Category Storage

              context.navCtrl.setRoot(HomeComponent, {
                tranasction: context.transaction
              });
              alert('Transaction Saved');
        }
      });
    }
  }

  /**
   * @description Function to get the Transaction bean
   * @returns {object} transaction object
   */
  getBean() {
    return {
      titlePlaceholder: 'Note',
      pricePlaceholder: 0,

      id: '',
      title: '',
      icon: 'assets/avatar/person.ico',   // TODO: Once App is working start to end, Provide facility to change icon per transaction.
      price: '',
      isActive: true,

      date: new Date(),
      category: null,
      accountability: {
        icon: 'assets/avatar/person.ico',
        title: 'Default Account'
      }
    }
  }

}
