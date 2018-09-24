import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { forEach } from '@firebase/util';
import { CadastroModel } from '../../model/Cadastro.model'
import { DadosPerfilProvider } from '../../providers/dados-perfil/dados-perfil'
import { DadosPerfilModel } from '../../model/DadosPerfil.model'
import firebase from 'firebase'
import "firebase/firestore"

@IonicPage()
@Component({
  selector: 'page-cadastrar',
  templateUrl: 'cadastrar.html',
})
export class CadastrarPage{

  public cadastro: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
    passwordConf: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
  })

  public cadastroModel: CadastroModel
  public dadosPerfil : DadosPerfilModel

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public Toast: ToastController,
    public dadosPerfilCtrl: DadosPerfilProvider,
    public storage : Storage,
    public loadingCtrl : LoadingController
  ) { }


  cadastrar() {
    if (this.cadastro.status === "INVALID") {
      forEach(this.cadastro.value, (element) => {
        this.cadastro.get(element).markAsTouched()
      })
    } else if (this.cadastro.value.password !== this.cadastro.value.passwordConf) {
      forEach(this.cadastro.value, (element) => {
        this.cadastro.get(element).markAsTouched()
      })
    } else {
      //metodo para grava no banco de dados e verificar outros erros
      this.gravaUser()
    }

  }

  async gravaUser() {

    try {
      var loading = this.loadingCtrl.create({
        content: 'Por Favor, aguarde...'
      });
      loading.present();
      let { name, email, password, passwordConf } = this.cadastro.value
      this.cadastroModel = new CadastroModel(name, email, password, passwordConf)

      let user = await firebase.auth().createUserWithEmailAndPassword(this.cadastroModel.email, this.cadastroModel.password)
      await this.atulizarPerfil(name)

      this.getDadosUser()
      await firebase.firestore().collection("user").doc(user.uid).set({nome : 'isaque'})
      
      setTimeout(() => {
        loading.dismiss();
        this.navCtrl.setRoot("MyTabPage")
      }, 3000);
    } catch (err) {
      if (err.code == "auth/email-already-in-use") {
        let error = this.Toast.create({
          message: 'Este e-mail já está e uso',
          duration: 3000
        })
        loading.dismiss();
        error.present();
      }

      console.log('aquiiii ',err)
    }
  }

  async getDadosUser() {
    try {
      this.dadosPerfil = await this.dadosPerfilCtrl.getData()
      console.log('dadps p',this.dadosPerfil)
      this.setDataStorage()

    } catch (error) {
      console.log('errororororo')
    }

  }

  setDataStorage(){
    this.storage.set('displayName',this.dadosPerfil.displayName)
    this.storage.set('email',this.dadosPerfil.email)
    this.storage.set('photoUrl',this.dadosPerfil.photoUrl)
    this.storage.set('emailVerified',this.dadosPerfil.emailVerified)
    this.storage.set('uid',this.dadosPerfil.uid)
  }

  atulizarPerfil(name) {
    return new Promise((res, err) => {
      let namePerfil = (name === null || name === '' || name === undefined ?'': name)
     
      let user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: namePerfil,
        photoURL: null
      }).then(() => {
        res("sucesso")
      }).catch(function (error) {
        err("error")
      });
    })
  }

}