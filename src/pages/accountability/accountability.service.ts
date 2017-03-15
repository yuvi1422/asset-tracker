import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Platform } from 'ionic-angular';

@Injectable()
export class AccountabilityService {

  constructor(private http: Http, private platform: Platform ) { }

/**
  * @description Function to get accountability data
  * @param id 
  * @return {Array} Promise with List of accountability
  */
  getData(id) {

    var url = 'assets/data/' + id + '.json';

    if (this.platform.is('cordova') && this.platform.is('android')) {
      url = "/android_asset/www/" + url;
    }

    return this.http.get(url)
      .map((res) => {
        return res.json()
      });

  }
}

