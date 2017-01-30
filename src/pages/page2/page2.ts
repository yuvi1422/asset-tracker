import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { Modal } from './../../modules/modal/modal';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  selectedItem: any;
  items: Array<any>;

  title:string = 'Assets';
  riskLevels;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {

   var self = this; 
    // If we navigated to this page, we will have an item available as a nav param
    self.selectedItem = navParams.get('item');

    if(typeof self.selectedItem === 'undefined') {  //  When there is no sub list
        self.items = self.getList();
    }else{ 
      self.items = self.selectedItem.subItems;
      self.title = self.selectedItem.title;
    }  
    

     self.riskLevels = {
      Fixed: {
        title: 'Fixed',
        icon: 'lock',
        isActive: true
      },
      Variable: {
        title: 'Variable',
        icon: 'pulse',
        isActive: false
     },
      Drowning: {
        title: 'Drowning',
        icon: 'ios-warning',
        isActive: false
      },
      Drowned: {
        title: 'Drowned',
        icon: 'logo-freebsd-devil',
        isActive: false
     }};      
  }

 

  /**
   * @description Function to get the list of items
   * TODO: Get it from JSON or Web service
   */
  getList() {
    let items =   [{
       categoryId: 'people',
       title: 'Friends and Relatives',       
       icon: 'people',
       price: 0,       
       subItems: [],
       type: 'categoryItem'
     },
     {
       categoryId: 'fd',
       title: 'FD',       
       icon: 'lock',
       price: 0,       
       subItems: [],
       type: 'categoryItem'
     },
     {
       categoryId: 'gold',
       title: 'Gold',       
       icon: 'flask',
       price: 0,       
       subItems: [],
       type: 'categoryItem'
     }];    

    

    return items;
  }

  /**
   * @description Function to compose new asset
   */
  compose() {
    let modal = this.modalCtrl.create(Modal);
    let self = this;
  
    /**
     * Modal Dismiss Callback
     */
    modal.onDidDismiss ( data => {

      if(typeof data !== 'undefined') {
        for(let i=0; i< self.items.length; i++ ) {
          if(self.items[i].categoryId === data.categoryId) {
            self.items[i].subItems.push(data);
            data.price = parseInt(data.price);
            self.items[i].price += data.price;
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

    if(typeof this.selectedItem !== 'undefined' || clickedItem.subItems.length === 0) {
      return;
    }
    this.navCtrl.push(Page2, {
      item: clickedItem
    });
  }
}