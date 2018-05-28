import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import 'rxjs/add/operator/map';

import { PlatformMock} from '../../../test-config/mocks/platform.mock';

import { UrlService } from "./url.service";

describe('Service: Url Service', () => {

    let expectedData,
        platformMock = new PlatformMock(),
        urlServiceSpy;

    beforeEach(async(() => {
      // Used spy to mock services.
      urlServiceSpy = new UrlService(<any> new PlatformMock());
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
      expect(urlServiceSpy.getDeviceDataUrl()).toEqual('/android_asset/www/');
    });

    it('#getAddBtnImageUrl() should get AddBtn image url', () => {
      expect(urlServiceSpy.getAddBtnImageUrl()).toEqual('/android_asset/www/assets/images/add_btn_message.jpg');
    });

    it('#getCategoriesFileName() should get categories file name', () => {
      expect(urlServiceSpy.getCategoriesFileName()).toEqual('home');
    });
});