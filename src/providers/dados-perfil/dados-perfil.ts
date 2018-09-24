import { Injectable } from '@angular/core';
import {DadosPerfilModel} from '../../model/DadosPerfil.model'
import firebase from "firebase";
import "firebase/firestore"

@Injectable()
export class DadosPerfilProvider {

  constructor() {
    console.log('Hello DadosPerfilProvider Provider');
  }

  getData(): Promise<DadosPerfilModel> {
    return new Promise((res, err) => {
      let user = firebase.auth().currentUser;
      if (user !== null) {
        let data = new DadosPerfilModel(user.displayName, user.email,user.photoURL,user.emailVerified,user.uid)
        res(data)
      }else{
        err("Erro na promisse do provider DadosPerfilProvider")
      }
    })
  }

  getPhotoPerfil() : Promise<string>{
    return new Promise((res,err)=>{
      this.getData().then((data)=>{
        let ref = firebase.storage().ref(data.uid+'/'+data.photoUrl)
        let donwload = ref.getDownloadURL().then((img)=>{
          res(img)
        }).catch((erro)=>{
          err("imagem não encontrada")
        })
      })
    })
  }

}
