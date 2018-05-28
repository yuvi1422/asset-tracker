import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { DomSanitizer } from '@angular/platform-browser';

import { Logger } from "../log/logger.service";

@Injectable()
export class UtilService {

  /**
   * @description Array of themes.
   * @private 
   */
  private themes = [];

  /**
   * @constructor
   * @param sanitizer DomSanitizer provided by Angular
   * @param logger Logger Service
   */
  constructor(private sanitizer: DomSanitizer, private logger: Logger){ 
    this.loadThemes();
  }

  /**
   * @description Function to get total of a property values from an array.
   * @param {array} items - Array of object whose sum need to be calculated.
   * @param {string} calculationProperty - Name of the property whose value need to be calcuated to get total.
   */
  getTotal(items: any[], calculationProperty: string) {
    if(Array.isArray(items) && calculationProperty) {
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
    if(!arr || !sortProperty || !sortProperty) {
      return null;
    }
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

  /**
   * @description Function to load all themes.
   */
  loadThemes() {
    this.themes = [{
      name:  'primary',
      color: 'primary'
    },{
      name:  'secondary',
      color: 'secondary'
    },{
      name:  'dark',
      color: 'dark'
    },{
      name:  'royal',
      color: 'royal'
    }];
  }

 /**
   * @description Function to get Object from Array.
   * @param {array} myArray - Array of Objects
   * @param {string} attrName - Name of the attribute.
   * @param {string} attrValue - Value of the attribute.
   * @returns {object} Selected Object
   */
  getObjFromArray(myArray, attrName, attrValue) {
    if(!myArray || !attrName || !attrValue) {
      return null;
    }
    return myArray.find(obj => obj[attrName] === attrValue);
  }

  /**
   * @description Function to get theme.
   * @param {string} themeName - Name of the theme.
   * @returns {object} Selected Theme Object. 
   */
  getTheme(themeName) {
    if(!themeName) {
      return null;
    }
    return this.themes.find(obj => obj.name === themeName);
  }
}