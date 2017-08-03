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
  Generated class for the UsersProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/


export interface IUser {
  id?: number;
  nickname?: string;
}

@Injectable()
export class UsersProvider {
  public users$: Observable<IUser[]>;
  private _users$: BehaviorSubject<IUser[]>;
  private _dataStore: {  // This is where we will store our data in memory
    users: IUser[]
  };

  data: any;
  //private _userUrl = 'http://localhost:3002/api/users/';

  private _userUrl = (process.env.IONIC_ENV === 'prod')? prodVariables.apiEndpoint+"/api/users" : "http://localhost:3002/api/users";


  constructor(private _http: Http) {
    this._dataStore = { users: [] };
    this._users$ = <BehaviorSubject<IUser[]>>new BehaviorSubject([]);
    this.users$ = this._users$.asObservable();
    console.log("in constructor this.users", this.users$)
    // this.load()
  }

    loadAll():void {
      console.log("entered load all")
      let headers:Headers = new Headers({'Content-Type': 'application/json'});
      this._http.get(this._userUrl, {headers: headers})
        .map(res => res.json())
        .subscribe(
              data => {
                console.log("data dans subscribe " + data)
                // add new datas to store.todos
                this._dataStore.users = data;
                // assign new state to observable Todos Subject
                this._users$.next(Object.assign({}, this._dataStore).users);
              },
              error => {
                console.log('ERROR', error);
                 this.handleError(`${(error.statusText)? error.statusText + ' Could not load users.' : 'Could not load users.'}`) //console.log('Could not load todos.')

               }
           );
    };

    addEventToUser(event, user):void{
      console.log("addEventToUser")
      let headers:Headers = new Headers({'Content-Type': 'application/json'});
      this._http.post(`${this._userUrl}/${user._id}/events`, event, {headers: headers})
      .map(response => response.json()) // return response as json
       .subscribe(
          data => {
            console.log(data)
            // push new todo into _dataStore.todos
            this._dataStore.users.push(data);
            // assign new state to observable Todos Subject
            this._users$.next(Object.assign({}, this._dataStore).users)
          },
          error => this.handleError(`${(error.statusText)? error.statusText + ' Could not add event to user.' : 'Could not add event to user.'}`) //console.log('Could not create todo.')
       )
    }



    handleError(error:string):void {
      console.error(error || 'Server error');
      //alert(error || 'Server error');
    }

}
