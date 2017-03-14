import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'page-home',
  templateUrl: 'transaction.component.html'
})
export class TransactionComponent {

  private title:string = 'Transaction Details';
  private transactionDate = new Date();
  constructor(public navCtrl: NavController) {
  }

/**
   * @description Function to save the Transaction
   */
  save() {
    alert('Transaction Saved');
    this.navCtrl.setRoot(HomeComponent);
  }
}
