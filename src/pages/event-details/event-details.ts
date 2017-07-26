import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { User } from '../../models/user'
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

  tabs: string = "galery";
  isAndroid: boolean = false;

  item: User;
  text: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform
              ) {
        this.item = this.navParams.get('item');
        console.log(this.item);
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
