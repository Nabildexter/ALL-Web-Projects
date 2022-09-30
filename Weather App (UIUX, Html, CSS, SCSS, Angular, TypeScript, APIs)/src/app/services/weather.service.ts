import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/weather.model';

// https://rapidapi.com/weatherapi/api/weatherapi-com

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient){ 


  }

  // Sending request to API service and setting arguments
  getWeatherData(cityName: string): Observable<WeatherData> {

    return this.http.get<WeatherData>(environment.weatherApiBaseUrl, {
      headers: new HttpHeaders()
      .set(environment.XRapidAPIHostHeaderName, environment.XRapidAPIHostHeaderValue)
      .set(environment.XRapidAPIKeyHeaderName, environment.XRapidAPIKeyHeaderValue),
      params: new HttpParams()
      .set('q', cityName)
    })

  }
}

