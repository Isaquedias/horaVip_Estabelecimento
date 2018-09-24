import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { forEach } from '@firebase/util';
import { FormContatoModel} from '../../model/FormContato.model'
import firebase from 'firebase'
import "firebase/firestore"

@IonicPage()
@Component({
  selector: 'page-form-contacts',
  templateUrl: 'form-contacts.html',
})
export class FormContactsPage {

  public uid : string;
  public formContatoModel : FormContatoModel

  public contatoForm: FormGroup = new FormGroup({
    celular: new FormControl(null),
    whatsap: new FormControl(null),
    fixo: new FormControl(null)
  })

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage : Storage,
    public loadingCtrl : LoadingController) {

    this.storage.get('uid').then((uidData) => {
      this.uid = uidData
    })
  }

  ionViewDidEnter() {
    console.log(this.uid)
    var loading = this.loadingCtrl.create({
      content: 'Por Favor, aguarde...'
    });
    loading.present()

    firebase.firestore().collection('contato').doc(this.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.contatoForm.get('celular').setValue(doc.data().celular)
          this.contatoForm.get('fixo').setValue(doc.data().fixo)
          this.contatoForm.get('whatsap').setValue(doc.data().whatsap)

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

  async send() {
    var loading = this.loadingCtrl.create({
      content: 'Por Favor, aguarde...'
    });
    loading.present()

    try {

      console.log('formclass',this.contatoForm.value)
      
      let { fixo, celular, whatsap } = this.contatoForm.value

      this.formContatoModel = new FormContatoModel(whatsap, fixo, celular)
      console.log(this.formContatoModel)
      let data = JSON.parse(JSON.stringify(this.formContatoModel))
      await firebase.firestore().collection('contato').doc(this.uid).set(data)
      setTimeout(() => {
        this.navCtrl.pop()
        loading.dismiss();
      }, 3000);
    
    } catch (ex) {
      setTimeout(() => {
        loading.dismiss();
      }, 3000);
    }

  }



  dismiss() {
    this.viewCtrl.dismiss();
  }

}
