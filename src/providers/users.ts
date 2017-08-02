import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { EnvVariables } from '../app/environment/environment.token';
import { IEnvironment } from "../../environments/env-model";
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
  private _userUrl = 'http://localhost:3002/api/users/';

  constructor(private _http: Http) {
    this._dataStore = { users: [] };
    this._users$ = <BehaviorSubject<IUser[]>>new BehaviorSubject([]);
    this.users$ = this._users$.asObservable();
    console.log("in constructor this.users", this.users$)
    // this.load()
  }

  // load() {
  //     console.log("dans le load")
  //     if (this.data) {
  //       return Promise.resolve(this.data);
  //     }
  //
  //     return new Promise(resolve => {
  //
  //       this._http.get(this._userUrl)
  //         .map(res => res.json())
  //         .subscribe(data => {
  //           this.data = data;
  //           resolve(this.data);
  //         });
  //     });
  //   }

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

    handleError(error:string):void {
      console.error(error || 'Server error');
      //alert(error || 'Server error');
    }

}
