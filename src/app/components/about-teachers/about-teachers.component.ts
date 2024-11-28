import { Component, OnInit, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-about-teachers',
  templateUrl: './about-teachers.component.html',
  styleUrls: ['./about-teachers.component.css']
})

@Injectable()
export class AboutTeachersComponent implements OnInit{
  // title = 'More Problems';

  user_data: any = {};

  // selectedState: any = [
  //   {'code': 'ND', 'users': 324, 'org type' :'Service Provider'}, 
  //   {'code': 'WA', 'users': 454, 'org type' :'Manufacturer'}, 
  //   {'code':'AZ', 'users': 234, 'org type' :'Service Provider'}, 
  //   {'code' : 'AK', 'users': 544, 'org type' :'Manufacturer'},
  //   {'code' : 'CT', 'users': 544, 'org type' :'Manufacturer'},
  //   {'code' : 'DC', 'users': 544, 'org type' :'Manufacturer'},
  // ];
  
  constructor(private titleService: Title, private meta: Meta, public authService: AuthService) { }

  ngOnInit() {
    this.titleService.setTitle("MoreProblems.Org For Teachers | U.S. K-12 State Testing Preparation");
    // this.meta.updateTag({ name: 'description', content: "" });
    if (this.authService.userData) {
      this.authService.getProfilePic(this.authService.userData);
      this.user_data = this.authService.userData;
    }
  }

}