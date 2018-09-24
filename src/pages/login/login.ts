import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, MenuController } from 'ionic-angular';
import { LoginModel } from '../../model/Login.model'
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DadosPerfilProvider } from '../../providers/dados-perfil/dados-perfil'
import { DadosPerfilModel } from '../../model/DadosPerfil.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';

import firebase from "firebase";
import "firebase/firestore"
import { forEach } from '@firebase/util';
import { TestScheduler } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
  })

  public login: LoginModel
  public dadosPerfil: DadosPerfilModel
  public photoPerfil: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public Toast: ToastController,
    public storage: Storage,
    public viewController: ViewController,
    public dadosPerfilCtrl: DadosPerfilProvider,
    public loadingCtrl: LoadingController,
    public menu: MenuController) {

    this.menu.enable(false)
  }


  async loginIn() {

    try {

      let { email, password } = this.loginForm.value

      if (this.loginForm.status === "INVALID") {
        forEach(this.loginForm.value, (element) => {
          this.loginForm.get(element).markAsTouched()
        })
      } else {
        //metodo para grava no banco de dados e verificar outros erros
        var loading = this.loadingCtrl.create({
          content: 'Por Favor, aguarde...'
        });

        loading.present();
        await firebase.auth().signInWithEmailAndPassword(email, password);
        this.getDadosUser()

        setTimeout(() => {
          loading.dismiss();
          this.navCtrl.setRoot("MyTabPage")
        }, 3000);
      }

    } catch (ex) {
      loading.dismiss();
      let error = this.Toast.create({
        message: 'Email ou senha incorreta',
        duration: 3000
      })
      error.present();
    }
  }

  public redefinirSenha() {
    this.navCtrl.push("RecuperarSenhaPage")
  }


  public cadastrar() {
    this.navCtrl.push("CadastrarPage")
  }

  async getDadosUser() {
    try {
      this.dadosPerfil = await this.dadosPerfilCtrl.getData()
      this.photoPerfil = await this.dadosPerfilCtrl.getPhotoPerfil()
      this.setDataStorage()

    } catch (error) {
      this.dadosPerfil = await this.dadosPerfilCtrl.getData()
      this.setDataStorage()
      console.log("errorrrrr", this.dadosPerfil)
    }

  }

  setDataStorage() {
    this.storage.set('displayName', this.dadosPerfil.displayName)
    this.storage.set('email', this.dadosPerfil.email)
    this.storage.set('photoUrl', this.dadosPerfil.photoUrl)
    this.storage.set('emailVerified', this.dadosPerfil.emailVerified)
    this.storage.set('uid', this.dadosPerfil.uid)
    this.storage.set('photoPerfil', this.photoPerfil)
  }


}


