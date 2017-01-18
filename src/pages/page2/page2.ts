import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { Modal } from './../../modules/modal/modal';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, price: number, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['people', 'lock', 'pulse', 'sad'];    // TODO: Delete it after adding proper logic

    this.items = this.getList();

  }

  /**
   * @desc Function to load the list as per the item clicked.
   * @param event
   * @param item
   */
  loadList(event, item) {

    if(typeof this.selectedItem !== 'undefined') {
      return;
    }
    this.navCtrl.push(Page2, {
      item: item
    });
  }


  /**
   * @desc Function to get the list of items
   */
  getList() {
    let items = [];
    /*for (let i = 0; i < 5; i++) {
      items.push({
        title: 'Item ' + i,
        price: 500 * i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]  // TODO: Delete it after adding proper logic
      });
    }*/
    return items;
  }

  /**
   * @desc Function to compose new asset
   */
  compose() {
    let modal = this.modalCtrl.create(Modal);
    let self = this;
    modal.onDidDismiss ( data => {
      if(typeof data !== 'undefined') {
        self.addItem(data);
      }      
    });
    modal.present();
  }


  /**
 * @description Function to log the current values 
 */
  addItem(item) {
    this.items.push(item);   
  }
}





