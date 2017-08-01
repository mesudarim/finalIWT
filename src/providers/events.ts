import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { EnvVariables } from '../app/environment/environment.token';
import { IEnvironment } from "../../environments/env-model";

/*
  Generated class for the EventsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

export interface IEvent {
  id?: string;
  area?:string;
  eventOwner?: string;
  eventName?: string;
  when?: string;
  duration? : string;
  where?: {lat?: number,
          lng?: number,
          address?: string,
          area?: string};
  imageUrl?: string;
  users? : Array<any>;
  galery? : Array<any>;
}


@Injectable()
export class EventsProvider {
  public events$: Observable<IEvent[]>;
  private _events$: BehaviorSubject<IEvent[]>;
  private _dataStore: {  // This is where we will store our data in memory
    events: IEvent[]
  };

  data: any;
  //private _eventUrl = 'http://localhost:3000/events';

  private _eventUrl = 'http://localhost:3002/api/events';


  constructor(private _http: Http) {
      this._dataStore = { events: [] };
      this._events$ = <BehaviorSubject<IEvent[]>>new BehaviorSubject([]);
      this.events$ = this._events$.asObservable();
  }

  // loadAllEvent(id) : Observable<Event[]> {
  //   return this.authHttp.get(...);
  // }

    loadAll():void {
      console.log("entered load all")
      let headers:Headers = new Headers({'Content-Type': 'application/json'});
      this._http.get(this._eventUrl, {headers: headers})
        .map(res => res.json())
        .subscribe(
              data => {
                console.log("data dans subscribe " + data)
                // add new datas to store.todos
                this._dataStore.events = data;
                // assign new state to observable Todos Subject
                this._events$.next(Object.assign({}, this._dataStore).events);
              },
              error => {
                console.log('ERROR', error);
                 this.handleError(`${(error.statusText)? error.statusText + ' Could not load events.' : 'Could not load events.'}`) //console.log('Could not load todos.')

               }
           );
    };



  createNewEvent(newEvent : IEvent, user):void {
        console.log(newEvent)
        let body = JSON.stringify({
                    when: newEvent.when,
                    where: newEvent.where,
                    duration: newEvent.duration,
                    eventName: newEvent.eventName
                  });
        console.log(body)
        let headers:Headers = new Headers({'Content-Type': 'application/json'});
        this._http.post(this._eventUrl, body, {headers: headers})
        .map(response => response.json()) // return response as json
         .subscribe(
            data => {
              console.log(data)
              // push new todo into _dataStore.todos
              this._dataStore.events.push(data);
              // assign new state to observable Todos Subject
              this._events$.next(Object.assign({}, this._dataStore).events);
              this.addUserToEvent(data, user);
            },
            error => this.handleError(`${(error.statusText)? error.statusText + ' Could not create the event.' : 'Could not create the event.'}`) //console.log('Could not create todo.')
         );



      };

  addUserToEvent(event, user){
    console.log("dans addEvent", event)
    console.log("event id", event._id)
    let body = JSON.stringify({
                // eventId: event._id,
                // when: event.when,
                // where: event.where,
                // duration: event.duration,
                // eventName: event.eventName,
                userName: user.nickname,
                userId: user._id
              });
    console.log(body)
    let headers:Headers = new Headers({'Content-Type': 'application/json'});
    this._http.post(`${this._eventUrl}/${event._id}/users`, event, {headers: headers})
    .map(response => response.json()) // return response as json
     .subscribe(
        data => {
          console.log(data)
          // push new todo into _dataStore.todos
          this._dataStore.events.push(data);
          // assign new state to observable Todos Subject
          this._events$.next(Object.assign({}, this._dataStore).events);
        },
        error => this.handleError(`${(error.statusText)? error.statusText + ' Could not add user to event.' : 'Could not add user to event.'}`) //console.log('Could not create todo.')
     );
  }

  handleError(error:string):void {
    console.error(error || 'Server error');
    //alert(error || 'Server error');
  }

}

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
