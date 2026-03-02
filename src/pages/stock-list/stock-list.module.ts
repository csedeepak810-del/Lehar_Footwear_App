import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockListPage } from './stock-list';

@NgModule({
  declarations: [
    StockListPage,
  ],
  imports: [
    IonicPageModule.forChild(StockListPage),
  ],
})
export class StockListPageModule {}
