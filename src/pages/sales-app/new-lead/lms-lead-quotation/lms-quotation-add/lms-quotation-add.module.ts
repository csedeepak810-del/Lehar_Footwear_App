import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LmsQuotationAddPage } from './lms-quotation-add';
import { IonicSelectableModule } from 'ionic-selectable';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    LmsQuotationAddPage,
  ],
  imports: [
    IonicPageModule.forChild(LmsQuotationAddPage),
    IonicSelectableModule,
    SelectSearchableModule
  ],
})
export class LmsQuotationAddPageModule {}
