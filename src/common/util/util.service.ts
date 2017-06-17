import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { DomSanitizer } from '@angular/platform-browser';

import { LoggerService } from "../log/logger.service";

@Injectable()
export class UtilService {

  /**
   * @constructor
   * @param sanitizer DomSanitizer provided by Angular
   * @param logger Logger Service
   */
  constructor(private sanitizer: DomSanitizer, private logger: LoggerService){ }

  /**
   * @description Function to get total of a property values from an array.
   * @param {array} items - Array of object whose sum need to be calculated.
   * @param {string} calculationProperty - Name of the property whose value need to be calcuated to get total.
   */
  getTotal(items: any[], calculationProperty: string) {
    if(typeof items !== 'undefined') {
      return items.reduce((total, item) => {
          return total + item[calculationProperty];
      }, 0); 
    }
    return 0;
  }

  /**
   * @description Function to sort array with respect to property provided.
   * @param {array} arr - Array to be sorted.
   * @param {string} sortProperty - Property on which array will be sorted.
   */
  sort(arr: any[], sortProperty: string, order?: string) {
    if(order === 'ascending') { //  Small to Large
      return arr.sort(function(a,b) {return (a[sortProperty] > b[sortProperty]) ? 1 : ((b[sortProperty] > a[sortProperty]) ? -1 : 0);} );
    }else {
      return arr.sort(function(a,b) {return (a[sortProperty] < b[sortProperty]) ? 1 : ((b[sortProperty] < a[sortProperty]) ? -1 : 0);} );
    }
    
  }

  /**
   * @description Function to get sanitized url.
   * @param {string} url - Url to be sanitized.
   */
  getSanitizedUrl(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}