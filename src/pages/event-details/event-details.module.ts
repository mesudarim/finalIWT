import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventDetailsPage } from './event-details';
//import { TabsComponentModule } from '../../components/tabs/tabs.module'

@NgModule({
  declarations: [
    EventDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(EventDetailsPage),
    //TabsComponentModule
  ],
  exports: [
    EventDetailsPage
  ]
})
export class EventDetailsPageModule {}
