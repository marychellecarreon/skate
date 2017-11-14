import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from "@angular/core";
import { constants } from "../app/app.constants";

@Injectable()
export class SpotsService {
  baseRef = constants.API_URL;

  constructor(
              public http : Http
  ) {}

  getSpot(spotId) {
    return this.http.get(this.baseRef +
      '/spots/' +
      spotId);
  }

  fetchSpotsAround(location) {
    return this.http.get(this.baseRef +
      '/spots/?' +
      'around' +
      '&latitude=' +
      location.lat +
      '&longitude=' +
      location.lng +
      '&near=10');
    }

  fetchSpotsByRegion(location, radius){

    return this.http.get(this.baseRef +
      '/spots/?' +
      'region=' +
      location +
      ' ' +
      'Australia' +
      '&near=' +
      radius);
  }

}
