import { Component } from '@angular/core';
import { NavController, ToastController, AlertController} from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';

import { LoggerService } from "../../common/log/logger.service";
import { UrlService } from "../../common/util/url.service";
import { MessageService } from "../../common/util/message.service";

import { SettingsService } from "./settings.service";

@Component({
  selector: 'page-home',
  templateUrl: 'settings.component.html'
})
export class SettingsComponent {

   /**
   * @description Title of component
   * @public
   */
    public title:string;

   /**
   * @description item list to be displayed
   * @public
   */
   public items: Array<any>;

  /**
   * @description Settings key. It is used to store and retrieve data from storage
   * @private
   */
   private SETTINGS_KEY: string = 'asset-tracker-store-settings';

  /**
   * @constructor 
   * @param navCtrl Navigation Controller
   * @param toastCtrl ToastController Service provided by Ionic-Angular
   * @param alertCtrl AlertController Service provided by Ionic-Angular
   * @param storage Storage Service provided by Ionic
   * @param file File Service provided by Ionic
   * @param logger Logger Service
   * @param urlService Url Service used to get all application urls.
   * @param MessageService Url Service used to show messages.
   * @param settingsService Service of Settings module.
   */

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private file: File,
    private logger: LoggerService,
    private urlService: UrlService,
    private messageService: MessageService,
    private settingsService: SettingsService) {

    var context = this;

    storage.ready().then(() => {
      context.loadData();
    });
  }

  /**
   * @description Function to load data related to this component
   */
  loadData() {

    var context = this;

    context.storage.get(context.SETTINGS_KEY).then((storeData) => {

      //  True: when no value is stored in storage
      if (storeData === null || typeof storeData === 'undefined') {
         context.settingsService.getData().subscribe(data => {
           context.title = data.title;
           context.items = data.items;
           context.storage.set(context.SETTINGS_KEY, JSON.stringify(data));
         });
      } else {
        storeData = JSON.parse(storeData);
        context.title = storeData.title;
        context.items = storeData.items;
      }

    });
  }

  /**
   * @description Function to change settings. It is starting point of all setting changes.
   */
  changeSettings(settingId) {
    let context = this;

    switch(settingId) {
      case 'backup':
          context.exportData();
          break;
    }
  }

  /**
   * @description Function to export (i.e.) Backup data.
   */
  exportData() {
    
    let context = this;
    let rootPath = context.file.externalRootDirectory,
        dirName = context.urlService.getAppName(),
        appDirectoryPath = rootPath +  dirName,
        fileName =  Math.floor(Date.now() / 1000) + '.json';

     let alert = this.alertCtrl.create({
         title: 'Confirm Backup',
         message: 'Are you sure you want to backup current data?',
         buttons: [
           {
             text: 'Cancel',
             role: 'cancel'
           },
           {
             text: 'YES',
             handler: () => {

               context.storage.get(context.urlService.getAccountabilityKey('people')).then((storeData) => {

                 try{
                     context.writeToFile(rootPath, appDirectoryPath, dirName, fileName, storeData, true); 
                 } catch (err) {
                   context.messageService.displayToast('Error while taking backup.', 4000, 'bottom');
                 }
             });
           }
           }
         ]
       });
       alert.present();
  }

  /**
   * @param {string} rootPath Base FileSystem.
   * @param {string} appDirectoryPath App Directory Path.
   * @param {string} dirName Directory Name.
   * @param {string} fileName File Name.
   * @param {any} storeData Data to be exported.
   * @param {IWriteOptions} options replace file if set to true.
   * @returns {Promise<any>} Returns a Promise that resolves to updated file entry or rejects with an error.
   */
  writeToFile (rootPath: string, appDirectoryPath: string, dirName: string,
                   fileName: string, storeData: any, options?: any) {

  let context = this;

  // Create App Directory if not 
  context.file.createDir(rootPath, dirName, options). then(function(result) {

    // Write to file
      context.file.writeFile(appDirectoryPath, fileName, JSON.parse(storeData), options).then(function(result) {
      context.messageService.displayToast('Backup Taken Sucessfully', 2500, 'bottom');
      }, function(err) {
        context.messageService.displayToast('Error while writing data to backup file.', 4000, 'bottom');
      });
    }, function(err) {
      context.messageService.displayToast('Error while creating App Directory.', 4000, 'bottom');
    });
  }
}