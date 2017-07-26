import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ChatComponent } from './chat';

@NgModule({
  declarations: [
    ChatComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatComponentModule {}
