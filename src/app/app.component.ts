import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from "./shared/services/auth.service";
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
  public screenHeight = window.innerHeight;
  // public toolbarHeight = this.navbar.nativeElement.offsetWidth;
  public mobileWidth = 1000;
  public menuOpen = true;

  profileUploadURL: any = null;
  
  constructor(public authService: AuthService) { }

  width_change() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    // this.toolbarHeight = this.navbar.nativElement.offsetWidth;
    if (this.screenWidth > this.mobileWidth) {
      this.menuOpen = false;
    }
    if (this.screenWidth <= this.mobileWidth) {
      this.menuOpen = true;
    }
  }

  menu_toggle() {
    this.menuOpen = !this.menuOpen;
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }


}