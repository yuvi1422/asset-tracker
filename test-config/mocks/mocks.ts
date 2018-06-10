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