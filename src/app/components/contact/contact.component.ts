import { Component, OnInit, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

@Injectable()
export class ContactComponent implements OnInit {
    // title = 'More Problems';

constructor(private titleService: Title, private meta: Meta) { }

  ngOnInit() {
    this.titleService.setTitle("Contact MoreProblems.Org | U.S. K-12 State Testing Preparation");
    // this.meta.updateTag({ name: 'description', content: "" });
  }

}