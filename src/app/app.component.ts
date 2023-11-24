import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from "./shared/services/auth.service";
import { Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit{
  title = 'MoreProblems.Org';

  public screenWidth = window.innerWidth;
  public screenHeight = window.innerHeight;
  // public toolbarHeight = this.navbar.nativeElement.offsetWidth;
  public mobileWidth = 1000;
  public menuOpen = true;

  profileUploadURL: any = null;
  user_data: any = {};
  
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

  ngOnInit() {
    if (this.authService.userData) {
      // this.profileUploadURL = this.authService.getProfilePic(this.authService.userData);
      this.authService.getProfilePic(this.authService.userData);
      setTimeout(() => {
        console.log(this.authService.pp_url);
        this.profileUploadURL = this.authService.pp_url;
      }, 150);
      this.user_data = this.authService.userData;
    }
  }

}