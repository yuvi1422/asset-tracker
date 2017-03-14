import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'page-home',
  templateUrl: 'transaction.component.html'
})
export class TransactionComponent {

  private parentData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.parentData = navParams.get('item').prop1;
  }

/**
   * @description Function to save the Transaction
   */
  save() {
    alert('Transaction Saved');
    this.navCtrl.setRoot(HomeComponent);
  }
}
