import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { getDatabase, ref, set, update } from "firebase/database";
// import { UserService } from './user.service';
// import { RecaptchaVerifier } from 'firebase/auth';
import { WindowService } from './window.service';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  // user: User;
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
    // public userservice: UserService
  ) {
    // this.checkLocalStorage();
    // const recaptchaVerifier = new this.afAuth.RecaptchaVerifier('sign-in-button', {
    //   'size': 'invisible',
    //   'callback': (response) => {
    //     // reCAPTCHA solved, allow signInWithPhoneNumber.
    //     onSignInSubmit();
    //   }
    // }, auth);
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        // this.WriteUserData(result.user);
        // this.setUserLoggedIn(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['profile']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign in with phone number
  // SignInPhone(phone: string, win: WindowService) {
  //   return this.afAuth
  //     .signInWithPhoneNumber(phone, win.windowRef.recapthcaVerifier)
  //     .then(confirmationResult) => {
  //       this.SetUserData(result.user);
  //       this.setUserLoggedIn(result.user);
  //     this.afAuth.authState.subscribe(user) => {
  //       if (user) {
  //         this.router.navigate(['profile']);
  //       }
  //     }}
  // }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
        this.WriteUserData(result.user);
        // this.setUserLoggedIn(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification());
    //   .then(() => {
    //     this.router.navigate(['verify-email-address']);
    //   });
  }

  // Reset Forggot password
  //   ForgotPassword(passwordResetEmail: string) {
  //     return this.afAuth
  //       .sendPasswordResetEmail(passwordResetEmail)
  //       .then(() => {
  //         window.alert('Password reset email sent, check your inbox.');
  //       })
  //       .catch((error) => {
  //         window.alert(error);
  //       });
  //   }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['profile']);
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['profile']);
        this.SetUserData(result.user);
        // this.WriteUserData(result.user);
        // this.setUserLoggedIn(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    // this.WriteUserData(user);
    return userRef.set(userData, {
      merge: true,
    });
  }

  WriteUserData(user: any) {
    const db = getDatabase();
    const updates: any = {};
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    updates['/users/' + user.uid] = userData;
    return update(ref(db), updates).catch(error => {
      console.log(error.message)
    });
  }

  // Set data on localStorage
  setUserLoggedIn(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    console.log('saved on localStorage');

  }

  // get data on localStorage
  getUserLoggedIn() {
    if (localStorage.getItem('user') == null) {
      console.log('localStorage empty');
    } else {
      JSON.parse(localStorage.getItem('user') || '{}');
    }
  }

  // Optional: clear localStorage
  clearLocalStorage() {
    localStorage.clear();
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}