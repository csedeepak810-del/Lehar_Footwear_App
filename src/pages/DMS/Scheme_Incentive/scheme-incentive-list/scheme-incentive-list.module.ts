import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchemeIncentiveListPage } from './scheme-incentive-list';

@NgModule({
  declarations: [
    SchemeIncentiveListPage,
  ],
  imports: [
    IonicPageModule.forChild(SchemeIncentiveListPage),
  ],
})
export class SchemeIncentiveListPageModule {}
