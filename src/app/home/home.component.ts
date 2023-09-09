import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private http: HttpClient) { }
  city: string = '';

  getWeather() {
    //1. API Call
    var result = this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=32ad84d2a41f15df8af1a765bb38c530&units=metric`);

    //2. Get a Observable
    console.log(result); //observable

    //3. Subscribe to it
    result.subscribe((data: any) => {
      console.log(data['main']['temp']);
    }
    )
  }

}
