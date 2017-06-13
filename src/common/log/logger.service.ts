import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class LoggerService {

  constructor() { }

/**
 * @description Function to log the message
 * @param {string} message - message to be logged
 */
  log(message:string) {
    console.log(message);
  }

  /**
 * @description Function to warn the message
 * @param {string} message - message to be warned
 */
  warn(message:string) {
    console.warn(message);
  }

  /**
 * @description Function to log the info message
 * @param {string} message - message to be logged
 */
  info(message:string) {
    console.info(message);
  }

  /**
 * @description Function to log the error message
 * @param {string} message - message to be logged
 */
  error(message:string) {
    console.error(message);
  }
}

