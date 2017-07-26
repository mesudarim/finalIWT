import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { GaleryComponent } from './galery';

@NgModule({
  declarations: [
    GaleryComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    GaleryComponent
  ]
})
export class GaleryComponentModule {}
