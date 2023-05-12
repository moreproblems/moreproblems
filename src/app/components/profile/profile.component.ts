import { Component, OnInit, Injectable, ElementRef, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AuthService } from "../../shared/services/auth.service";
import { WindowService } from '../../shared/services/window.service';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

@Injectable()
export class ProfileComponent implements OnInit {
  // title = 'More Problems';

  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  mobileWidth = 900;
  menuOpen = false;

  avatars = ['bear', 'boar', 'cat', 'chicken', 'deer', 'dog', 'fox', 'giraffe', 'gorilla', 'horse', 'koala', 'lemur', 'lion', 'llama', 'owl', 'panda', 'rabbit', 'rhino', 'seal', 'shark', 'snake', 'tiger', 'walrus', 'wolf'];
  photoURL = "";

  user: any;
  edit: boolean = false;
  edit_list: { [index: string]: any } = {};
  login_method = "";
  windowRef: any;
  win = new WindowService;

  // constructor(private titleService: Title, private meta: Meta, public authService: AuthService, private win: WindowService, private afAuth: AngularFireAuth) { }
  constructor(private titleService: Title, private meta: Meta, public authService: AuthService, public router: Router, private afAuth: AngularFireAuth) { }

  width_change2() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
  
  toggle_edit() {
    this.edit = !this.edit;
    this.edit_list = [];
    this.photoURL = this.authService.userData.photoURL;
  }

  edit_profile(field: string, val: string) {
    this.edit_list[field] = val;
  }

  edit_profile_pic(avatar: string) {
    this.photoURL = '/assets/icons/user/' + avatar + '.png';
    this.edit_list['photoURL'] = this.photoURL;
  }

  update_profile() {
    this.authService.UpdateUserData(this.edit_list).then(() => {
      // setTimeout(function () {
      //   location.reload();
      // }, 50);
    });
  }
  
  scroll_top() {
    setTimeout(function () {
      window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    }, 250);
  }

  scroll_bottom() {
    setTimeout(function () {
      window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
    }, 250);
  }

  scroll(el: HTMLElement) {
    setTimeout(function () {
      el.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  }

  scroll2(el: HTMLElement) {
    setTimeout(function () {
      window.scrollTo({ left: 0, top: el.getBoundingClientRect().top - 120, behavior: 'smooth' });
    }, 250);
  }

  ngOnInit() {
    this.titleService.setTitle("Your Profile On MoreProblems.Org | U.S. K-12 State Testing Preparation");
    // this.meta.updateTag({ name: 'description', content: "" });
    setTimeout(() => {
      if (!this.authService.userData) {
        this.router.navigate(['login']);
      }}, 250);
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      // 'callback': (response) => {
      //   // reCAPTCHA solved, allow signInWithPhoneNumber.
      //   // onSignInSubmit();
      // }
    }, getAuth());
  }
}