import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { FavoritesService } from "./favorites.service";

@Injectable()
export class UserService {

  constructor(
    private storage : Storage,
    public favoritesService : FavoritesService
  ) {}

  getUserDetails() {
    return firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value');
  }

  setUserDetails(name : string, timestamp : number) : Promise<any> {
    this.cacheUsername(name);
    let details = {
      name: name,
      timestamp: timestamp
    };
    return firebase.database().ref()
      .child('users')
      .child(firebase.auth().currentUser.uid)
      .set(details);
  }

  cacheUserDetails() {
    this.getUserDetails().then(snapshot => {
      this.cacheUsername(snapshot.val().name);
    });
  }

  getUsername() : Promise<any> {
    return this.storage.get('username');
  }

  cacheUsername(name : string) {
    this.storage.set('username', name);
  }
}
