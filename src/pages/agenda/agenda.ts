import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AgendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage {

  private mon = new Array(
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro' );

    public mes : any;
    public dia : any;
    public ano : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let now = new Date();
    this.mes = this.mon[now.getMonth()];
    this.dia = now.getDate();
    this.ano = now.getFullYear();

  }

  irPagina(){
    this.navCtrl.push("AgendaClientePage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendaPage');
  }

}
