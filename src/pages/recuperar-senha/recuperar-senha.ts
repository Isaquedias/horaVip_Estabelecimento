import { Component } from '@angular/core';
import { IonicPage, ToastController, NavController, NavParams } from 'ionic-angular';
import { LoginModel } from '../../model/Login.model'
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-recuperar-senha',
  templateUrl: 'recuperar-senha.html',
})
export class RecuperarSenhaPage {

  public login = {} as LoginModel

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public Toast: ToastController,
    public afAuth: AngularFireAuth) {

    var user = this.afAuth.auth.currentUser

    if (user != null) {
      this.login.email = user.email;
    } else {
      this.login.email = ""
    }

  }

  public RedefinirSenha() {

    this.afAuth.auth.sendPasswordResetEmail(this.login.email)
      .then((data) => {
        let send = this.Toast.create({
          message: 'Verificação enviado por email',
          showCloseButton: true,
          closeButtonText: "OK"
        })
        send.present()
        this.navCtrl.pop()
      })
      .catch((err) => {
        let send = this.Toast.create({
          message: 'Email invalido',
          showCloseButton: true,
          closeButtonText: "OK",
          dismissOnPageChange: true
        })
        send.present();
      })

  }


}
