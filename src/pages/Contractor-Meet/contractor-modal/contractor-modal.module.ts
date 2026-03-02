import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContractorModalPage } from './contractor-modal';
import { PinchZoomModule } from 'ngx-pinch-zoom';

@NgModule({
  declarations: [
    ContractorModalPage,
  ],
  imports: [
    PinchZoomModule ,
    IonicPageModule.forChild(ContractorModalPage),
  ],
})
export class ContractorModalPageModule {}
