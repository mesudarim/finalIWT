import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {} from '@types/googlemaps';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import { MapPage } from '../map/map'
import { Camera, CameraOptions } from '@ionic-native/camera';
// import { File } from '@ionic-native/file';
// import { Transfer, TransferObject } from '@ionic-native/transfer';
// import { FilePath } from '@ionic-native/file-path';

import { EventsProvider } from '../../providers/events'
//import { BehaviorSubject, Observable } from 'rxjs';


/**
 * Generated class for the NewEventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEventPage {

  currDate : string = new Date().toISOString();;
  where: string;
  when : string = this.currDate;
  lat: number;
  lon: number;
  eventName: string;
  map: MapPage;
  duration: string = "1 hour";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private platform: Platform,
              private geolocation: Geolocation,
              private camera: Camera,
              public zone: NgZone,
              private events: EventsProvider
              // private transfer: Transfer,
              // private file: File,
              // private filePath: FilePath
  ) {
    // this.platform.ready().then(() => {
    //   //console.log('here', this)
    //   // this.initialize();
    //
    // });
    window['initMap'] = ()=> {
      this.initialize()
    }
    //création d'une balise javascript pour que le this reste dans le scoop et ne soit pas perdu après les requetes à google
    //On a rajouté le initMap à la fin de la script.src
    let script = document.createElement('script')
    script.id = "googleMap";
    script.async = true;
    script.src= 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCv2i8Das8W3j2xw5cj7VN7-dcJJVekbiY&libraries=places&callback=initMap'
    document.body.appendChild(script)

}

  initialize(){
    var a,lat,lon;
    var searchBox: any = document.getElementById('autocomplete');
    var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(this.lat,this.lon));
    var input = document.getElementById('autocomplete');
    var autocomplete = new google.maps.places.Autocomplete(searchBox,defaultBounds);

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      var place = autocomplete.getPlace();
      a = place.formatted_address;
      this.where = a;
       this.zone.run(() => {
         this.lat = place.geometry.location.lat();
         this.lon = place.geometry.location.lng();
         console.log(this.lat, this.lon)
         console.log("where" + this.where)

       })
    });
    // google.maps.event.addDomListener(window, 'load', this.initialize);
  }


  hereNow(){
    this.platform.ready().then(() => {
         //get current position
        this.geolocation.getCurrentPosition().then(pos => {
          this.lat = pos.coords.latitude;
          this.lon = pos.coords.longitude;
          var geocoder = new google.maps.Geocoder;
          let myPlace = new google.maps.LatLng(this.lat,this.lon);
          let geopos = `${this.lat},${this.lon}`;
          let latlngStr = geopos.split(',', 2);
          var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
          console.log(latlng)
          geocoder.geocode({'location': latlng}, (results, status) => {
            //this.$where.next(results[0].formatted_address);
            this.zone.run(() => {
              this.where = results[0].formatted_address
              console.log(this.where)
            })
          });
        });

        // const watch = this.geolocation.watchPosition().subscribe(pos => {
        //   this.lat = pos.coords.latitude;
        //   this.lon = pos.coords.longitude;
        //     console.log(pos.coords.latitude, pos.coords.longitude);
        //   });
    })
    //Pour avoir la date au format ISO on utilise the toISOString()
    this.currDate = new Date().toISOString();
    this.when = this.currDate;
    console.log("end of here and now OUT " + this.lat, this.lon);
  }

  submit(){
    let when = this.when;
    let where = {lat: this.lat,
                lng: this.lon};
    let eventName = this.eventName;
    let duration = this.duration

    let newEvent = {
      when,
      where,
      eventName,
      duration
    }

    console.log(newEvent)

    // if (this.eventForm.valid) {
    //   console.log("submit" + this.eventForm.value)
    //     //this.events.createNewEvent(this.event)
    //   }
    this.events.createNewEvent(newEvent)
    //this.events.createNewEvent()
  }

  openMap(){
    console.log(this.lat, this.lon)
    this.navCtrl.push('MapPage', {
        lat: this.lat,
        long : this.lon
    });
  }


  /////////////////////////
  //// Camera///////
  ////////////////////////

  getToCam(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

}
