import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BackgroundTrackListPage } from './background-track-list';
import { IonicSelectableModule } from 'ionic-selectable';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    BackgroundTrackListPage,
  ],
  imports: [
    IonicPageModule.forChild(BackgroundTrackListPage),
    IonicSelectableModule,
    SelectSearchableModule
  ],
})
export class BackgroundTrackListPageModule {}
