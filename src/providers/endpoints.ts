import { Injectable } from '@angular/core';
import { prodVariables } from '../../environments/production'

/*
  Generated class for the EndpointsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class EndpointsProvider {

  API_PATH: string = (process.env.IONIC_ENV === 'prod')? prodVariables.apiEndpoint : "http://localhost:3002";

  //API_PATH: string = "http://localhost:3002";


  getAuth(){
    return this.API_PATH + "/api/authenticate";
  }

  getLogin(){
    console.log("dans getlogin of endpoints")
    return this.API_PATH + "/api/users/login";
    // L'idée est d'aller directement au notifications car l'authentication se fait en chemin
    //return this.API_PATH + "/api/events";
  }

  getSignup(){
    return this.API_PATH + "/api/users";
  }

  setPassword(userId){
    return this.API_PATH + "/api/users/" + userId + "/actions/set-password";
  }
}
