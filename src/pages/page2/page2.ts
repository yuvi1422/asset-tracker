import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Modal } from '../../modules/modal/modal';
import { CategoryService } from '../../modules/category/category.service';


@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {

  selectedItem: any;
  items: Array<any>;

  title: string = 'Assets';
  riskLevels;
  STORE_ID: string = 'asset-tracker-store';
  ITEMS_ID: string = this.STORE_ID + 'items';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private storage: Storage,
    private categoryService: CategoryService) {

    var context = this;
    // If we navigated to this page, we will have an item available as a nav param
    context.selectedItem = navParams.get('item');

    storage.ready().then(() => {
      context.loadItems();
    });

  }

  /**
   * @description Function to load the list of items
   */
  loadItems() {
    var context = this;
    let items = [{
      categoryId: 'people',
      title: 'Friends and Relatives',
      icon: 'people',
      price: 0,
      subItems: [],
      type: 'categoryItem'
    }];

    if (typeof context.selectedItem === 'undefined') {  //  True: when there is no sub list

      context.deserialize(context.ITEMS_ID).then((store) => {
        if (store === null || typeof store === 'undefined') {  //  True: when no value is stored in storage

          context.categoryService.getCategories().subscribe(data => {

            context.items = data.categories;
            context.serialize(context.ITEMS_ID, JSON.stringify(context.items));
          });
        } else {
          context.items = JSON.parse(store);
        }
      });

    } else {
      context.items = context.selectedItem.subItems;
      context.title = context.selectedItem.title;
    }

    context.riskLevels = {
      Fixed: {
        title: 'Fixed',
        icon: 'lock',
        isActive: true
      },
      Variable: {
        title: 'Variable',
        icon: 'pulse',
        isActive: true
      },
      Drowning: {
        title: 'Drowning',
        icon: 'ios-warning',
        isActive: true
      },
      Drowned: {
        title: 'Drowned',
        icon: 'logo-freebsd-devil',
        isActive: true
      }
    };
  }

  /**
   * @description Function to compose new asset
   */
  compose() {
    let modal = this.modalCtrl.create(Modal);
    let context = this;

    /**
     * Modal Dismiss Callback
     */
    modal.onDidDismiss(data => {

      if (typeof data !== 'undefined') {
        for (let i = 0; i < context.items.length; i++) {
          if (context.items[i].categoryId === data.categoryId) {
            context.items[i].subItems.push(data);
            data.price = parseInt(data.price);
            context.items[i].price += data.price;            
            context.saveItems();
          }
        }
      }
    });
    modal.present();
  }


  /**
    * @description Function to load the list as per the item clicked.
    * @param event
    * @param item
    */
  loadList(event, clickedItem) {

    if (typeof this.selectedItem !== 'undefined' || clickedItem.subItems.length === 0) {
      return;
    }
    this.navCtrl.push(Page2, {
      item: clickedItem
    });
  }


  /**
    * @description Function to save current list 
    */
  saveItems() {
    this.serialize(this.ITEMS_ID, JSON.stringify(this.items));
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