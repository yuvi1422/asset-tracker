import { Component } from '@angular/core';

import { NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Contacts } from '@ionic-native/contacts';

import { HomeComponent } from '../home/home.component';

import { LoggerService } from "../../common/log/logger.service";
import { TransactionService } from "./transaction.service";
import { UtilService } from "../../common/util/util.service";

@Component({
  selector: 'page-home',
  templateUrl: 'transaction.component.html'
})
export class TransactionComponent {


  /**
   * @description Data received from parent
   * @private 
   */
  public parentData: any = null;

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
   * @description Selected Category Index
   * @public 
   */
  public selectedCategoryIndex: number = 0;

  /**
   * @description Selected Accountability Index
   * @public 
   */
  public selectedAccountabilityIndex: number = 0;

  /**
   * @constructor 
   * @param navCtrl Navigation Controller
   * @param navParams It is used to retrieve navigation parameters
   * @param storage Storage Service provided by Ionic
   * @param contacts Contacts Service provided by Ionic
   * @param toastCtrl ToastController Service provided by Ionic-Angular
   * @param alertCtrl AlertController Service provided by Ionic-Angular
   * @param logger Logger Service
   * @param utilService Utility Service
   * @param transactionService Transaction Service
   */

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private contacts: Contacts,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private logger: LoggerService,
    private utilService: UtilService,
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

