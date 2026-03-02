import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderCatalogueListPage } from './order-catalogue-list';

@NgModule({
  declarations: [
    OrderCatalogueListPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderCatalogueListPage),
  ],
})
export class OrderCatalogueListPageModule {}
