import { Component, OnInit, Injectable, ElementRef, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AuthService } from "../../shared/services/auth.service";
import { WindowService } from '../../shared/services/window.service';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { getDatabase, ref, set, get, child, update } from "firebase/database";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

const confetti = require('canvas-confetti');

const confettiCanvas = document.getElementById('confetticanvas');
const confettiHandler = confetti.create(confettiCanvas, {
  resize: true,
  useWorker: true,
});

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

@Injectable()
export class SignupComponent implements OnInit {
  // title = 'More Problems';
  user: any;
  otp: string = '';
  verify: any;
  windowRef: any;
  login_method = "";
  user_role = "";
  win = new WindowService;

  constructor(private titleService: Title, private meta: Meta, public authService: AuthService, public router: Router, private afAuth: AngularFireAuth) { }

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
        console.log(this.user);
        console.log(result);
      })
      .catch((error: any) => console.log(error, 'Incorrect code entered?'));
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

  ngOnInit() {
    this.titleService.setTitle("Sign Up For MoreProblems.Org | U.S. K-12 State Testing Preparation");
    // this.meta.updateTag({ name: 'description', content: "" });
    setTimeout(() => {
      this.authService.AuthRoute();
      }, 250);
    this.windowRef = this.win.windowRef;
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
  }

}