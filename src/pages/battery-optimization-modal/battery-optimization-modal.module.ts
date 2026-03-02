import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BatteryOptimizationModalPage } from './battery-optimization-modal';

@NgModule({
  declarations: [
    BatteryOptimizationModalPage,
  ],
  imports: [
    IonicPageModule.forChild(BatteryOptimizationModalPage),
  ],
})
export class BatteryOptimizationModalPageModule {}
