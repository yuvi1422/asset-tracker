import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { LoggerService } from "../log/logger.service";

@Injectable()
export class UtilService {

  constructor(private logger: LoggerService){ }

  /**
   * @description Function to get total of a property values from an array
   * @param items {Array} Array of object whose sum need to be calculated
   * @param calculationProperty {String} Name of the property whose value need to be calcuated to get total
   * @param visibilityProperty {String} Visibility property name if any
   */
  getTotal(items, calculationProperty: string, visibilityProperty?: string) {
    this.logger.info('Total is being calculated by UtilService');
    if(typeof items !== 'undefined') {
      return items.reduce((total, item) => {
        if(typeof visibilityProperty === 'undefined' || item[visibilityProperty]) {
          return total + item[calculationProperty];
        }
        return total;
      }, 0); 
    }
    return 0;
  }

}