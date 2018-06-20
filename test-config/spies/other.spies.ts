import { NavMock, NavParamsMock, getStubPromise, getPromise, transactionBean } from '../mocks/mocks';

export let storageSpy = jasmine.createSpyObj('Storage',
  ['get', 'set', 'driver', 'ready', 'remove', 'clear', 'length', 'keys', 'forEach']);

storageSpy.ready.and.callFake(function () {
  return getStubPromise();
});

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

export let messageServiceSpy = jasmine.createSpyObj('MessageService',
                                  ['displayToast', 'loadMessages', 'getMessages', 'getMessage']);

export let utilServiceSpy = jasmine.createSpyObj('UtilService', 
                          ['getTotal', 'sort', 'getSanitizedUrl', 'loadThemes', 'getObjFromArray', 'getTheme']);

export let loggerSpy = jasmine.createSpyObj('Logger', ['log', 'warn', 'error', 'info']);

export let transactionServiceSpy = jasmine.createSpyObj('TransactionService', ['getBean']);

transactionServiceSpy.getBean.and.callFake(function () {
  return transactionBean;
});
