import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Platform } from 'ionic-angular';

@Injectable()
export class HomeService {

  constructor(private http: Http, private platform: Platform ) { }

  /**
  * @description Function to get categories 
  * @return {Array} Promise with List of categories
  */
  getCategories() {

    var url = 'assets/data/categories.json';

    if (this.platform.is('cordova') && this.platform.is('android')) {
      url = "/android_asset/www/" + url;
    }

    return this.http.get(url)
      .map((res) => {
        return res.json()
      });

  }
}