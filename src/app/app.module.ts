import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Http, HttpModule, RequestOptions } from "@angular/http";
import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth';

import { EventsProvider } from '../providers/events';
import { FriendsProvider } from '../providers/friends';
import { UsersProvider } from '../providers/users';
import { NotificationsProvider } from '../providers/notifications';
import { EndpointsProvider } from '../providers/endpoints';


import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';
// import { File } from '@ionic-native/file';
// import { Transfer } from '@ionic-native/transfer';
// import { FilePath } from '@ionic-native/file-path';
//import { MapComponent } from '../components/map/map';

import { EnvironmentsModule } from './environment/environment.module'

@NgModule({
  declarations: [
    MyApp,
    //MapComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    EnvironmentsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //NewEventPage,
    //EventDetailsPage,
    //UserListPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EndpointsProvider,
    AuthProvider,
    EventsProvider,
    FriendsProvider,
    UsersProvider,
    NotificationsProvider,
    Camera
    // File,
    // Transfer,
    // FilePath
  ]
})
export class AppModule {}
