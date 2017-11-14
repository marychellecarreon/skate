import { NgModule } from '@angular/core';
import { AuthMenuComponent } from './auth-menu/auth-menu';
import { IonicModule } from "ionic-angular";
@NgModule({
	declarations: [AuthMenuComponent],
	imports: [IonicModule],
	exports: [AuthMenuComponent]
})
export class ComponentsModule {}
