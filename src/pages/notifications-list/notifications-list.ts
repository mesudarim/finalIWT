import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from "rxjs";

import { User } from '../../models/user'

import { NotificationsProvider, INotification } from '../../providers/notifications'
import { AuthProvider } from '../../providers/auth'
import { EventsProvider, IEvent } from '../../providers/events'

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

  public notifications: Observable<INotification[]>;
  user;
  notification;
  event;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private notif: NotificationsProvider,
      private events: EventsProvider,
      private auth: AuthProvider,
      private toastCtrl: ToastController
    )
      {
    this.notifications = this.notif.notifications$;
    this.notifications.subscribe(()=>{
      //this.notification = notification;
      console.log(this.notifications);
    })
    this.events.loadAll()
    this.event = this.events.events$;
    this.event.subscribe((event)=>{
      //this.notification = notification;
      let i = event.length-1
      console.log(event[i]);
      this.event = event[i]
    })
    //this.notificationsProvider.loadAll()
    //console.log("sent load all notifications", this.notifications)
    this.auth.user$.subscribe((user) => {
        console.log("passé dans friends this.auth.users$")
          this.user = user;
          console.log(user);
      })
  }

  newEvent(){
      // push another page onto the navigation stack
      // causing the nav controller to transition to the new page
      // optional data can also be passed to the pushed page.
      this.navCtrl.push('NewEventPage', {
        user: this.user
      });
    }

  getUserList(item){
    this.navCtrl.push('UserListPage', {
        item: item
    });
  }


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

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsListPage');
  }

  iwtClicked(notification, user){
    console.log("notification après le boutton iwt", this.event, this.user)
    this.notif.sendNotification(this.event, this.user);
    this.notif.addEventToUser(this.event, this.user)
    this.presentToast();
    this.events.addUserToEvent(this.event, this.user);
    this.disableIWT();
  }

  disableIWT(){
    // ion-button.disabled=true;
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Notification sent!',
      duration: 2000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  logout() {
    this.auth.logout();
  }

  getAllUsers(){
    this.navCtrl.push('AllUsersPage', {
    });
  }


}


  //Dans le HTML on met une fonction qui appele le debugit et là on a accès aux objets!
  // debugIt(thing) {
  //   console.log(thing);
  //   return 'toto';
  // }
