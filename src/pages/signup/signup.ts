import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { MyApp } from '../../app/app.component'
import { Storage } from '@ionic/storage';


/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  email: string;
  nickname: string;
  password: string;
  error:string;
  private signupForm : FormGroup;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private auth:AuthProvider,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              private myApp: MyApp,
              private storage: Storage
          ) {
            this.signupForm = this.formBuilder.group({
              email: [''],
              nickname: [''],
              password: [''],
          });

  }

  signup() {
    console.log(this.signupForm.value.email)
    this.auth
      .signup({email:this.signupForm.value.email,password:this.signupForm.value.password,nickname:this.signupForm.value.nickname})
      .subscribe(
        res =>{
          this.setPassword(res, this.signupForm.value)
          console.log('signup res-> ', res)
          // this.storage.set('email', res.email);
          // this.storage.set('password', res.password);
          // this.storage.get('email').then((val) => {
          //   console.log('email', val);
          // });
          this.presentAlert(res);
        },
        err =>  {
          console.warn('signup err-> ', err)
          this.error = err.statusText
        }
      );
  }

  setPassword(res, newUser){
    this.auth.setPassword(res, newUser).subscribe(
      res=>{
        console.log("reponse ds setpassword signup", res)
      }
    )

  }

  presentAlert(user) {
  let alert = this.alertCtrl.create({
    title: 'Congratulations!',
    subTitle: 'Welcome ' + user.nickname + ', your new account has just been created!',
    buttons: [
      {
        text: 'Dismiss',
        role: 'cancel',
        handler: () => {
          this.myApp.rootPage = 'NotificationsListPage';
        }
      }
      ]
    });
    alert.present();
    //this.myApp.rootPage = 'EventsListPage';
  }

  close(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
