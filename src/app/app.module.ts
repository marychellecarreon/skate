import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ShowSpotPage } from '../pages/show-spot/show-spot';
import { AgmCoreModule } from "@agm/core";
import { Geolocation } from "@ionic-native/geolocation";
import { IonicStorageModule } from "@ionic/storage";
import { File } from "@ionic-native/file";
import { SpotsService } from "../services/spots.service";
import { FavoritesService } from "../services/favorites.service";
import { ErrorsService } from "../services/errors.service";
import { HttpModule } from '@angular/http';
import { StoresService } from "../services/stores.service";
import { StateService } from "../services/state.service";
import { LocationService } from '../services/location.service';
import { ShowStorePage } from "../pages/show-store/show-store";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { AnalyticsService } from '../services/analytics.service';
import { FeedbackService } from '../services/feedback.service';
import { PipesModule } from "../pipes/pipes.module";
import { Pro } from '@ionic/pro';
import {WeatherService} from "../services/weather.service";
import { ComponentsModule } from "../components/components.module";

import { constants } from '../app/app.constants';

export class MyErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    IonicPro.monitoring.handleNewError(err);
  }
}

const IonicPro = Pro.init('4aa8053f', {
  appVersion: constants.APP_VERSION
});

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ShowSpotPage,
    ShowStorePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB8WE8_UL5OuXsVMa8_qk_6Ywihqbnw9Fg'
    }),
    IonicStorageModule.forRoot(),
    HttpModule,
    PipesModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ShowSpotPage,
    ShowStorePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleAnalytics,
    // {provide: ErrorHandler, useClass: IonicErrorHandler},
    File,
    SpotsService,
    FavoritesService,
    StoresService,
    ErrorsService,
    StateService,
    LocationService,
    AuthService,
    UserService,
    AnalyticsService,
    FeedbackService,
    [{ provide: ErrorHandler, useClass: MyErrorHandler }],
    WeatherService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
