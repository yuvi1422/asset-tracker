import { Component } from '@angular/core';
import { NavController, ToastController, AlertController, ActionSheetController, Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';

import { UrlService } from "../../common/util/url.service";
import { MessageService } from "../../common/util/message.service";
import { SettingsService } from "./settings.service";
import { Logger } from "../../common/log/logger.service";

@Component({
  selector: 'page-home',
  templateUrl: 'settings.component.html'
})
export class SettingsComponent {

   /**
   * @description Name of component
   * @private
   */
    private name:string = 'settings';

   /**
   * @description An object containing all messages of this component.
   * @private
   */
    private messageContainer:any;


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
   * @param {NavController} navCtrl - Navigation Controller
   * @param {ToastController} toastCtrl - ToastController Service provided by Ionic-Angular
   * @param {AlertController} alertCtrl - AlertController Service provided by Ionic-Angular
   * @param {ActionSheetController} actionSheetCtrl - ActionSheetController Service provided by Ionic-Angular
   * @param {Storage} storage - Storage Service provided by Ionic
   * @param {File} file - File Service provided by Ionic
   * @param {Platform} platform - Platform service of ionic
   * @param {UrlService} urlService - Url Service used to get all application urls.
   * @param {MessageService} messageService - Message Service used to show messages.
   * @param {SettingsService} settingsService - Service of Settings module.
   * @param {Logger} logger - Logger Service
   */

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private storage: Storage,
    private file: File,
    private platform: Platform,
    private urlService: UrlService,
    private messageService: MessageService,
    private settingsService: SettingsService,
    private logger: Logger) {

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
      if (!storeData) {
         context.settingsService.getData().subscribe(data => {
           context.title = data.title;
           context.items = data.items;
           context.storage.set(context.SETTINGS_KEY, JSON.stringify(data));
         });
      } else {
        storeData = JSON.parse(storeData);
        context.title = storeData.title;
      }
        context.items = storeData.items;

      //  Load all messages
      context.messageContainer = context.messageService.getMessages(context.name);

    });
  }

  /**
   * @description Function to change settings. It is starting point of all setting changes.
   */
  changeSettings(settingId) {

    switch (settingId) {
      case 'export':
        this.exportData();
        break;

      case 'import':
        this.importData();
        break;
    }
  }

  /**
   * @description Function to export (i.e. Backup ) the data.
   */
  exportData() {

    let context = this;
    let rootPath = context.file.externalRootDirectory,
      dirName = context.urlService.getAppName(),
      appDirectoryPath = rootPath + dirName,
      fileName = '' + Math.floor(Date.now() / 1000),
      fileExtension = '.json';

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

            context.storage.get(context.urlService.getCategoriesKey()).then((categoriesData) => {
              let accountabilityName = 'people',
                  exportObj = {
                    accountabilities: {}
                  };

              context.storage.get(context.urlService.getAccountabilityKey(accountabilityName)).then((accountabilityData) => {
                
                exportObj.accountabilities[accountabilityName] = accountabilityData;

                exportObj[context.urlService.getCategoriesId()] = categoriesData;

                try {
                  context.writeToFile(rootPath, appDirectoryPath, dirName, fileName + fileExtension, JSON.stringify(exportObj), true);
                } catch (err) {
                  context.messageService.displayToast(context.messageContainer.exportFail , 4000, 'bottom');
                }
              });

            });
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * @description Function to import (i.e. Restore ) the data.
   */
  importData() {

    let context = this,
        appDirectoryPath = context.file.externalRootDirectory + context.urlService.getAppName(),
        dirName = 'Backups';
    
    this.platform.ready().then(() => { 
    
    context.file.listDir(appDirectoryPath, dirName).then(function(diretories) {

      context.messageService.displayToast('list diretories: ' + JSON.stringify(diretories), 4000, 'bottom');
      let actionSheetBtns = [
      {
        text: 'Btn 1',
        handler: () => {
          console.log('Btn 1 clicked');
        }
      }, {
        text: 'Archive',
        handler: () => {
          console.log('Archive clicked');
        }
      }
    ];

    let cancelBtn = {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    };
    actionSheetBtns.push(cancelBtn);

    let actionSheet = context.actionSheetCtrl.create({
      title: 'Select File',
      buttons: actionSheetBtns
    });
    actionSheet.present();


    }, function (err) {
      let msg = (err === 'cordova_not_available')?
                    context.messageContainer.cordovaNotFound: context.messageContainer.backupListingFail

      context.messageService.displayToast(msg, 4000, 'bottom');
    });
    });
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
      context.messageService.displayToast(context.messageContainer.exportSuccess, 2500, 'bottom');
      }, function(err) {
        context.messageService.displayToast(context.messageContainer.exportFail, 4000, 'bottom');
      });
    }, function(err) {
      context.messageService.displayToast(context.messageContainer.appDirFail, 4000, 'bottom');
    });
  }

   /**
   * @description Function to show Ionic Toast
   * @param {string} message message to be displayed
   */
  displayToast(message) {
    if(!message) {
      this.logger.error('Invalid data submitted to toast message');
      return;
    }
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
  }
}