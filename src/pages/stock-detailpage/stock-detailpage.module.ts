import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockDetailpagePage } from './stock-detailpage';
import { IonicSelectableModule } from 'ionic-selectable';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    StockDetailpagePage,
  ],
  imports: [
    IonicPageModule.forChild(StockDetailpagePage),
    IonicSelectableModule,
    SelectSearchableModule
  ],
})
export class StockDetailpagePageModule {}
