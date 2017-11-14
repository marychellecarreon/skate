import { Storage } from "@ionic/storage"
import { Injectable } from "@angular/core";
import { Spot } from "../models/spots.model";
import { SpotsService } from './spots.service';

@Injectable()
export class FavoritesService {
  private favorites: Array<Spot> = [];
  private cachedFavourites: Array<Spot> = [];

  constructor(
    private storage: Storage,
    public spotsService : SpotsService,
  ) {}

  addFavorite(spot) {
    this.favorites.push(spot.id);
    this.storage.set('favorites', this.favorites)
      .then().catch(
      err => {
        this.favorites.splice(this.favorites.indexOf(spot.id), 1);
      }
    );
    this.cachedFavourites.unshift(spot);
    if (this.cachedFavourites.length > 5) {
      this.cachedFavourites.splice(5, 1)
    }
    this.storage.set('cachedFaves', this.cachedFavourites).catch(err => {
      this.cachedFavourites.splice(this.cachedFavourites.indexOf(spot));
    });
  }

  getFavorites() {
    let favoriteSpots : Array<{spot: Spot}> = [];

    this.storage.get('favorites').then( favorites => {
      if (favorites != null) {
        this.favorites = favorites;
        for(let fav of this.favorites){
          this.spotsService.getSpot(fav).subscribe(spot => {
            favoriteSpots.push({spot: spot.json()}) ;
          });
        }
      }
    });

    return favoriteSpots;
  }

  getCachedFavorites() {
    let favoriteSpots : Array<{spot: Spot}> = [];

    this.storage.get('cachedFaves').then(favorites => {
      if (favorites) {
        this.cachedFavourites = favorites;
        for (let fav of favorites) {
          favoriteSpots.push({spot: fav});
        }
      }
    });

    return favoriteSpots;
  }

  unFavorite(spotId) {
    this.favorites.splice(this.favorites.indexOf(spotId), 1);
    this.storage.set('favorites', this.favorites);
    this.cachedFavourites.forEach( spot => {
      if (spot.id === spotId) {
        this.cachedFavourites.splice(this.cachedFavourites.indexOf(spot), 1)
      }
    });
  }

  checkFavorite(spotId) {
    let isFavorited : boolean = false;
    if(this.favorites.indexOf(spotId) > -1){
      isFavorited = true;
    }
    return isFavorited;
  }

}
