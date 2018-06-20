import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Platform } from 'ionic-angular';

@Injectable()
export class HomeService {

  /**
   * @description data url
   * @private 
   */
  private DATA_URL:string = 'assets/data/home.json';

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

    var context = this;
    if(context.platform.is('cordova') && context.platform.is('android')) {
      context.DEVICE_DATA_URL = context.ANDROID_DATA_URL;
    }
  }

  /**
  * @description Function to load all data
  * @return {Array} Promise with all data
  */
  getData() {
    
    var context = this;

    return context.http.get(context.DEVICE_DATA_URL + context.DATA_URL)
      .map((res) => {
        return res.json ? res.json(): res;
      });
  }
}