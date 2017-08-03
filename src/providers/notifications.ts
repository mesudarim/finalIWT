import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { EnvVariables } from '../app/environment/environment.token';
import { IEnvironment } from "../../environments/env-model";

import { prodVariables } from '../../environments/production'


/*
  Generated class for the notificationsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

export interface INotification {
  eventId?:string;
  eventName?: string;
  area?: string;
  when?: string;
  duration? : string;
  userName?: string;
  userId? : string;
}


@Injectable()
export class NotificationsProvider {
  public notifications$: Observable<INotification[]>;
  private _notifications$: BehaviorSubject<INotification[]>;
  private _dataStore: {  // This is where we will store our data in memory
    notifications: INotification[]
  };

  data: any;
  //private _notificationUrl = 'http://localhost:3000/events';

  //private _notificationUrl = 'http://localhost:3002/api/users';

  private _notificationUrl = (process.env.IONIC_ENV === 'prod')? prodVariables.apiEndpoint+"/api/users" : "http://localhost:3002/api/users";



  constructor(private _http: Http) {
      this._dataStore = { notifications: [] };
      this._notifications$ = <BehaviorSubject<INotification[]>>new BehaviorSubject([]);
      this.notifications$ = this._notifications$.asObservable();
  }


    loadAll():void {
      console.log("entered load all notifications")
      let headers:Headers = new Headers({'Content-Type': 'application/json'});
      this._http.get(this._notificationUrl, {headers: headers})
        .map(res => res.json())
        .subscribe(
              data => {
                console.log("data dans subscribe " + data)
                // add new datas to store.todos
                this._dataStore.notifications = data;
                // assign new state to observable Todos Subject
                this._notifications$.next(Object.assign({}, this._dataStore).notifications);
              },
              error => {
                console.log('ERROR', error);
                 this.handleError(`${(error.statusText)? error.statusText + ' Could not load notifications.' : 'Could not load notifications.'}`) //console.log('Could not load todos.')

               }
           );
    };



    sendNotification(event, user):void{
      let i = 0;
      console.log(event, user)
      console.log("sendNotification in provider")
      let body = JSON.stringify({
                  eventId: event._id,
                  when: event.when,
                  where: event.where,
                  duration: event.duration,
                  eventName: event.eventName,
                  userName: user.nickname,
                  userId: user._id
                });
      console.log(body)
      for (i = 0; i < user.friends.length; i++) {
        let headers:Headers = new Headers({'Content-Type': 'application/json'});
        this._http.post(`${this._notificationUrl}/${user.friends[i]._id}/notifications`, body, {headers: headers})
        .map(response => response.json()) // return response as json
         .subscribe(
            data => {
              console.log(data)
              // push new todo into _dataStore.todos
              this._dataStore.notifications.push(data);
              // assign new state to observable Todos Subject
              this._notifications$.next(Object.assign({}, this._dataStore).notifications);
            },
            error => this.handleError(`${(error.statusText)? error.statusText + ' Could not create the event.' : 'Could not create the event.'}`) //console.log('Could not create todo.')
         )
      }

    }

    addEventToUser(event, user){
      console.log(user._id)
      console.log(event._id)

      console.log("addEventToUser")
      let headers:Headers = new Headers({'Content-Type': 'application/json'});
      console.log("juste avant http request")
      this._http.post(`/${this._notificationUrl}/${user._id}/events`, event, {headers: headers})
      .map(response => {
                          console.log(response)
                          response.json()
                        }) // return response as json
      //  .subscribe(
      //     data => {
      //       console.log(data)
      //       // push new todo into _dataStore.todos
      //       this._dataStore.notifications.push(data);
      //       // assign new state to observable Todos Subject
      //       this._notifications$.next(Object.assign({}, this._dataStore).notifications);
      //     },
      //     error => this.handleError(`${(error.statusText)? error.statusText + ' Could not create the event.' : 'Could not create the event.'}`) //console.log('Could not create todo.')
      //  )
    }

    handleError(error:string):void {
      console.error(error || 'Server error');
      //alert(error || 'Server error');
    }

  }






  //let friendId = user.friends.id
  // let headers:Headers = new Headers({'Content-Type': 'application/json'});
  // //user.friends.map(
  //   this._http.post(this._notificationUrl + "/" + friendId + "/notifications" , body, {headers: headers})
  //   .map(response => response.json()) // return response as json
  //    .subscribe(
  //       data => {
  //         console.log(data)
  //         // push new todo into _dataStore.todos
  //         this._dataStore.notifications.push(data);
  //         // assign new state to observable Todos Subject
  //         this._notifications$.next(Object.assign({}, this._dataStore).notifications);
  //       },
  //       error => this.handleError(`${(error.statusText)? error.statusText + ' Could not create the event.' : 'Could not create the event.'}`) //console.log('Could not create todo.')
  //    )
  //)

  // createNewEvent(newEvent : IEvent):void {
  //       console.log(newEvent)
  //       let body = JSON.stringify({
  //                   when: newEvent.when,
  //                   where: newEvent.where,
  //                   duration: newEvent.duration,
  //                   eventName: newEvent.eventName
  //                 });
  //       console.log(body)
  //       let headers:Headers = new Headers({'Content-Type': 'application/json'});
  //       this._http.post(this._eventUrl, body, {headers: headers})
  //       .map(response => response.json()) // return response as json
  //        .subscribe(
  //           data => {
  //             console.log(data)
  //             // push new todo into _dataStore.todos
  //             this._dataStore.events.push(data);
  //             // assign new state to observable Todos Subject
  //             this._events$.next(Object.assign({}, this._dataStore).events);
  //           },
  //           error => this.handleError(`${(error.statusText)? error.statusText + ' Could not create the event.' : 'Could not create the event.'}`) //console.log('Could not create todo.')
  //        );
  //     };




//   this.data = null;
//   console.log('Hello EventsProvider Provider');
// load() {
//   return this._http.get(this._eventUrl);
// }
//
// load() {
//     if (this.data) {
//       return Promise.resolve(this.data);
//     }
//
//     return new Promise(resolve => {
//
//       this._http.get(`${this.envVariables.apiEndpoint+this._eventUrl}`)
//         .map(res => res.json())
//         .subscribe(data => {
//           this.data = data;
//           resolve(this.data);
//         });
//     });
//   }


//   this._http.get(this._eventUrl)
//     .map(res => res.json())
//     .subscribe(data => {
//       this.data = data;
//       resolve(this.data);
//     });
// });


    //   this._http.get(this._eventUrl)
    //     .map(res => res.json())
    //     .subscribe(data => {
    //       this.data = data;
    //       resolve(this.data);
    //     });
    // });
