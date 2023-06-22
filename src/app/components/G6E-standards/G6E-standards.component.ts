import { Component, OnInit, Injectable } from '@angular/core';
// import * as fs from 'fs';
// import * as path from 'path';
import { HttpClient } from '@angular/common/http';

// function syncReadFile(filename: string) {
//   const result = fs.readFile(path.join(__dirname, filename), 'utf8');
//   console.log(result);
//   return result;
// }

@Component({
  selector: 'app-G6E-standards',
  templateUrl: './G6E-standards.component.html',
  styleUrls: ['./G6E-standards.component.css']
})

@Injectable()
export class G6EStandardsComponent implements OnInit {
  title = 'More Problems';

  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  mobileWidth = 875;
  menuOpen = false;

  domain_state: {[key: number]: boolean} = {
    1: false,
    2: false,
    3: false,
    4: false
  }

  constructor() { }

  width_change2() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  // public onChange(file: File): void {
  //   let fileReader: FileReader = new FileReader();
  //   let self = this;
  //   fileReader.onloadend = function(x) {
  //     self.exam_data = fileReader.result;
  //   }
  //   fileReader.readAsText(file);
  // }

  toggle_domain(dmn: number) {
    this.domain_state[dmn] = !this.domain_state[dmn];
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

  ngOnInit() {

  }
}
