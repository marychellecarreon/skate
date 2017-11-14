import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { FeedbackService } from '../../services/feedback.service';
import { ErrorsService } from '../../services/errors.service';

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  public feedback : string = '';
  public formSubmitted : boolean = false;

  constructor(
    public feedbackService : FeedbackService,
    public errorsService : ErrorsService
  ) {}

  onSubmit() {
    if (this.formSubmitted) {
      return false;
    }
    this.formSubmitted = true;

    let feedback = {
      content: this.feedback,
      timestamp: Date.now()
    };

    this.feedbackService.sendFeedback(feedback).then(() => {
      this.feedback = '';
      this.formSubmitted = false;
    }, err => {
      this.errorsService.logError(err, { src: 'FeedbackPage: sendFeedback catch' });
      this.formSubmitted = false;
    });
  }

}
