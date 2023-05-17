import { Component, OnInit, Injectable, ElementRef, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AuthService } from "../../shared/services/auth.service";
import { WindowService } from '../../shared/services/window.service';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
// import * as examMetadata from "src/assets/problems/exams.json";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

@Injectable()
export class ProfileComponent implements OnInit {
  // title = 'More Problems';

  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  mobileWidth = 900;
  menuOpen = false;

  profile_tab = "information";
  photoURL = "";
  total_percent_correct = 0;
  complete_exam_count = 0;
  complete_exam_list: string[] = [];
  complete_exam_metadata: any = {};


  // exam_attribute_dump: { [key: string]: { 'State': string, 'Grade': string, 'Subject': string, 'ExamName': string, 'ExamYear': string, 'ExamType': string, 'NumQuestions': number } } = examMetadata;

  selected_exam = "";
  expand_topics = false;
  show_correct = false;
  db_submission: any = {};
  exam_submission: { [key: string]: { 'Number': number, 'Topic': string, 'SubTopic': string, 'Choice': string, 'Correct': string, 'Rationale': string, 'Attempts': number, 'Path': string[], 'Seconds': number, 'Time': string } } = {};
  exam_submission_list: any[] = [];
  wrong_submission_list: any[] = [];
  exam_length = 0;
  number_correct = 0;
  correct_percent = 0;
  performance_level = "";
  time_duration = "";
  topic_breakdown: { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Seconds': number, 'Time': string, 'Subs': { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Seconds': number, 'Time': string } } } } = {};
  

  user: any;
  edit: boolean = false;
  edit_list: { [index: string]: any } = {};
  login_method = "";
  windowRef: any;
  win = new WindowService;

  avatars = ['bear', 'boar', 'cat', 'chicken', 'deer', 'dog', 'fox', 'giraffe', 'gorilla', 'horse', 'koala', 'lemur', 'lion', 'llama', 'owl', 'panda', 'rabbit', 'rhino', 'seal', 'shark', 'snake', 'tiger', 'walrus', 'wolf'];
  exam_names: { [key: string]: string } = { "COG3M": "Colorado CMAS Grade 3 Math Practice Exam", "COG3E": "Colorado CMAS Grade 3 English Language Arts Practice Exam", "COG4M": "Colorado CMAS Grade 4 Math Practice Exam", "COG4E": "Colorado CMAS Grade 4 English Language Arts Practice Exam", "COG5M": "Colorado CMAS Grade 5 Math Practice Exam", "COG5E": "Colorado CMAS Grade 5 English Language Arts Practice Exam", "COG5S": "Colorado CMAS Grade 5 Science Practice Exam", "COG6M": "Colorado CMAS Grade 6 Math Practice Exam", "COG6E": "Colorado CMAS Grade 6 English Language Arts Practice Exam", "COG7M": "Colorado CMAS Grade 7 Math Practice Exam", "COG7E": "Colorado CMAS Grade 7 English Language Arts Practice Exam", "COG8M": "Colorado CMAS Grade 8 Math Practice Exam", "COG8E": "Colorado CMAS Grade 8 English Language Arts Practice Exam", "COG8S": "Colorado CMAS Grade 8 Science Practice Exam", "COHSS": "Colorado CMAS High School Science Practice Exam", "FL20G3M": "Florida FSA 2020 Grade 3 Math Practice Exam", "FL20G3R": "Florida FSA 2020 Grade 3 Reading Practice Exam", "FL20G4M": "Florida FSA 2020 Grade 4 Math Practice Exam", "FL20G4R": "Florida FSA 2020 Grade 4 Reading Practice Exam", "FL20G4W": "Florida FSA 2020 Grade 4 Writing Practice Exam", "FL20G5M": "Florida FSA 2020 Grade 5 Math Practice Exam", "FL20G5R": "Florida FSA 2020 Grade 5 Reading Practice Exam", "FL20G5W": "Florida FSA 2020 Grade 5 Writing Practice Exam", "FL20G5S": "Florida FSA 2020 Grade 5 Science Practice Exam", "FL20G6M": "Florida FSA 2020 Grade 6 Math Practice Exam", "FL20G6R": "Florida FSA 2020 Grade 6 Reading Practice Exam", "FL20G6W": "Florida FSA 2020 Grade 6 Writing Practice Exam", "FL20G7M": "Florida FSA 2020 Grade 7 Math Practice Exam", "FL20G7R": "Florida FSA 2020 Grade 7 Reading Practice Exam", "FL20G7W": "Florida FSA 2020 Grade 7 Writing Practice Exam", "FL20G8M": "Florida FSA 2020 Grade 8 Math Practice Exam", "FL20G8R": "Florida FSA 2020 Grade 8 Reading Practice Exam", "FL20G8W": "Florida FSA 2020 Grade 8 Writing Practice Exam", "FL20G8S": "Florida FSA 2020 Grade 8 Science Practice Exam", "FL20G9R": "Florida FSA 2020 Grade 9 Reading Practice Exam", "FL20G9W": "Florida FSA 2020 Grade 9 Writing Practice Exam", "FL20G10R": "Florida FSA 2020 Grade 10 Reading Practice Exam", "FL20G10W": "Florida FSA 2020 Grade 10 Writing Practice Exam", "ILG3M": "Illinois IAR Grade 3 Math Practice Exam", "ILG3E": "Illinois IAR Grade 3 English Language Arts Practice Exam", "ILG4M": "Illinois IAR Grade 4 Math Practice Exam", "ILG4E": "Illinois IAR Grade 4 English Language Arts Practice Exam", "ILG5M": "Illinois IAR Grade 5 Math Practice Exam", "ILG5E": "Illinois IAR Grade 5 English Language Arts Practice Exam", "ILG6M": "Illinois IAR Grade 6 Math Practice Exam", "ILG6E": "Illinois IAR Grade 6 English Language Arts Practice Exam", "ILG7M": "Illinois IAR Grade 7 Math Practice Exam", "ILG7E": "Illinois IAR Grade 7 English Language Arts Practice Exam", "ILG8M": "Illinois IAR Grade 8 Math Practice Exam", "ILG8E": "Illinois IAR Grade 8 English Language Arts Practice Exam", "MDG3M": "Maryland MCAP Grade 3 Math Practice Exam", "MDG3E": "Maryland MCAP Grade 3 English Language Arts Practice Exam", "MDG4M": "Maryland MCAP Grade 4 Math Practice Exam", "MDG4E": "Maryland MCAP Grade 4 English Language Arts Practice Exam", "MDG5M": "Maryland MCAP Grade 5 Math Practice Exam", "MDG5E": "Maryland MCAP Grade 5 English Language Arts Practice Exam", "MDG5S": "Maryland MCAP Grade 5 Science Practice Exam", "MDG6M": "Maryland MCAP Grade 6 Math Practice Exam", "MDG6E": "Maryland MCAP Grade 6 English Language Arts Practice Exam", "MDG7M": "Maryland MCAP Grade 7 Math Practice Exam", "MDG7E": "Maryland MCAP Grade 7 English Language Arts Practice Exam", "MDG8M": "Maryland MCAP Grade 8 Math Practice Exam", "MDG8E": "Maryland MCAP Grade 8 English Language Arts Practice Exam", "MDG8S": "Maryland MCAP Grade 8 Science Practice Exam", "MDG8SS": "Maryland MCAP Grade 8 Social Studies Practice Exam", "MDG10E": "Maryland MCAP Grade 10 English Language Arts Practice Exam", "MAG3M": "Massachusetts MCAS Grade 3 Math Practice Exam", "MAG3E": "Massachusetts MCAS Grade 3 English Language Arts Practice Exam", "MAG4M": "Massachusetts MCAS Grade 4 Math Practice Exam", "MAG4E": "Massachusetts MCAS Grade 4 English Language Arts Practice Exam", "MAG5M": "Massachusetts MCAS Grade 5 Math Practice Exam", "MAG5E": "Massachusetts MCAS Grade 5 English Language Arts Practice Exam", "MAG5S": "Massachusetts MCAS Grade 5 Science Practice Exam", "MAG6M": "Massachusetts MCAS Grade 6 Math Practice Exam", "MAG6E": "Massachusetts MCAS Grade 6 English Language Arts Practice Exam", "MAG7M": "Massachusetts MCAS Grade 7 Math Practice Exam", "MAG7E": "Massachusetts MCAS Grade 7 English Language Arts Practice Exam", "MAG8M": "Massachusetts MCAS Grade 8 Math Practice Exam", "MAG8E": "Massachusetts MCAS Grade 8 English Language Arts Practice Exam", "MAG8S": "Massachusetts MCAS Grade 8 Science Practice Exam", "MAG10M": "Massachusetts MCAS Grade 10 Math Practice Exam", "MAG10E": "Massachusetts MCAS Grade 10 English Language Arts Practice Exam", "MNG3M": "Minnesota MCA Grade 3 Math Practice Exam", "MNG3R": "Minnesota MCA Grade 3 Reading Practice Exam", "MNG4M": "Minnesota MCA Grade 4 Math Practice Exam", "MNG4R": "Minnesota MCA Grade 4 Reading Practice Exam", "MNG5M": "Minnesota MCA Grade 5 Math Practice Exam", "MNG5R": "Minnesota MCA Grade 5 Reading Practice Exam", "MNG5S": "Minnesota MCA Grade 5 Science Practice Exam", "MNG6M": "Minnesota MCA Grade 6 Math Practice Exam", "MNG6R": "Minnesota MCA Grade 6 Reading Practice Exam", "MNG7M": "Minnesota MCA Grade 7 Math Practice Exam", "MNG7R": "Minnesota MCA Grade 7 Reading Practice Exam", "MNG8M": "Minnesota MCA Grade 8 Math Practice Exam", "MNG8R": "Minnesota MCA Grade 8 Reading Practice Exam", "MNG8S": "Minnesota MCA Grade 8 Science Practice Exam", "MNG8SS": "Minnesota MCA Grade 8 Social Studies Practice Exam", "MNG10R": "Minnesota MCA Grade 10 Reading Practice Exam", "MNG11M": "Minnesota MCA Grade 11 Math Practice Exam", "MNHSS": "Minnesota MCA High School Science Practice Exam", "MOG3M": "Missouri MAP Grade 3 Math Practice Exam", "MOG3E": "Missouri MAP Grade 3 English Language Arts Practice Exam", "MOG4M": "Missouri MAP Grade 4 Math Practice Exam", "MOG4E": "Missouri MAP Grade 4 English Language Arts Practice Exam", "MOG5M": "Missouri MAP Grade 5 Math Practice Exam", "MOG5E": "Missouri MAP Grade 5 English Language Arts Practice Exam", "MOG5S": "Missouri MAP Grade 5 Science Practice Exam", "MOG6M": "Missouri MAP Grade 6 Math Practice Exam", "MOG6E": "Missouri MAP Grade 6 English Language Arts Practice Exam", "MOG7M": "Missouri MAP Grade 7 Math Practice Exam", "MOG7E": "Missouri MAP Grade 7 English Language Arts Practice Exam", "MOG8M": "Missouri MAP Grade 8 Math Practice Exam", "MOG8E": "Missouri MAP Grade 8 English Language Arts Practice Exam", "MOG8S": "Missouri MAP Grade 8 Science Practice Exam", "NJG3M": "New Jersey NJSLA Grade 3 Math Practice Exam", "NJG3E": "New Jersey NJSLA Grade 3 English Language Arts Practice Exam", "NJG4M": "New Jersey NJSLA Grade 4 Math Practice Exam", "NJG4E": "New Jersey NJSLA Grade 4 English Language Arts Practice Exam", "NJG5M": "New Jersey NJSLA Grade 5 Math Practice Exam", "NJG5E": "New Jersey NJSLA Grade 5 English Language Arts Practice Exam", "NJG5S": "New Jersey NJSLA Grade 5 Science Practice Exam", "NJG6M": "New Jersey NJSLA Grade 6 Math Practice Exam", "NJG6E": "New Jersey NJSLA Grade 6 English Language Arts Practice Exam", "NJG7M": "New Jersey NJSLA Grade 7 Math Practice Exam", "NJG7E": "New Jersey NJSLA Grade 7 English Language Arts Practice Exam", "NJG8M": "New Jersey NJSLA Grade 8 Math Practice Exam", "NJG8E": "New Jersey NJSLA Grade 8 English Language Arts Practice Exam", "NJG8S": "New Jersey NJSLA Grade 8 Science Practice Exam", "NJG9E": "New Jersey NJSLA Grade 9 English Language Arts Practice Exam", "NJG11S": "New Jersey NJSLA Grade 11 Science Practice Exam", "NY22G3M": "New York NYSTP 2022 Grade 3 Math Exam", "NY22G3E": "New York NYSTP 2022 Grade 3 English Language Arts Exam", "NY22G4M": "New York NYSTP 2022 Grade 4 Math Exam", "NY22G4E": "New York NYSTP 2022 Grade 4 English Language Arts Exam", "NY22G4S": "New York NYSTP 2022 Grade 4 Science Exam", "NY22G5M": "New York NYSTP 2022 Grade 5 Math Exam", "NY22G5E": "New York NYSTP 2022 Grade 5 English Language Arts Exam", "NY22G6M": "New York NYSTP 2022 Grade 6 Math Exam", "NY22G6E": "New York NYSTP 2022 Grade 6 English Language Arts Exam", "NY22G7M": "New York NYSTP 2022 Grade 7 Math Exam", "NY22G7E": "New York NYSTP 2022 Grade 7 English Language Arts Exam", "NY22G8M": "New York NYSTP 2022 Grade 8 Math Exam", "NY22G8E": "New York NYSTP 2022 Grade 8 English Language Arts Exam", "NY22G8S": "New York NYSTP 2022 Grade 8 Science Exam", "NY21G3M": "New York NYSTP 2021 Grade 3 Math Exam", "NY21G3E": "New York NYSTP 2021 Grade 3 English Language Arts Exam", "NY21G4M": "New York NYSTP 2021 Grade 4 Math Exam", "NY21G4E": "New York NYSTP 2021 Grade 4 English Language Arts Exam", "NY21G4S": "New York NYSTP 2021 Grade 4 Science Exam", "NY21G5M": "New York NYSTP 2021 Grade 5 Math Exam", "NY21G5E": "New York NYSTP 2021 Grade 5 English Language Arts Exam", "NY21G6M": "New York NYSTP 2021 Grade 6 Math Exam", "NY21G6E": "New York NYSTP 2021 Grade 6 English Language Arts Exam", "NY21G7M": "New York NYSTP 2021 Grade 7 Math Exam", "NY21G7E": "New York NYSTP 2021 Grade 7 English Language Arts Exam", "NY21G8M": "New York NYSTP 2021 Grade 8 Math Exam", "NY21G8E": "New York NYSTP 2021 Grade 8 English Language Arts Exam", "NY21G8S": "New York NYSTP 2021 Grade 8 Science Exam", "NY19G3M": "New York NYSTP 2019 Grade 3 Math Exam", "NY19G3E": "New York NYSTP 2019 Grade 3 English Language Arts Exam", "NY19G4M": "New York NYSTP 2019 Grade 4 Math Exam", "NY19G4E": "New York NYSTP 2019 Grade 4 English Language Arts Exam", "NY19G4S": "New York NYSTP 2019 Grade 4 Science Exam", "NY19G5M": "New York NYSTP 2019 Grade 5 Math Exam", "NY19G5E": "New York NYSTP 2019 Grade 5 English Language Arts Exam", "NY19G6M": "New York NYSTP 2019 Grade 6 Math Exam", "NY19G6E": "New York NYSTP 2019 Grade 6 English Language Arts Exam", "NY19G7M": "New York NYSTP 2019 Grade 7 Math Exam", "NY19G7E": "New York NYSTP 2019 Grade 7 English Language Arts Exam", "NY19G8M": "New York NYSTP 2019 Grade 8 Math Exam", "NY19G8E": "New York NYSTP 2019 Grade 8 English Language Arts Exam", "NY19G8S": "New York NYSTP 2019 Grade 8 Science Exam", "NY18G3M": "New York NYSTP 2018 Grade 3 Math Exam", "NY18G3E": "New York NYSTP 2018 Grade 3 English Language Arts Exam", "NY18G4M": "New York NYSTP 2018 Grade 4 Math Exam", "NY18G4E": "New York NYSTP 2018 Grade 4 English Language Arts Exam", "NY18G4S": "New York NYSTP 2018 Grade 4 Science Exam", "NY18G5M": "New York NYSTP 2018 Grade 5 Math Exam", "NY18G5E": "New York NYSTP 2018 Grade 5 English Language Arts Exam", "NY18G6M": "New York NYSTP 2018 Grade 6 Math Exam", "NY18G6E": "New York NYSTP 2018 Grade 6 English Language Arts Exam", "NY18G7M": "New York NYSTP 2018 Grade 7 Math Exam", "NY18G7E": "New York NYSTP 2018 Grade 7 English Language Arts Exam", "NY18G8M": "New York NYSTP 2018 Grade 8 Math Exam", "NY18G8E": "New York NYSTP 2018 Grade 8 English Language Arts Exam", "NY18G8S": "New York NYSTP 2018 Grade 8 Science Exam", "NY17G3M": "New York NYSTP 2017 Grade 3 Math Exam", "NY17G3E": "New York NYSTP 2017 Grade 3 English Language Arts Exam", "NY17G4M": "New York NYSTP 2017 Grade 4 Math Exam", "NY17G4E": "New York NYSTP 2017 Grade 4 English Language Arts Exam", "NY17G4S": "New York NYSTP 2017 Grade 4 Science Exam", "NY17G5M": "New York NYSTP 2017 Grade 5 Math Exam", "NY17G5E": "New York NYSTP 2017 Grade 5 English Language Arts Exam", "NY17G6M": "New York NYSTP 2017 Grade 6 Math Exam", "NY17G6E": "New York NYSTP 2017 Grade 6 English Language Arts Exam", "NY17G7M": "New York NYSTP 2017 Grade 7 Math Exam", "NY17G7E": "New York NYSTP 2017 Grade 7 English Language Arts Exam", "NY17G8M": "New York NYSTP 2017 Grade 8 Math Exam", "NY17G8E": "New York NYSTP 2017 Grade 8 English Language Arts Exam", "NY17G8S": "New York NYSTP 2017 Grade 8 Science Exam", "NY16G3M": "New York NYSTP 2016 Grade 3 Math Exam", "NY16G3E": "New York NYSTP 2016 Grade 3 English Language Arts Exam", "NY16G4M": "New York NYSTP 2016 Grade 4 Math Exam", "NY16G4E": "New York NYSTP 2016 Grade 4 English Language Arts Exam", "NY16G4S": "New York NYSTP 2016 Grade 4 Science Exam", "NY16G5M": "New York NYSTP 2016 Grade 5 Math Exam", "NY16G5E": "New York NYSTP 2016 Grade 5 English Language Arts Exam", "NY16G6M": "New York NYSTP 2016 Grade 6 Math Exam", "NY16G6E": "New York NYSTP 2016 Grade 6 English Language Arts Exam", "NY16G7M": "New York NYSTP 2016 Grade 7 Math Exam", "NY16G7E": "New York NYSTP 2016 Grade 7 English Language Arts Exam", "NY16G8M": "New York NYSTP 2016 Grade 8 Math Exam", "NY16G8E": "New York NYSTP 2016 Grade 8 English Language Arts Exam", "NY16G8S": "New York NYSTP 2016 Grade 8 Science Exam", "NY15G3M": "New York NYSTP 2015 Grade 3 Math Exam", "NY15G3E": "New York NYSTP 2015 Grade 3 English Language Arts Exam", "NY15G4M": "New York NYSTP 2015 Grade 4 Math Exam", "NY15G4E": "New York NYSTP 2015 Grade 4 English Language Arts Exam", "NY15G4S": "New York NYSTP 2015 Grade 4 Science Exam", "NY15G5M": "New York NYSTP 2015 Grade 5 Math Exam", "NY15G5E": "New York NYSTP 2015 Grade 5 English Language Arts Exam", "NY15G6M": "New York NYSTP 2015 Grade 6 Math Exam", "NY15G6E": "New York NYSTP 2015 Grade 6 English Language Arts Exam", "NY15G7M": "New York NYSTP 2015 Grade 7 Math Exam", "NY15G7E": "New York NYSTP 2015 Grade 7 English Language Arts Exam", "NY15G8M": "New York NYSTP 2015 Grade 8 Math Exam", "NY15G8E": "New York NYSTP 2015 Grade 8 English Language Arts Exam", "NY15G8S": "New York NYSTP 2015 Grade 8 Science Exam", "NC18G3M": "North Carolina EOG 2018 Grade 3 Math Exam", "NC18G3R": "North Carolina EOG 2018 Grade 3 Reading Exam", "NC18G4M": "North Carolina EOG 2018 Grade 4 Math Exam", "NC18G4R": "North Carolina EOG 2018 Grade 4 Reading Exam", "NC18G5M": "North Carolina EOG 2018 Grade 5 Math Exam", "NC18G5R": "North Carolina EOG 2018 Grade 5 Reading Exam", "NC18G5S": "North Carolina EOG 2018 Grade 5 Science Exam", "NC18G6M": "North Carolina EOG 2018 Grade 6 Math Exam", "NC18G6R": "North Carolina EOG 2018 Grade 6 Reading Exam", "NC18G7M": "North Carolina EOG 2018 Grade 7 Math Exam", "NC18G7R": "North Carolina EOG 2018 Grade 7 Reading Exam", "NC18G8M": "North Carolina EOG 2018 Grade 8 Math Exam", "NC18G8R": "North Carolina EOG 2018 Grade 8 Reading Exam", "NC18G8S": "North Carolina EOG 2018 Grade 8 Science Exam", "PA22G3M": "Pennsylvania PSSA 2022 Grade 3 Math Exam", "PA22G3E": "Pennsylvania PSSA 2022 Grade 3 English Language Arts Exam", "PA22G4M": "Pennsylvania PSSA 2022 Grade 4 Math Exam", "PA22G4E": "Pennsylvania PSSA 2022 Grade 4 English Language Arts Exam", "PA22G4S": "Pennsylvania PSSA 2022 Grade 4 Science Exam", "PA22G5M": "Pennsylvania PSSA 2022 Grade 5 Math Exam", "PA22G5E": "Pennsylvania PSSA 2022 Grade 5 English Language Arts Exam", "PA22G6M": "Pennsylvania PSSA 2022 Grade 6 Math Exam", "PA22G6E": "Pennsylvania PSSA 2022 Grade 6 English Language Arts Exam", "PA22G7M": "Pennsylvania PSSA 2022 Grade 7 Math Exam", "PA22G7E": "Pennsylvania PSSA 2022 Grade 7 English Language Arts Exam", "PA22G8M": "Pennsylvania PSSA 2022 Grade 8 Math Exam", "PA22G8E": "Pennsylvania PSSA 2022 Grade 8 English Language Arts Exam", "PA22G8S": "Pennsylvania PSSA 2022 Grade 8 Science Exam", "PA21G3M": "Pennsylvania PSSA 2021 Grade 3 Math Exam", "PA21G3E": "Pennsylvania PSSA 2021 Grade 3 English Language Arts Exam", "PA21G4M": "Pennsylvania PSSA 2021 Grade 4 Math Exam", "PA21G4E": "Pennsylvania PSSA 2021 Grade 4 English Language Arts Exam", "PA21G4S": "Pennsylvania PSSA 2021 Grade 4 Science Exam", "PA21G5M": "Pennsylvania PSSA 2021 Grade 5 Math Exam", "PA21G5E": "Pennsylvania PSSA 2021 Grade 5 English Language Arts Exam", "PA21G6M": "Pennsylvania PSSA 2021 Grade 6 Math Exam", "PA21G6E": "Pennsylvania PSSA 2021 Grade 6 English Language Arts Exam", "PA21G7M": "Pennsylvania PSSA 2021 Grade 7 Math Exam", "PA21G7E": "Pennsylvania PSSA 2021 Grade 7 English Language Arts Exam", "PA21G8M": "Pennsylvania PSSA 2021 Grade 8 Math Exam", "PA21G8E": "Pennsylvania PSSA 2021 Grade 8 English Language Arts Exam", "PA21G8S": "Pennsylvania PSSA 2021 Grade 8 Science Exam", "PA19G3M": "Pennsylvania PSSA 2019 Grade 3 Math Exam", "PA19G3E": "Pennsylvania PSSA 2019 Grade 3 English Language Arts Exam", "PA19G4M": "Pennsylvania PSSA 2019 Grade 4 Math Exam", "PA19G4E": "Pennsylvania PSSA 2019 Grade 4 English Language Arts Exam", "PA19G4S": "Pennsylvania PSSA 2019 Grade 4 Science Exam", "PA19G5M": "Pennsylvania PSSA 2019 Grade 5 Math Exam", "PA19G5E": "Pennsylvania PSSA 2019 Grade 5 English Language Arts Exam", "PA19G6M": "Pennsylvania PSSA 2019 Grade 6 Math Exam", "PA19G6E": "Pennsylvania PSSA 2019 Grade 6 English Language Arts Exam", "PA19G7M": "Pennsylvania PSSA 2019 Grade 7 Math Exam", "PA19G7E": "Pennsylvania PSSA 2019 Grade 7 English Language Arts Exam", "PA19G8M": "Pennsylvania PSSA 2019 Grade 8 Math Exam", "PA19G8E": "Pennsylvania PSSA 2019 Grade 8 English Language Arts Exam", "PA19G8S": "Pennsylvania PSSA 2019 Grade 8 Science Exam", "PA18G3M": "Pennsylvania PSSA 2018 Grade 3 Math Exam", "PA18G3E": "Pennsylvania PSSA 2018 Grade 3 English Language Arts Exam", "PA18G4M": "Pennsylvania PSSA 2018 Grade 4 Math Exam", "PA18G4E": "Pennsylvania PSSA 2018 Grade 4 English Language Arts Exam", "PA18G4S": "Pennsylvania PSSA 2018 Grade 4 Science Exam", "PA18G5M": "Pennsylvania PSSA 2018 Grade 5 Math Exam", "PA18G5E": "Pennsylvania PSSA 2018 Grade 5 English Language Arts Exam", "PA18G6M": "Pennsylvania PSSA 2018 Grade 6 Math Exam", "PA18G6E": "Pennsylvania PSSA 2018 Grade 6 English Language Arts Exam", "PA18G7M": "Pennsylvania PSSA 2018 Grade 7 Math Exam", "PA18G7E": "Pennsylvania PSSA 2018 Grade 7 English Language Arts Exam", "PA18G8M": "Pennsylvania PSSA 2018 Grade 8 Math Exam", "PA18G8E": "Pennsylvania PSSA 2018 Grade 8 English Language Arts Exam", "PA18G8S": "Pennsylvania PSSA 2018 Grade 8 Science Exam", "PA16G3M": "Pennsylvania PSSA 2016 Grade 3 Math Exam", "PA16G3E": "Pennsylvania PSSA 2016 Grade 3 English Language Arts Exam", "PA16G4M": "Pennsylvania PSSA 2016 Grade 4 Math Exam", "PA16G4E": "Pennsylvania PSSA 2016 Grade 4 English Language Arts Exam", "PA16G4S": "Pennsylvania PSSA 2016 Grade 4 Science Exam", "PA16G5M": "Pennsylvania PSSA 2016 Grade 5 Math Exam", "PA16G5E": "Pennsylvania PSSA 2016 Grade 5 English Language Arts Exam", "PA16G6M": "Pennsylvania PSSA 2016 Grade 6 Math Exam", "PA16G6E": "Pennsylvania PSSA 2016 Grade 6 English Language Arts Exam", "PA16G7M": "Pennsylvania PSSA 2016 Grade 7 Math Exam", "PA16G7E": "Pennsylvania PSSA 2016 Grade 7 English Language Arts Exam", "PA16G8M": "Pennsylvania PSSA 2016 Grade 8 Math Exam", "PA16G8E": "Pennsylvania PSSA 2016 Grade 8 English Language Arts Exam", "PA16G8S": "Pennsylvania PSSA 2016 Grade 8 Science Exam", "PA15G3M": "Pennsylvania PSSA 2015 Grade 3 Math Exam", "PA15G3E": "Pennsylvania PSSA 2015 Grade 3 English Language Arts Exam", "PA15G4M": "Pennsylvania PSSA 2015 Grade 4 Math Exam", "PA15G4E": "Pennsylvania PSSA 2015 Grade 4 English Language Arts Exam", "PA15G4S": "Pennsylvania PSSA 2015 Grade 4 Science Exam", "PA15G5M": "Pennsylvania PSSA 2015 Grade 5 Math Exam", "PA15G5E": "Pennsylvania PSSA 2015 Grade 5 English Language Arts Exam", "PA15G6M": "Pennsylvania PSSA 2015 Grade 6 Math Exam", "PA15G6E": "Pennsylvania PSSA 2015 Grade 6 English Language Arts Exam", "PA15G7M": "Pennsylvania PSSA 2015 Grade 7 Math Exam", "PA15G7E": "Pennsylvania PSSA 2015 Grade 7 English Language Arts Exam", "PA15G8M": "Pennsylvania PSSA 2015 Grade 8 Math Exam", "PA15G8E": "Pennsylvania PSSA 2015 Grade 8 English Language Arts Exam", "PA15G8S": "Pennsylvania PSSA 2015 Grade 8 Science Exam", "TN20G3M": "Tennessee TCAP Grade 3 Math Practice Exam", "TN20G3E": "Tennessee TCAP Grade 3 English Language Arts Practice Exam", "TN20G3S": "Tennessee TCAP Grade 3 Science Practice Exam", "TN20G4M": "Tennessee TCAP Grade 4 Math Practice Exam", "TN20G4E": "Tennessee TCAP Grade 4 English Language Arts Practice Exam", "TN20G4S": "Tennessee TCAP Grade 4 Science Practice Exam", "TN20G5M": "Tennessee TCAP Grade 5 Math Practice Exam", "TN20G5E": "Tennessee TCAP Grade 5 English Language Arts Practice Exam", "TN20G5S": "Tennessee TCAP Grade 5 Science Practice Exam", "TN20G6M": "Tennessee TCAP Grade 6 Math Practice Exam", "TN20G6E": "Tennessee TCAP Grade 6 English Language Arts Practice Exam", "TN20G6S": "Tennessee TCAP Grade 6 Science Practice Exam", "TN20G6SS": "Tennessee TCAP Grade 6 Social Studies Practice Exam", "TN20G7M": "Tennessee TCAP Grade 7 Math Practice Exam", "TN20G7E": "Tennessee TCAP Grade 7 English Language Arts Practice Exam", "TN20G7S": "Tennessee TCAP Grade 7 Science Practice Exam", "TN20G7SS": "Tennessee TCAP Grade 7 Social Studies Practice Exam", "TN20G8M": "Tennessee TCAP Grade 8 Math Practice Exam", "TN20G8E": "Tennessee TCAP Grade 8 English Language Arts Practice Exam", "TN20G8S": "Tennessee TCAP Grade 8 Science Practice Exam", "TN20G8SS": "Tennessee TCAP Grade 8 Social Studies Practice Exam", "TX22G3M": "Texas STAAR 2022 Grade 3 Math Exam", "TX21G3M": "Texas STAAR 2021 Grade 3 Math Exam", "TX19G3M": "Texas STAAR 2019 Grade 3 Math Exam", "TX18G3M": "Texas STAAR 2018 Grade 3 Math Exam", "TX17G3M": "Texas STAAR 2017 Grade 3 Math Exam", "TX22G3R": "Texas STAAR 2022 Grade 3 Reading Exam", "TX21G3R": "Texas STAAR 2021 Grade 3 Reading Exam", "TX19G3R": "Texas STAAR 2019 Grade 3 Reading Exam", "TX18G3R": "Texas STAAR 2018 Grade 3 Reading Exam", "TX17G3R": "Texas STAAR 2017 Grade 3 Reading Exam", "TX22G4M": "Texas STAAR 2022 Grade 4 Math Exam", "TX21G4M": "Texas STAAR 2021 Grade 4 Math Exam", "TX19G4M": "Texas STAAR 2019 Grade 4 Math Exam", "TX18G4M": "Texas STAAR 2018 Grade 4 Math Exam", "TX17G4M": "Texas STAAR 2017 Grade 4 Math Exam", "TX22G4R": "Texas STAAR 2022 Grade 4 Reading Exam", "TX21G4R": "Texas STAAR 2021 Grade 4 Reading Exam", "TX19G4R": "Texas STAAR 2019 Grade 4 Reading Exam", "TX18G4R": "Texas STAAR 2018 Grade 4 Reading Exam", "TX17G4R": "Texas STAAR 2017 Grade 4 Reading Exam", "TX22G5M": "Texas STAAR 2022 Grade 5 Math Exam", "TX21G5M": "Texas STAAR 2021 Grade 5 Math Exam", "TX19G5M": "Texas STAAR 2019 Grade 5 Math Exam", "TX18G5M": "Texas STAAR 2018 Grade 5 Math Exam", "TX17G5M": "Texas STAAR 2017 Grade 5 Math Exam", "TX22G5R": "Texas STAAR 2022 Grade 5 Reading Exam", "TX21G5R": "Texas STAAR 2021 Grade 5 Reading Exam", "TX19G5R": "Texas STAAR 2019 Grade 5 Reading Exam", "TX18G5R": "Texas STAAR 2018 Grade 5 Reading Exam", "TX17G5R": "Texas STAAR 2017 Grade 5 Reading Exam", "TX22G5S": "Texas STAAR 2022 Grade 5 Science Exam", "TX21G5S": "Texas STAAR 2021 Grade 5 Science Exam", "TX19G5S": "Texas STAAR 2019 Grade 5 Science Exam", "TX18G5S": "Texas STAAR 2018 Grade 5 Science Exam", "TX22G6M": "Texas STAAR 2022 Grade 6 Math Exam", "TX21G6M": "Texas STAAR 2021 Grade 6 Math Exam", "TX19G6M": "Texas STAAR 2019 Grade 6 Math Exam", "TX18G6M": "Texas STAAR 2018 Grade 6 Math Exam", "TX17G6M": "Texas STAAR 2017 Grade 6 Math Exam", "TX22G6R": "Texas STAAR 2022 Grade 6 Reading Exam", "TX21G6R": "Texas STAAR 2021 Grade 6 Reading Exam", "TX19G6R": "Texas STAAR 2019 Grade 6 Reading Exam", "TX18G6R": "Texas STAAR 2018 Grade 6 Reading Exam", "TX17G6R": "Texas STAAR 2017 Grade 6 Reading Exam", "TX22G7M": "Texas STAAR 2022 Grade 7 Math Exam", "TX21G7M": "Texas STAAR 2021 Grade 7 Math Exam", "TX19G7M": "Texas STAAR 2019 Grade 7 Math Exam", "TX18G7M": "Texas STAAR 2018 Grade 7 Math Exam", "TX17G7M": "Texas STAAR 2017 Grade 7 Math Exam", "TX22G7R": "Texas STAAR 2022 Grade 7 Reading Exam", "TX21G7R": "Texas STAAR 2021 Grade 7 Reading Exam", "TX19G7R": "Texas STAAR 2019 Grade 7 Reading Exam", "TX18G7R": "Texas STAAR 2018 Grade 7 Reading Exam", "TX17G7R": "Texas STAAR 2017 Grade 7 Reading Exam", "TX22G8M": "Texas STAAR 2022 Grade 8 Math Exam", "TX21G8M": "Texas STAAR 2021 Grade 8 Math Exam", "TX19G8M": "Texas STAAR 2019 Grade 8 Math Exam", "TX18G8M": "Texas STAAR 2018 Grade 8 Math Exam", "TX17G8M": "Texas STAAR 2017 Grade 8 Math Exam", "TX22G8R": "Texas STAAR 2022 Grade 8 Reading Exam", "TX21G8R": "Texas STAAR 2021 Grade 8 Reading Exam", "TX19G8R": "Texas STAAR 2019 Grade 8 Reading Exam", "TX18G8R": "Texas STAAR 2018 Grade 8 Reading Exam", "TX17G8R": "Texas STAAR 2017 Grade 8 Reading Exam", "TX22G8S": "Texas STAAR 2022 Grade 8 Science Exam", "TX21G8S": "Texas STAAR 2021 Grade 8 Science Exam", "TX19G8S": "Texas STAAR 2019 Grade 8 Science Exam", "TX18G8S": "Texas STAAR 2018 Grade 8 Science Exam", "TX22G8SS": "Texas STAAR 2022 Grade 8 Social Studies Exam", "TX21G8SS": "Texas STAAR 2021 Grade 8 Social Studies Exam", "TX19G8SS": "Texas STAAR 2019 Grade 8 Social Studies Exam", "TX18G8SS": "Texas STAAR 2018 Grade 8 Social Studies Exam" };

  // constructor(private titleService: Title, private meta: Meta, public authService: AuthService, private win: WindowService, private afAuth: AngularFireAuth) { }
  constructor(private titleService: Title, private meta: Meta, public authService: AuthService, public router: Router, private afAuth: AngularFireAuth) { }

  width_change2() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  set_tab(tb: string) {
    this.profile_tab = tb;
    if (this.authService.userData.role == 'Student') {
      if (this.authService.userData.problems.total == 0) {
        this.total_percent_correct = 0;
      }
      else {
        this.total_percent_correct = Math.round(10000 * this.authService.userData.problems.correct / this.authService.userData.problems.total) / 100;
      }
      this.complete_exam_count = 0;
      this.complete_exam_list = [];
      this.complete_exam_metadata = {};
      const exam_history = this.authService.userData.exams.history;
      for (const [key, det] of Object.entries(exam_history)) {
        if ((det as any).status == "Completed") {
          this.complete_exam_count = this.complete_exam_count + 1;
          this.complete_exam_list.push(key);
          const db_submission = this.authService.getExamSubmission(key);
          this.complete_exam_metadata[key] = { score: db_submission.score, time: db_submission.time };
        }
      }
    }
    console.log(this.complete_exam_metadata);
  }

  toggle_edit() {
    this.edit = !this.edit;
    this.edit_list = [];
    this.photoURL = this.authService.userData.photoURL;
  }

  edit_profile(field: string, val: string) {
    this.edit_list[field] = val;
  }

  edit_profile_pic(avatar: string) {
    this.photoURL = '/assets/icons/user/' + avatar + '.png';
    this.edit_list['photoURL'] = this.photoURL;
  }

  update_profile() {
    this.authService.UpdateUserData(this.edit_list).then(() => {
      // setTimeout(function () {
      //   location.reload();
      // }, 50);
    });
  }

  select_exam(exm: string) {
    if (this.authService.userData.role == 'Student') {
      this.db_submission = this.authService.getExamSubmission(exm);
      this.exam_submission = this.db_submission.problems;
      this.exam_length = this.db_submission.total;
      this.number_correct = this.db_submission.correct;
      this.correct_percent = this.db_submission.score;
      this.time_duration = this.db_submission.time;
      this.performance_level = this.db_submission.level;
      for (let i: number = 1; i <= this.exam_length; i++) {
        this.exam_submission_list.push(this.exam_submission[""+i]);
        if (this.exam_submission[""+i].Correct != '✅') {
          this.wrong_submission_list.push(this.exam_submission[""+i]);
        }
      }
      // setTimeout(() => {
      //   for (let i: number = 1; i <= this.exam_length; i++) {
      //     this.exam_submission_list.push(this.exam_submission[i]);
      //     if (this.exam_submission[i].Correct != '✅') {
      //       this.wrong_submission_list.push(this.exam_submission[i]);
      //     }
      //   }
      // }, 500);
      for (let i: number = 0; i < this.exam_length; i++) {
        if (Object.keys(this.topic_breakdown).includes(this.exam_submission_list[i].Topic)) {
          this.topic_breakdown[this.exam_submission_list[i].Topic].Total += 1;
          this.topic_breakdown[this.exam_submission_list[i].Topic].Seconds += +this.exam_submission_list[i].Seconds;
          if (this.exam_submission_list[i].Correct == '✅') {
            this.topic_breakdown[this.exam_submission_list[i].Topic].Correct += 1;
            if (Object.keys(this.topic_breakdown[this.exam_submission_list[i].Topic].Subs).includes(this.exam_submission_list[i].SubTopic)) {
              this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic].Total += 1;
              this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic].Correct += 1;
              this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic].Seconds += +this.exam_submission_list[i].Seconds;
            }
            else {
              this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +this.exam_submission_list[i].Seconds, 'Time': '0s' };
            }
          }
          else {
            this.topic_breakdown[this.exam_submission_list[i].Topic].Incorrect += 1;
            if (Object.keys(this.topic_breakdown[this.exam_submission_list[i].Topic].Subs).includes(this.exam_submission_list[i].SubTopic)) {
              this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic].Total += 1;
              this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic].Incorrect += 1;
              this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic].Seconds += +this.exam_submission_list[i].Seconds;
            }
            else {
              this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +this.exam_submission_list[i].Seconds, 'Time': '0s' };
            }
          }
        }
        else {
          if (this.exam_submission_list[i].Correct == '✅') {
            this.topic_breakdown[this.exam_submission_list[i].Topic] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s', 'Subs': { [this.exam_submission_list[i].SubTopic]: { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +this.exam_submission_list[i].Seconds, 'Time': '0s' } } };
          }
          else {
            this.topic_breakdown[this.exam_submission_list[i].Topic] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s', 'Subs': { [this.exam_submission_list[i].SubTopic]: { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +this.exam_submission_list[i].Seconds, 'Time': '0s' } } };
          }
        }
      }
      for (let topic of Object.keys(this.topic_breakdown)) {
        this.topic_breakdown[topic].Percent = Math.round(100 * this.topic_breakdown[topic].Correct / (this.topic_breakdown[topic].Total));
        this.topic_breakdown[topic].Time = (Math.floor(this.topic_breakdown[topic].Seconds / this.topic_breakdown[topic].Total / 60)).toString() + 'm ' + (Math.round(this.topic_breakdown[topic].Seconds / this.topic_breakdown[topic].Total % 60)).toString() + 's';
        for (let subtopic of Object.keys(this.topic_breakdown[topic].Subs)) {
            this.topic_breakdown[topic].Subs[subtopic].Percent = Math.round(100 * this.topic_breakdown[topic].Subs[subtopic].Correct / (this.topic_breakdown[topic].Subs[subtopic].Total));
            this.topic_breakdown[topic].Subs[subtopic].Time = (Math.floor(this.topic_breakdown[topic].Subs[subtopic].Seconds / this.topic_breakdown[topic].Subs[subtopic].Total / 60)).toString() + 'm ' + (Math.round(this.topic_breakdown[topic].Subs[subtopic].Seconds / this.topic_breakdown[topic].Subs[subtopic].Total % 60)).toString() + 's'
        }
    }
    }
    this.selected_exam = exm;
  }

  expandTopics() {
    this.expand_topics = !this.expand_topics;
  }

  showCorrect() {
    this.show_correct = !this.show_correct;
  }

  scroll_top() {
    setTimeout(function () {
      window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    }, 250);
  }

  scroll_bottom() {
    setTimeout(function () {
      window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
    }, 250);
  }

  scroll(el: HTMLElement) {
    setTimeout(function () {
      el.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  }

  scroll2(el: HTMLElement) {
    setTimeout(function () {
      window.scrollTo({ left: 0, top: el.getBoundingClientRect().top - 120, behavior: 'smooth' });
    }, 250);
  }

  ngOnInit() {
    this.titleService.setTitle("Your Profile On MoreProblems.Org | U.S. K-12 State Testing Preparation");
    // this.meta.updateTag({ name: 'description', content: "" });
    setTimeout(() => {
      if (!this.authService.userData) {
        this.router.navigate(['login']);
      }
      else {
        if (this.authService.userData.role == 'Student') {
          this.complete_exam_count = 0;
          this.complete_exam_list = [];
          this.complete_exam_metadata = {};
          const exam_history = this.authService.userData.exams.history;
          for (const [key, det] of Object.entries(exam_history)) {
            if ((det as any).status == "Completed") {
              this.complete_exam_count = this.complete_exam_count + 1;
              this.complete_exam_list.push(key);
              const db_submission = this.authService.getExamSubmission(key);
              this.complete_exam_metadata[key] = { score: db_submission.score, time: db_submission.time };
            }
          }
        }
      }
    }, 250);
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      // 'callback': (response) => {
      //   // reCAPTCHA solved, allow signInWithPhoneNumber.
      //   // onSignInSubmit();
      // }
    }, getAuth());
  }
}