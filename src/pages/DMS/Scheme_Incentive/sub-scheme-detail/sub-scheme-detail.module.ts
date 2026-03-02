import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubSchemeDetailPage } from './sub-scheme-detail';

@NgModule({
  declarations: [
    SubSchemeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SubSchemeDetailPage),
  ],
})
export class SubSchemeDetailPageModule {}
