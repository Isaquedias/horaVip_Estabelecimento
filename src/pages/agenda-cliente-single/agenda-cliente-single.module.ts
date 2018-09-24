import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendaClienteSinglePage } from './agenda-cliente-single';

@NgModule({
  declarations: [
    AgendaClienteSinglePage,
  ],
  imports: [
    IonicPageModule.forChild(AgendaClienteSinglePage),
  ],
})
export class AgendaClienteSinglePageModule {}
