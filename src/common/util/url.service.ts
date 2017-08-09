import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Platform } from 'ionic-angular';

import { Logger } from "../log/logger.service";

@Injectable()
export class UrlService {

  /**
   * @description App Name
   * @private
   */
   private APP_NAME: string = 'Asset Tracker';

  /**
   * @description App Key
   * @private
   */
   private APP_KEY: string = 'asset-tracker';

  /**
   * @description Seperator
   * @private
   */
   private SEPARATOR: string = '-';

  /**
   * @description Path Seperator
   * @private
   */
   private PATH_SEPARATOR: string = '/';

   /**
   * @description Storage key. It is used to store and retrieve data from storage
   * @private 
   */
   private STORE_KEY: string = this.APP_KEY + this.SEPARATOR + 'store';


  /**
   * @description Categories Id. It is used to create Category key. 
   *              It is also used to store and retrieve data from backup files.
   * @private
   */
   private CATEGORIES_ID: string = 'categories';

   /**
   * @description Categories key. It is used to store and retrieve data from storage
   * @private
   */
   private CATEGORIES_KEY: string = this.STORE_KEY + this.SEPARATOR + this.CATEGORIES_ID;


   /**
   * @description key of title of category page. It is used to store and retrieve data from storage
   * @private
   */
   private CATEGORIES_TITLE_KEY: string = this.STORE_KEY + this.SEPARATOR  + 'title';

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
   * @description Add Btn Image Url.
   * @private 
   */
  private ADD_BTN_IMAGE_URL:string = 'assets/images/add_btn_message.jpg';

   /**
   * @description Name of the CATEGORIES file ( Excluding extension).
   * @private 
   */
  private CATEGORIES_FILE_NAME:string = 'home';

  /**
   * @constructor
   * @param logger Logger Service
   * @param {Platform} platform - Platform service of ionic
   */
  constructor(private logger: Logger,
              private platform: Platform ) {
    if (this.platform.is('cordova') && this.platform.is('android')) {
      this.DEVICE_DATA_URL = this.ANDROID_DATA_URL;
    }
    this.ADD_BTN_IMAGE_URL = this.DEVICE_DATA_URL + this.ADD_BTN_IMAGE_URL;
  }


  /**
  * @description Function to get App Name.
  * @returns {string} App Name
  */
  getAppName () {
    return this.APP_NAME;
  }

  /**
  * @description Function to get App key.
  * @returns {string} App Key
  */
  getAppKey () {
    return this.APP_KEY;
  }

  /**
   * @description Function to get path separator.
   * @returns {string} path separator
   */
  getPathSeparator () {
    return this.PATH_SEPARATOR;
  }

  /**
   * @description Function to get store key.
   * @returns {string} Store Key
   */
  getStoreKey () {
    return this.STORE_KEY;
  }


  /**
   * @description Function to get Categories Id.
   * @returns {string} Categories Id
   */
  getCategoriesId () {
    return this.CATEGORIES_ID;
  }

  /**
   * @description Function to get Categories key.
   * @returns {string} Categories Key
   */
  getCategoriesKey () {
    return this.CATEGORIES_KEY;
  }

  /**
   * @description Function to get Categories Title key.
   * @returns {string} Categories Title Key
   */
  getCategoriesTitleKey () {
    return this.CATEGORIES_TITLE_KEY;
  }

  /**
   * @description Function to get Accountability key.
   * @param {string} categoryId - Category Id of Accountability.
   * @returns {string} Accountability key
   */
  getAccountabilityKey (categoryId) {
    return this.CATEGORIES_KEY + this.SEPARATOR + categoryId;
  }

  /**
   * @description Function to get device data url.
   * @returns {string} Device data url
   */
  getDeviceDataUrl() {
    return this.DEVICE_DATA_URL;
  }

   /**
   * @description Function to Add Btn Image Url.
   * @returns {string} Add Btn Image Url.
   */
  getAddBtnImageUrl() {
    return this.ADD_BTN_IMAGE_URL;
  }

     /**
   * @description Function to get name of the CATEGORIES file ( Excluding extension).
   * @returns {string} Name of the CATEGORIES file ( Excluding extension)
   */
  getCategoriesFileName() {
    return this.CATEGORIES_FILE_NAME;
  }
}