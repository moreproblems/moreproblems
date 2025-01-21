import { Component, OnInit, AfterViewInit, Injectable, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AuthService } from "../../shared/services/auth.service";
import { WindowService } from '../../shared/services/window.service';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { getDatabase, ref, set, get, child, update } from "firebase/database";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import intlTelInput from 'intl-tel-input';

import 'node_modules/intl-tel-input/build/css/intlTelInput.css';

const confetti = require('canvas-confetti').default;

const confettiCanvas = document.getElementById('confettiCanvas');
const confettiHandler = confetti.create(confettiCanvas, {
  resize: true,
  useWorker: true,
});

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})

@Injectable()
export class JoinComponent implements OnInit, AfterViewInit {
  // title = 'More Problems';

  screenHeight = window.innerHeight;
  screenWidth = window.innerWidth;
  mobileWidth = 1000;
  blank = " ";

  valid_code: boolean = false;
  search_class_result: any = {};
  search_class: boolean = false;

  iti: any;
  user: any;
  phone: string = "";
  iti_msg: string = "";
  otp: string = "";
  verify: any;
  windowRef: any;
  login_method = "";
  user_role = "";
  win = new WindowService;

  @ViewChild('userPhone') userPhone: ElementRef;

  constructor(private titleService: Title, private meta: Meta, public authService: AuthService, public router: Router, private afAuth: AngularFireAuth) { }

  width_change2() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  set_user_role(role: string) {
    if (this.user_role != role) {
      this.user_role = role;
    }
    else {
      this.user_role = "";
    }
  }

  set_login_method(mthd: string) {
    if (this.login_method != mthd) {
      this.login_method = mthd;
    }
    else {
      this.login_method = "";
    }
    setTimeout(() => {
      this.iti = intlTelInput(this.userPhone.nativeElement, {
        allowDropdown: true,
        autoPlaceholder: "aggressive",
        placeholderNumberType: "FIXED_LINE_OR_MOBILE",
        nationalMode: true,
        formatOnDisplay: true,
        initialCountry: 'auto',
        geoIpLookup: callback => {
          fetch("https://ipapi.co/json")
            .then(res => res.json())
            .then(data => callback(data.country_code))
            .catch(() => callback("us"));
        },
        utilsScript: "node_modules/intl-tel-input/build/js/utils.js",
        // onlyCountries: ['JP'],
        separateDialCode: true,
      });
    }, 10);
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

  confetti_light() {
    setTimeout(function () {
      confettiHandler({
        particleCount: 200,
        startVelocity: 125,
        scalar: 1.15,
        ticks: 150,
        decay: 0.8,
        angle: 90,
        spread: 60,
        origin: { x: 0.5, y: 1 }
      });
    }, 500);

  }

  check_code(code: string) {
    if (code.length >= 5) {
      this.valid_code = true;
      this.search_id(code.toUpperCase());
    }
    else {
      this.valid_code = false;
    }
    return (code.toUpperCase())
  }

  search_id(id: string) {
    this.search_class_result = (this.authService.searchClassId(id) as any);
    setTimeout(() => {
      this.search_class_result = (this.authService.searchClassId(id) as any);
      console.log(this.search_class_result);
      if (Object.keys(this.search_class_result).length > 0) {
        this.search_class = true;
      }
      else {
        this.search_class = false;
      }
    }, 250);
  }

  sendLoginCode(phone: string) {
    const appVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      // 'callback': (response) => {
      //   // reCAPTCHA solved, allow signInWithPhoneNumber.
      //   // onSignInSubmit();
      // }
    }, getAuth());
    const intlPhone = '+' + ""+this.iti.getSelectedCountryData().dialCode + phone;
    if (phone != '') {
      this.afAuth
        .signInWithPhoneNumber(intlPhone, appVerifier)
        .then(result => {
          this.windowRef.confirmationResult = result;
          console.log(result);
        })
        .catch((error: any) => window.alert(error.message));
    } else {
      this.iti_msg = "Please enter a valid number below";
      window.alert(this.iti_msg);
    }
    // this.phone = phone;
  }

  verifyLoginCode(phone: string, code: string, role: string) {
    const appVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      // 'callback': (response) => {
      //   // reCAPTCHA solved, allow signInWithPhoneNumber.
      //   // onSignInSubmit();
      // }
    }, getAuth());
    this.windowRef.confirmationResult
      .confirm(code)
      .then((result: any) => {
        this.user = result.user;
        // check if user in database, write user data
        // this.authService.userData = this.user;
        this.authService.WriteUserData(this.user, role);
        this.authService.SetUserData(this.user);
        // console.log(this.user);
        // console.log(result);
      })
      .catch((error: any) => window.alert(error));
    // get(child(ref(getDatabase()), '/users/' + this.user.uid)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //     this.authService.userData = snapshot.val();
    //   } else {
    //     console.log("No data available");
    //     this.authService.WriteUserData(this.user, this.user_role);
    //     this.authService.SetUserData(this.user);
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
  }

  onOtpChange(otpCode: any) {
    this.otp = otpCode;
  }

  ngAfterViewInit() {
    
  }

  ngOnInit() {
    this.titleService.setTitle("Join Your Class On MoreProblems.Org | U.S. K-12 State Testing Preparation");
    // this.meta.updateTag({ name: 'description', content: "" });
    // setTimeout(() => {
    //   this.authService.AuthRoute('profile');
    // }, 250);
    this.windowRef = this.win.windowRef;
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
  }
}