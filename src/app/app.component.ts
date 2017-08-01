import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from "../providers/auth";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = HomePage;
  rootPage:string = '';

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private auth: AuthProvider
            ) {
    this.auth.user$.subscribe((user) => {
      if (user) {
          //je suis logué
          console.log("logué", user)
          //this.rootPage = 'EventsListPage';
          this.rootPage = 'NotificationsListPage';
      }
      else {
        //je suis pas logué
        console.log("pas logué")
        this.rootPage = 'LoginPage';
      }
    });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.rootPage = 'LoginPage';

  }


  // initialise(){
  //   let script = document.createElement('script')
  //   script.id = "googleMap";
  //   script.async = true;
  //   script.src= 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCv2i8Das8W3j2xw5cj7VN7-dcJJVekbiY&libraries=places&callback=initMap'
  //   document.body.appendChild(script)
  // }
}
