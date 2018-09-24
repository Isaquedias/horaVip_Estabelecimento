import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';

/**
 * Generated class for the MyTabPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-tab',
  templateUrl: 'my-tab.html'
})
export class MyTabPage {

  homeRoot1 = 'HomePage'
  homeRoot2 = 'AgendaPage'
  homeRoot3 = 'HomePage'
  homeRoot4 = 'HomePage'


  constructor(public navCtrl: NavController,
    public menu: MenuController) {
      this.menu.enable(true)

    }

}
