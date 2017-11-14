import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewStorePage } from './new-store';

@NgModule({
  declarations: [
    NewStorePage,
  ],
  imports: [
    IonicPageModule.forChild(NewStorePage),
  ],
})
export class NewStorePageModule {}
