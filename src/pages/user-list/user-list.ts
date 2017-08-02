import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user'

import { FriendsProvider } from '../../providers/friends'

/**
 * Generated class for the UserListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export class UserListPage {

  item: any;
  text: string;
  // events$: Observable<Event[]>;
  events = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public friends: FriendsProvider
            ) {

    this.item = this.navParams.get('item');
    console.log('Mon USER', this.item);
    // this.events$ = this.eventProvider.loadAllEvent(this.item._id);

  }

  // addFriend(friend){
  //   this.friends.addFriend(friend)
  //   console.log("add friend", friend)
  // }

}
