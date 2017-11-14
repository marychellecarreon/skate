import { Storage } from "@ionic/storage"
import { Injectable } from "@angular/core";

@Injectable()
export class StateService {

  public userState : Boolean;

  constructor(
    private storage: Storage
  ) {}

  setIntroState() {
    this.storage.set('introState', false);
  }

  getIntroState() : Promise<Boolean> {
    return this.storage.get('introState').then( introState => {
      if (introState === false) {
        return false;
      } else {
        this.setIntroState();
        return true;
      }
    });
  }

  getUserState() {
    return this.userState;
  }

  setUserState(state) {
    this.userState = state;
  }

}
