import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Platform } from 'ionic-angular';
import { UtilService } from "../util/util.service";

@Injectable()
export class CategoryService {

  /**
   * @description data url
   * @private 
   */
  private DATA_URL:string = 'assets/data/data.json';

  /**
   * @description android data url
   * @private 
   */
  private ANDROID_DATA_URL:string = '/android_asset/www/';

   /**
   * @description device data url
   * @private 
   */
  private DEVICE_DATA_URL:string = '';

   /**
   * @description Categories
   * @private 
   */
  private categories:any;


 /**
  * @constructor 
  * @param {Http} http - Http service of Angular
  * @param {Platform} platform - Platform service of ionic
  * @param {UtilService} utilService - Utility Service
  */
  constructor(private http: Http, private platform: Platform, private utilService: UtilService) {

    if(this.platform.is('cordova') && this.platform.is('android')) {
      this.DEVICE_DATA_URL = this.ANDROID_DATA_URL;
    }
  }

  /**
  * @description Function to get all categories.
  * @return Category Object
  */
  getCategories() {
    return this.categories;
  }

  /**
  * @description Function to set categories.
  */
  setCategories(categories) {
    this.categories = categories;
  }

  /**
  * @description Function to get category by id.
  * @param {string} categoryId - Id of Category.
  * @return Category Array
  */
  getCategoryById(categoryId) {
    if(!this.categories) {
      return null;
    }
    return this.utilService.getObjFromArray(this.categories, 'id', categoryId);
  }

  /**
  * @description Function to load all categories from Config
  * @return {Array} Promise with all categories
  */
  getCategoriesFromConfig() {
    
    var context = this;

    return context.http.get(context.DEVICE_DATA_URL + context.DATA_URL)
      .map((res) => {
        return res.json().categories;
      });

  }
}