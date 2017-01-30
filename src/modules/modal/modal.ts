import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'modal.html'
})
export class Modal {
  categories;
  properties;

  selectedCategory;
  safefyLevels;
  safetyTitle = 'Safety';

  constructor( public params: NavParams, public viewCtrl: ViewController ) {

   // TODO: get these from JSON or web service 
    this.safefyLevels = ['Fixed', 'Variable', 'Drowning', 'Drowned']

  // TODO: get these from JSON or web service
    this.categories = [{
       categoryId: 'people',
       categoryTitle: 'Friends and Relatives',       
       title: '',       
       icon: 'people',
       price: 0,
       safefyLevel: this.safefyLevels[0],
       type: 'categorySubItem'
     },
     {
       categoryId: 'fd',
       categoryTitle: 'FD',       
       title: '',       
       icon: 'lock',
       price: 0,
       safefyLevel: this.safefyLevels[0],
       type: 'categorySubItem'
     },
     {
       categoryId: 'gold',
       categoryTitle: 'Gold',       
       title: '',       
       icon: 'flask',
       price: 0,
       safefyLevel: this.safefyLevels[0],
       type: 'categorySubItem'
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