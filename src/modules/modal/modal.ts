import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CategoryService } from '../category/category.service';

@Component({
  templateUrl: 'modal.html'
})
export class Modal {
  categories;
  properties;

  selectedCategory;
  safefyLevels;
  safetyTitle = 'Safety';

  STORE_ID: string = 'asset-tracker-store';
  CATEGORIES_ID: string = this.STORE_ID + 'categories';


  constructor(public params: NavParams,
    public viewCtrl: ViewController,
    private storage: Storage,
    private categoryService: CategoryService) {
    var context = this;
    // TODO: get these from JSON or web service 
    this.safefyLevels = ['Fixed', 'Variable', 'Drowning', 'Drowned']

    storage.ready().then(() => {
      context.categoryService.getCategories().subscribe(data => {
        context.categories = data.categories;
        context.selectedCategory = context.categories[0];
      });
    });

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

  /**
   * @description Function to save current category list 
   */
  saveCategories() {
    this.serialize(this.CATEGORIES_ID, JSON.stringify(this.categories));
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