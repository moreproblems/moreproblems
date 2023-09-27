import { Component, OnInit, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";
import printJS from 'print-js';

const confetti = require('canvas-confetti');

const confettiCanvas = document.getElementById('confetticanvas');
const confettiHandler = confetti.create(confettiCanvas, {
    resize: true,
    useWorker: true,
});

@Component({
  selector: 'app-template-class',
  templateUrl: './template-class.component.html',
  styleUrls: ['./template-class.component.css']
})

@Injectable()
export class TemplateClassComponent implements OnInit {
  // title = 'More Problems';

  screenWidth = window.innerWidth;
  mobileWidth = 1200;
  menuOpen = false;
  data_loaded = false;

  edit_c: boolean = false;
  edit_c_list: { [index: string]: any } = {};
  class_uid: string = "";
  class_data: any = {};
  class_stud_set: string[] = [];
  class_student_metadata: any[] = [];
  user_data: any = {};
  stud_class_set: string[] = [];
  is_auth = false;
  is_student = false;
  is_enrolled = false;

  assignments_title: string = "Assignments for This Class";

  constructor(public authService: AuthService, public router: Router, private aRoute: ActivatedRoute, private afAuth: AngularFireAuth) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;}

  sub: any;

  width_change() {
    this.screenWidth = window.innerWidth;
    // this.viewerWidth = Math.round(window.innerWidth*.99).toString() + "px";
    // this.viewerHeight = Math.round(window.innerHeight*.8).toString() + "px";
  }

  width_change2() {
    this.screenWidth = window.innerWidth;
  }
  
  load_data() {
    this.class_data = {};
    this.class_data = this.authService.searchClassId(this.class_uid);
    setTimeout(() => {
      console.log(this.class_data);
      this.data_loaded = true;
    }, 500);
  }

  toggle_edit_class() {
    this.class_data = (this.authService.searchClassId(this.class_uid) as any);
    this.edit_c = !this.edit_c;
    this.edit_c_list = [];
  }

  edit_class(field: string, val: string) {
    this.edit_c_list[field] = val;
  }

  save_class() {
    this.authService.UpdateDatabase(this.edit_c_list);
    // setTimeout(() => {
    //   this.set_tab("information");
    //   this.set_tab("students");
    // }, 200);
  }

  enroll_student(stud: string) {
    this.stud_class_set = [];
    this.class_stud_set = [];
    this.edit_c_list = {};
    const class_stud_ref = 'classes/' + this.class_uid + '/students';
    for (let clss of this.authService.userData.classes) {
      this.stud_class_set.push(clss as string);
    }
    for (let std of this.class_data.students) {
      this.class_stud_set.push(std as string);
    }
    if (!this.stud_class_set.includes(this.class_uid)) {
      this.stud_class_set.push(this.class_uid);
    }
    if (!this.class_stud_set.includes(stud)) {
      this.class_stud_set.push(stud);
    }
    this.edit_c_list[class_stud_ref] = this.class_stud_set;
    this.authService.UpdateUserData({ 'classes': {} });
    this.authService.UpdateUserData({ 'classes': this.stud_class_set });
    this.authService.UpdateDatabase({ class_stud_ref: {} });
    this.authService.UpdateDatabase(this.edit_c_list);
    this.is_enrolled = true;
    this.confetti_light();
  }

  confetti_light() {
      confettiHandler({
          particleCount: 250,
          startVelocity: 125,
          scalar: 1.15,
          ticks: 150,
          decay: 0.8,
          angle: 90,
          spread: 60,
          origin: { x: 0.5, y: 1 }
      });
  }

  scroll_top() {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
    // window.scrollTo({left: 0, top: el.getBoundingClientRect().top-80, behavior: 'smooth'});
  }

  scroll2(el: HTMLElement) {
    window.scrollTo({ left: 0, top: el.getBoundingClientRect().top - 120, behavior: 'smooth' });
  }

  // delay(ms: number) {
  //   return new Promise( resolve => setTimeout(resolve, ms) );
  // }

  ngOnInit() {
    // this.titleService.setTitle("MoreProblems.Org | U.S. K-12 Common Core Learning Standards");
    // this.meta.updateTag({ name: 'description', content: "Find out what to expect from your learner's curriculum, all the way down to standards. Subjects include Math & English Language Arts from Kindergarten through High School - as they are outlined by the Common Core state standards adopted by most states in America." });
    this.sub = this.aRoute.paramMap.subscribe((params) => {
      console.log(params);
      this.class_uid = (params.get('classKey') as string);
    });
    this.class_data = this.authService.searchClassId(this.class_uid);
    setTimeout(() => {
      this.class_data = this.authService.searchClassId(this.class_uid);
      if (!this.class_data.uid) {
        this.router.navigate(['home']);
      }
      console.log(this.class_data);
      if (!this.authService.userData) {
        this.is_auth = false;
      }
      else {
        this.is_auth = true;
        this.user_data = this.authService.userData;
        if (this.authService.userData.uid == this.class_data.teacher)  {
          this.assignments_title = "Assignments for Your Class";
          for (const [key, stud] of Object.entries(this.class_data.students.slice(1))) {
            setTimeout(() => {
              console.log(stud);
              this.class_student_metadata.push(this.authService.searchUserId(stud as string));
            }, +key * 10);
          }
          setTimeout(() => {
            this.class_student_metadata = [];
            for (const [key, stud] of Object.entries(this.class_data.students.slice(1))) {
              setTimeout(() => {
                console.log(stud);
                this.class_student_metadata.push(this.authService.searchUserId(stud as string));
              }, +key * 10);
            }
          }, 250);
        }
        if (this.authService.userData.role == 'Student')  {
          this.is_student = true;
          if (this.class_data.students.includes(this.authService.userData.uid)) {
            this.is_enrolled = true;
          }
        }
        console.log(this.user_data);
      }
      setTimeout(() => {
        this.data_loaded = true;
      }, 500);
    }, 1000);
  }
}