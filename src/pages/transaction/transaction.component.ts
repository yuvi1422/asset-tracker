import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

import { HomeComponent } from '../home/home.component';

import { LoggerService } from "../../common/log/logger.service";
import { TransactionService } from "./transaction.service";

@Component({
  selector: 'page-home',
  templateUrl: 'transaction.component.html'
})
export class TransactionComponent {

  /**
   * @description item list to be displayed
   * @private 
   */
  private SEPARATOR: string = '-';

  /**
    * @description ACCOUNTABILITY key. It is used to store and retrieve data from storage
    * @private 
    */
  private ACCOUNTABILITY_KEY: string = 'accountability';

  /**
   * @description Data received from parent
   * @private 
   */
  private parentData: any = null;

  /**
   * @description Categories key. It is used to store and retrieve data from storage
   * @private 
   */
  private CATEGORIES_KEY: string = 'asset-tracker-store-categories';

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
    private contacts: Contacts,
    private logger: LoggerService,
    private transactionService: TransactionService) {

    var context = this;
    
    let contact: Contact = this.contacts.create();
    contact.name = new ContactName(null, 'Smith', 'John');
    contact.phoneNumbers = [new ContactField('mobile', '6471234567')];
    contact.save().then(
      () => console.log('Contact saved!', contact),
      (error: any) => console.error('Error saving contact.', error)
    );

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

    if (!context.parentData || !context.parentData.title) {
      context.logger.error('TransactionComponent --> Error in retrieving parent data');
      return;
    }

    context.storage.get(context.CATEGORIES_KEY).then((storeData) => {
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

    });


  }

  /**
   * @description Function to save the Transaction
   */
  save() {
    var context = this;
    context.transaction.price = parseInt(context.transaction.price);

    if (this.isPristine) {
      // TODO: Remove hard coading of category Id accountability Id
      let categoryId = 'people', accountId = 'ganu';

      let storeURL = this.parentData.storeId + this.SEPARATOR + this.ACCOUNTABILITY_KEY + this.SEPARATOR + categoryId;
      //  this.transactionService.addTransaction(storeURL, this.transaction, accountId);

      context.storage.get(storeURL).then((store) => {
        if (store === null || typeof store === 'undefined') {  //  When account does not exist in store
          context.logger.log('No data');
        } else {  //  When account exists in store

          store = JSON.parse(store);
          if (typeof store.accountabilities === 'undefined') { //  When accountabilities array is not present
            context.logger.error('FATAL ERROR: Error in retriving Accountability List.');
            return;
          }
          store.accountabilities.forEach(function (account) {
            if (account.id === accountId) {
              account.transactions.push(context.transaction);
              context.storage.set(storeURL, JSON.stringify(store));
              context.navCtrl.setRoot(HomeComponent, {
                tranasction: context.transaction
              });
              alert('Transaction Saved');
              return;
            }
          });
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
