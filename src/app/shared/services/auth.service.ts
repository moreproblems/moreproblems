import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { getDatabase, ref, set, get, child, update, query, equalTo } from "firebase/database";
// import { UserService } from './user.service';
import { RecaptchaVerifier } from 'firebase/auth';
import { WindowService } from './window.service';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  // user: User;
  userData: any; // Save logged in user data
  exam_history: any;
  avatars = ['bear', 'boar', 'cat', 'chicken', 'deer', 'dog', 'fox', 'giraffe', 'gorilla', 'horse', 'koala', 'lemur', 'lion', 'llama', 'owl', 'panda', 'rabbit', 'rhino', 'seal', 'shark', 'snake', 'tiger', 'walrus', 'wolf'];
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
        const db = getDatabase();
        // this.userData = user;
        get(child(ref(db), '/users/' + user.uid)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            this.userData = snapshot.val();
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
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

  // // Sign in with phone number
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
  SignUp(email: string, password: string, role: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.router.navigate(['profile']);
        this.WriteUserData(result.user, role);
        this.SetUserData(result.user);
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
  GoogleAuthLogin() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['profile']);
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      // .signInWithRedirect(provider)
      // .then(() => {
      //   this.afAuth.getRedirectResult().then((result) => {
      //     this.SetUserData(result.user);
      //   });
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['profile']);
        this.SetUserData(result.user);
        // this.WriteUserData(result.user, role);
        // this.setUserLoggedIn(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  AuthRoute() {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.router.navigate(['profile']);
      }
    });
  }

  // Sign in with Google
  GoogleAuthSignup(role: string) {
    return this.AuthSignup(new auth.GoogleAuthProvider(), role).then((res: any) => {
      this.router.navigate(['profile']);
    });
  }

  // Auth logic to run auth providers
  AuthSignup(provider: any, role: string) {
    return this.afAuth
      // .signInWithRedirect(provider)
      // .then(() => {
      //   this.afAuth.getRedirectResult().then((result) => {
      //     this.SetUserData(result.user);
      //   });
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['profile']);
        this.WriteUserData(result.user, role);
        this.SetUserData(result.user);
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
    const db = getDatabase();
    // const userRef = ref(db, '/users/' + user.uid)
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userDataFS: User = {
      uid: user.uid,
      email: user.email,
      phoneNumber: user.phoneNumber,
      // password: user.password,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    get(child(ref(db), '/users/' + user.uid)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        this.userData = snapshot.val();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    // this.WriteUserData(user);
    return userRef.set(userDataFS, {
      merge: true,
    });
  }

  WriteUserData(user: any, role: string) {
    const db = getDatabase();
    const updates: any = {};
    const updates2: any = {};
    this.userData = {
      uid: user.uid,
      role: role,
      email: user.email,
      phoneNumber: user.phoneNumber,
      // password: user.password,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      // exams: {favorites: {}}
    };
    if (role == 'Student') {
      const avatar = this.avatars[Math.floor(Math.random() * this.avatars.length)];
      this.userData.photoURL = '/assets/icons/user/' + avatar + '.png';
    }
    updates['/users/' + user.uid] = this.userData;
    return update(ref(db), updates).catch(error => {
      console.log(error.message)
    }).then((result) => {
      updates2['/users/' + user.uid + '/role'] = role;
      updates2['/users/' + user.uid + '/exams/favorites'] = ["test"];
      if (role == 'Student') {
        updates2['/users/' + user.uid + '/exams/history'] = { "test": { status: "", progress: 0} };
        updates2['/users/' + user.uid + '/problems/all'] = { "test": { status: ""} };
        updates2['/users/' + user.uid + '/problems/total'] = 0;
        updates2['/users/' + user.uid + '/problems/correct'] = 0;
      }
      update(ref(db), updates2);
    });
  }

  UpdateUserData(changes: { [index: string]: any }) {
    const db = getDatabase();
    const updates: any = {};
    for (let key in changes) {
      updates['/users/' + this.userData.uid + '/' + key] = changes[key];
    }
    return update(ref(db), updates).then(() => {
      get(child(ref(db), '/users/' + this.userData.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          this.userData = snapshot.val();
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }).catch(error => {
      console.log(error.message);
    });
  }

  UpdateDatabase(changes: { [index: string]: any }) {
    const db = getDatabase();
    const updates: any = {};
    for (let key in changes) {
      updates[key] = changes[key];
    }
    return update(ref(db), updates).then(() => {
    }).catch(error => {
      console.log(error.message);
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

  // getExamHistory() {
  //   const db = getDatabase();
  //   const exam_completed_count = 0;
  //   // const exam_history = query(ref(db, "users/" + this.userData.uid + "/exams/history"), equalTo("status", "Completed"));
  //   // const exam_history: any = {};
  //   get(child(ref(db), "users/" + this.userData.uid + "/exams/history")).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //       this.exam_history = snapshot.val();
  //     } else {
  //       console.log("No data available");
  //     }
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  //   return this.exam_history;
  // }

  // Optional: clear localStorage
  clearLocalStorage() {
    localStorage.clear();
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.clear();
      this.router.navigate(['login']);
      setTimeout(function () {
        location.reload();
      }, 100);
    });
  }
}