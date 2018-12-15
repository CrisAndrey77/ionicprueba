import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, NavController, NavParams } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import {AngularFireModule} from 'angularfire2'
import {AngularFireDatabaseModule} from 'angularfire2/database'
import {AngularFireAuthModule} from 'angularfire2/auth'
import {AngularFireAuth} from 'angularfire2/auth'
import {FIREBASE_CONFIG} from './firebase.credentials'

import { Geolocation } from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';

import { EmailComposer } from '@ionic-native/email-composer';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    EmailComposer
  ]
})
export class AppModule {}
