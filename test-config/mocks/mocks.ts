import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export class NavMock {
 
  public pop(): any {
    return getStubPromise();
  }
 
  public push(): any {
    return getStubPromise();
  }
 
  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }
 
  public setRoot(): any {
    return true;
  }
}

export class NavParamsMock {
  static returnParam = null;
  public get(key): any {
    if (NavParamsMock.returnParam) {
       return NavParamsMock.returnParam
    }
    return 'default';
  }
  static setParams(value){
    NavParamsMock.returnParam = value;
  }
}

export class StatusBarMock extends StatusBar {
  styleDefault() {
    return;
  }
}

export class SplashScreenMock extends SplashScreen {
  hide() {
    return;
  }
}

export function getStubPromise() {
    return new Promise((resolve: Function) => {
      resolve();
    });
 }

 export function getPromise(value) {
    return new Promise((resolve: Function) => {
      resolve(value);
    });
 }

export let categoriesMock = [
  { id: "people", title: "Borrowers", icon: "people", price: 0, thresholdLimit: 100000 },
  { id: "fd", title: "FD", icon: "lock", price: 0, thresholdLimit: 100000 },
  { id: "gold", title: "Gold", icon: "ios-star-half", price: 0, thresholdLimit: 50000 },
  { id: "mf", title: "Mutual Fund", icon: "pulse", price: 0, thresholdLimit: 50000 }
];

export let accountabilities = {
  accountabilities: [{
    accountability: {
      icon: {
        changingThisBreaksApplicationSecurity: "content://com.android.contacts/contacts/2737/photo"
      },
      title: "Abhijit Kurane",
      price: 0,
      transactions: [],
      id: "2737",
      icon_uri: "content://com.android.contacts/contacts/2737/photo"
    }
  }]
};

export let accountabilityStub = {
  title: "Accountability List",
  accountabilities: []
};

export let transactionBean = {
  titlePlaceholder: 'Note',
  pricePlaceholder: 'Price',
  id: '',
  title: '',
  icon: 'assets/avatar/people/person.ico',
  price: '',
  isActive: true,
  date: new Date(),
  category: null,
  accountability: {
    icon: 'assets/avatar/people/person.ico',
    title: 'Select Contact',
    price: 0,
    transactions: []
  }
};

export let messagesMock = {
  settings: {
    exportSuccess: 'Backup Taken Sucessfully.',
    exportFail: 'Error while writing data to backup file.',
    appDirFail: 'Error while creating App directory.',
    importSuccess: 'Data Restored Sucessfully.',
    importFail: 'Data Restore Failed.',
    backupNotFound: 'No Backup File Found',
    cordovaNotFound: 'Cordova Not Found.',
    backupListingFail: 'Error while listing backup files'
  }
};

export let settingsMock = {
  title: 'Settings',
  items: [
    {
      id: 'export',
      title: 'Back Up'
    },
    {
      id: 'import',
      title: 'Restore'
    }
  ]
}