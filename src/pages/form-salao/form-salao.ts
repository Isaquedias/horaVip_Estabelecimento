import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { FormEnderecoModel } from './../../model/FormEndereco.model'
import { ViacepProvider } from '../../providers/viacep/viacep'
import { ViaCepModel } from '../../model/ViaCep.model'
import { Storage } from '@ionic/storage';
import { forEach } from '@firebase/util';
import firebase from 'firebase'
import "firebase/firestore"

@IonicPage()
@Component({
  selector: 'page-form-salao',
  templateUrl: 'form-salao.html'
})
export class FormSalaoPage {

  public keyDoc: string = ""
  public uid: string = ""
  public cidade: any
  public viaCepData: ViaCepModel
  public cepValidate: boolean = false
  public formEnderecoModel: FormEnderecoModel

  public enderecoForm: FormGroup = new FormGroup({
    cep: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    rua: new FormControl(null, [Validators.required]),
    complemento: new FormControl(null, [Validators.required]),
    bairro: new FormControl(null, [Validators.required]),
    cidade: new FormControl(null, [Validators.required]),
    estado: new FormControl(null, [Validators.required]),
    numero: new FormControl(null, [Validators.required]),
  })

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public viacep: ViacepProvider,
    public storage: Storage) {

    //pegar id unico do usuario no storage
    this.storage.get('uid').then((uidData) => {
      this.uid = uidData
    })
  }

  ionViewDidEnter() {
    var loading = this.loadingCtrl.create({
      content: 'Por Favor, aguarde...'
    });
    loading.present()

    firebase.firestore().collection('endereco').doc(this.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.cepValidate = true
          forEach(this.enderecoForm.value, (element) => {
            this.enderecoForm.get(element).markAsTouched()
          })

          this.enderecoForm.get('rua').setValue(doc.data().rua)
          this.enderecoForm.get('bairro').setValue(doc.data().bairro)
          this.enderecoForm.get('cidade').setValue(doc.data().cidade)
          this.enderecoForm.get('complemento').setValue(doc.data().complemento)
          this.enderecoForm.get('estado').setValue(doc.data().estado)
          this.enderecoForm.get('cep').setValue(doc.data().cep)
          this.enderecoForm.get('numero').setValue(doc.data().numero)

          setTimeout(() => {
            loading.dismiss();
          }, 1000);

        }else{
          setTimeout(() => {
            loading.dismiss();
          }, 1000);
        }
      }).catch((ex)=>{
        console.log("error")
      })
  }


  getCep(cep) {
    var cepValue: string = cep.value
    var loading = this.loadingCtrl.create({
      content: 'Por Favor, aguarde...'
    });
    loading.present()

    var setTimeFunc = setTimeout(() => {
      loading.dismiss();
    }, 3000);

    if (cepValue.length === 8) {
      let cepValue: string = cep.value
      let cepHttp = this.viacep.get(cepValue)
        .then((cepHttp) => {
          if (cepHttp.erro === undefined) {
            this.enderecoForm.get('rua').setValue(cepHttp.logradouro)
            this.enderecoForm.get('bairro').setValue(cepHttp.bairro)
            this.enderecoForm.get('cidade').setValue(cepHttp.localidade)
            this.enderecoForm.get('complemento').setValue(cepHttp.complemento)
            this.enderecoForm.get('estado').setValue(cepHttp.uf)

            this.cepValidate = true
            setTimeFunc;

          } else {
            this.cepValidate = false
            this.enderecoForm.get('rua').setValue('')
            this.enderecoForm.get('bairro').setValue('')
            this.enderecoForm.get('cidade').setValue('')
            this.enderecoForm.get('complemento').setValue('')
            this.enderecoForm.get('estado').setValue('')
            this.enderecoForm.get('numero').setValue('')
            setTimeFunc;
            console.log('não existe')
          }
        }).catch((e) => {

          setTimeFunc;
          console.log('erro não execução')
        })
    } else {
      this.cepValidate = false
      this.enderecoForm.get('rua').setValue('')
      this.enderecoForm.get('bairro').setValue('')
      this.enderecoForm.get('cidade').setValue('')
      this.enderecoForm.get('complemento').setValue('')
      this.enderecoForm.get('estado').setValue('')
      this.enderecoForm.get('numero').setValue('')
      setTimeFunc;
    }
  }


  async send() {
    var loading = this.loadingCtrl.create({
      content: 'Por Favor, aguarde...'
    });
    loading.present()

    setTimeout(() => {
      loading.dismiss();
    }, 3000);

    try {
      forEach(this.enderecoForm.value, (element) => {
        this.enderecoForm.get(element).markAsTouched()
      })

      if (this.cepValidate && this.enderecoForm.get('cep').valid && this.enderecoForm.get('cep').touched && this.enderecoForm.status === "VALID") {

        let { rua, cep, cidade, bairro, estado, numero, complemento } = this.enderecoForm.value

        this.formEnderecoModel = new FormEnderecoModel(rua, cep, cidade, bairro, estado, numero, complemento)
        let data = JSON.parse(JSON.stringify(this.formEnderecoModel))
        await firebase.firestore().collection('endereco').doc(this.uid).set(data)
        setTimeout(() => {
          this.navCtrl.pop()
          loading.dismiss();
        }, 3000);
        
      } else {
        this.cepValidate = false
        this.enderecoForm.get('rua').setValue('')
        this.enderecoForm.get('bairro').setValue('')
        this.enderecoForm.get('cidade').setValue('')
        this.enderecoForm.get('complemento').setValue('')
        this.enderecoForm.get('estado').setValue('')
        this.enderecoForm.get('numero').setValue('')
        setTimeout(() => {
          loading.dismiss();
        }, 3000);
      }
    } catch (ex) {
      setTimeout(() => {
        loading.dismiss();
      }, 3000);
    }

  }

}