import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Http, HttpModule, RequestOptions } from "@angular/http";
import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth';

import { EventsProvider } from '../providers/events';
import { UsersProvider } from '../providers/users';
import { Camera } from '@ionic-native/camera';
//import { MapComponent } from '../components/map/map';

import { EnvironmentsModule } from './environment/environment.module'
import { EndpointsProvider } from '../providers/endpoints';

@NgModule({
  declarations: [
    MyApp,
    //MapComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    EnvironmentsModule,
    IonicModule.forRoot(MyApp)
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
    UsersProvider,
    Camera
  ]
})
export class AppModule {}
