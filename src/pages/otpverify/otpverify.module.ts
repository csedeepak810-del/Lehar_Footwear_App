import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtpverifyPage } from './otpverify';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { TimeCounterPipe } from '../../pipes/time-counter/time-counter';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    OtpverifyPage,
    // TimeCounterPipe
  ],
  imports: [
    IonicPageModule.forChild(OtpverifyPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })

  ],
})
export class OtpverifyPageModule {}
