import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

import { SettingsComponent } from '../../pages/settings/settings.component';

@Component({
  template: `
    <ion-list class="zeroMarginBottom">
      <button ion-item *ngFor="let item of items; let i= index;" (click)="open(i)">{{ item }}</button>
    </ion-list>
  `
})
export class PopoverListComponent {

/**
 * @description list items to be displayed on popover
 */
  public items:any;

/**
 * @constructor
 * @param viewCtrl ViewController
 * @param navCtrl Navigation Controller
 */
  constructor(public viewCtrl: ViewController, public navCtrl: NavController) {
    this.items = viewCtrl.data.items;
  }

  /**
   * @description Function to open a page.
   * @param {number} index - Index of clicked item.
   */
  open(index) {
    let context = this;
    if(context.items[index] === 'settings') {
      context.navCtrl.push(SettingsComponent);
    }
    this.viewCtrl.dismiss();
  }
}
