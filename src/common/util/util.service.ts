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
   */
  getTotal(items, calculationProperty: string) {
    if(typeof items !== 'undefined') {
      return items.reduce((total, item) => {
          return total + item[calculationProperty];
      }, 0); 
    }
    return 0;
  }

}