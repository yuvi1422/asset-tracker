import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomeComponent } from '../pages/home/home.component';
import { MessageService } from "../common/util/message.service";

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
  * @param statusBar StatusBar service of ionic
  * @param splashScreen SplashScreen service of ionic
  * @param MessageService Message Service used to show messages.
  */
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
                  private messageService: MessageService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
