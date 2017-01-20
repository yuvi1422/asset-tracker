import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'modal.html'
})
export class Modal {
  categories;
  properties;

  selectedCategory;
  constructor( public params: NavParams, public viewCtrl: ViewController ) {


    this.categories = [{
       categoryId: 'people',
       categoryTitle: 'Friends and Relatives',       
       title: '',       
       icon: 'people',
       price: 0       
     },
     {
       categoryId: 'fd',
       categoryTitle: 'FD',       
       title: '',       
       icon: 'lock',
       price: 0
     },
     {
       categoryId: 'gold',
       categoryTitle: 'Gold',       
       title: '',       
       icon: 'flask',
       price: 0
     }];    
    
     this.selectedCategory = this.categories[0];

  }


/**
 * @description Function to add item
 */
  add() {
     this.viewCtrl.dismiss(this.selectedCategory);
  }


/**
 * @description Function to dismiss the modal
 */
  dismiss() {
    this.viewCtrl.dismiss();
  }

/**
 * @description Function to log the current values 
 */
  log() {
    console.log('selectedCategory: ', JSON.stringify(this.selectedCategory));
  }
}