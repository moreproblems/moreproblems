import { Component, OnInit, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";
import printJS from 'print-js';

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
  class_student_metadata: any = {};
  user_data: any = {};
  is_auth = false;
  is_student = false;

  assignments_title: string = "Assignments for Thisf Class";

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
    console.log();
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
        }
        if (this.authService.userData.role == 'Student')  {
          this.is_student = true;
        }
        console.log(this.user_data);
      }
      setTimeout(() => {
        this.data_loaded = true;
      }, 500);
    }, 1000);
  }
}