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
  selector: 'app-HS-G-standards',
  templateUrl: './HS-G-standards.component.html',
  styleUrls: ['./HS-G-standards.component.css']
})

@Injectable()
export class HSGStandardsComponent implements OnInit {
  title = 'More Problems';

  domain_state: {[key: number]: boolean} = {
    1: false,
    2: false
  }

  constructor() { }

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
    el.scrollIntoView({ behavior: 'smooth' });
  }

  scroll2(el: HTMLElement) {
    window.scrollTo({ left: 0, top: el.getBoundingClientRect().top - 80, behavior: 'smooth' });
  }

  ngOnInit() {

  }
}
