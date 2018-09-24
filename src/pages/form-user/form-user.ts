import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import firebase from 'firebase'
import "firebase/firestore"

@IonicPage()
@Component({
  selector: 'page-form-user',
  templateUrl: 'form-user.html'
})
export class FormUserPage {


  constructor(public navCtrl: NavController,
    public navParams: NavParams) {}

  ionViewDidLoad() {
    // this.userPro.getUID().then((res) => {

    //   this.dados.uid = res;
    //   const dbUser = firebase.firestore().collection("user").doc(this.dados.uid)
    //   dbUser.get()
    //     .then((doc) => {
    //       if (doc.exists) {
    //         this.dados.email = doc.data().email
    //         this.dados.name = doc.data().name
    //         this.dados.birth = doc.data().birth
    //         this.dados.genre = doc.data().genre
    //         this.dados.phoneNumber = doc.data().phoneNumber
    //         this.dados.cpf = doc.data().cpf
    //       }
    //     })
    //     .catch(() => {

    //     })

    // })
  }

  ngOnInit(): void {
  }


  pageSalao(f: NgForm) {
    // firebase.firestore().collection("user")
    //   .doc(this.dados.uid)
    //   .set(f.value, { merge: true })
    //   .then(() => {
    //     this.navCtrl.push("FormSalaoPage")
    //   })
    //   .catch((err) => {

    //   })
  }

}
