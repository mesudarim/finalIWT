import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { AuthProvider } from "../providers/auth";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = HomePage;
  rootPage:string = '';

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              //private auth: AuthProvider
            ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


    // this.auth.user$.subscribe(user => {
    //   if (user) {
    //     this.rootPage = 'TabsPage';
    //   }
    //   else {

    // this.auth.user$.subscribe(user => {
    //    if (user) {
    //      this.rootPage = 'EventsListPage';
    //   }
    //   else {
          this.rootPage = 'LoginPage';
    //    }
    //  });

     //this.auth.checkLogin();


  }
}
