import { Component, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../service/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnDestroy {
  // FIRST THING FIRST, INJECT HTTP
  constructor(private apiService: ApiService) {}
  city: string = 'Yangon';
  temp: number = 26.7;
  main: string = '';
  desc: string = 'overcast clouds';
  icon: boolean = true;
  icon_path: string = 'wi-owm-800';
  speed: string = '3.07';
  country: string = 'MM';
  visibility: number = 10;
  humidity: string = '50';

  error: boolean = false;
  error_code?: number;
  error_msg?: string;

  bg_img: string = '../../assets/img/cloudy.jpg';

  weatherSub: Subscription = new Subscription();

  getWeather() {
    //1. API Call & 2. Get an Observable
    var result = this.apiService.apiCall(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=32ad84d2a41f15df8af1a765bb38c530&units=metric`
    );
    console.log(result); //observable

    //3. Subscribe to it
    this.weatherSub = result.subscribe({
      next: (data: any) => {
        this.city = data['name'];
        this.temp = data['main']['temp'];
        this.humidity = data['main']['humidity'];
        this.main = data['weather'][0]['main'];
        this.desc = data['weather'][0]['description'];
        this.speed = data['wind']['speed'];
        this.country = data['sys']['country'];
        this.visibility = data['visibility'];
        this.visibility = this.visibility / 1000;

        //GET IMAGE & WEATHER ICON
        if (this.temp <= 16) {
          this.bg_img = '../../assets/img/snowy.jpg';
          this.icon_path = 'wi-snow';
          // this.icon = true;
          // this.icon.classList.add("wi-snow-wind");
        } else if (this.temp > 16 && this.temp <= 30) {
          this.bg_img = '../../assets/img/rainy.jpg';
          this.icon_path = 'wi-night-sprinkle';
        } else {
          this.bg_img = '../../assets/img/sunny.jpg';
          this.icon_path = 'wi-day-sunny-overcast';
          // "wi-day-sunny-overcast" "wi-owm-800"
        }
        this.error = false;
      },
      error: (err: HttpErrorResponse) => {
        console.log('Hello Error');
        this.error = true;
        this.error_code = err.error.cod;
        this.error_msg = err.error.message;
      }
      
    });
  }
  //4.Unsubscribe on fast api calls
  ngOnDestroy() {
    if (this.weatherSub) {
      this.weatherSub.unsubscribe;
    }
  }
}
