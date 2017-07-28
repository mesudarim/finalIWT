import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from "rxjs";

//import { Friend } from '../../models/user'

import { FriendsProvider, IFriend } from '../../providers/friends'

/**
 * Generated class for the UserListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

  public friends: Observable<IFriend[]>;
  text: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private friendsProvider: FriendsProvider
            ) {

                this.friends=this.friendsProvider.friends$;
                this.friendsProvider.loadAll()
                console.log("sent load all", this.friends)
  }

}
