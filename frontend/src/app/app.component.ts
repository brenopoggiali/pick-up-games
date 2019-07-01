import { Component } from '@angular/core';
import { User } from './models/user'

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  private logged: boolean = localStorage['token']!== undefined && localStorage['token']!== null && localStorage['token']!== '';
}
