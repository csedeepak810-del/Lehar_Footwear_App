import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollectionAddPage } from './collection-add';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    CollectionAddPage,
  ],
  imports: [
    IonicPageModule.forChild(CollectionAddPage),
    IonicSelectableModule
  ],
})
export class CollectionAddPageModule {}
