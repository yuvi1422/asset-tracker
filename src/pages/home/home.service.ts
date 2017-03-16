import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Platform } from 'ionic-angular';

@Injectable()
export class HomeService {

  constructor(private http: Http, private platform: Platform ) { }

  /**
  * @description Function to get category data
  * @return {Array} Promise with List of categories
  */
  getData() {

    var url = 'assets/data/home.json';

    if (this.platform.is('cordova') && this.platform.is('android')) {
      url = "/android_asset/www/" + url;
    }

    return this.http.get(url)
      .map((res) => {
        return res.json()
      });

  }
}