import { Component, OnInit } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  //Constructor for weather service
  // inject service in constructor
  constructor(private WeatherService: WeatherService){

  }

  // Data that can be refreshed
  weatherData?: WeatherData;
  locationName?: string;


  //Call service
  ngOnInit(): void {

    this.WeatherService.getWeatherData('Victoria BC')
    .subscribe({
      next: (response) => {
        
        this.weatherData = response;

        console.log(response);

      }
    })

  }


  //New Search Input
  search(temp?: string): void {

    this.locationName='';

    this.WeatherService.getWeatherData(temp || 'Victoria BC')
    .subscribe({
      next: (response) => {
        
        this.weatherData = response;

        console.log(response);

      }
    })



  }

  // title = 'WeatherApp';
}


