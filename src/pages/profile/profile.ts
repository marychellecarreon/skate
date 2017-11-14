import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  isLoading : Boolean = false;
  username : string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService : AuthService,
    public userService : UserService,
    private alertCtrl : AlertController,
    private loadingCtrl : LoadingController
  ) {}

  ionViewDidLoad() {
    this.userService.getUsername().then(name => {
      if (name) {
        this.username = name;
      }
    });
  }

  signOut() {
    if (this.isLoading) {
      return false;
    }
    this.isLoading = true;

    let loading = this.loadingCtrl.create({
      content: 'Logging out'
    });
    loading.present();

    this.authService.signUserOut().then(() => {
      loading.dismiss();
      this.navCtrl.pop();
    }).catch( err => {
      console.log('Couldn\'t sign user in');
      this.isLoading = false;
      loading.dismiss();
    });
  }

  resetPassword() {
    this.authService.resetCurrentUsersPassword();
  }

  promptReset() {
    let prompt = this.alertCtrl.create({
      title: 'Reset password',
      subTitle: 'Are you sure you want to reset your password?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: data => {
            this.resetPassword();
          }
        }
      ]
    });

    prompt.present();
  }

}
