let isCordova;

export let platformSpy = jasmine.createSpyObj('Platform',
  ['ready', 'getQueryParam', 'registerBackButtonAction', 'hasFocus', 'doc',
    'is', 'getElementComputedStyle', 'onResize', 'registerListener', 'win', 'raf',
    'timeout', 'cancelTimeout', 'getActiveElement', 'set']);

platformSpy.ready.and.callFake(function () {
  return new Promise((resolve) => {
    resolve('READY');
  });
});

platformSpy.getQueryParam.and.callFake(function () {
  return true;
});

platformSpy.registerBackButtonAction.and.callFake(function () {
  return (() => true);
});

platformSpy.doc.and.callFake(function () {
  return document;
});

platformSpy.getElementComputedStyle.and.callFake(function () {
  return {
    paddingLeft: '10',
    paddingTop: '10',
    paddingRight: '10',
    paddingBottom: '10',
  };
});

platformSpy.onResize.and.callFake(function (callback: any) {
  return callback;
});

platformSpy.registerListener.and.callFake(function () {
  return (() => true);
});

platformSpy.win.and.callFake(function () {
  return window;
});
platformSpy.raf.and.callFake(function () {
  return 1;
});

platformSpy.timeout.and.callFake(function (callback: any, timer: number) {
  return setTimeout(callback, timer);
});

platformSpy.getActiveElement.and.callFake(function () {
  return document['activeElement'];
});

platformSpy.is.and.callFake(function (attr) {
  return isCordova ? true : false;
});

platformSpy.set.and.callFake(function (attr, value) {
  isCordova = value;
});