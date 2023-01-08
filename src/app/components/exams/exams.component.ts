import { Component, OnInit, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import printJS from 'print-js';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})

@Injectable()
export class ExamsComponent implements OnInit{
  // title = 'More Problems';

  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  mobileWidth = 800;
  menuOpen = false;

  online_set = ['TX21G3M', 'TX19G3M'];
  // online_set: string[] = [];

  selected_state = '';
  selected_grade = '';
 
  exam_id = '';
  exam_name = '';
  exam_url = '';
  file_source = '';
  file_page = 1;

  viewerWidth = Math.round(window.innerWidth*.99).toString() + "px";
  viewerHeight = Math.round(window.innerHeight*.95).toString() + "px";
  
  constructor(private router: Router, private titleService: Title, private meta: Meta) { }

  width_change2() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  select_state(st: string) {
    if (this.selected_state == st) {
      this.selected_state = '';
    }
    else {
      this.selected_state = st;
    }
    this.exam_id = '';
    this.exam_name = '';
    this.exam_url = '';
    this.file_source = '';
    this.file_page = 1;
  }

  select_grade(gr: string) {
    if (this.selected_grade == gr) {
      this.selected_grade = '';
    }
    else {
      this.selected_grade = gr;
    }
    this.exam_id = '';
    this.exam_name = '';
    this.exam_url = '';
    this.file_source = '';
    this.file_page = 1;
  }

