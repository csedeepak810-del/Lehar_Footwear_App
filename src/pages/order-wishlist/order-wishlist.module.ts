import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderWishlistPage } from './order-wishlist';

@NgModule({
  declarations: [
    OrderWishlistPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderWishlistPage),
  ],
})
export class OrderWishlistPageModule {}
