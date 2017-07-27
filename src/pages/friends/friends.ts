import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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


  text: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

    // this.item = this.navParams.get('item');
    // console.log(this.item);
  }

}
