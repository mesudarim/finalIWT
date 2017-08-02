import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { EnvVariables } from '../app/environment/environment.token';
import { IEnvironment } from "../../environments/env-model";

// import { EventsListPage } from '../pages/events-list/events-list'
/*
  Generated class for the friendsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

export interface IFriend {
  id?: number;
  nickname?: string;
}


@Injectable()
export class FriendsProvider {
  public friends$: Observable<IFriend[]>;
  private _friends$: BehaviorSubject<IFriend[]>;
  private _dataStore: {  // This is where we will store our data in memory
    friends: IFriend[]
  };

  data: void;
  //private _friendUrl = 'http://localhost:3000/events';

  private _friendUrl = 'http://localhost:3002/api/users';


  constructor(private _http: Http) {
      this._dataStore = { friends: [] };
      this._friends$ = <BehaviorSubject<IFriend[]>>new BehaviorSubject([]);
      this.friends$ = this._friends$.asObservable();

  }


  addFriend(user, friend):void{
    console.log("addFriendToUser")
    let headers:Headers = new Headers({'Content-Type': 'application/json'});
    console.log("juste avant http request")
    this._http.post(`/${this._friendUrl}/${user._id}/friend`, friend, {headers: headers})
    .map(response => {
                        console.log(response)
                        response.json()
                      }) // return response as json
     .subscribe(
        data => {
          console.log(data)
          // push new todo into _dataStore.todos
          this._dataStore.friends.push(data);
          // assign new state to observable Todos Subject
          this._friends$.next(Object.assign({}, this._dataStore).friends)
        },
        error => this.handleError(`${(error.statusText)? error.statusText + ' Could not add friend.' : 'Could not add friend.'}`) //console.log('Could not create todo.')
     )
  }

  handleError(error:string):void {
    console.error(error || 'Server error');
    //alert(error || 'Server error');
  }

  // addFriend(user){
  //   console.log(user)
  //   let headers:Headers = new Headers({'Content-Type': 'application/json'});
  //   //console.log(this.auth.user$)
  //   // console.log(this.eventList.user.id)
  //   //console.log(this.auth.user$.id)
  //
  // //   this._http.post(this._friendUrl + `/${this.event-list.user.id}/friends`, user, {headers: headers})
  // //   .map(response => response.json()) // return response as json
  // //    .subscribe(
  // //       data => {
  // //         console.log(data)
  // //         // // push new todo into _dataStore.todos
  // //         // this._dataStore.events.push(data);
  // //         // // assign new state to observable Todos Subject
  // //         // this._events$.next(Object.assign({}, this._dataStore).events);
  // //       },
  // //       error => this.handleError(`${(error.statusText)? error.statusText + ' Could not create the event.' : 'Could not create the event.'}`) //console.log('Could not create todo.')
  // //    );
  // // }
  // //
  // //
  // // handleError(error:string):void {
  // //   console.error(error || 'Server error');
  // //   //alert(error || 'Server error');
  // }

}


    // loadAll():void {
    //   console.log("entered load all friends")
    //   let headers:Headers = new Headers({'Content-Type': 'application/json'});
    //   this._http.get(this._friendUrl, {headers: headers})
    //     .map(res => res.json())
    //     .subscribe(
    //           data => {
    //             console.log("data dans subscribe " + data)
    //             // add new datas to store.todos
    //             this._dataStore.friends = data;
    //             // assign new state to observable Todos Subject
    //             this._friends$.next(Object.assign({}, this._dataStore).friends);
    //           },
    //           error => {
    //             console.log('ERROR', error);
    //              this.handleError(`${(error.statusText)? error.statusText + ' Could not load friends.' : 'Could not load friends.'}`) //console.log('Could not load todos.')
    //
    //            }
    //        );
    // };



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
