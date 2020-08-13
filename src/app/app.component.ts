import { Component, OnChanges } from '@angular/core';
import {spinnerWorks} from "./import.js"
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { faTint, faWind } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faSync = faSync;
  faTint = faTint;
  faWind = faWind;
  formCity: String;
  formCountry: String;
  weatherState: any = "Nothing searched yet!";
  reloadSpinner: boolean = false;
  filtered: any;
  letterCelsius: boolean = true;
  units: string = "metric";
   // Write the functions that hit the API. You’re going to want functions that can take a location and return the weather data for that location. For now, just console.log() the information.

  constructor() {
    // this.getWeather("münster","germany");

    this.getWeather("Münster","Germany");
 
 


  }




  async getWeather(town,country) {
    // spinnerWorks.spin(document.getElementById('container'));
    this.reloadSpinner = true;
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${town},${country}&APPID=10e913130e75c308b518d5e8710fb645&units=${this.units}`);

    const weatherData = await response.json();

    // spinnerWorks.stop();
    
    // console.log(weatherData);


    let weatherArr = {clouds: weatherData.clouds.all, temp: weatherData.main.temp, place: weatherData.name, country: weatherData.sys.country}

    console.log(weatherArr);

    this.weatherState = weatherArr;
    this.weatherState.temp = Math.round(this.weatherState.temp);
    await this.timeout(2000);
    this.reloadSpinner = false;



  }

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));



}





  
}
