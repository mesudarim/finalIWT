import { Component } from '@angular/core';


/**
 * Generated class for the GaleryComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'galery',
  templateUrl: 'galery.html'
})
export class GaleryComponent {

  text: string;

  constructor() {
    console.log('Hello GaleryComponent Component');
    this.text = 'Hello World';
  }

}
