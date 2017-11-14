import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import {StoresService} from "../../services/stores.service";
import {NgForm} from "@angular/forms";
import {ShowStorePage} from '../show-store/show-store';

@IonicPage()
@Component({
  selector: 'page-new-store',
  templateUrl: 'new-store.html',
})
export class NewStorePage {

  public formSubmitted : boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl : MenuController,
              public storesService : StoresService) {
  }

  ionViewDidLoad() {
  }

  createStore(store : NgForm) {

    if (this.formSubmitted) {
      return false;
    }
    this.formSubmitted = true;

    const newStore = {
      name : store.controls.name.value,
      description : store.controls.description.value,
      featured_image : store.controls.featured_image.value,
      owner : store.controls.owner.value,
      email : store.controls.email,
      phone : store.controls.phone,
      street_name : store.controls.street_name.value,
      street_number : store.controls.street_number.value,
      city : store.controls.city.value,
      postcode : store.controls.postcode.value,
      state : store.controls.state.value,
      country : store.controls.country.value
    };

    this.storesService.createStore(newStore).subscribe( data => {
      this.navCtrl.push(ShowStorePage, data);
    })

  }

  openMenu() {
    this.menuCtrl.toggle();
  }

}