  select_exam(ex: string) {
    this.exam_id = ex;
    this.exam_url = '/exam/' + ex;
    this.file_page = 1;
    if (ex == 'COG3M') {
      this.exam_name = "Colorado CMAS Grade 3 Math Practice Exam";
    }
    else if (ex == 'COG3E') {
      this.exam_name = "Colorado CMAS Grade 3 English Language Arts Practice Exam";
    }
    else if (ex == 'COG4M') {
      this.exam_name = "Colorado CMAS Grade 4 Math Practice Exam";
    }
    else if (ex == 'COG4E') {
      this.exam_name = "Colorado CMAS Grade 4 English Language Arts Practice Exam";
    }
    else if (ex == 'COG5M') {
      this.exam_name = "Colorado CMAS Grade 5 Math Practice Exam";
    }
    else if (ex == 'COG5E') {
      this.exam_name = "Colorado CMAS Grade 5 English Language Arts Practice Exam";
    }
    else if (ex == 'COG5S') {
      this.exam_name = "Colorado CMAS Grade 5 Science Practice Exam";
    }
    else if (ex == 'COG6M') {
      this.exam_name = "Colorado CMAS Grade 6 Math Practice Exam";
    }
    else if (ex == 'COG6E') {
      this.exam_name = "Colorado CMAS Grade 6 English Language Arts Practice Exam";
    }
    else if (ex == 'COG7M') {
      this.exam_name = "Colorado CMAS Grade 7 Math Practice Exam";
    }
    else if (ex == 'COG7E') {
      this.exam_name = "Colorado CMAS Grade 7 English Language Arts Practice Exam";
    }
    else if (ex == 'COG8M') {
      this.exam_name = "Colorado CMAS Grade 8 Math Practice Exam";
    }
    else if (ex == 'COG8E') {
      this.exam_name = "Colorado CMAS Grade 8 English Language Arts Practice Exam";
    }
    else if (ex == 'COG8S') {
      this.exam_name = "Colorado CMAS Grade 8 Science Practice Exam";
    }
    else if (ex == 'COHSS') {
      this.exam_name = "Colorado CMAS High School Science Practice Exam";
    }
    else if (ex == 'FL20G3M') {
      this.exam_name = "Florida FSA 2020 Grade 3 Math Practice Exam";
    }
    else if (ex == 'FL20G3R') {
      this.exam_name = "Florida FSA 2020 Grade 3 Reading Practice Exam";
    }
    else if (ex == 'FL20G4M') {
      this.exam_name = "Florida FSA 2020 Grade 4 Math Practice Exam";
    }
    else if (ex == 'FL20G4R') {
      this.exam_name = "Florida FSA 2020 Grade 4 Reading Practice Exam";
    }
    else if (ex == 'FL20G4W') {
      this.exam_name = "Florida FSA 2020 Grade 4 Writing Practice Exam";
    }
    else if (ex == 'FL20G5M') {
      this.exam_name = "Florida FSA 2020 Grade 5 Math Practice Exam";
    }
    else if (ex == 'FL20G5R') {
      this.exam_name = "Florida FSA 2020 Grade 5 Reading Practice Exam";
    }
    else if (ex == 'FL20G5W') {
      this.exam_name = "Florida FSA 2020 Grade 5 Writing Practice Exam";
    }
    else if (ex == 'FL20G5S') {
      this.exam_name = "Florida FSA 2020 Grade 5 Science Practice Exam";
    }
    else if (ex == 'FL20G6M') {
      this.exam_name = "Florida FSA 2020 Grade 6 Math Practice Exam";
    }
    else if (ex == 'FL20G6R') {
      this.exam_name = "Florida FSA 2020 Grade 6 Reading Practice Exam";
    }
    else if (ex == 'FL20G6W') {
      this.exam_name = "Florida FSA 2020 Grade 6 Writing Practice Exam";
    }
    else if (ex == 'FL20G7M') {
      this.exam_name = "Florida FSA 2020 Grade 7 Math Practice Exam";
    }
    else if (ex == 'FL20G7R') {
      this.exam_name = "Florida FSA 2020 Grade 7 Reading Practice Exam";
    }
    else if (ex == 'FL20G7W') {
      this.exam_name = "Florida FSA 2020 Grade 7 Writing Practice Exam";
    }
    else if (ex == 'FL20G8M') {
      this.exam_name = "Florida FSA 2020 Grade 8 Math Practice Exam";
    }
    else if (ex == 'FL20G8R') {
      this.exam_name = "Florida FSA 2020 Grade 8 Reading Practice Exam";
    }
    else if (ex == 'FL20G8W') {
      this.exam_name = "Florida FSA 2020 Grade 8 Writing Practice Exam";
    }
    else if (ex == 'FL20G8S') {
      this.exam_name = "Florida FSA 2020 Grade 8 Science Practice Exam";
    }
    else if (ex == 'FL20G9R') {
      this.exam_name = "Florida FSA 2020 Grade 9 Reading Practice Exam";
    }
    else if (ex == 'FL20G9W') {
      this.exam_name = "Florida FSA 2020 Grade 9 Writing Practice Exam";
    }
    else if (ex == 'FL20G10R') {
      this.exam_name = "Florida FSA 2020 Grade 10 Reading Practice Exam";
    }
    else if (ex == 'FL20G10W') {
      this.exam_name = "Florida FSA 2020 Grade 10 Writing Practice Exam";
    }
    else if (ex == 'ILG3M') {
      this.exam_name = "Illinois IAR Grade 3 Math Practice Exam";
    }
    else if (ex == 'ILG3E') {
      this.exam_name = "Illinois IAR Grade 3 English Language Arts Practice Exam";
    }
    else if (ex == 'ILG4M') {
      this.exam_name = "Illinois IAR Grade 4 Math Practice Exam";
    }
    else if (ex == 'ILG4E') {
      this.exam_name = "Illinois IAR Grade 4 English Language Arts Practice Exam";
    }
    else if (ex == 'ILG5M') {
      this.exam_name = "Illinois IAR Grade 5 Math Practice Exam";
    }
    else if (ex == 'ILG5E') {
      this.exam_name = "Illinois IAR Grade 5 English Language Arts Practice Exam";
    }
    else if (ex == 'ILG6M') {
      this.exam_name = "Illinois IAR Grade 6 Math Practice Exam";
    }
    else if (ex == 'ILG6E') {
      this.exam_name = "Illinois IAR Grade 6 English Language Arts Practice Exam";
    }
    else if (ex == 'ILG7M') {
      this.exam_name = "Illinois IAR Grade 7 Math Practice Exam";
    }
    else if (ex == 'ILG7E') {
      this.exam_name = "Illinois IAR Grade 7 English Language Arts Practice Exam";
    }
    else if (ex == 'ILG8M') {
      this.exam_name = "Illinois IAR Grade 8 Math Practice Exam";
    }
    else if (ex == 'ILG8E') {
      this.exam_name = "Illinois IAR Grade 8 English Language Arts Practice Exam";
    }
    else if (ex == 'MDG3M') {
      this.exam_name = "Maryland MCAP Grade 3 Math Practice Exam";
    }
    else if (ex == 'MDG3E') {
      this.exam_name = "Maryland MCAP Grade 3 English Language Arts Practice Exam";
    }
    else if (ex == 'MDG4M') {
      this.exam_name = "Maryland MCAP Grade 4 Math Practice Exam";
    }
    else if (ex == 'MDG4E') {
      this.exam_name = "Maryland MCAP Grade 4 English Language Arts Practice Exam";
    }
    else if (ex == 'MDG5M') {
      this.exam_name = "Maryland MCAP Grade 5 Math Practice Exam";
    }
    else if (ex == 'MDG5E') {
      this.exam_name = "Maryland MCAP Grade 5 English Language Arts Practice Exam";
    }
    else if (ex == 'MDG5S') {
      this.exam_name = "Maryland MCAP Grade 5 Science Practice Exam";
    }
    else if (ex == 'MDG6M') {
      this.exam_name = "Maryland MCAP Grade 6 Math Practice Exam";
    }
    else if (ex == 'MDG6E') {
      this.exam_name = "Maryland MCAP Grade 6 English Language Arts Practice Exam";
    }
    else if (ex == 'MDG7M') {
      this.exam_name = "Maryland MCAP Grade 7 Math Practice Exam";
    }
    else if (ex == 'MDG7E') {
      this.exam_name = "Maryland MCAP Grade 7 English Language Arts Practice Exam";
    }
    else if (ex == 'MDG8M') {
      this.exam_name = "Maryland MCAP Grade 8 Math Practice Exam";
    }
    else if (ex == 'MDG8E') {
      this.exam_name = "Maryland MCAP Grade 8 English Language Arts Practice Exam";
    }
    else if (ex == 'MDG8S') {
      this.exam_name = "Maryland MCAP Grade 8 Science Practice Exam";
    }
    else if (ex == 'MDG8SS') {
      this.exam_name = "Maryland MCAP Grade 8 Social Studies Practice Exam";
    }
    else if (ex == 'MDG10E') {
      this.exam_name = "Maryland MCAP Grade 10 English Language Arts Practice Exam";
    }
    else if (ex == 'MAG3M') {
      this.exam_name = "Massachusetts MCAS Grade 3 Math Practice Exam";
    }
    else if (ex == 'MAG3E') {
      this.exam_name = "Massachusetts MCAS Grade 3 English Language Arts Practice Exam";
    }
    else if (ex == 'MAG4M') {
      this.exam_name = "Massachusetts MCAS Grade 4 Math Practice Exam";
    }
    else if (ex == 'MAG4E') {
      this.exam_name = "Massachusetts MCAS Grade 4 English Language Arts Practice Exam";
    }
    else if (ex == 'MAG5M') {
      this.exam_name = "Massachusetts MCAS Grade 5 Math Practice Exam";
    }
    else if (ex == 'MAG5E') {
      this.exam_name = "Massachusetts MCAS Grade 5 English Language Arts Practice Exam";
    }
    else if (ex == 'MAG5S') {
      this.exam_name = "Massachusetts MCAS Grade 5 Science Practice Exam";
    }
    else if (ex == 'MAG6M') {
      this.exam_name = "Massachusetts MCAS Grade 6 Math Practice Exam";
    }
    else if (ex == 'MAG6E') {
      this.exam_name = "Massachusetts MCAS Grade 6 English Language Arts Practice Exam";
    }
    else if (ex == 'MAG7M') {
      this.exam_name = "Massachusetts MCAS Grade 7 Math Practice Exam";
    }
    else if (ex == 'MAG7E') {
      this.exam_name = "Massachusetts MCAS Grade 7 English Language Arts Practice Exam";
    }
    else if (ex == 'MAG8M') {
      this.exam_name = "Massachusetts MCAS Grade 8 Math Practice Exam";
    }
    else if (ex == 'MAG8E') {
      this.exam_name = "Massachusetts MCAS Grade 8 English Language Arts Practice Exam";
    }
    else if (ex == 'MAG8S') {
      this.exam_name = "Massachusetts MCAS Grade 8 Science Practice Exam";
    }
    else if (ex == 'MAG10M') {
      this.exam_name = "Massachusetts MCAS Grade 10 Math Practice Exam";
    }
    else if (ex == 'MAG10E') {
      this.exam_name = "Massachusetts MCAS Grade 10 English Language Arts Practice Exam";
    }
    else if (ex == 'MNG3M') {
      this.exam_name = "Minnesota MCA Grade 3 Math Practice Exam";
    }
    else if (ex == 'MNG3R') {
      this.exam_name = "Minnesota MCA Grade 3 Reading Practice Exam";
    }
    else if (ex == 'MNG4M') {
      this.exam_name = "Minnesota MCA Grade 4 Math Practice Exam";
    }
    else if (ex == 'MNG4R') {
      this.exam_name = "Minnesota MCA Grade 4 Reading Practice Exam";
    }
    else if (ex == 'MNG5M') {
      this.exam_name = "Minnesota MCA Grade 5 Math Practice Exam";
    }
    else if (ex == 'MNG5R') {
      this.exam_name = "Minnesota MCA Grade 5 Reading Practice Exam";
    }
    else if (ex == 'MNG5S') {
      this.exam_name = "Minnesota MCA Grade 5 Science Practice Exam";
    }
    else if (ex == 'MNG6M') {
      this.exam_name = "Minnesota MCA Grade 6 Math Practice Exam";
    }
    else if (ex == 'MNG6R') {
      this.exam_name = "Minnesota MCA Grade 6 Reading Practice Exam";
    }
    else if (ex == 'MNG7M') {
      this.exam_name = "Minnesota MCA Grade 7 Math Practice Exam";
    }
    else if (ex == 'MNG7R') {
      this.exam_name = "Minnesota MCA Grade 7 Reading Practice Exam";
    }
    else if (ex == 'MNG8M') {
      this.exam_name = "Minnesota MCA Grade 8 Math Practice Exam";
    }
    else if (ex == 'MNG8R') {
      this.exam_name = "Minnesota MCA Grade 8 Reading Practice Exam";
    }
    else if (ex == 'MNG8S') {
      this.exam_name = "Minnesota MCA Grade 8 Science Practice Exam";
    }
    else if (ex == 'MNG8SS') {
      this.exam_name = "Minnesota MCA Grade 8 Social Studies Practice Exam";
    }
    else if (ex == 'MNG10R') {
      this.exam_name = "Minnesota MCA Grade 10 Reading Practice Exam";
    }
    else if (ex == 'MNG11M') {
      this.exam_name = "Minnesota MCA Grade 11 Math Practice Exam";
    }
    else if (ex == 'MNHSS') {
      this.exam_name = "Minnesota MCA High School Science Practice Exam";
    }
    else if (ex == 'MOG3M') {
      this.exam_name = "Missouri MAP Grade 3 Math Practice Exam";
    }
    else if (ex == 'MOG3E') {
      this.exam_name = "Missouri MAP Grade 3 English Language Arts Practice Exam";
    }
    else if (ex == 'MOG4M') {
      this.exam_name = "Missouri MAP Grade 4 Math Practice Exam";
    }
    else if (ex == 'MOG4E') {
      this.exam_name = "Missouri MAP Grade 4 English Language Arts Practice Exam";
    }
    else if (ex == 'MOG5M') {
      this.exam_name = "Missouri MAP Grade 5 Math Practice Exam";
    }
    else if (ex == 'MOG5E') {
      this.exam_name = "Missouri MAP Grade 5 English Language Arts Practice Exam";
    }
    else if (ex == 'MOG5S') {
      this.exam_name = "Missouri MAP Grade 5 Science Practice Exam";
    }
    else if (ex == 'MOG6M') {
      this.exam_name = "Missouri MAP Grade 6 Math Practice Exam";
    }
    else if (ex == 'MOG6E') {
      this.exam_name = "Missouri MAP Grade 6 English Language Arts Practice Exam";
    }
    else if (ex == 'MOG7M') {
      this.exam_name = "Missouri MAP Grade 7 Math Practice Exam";
    }
    else if (ex == 'MOG7E') {
      this.exam_name = "Missouri MAP Grade 7 English Language Arts Practice Exam";
    }
    else if (ex == 'MOG8M') {
      this.exam_name = "Missouri MAP Grade 8 Math Practice Exam";
    }
    else if (ex == 'MOG8E') {
      this.exam_name = "Missouri MAP Grade 8 English Language Arts Practice Exam";
    }
    else if (ex == 'MOG8S') {
      this.exam_name = "Missouri MAP Grade 8 Science Practice Exam";
    }
    else if (ex == 'NJG3M') {
      this.exam_name = "New Jersey NJSLA Grade 3 Math Practice Exam";
    }
    else if (ex == 'NJG3E') {
      this.exam_name = "New Jersey NJSLA Grade 3 English Language Arts Practice Exam";
    }
    else if (ex == 'NJG4M') {
      this.exam_name = "New Jersey NJSLA Grade 4 Math Practice Exam";
    }
    else if (ex == 'NJG4E') {
      this.exam_name = "New Jersey NJSLA Grade 4 English Language Arts Practice Exam";
    }
    else if (ex == 'NJG5M') {
      this.exam_name = "New Jersey NJSLA Grade 5 Math Practice Exam";
    }
    else if (ex == 'NJG5E') {
      this.exam_name = "New Jersey NJSLA Grade 5 English Language Arts Practice Exam";
    }
    else if (ex == 'NJG5S') {
      this.exam_name = "New Jersey NJSLA Grade 5 Science Practice Exam";
    }
    else if (ex == 'NJG6M') {
      this.exam_name = "New Jersey NJSLA Grade 6 Math Practice Exam";
    }
    else if (ex == 'NJG6E') {
      this.exam_name = "New Jersey NJSLA Grade 6 English Language Arts Practice Exam";
    }
    else if (ex == 'NJG7M') {
      this.exam_name = "New Jersey NJSLA Grade 7 Math Practice Exam";
    }
    else if (ex == 'NJG7E') {
      this.exam_name = "New Jersey NJSLA Grade 7 English Language Arts Practice Exam";
    }
    else if (ex == 'NJG8M') {
      this.exam_name = "New Jersey NJSLA Grade 8 Math Practice Exam";
    }
    else if (ex == 'NJG8E') {
      this.exam_name = "New Jersey NJSLA Grade 8 English Language Arts Practice Exam";
    }
    else if (ex == 'NJG8S') {
      this.exam_name = "New Jersey NJSLA Grade 8 Science Practice Exam";
    }
    else if (ex == 'NJG9E') {
      this.exam_name = "New Jersey NJSLA Grade 9 English Language Arts Practice Exam";
    }
    else if (ex == 'NJG11S') {
      this.exam_name = "New Jersey NJSLA Grade 11 Science Practice Exam";
    }
    else if (ex == 'NY22G3M') {
      this.exam_name = "New York NYSTP 2022 Grade 3 Math Exam";
    }
    else if (ex == 'NY22G3E') {
      this.exam_name = "New York NYSTP 2022 Grade 3 English Language Arts Exam";
    }
    else if (ex == 'NY22G4M') {
      this.exam_name = "New York NYSTP 2022 Grade 4 Math Exam";
    }
    else if (ex == 'NY22G4E') {
      this.exam_name = "New York NYSTP 2022 Grade 4 English Language Arts Exam";
    }
    else if (ex == 'NY22G4S') {
      this.exam_name = "New York NYSTP 2022 Grade 4 Science Exam";
    }
    else if (ex == 'NY22G5M') {
      this.exam_name = "New York NYSTP 2022 Grade 5 Math Exam";
    }
    else if (ex == 'NY22G5E') {
      this.exam_name = "New York NYSTP 2022 Grade 5 English Language Arts Exam";
    }
    else if (ex == 'NY22G6M') {
      this.exam_name = "New York NYSTP 2022 Grade 6 Math Exam";
    }
    else if (ex == 'NY22G6E') {
      this.exam_name = "New York NYSTP 2022 Grade 6 English Language Arts Exam";
    }
    else if (ex == 'NY22G7M') {
      this.exam_name = "New York NYSTP 2022 Grade 7 Math Exam";
    }
    else if (ex == 'NY22G7E') {
      this.exam_name = "New York NYSTP 2022 Grade 7 English Language Arts Exam";
    }
    else if (ex == 'NY22G8M') {
      this.exam_name = "New York NYSTP 2022 Grade 8 Math Exam";
    }
    else if (ex == 'NY22G8E') {
      this.exam_name = "New York NYSTP 2022 Grade 8 English Language Arts Exam";
    }
    else if (ex == 'NY22G8S') {
      this.exam_name = "New York NYSTP 2022 Grade 8 Science Exam";
    }
    else if (ex == 'NY21G3M') {
      this.exam_name = "New York NYSTP 2021 Grade 3 Math Exam";
    }
    else if (ex == 'NY21G3E') {
      this.exam_name = "New York NYSTP 2021 Grade 3 English Language Arts Exam";
    }
    else if (ex == 'NY21G4M') {
      this.exam_name = "New York NYSTP 2021 Grade 4 Math Exam";
    }
    else if (ex == 'NY21G4E') {
      this.exam_name = "New York NYSTP 2021 Grade 4 English Language Arts Exam";
    }
    else if (ex == 'NY21G4S') {
      this.exam_name = "New York NYSTP 2021 Grade 4 Science Exam";
    }
    else if (ex == 'NY21G5M') {
      this.exam_name = "New York NYSTP 2021 Grade 5 Math Exam";
    }
    else if (ex == 'NY21G5E') {
      this.exam_name = "New York NYSTP 2021 Grade 5 English Language Arts Exam";
    }
    else if (ex == 'NY21G6M') {
      this.exam_name = "New York NYSTP 2021 Grade 6 Math Exam";
    }
    else if (ex == 'NY21G6E') {
      this.exam_name = "New York NYSTP 2021 Grade 6 English Language Arts Exam";
    }
    else if (ex == 'NY21G7M') {
      this.exam_name = "New York NYSTP 2021 Grade 7 Math Exam";
    }
    else if (ex == 'NY21G7E') {
      this.exam_name = "New York NYSTP 2021 Grade 7 English Language Arts Exam";
    }
    else if (ex == 'NY21G8M') {
      this.exam_name = "New York NYSTP 2021 Grade 8 Math Exam";
    }
    else if (ex == 'NY21G8E') {
      this.exam_name = "New York NYSTP 2021 Grade 8 English Language Arts Exam";
    }
    else if (ex == 'NY21G8S') {
      this.exam_name = "New York NYSTP 2021 Grade 8 Science Exam";
    }
    else if (ex == 'NY19G3M') {
      this.exam_name = "New York NYSTP 2019 Grade 3 Math Exam";
    }
    else if (ex == 'NY19G3E') {
      this.exam_name = "New York NYSTP 2019 Grade 3 English Language Arts Exam";
    }
    else if (ex == 'NY19G4M') {
      this.exam_name = "New York NYSTP 2019 Grade 4 Math Exam";
    }
    else if (ex == 'NY19G4E') {
      this.exam_name = "New York NYSTP 2019 Grade 4 English Language Arts Exam";
    }
    else if (ex == 'NY19G4S') {
      this.exam_name = "New York NYSTP 2019 Grade 4 Science Exam";
    }
    else if (ex == 'NY19G5M') {
      this.exam_name = "New York NYSTP 2019 Grade 5 Math Exam";
    }
    else if (ex == 'NY19G5E') {
      this.exam_name = "New York NYSTP 2019 Grade 5 English Language Arts Exam";
    }
    else if (ex == 'NY19G6M') {
      this.exam_name = "New York NYSTP 2019 Grade 6 Math Exam";
    }
    else if (ex == 'NY19G6E') {
      this.exam_name = "New York NYSTP 2019 Grade 6 English Language Arts Exam";
    }
    else if (ex == 'NY19G7M') {
      this.exam_name = "New York NYSTP 2019 Grade 7 Math Exam";
    }
    else if (ex == 'NY19G7E') {
      this.exam_name = "New York NYSTP 2019 Grade 7 English Language Arts Exam";
    }
    else if (ex == 'NY19G8M') {
      this.exam_name = "New York NYSTP 2019 Grade 8 Math Exam";
    }
    else if (ex == 'NY19G8E') {
      this.exam_name = "New York NYSTP 2019 Grade 8 English Language Arts Exam";
    }
    else if (ex == 'NY19G8S') {
      this.exam_name = "New York NYSTP 2019 Grade 8 Science Exam";
    }
    else if (ex == 'NY18G3M') {
      this.exam_name = "New York NYSTP 2018 Grade 3 Math Exam";
    }
    else if (ex == 'NY18G3E') {
      this.exam_name = "New York NYSTP 2018 Grade 3 English Language Arts Exam";
    }
    else if (ex == 'NY18G4M') {
      this.exam_name = "New York NYSTP 2018 Grade 4 Math Exam";
    }
    else if (ex == 'NY18G4E') {
      this.exam_name = "New York NYSTP 2018 Grade 4 English Language Arts Exam";
    }
    else if (ex == 'NY18G4S') {
      this.exam_name = "New York NYSTP 2018 Grade 4 Science Exam";
    }
    else if (ex == 'NY18G5M') {
      this.exam_name = "New York NYSTP 2018 Grade 5 Math Exam";
    }
    else if (ex == 'NY18G5E') {
      this.exam_name = "New York NYSTP 2018 Grade 5 English Language Arts Exam";
    }
    else if (ex == 'NY18G6M') {
      this.exam_name = "New York NYSTP 2018 Grade 6 Math Exam";
    }
    else if (ex == 'NY18G6E') {
      this.exam_name = "New York NYSTP 2018 Grade 6 English Language Arts Exam";
    }
    else if (ex == 'NY18G7M') {
      this.exam_name = "New York NYSTP 2018 Grade 7 Math Exam";
    }
    else if (ex == 'NY18G7E') {
      this.exam_name = "New York NYSTP 2018 Grade 7 English Language Arts Exam";
    }
    else if (ex == 'NY18G8M') {
      this.exam_name = "New York NYSTP 2018 Grade 8 Math Exam";
    }
    else if (ex == 'NY18G8E') {
      this.exam_name = "New York NYSTP 2018 Grade 8 English Language Arts Exam";
    }
    else if (ex == 'NY18G8S') {
      this.exam_name = "New York NYSTP 2018 Grade 8 Science Exam";
    }
    else if (ex == 'NY17G3M') {
      this.exam_name = "New York NYSTP 2017 Grade 3 Math Exam";
    }
    else if (ex == 'NY17G3E') {
      this.exam_name = "New York NYSTP 2017 Grade 3 English Language Arts Exam";
    }
    else if (ex == 'NY17G4M') {
      this.exam_name = "New York NYSTP 2017 Grade 4 Math Exam";
    }
    else if (ex == 'NY17G4E') {
      this.exam_name = "New York NYSTP 2017 Grade 4 English Language Arts Exam";
    }
    else if (ex == 'NY17G4S') {
      this.exam_name = "New York NYSTP 2017 Grade 4 Science Exam";
    }
    else if (ex == 'NY17G5M') {
      this.exam_name = "New York NYSTP 2017 Grade 5 Math Exam";
    }
    else if (ex == 'NY17G5E') {
      this.exam_name = "New York NYSTP 2017 Grade 5 English Language Arts Exam";
    }
    else if (ex == 'NY17G6M') {
      this.exam_name = "New York NYSTP 2017 Grade 6 Math Exam";
    }
    else if (ex == 'NY17G6E') {
      this.exam_name = "New York NYSTP 2017 Grade 6 English Language Arts Exam";
    }
    else if (ex == 'NY17G7M') {
      this.exam_name = "New York NYSTP 2017 Grade 7 Math Exam";
    }
    else if (ex == 'NY17G7E') {
      this.exam_name = "New York NYSTP 2017 Grade 7 English Language Arts Exam";
    }
    else if (ex == 'NY17G8M') {
      this.exam_name = "New York NYSTP 2017 Grade 8 Math Exam";
    }
    else if (ex == 'NY17G8E') {
      this.exam_name = "New York NYSTP 2017 Grade 8 English Language Arts Exam";
    }
    else if (ex == 'NY17G8S') {
      this.exam_name = "New York NYSTP 2017 Grade 8 Science Exam";
    }
    else if (ex == 'NY16G3M') {
      this.exam_name = "New York NYSTP 2016 Grade 3 Math Exam";
    }
    else if (ex == 'NY16G3E') {
      this.exam_name = "New York NYSTP 2016 Grade 3 English Language Arts Exam";
    }
    else if (ex == 'NY16G4M') {
      this.exam_name = "New York NYSTP 2016 Grade 4 Math Exam";
    }
    else if (ex == 'NY16G4E') {
      this.exam_name = "New York NYSTP 2016 Grade 4 English Language Arts Exam";
    }
    else if (ex == 'NY16G4S') {
      this.exam_name = "New York NYSTP 2016 Grade 4 Science Exam";
    }
    else if (ex == 'NY16G5M') {
      this.exam_name = "New York NYSTP 2016 Grade 5 Math Exam";
    }
    else if (ex == 'NY16G5E') {
      this.exam_name = "New York NYSTP 2016 Grade 5 English Language Arts Exam";
    }
    else if (ex == 'NY16G6M') {
      this.exam_name = "New York NYSTP 2016 Grade 6 Math Exam";
    }
    else if (ex == 'NY16G6E') {
      this.exam_name = "New York NYSTP 2016 Grade 6 English Language Arts Exam";
    }
    else if (ex == 'NY16G7M') {
      this.exam_name = "New York NYSTP 2016 Grade 7 Math Exam";
    }
    else if (ex == 'NY16G7E') {
      this.exam_name = "New York NYSTP 2016 Grade 7 English Language Arts Exam";
    }
    else if (ex == 'NY16G8M') {
      this.exam_name = "New York NYSTP 2016 Grade 8 Math Exam";
    }
    else if (ex == 'NY16G8E') {
      this.exam_name = "New York NYSTP 2016 Grade 8 English Language Arts Exam";
    }
    else if (ex == 'NY16G8S') {
      this.exam_name = "New York NYSTP 2016 Grade 8 Science Exam";
    }
    else if (ex == 'NY15G3M') {
      this.exam_name = "New York NYSTP 2015 Grade 3 Math Exam";
    }
    else if (ex == 'NY15G3E') {
      this.exam_name = "New York NYSTP 2015 Grade 3 English Language Arts Exam";
    }
    else if (ex == 'NY15G4M') {
      this.exam_name = "New York NYSTP 2015 Grade 4 Math Exam";
    }
    else if (ex == 'NY15G4E') {
      this.exam_name = "New York NYSTP 2015 Grade 4 English Language Arts Exam";
    }
    else if (ex == 'NY15G4S') {
      this.exam_name = "New York NYSTP 2015 Grade 4 Science Exam";
    }
    else if (ex == 'NY15G5M') {
      this.exam_name = "New York NYSTP 2015 Grade 5 Math Exam";
    }
    else if (ex == 'NY15G5E') {
      this.exam_name = "New York NYSTP 2015 Grade 5 English Language Arts Exam";
    }
    else if (ex == 'NY15G6M') {
      this.exam_name = "New York NYSTP 2015 Grade 6 Math Exam";
    }
    else if (ex == 'NY15G6E') {
      this.exam_name = "New York NYSTP 2015 Grade 6 English Language Arts Exam";
    }
    else if (ex == 'NY15G7M') {
      this.exam_name = "New York NYSTP 2015 Grade 7 Math Exam";
    }
    else if (ex == 'NY15G7E') {
      this.exam_name = "New York NYSTP 2015 Grade 7 English Language Arts Exam";
    }
    else if (ex == 'NY15G8M') {
      this.exam_name = "New York NYSTP 2015 Grade 8 Math Exam";
    }
    else if (ex == 'NY15G8E') {
      this.exam_name = "New York NYSTP 2015 Grade 8 English Language Arts Exam";
    }
    else if (ex == 'NY15G8S') {
      this.exam_name = "New York NYSTP 2015 Grade 8 Science Exam";
    }
    else if (ex == 'NC18G3M') {
      this.exam_name = "North Carolina EOG 2018 Grade 3 Math Exam";
    }
    else if (ex == 'NC18G3R') {
      this.exam_name = "North Carolina EOG 2018 Grade 3 Reading Exam";
    }
    else if (ex == 'NC18G4M') {
      this.exam_name = "North Carolina EOG 2018 Grade 4 Math Exam";
    }
    else if (ex == 'NC18G4R') {
      this.exam_name = "North Carolina EOG 2018 Grade 4 Reading Exam";
    }
    else if (ex == 'NC18G5M') {
      this.exam_name = "North Carolina EOG 2018 Grade 5 Math Exam";
    }
    else if (ex == 'NC18G5R') {
      this.exam_name = "North Carolina EOG 2018 Grade 5 Reading Exam";
    }
    else if (ex == 'NC18G5S') {
      this.exam_name = "North Carolina EOG 2018 Grade 5 Science Exam";
    }
    else if (ex == 'NC18G6M') {
      this.exam_name = "North Carolina EOG 2018 Grade 6 Math Exam";
    }
    else if (ex == 'NC18G6R') {
      this.exam_name = "North Carolina EOG 2018 Grade 6 Reading Exam";
    }
    else if (ex == 'NC18G7M') {
      this.exam_name = "North Carolina EOG 2018 Grade 7 Math Exam";
    }
    else if (ex == 'NC18G7R') {
      this.exam_name = "North Carolina EOG 2018 Grade 7 Reading Exam";
    }
    else if (ex == 'NC18G8M') {
      this.exam_name = "North Carolina EOG 2018 Grade 8 Math Exam";
    }
    else if (ex == 'NC18G8R') {
      this.exam_name = "North Carolina EOG 2018 Grade 8 Reading Exam";
    }
    else if (ex == 'NC18G8S') {
      this.exam_name = "North Carolina EOG 2018 Grade 8 Science Exam";
    }
    else if (ex == 'PA22G3M') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 3 Math Exam";
    }
    else if (ex == 'PA22G3E') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 3 English Language Arts Exam";
    }
    else if (ex == 'PA22G4M') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 4 Math Exam";
    }
    else if (ex == 'PA22G4E') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 4 English Language Arts Exam";
    }
    else if (ex == 'PA22G4S') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 4 Science Exam";
    }
    else if (ex == 'PA22G5M') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 5 Math Exam";
    }
    else if (ex == 'PA22G5E') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 5 English Language Arts Exam";
    }
    else if (ex == 'PA22G6M') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 6 Math Exam";
    }
    else if (ex == 'PA22G6E') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 6 English Language Arts Exam";
    }
    else if (ex == 'PA22G7M') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 7 Math Exam";
    }
    else if (ex == 'PA22G7E') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 7 English Language Arts Exam";
    }
    else if (ex == 'PA22G8M') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 8 Math Exam";
    }
    else if (ex == 'PA22G8E') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 8 English Language Arts Exam";
    }
    else if (ex == 'PA22G8S') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 8 Science Exam";
    }
    else if (ex == 'PA21G3M') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 3 Math Exam";
    }
    else if (ex == 'PA21G3E') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 3 English Language Arts Exam";
    }
    else if (ex == 'PA21G4M') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 4 Math Exam";
    }
    else if (ex == 'PA21G4E') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 4 English Language Arts Exam";
    }
    else if (ex == 'PA21G4S') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 4 Science Exam";
    }
    else if (ex == 'PA21G5M') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 5 Math Exam";
    }
    else if (ex == 'PA21G5E') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 5 English Language Arts Exam";
    }
    else if (ex == 'PA21G6M') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 6 Math Exam";
    }
    else if (ex == 'PA21G6E') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 6 English Language Arts Exam";
    }
    else if (ex == 'PA21G7M') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 7 Math Exam";
    }
    else if (ex == 'PA21G7E') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 7 English Language Arts Exam";
    }
    else if (ex == 'PA21G8M') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 8 Math Exam";
    }
    else if (ex == 'PA21G8E') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 8 English Language Arts Exam";
    }
    else if (ex == 'PA21G8S') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 8 Science Exam";
    }
    else if (ex == 'PA19G3M') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 3 Math Exam";
    }
    else if (ex == 'PA19G3E') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 3 English Language Arts Exam";
    }
    else if (ex == 'PA19G4M') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 4 Math Exam";
    }
    else if (ex == 'PA19G4E') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 4 English Language Arts Exam";
    }
    else if (ex == 'PA19G4S') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 4 Science Exam";
    }
    else if (ex == 'PA19G5M') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 5 Math Exam";
    }
    else if (ex == 'PA19G5E') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 5 English Language Arts Exam";
    }
    else if (ex == 'PA19G6M') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 6 Math Exam";
    }
    else if (ex == 'PA19G6E') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 6 English Language Arts Exam";
    }
    else if (ex == 'PA19G7M') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 7 Math Exam";
    }
    else if (ex == 'PA19G7E') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 7 English Language Arts Exam";
    }
    else if (ex == 'PA19G8M') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 8 Math Exam";
    }
    else if (ex == 'PA19G8E') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 8 English Language Arts Exam";
    }
    else if (ex == 'PA19G8S') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 8 Science Exam";
    }
    else if (ex == 'PA18G3M') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 3 Math Exam";
    }
    else if (ex == 'PA18G3E') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 3 English Language Arts Exam";
    }
    else if (ex == 'PA18G4M') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 4 Math Exam";
    }
    else if (ex == 'PA18G4E') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 4 English Language Arts Exam";
    }
    else if (ex == 'PA18G4S') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 4 Science Exam";
    }
    else if (ex == 'PA18G5M') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 5 Math Exam";
    }
    else if (ex == 'PA18G5E') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 5 English Language Arts Exam";
    }
    else if (ex == 'PA18G6M') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 6 Math Exam";
    }
    else if (ex == 'PA18G6E') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 6 English Language Arts Exam";
    }
    else if (ex == 'PA18G7M') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 7 Math Exam";
    }
    else if (ex == 'PA18G7E') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 7 English Language Arts Exam";
    }
    else if (ex == 'PA18G8M') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 8 Math Exam";
    }
    else if (ex == 'PA18G8E') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 8 English Language Arts Exam";
    }
    else if (ex == 'PA18G8S') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 8 Science Exam";
    }
    else if (ex == 'PA16G3M') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 3 Math Exam";
    }
    else if (ex == 'PA16G3E') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 3 English Language Arts Exam";
    }
    else if (ex == 'PA16G4M') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 4 Math Exam";
    }
    else if (ex == 'PA16G4E') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 4 English Language Arts Exam";
    }
    else if (ex == 'PA16G4S') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 4 Science Exam";
    }
    else if (ex == 'PA16G5M') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 5 Math Exam";
    }
    else if (ex == 'PA16G5E') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 5 English Language Arts Exam";
    }
    else if (ex == 'PA16G6M') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 6 Math Exam";
    }
    else if (ex == 'PA16G6E') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 6 English Language Arts Exam";
    }
    else if (ex == 'PA16G7M') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 7 Math Exam";
    }
    else if (ex == 'PA16G7E') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 7 English Language Arts Exam";
    }
    else if (ex == 'PA16G8M') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 8 Math Exam";
    }
    else if (ex == 'PA16G8E') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 8 English Language Arts Exam";
    }
    else if (ex == 'PA16G8S') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 8 Science Exam";
    }
    else if (ex == 'PA15G3M') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 3 Math Exam";
    }
    else if (ex == 'PA15G3E') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 3 English Language Arts Exam";
    }
    else if (ex == 'PA15G4M') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 4 Math Exam";
    }
    else if (ex == 'PA15G4E') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 4 English Language Arts Exam";
    }
    else if (ex == 'PA15G4S') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 4 Science Exam";
    }
    else if (ex == 'PA15G5M') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 5 Math Exam";
    }
    else if (ex == 'PA15G5E') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 5 English Language Arts Exam";
    }
    else if (ex == 'PA15G6M') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 6 Math Exam";
    }
    else if (ex == 'PA15G6E') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 6 English Language Arts Exam";
    }
    else if (ex == 'PA15G7M') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 7 Math Exam";
    }
    else if (ex == 'PA15G7E') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 7 English Language Arts Exam";
    }
    else if (ex == 'PA15G8M') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 8 Math Exam";
    }
    else if (ex == 'PA15G8E') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 8 English Language Arts Exam";
    }
    else if (ex == 'PA15G8S') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 8 Science Exam";
    }
    else if (ex == 'TN20G3M') {
      this.exam_name = "Tennessee TCAP Grade 3 Math Practice Exam";
    }
    else if (ex == 'TN20G3E') {
      this.exam_name = "Tennessee TCAP Grade 3 English Language Arts Practice Exam";
    }
    else if (ex == 'TN20G3S') {
      this.exam_name = "Tennessee TCAP Grade 3 Science Practice Exam";
    }
    else if (ex == 'TN20G4M') {
      this.exam_name = "Tennessee TCAP Grade 4 Math Practice Exam";
    }
    else if (ex == 'TN20G4E') {
      this.exam_name = "Tennessee TCAP Grade 4 English Language Arts Practice Exam";
    }
    else if (ex == 'TN20G4S') {
      this.exam_name = "Tennessee TCAP Grade 4 Science Practice Exam";
    }
    else if (ex == 'TN20G5M') {
      this.exam_name = "Tennessee TCAP Grade 5 Math Practice Exam";
    }
    else if (ex == 'TN20G5E') {
      this.exam_name = "Tennessee TCAP Grade 5 English Language Arts Practice Exam";
    }
    else if (ex == 'TN20G5S') {
      this.exam_name = "Tennessee TCAP Grade 5 Science Practice Exam";
    }
    else if (ex == 'TN20G6M') {
      this.exam_name = "Tennessee TCAP Grade 6 Math Practice Exam";
    }
    else if (ex == 'TN20G6E') {
      this.exam_name = "Tennessee TCAP Grade 6 English Language Arts Practice Exam";
    }
    else if (ex == 'TN20G6S') {
      this.exam_name = "Tennessee TCAP Grade 6 Science Practice Exam";
    }
    else if (ex == 'TN20G6SS') {
      this.exam_name = "Tennessee TCAP Grade 6 Social Studies Practice Exam";
    }
    else if (ex == 'TN20G7M') {
      this.exam_name = "Tennessee TCAP Grade 7 Math Practice Exam";
    }
    else if (ex == 'TN20G7E') {
      this.exam_name = "Tennessee TCAP Grade 7 English Language Arts Practice Exam";
    }
    else if (ex == 'TN20G7S') {
      this.exam_name = "Tennessee TCAP Grade 7 Science Practice Exam";
    }
    else if (ex == 'TN20G7SS') {
      this.exam_name = "Tennessee TCAP Grade 7 Social Studies Practice Exam";
    }
    else if (ex == 'TN20G8M') {
      this.exam_name = "Tennessee TCAP Grade 8 Math Practice Exam";
    }
    else if (ex == 'TN20G8E') {
      this.exam_name = "Tennessee TCAP Grade 8 English Language Arts Practice Exam";
    }
    else if (ex == 'TN20G8S') {
      this.exam_name = "Tennessee TCAP Grade 8 Science Practice Exam";
    }
    else if (ex == 'TN20G8SS') {
      this.exam_name = "Tennessee TCAP Grade 8 Social Studies Practice Exam";
    }
    else if (ex == 'TX22G3M') {
      this.exam_name = "Texas STAAR 2022 Grade 3 Math Exam";
    }
    else if (ex == 'TX21G3M') {
      this.exam_name = "Texas STAAR 2021 Grade 3 Math Exam";
    }
    else if (ex == 'TX19G3M') {
      this.exam_name = "Texas STAAR 2019 Grade 3 Math Exam";
    }
    else if (ex == 'TX18G3M') {
      this.exam_name = "Texas STAAR 2018 Grade 3 Math Exam";
    }
    else if (ex == 'TX17G3M') {
      this.exam_name = "Texas STAAR 2017 Grade 3 Math Exam";
    }
    else if (ex == 'TX22G3R') {
      this.exam_name = "Texas STAAR 2022 Grade 3 Reading Exam";
    }
    else if (ex == 'TX21G3R') {
      this.exam_name = "Texas STAAR 2021 Grade 3 Reading Exam";
    }
    else if (ex == 'TX19G3R') {
      this.exam_name = "Texas STAAR 2019 Grade 3 Reading Exam";
    }
    else if (ex == 'TX18G3R') {
      this.exam_name = "Texas STAAR 2018 Grade 3 Reading Exam";
    }
    else if (ex == 'TX17G3R') {
      this.exam_name = "Texas STAAR 2017 Grade 3 Reading Exam";
    }
    else if (ex == 'TX22G4M') {
      this.exam_name = "Texas STAAR 2022 Grade 4 Math Exam";
    }
    else if (ex == 'TX21G4M') {
      this.exam_name = "Texas STAAR 2021 Grade 4 Math Exam";
    }
    else if (ex == 'TX19G4M') {
      this.exam_name = "Texas STAAR 2019 Grade 4 Math Exam";
    }
    else if (ex == 'TX18G4M') {
      this.exam_name = "Texas STAAR 2018 Grade 4 Math Exam";
    }
    else if (ex == 'TX17G4M') {
      this.exam_name = "Texas STAAR 2017 Grade 4 Math Exam";
    }
    else if (ex == 'TX22G4R') {
      this.exam_name = "Texas STAAR 2022 Grade 4 Reading Exam";
    }
    else if (ex == 'TX21G4R') {
      this.exam_name = "Texas STAAR 2021 Grade 4 Reading Exam";
    }
    else if (ex == 'TX19G4R') {
      this.exam_name = "Texas STAAR 2019 Grade 4 Reading Exam";
    }
    else if (ex == 'TX18G4R') {
      this.exam_name = "Texas STAAR 2018 Grade 4 Reading Exam";
    }
    else if (ex == 'TX17G4R') {
      this.exam_name = "Texas STAAR 2017 Grade 4 Reading Exam";
    }
    else if (ex == 'TX22G5M') {
      this.exam_name = "Texas STAAR 2022 Grade 5 Math Exam";
    }
    else if (ex == 'TX21G5M') {
      this.exam_name = "Texas STAAR 2021 Grade 5 Math Exam";
    }
    else if (ex == 'TX19G5M') {
      this.exam_name = "Texas STAAR 2019 Grade 5 Math Exam";
    }
    else if (ex == 'TX18G5M') {
      this.exam_name = "Texas STAAR 2018 Grade 5 Math Exam";
    }
    else if (ex == 'TX17G5M') {
      this.exam_name = "Texas STAAR 2017 Grade 5 Math Exam";
    }
    else if (ex == 'TX22G5R') {
      this.exam_name = "Texas STAAR 2022 Grade 5 Reading Exam";
    }
    else if (ex == 'TX21G5R') {
      this.exam_name = "Texas STAAR 2021 Grade 5 Reading Exam";
    }
    else if (ex == 'TX19G5R') {
      this.exam_name = "Texas STAAR 2019 Grade 5 Reading Exam";
    }
    else if (ex == 'TX18G5R') {
      this.exam_name = "Texas STAAR 2018 Grade 5 Reading Exam";
    }
    else if (ex == 'TX17G5R') {
      this.exam_name = "Texas STAAR 2017 Grade 5 Reading Exam";
    }
    else if (ex == 'TX22G5S') {
      this.exam_name = "Texas STAAR 2022 Grade 5 Science Exam";
    }
    else if (ex == 'TX21G5S') {
      this.exam_name = "Texas STAAR 2021 Grade 5 Science Exam";
    }
    else if (ex == 'TX19G5S') {
      this.exam_name = "Texas STAAR 2019 Grade 5 Science Exam";
    }
    else if (ex == 'TX18G5S') {
      this.exam_name = "Texas STAAR 2018 Grade 5 Science Exam";
    }
    else if (ex == 'TX22G6M') {
      this.exam_name = "Texas STAAR 2022 Grade 6 Math Exam";
    }
    else if (ex == 'TX21G6M') {
      this.exam_name = "Texas STAAR 2021 Grade 6 Math Exam";
    }
    else if (ex == 'TX19G6M') {
      this.exam_name = "Texas STAAR 2019 Grade 6 Math Exam";
    }
    else if (ex == 'TX18G6M') {
      this.exam_name = "Texas STAAR 2018 Grade 6 Math Exam";
    }
    else if (ex == 'TX17G6M') {
      this.exam_name = "Texas STAAR 2017 Grade 6 Math Exam";
    }
    else if (ex == 'TX22G6R') {
      this.exam_name = "Texas STAAR 2022 Grade 6 Reading Exam";
    }
    else if (ex == 'TX21G6R') {
      this.exam_name = "Texas STAAR 2021 Grade 6 Reading Exam";
    }
    else if (ex == 'TX19G6R') {
      this.exam_name = "Texas STAAR 2019 Grade 6 Reading Exam";
    }
    else if (ex == 'TX18G6R') {
      this.exam_name = "Texas STAAR 2018 Grade 6 Reading Exam";
    }
    else if (ex == 'TX17G6R') {
      this.exam_name = "Texas STAAR 2017 Grade 6 Reading Exam";
    }
    else if (ex == 'TX22G7M') {
      this.exam_name = "Texas STAAR 2022 Grade 7 Math Exam";
    }
    else if (ex == 'TX21G7M') {
      this.exam_name = "Texas STAAR 2021 Grade 7 Math Exam";
    }
    else if (ex == 'TX19G7M') {
      this.exam_name = "Texas STAAR 2019 Grade 7 Math Exam";
    }
    else if (ex == 'TX18G7M') {
      this.exam_name = "Texas STAAR 2018 Grade 7 Math Exam";
    }
    else if (ex == 'TX17G7M') {
      this.exam_name = "Texas STAAR 2017 Grade 7 Math Exam";
    }
    else if (ex == 'TX22G7R') {
      this.exam_name = "Texas STAAR 2022 Grade 7 Reading Exam";
    }
    else if (ex == 'TX21G7R') {
      this.exam_name = "Texas STAAR 2021 Grade 7 Reading Exam";
    }
    else if (ex == 'TX19G7R') {
      this.exam_name = "Texas STAAR 2019 Grade 7 Reading Exam";
    }
    else if (ex == 'TX18G7R') {
      this.exam_name = "Texas STAAR 2018 Grade 7 Reading Exam";
    }
    else if (ex == 'TX17G7R') {
      this.exam_name = "Texas STAAR 2017 Grade 7 Reading Exam";
    }
    else if (ex == 'TX22G8M') {
      this.exam_name = "Texas STAAR 2022 Grade 8 Math Exam";
    }
    else if (ex == 'TX21G8M') {
      this.exam_name = "Texas STAAR 2021 Grade 8 Math Exam";
    }
    else if (ex == 'TX19G8M') {
      this.exam_name = "Texas STAAR 2019 Grade 8 Math Exam";
    }
    else if (ex == 'TX18G8M') {
      this.exam_name = "Texas STAAR 2018 Grade 8 Math Exam";
    }
    else if (ex == 'TX17G8M') {
      this.exam_name = "Texas STAAR 2017 Grade 8 Math Exam";
    }
    else if (ex == 'TX22G8R') {
      this.exam_name = "Texas STAAR 2022 Grade 8 Reading Exam";
    }
    else if (ex == 'TX21G8R') {
      this.exam_name = "Texas STAAR 2021 Grade 8 Reading Exam";
    }
    else if (ex == 'TX19G8R') {
      this.exam_name = "Texas STAAR 2019 Grade 8 Reading Exam";
    }
    else if (ex == 'TX18G8R') {
      this.exam_name = "Texas STAAR 2018 Grade 8 Reading Exam";
    }
    else if (ex == 'TX17G8R') {
      this.exam_name = "Texas STAAR 2017 Grade 8 Reading Exam";
    }
    else if (ex == 'TX22G8S') {
      this.exam_name = "Texas STAAR 2022 Grade 8 Science Exam";
    }
    else if (ex == 'TX21G8S') {
      this.exam_name = "Texas STAAR 2021 Grade 8 Science Exam";
    }
    else if (ex == 'TX19G8S') {
      this.exam_name = "Texas STAAR 2019 Grade 8 Science Exam";
    }
    else if (ex == 'TX18G8S') {
      this.exam_name = "Texas STAAR 2018 Grade 8 Science Exam";
    }
    else if (ex == 'TX22G8SS') {
      this.exam_name = "Texas STAAR 2022 Grade 8 Social Studies Exam";
    }
    else if (ex == 'TX21G8SS') {
      this.exam_name = "Texas STAAR 2021 Grade 8 Social Studies Exam";
    }
    else if (ex == 'TX19G8SS') {
      this.exam_name = "Texas STAAR 2019 Grade 8 Social Studies Exam";
    }
    else if (ex == 'TX18G8SS') {
      this.exam_name = "Texas STAAR 2018 Grade 8 Social Studies Exam";
    }
    this.file_source = "./assets/exams/" + ex + ".pdf"

  }

  download_exam() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.file_source);
    link.setAttribute('download', this.exam_name);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  print_exam() {
    printJS({printable: this.file_source, type:'pdf', showModal:true});
  }

  take_exam() {
    this.router.navigateByUrl(this.exam_url)
  }

  prev_page() {
    this.file_page = Math.max(1, this.file_page-1);
  }

  next_page() {
    this.file_page = this.file_page+1;
  }

  width_change() {
    this.viewerWidth = Math.round(window.innerWidth*.99).toString() + "px";
    this.viewerHeight = Math.round(window.innerHeight*.95).toString() + "px";
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