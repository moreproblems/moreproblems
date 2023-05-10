import { Component, OnInit, Injectable, ElementRef, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AuthService } from "../../shared/services/auth.service";
import { WindowService } from '../../shared/services/window.service';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {
  // title = 'More Problems';
  user: any;
  windowRef: any;
  login_method = "";
  win = new WindowService;

  // constructor(private titleService: Title, private meta: Meta, public authService: AuthService, private win: WindowService, private afAuth: AngularFireAuth) { }
  constructor(private titleService: Title, private meta: Meta, public authService: AuthService, public router: Router, private afAuth: AngularFireAuth) { }

  toggle_login_method(mthd: string) {
    if (this.login_method != mthd) {
      this.login_method = mthd;
    }
    else {
      this.login_method = "";
    }
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

  sendLoginCode(phone: string) {
    const appVerifier = this.windowRef.recaptchaVerifier;

    this.afAuth
      .signInWithPhoneNumber(phone, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
      })
      .catch(error => console.log('error', error));
  }

  verifyLoginCode(code: string) {
    this.windowRef.confirmationResult
      .confirm(code)
      .then((result: any) => {
        this.user = result.user;
        console.log(result);
      })
      .catch((error: any) => console.log(error, 'Incorrect code entered?'));
  }

  ngOnInit() {
    this.titleService.setTitle("Log In To MoreProblems.Org | U.S. K-12 State Testing Preparation");
    // this.meta.updateTag({ name: 'description', content: "" });
    this.authService.AuthRoute();
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