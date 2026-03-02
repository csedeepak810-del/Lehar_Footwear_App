import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecondaryBillUploadDetailPage } from './secondary-bill-upload-detail';

@NgModule({
  declarations: [
    SecondaryBillUploadDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SecondaryBillUploadDetailPage),
  ],
})
export class SecondaryBillUploadDetailPageModule {}
