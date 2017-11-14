import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../../services/auth.service';
import { UserService } from "../../../services/user.service";
import { NgForm } from "@angular/forms";


@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  formSubmitted : Boolean = false;

  constructor(
    public navCtrl : NavController,
    public navParams : NavParams,
    public loadingCtrl : LoadingController,
    public authService : AuthService,
    public userService : UserService,
    public alertCtrl : AlertController
  ) {}

  pushToSignUp() {
    let index = this.navCtrl.getActive().index;
    this.navCtrl.push('SignUpPage');
    this.navCtrl.remove(index, 1);
  }

  signInWithEmail(userForm : NgForm) {
    if (this.formSubmitted) {
      return false;
    }
    this.formSubmitted = true;

    let loading = this.loadingCtrl.create({
      content: 'Signing in'
    });
    loading.present();

    let userDetails = {
      email: userForm.controls.email.value,
      password: userForm.controls.password.value
    };

    this.authService.signInWithEmail(userDetails.email, userDetails.password).then(() => {
      this.userService.cacheUserDetails();
      loading.dismiss();
      this.navCtrl.popToRoot();
    }).catch(err => {
      console.log('Couldn\'t sign user in');
      loading.dismiss();
      this.formSubmitted = false;
    });
  }

  // signInWithFacebook() {
  // }

  resetPassword(email : string) {
    this.authService.sendPasswordResetEmail(email).then(() => {
      let alert = this.alertCtrl.create({
        title: 'Radical!',
        subTitle: 'You should receive an email with a prompt to reset your password soon',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel'
          }
        ]
      });

      alert.present();
    }).catch(err => {
      let alert = this.alertCtrl.create({
        title: 'Oops!',
        subTitle: 'We were unable to send an email to reset the password ' +
        'associated with that account, are you sure you entered the correct email?',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel'
          }
        ]
      });

      alert.present();
    });
  }

  promptReset() {
    let prompt = this.alertCtrl.create({
      title: 'Reset password',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: data => {
            this.resetPassword(data.email)
          }
        }
      ]
    });

    prompt.present();
  }

}
