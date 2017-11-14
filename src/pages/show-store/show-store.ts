import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StoresService } from '../../services/stores.service';
import { Store } from '../../models/store.model';
import { ErrorsService } from "../../services/errors.service";

@Component({
  selector: 'page-show-store',
  templateUrl: 'show-store.html',
})
export class ShowStorePage {

  public store : Store;
  public stores : Store[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storesService : StoresService,
              public errorsService : ErrorsService) {
    this.store = this.navParams.data.store;

  }

  ionViewWillEnter() {
    this.storesService.fetchSpotsAround({latitude: this.store.latitude, longitude: this.store.longitude}).subscribe( data => {
      this.stores = data.json();
    });
  }

  callStore() {
  }

}
