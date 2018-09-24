import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import firebase from "firebase";
import "firebase/firestore"


@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  public photoPerfil: any = "assets/imgs/sem-foto.jpg"
  public namePerfil: any
  public UID: string
  public photoURL: any
  public displayName: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public imagePicker: ImagePicker,
    public file: File,
    public modalController: ModalController,
    public storage: Storage
  ) {

    this.getDadosUser()

  }

  ionViewDidEnter() {


  }

  async openGalaria() {

    try {
      let option = { maximumImagesCount: 1 }

      let res = await this.imagePicker.getPictures(option)

      for (var i = 0; i < res.length; i++) {

        let dirPatch = res[i]
        let dirPatchSegment = dirPatch.split('/')
        let name = dirPatchSegment.pop()
        dirPatch = dirPatchSegment.join('/')

        //referencia para salvar a imagem no firebase
        let imgRef = firebase.storage().ref(this.UID + '/' + name)
        alert(this.UID)
        //criando buffer para salvara a imagem
        let buffer = await this.file.readAsArrayBuffer(dirPatch, name)

        await this.upload(buffer, name);


        let url = await imgRef.getDownloadURL()

        await this.atulizarPerfil('', name)

        this.photoPerfil = url

        this.storage.set('photoPerfil', url)

      }
    } catch (ex) {

    }
  }

  upload(buffer, name) {
    return new Promise((res, err) => {
      let blob = new Blob([buffer], { type: 'image/jpeg' })

      let storage = firebase.storage();
      storage.ref(this.UID + '/' + name).put(blob).then(() => {
        res('Imagem enviada')
        err('Erro no envio')
      })
    })
  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Estabelecimento',
      message: "Entre com o novo nom do seu estabelecimento",
      inputs: [
        {
          name: 'displayName',
          placeholder: this.displayName
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            this.atulizarPerfil(data.displayName)
            this.storage.set('displayName', data.displayName)
            this.displayName = data.displayName
          }
        }
      ]
    });
    prompt.present().then(res => {res});
  }

  presentContacts() {
    this.navCtrl.push("FormContactsPage")
  }

  presentEndereco() {
    this.navCtrl.push("FormSalaoPage")
  }

  presentGaleria() {
    this.navCtrl.push("GaleriaPage")
  }


  ionViewDidLoad() {

  }

  async signOut() {
    try {
      this.navCtrl.setRoot("LoginPage")
      await firebase.auth().signOut()

    } catch (error) {
      console.log(error)
    }
  }

  async getDadosUser() {
    try {
      this.displayName = await this.storage.get('displayName')
      this.photoPerfil = await this.storage.get('photoPerfil')
      this.UID = await this.storage.get('uid')

      if (this.photoPerfil === null || this.photoPerfil === undefined)
        this.photoPerfil = 'assets/imgs/sem-foto.jpg'

    } catch (error) {

    }
  }

  atulizarPerfil(name?, photo?) {
    return new Promise((res, err) => {

      this.namePerfil = (name == null || name == '' || name == undefined ? this.namePerfil : name)
      this.photoPerfil = (photo == null || photo == '' || photo == undefined ? this.photoPerfil : photo)

      let user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: this.namePerfil,
        photoURL: this.photoPerfil
      }).then(function () {
        res("sucesso")
      }).catch(function (error) {
        err("error")
      });
    })
  }

}
