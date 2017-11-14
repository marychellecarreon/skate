import { NgModule } from '@angular/core';
import { ShortAddressPipe } from './../pipes/short-address/short-address';
@NgModule({
	declarations: [ShortAddressPipe],
	imports: [],
	exports: [ShortAddressPipe]
})
export class PipesModule {}
