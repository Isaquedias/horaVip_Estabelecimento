import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyTabPage } from './my-tab';

@NgModule({
  declarations: [
    MyTabPage,
  ],
  imports: [
    IonicPageModule.forChild(MyTabPage),
  ]
})
export class MyTabPageModule {}
