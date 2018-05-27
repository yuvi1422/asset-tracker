import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import 'rxjs/add/operator/map';

import { UtilService } from "./util.service";

import { DomSanitizer } from '@angular/platform-browser';
import { Logger } from "../log/logger.service";

let items: any;

describe('Service: Util Service', () => {

    let expectedData,
        domSanitizerSpy,
        loggerSpy,
        utilServiceSpy;

    beforeEach(async(() => {
      // Used spy to mock services.
      domSanitizerSpy = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustUrl']),
      loggerSpy = jasmine.createSpyObj('Logger', ['error']),
      utilServiceSpy = new UtilService(domSanitizerSpy, loggerSpy);

      items = [
        {
          title: 'Marriage',
          price: 30000
        },
        {
          title: 'Bike',
          price: 1000
        },
        {
          title: 'Rent',
          price: 5000
        }
      ];
    }));

    it('#getTotal() should get total of a property values from an array', () => {

      expect(utilServiceSpy.getTotal(items, 'price')).toEqual(36000);
      expect(utilServiceSpy.getTotal(null, 'price')).toEqual(0);
      expect(utilServiceSpy.getTotal(null, null)).toEqual(0);
    });

    it('#sort() should sort array in order mentioned', () => {

      // Clone array to make sure fresh array is used all time
      let arr = items.slice(0);
      expect(utilServiceSpy.sort(arr, 'price', 'ascending')).toEqual(
        [
          {
            title: 'Bike',
            price: 1000
          },
          {
            title: 'Rent',
            price: 5000
          },
          {
            title: 'Marriage',
            price: 30000
          }
        ]);
      arr = items.slice(0);
      expect(utilServiceSpy.sort(arr, 'price')).toEqual(
        [
          {
            title: 'Marriage',
            price: 30000
          },
          {
            title: 'Rent',
            price: 5000
          },
          {
            title: 'Bike',
            price: 1000
          }
        ]);
      arr = items.slice(0);
      expect(utilServiceSpy.sort(null, null)).toBeNull();
    });

    it('#loadThemes() should load themes', () => {
      utilServiceSpy.loadThemes();
      expect(utilServiceSpy.themes).toEqual([
        {
          name: 'primary',
          color: 'primary'
        },
        {
          name: 'secondary',
          color: 'secondary'
        },
        {
          name: 'dark',
          color: 'dark'
        },
        {
          name: 'royal',
          color: 'royal'
      }]);
    });

    it('#getObjFromArray() should get object from array', () => {

      expect(utilServiceSpy.getObjFromArray(items, 'title', 'Bike')).toEqual({
        title: 'Bike',
        price: 1000
      });

      expect(utilServiceSpy.getObjFromArray(items, 'title', 'AnyRandomValue')).toBeUndefined();
      expect(utilServiceSpy.getObjFromArray(null, 'title', 'AnyRandomValue')).toBeNull();
      expect(utilServiceSpy.getObjFromArray(items, 'title', '')).toBeNull();
    });

    it('#getTheme() should get theme using theme name', () => {

      expect(utilServiceSpy.getTheme('royal')).toEqual({
        name:  'royal',
        color: 'royal'
      });
      expect(utilServiceSpy.getTheme(null)).toBeNull();
      expect(utilServiceSpy.getTheme('')).toBeNull();
      expect(utilServiceSpy.getTheme('AnyRandomValue')).toBeUndefined();
    });
});