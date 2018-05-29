import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Platform } from 'ionic-angular';

@Injectable()
export class SettingsService {

  /**
   * @description data url
   * @private 
   */
  private DATA_URL:string = 'assets/data/settings.json';

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

    return this.http.get(this.DEVICE_DATA_URL + this.DATA_URL)
      .map((res) => {
        return res.json ? res.json(): res;
      });

  }

  /**
  * @description Function to import data
  * @return {Array} Promise with all data
  */
  importData() {

    var context = this,
        importDataUrl = 'assets/data/1498491909.json';
    
    return context.http.get(context.DEVICE_DATA_URL + importDataUrl)
      .map((res) => {
        return res.json ? res.json(): res;
      });
  }

  /**
  * @description Function to get backup file list
  * @return {Array} Promise with all data
  */
  getBackupFileList() {

  }
}