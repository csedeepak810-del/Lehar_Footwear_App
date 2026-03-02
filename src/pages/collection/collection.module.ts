import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollectionPage } from './collection';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    CollectionPage,
  ],
  imports: [
    IonicPageModule.forChild(CollectionPage),
    IonicSelectableModule
  ],
})
export class CollectionPageModule {}
