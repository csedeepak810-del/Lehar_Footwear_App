import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from 'ionic-selectable';


import { NewtargetpagePage } from './newtargetpage';

@NgModule({
  declarations: [
    NewtargetpagePage,
  ],
  imports: [
    IonicPageModule.forChild(NewtargetpagePage),
    IonicSelectableModule,
  ],
})
export class NewtargetpagePageModule {}
