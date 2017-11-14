import { Injectable } from "@angular/core";
import { Events } from 'ionic-angular';
import { Pro } from '@ionic/pro';

@Injectable()
export class ErrorsService {

  public errorMessage : string = '';
  constructor(public events: Events) {}

  public presentError(errorMessage, error, meta) {
    this.errorMessage = errorMessage;
    Pro.getApp().monitoring.exception(new Error(error), meta);
    this.events.publish('error:created', errorMessage);
  }

  public logError(error, meta) {
    Pro.getApp().monitoring.exception(new Error(error), meta);
  }

  public dismissError() {
    this.errorMessage = '';
  }

}
