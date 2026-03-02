import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductSubDetail2Page } from './product-sub-detail2';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    ProductSubDetail2Page,
  ],
  imports: [
    IonicPageModule.forChild(ProductSubDetail2Page),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
})
export class ProductSubDetail2PageModule {}
