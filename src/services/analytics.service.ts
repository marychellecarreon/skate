import { Injectable } from "@angular/core";
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { constants } from '../app/app.constants';
import {ErrorsService} from "./errors.service";

@Injectable()
export class AnalyticsService {

  constructor(
    public googleAnalytics : GoogleAnalytics,
    public errorsService : ErrorsService
  ) {}

  startTracker() {
    this.googleAnalytics.startTrackerWithId(constants.TRACKER_ID);
  }

  trackView(screen) {
    this.googleAnalytics.trackView(screen).catch(err => {
      this.errorsService.logError(err, { src: 'AnalyticsService: trackView catch' });
    });
  }

  // Feature disabled, stub of feature slated for release beyond 1.0
  // trackEvent(category, action, label) {
  //   this.googleAnalytics.trackEvent(category, action, label);
  // }

}
