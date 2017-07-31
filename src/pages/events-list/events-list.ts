import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from "rxjs";

import { User } from '../../models/user'

import { EventsProvider, IEvent } from '../../providers/events'
import { AuthProvider } from '../../providers/auth'

/**
 * Generated class for the EventsListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-events-list',
  templateUrl: 'events-list.html',
})
export class EventsListPage {

  public events: Observable<IEvent[]>;
  user;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private eventsProvider: EventsProvider,
              private auth: AuthProvider
            ) {
      this.events=this.eventsProvider.events$;
      this.eventsProvider.loadAll()
      console.log("sent load all", this.events)
      this.user = this.auth.user$
      console.log(this.user)
      this.auth.user$.subscribe((user) => {
        this.user = user;
        console.log("logué", user)
        })
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
      user: this.user
    });
    //console.log("getFriendsList", User)
  }

}
