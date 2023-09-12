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
  city: string = 'Alaska';
  temp: number = 26.7;
  main: string = '';
  desc: string = 'overcast clouds';
  icon: boolean = true;
  icon_path: string = 'wi-owm-800';
  speed: string = '3.07';
  country: string = 'MM';
  visibility: string = '10000';
  humidity: string = '50';

  error_txt: string = 'error text appears here!';

  bg_img: string = '../../assets/img/cloudy.jpg';

  getWeather() {
    //1. API Call
    var result = this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=32ad84d2a41f15df8af1a765bb38c530&units=metric`);

    //2. Get a Observable
    console.log(result); //observable

    //3. Subscribe to it
    result.subscribe((data: any) => {
      this.city = data['name'];
      this.temp = data['main']['temp'];
      this.humidity = data['main']['humidity'];
      this.main = data['weather'][0]['main'];
      this.desc = data['weather'][0]['description'];
      this.speed = data['wind']['speed'];
      this.country = data['sys']['country'];
      this.visibility = data['visibility'];


      // error_txt MSG 
      this.error_txt = data['cod'];
      console.log(this.error_txt);
      if (this.error_txt != '404') {
        this.error_txt = "sorry soory sorry sorry"
      }
      console.log(this.error_txt);


      console.log(this.main);

    //GET IMAGE & WEATHER ICON
    if (this.temp <= 16) {
      this.bg_img = "../../assets/img/snowy.jpg";
      this.icon_path = "wi-snow";
      // this.icon = true;
      // this.icon.classList.add("wi-snow-wind");
    }
    else if (this.temp > 16 && this.temp <= 30) {
      this.bg_img = "../../assets/img/rainy.jpg";
      this.icon_path = "wi-night-sprinkle"

    }
    else {
      this.bg_img = "../../assets/img/sunny.jpg";
      this.icon_path = "wi-day-sunny-overcast";
      // "wi-day-sunny-overcast" "wi-owm-800"
    }
      
      
    }
    )
    // GET ICON 
    // wont work this way "document.getElementsByClassName('wi')"!!!!

  //  let icon = document.getElementsByClassName('wi')[1];
  //  if (this.temp <= 16) {
  //    icon.classList.add('wi-snow-wind');
  //    // this.icon.classList.add("wi-snow-wind");
  //  }
  //  else if (this.temp > 16 && this.temp <= 30) {
  //    this.bg_img = "../../assets/img/rainy.jpg";
  //    icon.classList.add('wi-rain-wind');
  //  }
  //  else {
  //    this.bg_img = "../../assets/img/sunny.jpg";
  //    icon.classList.add('wi wi-night-sprinkle');
  //  }

 

  }

}
