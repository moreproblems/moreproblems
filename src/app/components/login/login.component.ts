import { Component, OnInit, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {
    // title = 'More Problems';
    // authConfig: FirebaseUIAuthConfig = {
    //   signInFlow: 'popup',
    //   signInOptions: [
    //     firebase.auth.EmailAuthProvider.PROVIDER_ID
    //   ],
    //   tosUrl: '/',
    //   privacyPolicyUrl: '/'
    // };

    // constructor(public fbAuth: AngularFireAuth, private titleService: Title, private meta: Meta) { }
    constructor(private titleService: Title, private meta: Meta) { }

    // successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    //   this.auth.signInWithCredential(signInSuccessData.authResult.credential)
    //     .then(() => {
    //       // Redirect to the home page or dashboard
    //     })
    //     .catch(error => {
    //       // Handle login error
    //     });
    // }

    ngOnInit() {
        this.titleService.setTitle("Contact MoreProblems.Org | U.S. K-12 State Testing Preparation");
        // this.meta.updateTag({ name: 'description', content: "" });

        // The start method will wait until the DOM is loaded.
        // ui.start('#firebaseui-auth-container', {
        //     signInOptions: [
        //       {
        //         provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //         requireDisplayName: true
        //       }
        //     ]
        //   });
    }

}