import { NavMock, NavParamsMock, getStubPromise, getPromise } from '../mocks/mocks';

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

export let messageServiceSpy = jasmine.createSpyObj('MessageService',
                                  ['displayToast', 'loadMessages', 'getMessages', 'getMessage']);
