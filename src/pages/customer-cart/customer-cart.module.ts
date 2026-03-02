import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerCartPage } from './customer-cart';
import { IonicSelectableModule } from 'ionic-selectable';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    CustomerCartPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerCartPage),
        IonicSelectableModule,
        SelectSearchableModule
  ],
})
export class CustomerCartPageModule {}
