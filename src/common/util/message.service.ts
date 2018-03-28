import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { ToastController, AlertController, Platform} from 'ionic-angular';

import { Logger } from "../log/logger.service";

@Injectable()
export class MessageService {


  /**
   * @description data url
   * @private 
   */
  private DATA_URL:string = 'assets/data/messages.json';

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
   * @description messageContainer An object holding all messages
   * @private
   */
  private messageContainer:any;

  /**
   * @constructor
   * @param {Http} http - Http service of Angular
   * @param toastCtrl ToastController Service provided by Ionic-Angular
   * @param alertCtrl AlertController Service provided by Ionic-Angular
   * @param {Platform} platform - Platform service of ionic
   * @param logger Logger Service
   */
  constructor(private http: Http,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private logger: Logger) {
    if (this.platform.is('cordova') && this.platform.is('android')) {
      this.DEVICE_DATA_URL = this.ANDROID_DATA_URL;
    }
    this.loadMessages();
  }


 /**
   * @description Function to show Ionic Toast
   * @param {string} message message to be displayed
   */
  displayToast(message, duration, position) {
    let toast = this.toastCtrl.create({
    message: message,
    duration: duration,
    position: position
  });

  toast.present();
}


  /**
  * @description Function to load all messages ( Texts )
  * @return {Array} Promise with all messages
  */
  loadMessages() {
    var context = this;

     return context.http.get(context.DEVICE_DATA_URL + context.DATA_URL)
      .subscribe((res) => {
         context.messageContainer = res.json();
      });
  }

  /**
  * @description Function to get all messages from setting's component
  * @param {string} componentName Name of the component.
  * @return {object} All messages
  */
  getMessages(componentName: string) {
    return this.messageContainer[componentName];
  }

}