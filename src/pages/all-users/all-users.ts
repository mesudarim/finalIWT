import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from "rxjs";

import { UsersProvider, IUser} from '../../providers/users'
import { AuthProvider } from '../../providers/auth';

import { FriendsProvider } from '../../providers/friends'
/**
 * Generated class for the AllUsersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-all-users',
  templateUrl: 'all-users.html',
})
export class AllUsersPage {

  public user: Observable<IUser[]>;
  loggedUser;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private users: UsersProvider,
              private friends: FriendsProvider,
              private auth: AuthProvider

            ) {
              this.users.loadAll()
              this.user = this.users.users$;
              console.log(this.user)
              this.user.subscribe((users)=>{
                //this.notification = notification;
                console.log(users);
              })

              this.auth.user$.subscribe((user) => {
                  console.log("passé dans friends this.auth.users$")
                    this.loggedUser = user;
                    console.log(user);
                })
  }

  addFriend(friend){
    console.log("addfriend ", friend, this.loggedUser)
    this.friends.addFriend(this.loggedUser, friend)

  }

  getUserList(item){
    this.navCtrl.push('UserListPage', {
        item: item
    });
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad AllUsersPage');
  // }

}
