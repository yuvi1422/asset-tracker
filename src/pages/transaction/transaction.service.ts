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
  * @param http Http service of Angular
  * @param platform Platform service of ionic
  * @param storage Storage Service provided by Ionic
  * @param logger Logger Service
  */
  constructor(private http: Http, private platform: Platform, 
                private storage: Storage, 
                private logger: LoggerService) { 
    
  }

}