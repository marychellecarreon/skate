import {Component} from '@angular/core';
import {NavController, LoadingController, ToastController, MenuController, ActionSheetController} from 'ionic-angular';

import { Geolocation } from "@ionic-native/geolocation";
// import { AgmCoreModule } from '@agm/core';
// import * as firebase from 'firebase';
// import * as Geocoder from 'geocoder';
// import { File, Entry } from '@ionic-native/file';
import { SpotsService } from '../../services/spots.service';
import { StoresService } from '../../services/stores.service';
import { Spot } from '../../models/spots.model';
import { Store } from '../../models/store.model';
import { ShowSpotPage } from '../show-spot/show-spot';
// import { ShowStorePage } from '../show-store/show-store';
import { ErrorsService } from "../../services/errors.service";
import { StateService } from "../../services/state.service";
import { LocationService } from '../../services/location.service';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public rawSpots : Array<any> = [];
  public userLocation = {
    lat: 0,
    lng: 0
  };
  public userLocationSet = false;
  public spots : Spot[] = [];
  public stores : Store[] = [];
  public setSpot: boolean = false;
  public setStore : boolean = false;
  public currentSpot : any;
  public currentStore : any;
  public location : string = "";
  public radius : number = 5;
  public searching : boolean = false;
  public introState : boolean = true;
  public showAuthMenu : boolean = false;

  constructor(
    public navCtrl: NavController,
    public geolocation : Geolocation,
    public loadingCtrl : LoadingController,
    public toastCtrl : ToastController,
    public spotsService : SpotsService,
    public storesService : StoresService,
    public menuCtrl : MenuController,
    public errorsService : ErrorsService,
    public stateService : StateService,
    public locationService : LocationService,
    public authService : AuthService,
    public actionSheetCtrl : ActionSheetController
  ) {

    this.aroundMe();

  }

  ionViewWillLoad() {
  }

  clickedSpot(spot) {
    this.setStore = false;
    this.setSpot = true;
    this.currentSpot = spot;
  }
 
  pushToSpot(spot) {
    this.navCtrl.push(ShowSpotPage, {spot: spot,
      index: this.spots.indexOf(spot)});
  }

  // Feature disabled, stub of feature slated for release beyond 1.0
  // pushToStore(store) {
  //   this.navCtrl.push(ShowStorePage, {store: store})
  // }

  pushToFavorites() {
    this.navCtrl.push('FavoritesPage');
  }

  pushToSignUp() {
    this.navCtrl.push('SignUpPage');
  }

  pushToSignIn() {
    this.navCtrl.push('SignInPage');
  }

  pushToFeedback() {
    if (this.authService.signedIn) {
      this.navCtrl.push('FeedbackPage');
    } else {
      // Show the user a message saying they need to sign in or sign up before giving feedback
    }
  }

  clickedProfile() {
    if (this.authService.signedIn) {
      // Push to the profile page
    } else {
      this.showAuthMenu = !this.showAuthMenu;
    }
  };

  aroundMe() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your location...'
    });
    loader.present();
    this.locationService.getCurrentPosition().then( location => {
      this.userLocation.lat = location.lat;
      this.userLocation.lng = location.lng;
      this.userLocationSet = true;
      this.spotsService.fetchSpotsAround(location).subscribe(data => {
          this.spots = data.json();
          if(loader){ loader.dismiss();}
        },
        error => {
          this.errorsService.presentError("Unable to fetch spots", error, { src: 'HomePage: fetchSpotsAround catch' });
          if(loader){ loader.dismiss();}
        });
      // Feature disabled, stub of feature slated for release beyond 1.0
      // this.storesService.fetchSpotsAround(location.coords).subscribe( data => {
      //   this.stores = data.json();
      //   },
      // error => {
      //   this.errorsService.presentError("Unable to fetch stores");
      // });
    });
  }

  region() {
    this.spotsService.fetchSpotsByRegion(this.location, this.radius).subscribe( data => {
      this.userLocation.lat = data.json().coords[0];
      this.userLocation.lng = data.json().coords[1];
      this.spots = data.json().spots;
        this.searching = false;
        // Feature disabled, stub of feature slated for release beyond 1.0
        // this.storesService.fetchSpotsAround({latitude: data.json().coords[0], longitude: data.json().coords[1]}).subscribe( data => {
        //     this.stores = data.json();
        //   },
        //   error => {
        //     this.errorsService.presentError("Unable to fetch stores");
        //   });
    },
      error => {
      });
  }

  openMenu() {
    this.menuCtrl.toggle();
  }

  presentSearch() {
    this.searching = true;
  }

  dismissSearch() {
    this.searching = false;
  }

}
