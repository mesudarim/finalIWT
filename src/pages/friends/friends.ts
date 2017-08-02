import { Component, Input } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from "rxjs";

//import { Friend } from '../../models/user'

 import { FriendsProvider, IFriend } from '../../providers/friends'
import { AuthProvider } from '../../providers/auth';

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
  private user;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
               private friendsProvider: FriendsProvider,
              private auth: AuthProvider,
              private _http: Http
            ) {
                this.friends = this.friendsProvider.friends$;
                // this.friendsProvider.loadAll()
                // console.log("sent load all", this.friends)
                this.auth.user$.subscribe((user) => {
                    console.log("passé dans friends this.auth.users$")
                      this.user = user;
                      console.log(user);
                  })
              }

  getUserDetails(item){
    console.log(item)
    this.navCtrl.push('UserListPage', {
        item: item
      });
    console.log("user clicked", item)
  }

  
}
