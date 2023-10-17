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
  mobileWidth = 1000;
  menuOpen = false;

  selected_grade = '';
  selected_subject = '';
  selected_category = '';
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
    this.selected_category = '';
    this.subject_name = '';
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
      // this.selected_category = '';
    }
    else {
      this.selected_subject = sbj;
      // this.selected_category = sbj;
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

  select_category(cat: string) {
    if (this.selected_category == cat) {
      this.selected_category = '';
      this.selected_subject = '';
    }
    else {
      this.selected_category = cat;
      this.selected_subject = cat;
      this.domain_state = { 1: false, 2: false, 3: false, 4: false };
    }
    if (cat == 'HSM-NQ') {
      this.subject_name = 'High School Mathematics - Number & Quantity';
    }
    else if (cat == 'HSM-A') {
      this.subject_name = 'High School Mathematics - Algebra';
    }
    else if (cat == 'HSM-F') {
      this.subject_name = 'High School Mathematics - Functions';
    }
    else if (cat == 'HSM-G') {
      this.subject_name = 'High School Mathematics - Geometry';
    }
    else if (cat == 'HSM-SP') {
      this.subject_name = 'High School Mathematics - Statistics & Probability';
    }
    else if (cat == 'HSM-M') {
      this.subject_name = 'High School Mathematics - Modeling';
    }
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
    this.titleService.setTitle("MoreProblems.Org | U.S. K-12 Common Core Learning Standards");
    this.meta.updateTag({ name: 'description', content: "Find out what to expect from your learner's curriculum, all the way down to standards. Subjects include Math & English Language Arts from Kindergarten through High School - as they are outlined by the Common Core state standards adopted by most states in America." });
  }
}