import { Component, OnInit, Injectable, ElementRef, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AuthService } from "../../shared/services/auth.service";
import { WindowService } from '../../shared/services/window.service';
import firebase from 'firebase/app';
import * as auth from 'firebase/auth';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { getDatabase, ref, set, get, child, update } from "firebase/database";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NgOtpInputModule } from  'ng-otp-input';

// import {
//   SearchCountryField,
//   TooltipLabel,
//   CountryISO
// } from "ngx-intl-tel-input";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {
  // title = 'More Problems';
  user: any;
  otp: string = '';
  verify: any
  windowRef: any;
  login_method = "";
  win = new WindowService;

  // this.window.recaptchaVerifier = new this.afAuth.RecaptchaVerifier('sign-in-button', {
  //   'size': 'invisible',
  //   'callback': (response) => {
  //     // reCAPTCHA solved, allow signInWithPhoneNumber.
  //     onSignInSubmit();
  //   }
  // }, auth);

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
    // const appVerifier = this.windowRef.recaptchaVerifier;
    // const num = `+${phone}`;
    const appVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      // 'callback': (response) => {
      //   // reCAPTCHA solved, allow signInWithPhoneNumber.
      //   // onSignInSubmit();
      // }
    }, getAuth());
    this.afAuth
      .signInWithPhoneNumber(phone, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
        console.log(result);
      })
      .catch((error: any) => window.alert(error.message));
  }

  verifyLoginCode(code: string) {
    this.windowRef.confirmationResult
      .confirm(code)
      .then((result: any) => {
        this.user = result.user;
        // check if user in database, write user data
        this.authService.userData = this.user;
        console.log(result);
      })
      .catch((error: any) => console.log(error, 'Incorrect code entered?'));
    // get(child(ref(getDatabase()), '/users/' + this.user.uid)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //     this.authService.userData = snapshot.val();
    //   } else {
    //     console.log("No data available");
    //     this.authService.WriteUserData(this.user, "");
    //     this.authService.SetUserData(this.user);
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
  }

  onOtpChange(otpCode: any) {
    this.otp = otpCode;
  }

  // handleClick() {
  //   var credentials = auth.PhoneAuthProvider.credential(this.verify, this.otp);
  //   this.afAuth.signInWithCredential(credentials)
  //   .then((response: any) => {
  //     console.log(response);
  //   })
  // }

  ngOnInit() {
    this.titleService.setTitle("Log In To MoreProblems.Org | U.S. K-12 State Testing Preparation");
    // this.meta.updateTag({ name: 'description', content: "" });
    setTimeout(() => {
      this.authService.AuthRoute();
      }, 250);
    this.windowRef = this.win.windowRef;
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
  }
}