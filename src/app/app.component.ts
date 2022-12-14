import { Component, OnInit, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent{
  title = 'MoreProblems.Org';

  public screenWidth = window.innerWidth;
  // public toolbarHeight = this.navbar.nativeElement.offsetWidth;
  public mobileWidth = 800;
  public menuOpen = false;
  
  constructor() { }

  width_change() {
    this.screenWidth = window.innerWidth;
    // this.toolbarHeight = this.navbar.nativElement.offsetWidth;
    if (this.screenWidth > this.mobileWidth) {
      this.menuOpen = false;
    }
    if (this.screenWidth <= this.mobileWidth) {
      this.menuOpen = false;
    }
  }

  menu_toggle() {
    this.menuOpen = !this.menuOpen;
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

}