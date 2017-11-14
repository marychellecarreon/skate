import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { constants } from "../app/app.constants";

@Injectable()
export class WeatherService {
  api = constants.WEATHER_API;
  url = constants.WEATHER_URL;

  constructor(
    public http : Http
  ) {}

  getCurrentWeather(lat, lng) {
    return this.http.get(this.url +
      'lat=' +
      lat +
      '&lon=' +
      lng +
      '&units=metric' +
      '&appid=' +
      this.api
    );
  }

}
