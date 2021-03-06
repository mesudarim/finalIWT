import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import { Storage } from '@ionic/storage';
//import { JwtHelper, AuthHttp } from 'angular2-jwt';
import { Observable, BehaviorSubject } from "rxjs";
import 'rxjs/add/operator/map';

import { User } from '../models/user';
import { EndpointsProvider } from './endpoints';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private authUser = new BehaviorSubject(null);
  public user$: Observable<User> = this.authUser.asObservable();

  constructor(public http: Http,
              //private readonly storage: Storage,
              private readonly endpoints: EndpointsProvider
            ) {
    console.log('Hello AuthProvider Provider');
  }

  login(values: any): Observable<any> {
    console.log("in login of this.auth");
    return this.http.post(this.endpoints.getLogin(), values)
      .map(response => response.json())
      .map(user => this.authUser.next(user))
      .catch(err => Observable.throw(this.handleErrors(err)));
  }

  logout() {
    this.authUser.next(null);
  }

  private handleErrors(err: any): any {
      if (!err.ok && err.statusText == '') {
        err.statusText = 'Erreur de connexion avec le serveur';
      }
      return err;
    }

  signup(values: any): Observable<any> {
    console.log(values)
    return this.http.post(this.endpoints.getSignup(), values)
    .map(response => {
      console.log("response " + response)
      let user = response.json();
      return response.json()

    })
    .catch(err => Observable.throw(this.handleErrors(err)));
}

  setPassword(user, newUser){
    console.log("dans setPassword", user)
    return this.http.post(this.endpoints.setPassword(user._id), newUser)
    .map(response => {
        console.log("response final" + response)
        this.authUser.next(user)
        return response.text();
        })
        .catch(err => Observable.throw(this.handleErrors(err)))
  }

}
