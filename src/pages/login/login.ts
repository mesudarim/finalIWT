import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController, AlertController } from 'ionic-angular';

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
              private readonly toastCtrl: ToastController,
              private alertCtrl: AlertController
            ) {
  }

//   openSignup(){
//   let modal = this.modalCtrl.create('SignupPage');
//   modal.present();
// }


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
        () => {},
        err => {this.handleError(err);
                  this.presentAlert()
                  //alert ( "pas bon")
                  });
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

  presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Wrong login details',
    subTitle: "The application don't recognise your login or password",
    buttons: ['Dismiss']
  });
  alert.present();
}

  createNew(){
    this.navCtrl.push('SignupPage', {
    });
  }
}
