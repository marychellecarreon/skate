import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Spot } from '../../models/spots.model';
import { FavoritesService } from '../../services/favorites.service';
import { ShowSpotPage } from '../show-spot/show-spot';
import { SpotsService } from '../../services/spots.service';
import { AnalyticsService } from "../../services/analytics.service";
import { constants } from  '../../app/app.constants';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  public spots : Spot[] = [];
  public favorites : Array<{spot: Spot}> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public favoritesService : FavoritesService,
    public spotsService : SpotsService,
    public analyticsService : AnalyticsService
  ) {}

  ionViewWillEnter() {
    this.favorites = this.favoritesService.getFavorites();
    this.analyticsService.trackView(constants.FAVORITES_PAGE_ID);
  }

  pushToSpot(fav) {
    this.navCtrl.push(ShowSpotPage, {spot: fav.spot,
      index: fav.index});
  }

}
