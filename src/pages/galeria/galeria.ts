import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import firebase from "firebase";
import "firebase/firestore"

@IonicPage()
@Component({
  selector: 'page-galeria',
  templateUrl: 'galeria.html',
})
export class GaleriaPage {

  public images = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public imagePicker: ImagePicker,
    public file : File) {



  }

  openGalaria() {
    this.imagePicker.getPictures({maximumImagesCount : 1 }).then((results) => {
      for (var i = 0; i < results.length; i++) {
        // console.log('Image URI: ' + results[i]);

        let dirPatch = results[i]
        let dirPatchSegment = dirPatch.split('/')
        let name = dirPatchSegment.pop()
        dirPatch = dirPatchSegment.join('/')

        alert(dirPatch)
        alert(name)

        this.file.readAsArrayBuffer(dirPatch, name)
        .then((buffer)=>{
          this.upload(buffer, name)
        })

      }
    }, (err) => { console.log('Error ao abrir a Galeria') });
  }

  upload(buffer, name){
    let blob = new Blob([buffer], {type : 'image/jpeg'})

    let storage = firebase.storage();
    storage.ref('images'+name).put(blob).then(()=>{
      alert('ok')
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GaleriaPage');
  }



}
