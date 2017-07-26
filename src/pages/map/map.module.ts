import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './map';
import { MapComponentModule } from '../../components/map/map.module';

@NgModule({
  declarations: [
    MapPage,
  ],
  imports: [
    IonicPageModule.forChild(MapPage),
    MapComponentModule
  ],
  exports: [
    MapPage
  ]
})
export class MapPageModule {}
