import { Component, Inject,ViewChild } from '@angular/core';
import { Platform, MenuController, Nav,NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AngularFireAuth} from 'angularfire2/auth'



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage:any = 'HelloIonicPage';
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private angularFireAuth: AngularFireAuth
  ) {
    this.initializeApp();

    // set our app's pages

    //Esto sirve para el menu desplegable de la izquierda del menu principal
    this.pages = [
      { title: 'Hello Ionic', component: 'HelloIonicPage' },
      { title: 'My First List', component: 'ListPage' },
      { title: 'My First List', component: 'PaginaPruebaPage'},
      { title: 'My First List', component: 'OtraPaginaPage' },
      { title: 'My First List', component: 'FormularioPage'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.angularFireAuth.auth.onAuthStateChanged(function(user) {

        /*if(user){
          this.rootPage = 'HomePage';
        }
        else {
          this.rootPage = 'LoginPage';
        }*/
      
      }
      
      );
    });
  }

  /*ngOnInit(){
    this.nav.push(this.rootPage)
  }*/

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
