import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { MenuModel } from "../model/Menu.model";
import { Storage } from "@ionic/storage";
import { FirebaseInit } from "./firebaseInit";
import firebase from "firebase";
import "firebase/firestore";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav)
  nav: Nav;

  public rootPage: string;
  public pages: Array<MenuModel>;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public storage: Storage
  ) {
    new FirebaseInit();

    //Menu
    this.pages = [
      { title: "Meus Dados", page: "MeusDadosPage", icon: "" },
      { title: "Configuração", page: "ConfigPage", icon: "" },
      { title: "Suporte", page: "SuportePage", icon: "" },
      { title: "Sobre", page: "SobrePage", icon: "" }
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.isOnline().then(data => {
        if (data) {
          this.rootPage = "MyTabPage";
        } else {
          this.rootPage = "ApresentacaoPage";
        }
      });
    });
  }

  public irPage(page: { title: string; page: string }) {
    this.nav.push(page.page);
  }

  isOnline(): Promise<boolean> {
    return new Promise<boolean>((res, err) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user !== null) {
          res(true);
        } else {
          res(false);
        }
        err("err");
      });
    });
  }

  async signOut() {
    try {
      await this.nav.setRoot("LoginPage");
      await this.storage.clear();
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error);
    }
  }
}
