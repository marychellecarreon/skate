import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, ToastController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ErrorsService } from '../services/errors.service';

import * as firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { constants } from './app.constants';
import { AuthService } from '../services/auth.service';
import { StateService } from '../services/state.service';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('content') public navCtrl : NavController;

  rootPage:any = HomePage;
  FIREBASE = constants.FIREBASE;

  constructor(
    platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen,
    public toastCtrl : ToastController,
    public events : Events,
    public errorsService : ErrorsService,
    public authService : AuthService,
    public stateService : StateService,
    public analyticsService : AnalyticsService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.hide();
      splashScreen.hide();

      const firebaseConfig = this.setFirebaseConfig();
      firebase.initializeApp(firebaseConfig);
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.authService.signedIn = true;
        } else {
          this.authService.signedIn = false;
        }
      });

      this.analyticsService.startTracker();
    });

    this.events.subscribe('error:created', (error) => {
      const toast = this.toastCtrl.create({
        message: error,
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
        this.errorsService.dismissError();
      });
      toast.present();
    })
  }

  setFirebaseConfig() {
    return {
      apiKey: this.FIREBASE.API_KEY,
      authDomain: this.FIREBASE.AUTH_DOMAIN,
      databaseURL: this.FIREBASE.DATABASE_URL,
      projectId: this.FIREBASE.PROJECT_ID,
      storageBucket: this.FIREBASE.STORAGE_BUCKET,
      messagingSenderId: this.FIREBASE.MESSAGING_SENDER_ID
    }
  }

  pushTo(page, params ? : string) {
    this.navCtrl.push(page, params);
  }

}
