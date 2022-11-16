import { Component, OnInit, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent{
  title = 'More Problems';

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }
}