import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { Event } from '../../models/event'
//import { TabsComponent } from '../../components/tabs/tabs'

/**
 * Generated class for the EventDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {

  // @ViewChild(TabsComponent)
  // private tab: TabsComponent;

  // tab1Root: string = 'GaleryPage';
  // tab2Root: string = 'ChatPage';
images = ['zorro.jpg', 'IWT.jpg', 'logo.png', 'logoMargin.png'];
  //tabs: string = "galery";
  isAndroid: boolean = false;

  item: Event;
  text: string;
  eventDate: Date = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform
              ) {

        this.item = this.navParams.get('item');
        console.log(this.item);
        console.log(this.item.when);
        this.eventDate = this.item.when
        this.isAndroid = platform.is('android');


  }


}


  //@Input() userName: string = "";


//private eventList :EventsListPage
//   constructor() {
//     //console.log(eventList.items)
//     console.log('Hello EventDetailsComponent Component');
//     this.text = 'Hello World';
//   }
//
// }
