import { Component } from '@angular/core';

/**
 * Generated class for the ChatComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'chat',
  templateUrl: 'chat.html'
})
export class ChatComponent {

  text: string;

  constructor() {
    console.log('Hello ChatComponent Component');
    this.text = 'Hello World';
  }

}
