import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderCatalogProductDetailPage } from './order-catalog-product-detail';

@NgModule({
  declarations: [
    OrderCatalogProductDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderCatalogProductDetailPage),
  ],
})
export class OrderCatalogProductDetailPageModule {}
