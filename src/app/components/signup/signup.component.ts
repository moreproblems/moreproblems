import { Component, OnInit, Injectable, ElementRef, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AuthService } from "../../shared/services/auth.service";
// import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular';
// import {AngularFireModule} from '@angular/fire/compat';
// import {AngularFireAuthModule} from '@angular/fire/compat/auth';
// import { FirebaseUIAuthConfig, FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { getAuth } from "firebase/auth";

// var firebase = require('firebase');
// var firebaseui = require('firebaseui');

// Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());

// var uiConfig = {
//     callbacks: {
//       signInSuccessWithAuthResult: function(authResult, redirectUrl) {
//         // User successfully signed in.
//         // Return type determines whether we continue the redirect automatically
//         // or whether we leave that to developer to handle.
//         return true;
//       },
//       uiShown: function() {
//         // The widget is rendered.
//         // Hide the loader.
//         document.getElementById('loader').style.display = 'none';
//       }
//     },
//     // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
//     signInFlow: 'popup',
//     signInSuccessUrl: '<url-to-redirect-to-on-success>',
//     signInOptions: [
//       // Leave the lines as is for the providers you want to offer your users.
//       firebase.auth.GoogleAuthProvider.PROVIDER_ID
//     ],
//     // Terms of service url.
//     tosUrl: '<your-tos-url>',
//     // Privacy policy url.
//     privacyPolicyUrl: '<your-privacy-policy-url>'
//   };

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

@Injectable()
export class SignupComponent implements OnInit {
    // title = 'More Problems';
    login_method = "";

    constructor(private titleService: Title, private meta: Meta, public authService: AuthService) { }

    toggle_login_method(mthd: string) {
        if (this.login_method != mthd) {
            this.login_method = mthd;
        }
        else {
            this.login_method = "";
        }
    }

    scroll_top() {
        setTimeout(function(){
          window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
        }, 250);
      }
    
      scroll_bottom() {
        setTimeout(function(){
          window.scrollTo({left: 0, top: document.body.scrollHeight, behavior: 'smooth'});
        }, 250);
      }
    
      scroll(el: HTMLElement) {
        setTimeout(function(){
          el.scrollIntoView({behavior: 'smooth'});
        }, 250);
      }
      
      scroll2(el: HTMLElement) {
        setTimeout(function(){
          window.scrollTo({left: 0, top: el.getBoundingClientRect().top-120, behavior: 'smooth'});
        }, 250);
      }

    ngOnInit() {
        this.titleService.setTitle("Contact MoreProblems.Org | U.S. K-12 State Testing Preparation");
        // this.meta.updateTag({ name: 'description', content: "" });
    }

}