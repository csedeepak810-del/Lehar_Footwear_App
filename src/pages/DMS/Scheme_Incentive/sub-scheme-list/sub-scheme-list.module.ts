import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubSchemeListPage } from './sub-scheme-list';

@NgModule({
  declarations: [
    SubSchemeListPage,
  ],
  imports: [
    IonicPageModule.forChild(SubSchemeListPage),
  ],
})
export class SubSchemeListPageModule {}
