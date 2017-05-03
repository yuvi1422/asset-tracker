import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomeComponent } from '../pages/home/home.component';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

   /**
   * @description Root Page of Application
   */
  rootPage = HomeComponent;

  /**
  * @constructor 
  * @param platform Platform service of ionic
  */
  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault(); // Okay, so the platform is ready and our plugins are available.  Here you can do any higher level native things you might need.
      Splashscreen.hide();
    });
  }
}
