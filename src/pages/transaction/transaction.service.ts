import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { Platform } from 'ionic-angular';

import { Logger } from "../../common/log/logger.service";

@Injectable()
export class TransactionService {


  /**
  * @constructor 
  * @param {Http} http - Http service of Angular
  * @param {Platform} platform - Platform service of ionic
  * @param {Storage} storage - Storage Service provided by Ionic
  * @param {Logger} logger - Logger Service
  */
  constructor(private http: Http, private platform: Platform, 
                private storage: Storage, 
                private logger: Logger) { 
    
  }

 /**
   * @description Function to get the Transaction bean
   * @returns {object} transaction object
   */
  getBean() {
    return {
      titlePlaceholder: 'Note',
      pricePlaceholder: 0,

      id: '',
      title: '',
      icon: 'assets/avatar/people/person.ico',   // TODO: Once App is working start to end, Provide facility to change icon per transaction.
      price: '',
      isActive: true,

      date: new Date(),
      category: null,
      accountability: {
        icon: 'assets/avatar/people/person.ico',
        title: 'Select Contact',
        price: 0,
        transactions: []
      }
    }
  }
}