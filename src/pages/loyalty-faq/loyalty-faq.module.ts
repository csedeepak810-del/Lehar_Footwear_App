import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoyaltyFaqPage } from './loyalty-faq';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../products/products.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    LoyaltyFaqPage,
  ],
  imports: [
    IonicPageModule.forChild(LoyaltyFaqPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
})
export class LoyaltyFaqPageModule {}
