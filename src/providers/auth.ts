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
    .map(response => {
          console.log("dans login respone", response)
        response.text()
      })
    .catch(err => Observable.throw(this.handleErrors(err)));
}

  private handleErrors(err: any): any {
      if (!err.ok && err.statusText == '') {
        err.statusText = 'Erreur de connexion avec le serveur';
      }
      return err;
    }

  signup(values: any): Observable<any> {
    console.error(values)
    return this.http.post(this.endpoints.getSignup(), values)
    .map(response => {
      console.log("response " + response)
      let user = response.json();
      return response.json()

    })
    .catch(err => Observable.throw(this.handleErrors(err)));
}

  setPassword(user, newUser){
    console.log("dans setPassword")
    return this.http.post(this.endpoints.setPassword(user._id), newUser)
    .map(response => {
        console.log("response final" + response)
        return response.text();
                      }).catch(err => Observable.throw(this.handleErrors(err)))
  }

}
