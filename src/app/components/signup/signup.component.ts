import { Component, OnInit, Injectable, ElementRef, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AuthService } from "../../shared/services/auth.service";
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
  login_method = "";
  user_role = "";

  constructor(private titleService: Title, private meta: Meta, public authService: AuthService, public router: Router) { }

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

  ngOnInit() {
    this.titleService.setTitle("Sign Up For MoreProblems.Org | U.S. K-12 State Testing Preparation");
    this.authService.AuthRoute();
    // this.meta.updateTag({ name: 'description', content: "" });
    // if (this.authService.userData) {
    //   this.router.navigate(['profile']);
    // }
  }

}