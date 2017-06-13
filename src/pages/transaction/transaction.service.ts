import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { Platform } from 'ionic-angular';

import { LoggerService } from "../../common/log/logger.service";

@Injectable()
export class TransactionService {


  /**
  * @constructor 
  * @param {Http} http - Http service of Angular
  * @param {Platform} platform - Platform service of ionic
  * @param {Storage} storage - Storage Service provided by Ionic
  * @param {LoggerService} logger - Logger Service
  */
  constructor(private http: Http, private platform: Platform, 
                private storage: Storage, 
                private logger: LoggerService) { 
    
  }

}