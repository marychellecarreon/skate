import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { constants } from '../../app/app.constants';
import { Spot } from '../../models/spots.model';
import { FavoritesService } from '../../services/favorites.service';
import {StoresService} from "../../services/stores.service";
import { Store } from '../../models/store.model';
import {SpotsService} from "../../services/spots.service";
import {WeatherService} from "../../services/weather.service";
import { AnalyticsService } from "../../services/analytics.service";

@Component({
  selector: 'page-show-spot',
  templateUrl: 'show-spot.html',
})
export class ShowSpotPage {

  public spot : Spot;
  public isFavorite : boolean;
  public stores : Store[] = [];
  public suburb : any;
  public weather : any;
  public info : boolean = true;
  public photos : boolean = false;

  @ViewChild('slidesBody') slidesBody : Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public favoritesService : FavoritesService,
    public storesService : StoresService,
    public spotsService : SpotsService,
    public weatherService : WeatherService,
    public analyticsService : AnalyticsService
  ) {}

  ionViewWillEnter() {
    this.spotsService.getSpot(this.navParams.data.spot.id).subscribe(spot => {
      this.spot = spot.json();
      console.log(spot.json());
      this.isFavorite = this.favoritesService.checkFavorite(this.spot.id);
      this.weatherService.getCurrentWeather(this.spot.latitude, this.spot.longitude).subscribe(data => {
        this.weather = {
          status: data.json().weather[0].main,
          description: data.json().weather[0].description,
          temp: data.json().main.temp,
          icon: data.json().weather[0].icon};
      });
      this.analyticsService.trackView(constants.SPOT_PAGE_ID + this.spot.name);
    });
    // this.storesService.fetchSpotsAround({latitude: this.spot.latitude, longitude: this.spot.longitude}).subscribe( data => {
    //   this.stores = data.json();
    //   console.log(this.stores);
    // });
  }

  toggleFavourite() {
    if(this.isFavorite) {
      this.favoritesService.unFavorite(this.spot.id);
      this.analyticsService.trackView(constants.REMOVE_FAVORITE_EVENT + this.spot.name);
      this.isFavorite = false;
    } else {
      this.favoritesService.addFavorite(this.spot);
      this.analyticsService.trackView(constants.ADD_FAVORITE_EVENT + this.spot.name);
      this.isFavorite = true;
    }
  }

  pushToFavorites() {
    this.navCtrl.push('FavoritesPage');
  }

  slideToInfo() {
    this.slidesBody.slideTo(0, 300);
    this.info = true;
    this.photos = false;
  }

  slideToPhotos() {
    this.slidesBody.slideTo(1, 300);
    this.info = false;
    this.photos = true;
  }

  goBack() {
    this.navCtrl.pop();
  }

  slideChanged() {
    let currentIndex = this.slidesBody.getActiveIndex();
    if(currentIndex == 0){
      this.info = true;
      this.photos = false;
    }else if(currentIndex == 1){
      this.info = false;
      this.photos = true;
    };
  }

}
