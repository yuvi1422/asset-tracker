import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class TransactionService {


  /**
  * @constructor 
  */
  constructor() {
  }

 /**
   * @description Function to get the Transaction bean
   * @returns {object} transaction object
   */
  getBean() {
    return {
      titlePlaceholder: 'Note',
      pricePlaceholder: 'Price',

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