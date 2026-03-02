import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecondaryBillUploadAddPage } from './secondary-bill-upload-add';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    SecondaryBillUploadAddPage,
  ],
  imports: [
    IonicPageModule.forChild(SecondaryBillUploadAddPage),
    IonicSelectableModule,
    SelectSearchableModule
  ],
})
export class SecondaryBillUploadAddPageModule {}
