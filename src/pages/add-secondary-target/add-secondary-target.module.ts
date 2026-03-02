import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSecondaryTargetPage } from './add-secondary-target';

@NgModule({
  declarations: [
    AddSecondaryTargetPage,
  ],
  imports: [
    IonicPageModule.forChild(AddSecondaryTargetPage),
  ],
})
export class AddSecondaryTargetPageModule {}
