import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {

  constructor(private http: Http) {}

   /**
   * @description Function to get categories 
   * @return {Array} Promise with List of categories
   */
  getCategories() {
    let url = 'data/category.json';

    return this.http.get(url)
      .map((res) => {
        return res.json()
      });

   }

}
