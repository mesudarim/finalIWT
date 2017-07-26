import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UsersProvider {

  data: any;
  private _eventUrl = 'http://localhost:3000/users';

  constructor(private _http: Http) {}
  //   this.data = null;
  //   console.log('Hello EventsProvider Provider');
  // load() {
  //   return this._http.get(this._eventUrl);
  // }
  //
  load() {
      if (this.data) {
        return Promise.resolve(this.data);
      }

      return new Promise(resolve => {

        this._http.get(this._eventUrl)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      });
    }


}
