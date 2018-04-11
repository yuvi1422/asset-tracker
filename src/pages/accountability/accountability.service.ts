import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Platform } from 'ionic-angular';

import { CategoryService } from "../../common/category/category.service";

@Injectable()
export class AccountabilityService {

  /**
  * @constructor 
  * @param {Http} Http - Http Service
  * @param {Platform} platform - Platform Service
  * @param {CategoryService} categoryService - Category Service
  */
  constructor(private http: Http, 
              private platform: Platform,
              private categoryService: CategoryService ) { }

  /**
  * @description Function to get thresholdLimit
  * @param {string} categoryId - Id of Category.
  * @return Category Array
  */
  getThresholdLimit(categoryId) {
    return this.categoryService.getCategoryById(categoryId);
  }

  /**
  * @description Function to get accountability data
  * @param {string} id - Id of accountability
  * @return {Array} Promise with List of accountability
  */
  getData(id: string) {

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