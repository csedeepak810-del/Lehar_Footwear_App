import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecondaryBillUploadListPage } from './secondary-bill-upload-list';

@NgModule({
  declarations: [
    SecondaryBillUploadListPage,
  ],
  imports: [
    IonicPageModule.forChild(SecondaryBillUploadListPage),
  ],
})
export class SecondaryBillUploadListPageModule {}
