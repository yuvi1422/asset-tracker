import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import 'rxjs/add/operator/map';

import { platformSpy } from '../../../test-config/spies/platform.spie';

import { UrlService } from "./url.service";

describe('Service: Url Service', () => {

    let expectedData,
        urlServiceSpy;

    beforeEach(async(() => {
      urlServiceSpy = new UrlService(<any> platformSpy);
    }));

    it('#getAppName() should get app name', () => {

      expect(urlServiceSpy.getAppName()).toEqual('Asset Tracker');
    });

    it('#getAppKey() should get app key', () => {

      expect(urlServiceSpy.getAppKey()).toEqual('asset-tracker');
    });

    it('#getPathSeparator() should get path separator', () => {
      expect(urlServiceSpy.getPathSeparator()).toEqual('/');
    });

    it('#getStoreKey() should get store key', () => {
      expect(urlServiceSpy.getStoreKey()).toEqual('asset-tracker-store');
    });

    it('#getCategoriesId() should get categories id', () => {
      expect(urlServiceSpy.getCategoriesId()).toEqual('categories');
    });

    it('#getCategoriesKey() should get categories key', () => {
      expect(urlServiceSpy.getCategoriesKey()).toEqual('asset-tracker-store-categories');
    });

    it('#getCategoriesTitleKey() should get categories title key', () => {
      expect(urlServiceSpy.getCategoriesTitleKey()).toEqual('asset-tracker-store-title');
    });


    it('#getAccountabilityKey() should get accountability key', () => {
      expect(urlServiceSpy.getAccountabilityKey('people')).toEqual('asset-tracker-store-categories-people');
    });

    it('#getDeviceDataUrl() should get device data url', () => {
      expect(urlServiceSpy.getDeviceDataUrl()).toEqual('');
    });

    it('#getAddBtnImageUrl() should get AddBtn image url', () => {
      expect(urlServiceSpy.getAddBtnImageUrl()).toEqual('assets/images/add_btn_message.jpg');
    });

    it('#getCategoriesFileName() should get categories file name', () => {
      expect(urlServiceSpy.getCategoriesFileName()).toEqual('home');
    });
});