import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LmsLeadAddPage } from './lms-lead-add';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    LmsLeadAddPage,
  ],
  imports: [
    IonicPageModule.forChild(LmsLeadAddPage),
    SelectSearchableModule,
    IonicSelectableModule
  ],
})
export class LmsLeadAddPageModule {}
