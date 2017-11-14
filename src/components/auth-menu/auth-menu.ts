import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'ss-auth-menu',
  templateUrl: 'auth-menu.html'
})
export class AuthMenuComponent {

  constructor(
    public authService : AuthService
  ) {}

  pushToSignUp() {
    // Push to the sign up page
  }

  pushToSignIn() {
    // Push to the sign in page
  }

}
