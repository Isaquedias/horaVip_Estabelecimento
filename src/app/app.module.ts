import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ReactiveFormsModule }   from '@angular/forms';
import { MyApp } from './app.component';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { IonicStorageModule } from '@ionic/storage';
import { DadosPerfilProvider } from '../providers/dados-perfil/dados-perfil';
import { ViacepProvider } from '../providers/viacep/viacep';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    File,
    ImagePicker,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DadosPerfilProvider,
    ViacepProvider,
  ]
})
export class AppModule {}
