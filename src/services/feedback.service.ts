import { Injectable } from "@angular/core";
import * as firebase from 'firebase';

@Injectable()
export class FeedbackService {

  constructor() {}

  sendFeedback(feedback) {
    return firebase.database().ref('/feedback').push(feedback);
  }
}
