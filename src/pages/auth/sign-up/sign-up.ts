import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { UserService } from "../../../services/user.service";

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  formSubmitted : boolean = false;
  formType : string = 'none';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl : LoadingController,
    public authService : AuthService,
    public userService : UserService
  ) {}

  pushToSignIn() {
    let index = this.navCtrl.getActive().index;
    this.navCtrl.push('SignInPage');
    this.navCtrl.remove(index, 1)
  }

  signUpWithEmail(userForm : NgForm) {
    if (this.formSubmitted) {
      return false;
    }
    this.formSubmitted = true;

    let loading = this.loadingCtrl.create({
      content: 'Signing up'
    });
    loading.present();

    let newUser = {
      email: userForm.controls.email.value,
      name: userForm.controls.name.value,
      password: userForm.controls.password.value
    };

    this.authService.createUserWithEmail(newUser.email, newUser.password).then(user => {
      let timestamp = Date.now();

      this.userService.setUserDetails(newUser.name, timestamp).then(() => {
        this.authService.signInWithEmail(newUser.email, newUser.password).then(() => {
          loading.dismiss();
          this.navCtrl.popToRoot();
        }).catch(err => {
          console.log('Signed user up, but unable to sign in');
          loading.dismiss();
        });
      }).catch(err => {
        console.log('Signed user up, but was unable to set their details in the db');
        loading.dismiss();
      });
    }).catch(err => {
      console.log('Unable to sign user up');
      this.formSubmitted = false;
      loading.dismiss();
    });
  }

  // signUpWithFacebook() {
  // }

}
