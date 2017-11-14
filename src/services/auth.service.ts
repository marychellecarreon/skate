import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { UserService } from "./user.service";

@Injectable()
export class AuthService {

  public signedIn : boolean = false;

  constructor(
    public userService : UserService
  ) {}

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  createUserWithEmail(email : string, password : string) : Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  setUserDetails(name : string, timestamp : number) : Promise<any> {
    this.userService.cacheUsername(name);
    let obj = {
      name: name,
      timestamp: timestamp
    };
    return firebase.database().ref()
      .child('users')
      .child(firebase.auth().currentUser.uid)
      .set(obj);
  }

  signInWithEmail(email : string, password : string) : Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signUserOut() {
    return firebase.auth().signOut();
  }

  sendPasswordResetEmail(email : string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  resetCurrentUsersPassword() {
    let email = firebase.auth().currentUser.email;
    return firebase.auth().sendPasswordResetEmail(email);
  }
}
