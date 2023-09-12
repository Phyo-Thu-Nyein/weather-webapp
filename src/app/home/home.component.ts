import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // FIRST THING FIRST, INJECT HTTP 
  constructor(private http: HttpClient) { }
  city: string = ''; // Mandalay
  temp: string = ''; //26.7
  main: string = '';
  desc: string = ''; //overcast clouds
  icon: string = '';
  speed: string = ''; //3.07
  country: string = ''; //MM
  visibility: string = ''; //10000
  humidity: string = ''; //50

  getWeather() {
    //1. API Call
    var result = this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=32ad84d2a41f15df8af1a765bb38c530&units=metric`);

    //2. Get a Observable
    console.log(result); //observable

    //3. Subscribe to it
    result.subscribe((data: any) => {
      this.city = data['name'];
      this.temp = data['main']['temp'];
      this.main = data['weather'][0]['main'];
      this.desc = data['weather'][0]['description'];
      this.icon = data['weather'][0]['icon'];
      this.speed = data['wind']['speed'];
      this.country = data['sys']['country'];
      this.visibility = data['visibility'];
      this.humidity = data['weather'][0]['humidity'];

    }
    )
  }

}
