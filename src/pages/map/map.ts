import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {} from '@types/googlemaps';
import { MapComponent } from '../../components/map/map';

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild(MapComponent)
  private map: MapComponent;

  //@Input() mapID: string = "";
  //private map: google.maps.Map;
  lat: number = this.navParams.get('lat');
  long: number = this.navParams.get('long');

    constructor(public navCtrl: NavController,
                public navParams: NavParams) {
    console.log(this.lat);
    console.log(this.long);
    }

    ionViewDidEnter() {
      //const pos = this.selectedPlace;
      console.log('ionViewDidEnter', this.map);
      this.map.init(this.lat, this.long);
    }


  }



    // function initialize(lat:number, long:number) {
    //             console.log("initialising")
    //             this.map = new google.maps.Map(document.getElementById("map"), {
    //             zoom: 12,
    //             center: new google.maps.LatLng(this.lat, this.long),
    //             mapTypeId: google.maps.MapTypeId.ROADMAP
    //           });
    //     }

        // if (navigator.geolocation)
        //   var watchId = navigator.geolocation.watchPosition(successCallback, null, {enableHighAccuracy:true});
        // else
        //   alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");
        //
        // function successCallback(position){
        //   this.map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        //   var marker = new google.maps.Marker({
        //     position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        //     map: this.map
        //   });
        //   if (this.previousPosition){
        //     var newLineCoordinates = [
        //        new google.maps.LatLng(this.previousPosition.coords.latitude, this.previousPosition.coords.longitude),
        //        new google.maps.LatLng(position.coords.latitude, position.coords.longitude)];
        //
        //     var newLine = new google.maps.Polyline({
        //       path: newLineCoordinates,
        //       strokeColor: "#FF0000",
        //       strokeOpacity: 1.0,
        //       strokeWeight: 2
        //     });
        //     this.newLine.setMap(this.map);
        //   }
        //   this.previousPosition = position;
        // };

          // initialize(lat:number, long:number) {
          //             console.log("initialising")
          //             this.map = new google.maps.Map(document.getElementById("map"), {
          //             zoom: 12,
          //             center: new google.maps.LatLng(this.lat, this.long),
          //             mapTypeId: google.maps.MapTypeId.ROADMAP
          //           });
          //     }

          // public init(lat:number, long:number, zoom:number=12) {
          //
          //   this.map = new google.maps.Map(document.getElementById(`map_canvas_${this.mapID}`), {
          //       center: new google.maps.LatLng(lat, long),
          //       zoom: zoom,
          //       mapTypeId: google.maps.MapTypeId.ROADMAP
          //    });
