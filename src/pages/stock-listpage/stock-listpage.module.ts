import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockListpagePage } from './stock-listpage';

@NgModule({
  declarations: [
    StockListpagePage,
  ],
  imports: [
    IonicPageModule.forChild(StockListpagePage),
  ],
})
export class StockListpagePageModule {}
