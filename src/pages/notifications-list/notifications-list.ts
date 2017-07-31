import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from "rxjs";

import { User } from '../../models/user'

import { EventsProvider, IEvent } from '../../providers/events'
//import { EventsProvider, IEvent } from '../../providers/events'

/**
 * Generated class for the NotificationsListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notifications-list',
  templateUrl: 'notifications-list.html',
})
export class NotificationsListPage {

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private eventsProvider: EventsProvider
    )
      {
    // this.events=this.eventsProvider.events$;
    // this.eventsProvider.loadAll()
    // console.log("sent load all", this.events)
  }

  newEvent(){
      // push another page onto the navigation stack
      // causing the nav controller to transition to the new page
      // optional data can also be passed to the pushed page.
      this.navCtrl.push('NewEventPage', {

      });
    }

  getUserList(item){
    this.navCtrl.push('UserListPage', {
        item: item
    });
  }

  //Dans le HTML on met une fonction qui appele le debugit et là on a accès aux objets!
  // debugIt(thing) {
  //   console.log(thing);
  //   return 'toto';
  // }

  getEventDetails(item){
    this.navCtrl.push('EventDetailsPage', {
      item: item
    });
  }

  getFriendsList(){
    // console.log("getFriendsList")
    this.navCtrl.push('FriendsPage', {
      // user: User
    });
    //console.log("getFriendsList", User)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsListPage');
  }

}
