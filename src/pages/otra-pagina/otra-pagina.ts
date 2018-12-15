import { Component,ViewChild, ElementRef,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation,GeolocationOptions } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { PlacesPage } from '../places/places';

/**
 * Generated class for the OtraPaginaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-otra-pagina',
  templateUrl: 'otra-pagina.html',
})
export class OtraPaginaPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  GoogleAutocomplete :any;
  autocomplete :any;
  autocompleteItems:any;
  geocoder:any;
  markers:any;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public zone: NgZone, public geolocation: Geolocation,public loadingCtrl: LoadingController) {
  
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];

    this.geocoder = new google.maps.Geocoder;
    this.markers = [];
    this.loading = this.loadingCtrl.create();
     
  }

  ionViewDidEnter(){
    //Set latitude and longitude of some place
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.9011, lng: -56.1645 },
      zoom: 15
    });
  }


  updateSearchResults(){
    debugger;
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

  selectSearchResult(item){
    this.clearMarkers();
    this.autocompleteItems = [];
  
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        let position = {
            lat: results[0].geometry.location.lat,
            lng: results[0].geometry.location.lng
        };
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    })
  }

  tryGeolocation(){
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.clearMarkers();//remove previous markers

    this.geolocation.getCurrentPosition().then((resp) => {
      let pos = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      let marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        title: 'I am here!'
      });
      this.markers.push(marker);
      this.map.setCenter(pos);
      this.loading.dismiss();

    }).catch((error) => {
      console.log('Error getting location', error);
      this.loading.dismiss();
    });
  }

  clearMarkers(){
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i])
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  nearbyPlaces(){
    this.navCtrl.push('PlacesPage')
  }

}
