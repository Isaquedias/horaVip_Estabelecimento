import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormContactsPage } from './form-contacts';

@NgModule({
  declarations: [
    FormContactsPage,
  ],
  imports: [
    IonicPageModule.forChild(FormContactsPage),
  ],
})
export class FormContactsPageModule {}
