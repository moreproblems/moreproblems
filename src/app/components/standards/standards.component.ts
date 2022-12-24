import { Component, OnInit, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import printJS from 'print-js';

@Component({
  selector: 'app-standards',
  templateUrl: './standards.component.html',
  styleUrls: ['./standards.component.css']
})

@Injectable()
export class StandardsComponent implements OnInit{
  // title = 'More Problems';

  screenWidth = window.innerWidth;
  mobileWidth = 800;
  menuOpen = false;

  selected_grade = '';
  selected_subject = '';
  subject_name = '';

  domain_state: {[key: number]: boolean} = {
    1: false,
    2: false,
    3: false,
    4: false
  }
  
  constructor(private router: Router, private titleService: Title, private meta: Meta) { }

  select_grade(gr: string) {
    this.domain_state = { 1: false, 2: false, 3: false, 4: false };
    this.selected_subject = '';
    if (this.selected_grade == gr) {
      this.selected_grade = '';
    }
    else {
      this.selected_grade = gr;
      
    }
  }

  select_subject(sbj: string) {
    if (this.selected_subject == sbj) {
      this.selected_subject = '';
    }
    else {
      this.selected_subject = sbj;
      this.domain_state = { 1: false, 2: false, 3: false, 4: false };
    }
    if (sbj == 'KM') {
      this.subject_name = 'Kindergarten Mathematics';
    }
    else if (sbj == 'KE') {
      this.subject_name = 'Kindergarten Language Arts';
    }
    else if (sbj == 'G1M') {
      this.subject_name = 'First Grade Mathematics';
    }
    else if (sbj == 'G1E') {
      this.subject_name = 'First Grade Language Arts';
    }
    else if (sbj == 'G2M') {
      this.subject_name = 'Second Grade Mathematics';
    }
    else if (sbj == 'G2E') {
      this.subject_name = 'Second Grade Language Arts';
    }
    else if (sbj == 'G3M') {
      this.subject_name = 'Third Grade Mathematics';
    }
    else if (sbj == 'G3E') {
      this.subject_name = 'Third Grade Language Arts';
    }
    else if (sbj == 'G4M') {
      this.subject_name = 'Fourth Grade Math';
    }
    else if (sbj == 'G4E') {
      this.subject_name = 'Fourth Grade Language Arts';
    }
    else if (sbj == 'G5M') {
      this.subject_name = 'Fifth Grade Math';
    }
    else if (sbj == 'G5E') {
      this.subject_name = 'Fifth Grade Language Arts';
    }
    else if (sbj == 'G6M') {
      this.subject_name = 'Sixth Grade Mathematics';
    }
    else if (sbj == 'G6E') {
      this.subject_name = 'Sixth Grade Language Arts';
    }
    else if (sbj == 'G6S') {
      this.subject_name = 'Sixth Grade Science';
    }
    else if (sbj == 'G6SS') {
      this.subject_name = 'Sixth Grade Social Studies';
    }
    else if (sbj == 'G7M') {
      this.subject_name = 'Seventh Grade Mathematics';
    }
    else if (sbj == 'G7E') {
      this.subject_name = 'Seventh Grade Language Arts';
    }
    else if (sbj == 'G7S') {
      this.subject_name = 'Seventh Grade Science';
    }
    else if (sbj == 'G7SS') {
      this.subject_name = 'Seventh Grade Social Studies';
    }
    else if (sbj == 'G8M') {
      this.subject_name = 'Eighth Grade Mathematics';
    }
    else if (sbj == 'G8E') {
      this.subject_name = 'Eighth Grade Language Arts';
    }
    else if (sbj == 'G8S') {
      this.subject_name = 'Eighth Grade Science';
    }
    else if (sbj == 'G8SS') {
      this.subject_name = 'Eighth Grade Social Studies';
    }
    else if (sbj == 'G9M') {
      this.subject_name = 'Ninth Grade Mathematics';
    }
    else if (sbj == 'G9E') {
      this.subject_name = 'Ninth Grade Language Arts';
    }
    else if (sbj == 'G10M') {
      this.subject_name = 'Tenth Grade Mathematics';
    }
    else if (sbj == 'G10E') {
      this.subject_name = 'Tenth Grade Language Arts';
    }
    else if (sbj == 'G11M') {
      this.subject_name = 'Eleventh Grade Mathematics';
    }
    else if (sbj == 'G11E') {
      this.subject_name = 'Eleventh Grade Language Arts';
    }
    else if (sbj == 'G12M') {
      this.subject_name = 'Twelfth Grade Mathematics';
    }
    else if (sbj == 'G12E') {
      this.subject_name = 'Twelfth Grade Language Arts';
    }
    // this.scroll2(title);
  }

  

  toggle_domain(dmn: number) {
    this.domain_state[dmn] = !this.domain_state[dmn];
  }

  width_change() {
    this.screenWidth = window.innerWidth;
    // this.viewerWidth = Math.round(window.innerWidth*.99).toString() + "px";
    // this.viewerHeight = Math.round(window.innerHeight*.8).toString() + "px";
  }

  scroll_top() {
    window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
    // window.scrollTo({left: 0, top: el.getBoundingClientRect().top-80, behavior: 'smooth'});
  }
  
  scroll2(el: HTMLElement) {
    window.scrollTo({left: 0, top: el.getBoundingClientRect().top-120, behavior: 'smooth'});
  }

  // delay(ms: number) {
  //   return new Promise( resolve => setTimeout(resolve, ms) );
  // }

  ngOnInit() {
    this.titleService.setTitle("MoreProblems.Org | U.S. K-12 State Testing Practice Exams");
    this.meta.updateTag({ name: 'description', content: "Access released practice problems & solutions to prepare for end-of-year tests - including Florida FSA, Illinois IAR, New York NYSTP, North Carolina EOG, Pennsylvania PSSA, and Texas STAAR. Choose from more 300 assessments across math, English language, science, & social studies for elementary, middle, & high school students." });
  }
}