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
       title: 'Friends and Relatives',
       price: 500  ,
       icon: 'people'
     },
     {
       title: 'Locked',
       price: 100  ,
       icon: 'lock'
     },
     {
       title: 'Liquid',
       price: 8000  ,
       icon: 'flask'
     }];    

     this.properties = [{
        name: 'category',
        title: 'Category'
     },
     {
        name: 'title',
        title: 'Title'
     },
     {
        name: 'price',
        title: 'Price'
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