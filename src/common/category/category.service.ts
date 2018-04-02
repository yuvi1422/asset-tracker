import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Platform } from 'ionic-angular';

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
  * @constructor 
  * @param {Http} http - Http service of Angular
  * @param {Platform} platform - Platform service of ionic
  */
  constructor(private http: Http, private platform: Platform ) {

    if(this.platform.is('cordova') && this.platform.is('android')) {
      this.DEVICE_DATA_URL = this.ANDROID_DATA_URL;
    }
  }

  /**
  * @description Function to load all categories
  * @return {Array} Promise with all categories
  */
  getCategories() {
    
    var context = this;

    return context.http.get(context.DEVICE_DATA_URL + context.DATA_URL)
      .map((res) => {
        return res.json().categories;
      });

  }
}