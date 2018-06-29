import { NavMock, NavParamsMock, getStubPromise, getPromise, transactionBean } from '../mocks/mocks';

export let storageSpy = jasmine.createSpyObj('Storage',
  ['get', 'set', 'driver', 'ready', 'remove', 'clear', 'length', 'keys', 'forEach']);

storageSpy.ready.and.callFake(function () {
  return getStubPromise();
});

export let fileSpy = jasmine.createSpyObj('File', ['externalRootDirectory', 'listDir', 'createDir', 'writeFile']);

fileSpy.listDir.and.callFake(function () {
  return getStubPromise();
});
fileSpy.createDir.and.callFake(function () {
  return getStubPromise();
});
fileSpy.writeFile.and.callFake(function () {
  return getStubPromise();
});

export let httpSpy = jasmine.createSpyObj('Http', ['get']);

export let  navCtrlSpy = jasmine.createSpyObj('NavController', ['push', 'pop', 'getActive', 'setRoot']);

export let contactsSpy = jasmine.createSpyObj('Contacts', ['pickContact', '_set', '_reset']);
let contactData = {
  id: "2737",
  displayName: "Abhijit Kurane",
  photos: [
    { value: "content://com.android.contacts/contacts/2737/photo" }
  ]
};
contactsSpy.pickContact.and.callFake(function () {
  return getPromise(contactData);
});
contactsSpy._set.and.callFake(function () {
  contactData.photos = [];
});
contactsSpy._reset.and.callFake(function () {
  contactData.photos.push({
    value: "content://com.android.contacts/contacts/2737/photo"
  });
});

let toastSpy = jasmine.createSpyObj('Toast', ['present']);
export let toastCtrlSpy = jasmine.createSpyObj('ToastController', ['create']);
toastCtrlSpy.create.and.callFake(function () {
  return toastSpy;
});

let alertSpy = jasmine.createSpyObj('Alert', ['present']);
export let  alertCtrlSpy = jasmine.createSpyObj('AlertController', ['create']);
alertCtrlSpy.create.and.callFake(function () {
  return alertSpy;
});

let actionSheetSpy = jasmine.createSpyObj('ActionSheet', ['present']);
export let actionSheetCtrlSpy = jasmine.createSpyObj('ActionSheetController', ['create']);
actionSheetCtrlSpy.create.and.callFake(function () {
  return actionSheetSpy;
});

export let viewCtrlSpy = jasmine.createSpyObj('ViewController', 
                              ['data', 'readReady', 'writeReady', 'dismiss', '_setHeader', '_setNavbar', '_setIONContent', '_setIONContentRef']);

export let domSanitizerSpy = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustUrl']);


export let homeServiceSpy = jasmine.createSpyObj('HomeService', ['getData']);

export let accountabilityServiceSpy = jasmine.createSpyObj('AccountabilityService', 
                                        ['getData', 'getThresholdLimit']);

export let categoryServiceSpy = jasmine.createSpyObj('UtilService',
                          ['getCategories', 'setCategories', 'getCategoryById', 'getCategoriesFromConfig']);

export let messageServiceSpy = jasmine.createSpyObj('MessageService',
                                  ['displayToast', 'loadMessages', 'getMessages', 'getMessage']);

export let utilServiceSpy = jasmine.createSpyObj('UtilService', 
                          ['getTotal', 'sort', 'getSanitizedUrl', 'loadThemes', 'getObjFromArray', 'getTheme']);

export let urlServiceSpy = jasmine.createSpyObj('UrlService', 
                          ['getAppName', 'getAppKey', 'getPathSeparator', 'getStoreKey', 
                              'getCategoriesId', 'getCategoriesKey', 'getCategoriesTitleKey', 'getAccountabilityKey',
                              'getDeviceDataUrl', 'getAddBtnImageUrl', 'getCategoriesFileName']);

export let loggerSpy = jasmine.createSpyObj('Logger', ['log', 'warn', 'error', 'info']);

export let transactionServiceSpy = jasmine.createSpyObj('TransactionService', ['getBean']);

transactionServiceSpy.getBean.and.callFake(function () {
  return transactionBean;
});

export let settingsServiceSpy = jasmine.createSpyObj('SettingsService', ['getData', 'importData', 'getBackupFileList']);


