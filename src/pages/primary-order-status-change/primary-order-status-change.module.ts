import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrimaryOrderStatusChangePage } from './primary-order-status-change';

@NgModule({
  declarations: [
    PrimaryOrderStatusChangePage,
  ],
  imports: [
    IonicPageModule.forChild(PrimaryOrderStatusChangePage),
  ],
})
export class PrimaryOrderStatusChangePageModule {}
