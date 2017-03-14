import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AccountabilityComponent } from '../accountability/accountability.component';
import { TransactionComponent } from '../transaction/transaction.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent {

  constructor(public navCtrl: NavController) {
    
  }

  /**
   * @description Function to load the Accountibilty Page
   */
  loadAccountibiltyPage() {
    this.navCtrl.push(AccountabilityComponent, {
      item: {
          prop1: 'HomeComponent Data'
        }
    });
  }

/**
   * @description Function to load the Transaction Details Page
   */
  loadTransactionPage() {
    this.navCtrl.push(TransactionComponent, {
      item: {
          prop1: 'HomeComponent Data'
        }
    });
  }
  
}
