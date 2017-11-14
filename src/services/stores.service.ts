import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import { constants } from "../app/app.constants";

@Injectable()
export class StoresService {
  baseRef = constants.API_URL;

  constructor(public http: Http) {
  }

  createStore(store) {
    return this.http.post(this.baseRef +
    '/skate_store/?' +
    'name=' +
    store.name +
    '&description=' +
    store.description +
    '&featured_image=' +
    store.featured_image +
    '&owner=' +
    store.owner +
    '&owner_id=1' +
    '&email=' +
    store.email +
    '&phone=' +
    store.phone +
    '&street_name=' +
    store.street_name +
    '&street_number=' +
    store.street_number +
    '&city=' +
    store.city +
    '&postcode=' +
    store.postcode +
    '&state=' +
    store.state +
    '&country=' +
    store.country, "");
  }

  fetchSpotsAround(location){

    return this.http.get(this.baseRef +
      '/skate_store/?' +
      'around' +
      '&latitude=' +
      location.latitude +
      '&longitude=' +
      location.longitude +
      '&near=10');
  }
}
