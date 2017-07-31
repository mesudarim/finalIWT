import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth';

import { MyApp } from '../../app/app.component'

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email:string = '';
  password:string;


  constructor(public navCtrl: NavController,
              //public navParams: NavParams
              private readonly auth:AuthProvider,
              private readonly modalCtrl: ModalController,
              private readonly loadingCtrl: LoadingController,
              private readonly toastCtrl: ToastController
            ) {

  }

//   openSignup(){
//   let modal = this.modalCtrl.create('SignupPage');
//   modal.present();
// }
logout() {
  this.auth.logout();
}

login() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Logging in ...'
    });
    loading.present();
    // setTimeout( _=>{
    //    loading.dismiss();
    //  }, 1000);
     console.log(this.email)
     this.auth
      .login({email:this.email, password:this.password })
      .finally(() => loading.dismiss())
      .subscribe(
        () => {
          console.log("dans subscribe login")
          this.myApp.rootPage = 'EventsListPage';},
        err => this.handleError(err));
  }

  handleError(error: any) {
    let message: string = `${error.statusText}`;
    const toast = this.toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }

  createNew(){
    this.navCtrl.push('SignupPage', {
    });
  }
}