      if (context.parentData.isPristine === true) {                 // Add new transaction
        context.transaction = context.transactionService.getBean();
        context.transaction.category = context.categories[context.selectedCategoryIndex];  // Set first category as default
      } else {                                 // update/delete existing transaction
        context.transaction = JSON.parse(JSON.stringify(context.parentData.transaction));

        if(context.transaction.accountability.icon_uri) {
          context.transaction.accountability.icon = this.utilService.getSanitizedUrl(context.transaction.accountability.icon_uri);
        }

        context.selectedCategoryIndex = context.categories.findIndex((obj => obj.id == context.parentData.transaction.category.id));
        context.transaction.category = context.categories[context.selectedCategoryIndex];
      }
      context.loadAccountabilities();
    });
  }

   /**
   * @description Function to load accountabilities related to selected category
   */
  loadAccountabilities() {
    let context = this,
        storeURL = context.parentData.CATEGORIES_KEY + 
                     context.parentData.SEPARATOR + 
                     context.transaction.category.id;

    context.storage.get(storeURL).then((accountabilityData) => {

        accountabilityData = JSON.parse(accountabilityData);
        context.accountabilities = accountabilityData.accountabilities;
        if(context.parentData.isPristine !== true) {
          context.selectedAccountabilityIndex = context.accountabilities.findIndex((obj => obj.id == context.parentData.transaction.accountability.id));
        }
        //  TODO: Use code below once other category support is added.
        //  context.transaction.accountability = context.accountabilities[context.selectedAccountabilityIndex]; 
    });
 
  }

  /**
   * @description Function to save the Transaction
   */
  save() {

    let context = this;
    let accountability = context.transaction.accountability;
    let transaction = JSON.parse(JSON.stringify(context.transaction));    // Make a clone of transaction to avoid circular object
    transaction.price = parseInt(transaction.price);

    if (isNaN(transaction.price) || transaction.price === 0 || transaction.title.trim() === '') {
      context.displayToast('Please fill up all details');
      return;
    }
    //  When user do not select any accountability in case of 'people' category.
    if(transaction.category.id === 'people' && 
          transaction.accountability.title === context.transactionService.getBean().accountability.title) {
      context.displayToast('Please select a contact');
      return;
    }
    let storeURL = context.parentData.CATEGORIES_KEY +
      context.parentData.SEPARATOR +
      this.transaction.category.id;

    context.storage.get(storeURL).then((store) => {
      try {
        store = JSON.parse(store);

        if (store === null || typeof store === 'undefined' ||   //  True: when account does not exist in store 
          typeof store.accountabilities === 'undefined') {  //  True: when no value is stored in storage
          context.logger.error('FATAL ERROR: Error in retriving Accountability List.');
          return;
        }
        if (context.parentData.isPristine !== true) {  //  For update/delete tranasction --> Delete selected transaction first
          context.delete(store);
        }

        context.selectedAccountabilityIndex = store.accountabilities.findIndex((obj => obj.id == transaction.accountability.id));
        if (context.selectedAccountabilityIndex === -1) {
          store.accountabilities.push(accountability);
          context.selectedAccountabilityIndex = store.accountabilities.length - 1;
        }
        
        // Add Transaction
        store.accountabilities[context.selectedAccountabilityIndex].transactions.push(transaction);

        // Update Accountability Price
        store.accountabilities[context.selectedAccountabilityIndex].price += transaction.price;

        // Update Accountability Storage
        context.storage.set(storeURL, JSON.stringify(store));

        context.selectedCategoryIndex = context.categories.findIndex((obj => obj.id == transaction.category.id));

        // Update Category Price
        context.categories[context.selectedCategoryIndex].price += transaction.price;

        //  Update Category Storage
        context.storage.set(context.parentData.CATEGORIES_KEY, JSON.stringify(context.categories));

        context.navCtrl.setRoot(HomeComponent);
        context.displayToast('Transaction Saved Sucessfully');
      } catch (err) {
        context.displayToast('Error in Saving Transaction');
      }
    });
  }

  /**
   * @description Function to delete the Transaction
   * @param {any} store - Either a promise object or null.
   */
  delete(store) {
     let context = this;

     if(store !== null) {  // When store value is already retrieved. Ex. Clicking on Save Button.
       let previousAccountabilityIndex = store.accountabilities.findIndex((obj => obj.id == context.parentData.transaction.accountability.id));
       let previousCategoryIndex = context.categories.findIndex((obj => obj.id == context.parentData.transaction.category.id));
       store.accountabilities[previousAccountabilityIndex].transactions.splice(context.parentData.transactionIndex, 1);

      // Update Accountability Price
       store.accountabilities[previousAccountabilityIndex].price -= context.parentData.transaction.price;

      // Update Category Price
       context.categories[previousCategoryIndex].price -= context.parentData.transaction.price;
     } else { //  Clicking on Delete Button.

       let alert = this.alertCtrl.create({
         title: 'Confirm Delete',
         message: 'Are you sure you want to delete this transaction?',
         buttons: [
           {
             text: 'Cancel',
             role: 'cancel'
           },
           {
             text: 'Delete',
             handler: () => {
               let storeURL = context.parentData.CATEGORIES_KEY +
                 context.parentData.SEPARATOR +
                 context.parentData.transaction.category.id;

               context.storage.get(storeURL).then((store) => {

                 store = JSON.parse(store);


                 let previousAccountabilityIndex = store.accountabilities.findIndex((obj => obj.id == context.parentData.transaction.accountability.id));
                 let previousCategoryIndex = context.categories.findIndex((obj => obj.id == context.parentData.transaction.category.id));
                 store.accountabilities[previousAccountabilityIndex].transactions.splice(context.parentData.transactionIndex, 1);

                 // Update Accountability Price
                 store.accountabilities[previousAccountabilityIndex].price -= context.parentData.transaction.price;

                 // Update Category Price
                 context.categories[previousCategoryIndex].price -= context.parentData.transaction.price;

                 // Update Accountability Storage
                 context.storage.set(storeURL, JSON.stringify(store));

                 //  Update Category Storage
                 context.storage.set(context.parentData.CATEGORIES_KEY, JSON.stringify(context.categories));

                 context.navCtrl.setRoot(HomeComponent);
                 context.displayToast('Transaction Deleted Sucessfully');
               });
             }
           }
         ]
       });
       alert.present();
     }
  }

  /**
   * @description Function to show Ionic Toast
   * @param {string} message message to be displayed
   */
  displayToast(message) {
    let toast = this.toastCtrl.create({
    message: message,
    duration: 2500,
    position: 'bottom'
  });

  toast.present();
  }

  /**
   * @description Function to pick contact from contact list. This only works on devices.
   */
  pickContact() {

    this.contacts.pickContact().then((contact) => {

     this.transaction.accountability.id = contact.id;
     this.transaction.accountability.title = contact.displayName;
     this.transaction.accountability.icon_uri = contact.photos[0].value;
     this.transaction.accountability.icon = this.utilService.getSanitizedUrl(contact.photos[0].value);
    });
  }
}11