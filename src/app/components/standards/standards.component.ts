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

  selected_subject = '';

  domain_state: {[key: number]: boolean} = {
    1: false,
    2: false,
    3: false,
    4: false
  }
  
  constructor(private router: Router, private titleService: Title, private meta: Meta) { }

  select_subject(st: string) {
    if (this.selected_subject == st) {
      this.selected_subject = '';
    }
    else {
      this.selected_subject = st;
      this.domain_state = { 1: false, 2: false, 3: false, 4: false };
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