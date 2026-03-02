import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductSalePage } from './product-sale';
import { IonicSelectableModule } from 'ionic-selectable';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    ProductSalePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductSalePage),
    IonicSelectableModule,
    SelectSearchableModule
  ],
})
export class ProductSalePageModule {}
