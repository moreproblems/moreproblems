import { Component, OnInit, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

@Injectable()
export class AboutComponent implements OnInit{
  // title = 'More Problems';

  // selectedState: any = [
  //   {'code': 'ND', 'users': 324, 'org type' :'Service Provider'}, 
  //   {'code': 'WA', 'users': 454, 'org type' :'Manufacturer'}, 
  //   {'code':'AZ', 'users': 234, 'org type' :'Service Provider'}, 
  //   {'code' : 'AK', 'users': 544, 'org type' :'Manufacturer'},
  //   {'code' : 'CT', 'users': 544, 'org type' :'Manufacturer'},
  //   {'code' : 'DC', 'users': 544, 'org type' :'Manufacturer'},
  // ];
  
  constructor(private titleService: Title, private meta: Meta) { }

  ngOnInit() {
    this.titleService.setTitle("About MoreProblems.Org | U.S. K-12 State Testing Preparation");
    // this.meta.updateTag({ name: 'description', content: "" });
  }

}