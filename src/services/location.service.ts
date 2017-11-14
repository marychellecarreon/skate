import { Injectable } from "@angular/core";
import { Geolocation } from '@ionic-native/geolocation'
import { ILocation } from "../interfaces/location.interface";
import {ErrorsService} from "./errors.service";

@Injectable()
export class LocationService {

  constructor(
    private geolocation: Geolocation,
    public errorsService : ErrorsService
  ) {}

  getCurrentPosition() : Promise<ILocation> {
    return this.geolocation.getCurrentPosition({timeout: 10000}).then( position => {
      let location = {
        lat: position.coords.latitude, lng: position.coords.longitude
      };
      return location;
    }).catch( err => {
      this.errorsService.presentError("Could not fetch your current location", err, { src: 'LocationService: getCurrentPosition catch' });
      let location = {
        lat: -33.895384, lng: 151.201372
      };
      return location;
    });
  }

}
