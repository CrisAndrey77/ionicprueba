import { Component } from '@angular/core';

import { IonicPage,NavController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(public navCtrl: NavController) {

  }

  openConsole(){
    var boton = document.getElementById('botonprueba');
    console.log('holamundo');
    boton.style.visibility = 'hidden'
  }

  gotoPage(){
    this.navCtrl.push('PaginaPruebaPage');
    console.log('holamundo')
    
  }
}
