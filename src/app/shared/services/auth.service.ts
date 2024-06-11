import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import { from } from 'rxjs';
import * as auth from 'firebase/auth';
import * as stor from "firebase/storage";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { getDatabase, ref, set, get, child, update, query, equalTo, onValue } from "firebase/database";
// import { UserService } from './user.service';
import { RecaptchaVerifier } from 'firebase/auth';
import { WindowService } from './window.service';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  // user: User;
  userData: any; // Save logged in user data
  userCredential: any;
  pp_url: any;
  user_result: any = {};
  class_result: any = {};
  exam_result: any = {};
  inprog_exams: any = {};
  mystud_inprog_exams: any = {};
  exam_sub: any;
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
        const strg = stor.getStorage();
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
  SignIn(route: string, email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.userCredential = result;
        this.SetUserData(result.user);
        // this.WriteUserData(result.user);
        // this.setUserLoggedIn(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            if (route != '') {
              this.router.navigate([route]);
            }
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // // Sign in with phone number
  // SignInPhone(route: string, phone: string, win: WindowService) {
  //   return this.afAuth
  //     .signInWithPhoneNumber(phone, win.windowRef.recapthcaVerifier)
  //     .then(confirmationResult) => {
  //       this.SetUserData(result.user);
  //       this.setUserLoggedIn(result.user);
  //     this.afAuth.authState.subscribe(user) => {
  //       if (user) {
  //         if (route != '') {
  //           this.router.navigate([route]);
  //         }
  //       }
  //     }
  //   }
  // }

  // Sign up with email/password
  SignUp(route: string, email: string, password: string, role: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        if (route != '') {
          this.router.navigate([route]);
        }
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

  // Reset Forgotten password
  ResetPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  GoogleAuthLogin(route: string) {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (route != '') {
        this.router.navigate([route]);
      }
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
      .then(async (result) => {
        // const authMethods: string[] = await (<any>this.afAuth.fetchSignInMethodsForEmail(result.user !== null && result.user.email !== null ? result.user.email : ''));
        // console.log(authMethods);
        this.userCredential = result.credential;
        this.SetUserData(result.user);
        console.log(result.user);
        if (result.user != null) {
          console.log(result.user.uid);
          this.userData = this.searchUserId(result.user.uid as string);
          setTimeout(() => {
            if (result.user != null) {
              this.userData = this.searchUserId(result.user.uid as string);
              console.log(this.userData);
              if (Object.keys(this.userData).length == 0) {
                this.WriteUserData(result.user, '').then (() => {
                });
              }
            }
          }, 500);
        }
        // this.setUserLoggedIn(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  AuthRoute(route: string) {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        if (route != '') {
          this.router.navigate([route]);
        }
      }
    });
  }

  // Sign in with Google
  GoogleAuthSignup(route: string, role: string) {
    return this.AuthSignup(route, new auth.GoogleAuthProvider(), role).then((res: any) => {
      if (route != '') {
        this.router.navigate([route]);
      }
    });
  }

  // Auth logic to run auth providers
  AuthSignup(route: string, provider: any, role: string) {
    return this.afAuth
      // .signInWithRedirect(provider)
      // .then(() => {
      //   this.afAuth.getRedirectResult().then((result) => {
      //     this.SetUserData(result.user);
      //   });
      .signInWithPopup(provider)
      .then((result) => {
        this.WriteUserData(result.user, role).then (() => {
          this.SetUserData(result.user);
          if (route != '') {
            this.router.navigate([route]);
          }
        });
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
    // if (this.userData.emailVerified != user.emailVerified) {
    //   this.UpdateUserData({'emailVerified' : user.emailVerified});
    // }
    // this.WriteUserData(user);
    return userRef.set(userDataFS, {
      merge: true,
    });
  }

  WriteUserData(user: any, role: string) {
    this.userData = this.searchUserId(user.uid as string);
    const db = getDatabase();
    const updates: any = {};
    const updates2: any = {};
    if (Object.keys(this.userData).length == 0) {
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
      return update(ref(db), updates).then(() => {
        updates2['/users/' + user.uid + '/role'] = role;
        updates2['/users/' + user.uid + '/standards/favorites'] = [""];
        updates2['/users/' + user.uid + '/exams/favorites'] = [""];
        if (role != 'Parent' && role != '') {
          updates2['/users/' + user.uid + '/classes'] = [""];
        }
        if (role == 'Student') {
          updates2['/users/' + user.uid + '/exams/history'] = { "test": { status: "", progress: 0} };
          updates2['/users/' + user.uid + '/problems/all'] = { "test": { status: ""} };
          updates2['/users/' + user.uid + '/problems/total'] = 0;
          updates2['/users/' + user.uid + '/problems/correct'] = 0;
        }
        else if (role != '') {
          updates2['/users/' + user.uid + '/students'] = [""];
        }
        update(ref(db), updates2);
      }).catch(error => {
        console.log(error.message)
      });
    }
    else {
      updates['/users/' + user.uid] = this.userData;
      return update(ref(db), updates).then(() => {}).catch(error => {
        console.log(error.message)
      });
    }
  }

  WriteUserDataList (student: { [index: string]: any }) {
    const db = getDatabase();
    const updates: any = {};
    const updates2: any = {};
    const studData = {
      uid: student['uid'],
      role: 'Student',
      displayName: student['displayName'],
      photoURL: student['photoURL'],
      grade: student['grade'],
      state: student['state']
      // exams: {favorites: {}}
    };
    updates['/users/' + student['uid']] = studData;
    return update(ref(db), updates).then(() => {
      updates2['/users/' + student['uid'] + '/standards/favorites'] = [""];
      updates2['/users/' + student['uid'] + '/exams/favorites'] = [""];
      updates2['/users/' + student['uid'] + '/classes'] = [""];
      updates2['/users/' + student['uid'] + '/exams/history'] = { "test": { status: "", progress: 0} };
      updates2['/users/' + student['uid'] + '/problems/all'] = { "test": { status: ""} };
      updates2['/users/' + student['uid'] + '/problems/total'] = 0;
      updates2['/users/' + student['uid'] + '/problems/correct'] = 0;
      update(ref(db), updates2);
    }).catch(error => {
      console.log(error.message)
    });
  }

  WriteUserDataListId (student: { [index: string]: any }, id: string) {
    const db = getDatabase();
    const updates: any = {};
    for (const [key, val] of Object.entries(student)) {
      updates['/users/' + id + '/' + key] = val;
    }
    update(ref(db), updates).then(() => {
      // Data saved successfully!
      return;
      // setTimeout(function () {
      //   return;
      // }, 200);
    }).catch(error => {
      console.log(error.message);
    });
  }

  UpdateUserData(changes: { [index: string]: any }) {
    const db = getDatabase();
    const updates: any = {};
    for (let key in changes) {
      updates['/users/' + this.userData.uid + '/' + key] = changes[key];
      if (key == 'email' && auth.getAuth().currentUser != null) {
        auth.updateEmail((auth.getAuth().currentUser as auth.User), changes[key]);
        // auth.reauthenticateWithCredential((auth.getAuth().currentUser as auth.User), this.userCredential)
      }
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
    console.log(this.userData)
    for (let key in changes) {
      updates[key] = changes[key];
    }
    return update(ref(db), updates).then(() => {}).catch(error => {
      console.log(error.message);
    });
  }

  UploadProfilePic(user: any, images: any) {
    const strg = stor.getStorage();
    const pref = stor.ref(strg, 'profile/' + ""+user.uid + '/pic');
    return stor.uploadBytes(pref, images[0]);
  }
  
  getProfilePic(user: any) {
    const strg = stor.getStorage();
    return stor.getDownloadURL(stor.ref(strg, 'profile/' + ""+user.uid + '/pic')).then((url) => {
      this.pp_url = url;
      console.log(this.pp_url);
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

  getExamSubmissions() {
    var exam_history: any = {};
    var my_exam_subs: any = {};
    const db = getDatabase();
    const exam_completed_count = 0;
    const stud_ref = ref(db,"users/" + this.userData.uid + "/exams/history");
    onValue(stud_ref, (snapshot) => {
      if (snapshot.exists()) {
        console.log(Object.keys(snapshot.val()));
        exam_history = snapshot.val();
      } else {
        console.log("No data available");
      }
    });
    for (let exm of Object.keys(exam_history)) {
      my_exam_subs[exm] = this.getExamSubmission2(exm);
    }
    return my_exam_subs;
  }

  getExamSubmission(exm: string) {
    const db = getDatabase();
    const db_updates: any = {};
    const exam_completed_count = 0;
    // const exam_history = query(ref(db, "users/" + this.userData.uid + "/exams/history"), equalTo("status", "Completed"));
    // const exam_history: any = {};
    get(child(ref(db), "submissions/exams/" + this.userData.uid + "/" + exm)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        this.exam_sub = snapshot.val();
        db_updates['/submissions/exams/' + exm + '/' + this.userData.uid] = this.exam_sub;
        this.UpdateDatabase(db_updates);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    return this.exam_sub;
  }

  getExamSubmission2(exm: string) {
    var my_exam_sub: any = {};
    const db = getDatabase();
    const exam_completed_count = 0;
    // const exam_history = query(ref(db, "users/" + this.userData.uid + "/exams/history"), equalTo("status", "Completed"));
    // const exam_history: any = {};
    get(child(ref(db), "submissions/exams/" + exm + "/" + this.userData.uid)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        for (const [key, val] of Object.entries(snapshot.val())) {
          my_exam_sub[key] = val;
        }
        // this.exam_sub = snapshot.val();
      } else {
        console.log("No data available");
        my_exam_sub = this.getExamSubmission(exm);
      }
    }).catch((error) => {
      console.error(error);
    });
    console.log(my_exam_sub);
    return my_exam_sub;
  }

  // Create duplicate method with exm/std index that calls this method if to retrieve and update old structure
  getStudExamSubmissions(std: string) {
    var my_exam_subs: any = {};
    const db = getDatabase();
    const exam_completed_count = 0;
    const stud_ref = ref(db,"users/" + std + "/exams/history");
    onValue(stud_ref, (snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        for (let exm of Object.keys(snapshot.val)) {
          my_exam_subs[exm] = this.getStudExamSubmission2(std, exm)
        }
      } else {
        console.log("No data available");
      }
    });
    return my_exam_subs;
  }

  getStudExamSubmission(std: string, exm: string) {
    const db = getDatabase();
    const db_updates: any = {};
    const stud_ref = ref(db,"submissions/exams/" + std + "/" + exm);
    onValue(stud_ref, (snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        this.exam_sub = snapshot.val();
        db_updates['/submissions/exams/' + exm + '/' + std] = this.exam_sub;
        this.UpdateDatabase(db_updates);
      } else {
        console.log("No data available");
      }
    });
    return this.exam_sub;
  }

  getStudExamSubmission2(std: string, exm: string) {
    var my_exam_sub: any = {};
    const db = getDatabase();
    const stud_ref = ref(db,"submissions/exams/" + exm + "/" + std);
    onValue(stud_ref, (snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        for (const [key, val] of Object.entries(snapshot.val())) {
          my_exam_sub[key] = val;
        }
        // this.exam_sub = snapshot.val();
      } else {
        console.log("No data available");
        my_exam_sub = this.getStudExamSubmission(std, exm);
      }
    });
    return my_exam_sub;
  }

  // getStudClassSubmissions(std: string, clss: string) {
  //   const db = getDatabase();
  //   const exam_completed_count = 0;
  //   const stud_ref = ref(db,"submissions/exams/" + std);
  //   onValue(stud_ref, (snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //       this.exam_sub = snapshot.val();
  //     } else {
  //       console.log("No data available");
  //     }
  //   });
  //   return this.exam_sub;
  // }

  searchUserId(id: string) {
    this.user_result = {};
    const db = getDatabase();
    const user_ref = ref(db, "users/" + id);
    onValue(user_ref, (snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        this.user_result = snapshot.val();
      } else {
        console.log("No data available");
      }
    });
    return this.user_result;
  }

  searchUsersId(id: string) {
    this.user_result = {};
    const db = getDatabase();
    const all_user_ref = ref(db, "users");
    var search_users: string[] = [];
    onValue(all_user_ref, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.key != null && childSnapshot.key.startsWith(id)) {
          search_users.push(childSnapshot.key);
        }
      })
      console.log(search_users);
    });
    for (let userID of search_users) {
      // const user_ref = ref(db, "users/" + userID);
      onValue(ref(db, "users/" + userID), (snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          this.user_result[userID] = snapshot.val();
        } else {
          console.log("No data available");
        }
      });
    }
    return this.user_result;
  }

  searchClassId(id: string) {
    this.class_result = {};
    const db = getDatabase();
    const class_ref = ref(db, "classes/" + id);
    onValue(class_ref, (snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        this.class_result = snapshot.val();
      } else {
        console.log("No data available");
      }
    });
    return this.class_result;
  }

  searchExamId(id: string) {
    // this.exam_result = {"downloads": 0};
    const db = getDatabase();
    const class_ref = ref(db, "exams/" + id);
    onValue(class_ref, (snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        this.exam_result = snapshot.val();
      } else {
        console.log("No data available");
      }
    });
    return this.exam_result;
  }

  getInProgExams(id: string) {
    const usr = this.searchUserId(id);
    this.inprog_exams = {};
    for (const [key, xm] of Object.entries((usr as any).exams.history)) {
      if ((xm as any).status == "Started" && (key as string) != 'test') {
        this.inprog_exams[(key as string)] = (xm as any);
      }
    }
    return this.inprog_exams;
  }

  getMyStudInProgExams(studs: string[]) {
    this.mystud_inprog_exams = {};
    for (let stud of studs) {
      this.inprog_exams = this.getInProgExams(stud);
      for (const [key, xm] of Object.entries(this.inprog_exams)) {
        this.mystud_inprog_exams[stud][key as string] = (xm as any) 
      }
    }
    return this.mystud_inprog_exams;
  }

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