import { Component, OnInit, AfterViewInit, Injectable, ElementRef, ViewChild, Input, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { AuthService } from "../../shared/services/auth.service";
import { DumpService } from "../../shared/services/dump.service";
import { WindowService } from '../../shared/services/window.service';
import { serverTimestamp } from "firebase/database";
import intlTelInput from 'intl-tel-input';
import printJS from 'print-js';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as Plotly from 'plotly.js-dist-min';
import * as Chart from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import * as QRCode from 'qrcode';
import 'chartjs-adapter-date-fns';

(<any>pdfMake).addVirtualFileSystem(pdfFonts);

const confetti = require('canvas-confetti').default;
const Desmos = require('desmos');

const confettiCanvas = document.getElementById('confettiCanvas');
const confettiHandler = confetti.create(confettiCanvas, {
  resize: true,
  useWorker: true,
});

@Component({
  selector: 'app-template-class',
  templateUrl: './template-class.component.html',
  styleUrls: ['./template-class.component.css']
})

@Injectable()
export class TemplateClassComponent implements OnInit {
  // title = 'More Problems';

  screenWidth = window.innerWidth;
  mobileWidth = 1000;
  blank = " ";
  menuOpen = false;
  quiz_config: any = {};
  data_loaded = false;

  expand_filters = true;
  topics: string[] = [];
  subtopics: string[] = [];
  topics_count: { [key: string]: number } = {};
  subtopics_count: { [key: string]: number } = {};
  state_filters: string[] = [];
  grade_filters: string[] = [];
  subject_filters: string[] = [];
  topic_filters: string[] = [];
  // sub_topic = false;
  show_refsheet = false;
  show_calculator = false;
  show_protractor = false;
  show_ruler = false;
  show_supplements = true;
  expand_overview = true;
  expand_topics = true;
  show_correct = false;
  mode = 'assess';
  shuffle = false;
  public = false;
  quiz_name: string = '';
  quiz_length = 10;
  quiz_timer = 10;
  timer_hours = 0;
  timer_minutes = 0;

  favorite_std_set: string[][] = [];

  exam_id: string = "";
  quiz_id: string = "";
  exam_url: string = "";
  exam_dl = 0;
  file_source: string = "";
  file_page: number = 0;
  file_zoom = 85;
  ref_zoom = 100;
  exam_fav = false;
  exam_name: string = "";

  share_c = false;
  edit_c = false;
  add_s = false;
  add_a = false;
  create_q = false;
  assign_e = false;
  assign_q = false;
  edit_c_list: { [index: string]: any } = {};
  new_assignments: string[] = [];
  new_exams: string[] = [];
  new_quizzes: string[] = [];
  new_students: string[] = [];

  user_data: any = {};
  my_students: string[] = [];
  my_students_data: any = {};
  selected_student: string = "";
  selected_student_st: string = "";
  selected_student_data: any = {};
  all_students: string[] = [];
  all_students_data: any = {};

  student_data: any = {};
  selected_stud_results: string = "";
  selected_exam_results: string = "";
  selected_quiz_results: string = "";
  selected_assignment: string = "";
  stud_results_loaded = false;
  exam_results_loaded = false;
  quiz_results_loaded = false;
  stud_class_set: string[] = [];
  is_auth = false;
  is_student = false;
  is_enrolled = false;

  class_uid: string = "";
  class_data: any = {};
  class_exam_set: string[] = [];
  class_quiz_set: string[] = [];
  class_stud_set: string[] = [];
  my_class_metadata: any[] = [];
  class_student_metadata: any[] = [];
  class_exam_metadata: any[] = [];
  class_quiz_metadata: any[] = [];

  // selected_students: string[] = [];

  assign_title = "Assignments For This Class";
  exams_title: string = "Exam Assigned To This Class";
  quizzes_title: string = "Quizzes Assigned To This Class";

  favorite_exm_set: string[] = [];

  class_total_problems = 0;
  class_correct_problems = 0;
  total_percent_correct = 0;
  total_test_time: string = "";
  complete_exam_count = 0;
  complete_exam_list: string[] = [];
  student_sub_metadata: any = {};
  exam_sub_metadata: any = {};
  quiz_sub_metadata: any = {};
  selected_exam = "";
  selected_sub: string[] = ["", ""];
  expand_problems = false;
  expand_subtopics = false;
  db_submission: any = {};
  exam_submission: { [key: string]: { 'Number': number, 'Topics': string[], 'SubTopics': string[], 'Choice': string, 'Correct': string, 'Rationale': string, 'Attempts': number, 'Path': string[], 'Seconds': number, 'Time': string } } = {};
  exam_submission_list: any[] = [];
  wrong_submission_list: any[] = [];
  exam_length = 0;
  number_correct = 0;
  correct_percent = 0;
  performance_level = "";
  time_duration = "";
  grade_breakdown: { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Seconds': number, 'Time': string, 'Subs': { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Seconds': number, 'Time': string, 'Tops': { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Seconds': number, 'Time': string, 'SubTops': { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Seconds': number, 'Time': string } } } } } } } } = {};
  subject_breakdown_top: { [key: string]: { 'Grade': string, 'Subject': string, 'Break': { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Seconds': number, 'Time': string, 'Tops': { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Seconds': number, 'Time': string, } } } } } = {};
  subject_breakdown_subtop: { [key: string]: { 'Grade': string, 'Subject': string, 'Topic': string, 'Break': { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Seconds': number, 'Time': string, 'SubTops': { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Seconds': number, 'Time': string, } } } } } = {};
  topic_breakdown: { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Seconds': number, 'Time': string, 'Subs': { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Seconds': number, 'Time': string } } } } = {};

  dump_count = 0;

  filtered_set: string[] = this.dumpService.exam_set;
  filtered_exam_num = 0;
  filtered_prob_num = 0;
  generate_message = "";

  problems_sequence: number[] = [];
  problem_ids: string[] = [];
  ordered_dump: { [key: number]: { 'Number': any, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'SuppTools': string[], 'Points': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = {};
  exam_dump: { [key: number]: { 'Number': any, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'SuppTools': string[], 'Points': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = {};
  pdf_dump: any = { content: [], styles: { tableExample: { margin: [0, 5, 0, 15] } }, defaultStyle: { columnGap: 20, fontSize: 15 }, images: {} };
  refsheet_source: string = '';
  st_refsheet_source: string = '';
  supp_dump: any = {};
  supp_st_dump: any = {};
  random_index = 0
  random_list: string[] = [];

  exam_key: any[] = [];

  signup: boolean = false;
  login: boolean = false;
  selected_topic = "";
  selected_subtopic = "";
  standard_id = '';
  standard_fav = false;
  includes_standard = false;
  streak_count = 0;
  subtopic_streak_count = 0;
  subtopic_problem_count = 0;
  subtopic_new_problem_count = 0;
  subtopic_correct_problem_count = 0;
  subtopic_problem_number = 0;
  subtopic_search_dump: { [key: number]: { 'Number': any, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'SuppTools': string[], 'Points': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = {};
  subtopic_submission: any[] = [];
  subtopic_problem_selection: any[] = [];
  subtopic_problem_attempts: number[] = [];
  subtopic_attempt_path: any[] = [];
  subtopic_attempt_response: string[] = [];
  subtopic_attempt_explanation: any[] = [];
  m_selection: string[][] = [["", ""]];
  m_submission: { [key: string]: string }[] = [{}];
  c_submission: { [key: string]: string[] }[] = [{}];
  m_shuffled = false;
  choices_sequence: string[] = [];
  choices_sequence_st: string[] = [];
  shuffle_choices: { [key: string]: string[] } = {};
  shuffle_choices_st: { [key: string]: string[] } = {};
  unique_choices: string[][] = [];
  unique_choices_st: string[][] = [];
  results_hover: string = '';
  link_copied: boolean = false;

  default_problem_pdf: any = {
    columns: []
  };

  state_labels: { [key: string]: string } = {
    "Colorado": "CO",
    "Delaware": "DE",
    "Florida": "FL",
    "Illinois": "IL",
    "Maine": "ME",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Nebraska": "NE",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "Tennessee": "TN",
    "Texas": "TX",
    "Wisconsin": "WI"
  };

  fonts: any = {
    Courier: {
      normal: 'Courier',
      bold: 'Courier-Bold',
      italics: 'Courier-Oblique',
      bolditalics: 'Courier-BoldOblique'
    },
    Helvetica: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique'
    },
    Times: {
      normal: 'Times-Roman',
      bold: 'Times-Bold',
      italics: 'Times-Italic',
      bolditalics: 'Times-BoldItalic'
    },
    Roboto: {
      normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
      bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
      italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
      bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
    },
    MajorMonoDisplay: {
      normal: 'https://cdn.jsdelivr.net/fontsource/fonts/major-mono-display@latest/latin-400-normal.ttf'
    }
  };

  iti: any;
  user: any;
  phone: string = "";
  iti_msg: string = "";
  otp: string = '';
  verify: any
  windowRef: any;
  login_method = "";
  user_role = "";
  pw_reset = false;
  win = new WindowService;

  @ViewChild('userPhone') userPhone: ElementRef;

  constructor(public authService: AuthService, public dumpService: DumpService, public router: Router, private aRoute: ActivatedRoute, private afAuth: AngularFireAuth, private http: HttpClient) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  sub: any;

  max(num1: number, num2: number) {
    return (Math.max(num1, num2));
  }

  width_change() {
    this.screenWidth = window.innerWidth;
    // this.viewerWidth = Math.round(window.innerWidth*.99).toString() + "px";
    // this.viewerHeight = Math.round(window.innerHeight*.8).toString() + "px";
  }

  width_change2() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= this.mobileWidth) {
      this.expand_topics = false;
      this.expand_problems = false;
      this.file_zoom = 95;
    }
    else {
      this.expand_topics = true;
      this.expand_problems = true;
    }
  }

  master_filters(filts: string[]) {
    var master_filts = []
    if (filts != undefined) {
      for (let filt of filts) {
        if (Object.keys(this.dumpService.sub_subjects).includes(filt)) {
          master_filts.push(filt);
        }
      }
    }
    return master_filts;
  }

  get_hours(seconds: number) {
    return Math.floor(seconds / 60);
  }

  get_part_num_st(part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    return part_num;
  }

  can_assign_s(std: string) {
    return (!Object.keys(this.all_students_data[std].exams.history).includes(this.exam_id));
  }

  can_assign_c(clss: string) {
    return (!this.my_class_metadata[this.authService.userData.classes.indexOf(clss) - 1].exams.includes(this.exam_id));
  }

  can_assign_e(xm: string) {
    return (!this.class_exam_set.includes(xm));
  }

  load_data() {
    this.class_data = {};
    this.class_data = this.authService.searchClassId(this.class_uid);
    setTimeout(() => {
      console.log(this.class_data);
      this.data_loaded = true;
    }, 500);
  }

  copy_link() {
    navigator.clipboard.writeText('moreproblems.org/class/' + this.class_uid);
    this.link_copied = true;
  }

  toggle_topic(val: string) {
    if (!this.topic_filters.includes(val)) {
      this.topic_filters.push(val)
    }
    else {
      if (this.topic_filters.indexOf(val) != -1) {
        this.topic_filters.splice(this.topic_filters.indexOf(val), 1);
      }
      else {
        this.topic_filters.pop()
      }
    }
    this.filter_exams();
  }

  filter_exams() {
    this.filtered_set = [];
    this.topics = [];
    this.topics_count = {};
    for (let i = 0; i < this.dumpService.exam_set.length; i++) {
      if ((this.state_filters.includes(this.dumpService.exam_attribute_dump[this.dumpService.exam_set[i]].State) || this.state_filters.includes(this.dumpService.exam_attribute_dump[this.dumpService.exam_set[i]].ExamName) || this.state_filters.length == 0) && (this.grade_filters.includes(this.dumpService.exam_attribute_dump[this.dumpService.exam_set[i]].Grade) || this.grade_filters.length == 0) && (this.subject_filters.includes(this.dumpService.exam_attribute_dump[this.dumpService.exam_set[i]].Subject) || this.subject_filters.length == 0)) {
        this.filtered_set.push(this.dumpService.exam_set[i]);
      }
    }
    this.filtered_exam_num = this.filtered_set.length;
    this.filtered_prob_num = 0;
    for (let i = 0; i < this.filtered_set.length; i++) {
      this.filtered_prob_num += this.dumpService.exam_attribute_dump[this.filtered_set[i]].NumProblems;
      if (!this.dumpService.exam_attribute_dump[this.filtered_set[i]].HideTopics) {
        for (const [key, val] of Object.entries(this.dumpService.exam_attribute_dump[this.filtered_set[i]].Topics)) {
          if (!this.topics.includes(key)) {
            this.topics.push(key);
          }
          if (!Object.keys(this.topics_count).includes(key)) {
            this.topics_count[key] = val;
          }
          else {
            this.topics_count[key] += val;
          }
        }
      }
    }
    for (let topic of this.topic_filters) {
      if (!this.topics.includes(topic)) {
        this.toggle_topic(topic);
      }
    }
    if (this.grade_filters.length == 0 && this.subject_filters.length == 0) {
      this.topics = [];
      this.topics_count = {};
      this.topic_filters = []
    }
    if (this.filtered_set.length == 0) {
      this.generate_message = "There are no problems based on your selection.";
    }
  }

  randomize_problems(total: number) {
    if (this.quiz_config.problems == undefined) {
      this.problems_sequence = Array.from({ length: Object.keys(this.ordered_dump).length }, (_, i) => i);
    }
    else {
      this.problems_sequence = Array.from({ length: Object.keys(this.ordered_dump).length }, (_, i) => i + 1);
    }
    console.log(this.problems_sequence);
    this.random_list = []
    for (let i = 1; i <= total; i++) {
      this.random_index = Math.floor(Math.random() * this.problems_sequence.length);
      this.random_list.push('' + this.problems_sequence[this.random_index]);
      this.exam_dump[i] = this.ordered_dump[this.problems_sequence[this.random_index]];
      if (this.exam_dump[i].Parts == undefined) {
        this.exam_dump[i].Parts = {};
      }
      if (this.exam_dump[i].SuppContent == undefined) {
        this.exam_dump[i].SuppContent = [];
      }
      this.problems_sequence.splice(this.random_index, 1);
      this.problem_ids.push(this.exam_dump[i].Number);
    }
    console.log(this.problem_ids);
    console.log(this.exam_dump);
    this.exam_key = [];
    for (const [num, val] of Object.entries(this.exam_dump)) {
      this.exam_key.push([]);
      if (Object.keys(val.Parts).length == 0) {
        this.exam_key[this.exam_key.length - 1].push([]);
        if (Object.keys(val.AnswerChoices).length == 0) {
          this.exam_key[this.exam_key.length - 1][0].push('');
        }
        else if (['O'].includes(val.Type)) {
          this.exam_key[this.exam_key.length - 1][0] = this.get_o_key(val.AnswerChoices);
        }
        else if (['C'].includes(val.Type)) {
          this.exam_key[this.exam_key.length - 1][0] = this.get_c_key(val.AnswerChoices);
        }
        else if (['G'].includes(val.Type)) {
          this.exam_key[this.exam_key.length - 1][0] = this.get_g_key(val.AnswerChoices);
        }
        else {
          for (const [ch, val2] of Object.entries(val.AnswerChoices)) {
            if (['MC', 'IMC', 'MS', 'IMS'].includes(val.Type) && val2.Key.Correct) {
              this.exam_key[this.exam_key.length - 1][0].push(ch);
            }
            else if (['IDD'].includes(val.Type) && val2.Key.Correct) {
              this.exam_key[this.exam_key.length - 1][0].push([ch[2]]);
            }
            else if (['FR'].includes(val.Type) && ch.includes('KEY')) {
              this.exam_key[this.exam_key.length - 1][0].push(val2.Choice);
            }
            else if (['MFR'].includes(val.Type) && ch.includes('KEY')) {
              this.exam_key[this.exam_key.length - 1][0].push([val2.Choice]);
            }
            else if (['T'].includes(val.Type) && ch.includes('KEY')) {
              this.exam_key[this.exam_key.length - 1][0].push([val2.Choice]);
            }
          }
        }
      }
      else {
        for (let part of Object.keys(val.Parts)) {
          this.exam_key[this.exam_key.length - 1].push([]);
          if (Object.keys(val.Parts[part].AnswerChoices).length == 0) {
            this.exam_key[this.exam_key.length - 1][Object.keys(val.Parts).indexOf(part)].push('');
          }
          else if (['O'].includes(val.Parts[part].Type)) {
            this.exam_key[this.exam_key.length - 1][Object.keys(val.Parts).indexOf(part)] = this.get_o_key(val.Parts[part].AnswerChoices);
          }
          else if (['C'].includes(val.Parts[part].Type)) {
            this.exam_key[this.exam_key.length - 1][Object.keys(val.Parts).indexOf(part)] = this.get_c_key(val.Parts[part].AnswerChoices);
          }
          else if (['G'].includes(val.Parts[part].Type)) {
            this.exam_key[this.exam_key.length - 1][Object.keys(val.Parts).indexOf(part)] = this.get_g_key(val.Parts[part].AnswerChoices);
          }
          else {
            for (const [ch, val2] of Object.entries(val.Parts[part].AnswerChoices)) {
              if (['MC', 'IMC', 'MS', 'IMS'].includes(val.Parts[part].Type) && val2.Key.Correct) {
                this.exam_key[this.exam_key.length - 1][Object.keys(val.Parts).indexOf(part)].push(ch);
              }
              else if (['IDD'].includes(val.Parts[part].Type) && val2.Key.Correct) {
                this.exam_key[this.exam_key.length - 1][Object.keys(val.Parts).indexOf(part)].push([ch[2]]);
              }
              else if (['FR'].includes(val.Parts[part].Type) && ch.includes('KEY')) {
                this.exam_key[this.exam_key.length - 1][Object.keys(val.Parts).indexOf(part)].push(val2.Choice);
              }
              else if (['MFR'].includes(val.Parts[part].Type) && ch.includes('KEY')) {
                this.exam_key[this.exam_key.length - 1][Object.keys(val.Parts).indexOf(part)].push([val2.Choice]);
              }
              else if (['T'].includes(val.Parts[part].Type) && ch.includes('KEY')) {
                this.exam_key[this.exam_key.length - 1][Object.keys(val.Parts).indexOf(part)].push([val2.Choice]);
              }
            }
          }
        }
      }
    }
    console.log(JSON.stringify(this.exam_dump));
    console.log(this.exam_submission);
    console.log(this.exam_key);
  }

  select_exam(ex: string) {
    this.exam_dl = (this.authService.searchExamId(ex)).downloads;
    setTimeout(() => {
      console.log(this.exam_dl);
      this.exam_dl = (this.authService.searchExamId(ex)).downloads;
      console.log(this.exam_dl);
      this.exam_id = ex;
      this.exam_url = '/exam/' + ex;
      this.file_source = "../assets/exams/" + ex + ".pdf";
      this.file_page = 1;
      this.exam_name = this.dumpService.exam_names[ex];
      if (this.authService.userData) {
        for (let exm of this.authService.userData.exams.favorites) {
          if (ex == exm) {
            this.exam_fav = true;
          }
        }
      }
    }, 250);
  }

  toggle_assign_exam() {
    if (!this.assign_e) {
      this.all_students = [];
      this.my_students = [];
      const linked_students = this.authService.userData.students.slice(1);
      for (const [key, stud] of Object.entries(linked_students)) {
        setTimeout(() => {
          const student_data = this.authService.searchUserId(stud as string);
          this.all_students.push(stud as string);
          if (student_data != null) {
            this.all_students_data[(stud as string)] = (student_data as object);
          }
          if ((stud as string).includes(this.authService.userData.uid as string)) {
            this.my_students.push(stud as string);
            if (student_data != null) {
              this.my_students_data[(stud as string)] = (student_data as object);
            }
          }
        }, +key * 10);
      }
      setTimeout(() => {
        this.all_students = [];
        this.my_students = [];
        const linked_students = this.authService.userData.students.slice(1);
        for (const [key, stud] of Object.entries(linked_students)) {
          setTimeout(() => {
            const student_data = this.authService.searchUserId(stud as string);
            this.all_students.push(stud as string);
            if (student_data != null) {
              this.all_students_data[(stud as string)] = (student_data as object);
            }
            if ((stud as string).includes(this.authService.userData.uid as string)) {
              this.my_students.push(stud as string);
              if (student_data != null) {
                this.my_students_data[(stud as string)] = (student_data as object);
              }
            }
          }, +key * 10);
        }
      }, 100);
      this.my_class_metadata = [];
      const linked_classes = this.authService.userData.classes.slice(1);
      for (const [key, clss] of Object.entries(linked_classes)) {
        setTimeout(() => {
          console.log(clss);
          this.class_data = this.authService.searchClassId(clss as string);
          console.log(this.class_data);
          this.my_class_metadata.push(this.class_data as object);
        }, +key * 10);
      }
      setTimeout(() => {
        this.my_class_metadata = [];
        const linked_classes = this.authService.userData.classes.slice(1);
        for (const [key, clss] of Object.entries(linked_classes)) {
          setTimeout(() => {
            console.log(clss);
            this.class_data = this.authService.searchClassId(clss as string);
            console.log(this.class_data);
            this.my_class_metadata.push(this.class_data as object);
          }, +key * 10);
        }
      }, 100);
    }
    this.assign_e = !this.assign_e;
  }

  toggle_new_exam_e(target: string) {
    if (!this.new_exams.includes(target)) {
      this.new_exams.push(target);
    }
    else {
      if (this.new_exams.indexOf(target) != -1) {
        this.new_exams.splice(this.new_exams.indexOf(target), 1);
      }
      else {
        this.new_exams.pop()
      }
    }
  }

  add_assign_exam() {
    for (let ass of this.new_assignments) {
      if (ass.length < 10) {
        const class_ass_ref = 'classes/' + ass + '/exams';
        var class_exam_set: any = [];
        var edit_c_list: any = {};
        for (let exam of this.my_class_metadata[this.authService.userData.classes.indexOf(ass) - 1].exams) {
          class_exam_set.push(exam as string);
        }
        class_exam_set.push(this.exam_id);
        edit_c_list[class_ass_ref] = class_exam_set;
        this.authService.UpdateDatabase({ class_ass_ref: {} });
        this.authService.UpdateDatabase(edit_c_list);
      }
      else {
        var db_updates: any = {};
        db_updates['users/' + ass + '/exams/history/' + this.exam_id] = { progress: 0, status: 'Assigned', shuffle: false, lasttimestamp: serverTimestamp() };
        // this.db_updates['users/' + ass + '/problems/all/' + this.exam_id + '-' + "" + (this.problem_number + 1) + '/status'] = 'Viewed';
        db_updates['/submissions/exams/' + ass + '/' + this.exam_id + '/starttimestamp'] = serverTimestamp();
        this.authService.UpdateDatabase(db_updates);
      }
    }
  }

  assign_quiz() {
    if (!this.assign_q) {
      this.all_students = [];
      this.my_students = [];
      const linked_students = this.authService.userData.students.slice(1);
      for (const [key, stud] of Object.entries(linked_students)) {
        setTimeout(() => {
          const student_data = this.authService.searchUserId(stud as string);
          this.all_students.push(stud as string);
          if (student_data != null) {
            this.all_students_data[(stud as string)] = (student_data as object);
          }
          if ((stud as string).includes(this.authService.userData.uid as string)) {
            this.my_students.push(stud as string);
            if (student_data != null) {
              this.my_students_data[(stud as string)] = (student_data as object);
            }
          }
        }, +key * 10);
      }
      setTimeout(() => {
        this.all_students = [];
        this.my_students = [];
        const linked_students = this.authService.userData.students.slice(1);
        for (const [key, stud] of Object.entries(linked_students)) {
          setTimeout(() => {
            const student_data = this.authService.searchUserId(stud as string);
            this.all_students.push(stud as string);
            if (student_data != null) {
              this.all_students_data[(stud as string)] = (student_data as object);
            }
            if ((stud as string).includes(this.authService.userData.uid as string)) {
              this.my_students.push(stud as string);
              if (student_data != null) {
                this.my_students_data[(stud as string)] = (student_data as object);
              }
            }
          }, +key * 10);
        }
      }, 100);
      this.my_class_metadata = [];
      const linked_classes = this.authService.userData.classes.slice(1);
      for (const [key, clss] of Object.entries(linked_classes)) {
        setTimeout(() => {
          console.log(clss);
          this.class_data = this.authService.searchClassId(clss as string);
          console.log(this.class_data);
          this.my_class_metadata.push(this.class_data as object);
        }, +key * 10);
      }
      setTimeout(() => {
        this.my_class_metadata = [];
        const linked_classes = this.authService.userData.classes.slice(1);
        for (const [key, clss] of Object.entries(linked_classes)) {
          setTimeout(() => {
            console.log(clss);
            this.class_data = this.authService.searchClassId(clss as string);
            console.log(this.class_data);
            this.my_class_metadata.push(this.class_data as object);
          }, +key * 10);
        }
      }, 100);
    }
    this.assign_q = !this.assign_q;
  }

  toggle_new_quiz(target: string) {
    if (!this.new_assignments.includes(target)) {
      this.new_assignments.push(target);
    }
    else {
      if (this.new_assignments.indexOf(target) != -1) {
        this.new_assignments.splice(this.new_assignments.indexOf(target), 1);
      }
      else {
        this.new_assignments.pop()
      }
    }
  }

  toggle_assign_quiz() {
    if (!this.assign_q) {
      this.all_students = [];
      this.my_students = [];
      const linked_students = this.authService.userData.students.slice(1);
      for (const [key, stud] of Object.entries(linked_students)) {
        setTimeout(() => {
          const student_data = this.authService.searchUserId(stud as string);
          this.all_students.push(stud as string);
          if (student_data != null) {
            this.all_students_data[(stud as string)] = (student_data as object);
          }
          if ((stud as string).includes(this.authService.userData.uid as string)) {
            this.my_students.push(stud as string);
            if (student_data != null) {
              this.my_students_data[(stud as string)] = (student_data as object);
            }
          }
        }, +key * 10);
      }
      setTimeout(() => {
        this.all_students = [];
        this.my_students = [];
        const linked_students = this.authService.userData.students.slice(1);
        for (const [key, stud] of Object.entries(linked_students)) {
          setTimeout(() => {
            const student_data = this.authService.searchUserId(stud as string);
            this.all_students.push(stud as string);
            if (student_data != null) {
              this.all_students_data[(stud as string)] = (student_data as object);
            }
            if ((stud as string).includes(this.authService.userData.uid as string)) {
              this.my_students.push(stud as string);
              if (student_data != null) {
                this.my_students_data[(stud as string)] = (student_data as object);
              }
            }
          }, +key * 10);
        }
      }, 100);
      this.my_class_metadata = [];
      const linked_classes = this.authService.userData.classes.slice(1);
      for (const [key, clss] of Object.entries(linked_classes)) {
        setTimeout(() => {
          console.log(clss);
          this.class_data = this.authService.searchClassId(clss as string);
          console.log(this.class_data);
          this.my_class_metadata.push(this.class_data as object);
        }, +key * 10);
      }
      setTimeout(() => {
        this.my_class_metadata = [];
        const linked_classes = this.authService.userData.classes.slice(1);
        for (const [key, clss] of Object.entries(linked_classes)) {
          setTimeout(() => {
            console.log(clss);
            this.class_data = this.authService.searchClassId(clss as string);
            console.log(this.class_data);
            this.my_class_metadata.push(this.class_data as object);
          }, +key * 10);
        }
      }, 100);
    }
    this.assign_q = !this.assign_q;
  }

  clear_assignments() {
    this.new_assignments = [];
    this.assign_e = false;
    this.assign_q = false;
  }

  toDataURL(url: string) {
    return fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );
  }

  toggle_quiz_pdf(quiz: string) {
    this.quiz_id = quiz;
    this.filter_exams();
    this.dump_count = 0;
    for (let online_key of this.dumpService.exam_set) {
      if (this.filtered_set.includes(online_key)) {
        for (const [num, value] of Object.entries(this.dumpService.e_dump_dict[online_key])) {
          if (value.Number <= this.dumpService.exam_attribute_dump[online_key].NumProblems) {
            var prob: any = {};
            for (const [key, val] of Object.entries(value)) {
              prob[key] = val;
            }
            if (this.topic_filters.length == 0) {
              this.ordered_dump[this.dump_count] = prob;
              this.ordered_dump[this.dump_count].Number = online_key + '-' + (this.ordered_dump[this.dump_count].Number as string);
              this.dump_count += 1;
            }
            else if (!this.dumpService.exam_attribute_dump[online_key].HideTopics) {
              for (let topic of value.Topics) {
                if (this.topic_filters.includes(topic)) {
                  this.ordered_dump[this.dump_count] = prob;
                  this.ordered_dump[this.dump_count].Number = online_key + '-' + (this.ordered_dump[this.dump_count].Number as string);
                  this.dump_count += 1;
                }
              }
            }
            console.log(this.dump_count);
          }
        }
      }
    }
    console.log(this.ordered_dump);
    if (this.filtered_set.length != 0) {
      this.generate_message = "";
      if (this.quiz_length > 0) {
        this.randomize_problems(this.quiz_length);
      }
      else {
        this.randomize_problems(Math.min(100, this.filtered_prob_num));
      }
    }
    this.quiz_config = (this.authService.searchQuizId(quiz) as any);
    this.pdf_dump = { content: [], styles: { tableExample: { fontSize: 14, alignment: 'center', margin: [0, 5, 0, 15] }, tableHeader: { bold: true, alignment: 'center', fontSize: 15, fillColor: '#AAAAAA' } }, defaultStyle: { columnGap: 10, font: 'Helvetica', fontSize: 14 }, images: {}, footer: function (currentPage: any, pageCount: any) { return [{ columns: [{ margin: [150, 10, 0, 0], width: '*', text: 'Page ' + currentPage.toString() + ' of ' + pageCount, alignment: 'left', italics: true }, { margin: [0, 10, 150, 0], width: "*", alignment: 'right', font: 'MajorMonoDisplay', characterSpacing: -2, text: 'moreproblems.org' }] }]; } };
    this.pdf_dump.content.push({ margin: [0, 0, 0, 15], columns: [{ width: "*", fontSize: 18, lineHeight: 0.9, alignment: 'center', bold: true, text: this.quiz_config.name }, { margin: [0, 5, 0, 0], width: "auto", fontSize: 24, alignment: 'right', font: 'MajorMonoDisplay', characterSpacing: -2, text: 'More+Problems!' }] });
    this.pdf_dump.content.push({ columns: [[{ margin: [0, 1, 0, 1], columns: [{ width: 45, fontSize: 16, bold: true, alignment: 'right', text: 'Name' }, { table: { widths: [195], heights: [20], body: [['']] } }] }, { margin: [0, 1, 0, 1], columns: [{ width: 45, fontSize: 15, bold: true, alignment: 'right', text: 'Class' }, { table: { widths: [195], heights: [20], body: [['']] } }] }, { margin: [0, 1, 0, 1], columns: [{ width: 45, fontSize: 15, bold: true, alignment: 'right', text: 'Date' }, { table: { widths: [195], heights: [20], body: [['']] } }] }], [{ margin: [0, 0, 0, 5], width: 200, fontSize: 15, lineHeight: 1.1, italics: true, alignment: 'center', text: ((this.quiz_config.topics != undefined) ? this.quiz_config.topics[0] : 'No Topics Added') }, { margin: [0, 0, 0, 5], fontSize: 16, alignment: 'center', text: '' + this.quiz_config.length + ' total problems' }, { margin: [0, 0, 0, 5], fontSize: 16, alignment: 'center', text: '' + this.quiz_config.timer + ' minutes allowed' }]] });
    this.pdf_dump.content.push('\n\n');
    setTimeout(() => {
      this.quiz_config = (this.authService.searchQuizId(quiz) as any);
      for (const [key, prob] of Object.entries(this.exam_dump)) {
        if (key != undefined && +key > 0) {
          for (let supp of (prob as any).SuppContent) {
            this.read_supp_json(supp);
          }
          for (let cont of (prob as any).Content) {
            if (this.is_image(cont)) {
              this.toDataURL('./assets/' + (cont as string)).then((dataUrl) => {
                this.pdf_dump.images[cont] = (dataUrl as string);
              }).catch(error => {
                console.log(error.message);
              });
            }
          }
          for (let choice of Object.keys((prob as any).AnswerChoices)) {
            if (this.is_image((prob as any).AnswerChoices[choice].Choice)) {
              this.toDataURL('./assets/' + ((prob as any).AnswerChoices[choice].Choice as string)).then((dataUrl) => {
                this.pdf_dump.images[(prob as any).AnswerChoices[choice].Choice] = (dataUrl as string);
              }).catch(error => {
                console.log(error.message);
              });
            }
          }
          for (let part of Object.keys((prob as any).Parts)) {
            for (let cont of (prob as any).Parts[part].Content) {
              if (this.is_image(cont)) {
                this.toDataURL('./assets/' + (cont as string)).then((dataUrl) => {
                  this.pdf_dump.images[cont] = (dataUrl as string);
                }).catch(error => {
                  console.log(error.message);
                });
              }
            }
            for (let choice of Object.keys((prob as any).Parts[part].AnswerChoices)) {
              if (this.is_image((prob as any).Parts[part].AnswerChoices[choice].Choice)) {
                this.toDataURL('./assets/' + ((prob as any).Parts[part].AnswerChoices[choice].Choice as string)).then((dataUrl) => {
                  this.pdf_dump.images[(prob as any).Parts[part].AnswerChoices[choice].Choice] = (dataUrl as string);
                }).catch(error => {
                  console.log(error.message);
                });
              }
            }
          }
        }
      }
      setTimeout(() => {
        for (const [key, prob] of Object.entries(this.exam_dump)) {
          if (key != undefined && +key > 0) {
            for (let supp of (prob as any).SuppContent) {
              for (let block of this.supp_dump[supp].Context) {
                if (this.is_image(block)) {
                  this.toDataURL('./assets/' + (block as string)).then((dataUrl) => {
                    this.pdf_dump.images[block] = (dataUrl as string);
                  }).catch(error => {
                    console.log(error.message);
                  });
                }
              }
              for (let block of this.supp_dump[supp].Content) {
                if (this.is_image(block[1])) {
                  this.toDataURL('./assets/' + (block[1] as string)).then((dataUrl) => {
                    this.pdf_dump.images[block[1]] = (dataUrl as string);
                  }).catch(error => {
                    console.log(error.message);
                  });
                }
              }
            }
          }
        }
      }, 250);
      setTimeout(() => {
        for (const [key, prob] of Object.entries(this.exam_dump)) {
          if (key != undefined && +key > 0) {
            for (let supp of (prob as any).SuppContent) {
              this.pdf_dump.content.push({ table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } });
              this.pdf_dump.content.push('\n\n\n');
              if (this.supp_dump[supp].Directions != '') {
                this.pdf_dump.content.push({ margin: [0, 0, 0, 10], bold: true, italics: true, alignment: 'center', text: this.supp_dump[supp].Directions });
              }
              if (this.supp_dump[supp].Directions != '') {
                this.pdf_dump.content.push({ margin: [0, 0, 0, 10], fontSize: 16, bold: true, alignment: 'center', text: this.supp_dump[supp].Title });
              }
              else {
                this.pdf_dump.content.push({ margin: [0, 0, 0, 10], fontSize: 16, bold: true, alignment: 'center', text: this.supp_dump[supp].Title });
              }
              if (this.supp_dump[supp].Subtitle != '') {
                this.pdf_dump.content.push({ margin: [0, 0, 0, 10], bold: true, alignment: 'center', text: this.supp_dump[supp].Subtitle });
              }
              if (this.supp_dump[supp].Author != '') {
                this.pdf_dump.content.push({ margin: [0, 0, 0, 10], italics: true, alignment: 'center', text: this.supp_dump[supp].Author });
              }
              for (let block of this.supp_dump[supp].Context) {
                if (this.is_image(block)) {
                  this.pdf_dump.content.push({ margin: [0, 0, 0, 10], alignment: 'center', image: block, fit: [400, 250] });
                }
                else {
                  this.pdf_dump.content.push({ margin: [0, 0, 0, 10], italics: true, alignment: 'center', text: block });
                }
              }
              for (let block of this.supp_dump[supp].Content) {
                if (this.is_image(block[1])) {
                  this.pdf_dump.content.push({ unbreakable: true, columns: [{ width: 25, fontSize: 14, characterSpacing: 0, bold: true, text: '' }, { margin: [0, 0, 0, 10], alignment: 'center', image: block[1], fit: [400, 250] }] });
                }
                else if (block[1].startsWith(':box:')) {
                  this.pdf_dump.content.push({ unbreakable: true, columns: [{ width: 25, fontSize: 14, characterSpacing: 0, bold: true, text: '' }, { margin: [0, 0, 40, 10], alignment: 'left', table: { widths: ['auto'], heights: ['auto'], body: [[block[1].slice(5)]] }, layout: { paddingRight: function (i: any, node: any) { return 20; }, paddingLeft: function (i: any, node: any) { return 20; }, paddingTop: function (i: any, node: any) { return 10; }, paddingBottom: function (i: any, node: any) { return 10; } } }] });
                }
                else if (block[1].startsWith(':ibox:')) {
                  this.pdf_dump.content.push({ unbreakable: true, columns: [{ width: 25, fontSize: 14, characterSpacing: 0, bold: true, text: '' }, { margin: [0, 0, 40, 10], alignment: 'left', table: { widths: ['auto'], heights: ['auto'], body: [[{ text: block[1].slice(6), border: [false, false, false, false] }]] }, layout: { paddingRight: function (i: any, node: any) { return 20; }, paddingLeft: function (i: any, node: any) { return 20; }, paddingTop: function (i: any, node: any) { return 10; }, paddingBottom: function (i: any, node: any) { return 10; } } }] });
                }
                else {
                  if (block[0] == '') {
                    this.pdf_dump.content.push({ unbreakable: true, columns: [{ width: 25, fontSize: 14, characterSpacing: 0, bold: true, text: '' }, { margin: [0, 0, 0, 10], fontSize: 12.5, characterSpacing: 0, bold: true, alignment: 'center', text: block[1] }] });
                  }
                  else {
                    this.pdf_dump.content.push({ unbreakable: true, columns: [{ width: 25, fontSize: 14, characterSpacing: 0, bold: true, text: block[0] }, { margin: [0, 0, 0, 10], fontSize: 12.5, characterSpacing: 0, text: block[1] }] });
                  }
                }
              }
              this.pdf_dump.content.push('\n\n\n');
            }
            this.pdf_dump.content.push({ table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } });
            this.pdf_dump.content.push('\n\n\n');
            var prob_pdf_dump = JSON.parse(JSON.stringify(this.default_problem_pdf));
            prob_pdf_dump.columns.push({ width: 35, fontSize: 18, bold: true, text: '' + key });
            var prob_pdf_content: any[] = [];
            for (let cont of (prob as any).Content) {
              if (this.is_image(cont)) {
                prob_pdf_content.push({ margin: [0, 0, 20, 10], alignment: 'center', image: cont, fit: [400, 250] });
              }
              else if (cont.startsWith(':box:')) {
                prob_pdf_content.push({ margin: [0, 0, 40, 10], unbreakable: true, alignment: 'left', table: { widths: ['auto'], heights: ['auto'], body: [[{ lineHeight: 1.25, text: cont.slice(5) }]] }, layout: { paddingRight: function (i: any, node: any) { return 20; }, paddingLeft: function (i: any, node: any) { return 20; }, paddingTop: function (i: any, node: any) { return 10; }, paddingBottom: function (i: any, node: any) { return 10; } } });
              }
              else if (cont.startsWith(':ibox:')) {
                prob_pdf_content.push({ margin: [0, 0, 40, 10], unbreakable: true, alignment: 'left', table: { widths: ['auto'], heights: ['auto'], body: [[{ lineHeight: 1.25, text: cont.slice(6), border: [false, false, false, false] }]] }, layout: { paddingRight: function (i: any, node: any) { return 20; }, paddingLeft: function (i: any, node: any) { return 20; }, paddingTop: function (i: any, node: any) { return 10; }, paddingBottom: function (i: any, node: any) { return 10; } } });
              }
              else {
                prob_pdf_content.push({ margin: [0, 0, 0, 10], unbreakable: true, text: cont });
              }
            }
            if ((prob as any).Type == 'FR') {
              prob_pdf_content.push('\n');
              prob_pdf_content.push({ unbreakable: true, columns: [{ width: '*', text: '' }, { width: 250, margin: [0, 0, 40, 5], alignment: 'center', table: { widths: ['*'], heights: [50], body: [[{ margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } }, { width: '*', text: '' }] });
            }
            else if ((prob as any).Type == 'SR') {
              prob_pdf_content.push('\n');
              prob_pdf_content.push({ margin: [0, 0, 40, 5], unbreakable: true, alignment: 'center', table: { widths: ['*'], heights: ['auto'], body: [[{ margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } });
            }
            else if ((prob as any).Type == 'MR') {
              prob_pdf_content.push('\n');
              prob_pdf_content.push({ margin: [0, 0, 40, 5], unbreakable: true, alignment: 'center', table: { widths: ['*'], heights: ['auto'], body: [[{ border: [true, true, true, false], margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, true], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } });
            }
            else if ((prob as any).Type == 'LR') {
              prob_pdf_content.push('\n');
              prob_pdf_content.push({ margin: [0, 0, 40, 5], unbreakable: true, alignment: 'center', table: { widths: ['*'], heights: ['auto'], body: [[{ border: [true, true, true, false], margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, true], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } });
            }
            else if ((prob as any).Type == 'MP') {
              for (let part of Object.keys((prob as any).Parts)) {
                prob_pdf_content.push('\n');
                prob_pdf_content.push({ margin: [0, 10, 40, 15], fontSize: 16, bold: true, italics: true, alignment: 'center', text: 'Part ' + part });
                for (let cont of (prob as any).Parts[part].Content) {
                  if (this.is_image(cont)) {
                    prob_pdf_content.push({ margin: [0, 0, 20, 10], alignment: 'center', image: cont, fit: [400, 250] });
                  }
                  else if (cont.startsWith(':box:')) {
                    prob_pdf_content.push({ margin: [0, 0, 40, 10], unbreakable: true, alignment: 'left', table: { widths: ['auto'], heights: ['auto'], body: [[{ lineHeight: 1.25, text: cont.slice(5) }]] }, layout: { paddingRight: function (i: any, node: any) { return 20; }, paddingLeft: function (i: any, node: any) { return 20; }, paddingTop: function (i: any, node: any) { return 10; }, paddingBottom: function (i: any, node: any) { return 10; } } });
                  }
                  else if (cont.startsWith(':ibox:')) {
                    prob_pdf_content.push({ margin: [0, 0, 40, 10], unbreakable: true, alignment: 'left', table: { widths: ['auto'], heights: ['auto'], body: [[{ lineHeight: 1.25, text: cont.slice(6), border: [false, false, false, false] }]] }, layout: { paddingRight: function (i: any, node: any) { return 20; }, paddingLeft: function (i: any, node: any) { return 20; }, paddingTop: function (i: any, node: any) { return 10; }, paddingBottom: function (i: any, node: any) { return 10; } } });
                  }
                  else {
                    prob_pdf_content.push({ margin: [0, 0, 0, 10], unbreakable: true, text: cont });
                  }
                }
                prob_pdf_content.push('\n');
                if ((prob as any).Parts[part].Type == 'FR') {
                  prob_pdf_content.push({ unbreakable: true, columns: [{ width: '*', text: '' }, { width: 250, margin: [0, 0, 40, 5], alignment: 'center', table: { widths: ['*'], heights: [50], body: [[{ margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } }, { width: '*', text: '' }] });
                }
                else if ((prob as any).Parts[part].Type == 'SR') {
                  prob_pdf_content.push({ margin: [0, 0, 40, 5], unbreakable: true, alignment: 'center', table: { widths: ['*'], heights: ['auto'], body: [[{ margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } });
                }
                else if ((prob as any).Parts[part].Type == 'MR') {
                  prob_pdf_content.push({ margin: [0, 0, 40, 5], unbreakable: true, alignment: 'center', table: { widths: ['*'], heights: ['auto'], body: [[{ border: [true, true, true, false], margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, true], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } });
                }
                else if ((prob as any).Parts[part].Type == 'LR') {
                  prob_pdf_content.push('\n');
                  prob_pdf_content.push({ margin: [0, 0, 40, 5], unbreakable: true, alignment: 'center', table: { widths: ['*'], heights: ['auto'], body: [[{ border: [true, true, true, false], margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, true], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } });
                }
                else {
                  var choice_num = 1;
                  var column1: any[] = [];
                  var column2: any[] = [];
                  for (let choice of Object.keys((prob as any).Parts[part].AnswerChoices)) {
                    var choice_pdf_dump = JSON.parse(JSON.stringify(this.default_problem_pdf));
                    choice_pdf_dump.unbreakable = true;
                    choice_pdf_dump.columns.push({ width: 20, fontSize: 16, bold: true, text: choice });
                    if (this.is_image((prob as any).Parts[part].AnswerChoices[choice].Choice)) {
                      choice_pdf_dump.columns.push({ margin: [0, 0, 0, 10], alignment: 'center', image: (prob as any).Parts[part].AnswerChoices[choice].Choice, fit: [200, 125] });
                    }
                    else {
                      choice_pdf_dump.columns.push({ margin: [0, 0, 0, 10], text: (prob as any).Parts[part].AnswerChoices[choice].Choice });
                    }
                    if (choice_num % 2 == 1) {
                      column1.push(choice_pdf_dump);
                    }
                    else {
                      column2.push(choice_pdf_dump);
                    }
                    choice_num += 1;
                  }
                  prob_pdf_content.push({ columns: [column1, column2] });
                }
              }
            }
            else {
              var choice_num = 1;
              var column1: any[] = [];
              var column2: any[] = [];
              prob_pdf_content.push('\n');
              for (let choice of Object.keys((prob as any).AnswerChoices)) {
                var choice_pdf_dump = JSON.parse(JSON.stringify(this.default_problem_pdf));
                choice_pdf_dump.unbreakable = true;
                choice_pdf_dump.columns.push({ width: 20, fontSize: 16, bold: true, text: choice });
                if (this.is_image((prob as any).AnswerChoices[choice].Choice)) {
                  choice_pdf_dump.columns.push({ margin: [0, 0, 0, 10], alignment: 'center', image: (prob as any).AnswerChoices[choice].Choice, fit: [200, 125] });
                }
                else {
                  choice_pdf_dump.columns.push({ margin: [0, 0, 0, 10], text: (prob as any).AnswerChoices[choice].Choice });
                }
                if (choice_num % 2 == 1) {
                  column1.push(choice_pdf_dump);
                }
                else {
                  column2.push(choice_pdf_dump);
                }
                choice_num += 1;
              }
              prob_pdf_content.push({ columns: [column1, column2] });
            }
            prob_pdf_dump.columns.push(prob_pdf_content);
            this.pdf_dump.content.push(prob_pdf_dump);
            this.pdf_dump.content.push('\n\n\n');
          }
        }
        this.pdf_dump.content.push({ fontSize: 18, bold: true, alignment: 'center', pageBreak: 'before', text: 'Answer Key\n\n' });
        // var key_pdf_dump: any = { style: "tableExample", table: { body: [[{ text: '', style: 'tableHeader' }, { text: 'Answer', style: 'tableHeader' }, { text: 'Subtopic', style: 'tableHeader' }]] }, layout: { fillColor: function (rowIndex: any, node: any, columnIndex: any) { return (rowIndex % 2 === 0) ? '#EEEEEE' : null; } } };
        var key_pdf_dump: any = { style: "tableExample", table: { body: [[{ text: '', style: 'tableHeader' }, { text: 'Answer', style: 'tableHeader' }, { text: 'Explanation', style: 'tableHeader' }, { text: 'Subtopic', style: 'tableHeader' }]], dontBreakRows: true }, layout: { fillColor: function (rowIndex: any, node: any, columnIndex: any) { return (rowIndex % 2 === 0) ? '#EEEEEE' : null; } } };
        for (const [key, prob] of Object.entries(this.exam_dump)) {
          var answer: string = '';
          var rationale: string = '';
          if ((prob as any).Type != 'FR') {
            for (const [ch, choice] of Object.entries((prob as any).AnswerChoices)) {
              if ((choice as any).Key.Correct) {
                if (answer.length > 0) {
                  answer += ', ';
                }
                answer += '' + ch;
                rationale = '' + (choice as any).Key.Rationale;
              }
            }
          }
          else {
            answer = '' + (prob as any).AnswerChoices['KEY'].Choice;
            rationale = '' + (prob as any).AnswerChoices['KEY'].Key.Rationale;
          }
          // key_pdf_dump.table.body.push([ { bold: true, text: ''+key }, { bold: true, lineHeight: 0.9, alignment: 'center', text: answer }, { fontSize: 12, lineHeight: 0.9, text: ((prob as any).SubTopics[0] as string) }]);
          key_pdf_dump.table.body.push([{ bold: true, text: '' + key }, { bold: true, lineHeight: 0.9, alignment: 'center', text: answer }, { fontSize: 12, lineHeight: 0.9, text: rationale }, { fontSize: 12, lineHeight: 0.9, text: ((prob as any).SubTopics[0] as string) }]);
        }
        this.pdf_dump.content.push(key_pdf_dump);
      }, 500);
      setTimeout(() => {
        console.log(this.pdf_dump);
        pdfMake.createPdf(this.pdf_dump, undefined, this.fonts).getDataUrl((dataUrl) => {
          this.file_source = dataUrl;
        });
      }, 1250);
    }, 250);
  }

  toggle_cquiz_pdf(quiz: string) {
    this.quiz_id = quiz;
    this.quiz_config = (this.authService.searchQuizId(quiz) as any);
    this.pdf_dump = { content: [], styles: { tableExample: { fontSize: 14, alignment: 'center', margin: [0, 5, 0, 15] }, tableHeader: { bold: true, alignment: 'center', fontSize: 15, fillColor: '#AAAAAA' } }, defaultStyle: { columnGap: 10, font: 'Helvetica', fontSize: 15 }, images: {}, footer: function (currentPage: any, pageCount: any) { return [{ columns: [{ margin: [150, 10, 0, 0], width: '*', text: 'Page ' + currentPage.toString() + ' of ' + pageCount, alignment: 'left', italics: true }, { margin: [0, 10, 150, 0], width: "*", alignment: 'right', font: 'MajorMonoDisplay', characterSpacing: -2, text: 'moreproblems.org' }] }]; } };
    this.pdf_dump.content.push({ margin: [0, 0, 0, 15], columns: [{ width: "*", fontSize: 18, lineHeight: 0.9, alignment: 'center', bold: true, text: this.quiz_config.name }, { margin: [0, 5, 0, 0], width: "auto", fontSize: 24, alignment: 'right', font: 'MajorMonoDisplay', characterSpacing: -2, text: 'More+Problems!' }] });
    this.pdf_dump.content.push({ columns: [[{ margin: [0, 1, 0, 1], columns: [{ width: 45, fontSize: 16, bold: true, alignment: 'right', text: 'Name' }, { table: { widths: [195], heights: [20], body: [['']] } }] }, { margin: [0, 1, 0, 1], columns: [{ width: 45, fontSize: 15, bold: true, alignment: 'right', text: 'Class' }, { table: { widths: [195], heights: [20], body: [['']] } }] }, { margin: [0, 1, 0, 1], columns: [{ width: 45, fontSize: 15, bold: true, alignment: 'right', text: 'Date' }, { table: { widths: [195], heights: [20], body: [['']] } }] }], [{ margin: [0, 0, 0, 5], width: 200, fontSize: 15, lineHeight: 1.1, italics: true, alignment: 'center', text: this.quiz_config.topics[0] }, { margin: [0, 0, 0, 5], fontSize: 16, alignment: 'center', text: '' + this.quiz_config.length + ' total problems' }, { margin: [0, 0, 0, 5], fontSize: 16, alignment: 'center', text: '' + this.quiz_config.timer + ' minutes allowed' }]] });
    this.pdf_dump.content.push('\n\n');
    setTimeout(() => {
      this.quiz_config = (this.authService.searchQuizId(quiz) as any);
      setTimeout(() => {
        if (this.quiz_config.problems != undefined) {
          console.log(this.quiz_config.problems);
          for (const [key, prob] of Object.entries(this.quiz_config.problems)) {
            if (key != undefined && +key > 0) {
              for (let cont of (prob as any).Content) {
                if (this.is_image(cont)) {
                  this.authService.getQuizPic(quiz, cont).then((url) => {
                    this.toDataURL(url).then((dataUrl) => {
                      this.pdf_dump.images[cont] = (dataUrl as string);
                    }).catch(error => {
                      console.log(error.message);
                    });
                  });
                }
              }
              for (let choice of Object.keys((prob as any).AnswerChoices)) {
                if (this.is_image((prob as any).AnswerChoices[choice].Choice)) {
                  this.authService.getQuizPic(quiz, (prob as any).AnswerChoices[choice].Choice).then((url) => {
                    this.toDataURL(url).then((dataUrl) => {
                      this.pdf_dump.images[(prob as any).AnswerChoices[choice].Choice] = (dataUrl as string);
                    }).catch(error => {
                      console.log(error.message);
                    });
                  });
                }
              }
            }
          }
          setTimeout(() => {
            for (const [key, prob] of Object.entries(this.quiz_config.problems)) {
              if (key != undefined && +key > 0) {
                this.pdf_dump.content.push({ table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } });
                this.pdf_dump.content.push('\n\n\n');
                var prob_pdf_dump = JSON.parse(JSON.stringify(this.default_problem_pdf));
                prob_pdf_dump.columns.push({ width: 35, fontSize: 18, bold: true, text: '' + key });
                var prob_pdf_content: any[] = [];
                for (let cont of (prob as any).Content) {
                  if (this.is_image(cont)) {
                    prob_pdf_content.push({ margin: [0, 0, 20, 10], alignment: 'center', image: cont, fit: [400, 250] });
                  }
                  else if (cont.startsWith(':box:')) {
                    prob_pdf_content.push({ margin: [0, 0, 40, 10], unbreakable: true, alignment: 'left', table: { widths: ['auto'], heights: ['auto'], body: [[{ lineHeight: 1.25, text: cont.slice(5) }]] }, layout: { paddingRight: function (i: any, node: any) { return 20; }, paddingLeft: function (i: any, node: any) { return 20; }, paddingTop: function (i: any, node: any) { return 10; }, paddingBottom: function (i: any, node: any) { return 10; } } });
                  }
                  else if (cont.startsWith(':ibox:')) {
                    prob_pdf_content.push({ margin: [0, 0, 40, 10], unbreakable: true, alignment: 'left', table: { widths: ['auto'], heights: ['auto'], body: [[{ lineHeight: 1.25, text: cont.slice(6), border: [false, false, false, false] }]] }, layout: { paddingRight: function (i: any, node: any) { return 20; }, paddingLeft: function (i: any, node: any) { return 20; }, paddingTop: function (i: any, node: any) { return 10; }, paddingBottom: function (i: any, node: any) { return 10; } } });
                  }
                  else {
                    prob_pdf_content.push({ margin: [0, 0, 0, 10], unbreakable: true, text: cont });
                  }
                }
                if ((prob as any).Type == 'FR') {
                  prob_pdf_content.push('\n');
                  prob_pdf_content.push({ unbreakable: true, columns: [{ width: '*', text: '' }, { width: 250, margin: [0, 0, 40, 5], alignment: 'center', table: { widths: ['*'], heights: [50], body: [[{ margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } }, { width: '*', text: '' }] });
                }
                else if ((prob as any).Type == 'SR') {
                  prob_pdf_content.push('\n');
                  prob_pdf_content.push({ margin: [0, 0, 40, 5], unbreakable: true, alignment: 'center', table: { widths: ['*'], heights: ['auto'], body: [[{ margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } });
                }
                else if ((prob as any).Type == 'MR') {
                  prob_pdf_content.push('\n');
                  prob_pdf_content.push({ margin: [0, 0, 40, 5], unbreakable: true, alignment: 'center', table: { widths: ['*'], heights: ['auto'], body: [[{ border: [true, true, true, false], margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, true], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } });
                }
                else if ((prob as any).Type == 'MP') {
                  for (let part of Object.keys((prob as any).Parts)) {
                    prob_pdf_content.push('\n');
                    prob_pdf_content.push({ margin: [0, 10, 40, 15], fontSize: 16, bold: true, italics: true, alignment: 'center', text: 'Part ' + part });
                    for (let cont of (prob as any).Parts[part].Content) {
                      if (this.is_image(cont)) {
                        prob_pdf_content.push({ margin: [0, 0, 20, 10], alignment: 'center', image: cont, fit: [400, 250] });
                      }
                      else if (cont.startsWith(':box:')) {
                        prob_pdf_content.push({ margin: [0, 0, 40, 10], unbreakable: true, alignment: 'left', table: { widths: ['auto'], heights: ['auto'], body: [[{ lineHeight: 1.25, text: cont.slice(5) }]] }, layout: { paddingRight: function (i: any, node: any) { return 20; }, paddingLeft: function (i: any, node: any) { return 20; }, paddingTop: function (i: any, node: any) { return 10; }, paddingBottom: function (i: any, node: any) { return 10; } } });
                      }
                      else if (cont.startsWith(':ibox:')) {
                        prob_pdf_content.push({ margin: [0, 0, 40, 10], unbreakable: true, alignment: 'left', table: { widths: ['auto'], heights: ['auto'], body: [[{ lineHeight: 1.25, text: cont.slice(6), border: [false, false, false, false] }]] }, layout: { paddingRight: function (i: any, node: any) { return 20; }, paddingLeft: function (i: any, node: any) { return 20; }, paddingTop: function (i: any, node: any) { return 10; }, paddingBottom: function (i: any, node: any) { return 10; } } });
                      }
                      else {
                        prob_pdf_content.push({ margin: [0, 0, 0, 10], unbreakable: true, text: cont });
                      }
                    }
                    if ((prob as any).Parts[part].Type == 'FR') {
                      prob_pdf_content.push({ unbreakable: true, columns: [{ width: '*', text: '' }, { width: 250, margin: [0, 0, 40, 5], alignment: 'center', table: { widths: ['*'], heights: [50], body: [[{ margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } }, { width: '*', text: '' }] });
                    }
                    else if ((prob as any).Parts[part].Type == 'SR') {
                      prob_pdf_content.push({ margin: [0, 0, 40, 5], unbreakable: true, alignment: 'center', table: { widths: ['*'], heights: ['auto'], body: [[{ margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } });
                    }
                    else if ((prob as any).Parts[part].Type == 'MR') {
                      prob_pdf_content.push({ margin: [0, 0, 40, 5], unbreakable: true, alignment: 'center', table: { widths: ['*'], heights: ['auto'], body: [[{ border: [true, true, true, false], margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, true], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } });
                    }
                    else {
                      var choice_num = 1;
                      var column1: any[] = [];
                      var column2: any[] = [];
                      for (let choice of Object.keys((prob as any).Parts[part].AnswerChoices)) {
                        var choice_pdf_dump = JSON.parse(JSON.stringify(this.default_problem_pdf));
                        choice_pdf_dump.unbreakable = true;
                        choice_pdf_dump.columns.push({ width: 20, fontSize: 16, bold: true, text: choice });
                        if (this.is_image((prob as any).Parts[part].AnswerChoices[choice].Choice)) {
                          choice_pdf_dump.columns.push({ margin: [0, 0, 0, 5], alignment: 'center', image: (prob as any).Parts[part].AnswerChoices[choice].Choice, fit: [200, 125] });
                        }
                        else {
                          choice_pdf_dump.columns.push({ margin: [0, 0, 0, 5], text: (prob as any).Parts[part].AnswerChoices[choice].Choice });
                        }
                        if (choice_num % 2 == 1) {
                          column1.push(choice_pdf_dump);
                        }
                        else {
                          column2.push(choice_pdf_dump);
                        }
                        choice_num += 1;
                      }
                      prob_pdf_content.push({ columns: [column1, column2] });
                    }
                  }
                }
                else {
                  var choice_num = 1;
                  var column1: any[] = [];
                  var column2: any[] = [];
                  prob_pdf_content.push('\n');
                  for (let choice of Object.keys((prob as any).AnswerChoices)) {
                    var choice_pdf_dump = JSON.parse(JSON.stringify(this.default_problem_pdf));
                    choice_pdf_dump.unbreakable = true;
                    choice_pdf_dump.columns.push({ width: 20, fontSize: 16, bold: true, text: choice });
                    if (this.is_image((prob as any).AnswerChoices[choice].Choice)) {
                      choice_pdf_dump.columns.push({ margin: [0, 0, 0, 5], alignment: 'center', image: (prob as any).AnswerChoices[choice].Choice, fit: [200, 125] });
                    }
                    else {
                      choice_pdf_dump.columns.push({ margin: [0, 0, 0, 5], text: (prob as any).AnswerChoices[choice].Choice });
                    }
                    if (choice_num % 2 == 1) {
                      column1.push(choice_pdf_dump);
                    }
                    else {
                      column2.push(choice_pdf_dump);
                    }
                    choice_num += 1;
                  }
                  prob_pdf_content.push({ columns: [column1, column2] });
                }
                prob_pdf_dump.columns.push(prob_pdf_content);
                this.pdf_dump.content.push(prob_pdf_dump);
                this.pdf_dump.content.push('\n\n\n');
              }
            }
            this.pdf_dump.content.push({ fontSize: 18, bold: true, alignment: 'center', pageBreak: 'before', text: 'Answer Key\n\n' });
            var key_pdf_dump: any = { style: "tableExample", table: { body: [[{ text: '', style: 'tableHeader' }, { text: 'Answer', style: 'tableHeader' }, { text: 'Subtopic', style: 'tableHeader' }]] }, layout: { fillColor: function (rowIndex: any, node: any, columnIndex: any) { return (rowIndex % 2 === 0) ? '#EEEEEE' : null; } } };
            // var key_pdf_dump: any = { style: "tableExample", table: { body: [ [ {text: '', style: 'tableHeader'}, {text: 'Answer', style: 'tableHeader'}, {text: 'Explanation', style: 'tableHeader'}, {text: 'Subtopic', style: 'tableHeader'} ] ] } };
            for (const [key, prob] of Object.entries(this.quiz_config.problems)) {
              var answer: string = '';
              if ((prob as any).Type != 'FR') {
                for (const [ch, choice] of Object.entries((prob as any).AnswerChoices)) {
                  if ((choice as any).Key.Correct) {
                    if (answer.length > 0) {
                      answer += ', ';
                    }
                    answer += '' + ch;
                  }
                }
              }
              else {
                answer += '' + (prob as any).AnswerChoices['KEY'].Choice;
              }
              key_pdf_dump.table.body.push([{ bold: true, text: '' + key }, { bold: true, lineHeight: 0.9, alignment: 'center', text: answer }, { fontSize: 12, lineHeight: 0.9, text: ((prob as any).SubTopics[0] as string) }]);
              // key_pdf_dump.table.body.push([ { bold: true, text: ''+key }, { bold: true, lineHeight: 0.9, alignment: 'center', text: answer }, '', { fontSize: 12, lineHeight: 0.9, text: ((prob as any).SubTopics[0] as string) } ]);
            }
            this.pdf_dump.content.push(key_pdf_dump);
          }, 250);
        }
        setTimeout(() => {
          console.log(this.pdf_dump);
          pdfMake.createPdf(this.pdf_dump, undefined, this.fonts).getDataUrl((dataUrl) => {
            this.file_source = dataUrl;
          });
        }, 750);
      }, 250);
    }, 250);
  }

  toggle_squiz_pdf() {
    // this.selected_quiz = quiz;
    // this.quiz_config = (this.authService.searchQuizId(quiz) as any);
    this.pdf_dump = { content: [], styles: { tableExample: { fontSize: 14, alignment: 'center', margin: [0, 5, 0, 15] }, tableHeader: { bold: true, alignment: 'center', fontSize: 15, fillColor: '#AAAAAA' } }, defaultStyle: { columnGap: 10, font: 'Helvetica', fontSize: 14 }, images: {}, footer: function (currentPage: any, pageCount: any) { return [{ columns: [{ margin: [150, 10, 0, 0], width: '*', text: 'Page ' + currentPage.toString() + ' of ' + pageCount, alignment: 'left', italics: true }, { margin: [0, 10, 150, 0], width: "*", alignment: 'right', font: 'MajorMonoDisplay', characterSpacing: -2, text: 'moreproblems.org' }] }]; } };
    this.pdf_dump.content.push({ margin: [0, 0, 0, 15], columns: [{ width: "*", fontSize: 18, lineHeight: 0.9, alignment: 'center', bold: true, text: 'Practice Worksheet' }, { margin: [0, 5, 0, 0], width: "auto", fontSize: 24, alignment: 'right', font: 'MajorMonoDisplay', characterSpacing: -2, text: 'More+Problems!' }] });
    this.pdf_dump.content.push({ columns: [[{ mdargin: [0, 1, 0, 1], columns: [{ width: 45, fontSize: 16, bold: true, alignment: 'right', text: 'Name' }, { table: { widths: [195], heights: [20], body: [['']] } }] }, { margin: [0, 1, 0, 1], columns: [{ width: 45, fontSize: 15, bold: true, alignment: 'right', text: 'Date' }, { table: { widths: [195], heights: [20], body: [['']] } }] }], [{ margin: [0, 0, 0, 5], width: 200, fontSize: 15, lineHeight: 1.1, italics: true, alignment: 'center', text: this.selected_topic }, { margin: [0, 0, 0, 5], fontSize: 16, alignment: 'center', text: '' + this.subtopic_problem_count + ' total problems' }]] });
    this.pdf_dump.content.push('\n\n');
    setTimeout(() => {
      // this.quiz_config = (this.authService.searchQuizId(quiz) as any);
      for (const [key, prob] of Object.entries(this.subtopic_search_dump)) {
        if (key != undefined && +key > 0) {
          for (let supp of (prob as any).SuppContent) {
            this.read_supp_st_json(supp);
          }
          for (let cont of (prob as any).Content) {
            if (this.is_image(cont)) {
              this.toDataURL('./assets/' + (cont as string)).then((dataUrl) => {
                this.pdf_dump.images[cont] = (dataUrl as string);
              }).catch(error => {
                console.log(error.message);
              });
            }
          }
          for (let choice of Object.keys((prob as any).AnswerChoices)) {
            if (this.is_image((prob as any).AnswerChoices[choice].Choice)) {
              this.toDataURL('./assets/' + ((prob as any).AnswerChoices[choice].Choice as string)).then((dataUrl) => {
                this.pdf_dump.images[(prob as any).AnswerChoices[choice].Choice] = (dataUrl as string);
              }).catch(error => {
                console.log(error.message);
              });
            }
          }
          for (let part of Object.keys((prob as any).Parts)) {
            for (let cont of (prob as any).Parts[part].Content) {
              if (this.is_image(cont)) {
                this.toDataURL('./assets/' + (cont as string)).then((dataUrl) => {
                  this.pdf_dump.images[cont] = (dataUrl as string);
                }).catch(error => {
                  console.log(error.message);
                });
              }
            }
            for (let choice of Object.keys((prob as any).Parts[part].AnswerChoices)) {
              if (this.is_image((prob as any).Parts[part].AnswerChoices[choice].Choice)) {
                this.toDataURL('./assets/' + ((prob as any).Parts[part].AnswerChoices[choice].Choice as string)).then((dataUrl) => {
                  this.pdf_dump.images[(prob as any).Parts[part].AnswerChoices[choice].Choice] = (dataUrl as string);
                }).catch(error => {
                  console.log(error.message);
                });
              }
            }
          }
        }
      }
      setTimeout(() => {
        for (const [key, prob] of Object.entries(this.subtopic_search_dump)) {
          if (key != undefined && +key > 0) {
            for (let supp of (prob as any).SuppContent) {
              for (let block of this.supp_st_dump[supp].Context) {
                if (this.is_image(block)) {
                  this.toDataURL('./assets/' + (block as string)).then((dataUrl) => {
                    this.pdf_dump.images[block] = (dataUrl as string);
                  }).catch(error => {
                    console.log(error.message);
                  });
                }
              }
              for (let block of this.supp_st_dump[supp].Content) {
                if (this.is_image(block[1])) {
                  this.toDataURL('./assets/' + (block[1] as string)).then((dataUrl) => {
                    this.pdf_dump.images[block[1]] = (dataUrl as string);
                  }).catch(error => {
                    console.log(error.message);
                  });
                }
              }
            }
          }
        }
      }, 250);
      setTimeout(() => {
        for (const [key, prob] of Object.entries(this.subtopic_search_dump)) {
          if (key != undefined && +key > 0) {
            for (let supp of (prob as any).SuppContent) {
              this.pdf_dump.content.push({ table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } });
              this.pdf_dump.content.push('\n\n\n');
              if (this.supp_st_dump[supp].Directions != '') {
                this.pdf_dump.content.push({ margin: [0, 0, 0, 10], bold: true, italics: true, alignment: 'center', text: this.supp_st_dump[supp].Directions });
              }
              if (this.supp_st_dump[supp].Directions != '') {
                this.pdf_dump.content.push({ margin: [0, 0, 0, 10], fontSize: 16, bold: true, alignment: 'center', text: this.supp_st_dump[supp].Title });
              }
              else {
                this.pdf_dump.content.push({ margin: [0, 0, 0, 10], fontSize: 16, bold: true, alignment: 'center', text: this.supp_st_dump[supp].Title });
              }
              if (this.supp_st_dump[supp].Subtitle != '') {
                this.pdf_dump.content.push({ margin: [0, 0, 0, 10], bold: true, alignment: 'center', text: this.supp_st_dump[supp].Subtitle });
              }
              if (this.supp_st_dump[supp].Author != '') {
                this.pdf_dump.content.push({ margin: [0, 0, 0, 10], italics: true, alignment: 'center', text: this.supp_st_dump[supp].Author });
              }
              for (let block of this.supp_st_dump[supp].Context) {
                if (this.is_image(block)) {
                  this.pdf_dump.content.push({ margin: [0, 0, 0, 10], alignment: 'center', image: block, fit: [400, 250] });
                }
                else {
                  this.pdf_dump.content.push({ margin: [0, 0, 0, 10], italics: true, alignment: 'center', text: block });
                }
              }
              for (let block of this.supp_st_dump[supp].Content) {
                if (this.is_image(block[1])) {
                  this.pdf_dump.content.push({ unbreakable: true, columns: [{ width: 25, fontSize: 14, characterSpacing: 0, bold: true, text: '' }, { margin: [0, 0, 0, 10], alignment: 'center', image: block[1], fit: [400, 250] }] });
                }
                else if (block[1].startsWith(':box:')) {
                  this.pdf_dump.content.push({ unbreakable: true, columns: [{ width: 25, fontSize: 14, characterSpacing: 0, bold: true, text: '' }, { margin: [0, 0, 40, 10], alignment: 'left', table: { widths: ['auto'], heights: ['auto'], body: [[block[1].slice(5)]] }, layout: { paddingRight: function (i: any, node: any) { return 20; }, paddingLeft: function (i: any, node: any) { return 20; }, paddingTop: function (i: any, node: any) { return 10; }, paddingBottom: function (i: any, node: any) { return 10; } } }] });
                }
                else if (block[1].startsWith(':ibox:')) {
                  this.pdf_dump.content.push({ unbreakable: true, columns: [{ width: 25, fontSize: 14, characterSpacing: 0, bold: true, text: '' }, { margin: [0, 0, 40, 10], alignment: 'left', table: { widths: ['auto'], heights: ['auto'], body: [[{ text: block[1].slice(6), border: [false, false, false, false] }]] }, layout: { paddingRight: function (i: any, node: any) { return 20; }, paddingLeft: function (i: any, node: any) { return 20; }, paddingTop: function (i: any, node: any) { return 10; }, paddingBottom: function (i: any, node: any) { return 10; } } }] });
                }
                else {
                  if (block[0] == '') {
                    this.pdf_dump.content.push({ unbreakable: true, columns: [{ width: 25, fontSize: 14, characterSpacing: 0, bold: true, text: '' }, { margin: [0, 0, 0, 10], fontSize: 12.5, characterSpacing: 0, bold: true, alignment: 'center', text: block[1] }] });
                  }
                  else {
                    this.pdf_dump.content.push({ unbreakable: true, columns: [{ width: 25, fontSize: 14, characterSpacing: 0, bold: true, text: block[0] }, { margin: [0, 0, 0, 10], fontSize: 12.5, characterSpacing: 0, text: block[1] }] });
                  }
                }
              }
              this.pdf_dump.content.push('\n\n\n');
            }
            this.pdf_dump.content.push({ table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } });
            this.pdf_dump.content.push('\n\n\n');
            var prob_pdf_dump = JSON.parse(JSON.stringify(this.default_problem_pdf));
            prob_pdf_dump.columns.push({ width: 35, fontSize: 18, bold: true, text: '' + key });
            var prob_pdf_content: any[] = [];
            for (let cont of (prob as any).Content) {
              if (this.is_image(cont)) {
                prob_pdf_content.push({ margin: [0, 0, 20, 10], alignment: 'center', image: cont, fit: [400, 250] });
              }
              else if (cont.startsWith(':box:')) {
                prob_pdf_content.push({ margin: [0, 0, 40, 10], unbreakable: true, alignment: 'left', table: { widths: ['auto'], heights: ['auto'], body: [[{ lineHeight: 1.25, text: cont.slice(5) }]] }, layout: { paddingRight: function (i: any, node: any) { return 20; }, paddingLeft: function (i: any, node: any) { return 20; }, paddingTop: function (i: any, node: any) { return 10; }, paddingBottom: function (i: any, node: any) { return 10; } } });
              }
              else if (cont.startsWith(':ibox:')) {
                prob_pdf_content.push({ margin: [0, 0, 40, 10], unbreakable: true, alignment: 'left', table: { widths: ['auto'], heights: ['auto'], body: [[{ lineHeight: 1.25, text: cont.slice(6), border: [false, false, false, false] }]] }, layout: { paddingRight: function (i: any, node: any) { return 20; }, paddingLeft: function (i: any, node: any) { return 20; }, paddingTop: function (i: any, node: any) { return 10; }, paddingBottom: function (i: any, node: any) { return 10; } } });
              }
              else {
                prob_pdf_content.push({ margin: [0, 0, 0, 10], unbreakable: true, text: cont });
              }
            }
            if ((prob as any).Type == 'FR') {
              prob_pdf_content.push('\n');
              prob_pdf_content.push({ unbreakable: true, columns: [{ width: '*', text: '' }, { width: 250, margin: [0, 0, 40, 5], alignment: 'center', table: { widths: ['*'], heights: [50], body: [[{ margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } }, { width: '*', text: '' }] });
            }
            else if ((prob as any).Type == 'SR') {
              prob_pdf_content.push('\n');
              prob_pdf_content.push({ margin: [0, 0, 40, 5], unbreakable: true, alignment: 'center', table: { widths: ['*'], heights: ['auto'], body: [[{ margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } });
            }
            else if ((prob as any).Type == 'MR') {
              prob_pdf_content.push('\n');
              prob_pdf_content.push({ margin: [0, 0, 40, 5], unbreakable: true, alignment: 'center', table: { widths: ['*'], heights: ['auto'], body: [[{ border: [true, true, true, false], margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, true], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } });
            }
            else if ((prob as any).Type == 'LR') {
              prob_pdf_content.push('\n');
              prob_pdf_content.push({ margin: [0, 0, 40, 5], unbreakable: true, alignment: 'center', table: { widths: ['*'], heights: ['auto'], body: [[{ border: [true, true, true, false], margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, true], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } });
            }
            else if ((prob as any).Type == 'MP') {
              for (let part of Object.keys((prob as any).Parts)) {
                prob_pdf_content.push('\n');
                prob_pdf_content.push({ margin: [0, 10, 40, 15], fontSize: 16, bold: true, italics: true, alignment: 'center', text: 'Part ' + part });
                for (let cont of (prob as any).Parts[part].Content) {
                  if (this.is_image(cont)) {
                    prob_pdf_content.push({ margin: [0, 0, 20, 10], alignment: 'center', image: cont, fit: [400, 250] });
                  }
                  else if (cont.startsWith(':box:')) {
                    prob_pdf_content.push({ margin: [0, 0, 40, 10], unbreakable: true, alignment: 'left', table: { widths: ['auto'], heights: ['auto'], body: [[{ lineHeight: 1.25, text: cont.slice(5) }]] }, layout: { paddingRight: function (i: any, node: any) { return 20; }, paddingLeft: function (i: any, node: any) { return 20; }, paddingTop: function (i: any, node: any) { return 10; }, paddingBottom: function (i: any, node: any) { return 10; } } });
                  }
                  else if (cont.startsWith(':ibox:')) {
                    prob_pdf_content.push({ margin: [0, 0, 40, 10], unbreakable: true, alignment: 'left', table: { widths: ['auto'], heights: ['auto'], body: [[{ lineHeight: 1.25, text: cont.slice(6), border: [false, false, false, false] }]] }, layout: { paddingRight: function (i: any, node: any) { return 20; }, paddingLeft: function (i: any, node: any) { return 20; }, paddingTop: function (i: any, node: any) { return 10; }, paddingBottom: function (i: any, node: any) { return 10; } } });
                  }
                  else {
                    prob_pdf_content.push({ margin: [0, 0, 0, 10], unbreakable: true, text: cont });
                  }
                }
                prob_pdf_content.push('\n');
                if ((prob as any).Parts[part].Type == 'FR') {
                  prob_pdf_content.push({ unbreakable: true, columns: [{ width: '*', text: '' }, { width: 250, margin: [0, 0, 40, 5], alignment: 'center', table: { widths: ['*'], heights: [50], body: [[{ margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } }, { width: '*', text: '' }] });
                }
                else if ((prob as any).Parts[part].Type == 'SR') {
                  prob_pdf_content.push({ margin: [0, 0, 40, 5], unbreakable: true, alignment: 'center', table: { widths: ['*'], heights: ['auto'], body: [[{ margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } });
                }
                else if ((prob as any).Parts[part].Type == 'MR') {
                  prob_pdf_content.push({ margin: [0, 0, 40, 5], unbreakable: true, alignment: 'center', table: { widths: ['*'], heights: ['auto'], body: [[{ border: [true, true, true, false], margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, true], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } });
                }
                else if ((prob as any).Parts[part].Type == 'LR') {
                  prob_pdf_content.push('\n');
                  prob_pdf_content.push({ margin: [0, 0, 40, 5], unbreakable: true, alignment: 'center', table: { widths: ['*'], heights: ['auto'], body: [[{ border: [true, true, true, false], margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, true], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } });
                }
                else {
                  var choice_num = 1;
                  var column1: any[] = [];
                  var column2: any[] = [];
                  for (let choice of Object.keys((prob as any).Parts[part].AnswerChoices)) {
                    var choice_pdf_dump = JSON.parse(JSON.stringify(this.default_problem_pdf));
                    choice_pdf_dump.unbreakable = true;
                    choice_pdf_dump.columns.push({ width: 20, fontSize: 16, bold: true, text: choice });
                    if (this.is_image((prob as any).Parts[part].AnswerChoices[choice].Choice)) {
                      choice_pdf_dump.columns.push({ margin: [0, 0, 0, 10], alignment: 'center', image: (prob as any).Parts[part].AnswerChoices[choice].Choice, fit: [200, 125] });
                    }
                    else {
                      choice_pdf_dump.columns.push({ margin: [0, 0, 0, 10], text: (prob as any).Parts[part].AnswerChoices[choice].Choice });
                    }
                    if (choice_num % 2 == 1) {
                      column1.push(choice_pdf_dump);
                    }
                    else {
                      column2.push(choice_pdf_dump);
                    }
                    choice_num += 1;
                  }
                  prob_pdf_content.push({ columns: [column1, column2] });
                }
              }
            }
            else {
              var choice_num = 1;
              var column1: any[] = [];
              var column2: any[] = [];
              prob_pdf_content.push('\n');
              for (let choice of Object.keys((prob as any).AnswerChoices)) {
                var choice_pdf_dump = JSON.parse(JSON.stringify(this.default_problem_pdf));
                choice_pdf_dump.unbreakable = true;
                choice_pdf_dump.columns.push({ width: 20, fontSize: 16, bold: true, text: choice });
                if (this.is_image((prob as any).AnswerChoices[choice].Choice)) {
                  choice_pdf_dump.columns.push({ margin: [0, 0, 0, 10], alignment: 'center', image: (prob as any).AnswerChoices[choice].Choice, fit: [200, 125] });
                }
                else {
                  choice_pdf_dump.columns.push({ margin: [0, 0, 0, 10], text: (prob as any).AnswerChoices[choice].Choice });
                }
                if (choice_num % 2 == 1) {
                  column1.push(choice_pdf_dump);
                }
                else {
                  column2.push(choice_pdf_dump);
                }
                choice_num += 1;
              }
              prob_pdf_content.push({ columns: [column1, column2] });
            }
            prob_pdf_dump.columns.push(prob_pdf_content);
            this.pdf_dump.content.push(prob_pdf_dump);
            this.pdf_dump.content.push('\n\n\n');
          }
        }
        this.pdf_dump.content.push({ fontSize: 18, bold: true, alignment: 'center', pageBreak: 'before', text: 'Answer Key\n\n' });
        // var key_pdf_dump: any = { style: "tableExample", table: { body: [[{ text: '', style: 'tableHeader' }, { text: 'Answer', style: 'tableHeader' }, { text: 'Subtopic', style: 'tableHeader' }]] }, layout: { fillColor: function (rowIndex: any, node: any, columnIndex: any) { return (rowIndex % 2 === 0) ? '#EEEEEE' : null; } } };
        var key_pdf_dump: any = { style: "tableExample", table: { body: [[{ text: '', style: 'tableHeader' }, { text: 'Answer', style: 'tableHeader' }, { text: 'Explanation', style: 'tableHeader' }, { text: 'Subtopic', style: 'tableHeader' }]], dontBreakRows: true }, layout: { fillColor: function (rowIndex: any, node: any, columnIndex: any) { return (rowIndex % 2 === 0) ? '#EEEEEE' : null; } } };
        for (const [key, prob] of Object.entries(this.subtopic_search_dump)) {
          var answer: string = '';
          var rationale: string = '';
          if ((prob as any).Type != 'FR') {
            for (const [ch, choice] of Object.entries((prob as any).AnswerChoices)) {
              if ((choice as any).Key.Correct) {
                if (answer.length > 0) {
                  answer += ', ';
                }
                answer += '' + ch;
                rationale = '' + (choice as any).Key.Rationale;
              }
            }
          }
          else {
            answer = '' + (prob as any).AnswerChoices['KEY'].Choice;
            rationale = '' + (prob as any).AnswerChoices['KEY'].Key.Rationale;
          }
          // key_pdf_dump.table.body.push([ { bold: true, text: ''+key }, { bold: true, lineHeight: 0.9, alignment: 'center', text: answer }, { fontSize: 12, lineHeight: 0.9, text: ((prob as any).SubTopics[0] as string) }]);
          key_pdf_dump.table.body.push([{ bold: true, text: '' + key }, { bold: true, lineHeight: 0.9, alignment: 'center', text: answer }, { fontSize: 12, lineHeight: 0.9, text: rationale }, { fontSize: 12, lineHeight: 0.9, text: ((prob as any).SubTopics[0] as string) }]);
        }
        this.pdf_dump.content.push(key_pdf_dump);
      }, 500);
      setTimeout(() => {
        console.log(this.pdf_dump);
        pdfMake.createPdf(this.pdf_dump, undefined, this.fonts).getDataUrl((dataUrl) => {
          this.file_source = dataUrl;
        });
      }, 1250);
    }, 250);
  }

  toggle_favorite_exm() {
    this.favorite_exm_set = [];
    for (let exm of this.authService.userData.exams.favorites) {
      this.favorite_exm_set.push(exm as string);
    }
    if (this.favorite_exm_set.includes(this.exam_id)) {
      if (this.favorite_exm_set.indexOf(this.exam_id) != -1) {
        this.favorite_exm_set.splice(this.favorite_exm_set.indexOf(this.exam_id), 1);
      }
      else {
        this.favorite_exm_set.pop()
      }
    }
    else {
      this.favorite_exm_set.push(this.exam_id);
    }
    this.authService.UpdateUserData({ 'exams/favorites': {} });
    this.authService.UpdateUserData({ 'exams/favorites': this.favorite_exm_set });
    this.exam_fav = !this.exam_fav;
  }

  assert_favorite_exm() {
    this.favorite_exm_set = [];
    for (let exm of this.authService.userData.exams.favorites) {
      this.favorite_exm_set.push(exm as string);
    }
    if (!this.favorite_exm_set.includes(this.exam_id)) {
      this.favorite_exm_set.push(this.exam_id);
    }
    this.authService.UpdateUserData({ 'exams/favorites': {} });
    this.authService.UpdateUserData({ 'exams/favorites': this.favorite_exm_set });
    this.exam_fav = true;
  }

  download_exam() {
    const link = document.createElement('a');
    // const exam_ref = 'exams/' + this.exam_id + '/downloads';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.file_source);
    link.setAttribute('download', this.exam_name);
    document.body.appendChild(link);
    link.click();
    link.remove();
    // if (this.exam_dl == 0) {
    //   this.authService.UpdateDatabase({exam_ref: 1});
    // }
    // else {
    //   this.authService.UpdateDatabase({exam_ref: this.exam_dl + 1});
    // }
    this.assert_favorite_exm();
  }

  print_exam() {
    printJS({ printable: this.file_source, type: 'pdf', showModal: true });
    this.assert_favorite_exm();
  }

  download_quiz() {
    const link = document.createElement('a');
    // const exam_ref: string = 'exams/' + this.exam_id + '/downloads';
    // console.log(exam_ref);
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.file_source);
    link.setAttribute('download', 'MoreProblems Practice Worksheet');
    document.body.appendChild(link);
    link.click();
    link.remove();
    // this.edit_e_list[exam_ref] = this.exam_dl + 1;
    // this.authService.UpdateDatabase({ exam_ref: {} });
    // this.authService.UpdateDatabase(this.edit_e_list);
    // this.edit_e_list = {};
    // this.assert_favorite();
    // this.exam_dl = (this.authService.searchExamId(this.exam_id)).downloads;
    // setTimeout(() => {
    //   this.exam_dl = (this.authService.searchExamId(this.exam_id)).downloads;
    // }, 250);
  }

  print_quiz() {
    printJS({ printable: this.file_source, documentTitle: 'MoreProblems Practice Worksheet', type: 'pdf', showModal: true });
    // this.assert_favorite();
  }

  take_exam() {
    this.assert_favorite_exm();
    this.router.navigateByUrl(this.exam_url);
  }

  prev_page() {
    this.file_page = Math.max(1, this.file_page - 1);
  }

  next_page() {
    this.file_page = this.file_page + 1;
  }

  go_to_page(num: number) {
    this.file_page = num;
  }

  zoom_out() {
    this.file_zoom = Math.max(75, this.file_zoom - 5);
  }

  zoom_in() {
    this.file_zoom = Math.min(125, this.file_zoom + 5);
  }

  zoom_out_r() {
      this.ref_zoom = Math.max(75, this.ref_zoom - 5);
  }

  zoom_in_r() {
      this.ref_zoom = Math.min(125, this.ref_zoom + 5);
  }

  toggle_add_students() {
    this.class_data = (this.authService.searchClassId(this.class_uid) as any);
    if (!this.add_s) {
      this.my_students = [];
      this.all_students = [];
      const linked_students = this.authService.userData.students.slice(1);
      for (const [key, stud] of Object.entries(linked_students)) {
        const student_data = this.authService.searchUserId(stud as string);
        setTimeout(() => {
          this.all_students.push(stud as string);
          if (student_data != null) {
            this.all_students_data[(stud as string)] = (student_data as object);
          }
          if ((stud as string).includes(this.authService.userData.uid as string)) {
            this.my_students.push(stud as string);
            if (student_data != null) {
              this.my_students_data[(stud as string)] = (student_data as object);
            }
          }
        }, +key * 10);
      }
    }
    this.add_s = !this.add_s;
    // this.edit_c_list = [];
  }

  toggle_new_student(stud: string) {
    if (!this.new_students.includes(stud)) {
      this.new_students.push(stud);
    }
    else {
      if (this.new_students.indexOf(stud) != -1) {
        this.new_students.splice(this.new_students.indexOf(stud), 1);
      }
      else {
        this.new_students.pop()
      }
    }
  }

  add_students() {
    this.class_stud_set = [];
    var stud_class_sets: any = {};
    this.edit_c_list = {};
    const class_stud_ref = 'classes/' + this.class_uid + '/students';
    for (let stud of this.authService.userData.students) {
      console.log(this.authService.searchUserId(stud as string).classes);
      if (this.class_data.students.includes(stud as string)) {
        this.class_stud_set.push(stud as string);
      }
      stud_class_sets[stud] = this.authService.searchUserId(stud as string).classes;
    }
    for (let stud of this.new_students) {
      if (!this.class_stud_set.includes(stud)) {
        this.class_stud_set.push(stud);
      }
      if (!stud_class_sets[stud].includes(this.class_uid)) {
        stud_class_sets[stud].push(this.class_uid);
        const stud_class_ref = 'users/' + stud + '/classes';
        this.edit_c_list[stud_class_ref] = stud_class_sets[stud];
        this.authService.UpdateDatabase({ class_stud_ref: {} });
      }
    }
    this.edit_c_list[class_stud_ref] = this.class_stud_set;
    this.authService.UpdateDatabase({ class_stud_ref: {} });
    this.authService.UpdateDatabase(this.edit_c_list);
    location.reload();
  }

  student_action(act: string, stud: string) {
    if (act == 'results') {
      this.student_results(stud);
    }
    else if (act == 'remove') {
      this.remove_student(stud);
    }
  }

  student_results(stud: string) {
    this.selected_stud_results = stud;
    this.grade_breakdown = {};
    this.subject_breakdown_top = {};
    this.subject_breakdown_subtop = {};
    this.topic_breakdown = {};
    this.student_sub_metadata = {};
    this.student_data = this.authService.searchUserId(stud);
    this.student_sub_metadata = this.getStudClassSubmissions(stud);
    setTimeout(() => {
      this.student_data = this.authService.searchUserId(stud);
      this.student_sub_metadata = this.getStudClassSubmissions(stud);
      this.subject_break_stud(stud);
      if (this.class_total_problems == 0) {
        this.total_percent_correct = 0;
      }
      else {
        this.total_percent_correct = Math.round(10000 * this.class_correct_problems / this.class_total_problems) / 100;
      }
      this.complete_exam_count = 0;
      this.complete_exam_list = [];
      var temp_count = 1;
      // const exam_history = this.student_data.exams.history;
      for (const [key, det] of Object.entries(this.student_sub_metadata)) {
        setTimeout(() => {
          if ((det as any).endtimestamp != undefined) {
            this.complete_exam_count = this.complete_exam_count + 1;
            this.complete_exam_list.push(key);
            this.student_sub_metadata[key].enddate = new Date(this.student_sub_metadata[key].endtimestamp).toLocaleDateString();
            this.student_sub_metadata[key].endtime = new Date(this.student_sub_metadata[key].endtimestamp).toLocaleTimeString();
          }
        }, temp_count * 50);
        temp_count += 1;
      }
      this.stud_results_loaded = true;
      this.plot_student_results();
    }, 500);
  }

  getStudClassSubmissions(stud: string) {
    var exam_submissions: any = {};
    for (const [exm, studs] of Object.entries(this.class_data.history.exams)) {
      for (let std of Object.keys(studs as any)) {
        if (std == stud) {
          exam_submissions[exm] = (this.authService.getStudExamSubmission2(stud, exm) as any);
        }
      }
    }
    return (exam_submissions);
  }

  plot_class_student_results() {
    setTimeout(() => {
      console.log('Plotting My Student Results');
      console.log(this.class_student_metadata);
      var classStudPlot: any = document.getElementById('classStudPlot');
      var ids: string[] = [];
      var studs: string[] = [];
      var names: string[] = [];
      var scores: number[] = [];
      var correct_probs: number[] = [];
      var total_probs: number[] = [];
      var dates: Date[] = [];
      var times: string[] = [];
      var stud_exams: any[] = [];
      for (let dump of this.class_student_metadata) {
        for (let exam of Object.values((dump as any).subs)) {
          if (exam != undefined && (exam as any).endtimestamp != undefined) {
            var comp_exam: any = exam;
            comp_exam.stud = (dump as any).uid;
            stud_exams.push(comp_exam);
          }
        }
      }
      stud_exams.sort((a, b) => {
        if (a.endtimestamp < b.endtimestamp) {
          return -1;
        }
        if (a.endtimestamp > b.endtimestamp) {
          return 1;
        }
        return 0;
      });
      for (let exm of stud_exams) {
        ids.push(exm.id);
        studs.push(this.authService.searchUserId(exm.stud).displayName);
        names.push((exm.id.startsWith('Q-')) ? this.authService.searchQuizId(exm.id.slice(2)).name : this.dumpService.exam_names[exm.id]);
        scores.push(exm.score);
        correct_probs.push(exm.correct);
        total_probs.push(exm.total);
        dates.push(new Date(exm.endtimestamp));
        times.push(exm.time);
      }
      const backs = ['rgba(83, 148, 253, 1.0)', 'rgba(240, 128, 119, 1.0)', 'rgba(118, 194, 138, 1.0)', 'rgba(252, 163, 101, 1.0)', 'rgba(189, 127, 247, 1.0)', 'rgba(253, 208, 88, 1.0)', 'rgba(109, 171, 247, 1.0)', 'rgba(255, 128, 196, 1.0)'];
      const bords = ['rgba(83, 148, 253, 0.25)', 'rgba(240, 128, 119, 0.25)', 'rgba(118, 194, 138, 0.25)', 'rgba(252, 163, 101, 0.25)', 'rgba(189, 127, 247, 0.25)', 'rgba(253, 208, 88, 0.25)', 'rgba(109, 171, 247, 0.25)', 'rgba(255, 128, 196, 0.25)'];
      const hoverInfo: any = [ids, studs, names, correct_probs, total_probs, times];
      var datasets: any[] = [];
      var count = 0;
      for (let stud of Object.values(this.class_student_metadata)) {
        var stud_scores = [];
        for (let exam of stud_exams) {
          console.log(exam.stud);
          console.log((stud as any).uid);
          if (exam.stud == (stud as any).uid) {
            stud_scores.push(exam.score);
          }
          else {
            stud_scores.push(null);
          }
        }
        var dataset = {
          label: " Grade",
          backgroundColor: backs[count],
          borderColor: bords[count],
          borderWidth: 5,
          pointRadius: 4,
          pointHoverRadius: 8,
          data: stud_scores,
          tension: 0.05,
          spanGaps: true
        }
        datasets.push(dataset);
        count += 1;
      }
      console.log(dates);
      console.log(datasets);
      var data = {
        labels: dates,
        datasets: datasets
      };

      new Chart.Chart(classStudPlot, {
        type: 'line',
        data: data,
        options: {
          maintainAspectRatio: false,
          aspectRatio: 16 / 9,
          plugins: {
            title: {
              display: true,
              text: 'Class Submissions Over Time',
              font: {
                size: 20
              }
            },
            tooltip: {
              padding: 16,
              boxPadding: 16,
              titleFont: {
                size: 16
              },
              bodyFont: {
                size: 15
              },
              callbacks: {
                title: function (context) {
                  return ([`${hoverInfo[2][context[0].dataIndex]}`, `(${context[0].label})`, ``]);
                },
                label: function (context) {
                  return ([`Student: ${hoverInfo[1][context.dataIndex]}`, `${(hoverInfo[0][context.dataIndex].startsWith('Q-')) ? 'Quiz' : 'Exam'}${context.dataset.label}: ${context.parsed.y}%`, `Problems: ${hoverInfo[3][context.dataIndex]} / ${hoverInfo[4][context.dataIndex]}`, `Time: ${hoverInfo[5][context.dataIndex]}`]);
                }
              }
            },
            legend: { display: false }
          },
          scales: {
            x: {
              type: 'time',
            }
          },
        }
      });
    }, 250);
  }

  plot_student_results() {
    setTimeout(() => {
      console.log('Plotting Student Results');
      console.log(this.student_sub_metadata);
      var studPlot: any = document.getElementById('studPlot');
      var ids: string[] = [];
      var names: string[] = [];
      var scores: number[] = [];
      var correct_probs: number[] = [];
      var total_probs: number[] = [];
      var dates: Date[] = [];
      var times: string[] = [];
      var stud_subs: any[] = [];
      for (let exm of this.complete_exam_list) {
        stud_subs.push(this.student_sub_metadata[exm]);
      }
      stud_subs.sort((a, b) => {
        if (a.endtimestamp < b.endtimestamp) {
          return -1;
        }
        if (a.endtimestamp > b.endtimestamp) {
          return 1;
        }
        return 0;
      });
      for (let exm of stud_subs) {
        ids.push(exm.id);
        names.push((exm.id.startsWith('Q-')) ? this.authService.searchQuizId(exm.id.slice(2)).name : this.dumpService.exam_names[exm.id]);
        scores.push(exm.score);
        correct_probs.push(exm.correct);
        total_probs.push(exm.total);
        dates.push(new Date(exm.endtimestamp));
        times.push(exm.time);
      }
      const hoverInfo: any = [ids, names, correct_probs, total_probs, times]
      var data = {
        labels: dates,
        datasets: [{
          label: " Grade",
          backgroundColor: "rgba(83, 148, 253, 1.0)",
          borderColor: "rgba(83, 148, 253, 0.25)",
          borderWidth: 5,
          pointRadius: 4,
          pointHoverRadius: 8,
          data: scores,
          tension: 0.05,
        }]
      };

      new Chart.Chart(studPlot, {
        type: 'line',
        data: data,
        options: {
          maintainAspectRatio: false,
          aspectRatio: 16 / 9,
          plugins: {
            title: {
              display: true,
              text: 'Student Submissions Over Time',
              font: {
                size: 20
              }
            },
            tooltip: {
              padding: 16,
              boxPadding: 16,
              titleFont: {
                size: 16
              },
              bodyFont: {
                size: 15
              },
              callbacks: {
                title: function (context) {
                  return ([`${hoverInfo[1][context[0].dataIndex]}`, `(${context[0].label})`, ``]);
                },
                label: function (context) {
                  // Customize the label text here
                  // let label = (hoverInfo[0][context.dataIndex].startsWith('Q-')) ? 'Quiz' : 'Exam' + context.dataset.label + ': ' + context.parsed.y + '%' + `\n` + 'Total Problems: ' + hoverInfo[3][context.dataIndex] + `\n` + 'Correct Problems: ' + hoverInfo[2][context.dataIndex] + `\n` + 'Time: ' + hoverInfo[4][context.dataIndex];
                  return ([`${(hoverInfo[0][context.dataIndex].startsWith('Q-')) ? 'Quiz' : 'Exam'}${context.dataset.label}: ${context.parsed.y}%`, `Problems: ${hoverInfo[2][context.dataIndex]} / ${hoverInfo[3][context.dataIndex]}`, `Time: ${hoverInfo[4][context.dataIndex]}`]);
                }
              }
            },
            legend: { display: false }
          },
          scales: {
            x: {
              type: 'time',
              // time: {
              //     displayFormats: {
              //         day: 'MMM DD, YYYY'
              //     }
              // }
            }
          },
        }
      });
    }, 250);
  }

  plot_exam_results() {
    setTimeout(() => {
      console.log('Plotting Exam Results');
      console.log(this.exam_sub_metadata);
      var examPlot: any = document.getElementById('examPlot');
      var ids: string[] = [];
      var names: string[] = [];
      var scores: number[] = [];
      var correct_probs: number[] = [];
      var total_probs: number[] = [];
      var dates: Date[] = [];
      var times: string[] = [];
      var exam_subs: any[] = [];
      for (let exm of this.complete_exam_list) {
        exam_subs.push(this.exam_sub_metadata[exm]);
      }
      exam_subs.sort((a, b) => {
        if (a.endtimestamp < b.endtimestamp) {
          return -1;
        }
        if (a.endtimestamp > b.endtimestamp) {
          return 1;
        }
        return 0;
      });
      for (let exm of this.complete_exam_list) {
        ids.push(exam_subs[this.complete_exam_list.indexOf(exm)].id);
        names.push(this.authService.searchUserId(exm).displayName);
        scores.push(exam_subs[this.complete_exam_list.indexOf(exm)].score);
        correct_probs.push(exam_subs[this.complete_exam_list.indexOf(exm)].correct);
        total_probs.push(exam_subs[this.complete_exam_list.indexOf(exm)].total);
        dates.push(new Date(exam_subs[this.complete_exam_list.indexOf(exm)].endtimestamp));
        times.push(exam_subs[this.complete_exam_list.indexOf(exm)].time);
      }
      const hoverInfo: any = [ids, names, correct_probs, total_probs, times]
      var data = {
        labels: dates,
        datasets: [{
          label: " Grade",
          backgroundColor: "rgba(83, 148, 253, 1.0)",
          borderColor: "rgba(83, 148, 253, 0.25)",
          borderWidth: 5,
          pointRadius: 4,
          pointHoverRadius: 8,
          data: scores,
          tension: 0.05,
        }]
      };

      new Chart.Chart(examPlot, {
        type: 'line',
        data: data,
        options: {
          maintainAspectRatio: false,
          aspectRatio: 16 / 9,
          plugins: {
            title: {
              display: true,
              text: 'Exam Submissions Over Time',
              font: {
                size: 20
              }
            },
            tooltip: {
              padding: 16,
              boxPadding: 16,
              titleFont: {
                size: 16
              },
              bodyFont: {
                size: 15
              },
              callbacks: {
                title: function (context) {
                  return ([`${hoverInfo[1][context[0].dataIndex]}'s Submission`, `(${context[0].label})`, ``]);
                },
                label: function (context) {
                  // Customize the label text here
                  // let label = (hoverInfo[0][context.dataIndex].startsWith('Q-')) ? 'Quiz' : 'Exam' + context.dataset.label + ': ' + context.parsed.y + '%' + `\n` + 'Total Problems: ' + hoverInfo[3][context.dataIndex] + `\n` + 'Correct Problems: ' + hoverInfo[2][context.dataIndex] + `\n` + 'Time: ' + hoverInfo[4][context.dataIndex];
                  return ([`${(hoverInfo[0][context.dataIndex].startsWith('Q-')) ? 'Quiz' : 'Exam'}${context.dataset.label}: ${context.parsed.y}%`, `Problems: ${hoverInfo[2][context.dataIndex]} / ${hoverInfo[3][context.dataIndex]}`, `Time: ${hoverInfo[4][context.dataIndex]}`]);
                }
              }
            },
            legend: { display: false }
          },
          scales: {
            x: {
              type: 'time',
              // time: {
              //     displayFormats: {
              //         day: 'MMM DD, YYYY'
              //     }
              // }
            }
          },
        }
      });
    }, 250);
  }

  plot_quiz_results() {
    setTimeout(() => {
      console.log('Plotting Quiz Results');
      console.log(this.quiz_sub_metadata);
      var quizPlot: any = document.getElementById('quizPlot');
      var ids: string[] = [];
      var names: string[] = [];
      var scores: number[] = [];
      var correct_probs: number[] = [];
      var total_probs: number[] = [];
      var dates: Date[] = [];
      var times: string[] = [];
      var quiz_subs: any[] = [];
      for (let quiz of this.complete_exam_list) {
        quiz_subs.push(this.quiz_sub_metadata[quiz]);
      }
      quiz_subs.sort((a, b) => {
        if (a.endtimestamp < b.endtimestamp) {
          return -1;
        }
        if (a.endtimestamp > b.endtimestamp) {
          return 1;
        }
        return 0;
      });
      for (let quiz of this.complete_exam_list) {
        ids.push(quiz_subs[this.complete_exam_list.indexOf(quiz)].id);
        names.push(this.authService.searchUserId(quiz).displayName);
        scores.push(quiz_subs[this.complete_exam_list.indexOf(quiz)].score);
        correct_probs.push(quiz_subs[this.complete_exam_list.indexOf(quiz)].correct);
        total_probs.push(quiz_subs[this.complete_exam_list.indexOf(quiz)].total);
        dates.push(new Date(quiz_subs[this.complete_exam_list.indexOf(quiz)].endtimestamp));
        times.push(quiz_subs[this.complete_exam_list.indexOf(quiz)].time);
      }
      const hoverInfo: any = [ids, names, correct_probs, total_probs, times]
      var data = {
        labels: dates,
        datasets: [{
          label: " Grade",
          backgroundColor: "rgba(83, 148, 253, 1.0)",
          borderColor: "rgba(83, 148, 253, 0.25)",
          borderWidth: 5,
          pointRadius: 4,
          pointHoverRadius: 8,
          data: scores,
          tension: 0.05,
        }]
      };

      new Chart.Chart(quizPlot, {
        type: 'line',
        data: data,
        options: {
          maintainAspectRatio: false,
          aspectRatio: 16 / 9,
          plugins: {
            title: {
              display: true,
              text: 'Quiz Submissions Over Time',
              font: {
                size: 20
              }
            },
            tooltip: {
              padding: 16,
              boxPadding: 16,
              titleFont: {
                size: 16
              },
              bodyFont: {
                size: 15
              },
              callbacks: {
                title: function (context) {
                  return ([`${hoverInfo[1][context[0].dataIndex]}'s Submission`, `(${context[0].label})`, ``]);
                },
                label: function (context) {
                  // Customize the label text here
                  // let label = (hoverInfo[0][context.dataIndex].startsWith('Q-')) ? 'Quiz' : 'Exam' + context.dataset.label + ': ' + context.parsed.y + '%' + `\n` + 'Total Problems: ' + hoverInfo[3][context.dataIndex] + `\n` + 'Correct Problems: ' + hoverInfo[2][context.dataIndex] + `\n` + 'Time: ' + hoverInfo[4][context.dataIndex];
                  return ([`${(hoverInfo[0][context.dataIndex].startsWith('Q-')) ? 'Quiz' : 'Exam'}${context.dataset.label}: ${context.parsed.y}%`, `Problems: ${hoverInfo[2][context.dataIndex]} / ${hoverInfo[3][context.dataIndex]}`, `Time: ${hoverInfo[4][context.dataIndex]}`]);
                }
              }
            },
            legend: { display: false }
          },
          scales: {
            x: {
              type: 'time',
              // time: {
              //     displayFormats: {
              //         day: 'MMM DD, YYYY'
              //     }
              // }
            }
          },
        }
      });
    }, 250);
  }

  subject_break_stud(stud: string) {
    this.grade_breakdown = {};
    this.total_test_time = "0h 0m 0s";
    var test_time = 0;
    this.complete_exam_count = 0;
    this.complete_exam_list = [];
    // const exam_history = this.student_data.exams.history;
    console.log(this.getStudClassSubmissions(stud));
    for (const [key, det] of Object.entries(this.getStudClassSubmissions(stud))) {
      var ass_test_time = 0;
      this.class_total_problems = 0;
      this.class_correct_problems = 0;
      if (this.getStudClassSubmissions(stud)[key] != undefined && (det as any).endtimestamp != undefined) {
        this.complete_exam_count = this.complete_exam_count + 1;
        this.complete_exam_list.push(key);
      }
      console.log(key);
      console.log(det);
      if (key.startsWith('Q-')) {
        this.quiz_config = (this.authService.searchQuizId(key.slice(2)) as any);
        console.log(this.quiz_config);
      }
      if (key.startsWith('Q-') && this.quiz_config.problems != undefined && this.getStudClassSubmissions(stud)[key] != undefined) {
        console.log('custom quiz');
        this.class_total_problems = Object.keys(this.getStudClassSubmissions(stud)[key].problems).length;
        for (const [id, prob] of Object.entries(this.getStudClassSubmissions(stud)[key].problems)) {
          console.log('Problem ID: ' + '' + id);
          console.log(prob);
          console.log(this.quiz_config.grades[0]);
          console.log(this.quiz_config.subjects[0]);
          test_time += +(prob as any).Seconds;
          ass_test_time += +(prob as any).Seconds;
          if ((prob as any).Correct != undefined && (prob as any).Correct.length > 0 && (prob as any).Correct[0][0] == '✅') {
            this.class_correct_problems += 1;
            if (Object.keys(this.grade_breakdown).includes(this.quiz_config.grades[0])) {
              this.grade_breakdown[this.quiz_config.grades[0]].Total += 1;
              this.grade_breakdown[this.quiz_config.grades[0]].Correct += 1;
              this.grade_breakdown[this.quiz_config.grades[0]].Seconds += +(prob as any).Seconds;
              if (Object.keys(this.grade_breakdown[this.quiz_config.grades[0]].Subs).includes(this.quiz_config.subjects[0])) {
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Total += 1;
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Correct += 1;
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Seconds += +(prob as any).Seconds;
                // if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
                for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                  if (Object.keys(this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops).includes((prob as any).Topics[n])) {
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].Total += 1;
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].Correct += 1;
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].Seconds += +(prob as any).Seconds;
                  }
                  else {
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                  }
                  if (Object.keys(this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops).includes((prob as any).SubTopics[n])) {
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Total += 1;
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Correct += 1;
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Seconds += +(prob as any).Seconds;
                  }
                  else {
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                  }
                  // }
                }
              }
              else {
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} };
                // if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
                for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                  this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                  this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                }
                // }
              }
            }
            else {
              this.grade_breakdown[this.quiz_config.grades[0]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': (prob as any).Seconds, 'Time': '0s', 'Subs': { [this.quiz_config.subjects[0]]: { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} } } };
              // if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
              for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
              }
              // }
            }
          }
          else {
            if (Object.keys(this.grade_breakdown).includes(this.quiz_config.grades[0])) {
              this.grade_breakdown[this.quiz_config.grades[0]].Total += 1;
              this.grade_breakdown[this.quiz_config.grades[0]].Incorrect += 1;
              this.grade_breakdown[this.quiz_config.grades[0]].Seconds += +(prob as any).Seconds;
              if (Object.keys(this.grade_breakdown[this.quiz_config.grades[0]].Subs).includes(this.quiz_config.subjects[0])) {
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Total += 1;
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Incorrect += 1;
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Seconds += +(prob as any).Seconds;
                // if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
                for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                  if (Object.keys(this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops).includes((prob as any).Topics[n])) {
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].Total += 1;
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].Incorrect += 1;
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].Seconds += +(prob as any).Seconds;
                  }
                  else {
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                  }
                  if (Object.keys(this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops).includes((prob as any).SubTopics[n])) {
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Total += 1;
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Incorrect += 1;
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Seconds += +(prob as any).Seconds;
                  }
                  else {
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                  }
                }
                // }
              }
              else {
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} };
                // if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
                for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                  this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                  this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                }
                // }
              }
            }
            else {
              this.grade_breakdown[this.quiz_config.grades[0]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': (prob as any).Seconds, 'Time': '0s', 'Subs': { [this.quiz_config.subjects[0]]: { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} } } };
              // if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
              for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
              }
              // }
            }
          }
        }
      }
      else if (key.startsWith('Q-') && this.getStudClassSubmissions(stud)[key] != undefined) {
        this.class_total_problems = Object.keys(this.getStudClassSubmissions(stud)[key].problems).length;
        for (const [id, prob] of Object.entries(this.getStudClassSubmissions(stud)[key].problems)) {
          test_time += +(prob as any).Seconds;
          ass_test_time += +(prob as any).Seconds;
          if ((prob as any).Correct != undefined && (prob as any).Correct.length > 0 && (prob as any).Correct[0][0] == '✅') {
            this.class_correct_problems += 1;
            if (this.dumpService.exam_set.includes(id.substring(0, id.indexOf('-'))) && Object.keys(this.grade_breakdown).includes(this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade)) {
              this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Total += 1;
              this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Correct += 1;
              this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Seconds += +(prob as any).Seconds;
              if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs).includes(this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject)) {
                this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Total += 1;
                this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Correct += 1;
                this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Seconds += +(prob as any).Seconds;
                if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
                  for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                    if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops).includes((prob as any).Topics[n])) {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].Total += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].Correct += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].Seconds += +(prob as any).Seconds;
                    }
                    else {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                    }
                    if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops).includes((prob as any).SubTopics[n])) {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Total += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Correct += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Seconds += +(prob as any).Seconds;
                    }
                    else {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                    }
                  }
                }
              }
              else {
                this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} };
                if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
                  for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                    this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                    this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                  }
                }
              }
            }
            else if (this.dumpService.exam_set.includes(id.substring(0, id.indexOf('-')))) {
              this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': (prob as any).Seconds, 'Time': '0s', 'Subs': { [this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject]: { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} } } };
              if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
                for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                  this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                  this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                }
              }
            }
          }
          else {
            if (this.dumpService.exam_set.includes(id.substring(0, id.indexOf('-'))) && Object.keys(this.grade_breakdown).includes(this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade)) {
              this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Total += 1;
              this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Incorrect += 1;
              this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Seconds += +(prob as any).Seconds;
              if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs).includes(this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject)) {
                this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Total += 1;
                this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Incorrect += 1;
                this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Seconds += +(prob as any).Seconds;
                if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
                  for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                    if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops).includes((prob as any).Topics[n])) {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].Total += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].Incorrect += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].Seconds += +(prob as any).Seconds;
                    }
                    else {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                    }
                    if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops).includes((prob as any).SubTopics[n])) {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Total += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Incorrect += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Seconds += +(prob as any).Seconds;
                    }
                    else {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                    }
                  }
                }
              }
              else {
                this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} };
                if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
                  for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                    this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                    this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                  }
                }
              }
            }
            else if (this.dumpService.exam_set.includes(id.substring(0, id.indexOf('-')))) {
              this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': (prob as any).Seconds, 'Time': '0s', 'Subs': { [this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject]: { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} } } };
              if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
                for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                  this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                  this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                }
              }
            }
          }
        }
      }
      else if (this.getStudClassSubmissions(stud)[key] != undefined) {
        this.class_total_problems = Object.keys(this.getStudClassSubmissions(stud)[key].problems).length;
        for (const [id, prob] of Object.entries(this.getStudClassSubmissions(stud)[key].problems)) {
          test_time += +(prob as any).Seconds;
          ass_test_time += +(prob as any).Seconds;
          if ((prob as any).Correct != undefined && (prob as any).Correct.length > 0 && (prob as any).Correct[0][0] == '✅') {
            this.class_correct_problems += 1;
            if (Object.keys(this.grade_breakdown).includes(this.dumpService.exam_attribute_dump[key].Grade)) {
              this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Total += 1;
              this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Correct += 1;
              this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Seconds += +(prob as any).Seconds;
              if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs).includes(this.dumpService.exam_attribute_dump[key].Subject)) {
                this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Total += 1;
                this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Correct += 1;
                this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Seconds += +(prob as any).Seconds;
                if (!this.dumpService.exam_attribute_dump[key].HideTopics) {
                  for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                    if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops).includes((prob as any).Topics[n])) {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]].Total += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]].Correct += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]].Seconds += +(prob as any).Seconds;
                    }
                    else {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                    }
                    if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]].SubTops).includes((prob as any).SubTopics[n])) {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Total += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Correct += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Seconds += +(prob as any).Seconds;
                    }
                    else {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                    }
                  }
                }
              }
              else {
                this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} };
                if (!this.dumpService.exam_attribute_dump[key].HideTopics) {
                  for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                    this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                    this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                  }
                }
              }
            }
            else {
              this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': (prob as any).Seconds, 'Time': '0s', 'Subs': { [this.dumpService.exam_attribute_dump[key].Subject]: { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} } } };
              if (!this.dumpService.exam_attribute_dump[key].HideTopics) {
                for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                  this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                  this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                }
              }
            }
          }
          else {
            if (Object.keys(this.grade_breakdown).includes(this.dumpService.exam_attribute_dump[key].Grade)) {
              this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Total += 1;
              this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Incorrect += 1;
              this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Seconds += +(prob as any).Seconds;
              if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs).includes(this.dumpService.exam_attribute_dump[key].Subject)) {
                this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Total += 1;
                this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Incorrect += 1;
                this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Seconds += +(prob as any).Seconds;
                if (!this.dumpService.exam_attribute_dump[key].HideTopics) {
                  for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                    if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops).includes((prob as any).Topics[n])) {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]].Total += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]].Incorrect += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]].Seconds += +(prob as any).Seconds;
                    }
                    else {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                    }
                    if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]].SubTops).includes((prob as any).SubTopics[n])) {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Total += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Incorrect += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Seconds += +(prob as any).Seconds;
                    }
                    else {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                    }
                  }
                }
              }
              else {
                this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} };
                if (!this.dumpService.exam_attribute_dump[key].HideTopics) {
                  for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                    this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                    this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                  }
                }
              }
            }
            else {
              this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': (prob as any).Seconds, 'Time': '0s', 'Subs': { [this.dumpService.exam_attribute_dump[key].Subject]: { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} } } };
              if (!this.dumpService.exam_attribute_dump[key].HideTopics) {
                for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                  this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                  this.grade_breakdown[this.dumpService.exam_attribute_dump[key].Grade].Subs[this.dumpService.exam_attribute_dump[key].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                }
              }
            }
          }
        }
      }
      if (this.selected_stud_results != '' && this.student_sub_metadata[key] != undefined) {
        this.student_sub_metadata[key].total = this.class_total_problems;
        this.student_sub_metadata[key].correct = this.class_correct_problems;
        this.student_sub_metadata[key].score = Math.round(100 * this.class_correct_problems / this.class_total_problems);
        this.student_sub_metadata[key].time = "" + Math.floor(ass_test_time / 3600) + "h " + "" + (Math.floor(ass_test_time / 60) % 60) + "m " + "" + (ass_test_time % 60) + "s";
      }
    }
    this.class_total_problems = 0;
    this.class_correct_problems = 0;
    for (let grade of Object.keys(this.grade_breakdown)) {
      this.class_total_problems += this.grade_breakdown[grade].Total;
      this.class_correct_problems += this.grade_breakdown[grade].Correct;
      this.grade_breakdown[grade].Percent = Math.round(100 * this.grade_breakdown[grade].Correct / (this.grade_breakdown[grade].Total));
      this.grade_breakdown[grade].Time = (Math.floor(this.grade_breakdown[grade].Seconds / this.grade_breakdown[grade].Total / 60)).toString() + 'm ' + (Math.round(this.grade_breakdown[grade].Seconds / this.grade_breakdown[grade].Total % 60)).toString() + 's';
      for (let subject of Object.keys(this.grade_breakdown[grade].Subs)) {
        this.grade_breakdown[grade].Subs[subject].Percent = Math.round(100 * this.grade_breakdown[grade].Subs[subject].Correct / (this.grade_breakdown[grade].Subs[subject].Total));
        this.grade_breakdown[grade].Subs[subject].Time = (Math.floor(this.grade_breakdown[grade].Subs[subject].Seconds / this.grade_breakdown[grade].Subs[subject].Total / 60)).toString() + 'm ' + (Math.round(this.grade_breakdown[grade].Subs[subject].Seconds / this.grade_breakdown[grade].Subs[subject].Total % 60)).toString() + 's';
        for (let topic of Object.keys(this.grade_breakdown[grade].Subs[subject].Tops)) {
          this.grade_breakdown[grade].Subs[subject].Tops[topic].Percent = Math.round(100 * this.grade_breakdown[grade].Subs[subject].Tops[topic].Correct / (this.grade_breakdown[grade].Subs[subject].Tops[topic].Total));
          this.grade_breakdown[grade].Subs[subject].Tops[topic].Time = (Math.floor(this.grade_breakdown[grade].Subs[subject].Tops[topic].Seconds / this.grade_breakdown[grade].Subs[subject].Tops[topic].Total / 60)).toString() + 'm ' + (Math.round(this.grade_breakdown[grade].Subs[subject].Tops[topic].Seconds / this.grade_breakdown[grade].Subs[subject].Tops[topic].Total % 60)).toString() + 's';
          for (let subtop of Object.keys(this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops)) {
            this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Percent = Math.round(100 * this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Correct / (this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Total));
            this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Time = (Math.floor(this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Seconds / this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Total / 60)).toString() + 'm ' + (Math.round(this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Seconds / this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Total % 60)).toString() + 's';
          }
          this.subject_breakdown_subtop[grade + " " + subject + ": " + topic] = { 'Grade': grade, 'Subject': subject, 'Topic': topic, 'Break': this.grade_breakdown[grade].Subs[subject].Tops[topic] };
        }
        this.subject_breakdown_top[grade + " " + subject] = { 'Grade': grade, 'Subject': subject, 'Break': this.grade_breakdown[grade].Subs[subject] };
      }
    }
    this.total_test_time = "" + Math.floor(test_time / 3600) + "h " + "" + (Math.floor(test_time / 60) % 60) + "m " + "" + (test_time % 60) + "s";
    if (this.class_total_problems == 0) {
      this.total_percent_correct = 0;
    }
    else {
      this.total_percent_correct = Math.round(10000 * this.class_correct_problems / this.class_total_problems) / 100;
    }
    console.log(this.grade_breakdown);
  }

  select_sub(exm: string, stud: string) {
    console.log(this.student_sub_metadata);
    // if (this.authService.userData.role == 'Student') {
    if (this.selected_stud_results != '') {
      this.db_submission = this.student_sub_metadata[exm];
      this.exam_submission = this.db_submission.problems;
    }
    else if (this.selected_exam_results != '') {
      this.db_submission = this.exam_sub_metadata[stud];
      this.exam_submission = this.db_submission.problems;
    }
    else if (this.selected_quiz_results != '') {
      this.db_submission = this.quiz_sub_metadata[stud];
      for (const [id, sub] of Object.entries(this.db_submission.problems)) {
        this.exam_submission[(sub as any).Number] = (sub as any);
      }
    }
    this.exam_length = this.db_submission.total;
    this.number_correct = this.db_submission.correct;
    this.correct_percent = this.db_submission.score;
    this.time_duration = this.db_submission.time;
    this.performance_level = this.db_submission.level;
    this.exam_submission_list = [];
    this.wrong_submission_list = [];
    this.topic_breakdown = {};
    for (let i: number = 0; i < this.exam_length; i++) {
      this.exam_submission_list.push(this.exam_submission[+Object.keys(this.exam_submission)[i]]);
      if (this.exam_submission[+Object.keys(this.exam_submission)[i]].Correct != '✅') {
        this.wrong_submission_list.push(this.exam_submission[+Object.keys(this.exam_submission)[i]]);
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
      if (!exm.startsWith('Q-') && !this.dumpService.exam_attribute_dump[exm].HideTopics) {
        for (let n: number = 0; n < this.exam_submission_list[i].SubTopics.length; n++) {
          if (Object.keys(this.topic_breakdown).includes(this.exam_submission_list[i].Topics[n])) {
            this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Total += 1;
            this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Seconds += +this.exam_submission_list[i].Seconds;
            if (this.exam_submission_list[i].Correct == '✅') {
              this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Correct += 1;
              if (Object.keys(this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Subs).includes(this.exam_submission_list[i].SubTopics[n])) {
                this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Subs[this.exam_submission_list[i].SubTopics[n]].Total += 1;
                this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Subs[this.exam_submission_list[i].SubTopics[n]].Correct += 1;
                this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Subs[this.exam_submission_list[i].SubTopics[n]].Seconds += +this.exam_submission_list[i].Seconds;
              }
              else {
                this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Subs[this.exam_submission_list[i].SubTopics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +this.exam_submission_list[i].Seconds, 'Time': '0s' };
              }
            }
            else {
              this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Incorrect += 1;
              if (Object.keys(this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Subs).includes(this.exam_submission_list[i].SubTopics[n])) {
                this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Subs[this.exam_submission_list[i].SubTopics[n]].Total += 1;
                this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Subs[this.exam_submission_list[i].SubTopics[n]].Incorrect += 1;
                this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Subs[this.exam_submission_list[i].SubTopics[n]].Seconds += +this.exam_submission_list[i].Seconds;
              }
              else {
                this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Subs[this.exam_submission_list[i].SubTopics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +this.exam_submission_list[i].Seconds, 'Time': '0s' };
              }
            }
          }
          else {
            if (this.exam_submission_list[i].Correct == '✅') {
              this.topic_breakdown[this.exam_submission_list[i].Topics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s', 'Subs': { [this.exam_submission_list[i].SubTopics[n]]: { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +this.exam_submission_list[i].Seconds, 'Time': '0s' } } };
            }
            else {
              this.topic_breakdown[this.exam_submission_list[i].Topics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s', 'Subs': { [this.exam_submission_list[i].SubTopics[n]]: { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +this.exam_submission_list[i].Seconds, 'Time': '0s' } } };
            }
          }
        }
      }
      else if (exm.startsWith('Q-')) {
        for (let n: number = 0; n < this.exam_submission_list[i].SubTopics.length; n++) {
          if (Object.keys(this.topic_breakdown).includes(this.exam_submission_list[i].Topics[n])) {
            this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Total += 1;
            this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Seconds += +this.exam_submission_list[i].Seconds;
            if (this.exam_submission_list[i].Correct == '✅') {
              this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Correct += 1;
              if (Object.keys(this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Subs).includes(this.exam_submission_list[i].SubTopics[n])) {
                this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Subs[this.exam_submission_list[i].SubTopics[n]].Total += 1;
                this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Subs[this.exam_submission_list[i].SubTopics[n]].Correct += 1;
                this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Subs[this.exam_submission_list[i].SubTopics[n]].Seconds += +this.exam_submission_list[i].Seconds;
              }
              else {
                this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Subs[this.exam_submission_list[i].SubTopics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +this.exam_submission_list[i].Seconds, 'Time': '0s' };
              }
            }
            else {
              this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Incorrect += 1;
              if (Object.keys(this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Subs).includes(this.exam_submission_list[i].SubTopics[n])) {
                this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Subs[this.exam_submission_list[i].SubTopics[n]].Total += 1;
                this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Subs[this.exam_submission_list[i].SubTopics[n]].Incorrect += 1;
                this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Subs[this.exam_submission_list[i].SubTopics[n]].Seconds += +this.exam_submission_list[i].Seconds;
              }
              else {
                this.topic_breakdown[this.exam_submission_list[i].Topics[n]].Subs[this.exam_submission_list[i].SubTopics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +this.exam_submission_list[i].Seconds, 'Time': '0s' };
              }
            }
          }
          else {
            if (this.exam_submission_list[i].Correct == '✅') {
              this.topic_breakdown[this.exam_submission_list[i].Topics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s', 'Subs': { [this.exam_submission_list[i].SubTopics[n]]: { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +this.exam_submission_list[i].Seconds, 'Time': '0s' } } };
            }
            else {
              this.topic_breakdown[this.exam_submission_list[i].Topics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s', 'Subs': { [this.exam_submission_list[i].SubTopics[n]]: { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +this.exam_submission_list[i].Seconds, 'Time': '0s' } } };
            }
          }
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
    this.selected_sub = [exm, stud];
    console.log(this.topic_breakdown);
  }

  remove_student(stud: string) {
    this.class_stud_set = [];
    this.edit_c_list = {};
    const class_stud_ref = 'classes/' + this.class_uid + '/students';
    for (let student of this.class_data.students) {
      this.class_stud_set.push(student as string);
    }
    if (this.class_stud_set.indexOf(stud) != -1) {
      this.class_stud_set.splice(this.class_stud_set.indexOf(stud), 1);
    }
    else {
      this.class_stud_set.pop()
    }
    this.edit_c_list[class_stud_ref] = this.class_stud_set;
    this.authService.UpdateDatabase({ class_stud_ref: {} });
    this.authService.UpdateDatabase(this.edit_c_list);
    location.reload();
  }

  toggle_add_exams() {
    this.class_data = (this.authService.searchClassId(this.class_uid) as any);
    this.class_exam_set = [];
    for (let ass of this.class_data.exams) {
      this.class_exam_set.push(ass as string);
    }
    this.add_a = !this.add_a;
    // this.edit_c_list = [];
  }

  toggle_create_quiz() {
    this.class_data = (this.authService.searchClassId(this.class_uid) as any);
    // this.class_quiz_set = [];
    for (let quiz of this.class_data.quizzes) {
      this.class_exam_set.push(quiz as string);
    }
    this.create_q = !this.create_q;
    // this.edit_c_list = [];
  }

  toggle_new_exam_c(ass: string) {
    if (!this.new_assignments.includes(ass)) {
      this.new_assignments.push(ass);
    }
    else {
      if (this.new_assignments.indexOf(ass) != -1) {
        this.new_assignments.splice(this.new_assignments.indexOf(ass), 1);
      }
      else {
        this.new_assignments.pop()
      }
    }
  }

  add_assignments_c() {
    this.class_exam_set = [];
    this.edit_c_list = {};
    const class_ass_ref = 'classes/' + this.class_uid + '/assignments';
    for (let ass of this.class_data.exams) {
      this.class_exam_set.push(ass as string);
    }
    for (let ass of this.new_assignments) {
      if (!this.class_exam_set.includes(ass)) {
        this.class_exam_set.push(ass);
      }
    }
    this.edit_c_list[class_ass_ref] = this.class_exam_set;
    this.authService.UpdateDatabase({ class_ass_ref: {} });
    this.authService.UpdateDatabase(this.edit_c_list);
    location.reload();
  }

  exam_action(act: string, exm: string) {
    if (act == 'results') {
      this.exam_results(exm);
    }
    else if (act == 'take') {
      this.router.navigateByUrl('/exam/' + exm + '/' + this.class_uid);
    }
    else if (act == 'view') {
      this.select_exam(exm);
      this.scroll_top();
    }
    else if (act == 'remove') {
      this.remove_exam(exm);
    }
  }

  exam_results(ass: string) {
    this.selected_exam_results = ass;
    this.grade_breakdown = {};
    this.subject_breakdown_top = {};
    this.subject_breakdown_subtop = {};
    this.topic_breakdown = {};
    this.exam_sub_metadata = {};
    // this.student_data = this.authService.searchUserId(stud);
    this.exam_sub_metadata = this.getAssClassSubmissions(ass);
    setTimeout(() => {
      // this.student_data = this.authService.searchUserId(stud);
      this.exam_sub_metadata = this.getAssClassSubmissions(ass);
      this.subject_break_exam(ass);
      if (this.class_total_problems == 0) {
        this.total_percent_correct = 0;
      }
      else {
        this.total_percent_correct = Math.round(10000 * this.class_correct_problems / this.class_total_problems) / 100;
      }
      this.complete_exam_count = 0;
      this.complete_exam_list = [];
      var temp_count = 1;
      // const exam_history = this.student_data.exams.history;
      for (const [key, det] of Object.entries(this.exam_sub_metadata)) {
        setTimeout(() => {
          if ((det as any).endtimestamp != undefined) {
            this.complete_exam_count = this.complete_exam_count + 1;
            this.complete_exam_list.push(key);
            // this.exam_sub_metadata[key].enddate = new Date(this.exam_sub_metadata[key].endtimestamp).toLocaleDateString();
            // this.exam_sub_metadata[key].endtime = new Date(this.exam_sub_metadata[key].endtimestamp).toLocaleTimeString();
            this.exam_sub_metadata[key].enddate = new Date(this.exam_sub_metadata[key].endtimestamp).toLocaleDateString();
            this.exam_sub_metadata[key].endtime = new Date(this.exam_sub_metadata[key].endtimestamp).toLocaleTimeString();
          }
        }, temp_count * 50);
        temp_count += 1;
      }
      this.exam_results_loaded = true;
      this.plot_exam_results();
    }, 500);
  }

  quiz_action(act: string, quiz: string) {
    if (act == 'results') {
      this.quiz_results('Q-' + quiz);
    }
    else if (act == 'take') {
      this.router.navigateByUrl('/quiz/' + quiz + '/' + this.class_uid);
    }
    else if (act == 'view') {
      this.quiz_config = (this.authService.searchQuizId(quiz) as any);
      if (this.quiz_config.problems == undefined) {
        this.toggle_quiz_pdf(quiz);
      }
      else {
        this.toggle_cquiz_pdf(quiz);
      }
      this.scroll_top();
    }
    else if (act == 'remove') {
      this.remove_quiz(quiz);
    }
  }

  quiz_results(ass: string) {
    this.selected_quiz_results = ass;
    this.grade_breakdown = {};
    this.subject_breakdown_top = {};
    this.subject_breakdown_subtop = {};
    this.topic_breakdown = {};
    this.quiz_sub_metadata = {};
    // this.student_data = this.authService.searchUserId(stud);
    this.quiz_sub_metadata = this.getAssClassSubmissions(ass);
    setTimeout(() => {
      // this.student_data = this.authService.searchUserId(stud);
      this.quiz_sub_metadata = this.getAssClassSubmissions(ass);
      this.subject_break_quiz(ass);
      if (this.class_total_problems == 0) {
        this.total_percent_correct = 0;
      }
      else {
        this.total_percent_correct = Math.round(10000 * this.class_correct_problems / this.class_total_problems) / 100;
      }
      this.complete_exam_count = 0;
      this.complete_exam_list = [];
      var temp_count = 1;
      // const exam_history = this.student_data.exams.history;
      for (const [key, det] of Object.entries(this.quiz_sub_metadata)) {
        setTimeout(() => {
          if ((det as any).endtimestamp != undefined) {
            this.complete_exam_count = this.complete_exam_count + 1;
            this.complete_exam_list.push(key);
            // this.quiz_sub_metadata[key].enddate = new Date(this.quiz_sub_metadata[key].endtimestamp).toLocaleDateString();
            // this.quiz_sub_metadata[key].endtime = new Date(this.quiz_sub_metadata[key].endtimestamp).toLocaleTimeString();
            this.quiz_sub_metadata[key].enddate = new Date(this.quiz_sub_metadata[key].endtimestamp).toLocaleDateString();
            this.quiz_sub_metadata[key].endtime = new Date(this.quiz_sub_metadata[key].endtimestamp).toLocaleTimeString();
          }
        }, temp_count * 50);
        temp_count += 1;
      }
      this.quiz_results_loaded = true;
      this.plot_quiz_results();
    }, 500);
  }

  getAssClassSubmissions(ass: string) {
    var exam_submissions: any = {};
    for (const [exm, studs] of Object.entries(this.class_data.history.exams)) {
      if (exm == ass) {
        for (let std of Object.keys(studs as any)) {
          exam_submissions[std] = (this.authService.getStudExamSubmission2(std, ass) as any);
        }
      }
    }
    return (exam_submissions);
  }

  subject_break_exam(exam: string) {
    const sel_exam = exam;
    this.grade_breakdown = {};
    this.total_test_time = "0h 0m 0s";
    var test_time = 0;
    this.complete_exam_count = 0;
    this.complete_exam_list = [];
    // const exam_history = this.student_data.exams.history;
    for (const [key, det] of Object.entries(this.getAssClassSubmissions(exam))) {
      var ass_test_time = 0;
      this.class_total_problems = 0;
      this.class_correct_problems = 0;
      if (this.getAssClassSubmissions(exam)[key] != undefined && (det as any).endtimestamp != undefined) {
        this.complete_exam_count = this.complete_exam_count + 1;
        this.complete_exam_list.push(key);
      }
      if (this.getAssClassSubmissions(exam)[key] != undefined) {
        this.class_total_problems = Object.keys(this.getAssClassSubmissions(exam)[key].problems).length;
        for (let prob of Object.values(this.getAssClassSubmissions(exam)[key].problems)) {
          test_time += +(prob as any).Seconds;
          ass_test_time += +(prob as any).Seconds;
          if ((prob as any).Correct != undefined && (prob as any).Correct.length > 0 && (prob as any).Correct[0][0] == '✅') {
            this.class_correct_problems += 1;
            if (Object.keys(this.grade_breakdown).includes(this.dumpService.exam_attribute_dump[sel_exam].Grade)) {
              this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Total += 1;
              this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Correct += 1;
              this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Seconds += +(prob as any).Seconds;
              if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs).includes(this.dumpService.exam_attribute_dump[sel_exam].Subject)) {
                this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Total += 1;
                this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Correct += 1;
                this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Seconds += +(prob as any).Seconds;
                if (!this.dumpService.exam_attribute_dump[sel_exam].HideTopics) {
                  for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                    if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops).includes((prob as any).Topics[n])) {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]].Total += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]].Correct += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]].Seconds += +(prob as any).Seconds;
                    }
                    else {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                    }
                    if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]].SubTops).includes((prob as any).SubTopics[n])) {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Total += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Correct += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Seconds += +(prob as any).Seconds;
                    }
                    else {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                    }
                  }
                }
              }
              else {
                this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} };
                if (!this.dumpService.exam_attribute_dump[sel_exam].HideTopics) {
                  for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                    this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                    this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                  }
                }
              }
            }
            else {
              this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': (prob as any).Seconds, 'Time': '0s', 'Subs': { [this.dumpService.exam_attribute_dump[sel_exam].Subject]: { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} } } };
              if (!this.dumpService.exam_attribute_dump[sel_exam].HideTopics) {
                for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                  this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                  this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                }
              }
            }
          }
          else {
            if (Object.keys(this.grade_breakdown).includes(this.dumpService.exam_attribute_dump[sel_exam].Grade)) {
              this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Total += 1;
              this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Incorrect += 1;
              this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Seconds += +(prob as any).Seconds;
              if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs).includes(this.dumpService.exam_attribute_dump[sel_exam].Subject)) {
                this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Total += 1;
                this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Incorrect += 1;
                this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Seconds += +(prob as any).Seconds;
                if (!this.dumpService.exam_attribute_dump[sel_exam].HideTopics) {
                  for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                    if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops).includes((prob as any).Topics[n])) {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]].Total += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]].Incorrect += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]].Seconds += +(prob as any).Seconds;
                    }
                    else {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                    }
                    if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]].SubTops).includes((prob as any).SubTopics[n])) {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Total += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Incorrect += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Seconds += +(prob as any).Seconds;
                    }
                    else {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                    }
                  }
                }
              }
              else {
                this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} };
                if (!this.dumpService.exam_attribute_dump[sel_exam].HideTopics) {
                  for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                    this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                    this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                  }
                }
              }
            }
            else {
              this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': (prob as any).Seconds, 'Time': '0s', 'Subs': { [this.dumpService.exam_attribute_dump[sel_exam].Subject]: { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} } } };
              if (!this.dumpService.exam_attribute_dump[sel_exam].HideTopics) {
                for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                  this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                  this.grade_breakdown[this.dumpService.exam_attribute_dump[sel_exam].Grade].Subs[this.dumpService.exam_attribute_dump[sel_exam].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                }
              }
            }
          }
        }
      }
      if (this.selected_exam_results != '' && this.exam_sub_metadata[key] != undefined) {
        this.exam_sub_metadata[key].total = this.class_total_problems;
        this.exam_sub_metadata[key].correct = this.class_correct_problems;
        this.exam_sub_metadata[key].score = Math.round(100 * this.class_correct_problems / this.class_total_problems);
        this.exam_sub_metadata[key].time = "" + Math.floor(ass_test_time / 3600) + "h " + "" + (Math.floor(ass_test_time / 60) % 60) + "m " + "" + (ass_test_time % 60) + "s";
      }
    }
    this.class_total_problems = 0;
    this.class_correct_problems = 0;
    for (let grade of Object.keys(this.grade_breakdown)) {
      this.class_total_problems += this.grade_breakdown[grade].Total;
      this.class_correct_problems += this.grade_breakdown[grade].Correct;
      this.grade_breakdown[grade].Percent = Math.round(100 * this.grade_breakdown[grade].Correct / (this.grade_breakdown[grade].Total));
      this.grade_breakdown[grade].Time = (Math.floor(this.grade_breakdown[grade].Seconds / this.grade_breakdown[grade].Total / 60)).toString() + 'm ' + (Math.round(this.grade_breakdown[grade].Seconds / this.grade_breakdown[grade].Total % 60)).toString() + 's';
      for (let subject of Object.keys(this.grade_breakdown[grade].Subs)) {
        this.grade_breakdown[grade].Subs[subject].Percent = Math.round(100 * this.grade_breakdown[grade].Subs[subject].Correct / (this.grade_breakdown[grade].Subs[subject].Total));
        this.grade_breakdown[grade].Subs[subject].Time = (Math.floor(this.grade_breakdown[grade].Subs[subject].Seconds / this.grade_breakdown[grade].Subs[subject].Total / 60)).toString() + 'm ' + (Math.round(this.grade_breakdown[grade].Subs[subject].Seconds / this.grade_breakdown[grade].Subs[subject].Total % 60)).toString() + 's';
        for (let topic of Object.keys(this.grade_breakdown[grade].Subs[subject].Tops)) {
          this.grade_breakdown[grade].Subs[subject].Tops[topic].Percent = Math.round(100 * this.grade_breakdown[grade].Subs[subject].Tops[topic].Correct / (this.grade_breakdown[grade].Subs[subject].Tops[topic].Total));
          this.grade_breakdown[grade].Subs[subject].Tops[topic].Time = (Math.floor(this.grade_breakdown[grade].Subs[subject].Tops[topic].Seconds / this.grade_breakdown[grade].Subs[subject].Tops[topic].Total / 60)).toString() + 'm ' + (Math.round(this.grade_breakdown[grade].Subs[subject].Tops[topic].Seconds / this.grade_breakdown[grade].Subs[subject].Tops[topic].Total % 60)).toString() + 's';
          for (let subtop of Object.keys(this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops)) {
            this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Percent = Math.round(100 * this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Correct / (this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Total));
            this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Time = (Math.floor(this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Seconds / this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Total / 60)).toString() + 'm ' + (Math.round(this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Seconds / this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Total % 60)).toString() + 's';
          }
          this.subject_breakdown_subtop[grade + " " + subject + ": " + topic] = { 'Grade': grade, 'Subject': subject, 'Topic': topic, 'Break': this.grade_breakdown[grade].Subs[subject].Tops[topic] };
        }
        this.subject_breakdown_top[grade + " " + subject] = { 'Grade': grade, 'Subject': subject, 'Break': this.grade_breakdown[grade].Subs[subject] };
      }
    }
    this.total_test_time = "" + Math.floor(test_time / 3600) + "h " + "" + (Math.floor(test_time / 60) % 60) + "m " + "" + (test_time % 60) + "s";
    if (this.class_total_problems == 0) {
      this.total_percent_correct = 0;
    }
    else {
      this.total_percent_correct = Math.round(10000 * this.class_correct_problems / this.class_total_problems) / 100;
    }
    console.log(this.grade_breakdown);
  }

  subject_break_quiz(quiz: string) {
    // this.selected_quiz_results = quiz;
    this.quiz_config = (this.authService.searchQuizId(quiz.slice(2)) as any);
    this.grade_breakdown = {};
    this.total_test_time = "0h 0m 0s";
    var test_time = 0;
    this.complete_exam_count = 0;
    this.complete_exam_list = [];
    // const exam_history = this.student_data.exams.history;
    console.log(this.getAssClassSubmissions(quiz));
    console.log(quiz);
    for (const [key, det] of Object.entries(this.getAssClassSubmissions(quiz))) {
      var ass_test_time = 0;
      this.class_total_problems = 0;
      this.class_correct_problems = 0;
      if (this.getAssClassSubmissions(quiz)[key] != undefined && (det as any).endtimestamp != undefined) {
        this.complete_exam_count = this.complete_exam_count + 1;
        this.complete_exam_list.push(key);
      }
      if (this.quiz_config.problems == undefined) {
        this.class_total_problems = Object.keys(this.getAssClassSubmissions(quiz)[key].problems).length;
        for (const [id, prob] of Object.entries(this.getAssClassSubmissions(quiz)[key].problems)) {
          test_time += +(prob as any).Seconds;
          ass_test_time += +(prob as any).Seconds;
          if ((prob as any).Correct != undefined && (prob as any).Correct.length > 0 && (prob as any).Correct[0][0] == '✅') {
            this.class_correct_problems += 1;
            if (this.dumpService.exam_set.includes(id.substring(0, id.indexOf('-'))) && Object.keys(this.grade_breakdown).includes(this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade)) {
              this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Total += 1;
              this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Correct += 1;
              this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Seconds += +(prob as any).Seconds;
              if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs).includes(this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject)) {
                this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Total += 1;
                this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Correct += 1;
                this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Seconds += +(prob as any).Seconds;
                if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
                  for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                    if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops).includes((prob as any).Topics[n])) {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].Total += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].Correct += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].Seconds += +(prob as any).Seconds;
                    }
                    else {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                    }
                    if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops).includes((prob as any).SubTopics[n])) {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Total += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Correct += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Seconds += +(prob as any).Seconds;
                    }
                    else {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                    }
                  }
                }
              }
              else {
                this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} };
                if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
                  for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                    this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                    this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                  }
                }
              }
            }
            else if (this.dumpService.exam_set.includes(id.substring(0, id.indexOf('-')))) {
              this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': (prob as any).Seconds, 'Time': '0s', 'Subs': { [this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject]: { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} } } };
              if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
                for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                  this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                  this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                }
              }
            }
          }
          else {
            if (this.dumpService.exam_set.includes(id.substring(0, id.indexOf('-'))) && Object.keys(this.grade_breakdown).includes(this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade)) {
              this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Total += 1;
              this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Incorrect += 1;
              this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Seconds += +(prob as any).Seconds;
              if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs).includes(this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject)) {
                this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Total += 1;
                this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Incorrect += 1;
                this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Seconds += +(prob as any).Seconds;
                if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
                  for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                    if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops).includes((prob as any).Topics[n])) {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].Total += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].Incorrect += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].Seconds += +(prob as any).Seconds;
                    }
                    else {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                    }
                    if (Object.keys(this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops).includes((prob as any).SubTopics[n])) {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Total += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Incorrect += 1;
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Seconds += +(prob as any).Seconds;
                    }
                    else {
                      this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                    }
                  }
                }
              }
              else {
                this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} };
                if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
                  for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                    this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                    this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                  }
                }
              }
            }
            else if (this.dumpService.exam_set.includes(id.substring(0, id.indexOf('-')))) {
              this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': (prob as any).Seconds, 'Time': '0s', 'Subs': { [this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject]: { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} } } };
              if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
                for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                  this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                  this.grade_breakdown[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Grade].Subs[this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].Subject].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                }
              }
            }
          }
        }
      }
      else if (this.getAssClassSubmissions(quiz)[key] != undefined) {
        console.log('custom quiz');
        this.class_total_problems = Object.keys(this.getAssClassSubmissions(quiz)[key].problems).length;
        for (const [id, prob] of Object.entries(this.getAssClassSubmissions(quiz)[key].problems)) {
          console.log('Problem ID: ' + '' + id);
          console.log(prob);
          console.log(this.quiz_config.grades[0]);
          console.log(this.quiz_config.subjects[0]);
          test_time += +(prob as any).Seconds;
          ass_test_time += +(prob as any).Seconds;
          if ((prob as any).Correct != undefined && (prob as any).Correct.length > 0 && (prob as any).Correct[0][0] == '✅') {
            this.class_correct_problems += 1;
            if (Object.keys(this.grade_breakdown).includes(this.quiz_config.grades[0])) {
              this.grade_breakdown[this.quiz_config.grades[0]].Total += 1;
              this.grade_breakdown[this.quiz_config.grades[0]].Correct += 1;
              this.grade_breakdown[this.quiz_config.grades[0]].Seconds += +(prob as any).Seconds;
              if (Object.keys(this.grade_breakdown[this.quiz_config.grades[0]].Subs).includes(this.quiz_config.subjects[0])) {
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Total += 1;
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Correct += 1;
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Seconds += +(prob as any).Seconds;
                // if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
                for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                  if (Object.keys(this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops).includes((prob as any).Topics[n])) {
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].Total += 1;
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].Correct += 1;
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].Seconds += +(prob as any).Seconds;
                  }
                  else {
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                  }
                  if (Object.keys(this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops).includes((prob as any).SubTopics[n])) {
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Total += 1;
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Correct += 1;
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Seconds += +(prob as any).Seconds;
                  }
                  else {
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                  }
                  // }
                }
              }
              else {
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} };
                // if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
                for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                  this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                  this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                }
                // }
              }
            }
            else {
              this.grade_breakdown[this.quiz_config.grades[0]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': (prob as any).Seconds, 'Time': '0s', 'Subs': { [this.quiz_config.subjects[0]]: { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} } } };
              // if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
              for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
              }
              // }
            }
          }
          else {
            if (Object.keys(this.grade_breakdown).includes(this.quiz_config.grades[0])) {
              this.grade_breakdown[this.quiz_config.grades[0]].Total += 1;
              this.grade_breakdown[this.quiz_config.grades[0]].Incorrect += 1;
              this.grade_breakdown[this.quiz_config.grades[0]].Seconds += +(prob as any).Seconds;
              if (Object.keys(this.grade_breakdown[this.quiz_config.grades[0]].Subs).includes(this.quiz_config.subjects[0])) {
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Total += 1;
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Incorrect += 1;
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Seconds += +(prob as any).Seconds;
                // if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
                for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                  if (Object.keys(this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops).includes((prob as any).Topics[n])) {
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].Total += 1;
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].Incorrect += 1;
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].Seconds += +(prob as any).Seconds;
                  }
                  else {
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                  }
                  if (Object.keys(this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops).includes((prob as any).SubTopics[n])) {
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Total += 1;
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Incorrect += 1;
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]].Seconds += +(prob as any).Seconds;
                  }
                  else {
                    this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                  }
                }
                // }
              }
              else {
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} };
                // if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
                for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                  this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                  this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
                }
                // }
              }
            }
            else {
              this.grade_breakdown[this.quiz_config.grades[0]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': (prob as any).Seconds, 'Time': '0s', 'Subs': { [this.quiz_config.subjects[0]]: { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'Tops': {} } } };
              // if (!this.dumpService.exam_attribute_dump[id.substring(0, id.indexOf('-'))].HideTopics) {
              for (let n: number = 0; n < (prob as any).Topics.length; n++) {
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s', 'SubTops': {} };
                this.grade_breakdown[this.quiz_config.grades[0]].Subs[this.quiz_config.subjects[0]].Tops[(prob as any).Topics[n]].SubTops[(prob as any).SubTopics[n]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': +(prob as any).Seconds, 'Time': '0s' };
              }
              // }
            }
          }
        }
      }
      if (this.selected_quiz_results != '' && this.quiz_sub_metadata[key] != undefined) {
        this.quiz_sub_metadata[key].total = this.class_total_problems;
        this.quiz_sub_metadata[key].correct = this.class_correct_problems;
        this.quiz_sub_metadata[key].score = Math.round(100 * this.class_correct_problems / this.class_total_problems);
        this.quiz_sub_metadata[key].time = "" + Math.floor(ass_test_time / 3600) + "h " + "" + (Math.floor(ass_test_time / 60) % 60) + "m " + "" + (ass_test_time % 60) + "s";
      }
    }
    console.log(this.grade_breakdown);
    this.class_total_problems = 0;
    this.class_correct_problems = 0;
    for (let grade of Object.keys(this.grade_breakdown)) {
      this.class_total_problems += this.grade_breakdown[grade].Total;
      this.class_correct_problems += this.grade_breakdown[grade].Correct;
      this.grade_breakdown[grade].Percent = Math.round(100 * this.grade_breakdown[grade].Correct / (this.grade_breakdown[grade].Total));
      this.grade_breakdown[grade].Time = (Math.floor(this.grade_breakdown[grade].Seconds / this.grade_breakdown[grade].Total / 60)).toString() + 'm ' + (Math.round(this.grade_breakdown[grade].Seconds / this.grade_breakdown[grade].Total % 60)).toString() + 's';
      for (let subject of Object.keys(this.grade_breakdown[grade].Subs)) {
        this.grade_breakdown[grade].Subs[subject].Percent = Math.round(100 * this.grade_breakdown[grade].Subs[subject].Correct / (this.grade_breakdown[grade].Subs[subject].Total));
        this.grade_breakdown[grade].Subs[subject].Time = (Math.floor(this.grade_breakdown[grade].Subs[subject].Seconds / this.grade_breakdown[grade].Subs[subject].Total / 60)).toString() + 'm ' + (Math.round(this.grade_breakdown[grade].Subs[subject].Seconds / this.grade_breakdown[grade].Subs[subject].Total % 60)).toString() + 's';
        for (let topic of Object.keys(this.grade_breakdown[grade].Subs[subject].Tops)) {
          this.grade_breakdown[grade].Subs[subject].Tops[topic].Percent = Math.round(100 * this.grade_breakdown[grade].Subs[subject].Tops[topic].Correct / (this.grade_breakdown[grade].Subs[subject].Tops[topic].Total));
          this.grade_breakdown[grade].Subs[subject].Tops[topic].Time = (Math.floor(this.grade_breakdown[grade].Subs[subject].Tops[topic].Seconds / this.grade_breakdown[grade].Subs[subject].Tops[topic].Total / 60)).toString() + 'm ' + (Math.round(this.grade_breakdown[grade].Subs[subject].Tops[topic].Seconds / this.grade_breakdown[grade].Subs[subject].Tops[topic].Total % 60)).toString() + 's';
          for (let subtop of Object.keys(this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops)) {
            this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Percent = Math.round(100 * this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Correct / (this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Total));
            this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Time = (Math.floor(this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Seconds / this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Total / 60)).toString() + 'm ' + (Math.round(this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Seconds / this.grade_breakdown[grade].Subs[subject].Tops[topic].SubTops[subtop].Total % 60)).toString() + 's';
          }
          this.subject_breakdown_subtop[grade + " " + subject + ": " + topic] = { 'Grade': grade, 'Subject': subject, 'Topic': topic, 'Break': this.grade_breakdown[grade].Subs[subject].Tops[topic] };
        }
        this.subject_breakdown_top[grade + " " + subject] = { 'Grade': grade, 'Subject': subject, 'Break': this.grade_breakdown[grade].Subs[subject] };
      }
    }
    this.total_test_time = "" + Math.floor(test_time / 3600) + "h " + "" + (Math.floor(test_time / 60) % 60) + "m " + "" + (test_time % 60) + "s";
    if (this.class_total_problems == 0) {
      this.total_percent_correct = 0;
    }
    else {
      this.total_percent_correct = Math.round(10000 * this.class_correct_problems / this.class_total_problems) / 100;
    }
    console.log(this.grade_breakdown);
  }

  remove_exam(ass: string) {
    this.class_exam_set = [];
    this.edit_c_list = {};
    const class_ass_ref = 'classes/' + this.class_uid + '/exams';
    for (let exam of this.class_data.exams) {
      this.class_exam_set.push(exam as string);
    }
    if (this.class_exam_set.indexOf(ass) != -1) {
      this.class_exam_set.splice(this.class_exam_set.indexOf(ass), 1);
    }
    else {
      this.class_exam_set.pop()
    }
    this.edit_c_list[class_ass_ref] = this.class_exam_set;
    this.authService.UpdateDatabase({ class_ass_ref: {} });
    this.authService.UpdateDatabase(this.edit_c_list);
    location.reload();
  }

  remove_quiz(ass: string) {
    this.class_quiz_set = [];
    this.edit_c_list = {};
    const class_ass_ref = 'classes/' + this.class_uid + '/quizzes';
    for (let quiz of this.class_data.quizzes) {
      this.class_quiz_set.push(quiz as string);
    }
    if (this.class_quiz_set.indexOf(ass) != -1) {
      this.class_quiz_set.splice(this.class_quiz_set.indexOf(ass), 1);
    }
    else {
      this.class_quiz_set.pop()
    }
    this.edit_c_list[class_ass_ref] = this.class_quiz_set;
    this.authService.UpdateDatabase({ class_ass_ref: {} });
    this.authService.UpdateDatabase(this.edit_c_list);
    location.reload();
  }

  select_assignment(ass: string) {
    this.selected_assignment = ass;
  }

  back_to_class() {
    this.data_loaded = false;
    this.class_correct_problems = 0;
    this.class_total_problems = 0;
    this.complete_exam_count = 0;
    this.total_test_time = '';
    var test_time = 0;
    console.log('student assignment rollup');
    console.log(this.class_student_metadata);
    for (let stud of this.class_student_metadata) {
      console.log('student assignment rollup');
      console.log(stud);
      this.class_correct_problems += +(stud as any).correct_problems;
      this.class_total_problems += +(stud as any).total_problems;
      this.total_percent_correct = Math.round(100 * this.class_correct_problems / this.class_total_problems)
      this.complete_exam_count += +(stud as any).complete_assignments;
      console.log('split time');
      console.log((stud as any).total_time.split(/[ hms]/));
      test_time += +(stud as any).total_time.split(/[ hms]/)[0] * 3600 + +(stud as any).total_time.split(/[ hms]/)[2] * 60 + +(stud as any).total_time.split(/[ hms]/)[4];
    }
    this.total_test_time = "" + Math.floor(test_time / 3600) + "h " + "" + (Math.floor(test_time / 60) % 60) + "m " + "" + (test_time % 60) + "s";
    this.selected_stud_results = '';
    this.selected_exam_results = '';
    this.selected_quiz_results = '';
    this.stud_results_loaded = false;
    this.exam_results_loaded = false;
    this.quiz_results_loaded = false;
    this.file_source = '';
    this.exam_id = '';
    this.quiz_id = '';
    this.exam_fav = false;
    setTimeout(() => {
      this.data_loaded = true;
      if (this.authService.userData.uid == this.class_data.teacher) {
        this.plot_class_student_results();
      }
    }, 500);
  }

  toggle_share_class() {
    this.class_data = (this.authService.searchClassId(this.class_uid) as any);
    this.share_c = !this.share_c;
    var qrWidth: number = 0;
    if (this.screenWidth < 550) {
      qrWidth = 250
    }
    else if (this.screenWidth < 750) {
      qrWidth = 325
    }
    else {
      qrWidth = 450;
    }
    setTimeout(() => {
      var qrCanvas: HTMLCanvasElement = (document.getElementById('qrCanvas') as HTMLCanvasElement);
      QRCode.toCanvas(qrCanvas, 'moreproblems.org/class/' + this.class_uid, { width: qrWidth });
    }, 50);
  }

  toggle_edit_class() {
    this.class_data = (this.authService.searchClassId(this.class_uid) as any);
    this.edit_c = !this.edit_c;
    this.edit_c_list = [];
  }

  edit_class(field: string, val: string) {
    this.edit_c_list[field] = val;
  }

  save_class() {
    this.authService.UpdateDatabase(this.edit_c_list);
    // setTimeout(() => {
    //   this.set_tab("information");
    //   this.set_tab("students");
    // }, 200);
  }

  enroll_student(stud: string) {
    this.stud_class_set = [];
    this.class_stud_set = [];
    this.edit_c_list = {};
    const class_stud_ref = 'classes/' + this.class_uid + '/students';
    for (let clss of this.authService.userData.classes) {
      this.stud_class_set.push(clss as string);
    }
    for (let std of this.class_data.students) {
      this.class_stud_set.push(std as string);
    }
    if (!this.stud_class_set.includes(this.class_uid)) {
      this.stud_class_set.push(this.class_uid);
    }
    if (!this.class_stud_set.includes(stud)) {
      this.class_stud_set.push(stud);
    }
    this.edit_c_list[class_stud_ref] = this.class_stud_set;
    this.authService.UpdateUserData({ 'classes': {} });
    this.authService.UpdateUserData({ 'classes': this.stud_class_set });
    this.authService.UpdateDatabase({ class_stud_ref: {} });
    this.authService.UpdateDatabase(this.edit_c_list);
    this.is_enrolled = true;
    this.confetti_light(1);
  }

  expandTopics() {
    this.expand_topics = !this.expand_topics;
  }

  expandProblems() {
    this.expand_problems = !this.expand_problems;
  }

  showCorrect() {
    this.show_correct = !this.show_correct;
  }

  search_subtopic(topic: string, subtopic: string) {
    this.selected_student_st = '';
    this.subtopic_problem_count = 0;
    this.subtopic_new_problem_count = 0;
    this.subtopic_correct_problem_count = 0;
    this.subtopic_search_dump = {};
    if (this.authService.userData && this.authService.userData.role == 'Student') {
      const exam_history = this.authService.userData.exams.history;
      for (const [ex, dump] of Object.entries(this.dumpService.e_dump_dict)) {
        if (!Object.keys(exam_history).includes(ex) || (exam_history[ex] as any).status != "Completed") {
          for (const [num, prob] of Object.entries(dump)) {
            if (typeof prob.SubTopics != 'undefined' && !this.dumpService.exam_attribute_dump[ex].HideTopics) {
              if (prob.SubTopics.includes(subtopic)) {
                if (prob.Topics[prob.SubTopics.indexOf(subtopic)].includes(topic)) {
                  this.subtopic_new_problem_count += 1;
                }
              }
            }
          }
        }
        if (Object.keys(exam_history).includes(ex) && (exam_history[ex] as any).status == "Completed") {
          const exam_sub = this.authService.getExamSubmission2(ex);
          setTimeout(() => {
            for (const [num, prob] of Object.entries(dump)) {
              if (typeof prob.SubTopics != 'undefined' && !this.dumpService.exam_attribute_dump[ex].HideTopics) {
                if (prob.SubTopics.includes(subtopic)) {
                  if (prob.Topics[prob.SubTopics.indexOf(subtopic)].includes(topic)) {
                    if (((exam_sub.problems as any)[num].Correct.length == 1 && (exam_sub.problems as any)[num].Correct[0][0] == '✅') || ((exam_sub.problems as any)[num].Correct.length > 1 && this.is_MP_correct((exam_sub.problems as any)[num].Correct))) {
                      this.subtopic_correct_problem_count += 1;
                    }
                  }
                }
              }
            }
          }, 50);
        }
      }
    }
    for (const [ex, dump] of Object.entries(this.dumpService.e_dump_dict)) {
      for (const [num, prob] of Object.entries(dump)) {
        if (typeof prob.SubTopics != 'undefined' && !this.dumpService.exam_attribute_dump[ex].HideTopics) {
          if (prob.SubTopics.includes(subtopic)) {
            if (prob.Topics[prob.SubTopics.indexOf(subtopic)].includes(topic)) {
              this.selected_topic = topic;
              // this.standard_id = standardID;
              this.subtopic_problem_count += 1;
              this.subtopic_search_dump[this.subtopic_problem_count] = prob;
              if (!('' + this.subtopic_search_dump[this.subtopic_problem_count].Number).includes('-')) {
                this.subtopic_search_dump[this.subtopic_problem_count].Number = ex + '-' + '' + this.subtopic_search_dump[this.subtopic_problem_count].Number;
              }
            }
          }
        }
      }
    }
    if (this.authService.userData && this.authService.userData.role == 'Student') {
      const exam_history = this.authService.userData.exams.history;
      this.subtopic_problem_count = 0;
      this.subtopic_search_dump = {};
      for (const [ex, dump] of Object.entries(this.dumpService.e_dump_dict)) {
        if (Object.keys(exam_history).includes(ex) && (exam_history[ex] as any).status == "Completed") {
          for (const [num, prob] of Object.entries(dump)) {
            if (typeof prob.SubTopics != 'undefined' && !this.dumpService.exam_attribute_dump[ex].HideTopics) {
              if (prob.SubTopics.includes(subtopic)) {
                if (prob.Topics[prob.SubTopics.indexOf(subtopic)].includes(topic)) {
                  this.subtopic_problem_count += 1;
                  this.subtopic_search_dump[this.subtopic_problem_count] = prob;
                  if (!('' + this.subtopic_search_dump[this.subtopic_problem_count].Number).includes('-')) {
                    this.subtopic_search_dump[this.subtopic_problem_count].Number = ex + '-' + '' + this.subtopic_search_dump[this.subtopic_problem_count].Number;
                  }
                }
              }
            }
          }
        }
      }
      Object.entries(this.subtopic_search_dump).sort(([, valueA], [, valueB]) => (this.authService.getStudProbSubmission2(this.user_data.uid, valueA.Number)).timestamp - (this.authService.getStudProbSubmission2(this.user_data.uid, valueB.Number)).timestamp);
      this.subtopic_streak_count = 0;
      var nums: string[] = [];
      var subs: any[] = [];
      for (let i = 0; i < Object.keys(this.subtopic_search_dump).length; i++) {
        nums.push(this.subtopic_search_dump[Object.keys(this.subtopic_search_dump)[i] as any].Number);
        subs.push(this.authService.getStudExamSubmission2(this.user_data.uid, this.subtopic_search_dump[Object.keys(this.subtopic_search_dump)[i] as any].Number.substring(0, (this.subtopic_search_dump[Object.keys(this.subtopic_search_dump)[i] as any].Number).indexOf('-'))));
      }
      console.log(nums);
      console.log(subs);
      setTimeout(() => {
        for (let i = 1; i <= Object.keys(this.subtopic_search_dump).length; i++) {
          if (subs[i - 1] != undefined) {
            this.subtopic_submission.push(subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)]);
            if (((subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct.length == 1 && subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct[0][0] == '✅') || (subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct.length > 1 && this.is_MP_correct(subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct)))) {
              this.subtopic_streak_count += 1;
            }
            else {
              this.subtopic_streak_count = 0;
            }
          }
        }
      }, 50);
      for (const [ex, dump] of Object.entries(this.dumpService.e_dump_dict)) {
        if (!Object.keys(exam_history).includes(ex) || (exam_history[ex] as any).status != "Completed") {
          for (const [num, prob] of Object.entries(dump)) {
            if (typeof prob.SubTopics != 'undefined' && !this.dumpService.exam_attribute_dump[ex].HideTopics) {
              if (prob.SubTopics.includes(subtopic)) {
                if (prob.Topics[prob.SubTopics.indexOf(subtopic)].includes(topic)) {
                  this.subtopic_problem_count += 1;
                  this.subtopic_search_dump[this.subtopic_problem_count] = prob;
                  if (!('' + this.subtopic_search_dump[this.subtopic_problem_count].Number).includes('-')) {
                    this.subtopic_search_dump[this.subtopic_problem_count].Number = ex + '-' + '' + this.subtopic_search_dump[this.subtopic_problem_count].Number;
                  }
                }
              }
            }
          }
        }
      }
    }
    else {
      this.subtopic_new_problem_count = this.subtopic_problem_count;
    }
    // setTimeout(() => {
    this.selected_subtopic = subtopic;
    this.subtopic_problem_number = 0;
    this.standard_fav = false;
    if (this.authService.userData) {
      for (let fav of this.authService.userData.standards.favorites) {
        if (topic == fav[0] && subtopic == fav[1]) {
          this.standard_fav = true;
        }
      }
    }
    // }, 500);
  }

  begin_practice_st() {
    if (this.subtopic_problem_count != this.subtopic_new_problem_count) {
      this.subtopic_problem_number = this.subtopic_problem_count - this.subtopic_new_problem_count + 1;
    }
    else {
      this.subtopic_problem_number = 1;
    }
    if (this.subtopic_problem_number > this.subtopic_problem_count) {
      this.selected_subtopic = '';
      this.standard_id = '';
    }
    else {
      this.subtopic_attempt_path = [];
      this.subtopic_attempt_response = [];
      this.subtopic_attempt_explanation = [];
      this.subtopic_problem_selection = [];
      this.m_shuffled = false;
      this.m_selection = [];
      this.m_submission = [];
      this.c_submission = [];
      this.shuffle_choices_st = {};
      this.unique_choices_st = [];
      if (Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).length == 0) {
        this.subtopic_problem_attempts = [0];
        this.subtopic_attempt_path = [[]];
        this.subtopic_attempt_response = [''];
        this.subtopic_attempt_explanation = [[]];
        this.m_selection = [["", ""]];
        this.m_submission = [{}];
        this.c_submission = [{}];
        if (['MC', 'FR', 'SR', 'MR', 'LR', 'IMC', 'LP', 'GP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
          this.subtopic_problem_selection = [['']];
          if (['GP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
            setTimeout(() => {
              this.plot_graph_gp('', true);
            }, 500);
          }
        }
        else if (['MS', 'O', 'C', 'G', 'IM', 'IMS', 'MGP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
          this.subtopic_problem_selection = [[]];
          if (['O', 'C', 'G'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
            this.unique_m_st(this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices, '');
          }
          if (['MGP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
            setTimeout(() => {
              this.plot_graph_mgp('', true);
            }, 500);
          }
        }
        else if (['MFR', 'IDD', 'T'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
          var msp_nums: string[] = [];
          this.subtopic_problem_selection.push([]);
          for (let choice of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices)) {
            if (choice.length > 1 && choice[1] == ':' && !msp_nums.includes(choice[0])) {
              this.subtopic_problem_selection[0].push('');
              msp_nums.push(choice[0]);
            }
          }
        }
      }
      else {
        this.subtopic_problem_attempts = [];
        for (let part of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts)) {
          this.subtopic_problem_attempts.push(0);
          this.subtopic_attempt_path.push([]);
          this.subtopic_attempt_response.push('');
          this.subtopic_attempt_explanation.push([]);
          this.m_selection.push(["", ""]);
          this.m_submission.push({});
          this.c_submission.push({});
          if (['MC', 'FR', 'SR', 'MR', 'LR', 'IMC', 'LP', 'GP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
            this.subtopic_problem_selection.push(['']);
            if (['GP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
              setTimeout(() => {
                this.plot_graph_gp(part, true);
              }, 500);
            }
          }
          else if (['MS', 'O', 'C', 'G', 'IM', 'IMS', 'MGP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
            this.subtopic_problem_selection.push([]);
            if (['O', 'C', 'G'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
              this.unique_m_st(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices, part);
            }
            if (['MGP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
              setTimeout(() => {
                this.plot_graph_mgp(part, true);
              }, 500);
            }
          }
          else if (['MFR', 'IDD', 'T'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
            var msp_nums: string[] = [];
            this.subtopic_problem_selection.push([]);
            for (let choice of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices)) {
              if (choice.length > 1 && choice[1] == ':' && !msp_nums.includes(choice[0])) {
                this.subtopic_problem_selection[Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part)].push('');
                msp_nums.push(choice[0]);
              }
            }
          }
        }
      }
      this.st_refsheet_source = '../../' + this.dumpService.exam_attribute_dump[(this.subtopic_search_dump[this.subtopic_problem_number].Number).substring(0, (this.subtopic_search_dump[this.subtopic_problem_number].Number).indexOf('-'))].RefSheet;
      if (this.subtopic_search_dump[this.subtopic_problem_number].SuppTools.includes('Calculator') && this.show_calculator) {
        this.render_calc_st('');
      }
      else if (this.subtopic_search_dump[this.subtopic_problem_number].SuppTools.includes('Calculator-S') && this.show_calculator) {
        this.render_calc_st('sci');
      }
      else if (this.subtopic_search_dump[this.subtopic_problem_number].SuppTools.includes('Calculator-G') && this.show_calculator) {
        this.render_calc_st('graph');
      }
      for (let supp of this.subtopic_search_dump[this.subtopic_problem_number].SuppContent) {
        setTimeout(() => {
          this.read_supp_st_json(supp);
        }, 100 * (1 + this.subtopic_search_dump[this.subtopic_problem_number].SuppContent.indexOf(supp)));
      }
      if (this.subtopic_search_dump[this.subtopic_problem_number].Type == 'MP') {
        for (let part of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts)) {
          for (let block of this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Content) {
            if (block.startsWith(':table:')) {
              setTimeout(() => {
                this.read_table_st(block.slice(7));
              }, 100);
            }
          }
        }
      }
      if (this.subtopic_search_dump[this.subtopic_problem_number].Type != 'MP') {
        for (let block of this.subtopic_search_dump[this.subtopic_problem_number].Content) {
          if (block.startsWith(':table:')) {
            setTimeout(() => {
              this.read_table_st(block.slice(7));
            }, 100);
          }
        }
      }
    }
  }

  select_student_st(id: string) {
    //   this.exam_inprogress = false;
    //   this.progress_number = 0;
    if (id != this.selected_student_st) {
      console.log(this.subtopic_search_dump);
      this.selected_student_st = '';
      this.selected_student_data = this.my_students_data[id];
      const exam_history = this.my_students_data[id].exams.history;
      this.subtopic_problem_count = 0;
      this.subtopic_search_dump = {};
      for (const [ex, dump] of Object.entries(this.dumpService.e_dump_dict)) {
        if (Object.keys(exam_history).includes(ex) && (exam_history[ex] as any).status == "Completed") {
          for (const [num, prob] of Object.entries(dump)) {
            if (typeof prob.SubTopics != 'undefined' && !this.dumpService.exam_attribute_dump[ex].HideTopics) {
              if (prob.SubTopics.includes(this.selected_subtopic)) {
                if (prob.Topics[prob.SubTopics.indexOf(this.selected_subtopic)].includes(this.selected_topic)) {
                  this.subtopic_problem_count += 1;
                  this.subtopic_search_dump[this.subtopic_problem_count] = prob;
                  if (!('' + this.subtopic_search_dump[this.subtopic_problem_count].Number).includes('-')) {
                    this.subtopic_search_dump[this.subtopic_problem_count].Number = ex + '-' + '' + this.subtopic_search_dump[this.subtopic_problem_count].Number;
                  }
                }
              }
            }
          }
        }
      }
      Object.entries(this.subtopic_search_dump).sort(([, valueA], [, valueB]) => (this.authService.getStudProbSubmission2(id, valueA.Number)).timestamp - (this.authService.getStudProbSubmission2(id, valueB.Number)).timestamp);
      console.log(this.subtopic_search_dump);
      this.subtopic_streak_count = 0;
      var nums: string[] = [];
      var subs: any[] = [];
      for (let i = 0; i < Object.keys(this.subtopic_search_dump).length; i++) {
        nums.push(this.subtopic_search_dump[Object.keys(this.subtopic_search_dump)[i] as any].Number);
        subs.push(this.authService.getStudExamSubmission2(id, this.subtopic_search_dump[Object.keys(this.subtopic_search_dump)[i] as any].Number.substring(0, (this.subtopic_search_dump[Object.keys(this.subtopic_search_dump)[i] as any].Number).indexOf('-'))));
      }
      console.log(nums);
      console.log(subs);
      setTimeout(() => {
        for (let i = 1; i <= subs.length; i++) {
          this.subtopic_submission.push(subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)]);
          if (((subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct.length == 1 && subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct[0][0] == '✅') || (subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct.length > 1 && this.is_MP_correct(subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct)))) {
            this.subtopic_streak_count += 1;
          }
          else {
            this.subtopic_streak_count = 0;
          }
        }
      }, 100);
      for (const [ex, dump] of Object.entries(this.dumpService.e_dump_dict)) {
        if (!Object.keys(exam_history).includes(ex) || (exam_history[ex] as any).status != "Completed") {
          for (const [num, prob] of Object.entries(dump)) {
            if (typeof prob.SubTopics != 'undefined' && !this.dumpService.exam_attribute_dump[ex].HideTopics) {
              if (prob.SubTopics.includes(this.selected_subtopic)) {
                if (prob.Topics[prob.SubTopics.indexOf(this.selected_subtopic)].includes(this.selected_topic)) {
                  this.subtopic_problem_count += 1;
                  this.subtopic_search_dump[this.subtopic_problem_count] = prob;
                  if (!('' + this.subtopic_search_dump[this.subtopic_problem_count].Number).includes('-')) {
                    this.subtopic_search_dump[this.subtopic_problem_count].Number = ex + '-' + '' + this.subtopic_search_dump[this.subtopic_problem_count].Number;
                  }
                }
              }
            }
          }
        }
      }
      this.subtopic_new_problem_count = 0;
      this.subtopic_correct_problem_count = 0;
      for (const [ex, dump] of Object.entries(this.dumpService.e_dump_dict)) {
        if (!Object.keys(exam_history).includes(ex) || (exam_history[ex] as any).status != "Completed") {
          for (const [num, prob] of Object.entries(dump)) {
            if (typeof prob.SubTopics != 'undefined' && !this.dumpService.exam_attribute_dump[ex].HideTopics) {
              if (prob.SubTopics.includes(this.selected_subtopic)) {
                if (prob.Topics[prob.SubTopics.indexOf(this.selected_subtopic)].includes(this.selected_topic)) {
                  this.subtopic_new_problem_count += 1;
                }
              }
            }
          }
        }
        if (Object.keys(exam_history).includes(ex) && (exam_history[ex] as any).status == "Completed") {
          const exam_sub = this.authService.getStudExamSubmission2(id, ex);
          setTimeout(() => {
            for (const [num, prob] of Object.entries(dump)) {
              if (typeof prob.SubTopics != 'undefined' && !this.dumpService.exam_attribute_dump[ex].HideTopics) {
                if (prob.SubTopics.includes(this.selected_subtopic)) {
                  if (prob.Topics[prob.SubTopics.indexOf(this.selected_subtopic)].includes(this.selected_topic)) {
                    if (((exam_sub.problems as any)[num].Correct.length == 1 && (exam_sub.problems as any)[num].Correct[0][0] == '✅') || ((exam_sub.problems as any)[num].Correct.length > 1 && this.is_MP_correct((exam_sub.problems as any)[num].Correct))) {
                      this.subtopic_correct_problem_count += 1;
                    }
                  }
                }
              }
            }
          }, 100);
        }
      }
      console.log(this.subtopic_search_dump);
      setTimeout(() => {
        this.selected_student_st = id;
      }, 250);
    }
    else {
      this.selected_student_st = '';
    }
  }

  subtopic_correct_percent() {
    return (Math.round(100 * this.subtopic_correct_problem_count / (this.subtopic_problem_count - this.subtopic_new_problem_count)));
  }

  fav_std_includes(topic: string, subtopic: string) {
    this.favorite_std_set = [];
    for (let std of this.authService.userData.standards.favorites) {
      this.favorite_std_set.push(std as string[]);
    }
    this.includes_standard = false;
    if (this.favorite_std_set.length != 0) {
      for (const [key, std] of Object.entries(this.favorite_std_set)) {
        if (std[0] == topic && std[1] == subtopic) {
          this.includes_standard = true;
        }
      }
    }
    return this.includes_standard;
  }

  attempt_mc_st_problem(choice: string, part: string) {
    var part_num = 0;
    if (part != '') {
      var part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    if (choice != this.subtopic_problem_selection[part_num][0]) {
      this.subtopic_problem_attempts[part_num] += 1;
      this.subtopic_attempt_path[part_num].push(choice);
      this.subtopic_problem_selection[part_num] = [choice];
      for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
        if (this.subtopic_problem_number == +num) {
          if (Object.keys(prob.Parts).length == 0) {
            for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
              if (choice == ch) {
                this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
                if (key.Key.Correct == true) {
                  if (this.subtopic_problem_attempts[part_num] == 1) {
                    this.subtopic_streak_count += 1;
                    this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
                  }
                  else {
                    this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
                  }
                  this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
                }
                else {
                  this.subtopic_streak_count = 0;
                  this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                }
              }
            }
          }
          else {
            for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
              if (choice == ch) {
                this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
                if (key.Key.Correct == true) {
                  if (this.subtopic_problem_attempts[part_num] == 1) {
                    this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
                  }
                  else {
                    this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
                  }
                  this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
                }
                else {
                  this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                }
              }
            }
          }
        }
      }
    }
  }

  attempt_imc_st_problem(choice: string, part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    if (choice != this.subtopic_problem_selection[part_num][0]) {
      this.subtopic_problem_attempts[part_num] += 1;
      this.subtopic_attempt_path[part_num].push(choice);
      this.subtopic_problem_selection[part_num] = [choice];
      console.log(this.subtopic_problem_selection);
      for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
        if (this.subtopic_problem_number == +num) {
          if (Object.keys(prob.Parts).length == 0) {
            for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
              if (choice == ch) {
                this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
                if (key.Key.Correct == true) {
                  if (this.subtopic_problem_attempts[part_num] == 1) {
                    this.subtopic_streak_count += 1;
                    this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
                  }
                  else {
                    this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
                  }
                  this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
                }
                else {
                  this.subtopic_streak_count = 0;
                  this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                }
              }
            }
          }
          else {
            for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
              if (choice == ch) {
                this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
                if (key.Key.Correct == true) {
                  if (this.subtopic_problem_attempts[part_num] == 1) {
                    this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
                  }
                  else {
                    this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
                  }
                  this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
                }
                else {
                  this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                }
              }
            }
          }
        }
      }
    }
  }

  attempt_ms_st_problem(choice: string, part: string) {
    var part_num = 0;
    if (part != '') {
      var part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
      if (this.subtopic_problem_number == +num) {
        this.subtopic_attempt_response[part_num] = "";
        if (part == '') {
          for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
            if (choice == ch) {
              if (!this.subtopic_problem_selection[part_num].includes(choice)) {
                this.subtopic_attempt_explanation[part_num].push(key.Key.Rationale);
                this.subtopic_problem_selection[part_num].push(choice);
              }
              else {
                if (this.subtopic_problem_selection[part_num].indexOf(choice) != -1) {
                  this.subtopic_attempt_explanation[part_num].splice(this.subtopic_problem_selection[part_num].indexOf(choice), 1);
                  this.subtopic_problem_selection[part_num].splice(this.subtopic_problem_selection[part_num].indexOf(choice), 1);
                }
                else {
                  this.subtopic_attempt_explanation[part_num].pop();
                  this.subtopic_problem_selection[part_num].pop();
                }
              }
            }
            if ((key.Key.Correct == false && this.subtopic_problem_selection[part_num].includes(ch)) || (key.Key.Correct == true && !this.subtopic_problem_selection[part_num].includes(ch))) {
              this.subtopic_streak_count = 0;
              this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
            }
          }
        }
        else {
          for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
            if (choice == ch) {
              if (!this.subtopic_problem_selection[part_num].includes(choice)) {
                this.subtopic_attempt_explanation[part_num].push(key.Key.Rationale);
                this.subtopic_problem_selection[part_num].push(choice);
              }
              else {
                if (this.subtopic_problem_selection[part_num].indexOf(choice) != -1) {
                  this.subtopic_attempt_explanation[part_num].splice(this.subtopic_problem_selection[part_num].indexOf(choice), 1);
                  this.subtopic_problem_selection[part_num].splice(this.subtopic_problem_selection[part_num].indexOf(choice), 1);
                }
                else {
                  this.subtopic_attempt_explanation[part_num].pop();
                  this.subtopic_problem_selection[part_num].pop();
                }
              }
            }
            if ((key.Key.Correct == false && this.subtopic_problem_selection[part_num].includes(ch)) || (key.Key.Correct == true && !this.subtopic_problem_selection[part_num].includes(ch))) {
              this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
            }
          }
        }
        if (!this.subtopic_attempt_response[part_num].startsWith('That is not the correct answer')) {
          if (this.subtopic_problem_attempts[part_num] == 1) {
            this.subtopic_streak_count += 1;
            this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
          }
          else {
            this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
          }
          this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
        }
      }
    }
    this.subtopic_problem_attempts[part_num] += 1;
    this.subtopic_attempt_path.push(this.subtopic_problem_selection[part_num]);
  }

  attempt_ims_st_problem(choice: string, part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    this.subtopic_problem_attempts[part_num] += 1;
    this.subtopic_attempt_path[part_num].push(this.subtopic_problem_selection[part_num]);
    for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
      if (this.subtopic_problem_number == +num) {
        this.subtopic_attempt_response[part_num] = "";
        if (part == '') {
          for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
            if (choice == ch) {
              if (!this.subtopic_problem_selection[part_num].includes(choice)) {
                this.subtopic_attempt_explanation[part_num].push(key.Key.Rationale);
                this.subtopic_problem_selection[part_num].push(choice);
              }
              else {
                if (this.subtopic_problem_selection[part_num].indexOf(choice) != -1) {
                  this.subtopic_attempt_explanation[part_num].splice(this.subtopic_problem_selection[part_num].indexOf(choice), 1);
                  this.subtopic_problem_selection[part_num].splice(this.subtopic_problem_selection[part_num].indexOf(choice), 1);
                }
                else {
                  this.subtopic_attempt_explanation[part_num].pop();
                  this.subtopic_problem_selection[part_num].pop();
                }
              }
            }
            if ((key.Key.Correct == false && this.subtopic_problem_selection[part_num].includes(ch)) || (key.Key.Correct == true && !this.subtopic_problem_selection[part_num].includes(ch))) {
              this.subtopic_streak_count = 0;
              this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
            }
          }
        }
        else {
          for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
            if (choice == ch) {
              if (!this.subtopic_problem_selection[part_num].includes(choice)) {
                this.subtopic_attempt_explanation[part_num].push(key.Key.Rationale);
                this.subtopic_problem_selection[part_num].push(choice);
              }
              else {
                if (this.subtopic_problem_selection[part_num].indexOf(choice) != -1) {
                  this.subtopic_attempt_explanation[part_num].splice(this.subtopic_problem_selection[part_num].indexOf(choice), 1);
                  this.subtopic_problem_selection[part_num].splice(this.subtopic_problem_selection[part_num].indexOf(choice), 1);
                }
                else {
                  this.subtopic_attempt_explanation[part_num].pop();
                  this.subtopic_problem_selection[part_num].pop();
                }
              }
            }
            if ((key.Key.Correct == false && this.subtopic_problem_selection[part_num].includes(ch)) || (key.Key.Correct == true && !this.subtopic_problem_selection[part_num].includes(ch))) {
              this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
            }
          }
        }
        if (!this.subtopic_attempt_response[part_num].startsWith('That is not the correct answer')) {
          if (this.subtopic_problem_attempts[part_num] == 1) {
            this.subtopic_streak_count += 1;
            this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
          }
          else {
            this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
          }
          this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
        }
      }
    }
  }

  attempt_idd_st_problem(inum: string, choice: string, part: string) {
    var part_num = 0;
    var index: number = +inum - 1;
    if (part != '') {
      part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    if (choice != this.subtopic_problem_selection[part_num][index]) {
      this.subtopic_problem_attempts[part_num] += 1;
      this.subtopic_problem_selection[part_num][index] = choice;
      console.log(this.subtopic_problem_selection);
      this.subtopic_attempt_path[part_num].push(this.subtopic_problem_selection[part_num]);
      for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
        if (this.subtopic_problem_number == +num) {
          if (part == '') {
            for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
              if (inum + ':' + choice == ch) {
                console.log(ch);
                this.subtopic_attempt_explanation[part_num][index] = key.Key.Rationale;
                if (!key.Key.Correct) {
                  this.subtopic_streak_count = 0;
                  this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                  console.log(this.subtopic_attempt_response);
                }
              }
            }
          }
          else {
            for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
              if (inum + ':' + choice == ch) {
                this.subtopic_attempt_explanation[part_num][index] = key.Key.Rationale;
                if (!key.Key.Correct) {
                  this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                }
              }
            }
          }
          if (!this.subtopic_problem_selection[part_num].includes('')) {
            var correct_attempt: boolean = true;
            for (let i = 0; i < this.subtopic_problem_selection[part_num].length; i++) {
              if (part == '') {
                if (!this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices['' + (i + 1) + ':' + this.subtopic_problem_selection[part_num][i]].Key.Correct) {
                  correct_attempt = false;
                }
              }
              else {
                if (!this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices['' + (i + 1) + ':' + this.subtopic_problem_selection[part_num][i]].Key.Correct) {
                  correct_attempt = false;
                }
              }
            }
            if (correct_attempt) {
              if (this.subtopic_problem_attempts[part_num] == 1) {
                this.subtopic_streak_count += 1;
                this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
              }
              else {
                this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
              }
              this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
            }
          }
        }
      }
      setTimeout(() => {
        this.update_DD_st(inum, part);
      }, 100);
    }
    console.log(this.subtopic_problem_selection);
    console.log(this.subtopic_attempt_response);
  }

  attempt_lp_st_problem(numb: number, part: string) {
    var choice = '';
    var part_num = 0;
    if (part != '') {
      var part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
      for (let ch of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices)) {
        if (+this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices[ch].Choice == numb) {
          choice = ch[0];
        }
      }
    }
    else {
      for (let ch of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices)) {
        if (+this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices[ch].Choice == numb) {
          choice = ch[0];
        }
      }
    }
    if (choice != this.subtopic_problem_selection[part_num][0]) {
      this.subtopic_problem_attempts[part_num] += 1;
      this.subtopic_attempt_path[part_num].push([choice]);
      this.subtopic_problem_selection[part_num] = [choice];
      for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
        if (this.subtopic_problem_number == +num) {
          if (part == '') {
            for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
              if (ch[0] == choice) {
                this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
                if (key.Key.Correct == true) {
                  if (this.subtopic_problem_attempts[part_num] == 1) {
                    this.subtopic_streak_count += 1;
                    this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
                  }
                  else {
                    this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
                  }
                  this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
                }
                else {
                  this.subtopic_streak_count = 0;
                  this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                }
              }
            }
          }
          else {
            for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
              if (ch[0] == choice) {
                this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
                if (key.Key.Correct == true) {
                  if (this.subtopic_problem_attempts[part_num] == 1) {
                    this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
                  }
                  else {
                    this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
                  }
                  this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
                }
                else {
                  this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                }
              }
            }
          }
        }
      }
    }
  }

  attempt_gp_st_problem(xnum: number, ynum: number, part: string) {
    var choice = '(' + '' + xnum + ',' + '' + ynum + ')';
    var part_num = 0;
    if (part != '') {
      var part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    if (choice != this.subtopic_problem_selection[part_num][0]) {
      this.subtopic_problem_attempts[part_num] += 1;
      this.subtopic_attempt_path[part_num].push([choice]);
      this.subtopic_problem_selection[part_num] = [choice];
      for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
        if (this.subtopic_problem_number == +num) {
          if (part == '') {
            for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
              if (choice == key.Choice) {
                this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
                if (this.subtopic_problem_attempts[part_num] == 1) {
                  this.subtopic_streak_count += 1;
                  this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
                }
                else {
                  this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
                }
                this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
              }
              else {
                this.subtopic_streak_count = 0;
                this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
              }
            }
          }
          else {
            for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
              if (choice == key.Choice) {
                this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
                if (this.subtopic_problem_attempts[part_num] == 1) {
                  this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
                }
                else {
                  this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
                }
                this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
              }
              else {
                this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
              }
            }
          }
        }
      }
    }
  }

  attempt_mgp_st_problem(xnum: number, ynum: number, part: string) {
    var choice = '(' + '' + xnum + ',' + '' + ynum + ')';
    console.log(choice);
    var part_num = 0;
    if (part != '') {
      var part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    var choice_in_key = false;
    for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
      if (this.subtopic_problem_number == +num) {
        this.subtopic_attempt_response[part_num] = "";
        if (part == '') {
          if (this.subtopic_problem_selection[part_num].includes(choice)) {
            if (this.subtopic_problem_selection[part_num].indexOf(choice) != -1) {
              this.subtopic_attempt_explanation[part_num].splice(this.subtopic_problem_selection[part_num].indexOf(choice), 1);
              this.subtopic_problem_selection[part_num].splice(this.subtopic_problem_selection[part_num].indexOf(choice), 1);
            }
            else {
              this.subtopic_attempt_explanation[part_num].pop();
              this.subtopic_problem_selection[part_num].pop();
            }
          }
          else {
            this.subtopic_problem_selection[part_num].push(choice);
            for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
              if (choice == key.Choice) {
                choice_in_key = true;
                this.subtopic_attempt_explanation[part_num].push(key.Key.Rationale);
              }
            }
            if (!choice_in_key) {
              this.subtopic_attempt_explanation[part_num].push('');
            }
          }
          for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
            if (!this.subtopic_problem_selection[part_num].includes(key.Choice)) {
              console.log('missing selection');
              this.subtopic_streak_count = 0;
              this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
            }
          }
          var graph_key = [];
          for (let ch of Object.values(prob.AnswerChoices)) {
            graph_key.push(ch.Choice)
          }
          for (let sel of this.subtopic_problem_selection[part_num]) {
            if (!graph_key.includes(sel)) {
              console.log('extra selection');
              this.subtopic_streak_count = 0;
              this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
            }
          }
        }
        else {
          if (this.subtopic_problem_selection[part_num].includes(choice)) {
            if (this.subtopic_problem_selection[part_num].indexOf(choice) != -1) {
              this.subtopic_attempt_explanation[part_num].splice(this.subtopic_problem_selection[part_num].indexOf(choice), 1);
              this.subtopic_problem_selection[part_num].splice(this.subtopic_problem_selection[part_num].indexOf(choice), 1);
            }
            else {
              this.subtopic_attempt_explanation[part_num].pop();
              this.subtopic_problem_selection[part_num].pop();
            }
          }
          else {
            this.subtopic_problem_selection[part_num].push(choice);
            for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
              if (choice == key.Choice) {
                choice_in_key = true;
                this.subtopic_attempt_explanation[part_num].push(key.Key.Rationale);
              }
            }
            if (!choice_in_key) {
              this.subtopic_attempt_explanation[part_num].push('');
            }
          }
          for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
            if (!this.subtopic_problem_selection[part_num].includes(key.Choice)) {
              console.log('missing selection');
              this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
            }
          }
          var graph_key = [];
          for (let ch of Object.values(prob.Parts[part].AnswerChoices)) {
            graph_key.push(ch.Choice)
          }
          for (let sel of this.subtopic_problem_selection[part_num]) {
            if (!graph_key.includes(sel)) {
              console.log('extra selection');
              this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
            }
          }
        }
        if (!this.subtopic_attempt_response[part_num].startsWith('That is not the correct answer')) {
          if (this.subtopic_problem_attempts[part_num] == 1) {
            this.subtopic_streak_count += 1;
            this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
          }
          else {
            this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
          }
          this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
        }
      }
    }
    this.subtopic_problem_attempts[part_num] += 1;
    var current_selection = [];
    for (let sel of this.subtopic_problem_selection[part_num]) {
      current_selection.push(sel);
    }
    this.subtopic_attempt_path[part_num].push(current_selection);
    console.log(this.subtopic_attempt_path[part_num]);
  }

  attempt_t_st_problem(choice: string, inum: string, part: string) {
    var correct: boolean = false;
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    if (choice != this.subtopic_problem_selection[part_num][+inum - 1]) {
      this.subtopic_problem_attempts[part_num] += 1;
      this.subtopic_problem_selection[part_num][+inum - 1] = choice;
      this.subtopic_attempt_path[part_num].push(this.subtopic_problem_selection[part_num]);
      this.subtopic_attempt_response[part_num] = '';
      for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
        if (this.subtopic_problem_number == +num) {
          if (part == '') {
            for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
              if (inum + ':KEY' == ch && choice == key.Choice) {
                correct = true;
                this.subtopic_attempt_explanation[part_num][+inum - 1] = key.Key.Rationale;
              }
            }
          }
          else {
            for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
              if (inum + ':KEY' == ch && choice == key.Choice) {
                correct = true;
                this.subtopic_attempt_explanation[part_num][+inum - 1] = key.Key.Rationale;
              }
            }
          }
          if (!correct) {
            this.subtopic_attempt_explanation[part_num][+inum - 1] = '';
            this.subtopic_streak_count = 0;
            this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
          }
          for (let sub of Object.keys(this.subtopic_problem_selection[part_num])) {
            if (this.subtopic_problem_selection[part_num][+sub] == '') {
              this.subtopic_streak_count = 0;
              this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
            }
          }
          if (!this.subtopic_attempt_response[part_num].startsWith('That is not the correct answer')) {
            if (this.subtopic_problem_attempts[part_num] == 1) {
              this.subtopic_streak_count += 1;
              this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
            }
            else {
              this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
            }
            this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
          }
        }
      }
    }
  }

  attempt_fr_st_problem(choice: string, part: string) {
    var part_num = 0;
    if (part != '') {
      var part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    if (choice != this.subtopic_problem_selection[part_num][0]) {
      this.subtopic_problem_attempts[part_num] += 1;
      this.subtopic_attempt_path[part_num].push(choice);
      this.subtopic_problem_selection[part_num] = [choice];
      for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
        if (part == '') {
          if (this.subtopic_problem_number == +num) {
            for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
              if (choice == key.Choice) {
                this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
                if (this.subtopic_problem_attempts[part_num] == 1) {
                  this.subtopic_streak_count += 1;
                  this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
                }
                else {
                  this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
                }
                this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
              }
              else {
                this.subtopic_streak_count = 0;
                this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
              }
            }
          }
        }
        else {
          if (this.subtopic_problem_number == +num) {
            for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
              if (choice == key.Choice) {
                this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
                if (this.subtopic_problem_attempts[part_num] == 1) {
                  this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
                }
                else {
                  this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
                }
                this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
              }
              else {
                this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
              }
            }
          }
        }
      }
    }
  }

  attempt_mfr_st_problem(choice: string, inum: string, part: string) {
    var correct: boolean = false;
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    if (choice != this.subtopic_problem_selection[part_num][+inum - 1]) {
      this.subtopic_problem_attempts[part_num] += 1;
      this.subtopic_problem_selection[part_num][+inum - 1] = choice;
      this.subtopic_attempt_path[part_num].push(this.subtopic_problem_selection[part_num]);
      this.subtopic_attempt_response[part_num] = '';
      for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
        if (this.subtopic_problem_number == +num) {
          if (part == '') {
            for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
              if (inum + ':KEY' == ch && choice == key.Choice) {
                correct = true;
                this.subtopic_attempt_explanation[part_num][+inum - 1] = key.Key.Rationale;
              }
            }
          }
          else {
            for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
              if (inum + ':KEY' == ch && choice == key.Choice) {
                correct = true;
                this.subtopic_attempt_explanation[part_num][+inum - 1] = key.Key.Rationale;
              }
            }
          }
          if (!correct) {
            this.subtopic_attempt_explanation[part_num][+inum - 1] = '';
            this.subtopic_streak_count = 0;
            this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
          }
          for (let sub of Object.keys(this.subtopic_problem_selection[part_num])) {
            if (this.subtopic_problem_selection[part_num][+sub] == '') {
              this.subtopic_streak_count = 0;
              this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
            }
          }
          if (!this.subtopic_attempt_response[part_num].startsWith('That is not the correct answer')) {
            if (this.subtopic_problem_attempts[part_num] == 1) {
              this.subtopic_streak_count += 1;
              this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
            }
            else {
              this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
            }
            this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
          }
        }
      }
    }
  }

  attempt_sr_st_problem(choice: string, part: string) {
    var part_num = 0;
    if (part != '') {
      var part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    if (choice != this.subtopic_problem_selection[part_num][0]) {
      this.subtopic_problem_attempts[part_num] += 1;
      this.subtopic_attempt_path[part_num].push(choice);
      this.subtopic_problem_selection[part_num] = [choice];
      for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
        if (part == '') {
          if (this.subtopic_problem_number == +num) {
            for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
              if (choice == key.Choice) {
                this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
                if (this.subtopic_problem_attempts[part_num] == 1) {
                  this.subtopic_streak_count += 1;
                  this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
                }
                else {
                  this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
                }
                this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
              }
              else {
                this.subtopic_streak_count = 0;
                this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
              }
            }
          }
        }
        else {
          if (this.subtopic_problem_number == +num) {
            for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
              if (choice == key.Choice) {
                this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
                if (this.subtopic_problem_attempts[part_num] == 1) {
                  this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
                }
                else {
                  this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
                }
                this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
              }
              else {
                this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
              }
            }
          }
        }
      }
    }
  }

  attempt_mr_st_problem(response: string, part: string) {
    var part_num = 0;
    if (part != '') {
      var part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    if (response != this.subtopic_problem_selection[part_num][0]) {
      this.subtopic_problem_selection[part_num][0] = response;
      this.subtopic_problem_attempts[part_num] += 1;
    }
  }

  attempt_lr_st_problem(response: string, part: string) {
    var part_num = 0;
    if (part != '') {
      var part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    if (response != this.subtopic_problem_selection[part_num][0]) {
      this.subtopic_problem_selection[part_num][0] = response;
      this.subtopic_problem_attempts[part_num] += 1;
    }
  }

  get_choices_idd_st(num: string, part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    var choices: any = {};
    if (part == '') {
      for (let key of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices)) {
        if (key[0] == num) {
          choices[key[2]] = this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices[key].Choice;
        }
      }
    }
    else {
      for (let key of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices)) {
        if (key[0] == num) {
          choices[key[2]] = this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices[key].Choice;
        }
      }
    }
    return (choices);
  }

  shuffle_m_st(choices: any, part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    if (!Object.keys(this.shuffle_choices_st).includes('' + part_num)) {
      this.m_shuffled = false;
      this.shuffle_choices_st['' + part_num] = []
    }
    if (!this.m_shuffled) {
      if (part == '') {
        if (this.subtopic_search_dump[this.subtopic_problem_number].Type == 'G') {
          var trimmed_choices: string[] = [];
          for (let ch of Object.keys(choices)) {
            if (!trimmed_choices.includes(ch.substring(0, ch.length - 2))) {
              trimmed_choices.push(ch.substring(0, ch.length - 2));
            }
          }
          this.choices_sequence_st = trimmed_choices;
        }
        else {
          this.choices_sequence_st = Array.from(Object.keys(choices));
        }
      }
      else {
        if (this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type == 'G') {
          var trimmed_choices: string[] = [];
          for (let ch of Object.keys(choices)) {
            if (!trimmed_choices.includes(ch.substring(0, ch.length - 2))) {
              trimmed_choices.push(ch.substring(0, ch.length - 2));
            }
          }
          this.choices_sequence_st = trimmed_choices;
        }
        else {
          this.choices_sequence_st = Array.from(Object.keys(choices));
        }
      }
      this.random_list = [];
      this.shuffle_choices_st['' + part_num] = [];
      const num_choices1 = this.choices_sequence_st.length;
      for (let i = 0; i < num_choices1; i++) {
        if (this.choices_sequence_st[num_choices1 - i - 1] == '' || this.choices_sequence_st[num_choices1 - i - 1][0] == ' ') {
          this.choices_sequence_st.splice(num_choices1 - i - 1, 1);
        }
      }
      const num_choices = this.choices_sequence_st.length;
      for (let i = 0; i < num_choices; i++) {
        this.random_index = Math.floor(Math.random() * this.choices_sequence_st.length);
        this.random_list.push(this.choices_sequence_st[this.random_index]);
        this.shuffle_choices_st['' + part_num][i] = this.choices_sequence_st[this.random_index];
        this.choices_sequence_st.splice(this.random_index, 1);
        console.log(i);
        console.log(this.random_index);
      }
      console.log(this.shuffle_choices_st);
      this.m_shuffled = true;
    }
    return (this.shuffle_choices_st['' + part_num].sort());
  }

  unique_m_st(choices: any, part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    this.unique_choices_st[part_num] = [];
    for (const [key, choice] of Object.entries(choices)) {
      if ((choice as any).Choice != '' && !this.unique_choices_st[part_num].includes((choice as any).Choice)) {
        if (this.subtopic_search_dump[this.subtopic_problem_number].Type == 'O' || (this.subtopic_search_dump[this.subtopic_problem_number].Type == 'MP' && this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type == 'O')) {
          this.unique_choices_st[part_num].push((choice as any).Choice + ':' + key[0])
        }
        else if (!this.unique_choices_st[part_num].includes((choice as any).Choice)) {
          this.unique_choices_st[part_num].push((choice as any).Choice)
        }
        this.m_submission[part_num][(choice as any).Choice[0]] = "";
        if (!Object.keys(this.c_submission[part_num]).includes((choice as any).Choice[0])) {
          this.c_submission[part_num][(choice as any).Choice[0]] = [""];
        }
        if (key[0] == ' ' && (choice as any).Key.Correct) {
          this.m_submission[part_num][(choice as any).Choice[0]] = key;
          this.c_submission[part_num][(choice as any).Choice[0]] = [key].concat(this.c_submission[part_num][(choice as any).Choice[0]]);
        }
        this.subtopic_problem_selection[part_num][+(choice as any).Choice[0] - 1] = [""];
        this.subtopic_attempt_explanation[part_num][+(choice as any).Choice[0] - 1] = [""];
      }
    }
    this.unique_choices_st[part_num].sort();
    console.log(this.unique_choices_st[part_num].sort());
    // return (unique_choices);
  }

  select_m_choice_st(ch: string, p: number, part: string) {
      var part_num = 0;
      if (part != '') {
          part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
      }
      this.m_selection[part_num][p] = ch;
      if (this.m_selection[part_num][0] != '' && this.m_selection[part_num][1] != '') {
          this.m_submission[part_num][this.m_selection[part_num][1]] = this.m_selection[part_num][0];
          this.subtopic_problem_selection[part_num][+this.m_selection[part_num][1] - 1] = this.m_selection[part_num][0][0];
          // this.subtopic_attempt_path[part_num].push();
          this.subtopic_problem_attempts[part_num] += 1;
          this.is_m_correct_st(part, true);
          this.m_selection[part_num] = ["", ""];
      }
      console.log(this.subtopic_problem_selection);
      console.log(this.subtopic_attempt_explanation);
  }

  remove_m_choice_st(ch: string, part: string) {
      var part_num = 0;
      if (part != '') {
          part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
      }
      this.m_submission[part_num][ch] = '';
      this.subtopic_problem_selection[part_num][+ch - 1] = '';
      this.subtopic_attempt_explanation[part_num][+ch - 1] = '';
      this.select_m_choice_st('', 1, part)
  }

  is_matched_st(ch: string, p: number, part: string) {
      var part_num = 0;
      if (part != '') {
          part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
      }
      if (p == 0) {
          if (Object.values(this.m_submission[part_num]).includes(ch)) {
              return true;
          }
          else if (Object.keys(this.c_submission[part_num]).length != 0) {
              for (let cat of Object.keys(this.c_submission[part_num])) {
                  if (Object.values(this.c_submission[part_num][cat]).includes(ch)) {
                      return true;
                  }
              }
              return false;
          }
          else {
              return false;
          }
      }
      else if (p == 1) {
          if (Object.keys(this.m_submission[part_num]).includes(ch) && this.m_submission[part_num][ch] != '') {
              return true;
          }
          else {
              return false;
          }
      }
      else {
          return false
      }
  }

  select_c_choice_st(ch: string, p: number, part: string) {
      var part_num = 0;
      if (part != '') {
          part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
      }
      this.m_selection[part_num][p] = ch;
      if (this.m_selection[part_num][0] != '' && this.m_selection[part_num][1] != '' && !this.c_submission[part_num][this.m_selection[part_num][1]].includes(this.m_selection[part_num][0])) {
          this.c_submission[part_num][this.m_selection[part_num][1]] = [this.m_selection[part_num][0]].concat(this.c_submission[part_num][this.m_selection[part_num][1]]);
          var cat_choices: string[] = [];
          for (let choice of this.c_submission[part_num][this.m_selection[part_num][1]]) {
              if (choice != '') {
                  cat_choices.push(choice[0]);
              }
          }
          this.subtopic_problem_selection[part_num][+this.m_selection[part_num][1] - 1] = cat_choices;
          this.subtopic_attempt_path[part_num].push();
          this.subtopic_problem_attempts[part_num] += 1;
          if (this.subtopic_search_dump[this.subtopic_problem_number].Type == 'C' || (this.subtopic_search_dump[this.subtopic_problem_number].Type == 'MP' && this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type == 'C')) {
              this.is_c_correct_st(part, true);
          }
          else if (this.subtopic_search_dump[this.subtopic_problem_number].Type == 'G' || (this.subtopic_search_dump[this.subtopic_problem_number].Type == 'MP' && this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type == 'G')) {
              this.is_g_correct_st(part, true);
          }
          this.m_selection[part_num] = ["", ""];
      }
      console.log(this.m_selection);
      console.log(this.c_submission);
  }

  remove_c_choice_st(ch: string, part: string) {
      var part_num = 0;
      if (part != '') {
          part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
      }
      for (let cat of Object.keys(this.c_submission[part_num])) {
          if (this.c_submission[part_num][cat].includes(ch)) {
              if (this.c_submission[part_num][cat].indexOf(ch) != -1) {
                  this.c_submission[part_num][cat].splice(this.c_submission[part_num][cat].indexOf(ch), 1);
              }
              else {
                  this.c_submission[part_num][cat].pop()
              }
          }
      }
      for (let cat of this.subtopic_problem_selection[part_num]) {
          if (cat.includes(ch)) {
              if (cat.indexOf(ch) != -1) {
                  this.subtopic_attempt_explanation[part_num][this.subtopic_problem_selection[part_num].indexOf(cat)].splice(cat.indexOf(ch), 1);
                  cat.splice(cat.indexOf(ch), 1)
              }
              else {
                  this.subtopic_attempt_explanation[part_num][this.subtopic_problem_selection[part_num].indexOf(cat)].pop();
                  cat.pop();
              }
          }
      }
      this.is_c_correct_st(part, true);
      this.select_c_choice_st('', 1, part);
  }

  remove_g_choice_st(ch: string, cat: string, part: string) {
      var part_num = 0;
      if (part != '') {
          part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
      }
      if (this.c_submission[part_num][cat].includes(ch)) {
          if (this.c_submission[part_num][cat].indexOf(ch) != -1) {
              this.c_submission[part_num][cat].splice(this.c_submission[part_num][cat].indexOf(ch), 1);
          }
          else {
              this.c_submission[part_num][cat].pop()
          }
      }
      if (this.subtopic_problem_selection[part_num][+cat - 1].includes(ch)) {
          if (this.subtopic_problem_selection[part_num][+cat - 1].indexOf(ch) != -1) {
              this.subtopic_attempt_explanation[part_num][this.subtopic_problem_selection[part_num].indexOf(this.subtopic_problem_selection[part_num][+cat - 1])].splice(this.subtopic_problem_selection[part_num][+cat - 1].indexOf(ch), 1);
              this.subtopic_problem_selection[part_num][+cat - 1].splice(this.subtopic_problem_selection[part_num][+cat - 1].indexOf(ch), 1)
          }
          else {
              this.subtopic_attempt_explanation[part_num][this.subtopic_problem_selection[part_num].indexOf(this.subtopic_problem_selection[part_num][+cat - 1])].pop();
              this.subtopic_problem_selection[part_num][+cat - 1].pop();
          }
      }
      this.is_g_correct_st(part, true);
      this.select_c_choice_st('', 1, part);
  }

  is_idd_correct_st(part: string) {
      var part_num = 0;
      if (part != '') {
          part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
      }
      for (let choice of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices)) {
          if (this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices[choice].Key.Correct) {
              if (this.subtopic_problem_selection[part_num][(+this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices[choice].Choice[0]) - 1] != this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices[choice].Choice[2]) {
                  return false;
              }
          }
      }
      return true;
  }

  is_m_correct_st(part: string, fetti: boolean) {
      var part_num = 0;
      var correct: boolean = true;
      if (part != '') {
          part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
      }
      var unique_c: string[] = [];
      if (Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).length == 0) {
          for (let choice of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices)) {
              if (!unique_c.includes(choice) && choice[0] != ' ' && choice != '') {
                  unique_c.push(choice)
              }
          }
          for (let choice of unique_c) {
              if (this.m_submission[part_num][this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices[choice].Choice[0]] == choice) {
                  if (fetti) {
                      this.subtopic_attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices[this.m_selection[part_num][0]].Key.Rationale;
                  }
              }
              else if (this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices[choice].Key.Correct) {
                  this.subtopic_streak_count = 0;
                  this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                  this.subtopic_attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = '';
                  correct = false;
              }
          }
      }
      else {
          for (let choice of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices)) {
              if (!unique_c.includes(choice) && choice[0] != ' ' && choice != '') {
                  unique_c.push(choice)
              }
          }
          for (let choice of unique_c) {
              if (this.m_submission[part_num][this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices[choice].Choice[0]] == choice) {
                  if (fetti) {
                      this.subtopic_attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices[this.m_selection[part_num][0]].Key.Rationale;
                  }
              }
              else if (this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices[choice].Key.Correct) {
                  this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                  this.subtopic_attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = '';
                  correct = false;
              }
          }
      }
      for (let sub of Object.keys(this.m_submission[part_num])) {
          if (this.m_submission[part_num][sub].length == 1 && this.m_submission[part_num][sub][0] == '') {
              this.subtopic_streak_count = 0;
              this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
              correct = false;
          }
      }
      if (correct && this.subtopic_problem_attempts[part_num] == 1) {
          this.subtopic_streak_count += 1;
          this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
      }
      else if (correct) {
          this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
      }
      // for (let selec of this.m_submission[part_num])
      if (correct && fetti) {
          this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
      }
      return correct;
  }

  is_c_correct_st(part: string, fetti: boolean) {
      var part_num = 0;
      var correct: boolean = true;
      if (part != '') {
          part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
      }
      var unique_c: string[] = [];
      if (Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).length == 0) {
          for (let choice of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices)) {
              if (!unique_c.includes(choice) && choice[0] != ' ' && choice != '') {
                  unique_c.push(choice)
              }
          }
          for (let choice of unique_c) {
              if (this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices[choice].Choice != '' && this.c_submission[part_num][this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices[choice].Choice[0]].includes(choice)) {
                  if (fetti) {
                      console.log(this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices[this.m_selection[part_num][0]].Key.Rationale);
                      if (this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices[this.m_selection[part_num][0]].Choice[0] == this.m_selection[part_num][1]) {
                          this.subtopic_attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices[this.m_selection[part_num][0]].Key.Rationale].concat(this.subtopic_attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                      }
                      else {
                          this.subtopic_attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [''].concat(this.subtopic_attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                      }
                  }
              }
              else {
                  this.subtopic_streak_count = 0;
                  this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                  correct = false;
              }
          }
      }
      else {
          for (let choice of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices)) {
              if (!unique_c.includes(choice) && choice[0] != ' ' && choice != '') {
                  unique_c.push(choice)
              }
          }
          for (let choice of unique_c) {
              if (this.c_submission[part_num][this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices[choice].Choice[0]].includes(choice)) {
                  if (fetti) {
                      console.log(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices[this.m_selection[part_num][0]].Key.Rationale);
                      if (this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices[this.m_selection[part_num][0]].Choice[0] == this.m_selection[part_num][1]) {
                          this.subtopic_attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices[this.m_selection[part_num][0]].Key.Rationale].concat(this.subtopic_attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                      }
                      else {
                          this.subtopic_attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [''].concat(this.subtopic_attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                      }
                  }
              }
              else {
                  this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                  correct = false;
              }
          }
      }
      if (correct && this.subtopic_problem_attempts[part_num] == 1) {
          this.subtopic_streak_count += 1;
          this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
      }
      else if (correct) {
          this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
      }
      if (correct && fetti) {
          this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
      }
      return correct;
  }

  is_g_correct_st(part: string, fetti: boolean) {
      var part_num = 0;
      var correct: boolean = true;
      if (part != '') {
          part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
      }
      var unique_c: string[] = [];
      if (Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).length == 0) {
          for (let choice of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices)) {
              if (!unique_c.includes(choice.substring(0, choice.length - 2)) && choice.substring(0, choice.length - 2) != '') {
                  unique_c.push(choice.substring(0, choice.length - 2));
              }
          }
          for (let choice of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices)) {
              if (choice.substring(0, choice.length - 2) != '' && this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices[choice].Key.Correct && !this.c_submission[part_num][choice[choice.length - 1]].includes(choice.substring(0, choice.length - 2))) {
                  this.subtopic_streak_count += 0;
                  this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                  correct = false;
              }
          }
          for (let cat of Object.keys(this.c_submission[part_num])) {
              for (let choice of this.c_submission[part_num][cat]) {
                  if (choice != '' && Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices).includes(choice + ':' + cat)) {
                      if (fetti) {
                          console.log(choice + ':' + cat);
                          console.log(this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices[choice + ':' + cat].Key.Rationale);
                          if (this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices[choice + ':' + cat].Choice[0] == this.m_selection[part_num][1]) {
                              this.subtopic_attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices[choice + ':' + cat].Key.Rationale].concat(this.subtopic_attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                          }
                          else {
                              this.subtopic_attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [''].concat(this.subtopic_attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                          }
                      }
                  }
                  else if (choice != '') {
                      this.subtopic_streak_count = 0;
                      this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                      correct = false;
                  }
              }
          }
      }
      else {
          for (let choice of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices)) {
              if (!unique_c.includes(choice.substring(0, choice.length - 2)) && choice.substring(0, choice.length - 2) != '') {
                  unique_c.push(choice.substring(0, choice.length - 2))
              }
          }
          for (let choice of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices)) {
              if (choice.substring(0, choice.length - 2) != '' && this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices[choice].Key.Correct && !this.c_submission[part_num][choice[choice.length - 1]].includes(choice.substring(0, choice.length - 2))) {
                  this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                  correct = false;
              }
          }
          for (let cat of Object.keys(this.c_submission[part_num])) {
              for (let choice of this.c_submission[part_num][cat]) {
                  if (choice != '' && Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices).includes(choice + ':' + cat)) {
                      if (fetti) {
                          console.log(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices[choice + ':' + cat].Key.Rationale);
                          if (this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices[choice + ':' + cat].Choice[0] == this.m_selection[part_num][1]) {
                              this.subtopic_attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices[choice + ':' + cat].Key.Rationale].concat(this.subtopic_attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                          }
                          else {
                              this.subtopic_attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [''].concat(this.subtopic_attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                          }
                      }
                  }
                  else if (choice != '') {
                      this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                      correct = false;
                  }
              }
          }
      }
      if (correct && this.subtopic_problem_attempts[part_num] == 1) {
          this.subtopic_streak_count += 1;
          this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
      }
      else if (correct) {
          this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
      }
      if (correct && fetti) {
          this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
      }
      return correct;
  }

  get_o_key(probs: any) {
    var o_key: any[] = []
    var num_options: number = 0
    for (let ch of Object.keys(probs)) {
      if (+probs[ch].Choice[0] > num_options) {
        num_options = +probs[ch].Choice[0];
      }
    }
    for (let i: number = 0; i < num_options; i++) {
      o_key.push([]);
    }
    for (let ch of Object.keys(probs)) {
      if (probs[ch].Key.Correct) {
        o_key[+probs[ch].Choice[0] - 1].push(ch[0]);
      }
    }
    return o_key;
  }

  get_c_key(probs: any) {
    var c_key: any[] = []
    var num_options: number = 0
    for (let ch of Object.keys(probs)) {
      if (+probs[ch].Choice[0] > num_options) {
        num_options = +probs[ch].Choice[0];
      }
    }
    for (let i: number = 0; i < num_options; i++) {
      c_key.push([]);
    }
    for (let ch of Object.keys(probs)) {
      if (probs[ch].Key.Correct) {
        c_key[+probs[ch].Choice[0] - 1].push(ch[0]);
      }
    }
    return c_key;
  }

  get_g_key(probs: any) {
    var g_key: any[] = []
    var num_options: number = 0
    for (let ch of Object.keys(probs)) {
      if (+probs[ch].Choice[0] > num_options) {
        num_options = +probs[ch].Choice[0];
      }
    }
    for (let i: number = 0; i < num_options; i++) {
      g_key.push([]);
    }
    for (let ch of Object.keys(probs)) {
      if (probs[ch].Key.Correct) {
        g_key[+probs[ch].Choice[0] - 1].push(ch[0]);
      }
    }
    return g_key;
  }

  hover_row(index: string, hover: boolean) {
    if (hover) {
      this.results_hover = index;
    }
    else {
      this.results_hover = '';
    }
  }

  filter_prob_results(probs: any) {
    console.log(probs);
    var filt_probs = [];
    if (probs != undefined && Object.keys(probs).length > 0) {
      for (let prob of Object.values(probs)) {
        console.log(prob);
        if (prob != undefined) {
          filt_probs.push(prob as any);
        }
      }
    }
    return filt_probs;
  }

  is_MP_correct(choices: any) {
    var comp = true;
    for (let part of choices) {
      for (let ch of part) {
        if (ch != '✅') {
          comp = false;
        }
      }
    }
    return comp;
  }

  is_MP_partial(choices: any) {
    var comp = false;
    for (let part of choices) {
      for (let ch of part) {
        if (ch == '✅') {
          comp = true;
        }
      }
    }
    return comp;
  }

  is_MP_st_complete() {
    var comp = true;
    for (let resp of this.subtopic_attempt_response) {
      if (resp == '' || !resp.startsWith('Correct')) {
        comp = false;
      }
    }
    return comp;
  }

  update_DD_st(index: string, part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
      if (this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices[index + ':' + this.subtopic_problem_selection[part_num][+index - 1]].Key.Correct) {
        const DDICel: string = "DDInputC-" + index;
        var dropdown: any = document.getElementById(DDICel);
      }
      else {
        const DDIIel: string = "DDInputI-" + index;
        var dropdown: any = document.getElementById(DDIIel);
      }
    }
    else {
      if (this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices[index + ':' + this.subtopic_problem_selection[part_num][+index - 1]].Key.Correct) {
        const DDICel: string = "DDInputC-" + index;
        var dropdown: any = document.getElementById(DDICel);
      }
      else {
        const DDIIel: string = "DDInputI-" + index;
        var dropdown: any = document.getElementById(DDIIel);
      }
    }
    dropdown.value = this.subtopic_problem_selection[part_num][+index - 1];
  }

  get_T_st(index: string, part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    const TIel: string = "inputT-" + part + '-' + index;
    var input: any = document.getElementById(TIel);
    return input.value;
  }

  get_MFR_st(index: string, part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    const MFRIel: string = "inputMFR-" + part + "-" + index;
    var dropdown: any = document.getElementById(MFRIel);
    return dropdown.value;
  }

  next_problem_st() {
    this.subtopic_problem_number += 1;
    if (this.subtopic_problem_number > this.subtopic_problem_count) {
      this.selected_subtopic = '';
      this.standard_id = '';
    }
    else {
      this.subtopic_attempt_path = [];
      this.subtopic_attempt_response = [];
      this.subtopic_attempt_explanation = [];
      this.subtopic_problem_selection = [];
      this.m_shuffled = false;
      this.m_selection = [];
      this.m_submission = [];
      this.c_submission = [];
      this.shuffle_choices_st = {};
      this.unique_choices_st = [];
      if (Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).length == 0) {
        this.subtopic_problem_attempts = [0];
        this.subtopic_attempt_path = [[]];
        this.subtopic_attempt_response = [''];
        this.subtopic_attempt_explanation = [[]];
        this.m_selection = [["", ""]];
        this.m_submission = [{}];
        this.c_submission = [{}];
        if (['MC', 'FR', 'SR', 'MR', 'LR', 'IMC', 'LP', 'GP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
          this.subtopic_problem_selection = [['']];
          if (['GP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
            setTimeout(() => {
              this.plot_graph_gp('', true);
            }, 500);
          }
        }
        else if (['MS', 'O', 'C', 'G', 'IM', 'IMS', 'MGP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
          this.subtopic_problem_selection = [[]];
          if (['O', 'C', 'G'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
            this.unique_m_st(this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices, '');
          }
          if (['MGP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
            setTimeout(() => {
              this.plot_graph_mgp('', true);
            }, 500);
          }
        }
        else if (['MFR', 'IDD', 'T'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
          var msp_nums: string[] = [];
          this.subtopic_problem_selection.push([]);
          for (let choice of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices)) {
            if (choice.length > 1 && choice[1] == ':' && !msp_nums.includes(choice[0])) {
              this.subtopic_problem_selection[0].push('');
              msp_nums.push(choice[0]);
            }
          }
        }
      }
      else {
        this.subtopic_problem_attempts = [];
        for (let part of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts)) {
          this.subtopic_problem_attempts.push(0);
          this.subtopic_attempt_path.push([]);
          this.subtopic_attempt_response.push('');
          this.subtopic_attempt_explanation.push([]);
          this.m_selection.push(["", ""]);
          this.m_submission.push({});
          this.c_submission.push({});
          if (['MC', 'FR', 'SR', 'MR', 'LR', 'IMC', 'LP', 'GP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
            this.subtopic_problem_selection.push(['']);
            if (['GP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
              setTimeout(() => {
                this.plot_graph_gp(part, true);
              }, 500);
            }
          }
          else if (['MS', 'O', 'C', 'G', 'IM', 'IMS', 'MGP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
            this.subtopic_problem_selection.push([]);
            if (['O', 'C', 'G'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
              this.unique_m_st(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices, part);
            }
            if (['MGP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
              setTimeout(() => {
                this.plot_graph_mgp(part, true);
              }, 500);
            }
          }
          else if (['MFR', 'IDD', 'T'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
            var msp_nums: string[] = [];
            this.subtopic_problem_selection.push([]);
            for (let choice of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices)) {
              if (choice.length > 1 && choice[1] == ':' && !msp_nums.includes(choice[0])) {
                this.subtopic_problem_selection[Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part)].push('');
                msp_nums.push(choice[0]);
              }
            }
          }
        }
      }
      this.st_refsheet_source = '../../' + this.dumpService.exam_attribute_dump[(this.subtopic_search_dump[this.subtopic_problem_number].Number).substring(0, (this.subtopic_search_dump[this.subtopic_problem_number].Number).indexOf('-'))].RefSheet;
      if (this.subtopic_search_dump[this.subtopic_problem_number].SuppTools.includes('Calculator') && this.show_calculator) {
        this.render_calc_st('');
      }
      else if (this.subtopic_search_dump[this.subtopic_problem_number].SuppTools.includes('Calculator-S') && this.show_calculator) {
        this.render_calc_st('sci');
      }
      else if (this.subtopic_search_dump[this.subtopic_problem_number].SuppTools.includes('Calculator-G') && this.show_calculator) {
        this.render_calc_st('graph');
      }
      for (let supp of this.subtopic_search_dump[this.subtopic_problem_number].SuppContent) {
        setTimeout(() => {
          this.read_supp_st_json(supp);
        }, 100 * (1 + this.subtopic_search_dump[this.subtopic_problem_number].SuppContent.indexOf(supp)));
      }
      if (this.subtopic_search_dump[this.subtopic_problem_number].Type == 'MP') {
        for (let part of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts)) {
          for (let block of this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Content) {
            if (block.startsWith(':table:')) {
              setTimeout(() => {
                this.read_table_st(block.slice(7));
              }, 100);
            }
          }
        }
      }
      if (this.subtopic_search_dump[this.subtopic_problem_number].Type != 'MP') {
        for (let block of this.subtopic_search_dump[this.subtopic_problem_number].Content) {
          if (block.startsWith(':table:')) {
            setTimeout(() => {
              this.read_table_st(block.slice(7));
            }, 100);
          }
        }
      }
    }
  }

  render_calc_st(type: string) {
      setTimeout(() => {
          var calculatorCanvas = document.getElementById('calculatorCanvas');
          if (this.screenWidth > 600) {
              if (type == '') {
                  const calculator: any = Desmos.FourFunctionCalculator(calculatorCanvas, {projectorMode: true, settingsMenu: false});
              }
              else if (type == 'sci') {
                  const calculator: any = Desmos.ScientificCalculator(calculatorCanvas, {projectorMode: true, settingsMenu: false});
              }
              else if (type == 'graph') {
                  const calculator: any = Desmos.GraphingCalculator(calculatorCanvas, {projectorMode: true, settingsMenu: false});
              }
          }
          else {
              const calculator: any = Desmos.FourFunctionCalculator(calculatorCanvas, {projectorMode: true, settingsMenu: false});
          }
      }, 100);
  }

  render_protractor() {
      setTimeout(() => {
          this.dragElement(document.getElementById("protractorImage") as HTMLElement, 'protractor');
          this.rotateElement(document.getElementById("protractorRotate") as HTMLElement, 'protractor');
      }, 100);
  }

  render_ruler() {
      setTimeout(() => {
          this.dragElement(document.getElementById("rulerImage") as HTMLElement, 'ruler');
          this.rotateElement(document.getElementById("rulerRotate") as HTMLElement, 'ruler');
      }, 100);
  }

  dragElement(elmnt: HTMLElement, tool: string) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      var target: any = null;
      if (tool == 'protractor') {
          target = document.getElementById("protractorCanvas");
      }
      else if (tool == 'ruler') {
          target = document.getElementById("rulerCanvas");
      }
      elmnt.onmousedown = dragMouseDown;
      elmnt.ontouchstart = dragMouseDown;

      function dragMouseDown(e: any) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          document.ontouchend = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
          document.ontouchmove = elementDragT;
      }

      function elementDrag(e: any) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          (target as HTMLElement).style.top = ((target as HTMLElement).offsetTop - pos2) + "px";
          (target as HTMLElement).style.left = ((target as HTMLElement).offsetLeft - pos1) + "px";
      }

      function elementDragT(e: any) {
          e = e || window.event;
          e.preventDefault();
          for (let target of e.targetTouches) {
              // calculate the new cursor position:
              pos1 = pos3 - target.clientX;
              pos2 = pos4 - target.clientY;
              pos3 = target.clientX;
              pos4 = target.clientY;
              // set the element's new position:
              elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
              elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
          }
      }

      function closeDragElement() {
          // stop moving when mouse button is released:
          document.onmouseup = null;
          document.ontouchend = null;
          document.onmousemove = null;
          document.ontouchmove = null;
      }
  }

  rotateElement(elmnt: HTMLElement, tool: string) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0, rotationCenterX = 0, rotationCenterY = 0, currentAngle = 0;
      var target: any = null;
      if (tool == 'protractor') {
          target = document.getElementById("protractorCanvas");
      }
      else if (tool == 'ruler') {
          target = document.getElementById("rulerCanvas");
      }
      elmnt.onmousedown = rotateMouseDown;
      elmnt.ontouchstart = rotateMouseDown;

      function rotateMouseDown(e: any) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          rotationCenterX = (target as HTMLElement).offsetLeft + (target as HTMLElement).offsetWidth / 2;
          rotationCenterY = (target as HTMLElement).offsetTop + (target as HTMLElement).offsetHeight / 2;
          currentAngle = getDraggableAngle(e);
          document.onmouseup = closeRotateElement;
          document.ontouchend = closeRotateElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementRotate;
          document.ontouchmove = elementRotateT;
      }

      function elementRotate(e: any) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          const angle = getDraggableAngle(e);
          // set the element's new position:
          (target as HTMLElement).style.transform = `rotate(${angle}rad)`;
      }

      function elementRotateT(e: any) {
          e = e || window.event;
          e.preventDefault();
          for (let target of e.targetTouches) {
              // calculate the new cursor position:
              const angle = getDraggableAngle(e);
              // set the element's new position:
              (target as HTMLElement).style.transform = `rotate(${angle}rad)`;
          }
      }

      function getDraggableAngle(event: any) {
          const angle = Math.atan2(
              event.clientY - rotationCenterY,
              event.clientX - rotationCenterX
          );
          console.log(angle - currentAngle);
          return angle - currentAngle;
      }

      function closeRotateElement() {
          // stop moving when mouse button is released:
          document.onmouseup = null;
          document.ontouchend = null;
          document.onmousemove = null;
          document.ontouchmove = null;
      }
  }

  read_supp_json(path: string) {
    this.http.get("./assets/" + path).subscribe(res => {
      console.log(res);
      console.log(JSON.stringify(res));
      this.supp_dump[path] = res;
      for (let block of this.supp_dump[path].Content) {
        if (block[1].endsWith('.json')) {
          this.read_supp_json(block[1]);
        }
      }
    });
  }

  read_supp_st_json(path: string) {
    this.http.get("./assets/" + path).subscribe(res => {
      console.log(res);
      console.log(JSON.stringify(res));
      this.supp_st_dump[path] = res;
      for (let block of this.supp_st_dump[path].Content) {
        if (block[1].endsWith('.json')) {
          this.read_supp_st_json(block[1]);
        }
      }
    });
  }

  read_table_st(path: string) {
    // var table: any = {};
    this.http.get("./assets/" + path).subscribe(res => {
      console.log(res);
      console.log(JSON.stringify(res));
      this.supp_st_dump[path] = res;
      // table = res;
    });
    // return (table);
  }

  plot_graph_gp(part: string, subtop: boolean) {
    var myPlot: any = document.getElementById('myPlot');
    var x = [];
    var y = [];
    for (let i = -250; i <= 250; i++) {
      x.push(i);
    }
    for (let i = -250; i <= 250; i++) {
      y.push(i);
    }
    var z = [];
    for (let i = 0; i < y.length; i++) {
      var temp = [];
      for (let j = 0; j < x.length; j++) {
        temp.push(0);
      }
      z.push(temp);
    }
    var map: any = {
      x: x,
      y: y,
      z: z,
      type: 'heatmap',
      colorscale: [['0.0', 'rgba(0, 0, 0, 0)'], ['1.0', 'rgba(0, 0, 0, 0)']],
      xgap: 1,
      ygap: 1,
      hoverinfo: "x+y",
      showscale: false
    }
    var sub: any = {
      x: [],
      y: [],
      type: 'scatter',
      hoverinfo: false,
      marker: { color: '#1976d2', size: 16 }
    }
    var layout: any = {
      dragmode: false,
      margin: {
        l: 20,
        t: 10,
        r: 10,
        b: 30
      },
      xaxis: {
        range: [-1, 15],
        showgrid: true,
        ticks: 'inside',
        zeroline: true,
        zerolinewidth: 2,
        gridwidth: 1,
        gridcolor: '#000',
        dtick: 1,
        tickcolor: '#000'
      },
      yaxis: {
        range: [-1, 15],
        showgrid: true,
        ticks: 'inside',
        zeroline: true,
        zerolinewidth: 2,
        gridwidth: 1,
        gridcolor: '#000',
        dtick: 1,
        tickcolor: '#000'
      }
    };
    var config = {
      hoverinfo: false,
      displayModeBar: false,
      scrollZoom: false,
      responsive: false,
      editSelection: false
    };
    Plotly.newPlot('myPlot', [map, sub], layout, config);
    myPlot.on('plotly_click', (data: any) => {
      var grid = data.points.filter((obj: any) => {
        return obj.curveNumber === 0;
      })
      console.log("Selected Point: (" + grid[0].x + ", " + grid[0].y + ")");
      sub.x[0] = +grid[0].x;
      sub.y[0] = +grid[0].y;
      Plotly.redraw('myPlot');
      if (subtop) {
        this.attempt_gp_st_problem(+grid[0].x, +grid[0].y, part);
      }
    })
    console.log('plot graph');
  }

  plot_graph_mgp(part: string, subtop: boolean) {
    var myPlot: any = document.getElementById('myPlot');
    var x = [];
    var y = [];
    for (let i = -250; i <= 250; i++) {
      x.push(i);
    }
    for (let i = -250; i <= 250; i++) {
      y.push(i);
    }
    var z = [];
    for (let i = 0; i < y.length; i++) {
      var temp = [];
      for (let j = 0; j < x.length; j++) {
        temp.push(0);
      }
      z.push(temp);
    }
    var map: any = {
      x: x,
      y: y,
      z: z,
      type: 'heatmap',
      colorscale: [['0.0', 'rgba(0, 0, 0, 0)'], ['1.0', 'rgba(0, 0, 0, 0)']],
      xgap: 1,
      ygap: 1,
      hoverinfo: "x+y",
      showscale: false
    }
    var sub: any = {
      x: [],
      y: [],
      type: 'scatter',
      hoverinfo: false,
      marker: { color: '#1976d2', size: 16 }
    }
    var layout: any = {
      dragmode: false,
      margin: {
        l: 20,
        t: 10,
        r: 10,
        b: 30
      },
      xaxis: {
        range: [-1, 15],
        showgrid: true,
        ticks: 'inside',
        zeroline: true,
        zerolinewidth: 2,
        gridwidth: 1,
        gridcolor: '#000',
        dtick: 1,
        tickcolor: '#000'
      },
      yaxis: {
        range: [-1, 15],
        showgrid: true,
        ticks: 'inside',
        zeroline: true,
        zerolinewidth: 2,
        gridwidth: 1,
        gridcolor: '#000',
        dtick: 1,
        tickcolor: '#000'
      }
    };
    var config = {
      hoverinfo: false,
      displayModeBar: false,
      scrollZoom: false,
      responsive: false,
      editSelection: false
    };
    Plotly.newPlot('myPlot', [map, sub], layout, config);
    myPlot.on('plotly_click', (data: any) => {
      var grid = data.points.filter((obj: any) => {
        return obj.curveNumber === 0;
      })
      var points = data.points.filter((obj: any) => {
        return obj.curveNumber === 1;
      })
      // console.log("Selected Point: (" + grid[0].x + ", " + grid[0].y +")");
      var point_graphed = false;
      if (grid[0] == undefined) {
        for (let i = 0; i < sub.x.length; i++) {
          if (sub.x[i] == +points[0].x && sub.y[i] == +points[0].y) {
            point_graphed = true;
            if (i != sub.x.length - 1) {
              sub.x.splice(i, 1);
              sub.y.splice(i, 1);
            }
            else {
              sub.x.pop();
              sub.y.pop();
            }
          }
        }
        Plotly.redraw('myPlot');
        if (subtop) {
          this.attempt_mgp_st_problem(+points[0].x, +points[0].y, part);
        }
      }
      if (!point_graphed) {
        sub.x.push(+grid[0].x);
        sub.y.push(+grid[0].y);
        Plotly.redraw('myPlot');
        if (subtop) {
          this.attempt_mgp_st_problem(+grid[0].x, +grid[0].y, part);
        }
      }
    })
    console.log('plot graph');
  }

  is_image(blob: string) {
    // return (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp', '.tiff', '.ico'].some(ext => blob.toLowerCase().endsWith(ext)));
    return (['.jpg', '.jpeg', '.png', '.bmp', '.svg', '.webp', '.tiff', '.ico'].some(ext => blob.toLowerCase().endsWith(ext)));
  }

  toggle_favorite_std() {
    this.favorite_std_set = [];
    for (let std of this.authService.userData.standards.favorites) {
      this.favorite_std_set.push(std as string[]);
    }
    this.includes_standard = false;
    if (this.favorite_std_set.length != 0) {
      for (const [key, std] of Object.entries(this.favorite_std_set)) {
        if (std[0] == this.selected_topic && std[1] == this.selected_subtopic) {
          this.includes_standard = true;
          if (+key != this.favorite_std_set.length - 1) {
            this.favorite_std_set.splice(+key, 1);
          }
          else {
            this.favorite_std_set.pop();
          }
        }
      }
    }
    if (!this.includes_standard) {
      this.favorite_std_set.push([this.selected_topic, this.selected_subtopic]);
    }
    this.authService.UpdateUserData({ 'standards/favorites': {} });
    this.authService.UpdateUserData({ 'standards/favorites': this.favorite_std_set });
    this.standard_fav = !this.standard_fav;
  }

  assert_favorite_std() {
    this.favorite_std_set = [];
    for (let std of this.authService.userData.standards.favorites) {
      this.favorite_std_set.push(std as string[]);
    }
    this.includes_standard = false;
    if (this.favorite_std_set.length != 0) {
      for (const [key, std] of Object.entries(this.favorite_std_set)) {
        if (std[0] == this.selected_topic && std[1] == this.selected_subtopic) {
          this.includes_standard = true;
        }
      }
    }
    if (!this.includes_standard) {
      this.favorite_std_set.push([this.selected_topic, this.selected_subtopic]);
    }
    this.authService.UpdateUserData({ 'standards/favorites': {} });
    this.authService.UpdateUserData({ 'standards/favorites': this.favorite_std_set });
    this.standard_fav = true;
  }

  confetti_light(attempts: number) {
    const fire = confetti.shapeFromText({ text: '🔥' });
    if (this.screenWidth > this.mobileWidth) {
      confettiHandler({
        particleCount: Math.round(62.5 / attempts),
        startVelocity: 125,
        scalar: 1.15,
        ticks: 150,
        decay: 0.8,
        angle: 90,
        spread: 60,
        origin: { x: 0.3, y: 0.75 }
      });
      confettiHandler({
        particleCount: Math.round(62.5 / attempts),
        startVelocity: 125,
        scalar: 1.15,
        ticks: 150,
        decay: 0.8,
        angle: 90,
        spread: 60,
        origin: { x: 0.7, y: 0.75 }
      });
      confettiHandler({
        particleCount: Math.round(62.5 / attempts),
        startVelocity: 125,
        scalar: 1.15,
        ticks: 150,
        decay: 0.8,
        angle: 90,
        spread: 60,
        origin: { x: 0.3, y: 1.25 }
      });
      confettiHandler({
        particleCount: Math.round(62.5 / attempts),
        startVelocity: 125,
        scalar: 1.15,
        ticks: 150,
        decay: 0.8,
        angle: 90,
        spread: 60,
        origin: { x: 0.7, y: 1.25 }
      });
      if (this.streak_count > 1) {
        confettiHandler({
          shapes: [fire],
          particleCount: Math.round(1.25 * this.streak_count),
          startVelocity: 150,
          scalar: 3,
          ticks: 175,
          decay: 0.75,
          angle: 90,
          spread: 60,
          origin: { x: 0.3, y: 0.75 }
        });
        confettiHandler({
          shapes: [fire],
          particleCount: Math.round(1.25 * this.streak_count),
          startVelocity: 150,
          scalar: 3,
          ticks: 175,
          decay: 0.75,
          angle: 90,
          spread: 60,
          origin: { x: 0.7, y: 0.75 }
        });
        confettiHandler({
          shapes: [fire],
          particleCount: Math.round(1.25 * this.streak_count),
          startVelocity: 150,
          scalar: 3,
          ticks: 175,
          decay: 0.75,
          angle: 90,
          spread: 60,
          origin: { x: 0.3, y: 1.25 }
        });
        confettiHandler({
          shapes: [fire],
          particleCount: Math.round(1.25 * this.streak_count),
          startVelocity: 150,
          scalar: 3,
          ticks: 175,
          decay: 0.75,
          angle: 90,
          spread: 60,
          origin: { x: 0.7, y: 1.25 }
        });
      }
    }
    if (this.screenWidth <= this.mobileWidth) {
      confettiHandler({
        particleCount: Math.round(125 / attempts),
        startVelocity: 125,
        scalar: 1.15,
        ticks: 150,
        decay: 0.8,
        angle: 90,
        spread: 60,
        origin: { x: 0.5, y: 0.75 }
      });
      confettiHandler({
        particleCount: Math.round(125 / attempts),
        startVelocity: 125,
        scalar: 1.15,
        ticks: 150,
        decay: 0.8,
        angle: 90,
        spread: 60,
        origin: { x: 0.5, y: 1.25 }
      });
      if (this.streak_count > 1) {
        confettiHandler({
          shapes: [fire],
          particleCount: Math.round(2.5 * this.streak_count),
          startVelocity: 150,
          scalar: 3,
          ticks: 175,
          decay: 0.75,
          angle: 90,
          spread: 60,
          origin: { x: 0.5, y: 0.75 }
        });
        confettiHandler({
          shapes: [fire],
          particleCount: Math.round(2.5 * this.streak_count),
          startVelocity: 150,
          scalar: 3,
          ticks: 175,
          decay: 0.75,
          angle: 90,
          spread: 60,
          origin: { x: 0.5, y: 1.25 }
        });
      }
    }
  }

  confetti_light_st(attempts: number) {
    const fire = confetti.shapeFromText({ text: '🔥' });
    if (this.screenWidth > this.mobileWidth) {
      confettiHandler({
        particleCount: Math.round(62.5 / attempts),
        startVelocity: 125,
        scalar: 1.15,
        ticks: 150,
        decay: 0.8,
        angle: 90,
        spread: 60,
        origin: { x: 0.3, y: 0.75 }
      });
      confettiHandler({
        particleCount: Math.round(62.5 / attempts),
        startVelocity: 125,
        scalar: 1.15,
        ticks: 150,
        decay: 0.8,
        angle: 90,
        spread: 60,
        origin: { x: 0.7, y: 0.75 }
      });
      confettiHandler({
        particleCount: Math.round(62.5 / attempts),
        startVelocity: 125,
        scalar: 1.15,
        ticks: 150,
        decay: 0.8,
        angle: 90,
        spread: 60,
        origin: { x: 0.3, y: 1.25 }
      });
      confettiHandler({
        particleCount: Math.round(62.5 / attempts),
        startVelocity: 125,
        scalar: 1.15,
        ticks: 150,
        decay: 0.8,
        angle: 90,
        spread: 60,
        origin: { x: 0.7, y: 1.25 }
      });
      if (this.subtopic_streak_count > 1) {
        confettiHandler({
          shapes: [fire],
          particleCount: Math.round(1.25 * this.subtopic_streak_count),
          startVelocity: 150,
          scalar: 3,
          ticks: 175,
          decay: 0.75,
          angle: 90,
          spread: 60,
          origin: { x: 0.3, y: 0.75 }
        });
        confettiHandler({
          shapes: [fire],
          particleCount: Math.round(1.25 * this.subtopic_streak_count),
          startVelocity: 150,
          scalar: 3,
          ticks: 175,
          decay: 0.75,
          angle: 90,
          spread: 60,
          origin: { x: 0.7, y: 0.75 }
        });
        confettiHandler({
          shapes: [fire],
          particleCount: Math.round(1.25 * this.subtopic_streak_count),
          startVelocity: 150,
          scalar: 3,
          ticks: 175,
          decay: 0.75,
          angle: 90,
          spread: 60,
          origin: { x: 0.3, y: 1.25 }
        });
        confettiHandler({
          shapes: [fire],
          particleCount: Math.round(1.25 * this.subtopic_streak_count),
          startVelocity: 150,
          scalar: 3,
          ticks: 175,
          decay: 0.75,
          angle: 90,
          spread: 60,
          origin: { x: 0.7, y: 1.25 }
        });
      }
    }
    if (this.screenWidth <= this.mobileWidth) {
      confettiHandler({
        particleCount: Math.round(125 / attempts),
        startVelocity: 125,
        scalar: 1.15,
        ticks: 150,
        decay: 0.8,
        angle: 90,
        spread: 60,
        origin: { x: 0.5, y: 0.75 }
      });
      confettiHandler({
        particleCount: Math.round(125 / attempts),
        startVelocity: 125,
        scalar: 1.15,
        ticks: 150,
        decay: 0.8,
        angle: 90,
        spread: 60,
        origin: { x: 0.5, y: 1.25 }
      });
      if (this.subtopic_streak_count > 1) {
        confettiHandler({
          shapes: [fire],
          particleCount: Math.round(2.5 * this.subtopic_streak_count),
          startVelocity: 150,
          scalar: 3,
          ticks: 175,
          decay: 0.75,
          angle: 90,
          spread: 60,
          origin: { x: 0.5, y: 0.75 }
        });
        confettiHandler({
          shapes: [fire],
          particleCount: Math.round(2.5 * this.subtopic_streak_count),
          startVelocity: 150,
          scalar: 3,
          ticks: 175,
          decay: 0.75,
          angle: 90,
          spread: 60,
          origin: { x: 0.5, y: 1.25 }
        });
      }
    }
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

  set_user_role(role: string) {
    if (this.user_role != role) {
      this.user_role = role;
    }
    else {
      this.user_role = "";
    }
  }

  set_login_method(mthd: string) {
    if (this.login_method != mthd) {
      this.login_method = mthd;
    }
    else {
      this.login_method = "";
    }
    setTimeout(() => {
      this.iti = intlTelInput(this.userPhone.nativeElement, {
        allowDropdown: true,
        autoPlaceholder: "aggressive",
        placeholderNumberType: "FIXED_LINE_OR_MOBILE",
        nationalMode: true,
        formatOnDisplay: true,
        initialCountry: 'auto',
        geoIpLookup: callback => {
          fetch("https://ipapi.co/json")
            .then(res => res.json())
            .then(data => callback(data.country_code))
            .catch(() => callback("us"));
        },
        utilsScript: "node_modules/intl-tel-input/build/js/utils.js",
        // onlyCountries: ['JP'],
        separateDialCode: true,
      });
    }, 10);
  }

  toggle_login_method(mthd: string) {
    if (this.login_method != mthd) {
      this.login_method = mthd;
    }
    else {
      this.login_method = "";
    }
    if (this.login_method == 'phone') {
      setTimeout(() => {
        this.iti = intlTelInput(this.userPhone.nativeElement, {
          allowDropdown: true,
          autoPlaceholder: "aggressive",
          placeholderNumberType: "FIXED_LINE_OR_MOBILE",
          nationalMode: true,
          formatOnDisplay: true,
          initialCountry: 'auto',
          geoIpLookup: callback => {
            fetch("https://ipapi.co/json")
              .then(res => res.json())
              .then(data => callback(data.country_code))
              .catch(() => callback("us"));
          },
          utilsScript: "node_modules/intl-tel-input/build/js/utils.js",
          // onlyCountries: ['JP'],
          separateDialCode: true,
        });
      }, 25);
    }
  }

  reset_password() {
    this.pw_reset = true;
  }

  sendLoginCode(phone: string) {
    // const appVerifier = this.windowRef.recaptchaVerifier;
    // const num = `+${phone}`;
    const appVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      // 'callback': (response) => {
      //   // reCAPTCHA solved, allow signInWithPhoneNumber.
      //   // onSignInSubmit();
      // }
    }, getAuth());
    const intlPhone = '+' + "" + this.iti.getSelectedCountryData().dialCode + phone;
    if (phone != '') {
      this.afAuth
        .signInWithPhoneNumber(intlPhone, appVerifier)
        .then(result => {
          this.windowRef.confirmationResult = result;
          console.log(result);
        })
        .catch((error: any) => window.alert(error.message));
    } else {
      this.iti_msg = "Please enter a valid number below";
      window.alert(this.iti_msg);
    }
  }

  verifyLoginCodeL(code: string) {
    this.windowRef.confirmationResult
      .confirm(code)
      .then((result: any) => {
        this.user = result.user;
        // check if user in database, write user data
        this.authService.userData = this.user;
        // this.login = false;
        console.log(result);
        this.onLogIn();
      })
      .catch((error: any) => console.log(error, 'Incorrect code entered?'));
    // get(child(ref(getDatabase()), '/users/' + this.user.uid)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //     this.authService.userData = snapshot.val();
    //   } else {
    //     console.log("No data available");
    //     this.authService.WriteUserData(this.user, "");
    //     this.authService.SetUserData(this.user);
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
  }

  verifyLoginCodeS(phone: string, code: string, role: string) {
    const appVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      // 'callback': (response) => {
      //   // reCAPTCHA solved, allow signInWithPhoneNumber.
      //   // onSignInSubmit();
      // }
    }, getAuth());
    this.windowRef.confirmationResult
      .confirm(code)
      .then((result: any) => {
        this.user = result.user;
        // check if user in database, write user data
        // this.authService.userData = this.user;
        this.authService.WriteUserData(this.user, role);
        this.authService.SetUserData(this.user);
        this.signup = false;
        // console.log(this.user);
        // console.log(result);
      })
      .catch((error: any) => window.alert(error));
    // get(child(ref(getDatabase()), '/users/' + this.user.uid)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //     this.authService.userData = snapshot.val();
    //   } else {
    //     console.log("No data available");
    //     this.authService.WriteUserData(this.user, this.user_role);
    //     this.authService.SetUserData(this.user);
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
  }

  onLogIn() {
    setTimeout(() => {
      this.login = true;
      if (this.authService.userData.role != 'Student') {
        const linked_students = this.authService.userData.students.slice(1);
        var count = 0;
        for (const [key, stud] of Object.entries(linked_students)) {
          setTimeout(() => {
            if ((stud as string).includes(this.authService.userData.uid as string)) {
              count += 1;
              this.my_students.push(stud as string);
              // setTimeout(() => {
              const student_data = this.authService.searchUserId(stud as string);
              if (student_data != null) {
                this.my_students_data[(stud as string)] = (student_data as object);
              }
            }
          }, +key * 10);
        }
        setTimeout(() => {
          this.my_students = [];
          var count = 0;
          for (const [key, stud] of Object.entries(linked_students)) {
            setTimeout(() => {
              if ((stud as string).includes(this.authService.userData.uid as string)) {
                count += 1;
                this.my_students.push(stud as string);
                // setTimeout(() => {
                const student_data = this.authService.searchUserId(stud as string);
                if (student_data != null) {
                  this.my_students_data[(stud as string)] = (student_data as object);
                }
              }
            }, +key * 10);
          }
        }, 500);
      }
      this.login = false;
    }, 500);
  }

  onOtpChange(otpCode: any) {
    this.otp = otpCode;
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    // this.titleService.setTitle("MoreProblems.Org | U.S. K-12 Common Core Learning Standards");
    // this.meta.updateTag({ name: 'description', content: "Find out what to expect from your learner's curriculum, all the way down to standards. Subjects include Math & English Language Arts from Kindergarten through High School - as they are outlined by the Common Core state standards adopted by most states in America." });
    this.sub = this.aRoute.paramMap.subscribe((params) => {
      console.log(params);
      this.class_uid = (params.get('classKey') as string);
    });
    this.windowRef = this.win.windowRef;
    this.class_data = this.authService.searchClassId(this.class_uid);
    this.width_change2();
    setTimeout(() => {
      this.class_data = this.authService.searchClassId(this.class_uid);
      if (!this.class_data.uid) {
        this.router.navigate(['home']);
      }
      console.log(this.class_data);
      if (!this.authService.userData) {
        this.is_auth = false;
      }
      else {
        this.is_auth = true;
        this.user_data = this.authService.userData;
        if (this.authService.userData.uid == this.class_data.teacher) {
          this.assign_title = "Assignments For Your Class";
          this.exams_title = "Exams Assigned To Your Class";
          this.quizzes_title = "Quizzes Assigned To Your Class";
          for (const [key, exam] of Object.entries(this.class_data.exams.slice(1))) {
            setTimeout(() => {
              console.log(exam);
              var exam_data: any = this.dumpService.exam_attribute_dump[exam as string];
              exam_data.id = (exam as string);
              this.class_exam_metadata.push(exam_data);
            }, +key * 10);
          }
          setTimeout(() => {
            this.class_exam_metadata = [];
            for (const [key, exam] of Object.entries(this.class_data.exams.slice(1))) {
              setTimeout(() => {
                console.log(exam);
                var exam_data: any = this.dumpService.exam_attribute_dump[exam as string];
                exam_data.id = (exam as string);
                this.subject_break_exam(exam as string);
                exam_data.correct_problems = this.class_correct_problems;
                exam_data.total_problems = this.class_total_problems;
                exam_data.average_grade = Math.round(100 * this.class_correct_problems / this.class_total_problems);
                exam_data.complete_assignments = this.complete_exam_count;
                exam_data.total_time = this.total_test_time;
                console.log(exam_data);
                this.class_exam_metadata.push(exam_data);
              }, +key * 10);
            }
          }, 250);
          for (const [key, quiz] of Object.entries(this.class_data.quizzes.slice(1))) {
            setTimeout(() => {
              console.log(quiz);
              var quiz_data: any = this.authService.searchQuizId((quiz as string));
              quiz_data.id = (quiz as string);
              this.class_quiz_metadata.push(quiz_data);
            }, +key * 10);
          }
          setTimeout(() => {
            this.class_quiz_metadata = [];
            for (const [key, quiz] of Object.entries(this.class_data.quizzes.slice(1))) {
              setTimeout(() => {
                console.log(quiz);
                var quiz_data: any = this.authService.searchQuizId((quiz as string));
                quiz_data.id = (quiz as string);
                this.subject_break_quiz('Q-' + quiz as string);
                quiz_data.correct_problems = this.class_correct_problems;
                quiz_data.total_problems = this.class_total_problems;
                quiz_data.average_grade = Math.round(100 * this.class_correct_problems / this.class_total_problems);
                quiz_data.complete_assignments = this.complete_exam_count;
                quiz_data.total_time = this.total_test_time;
                console.log(quiz_data);
                this.class_quiz_metadata.push(quiz_data);
              }, +key * 10);
            }
          }, 250);
          for (const [key, stud] of Object.entries(this.class_data.students.slice(1))) {
            setTimeout(() => {
              console.log(stud);
              var stud_data = this.authService.searchUserId(stud as string);
              var stud_exams = this.getStudClassSubmissions(stud as string);
              stud_data.subs = stud_exams;
              this.class_student_metadata.push(stud_data);
            }, +key * 10);
          }
          setTimeout(() => {
            this.class_student_metadata = [];
            for (const [key, stud] of Object.entries(this.class_data.students.slice(1))) {
              setTimeout(() => {
                console.log(stud);
                var stud_data = this.authService.searchUserId(stud as string);
                var stud_exams = this.getStudClassSubmissions(stud as string);
                stud_data.subs = stud_exams;
                this.subject_break_stud(stud as string);
                stud_data.correct_problems = this.class_correct_problems;
                stud_data.total_problems = this.class_total_problems;
                stud_data.average_grade = Math.round(100 * this.class_correct_problems / this.class_total_problems);
                stud_data.complete_assignments = this.complete_exam_count;
                stud_data.total_time = this.total_test_time;
                console.log(stud_data);
                this.class_student_metadata.push(stud_data);
              }, +key * 10);
            }
          }, 250);
          setTimeout(() => {
            this.class_correct_problems = 0;
            this.class_total_problems = 0;
            this.complete_exam_count = 0;
            this.total_test_time = '';
            var test_time = 0;
            console.log('student assignment rollup');
            console.log(this.class_student_metadata);
            for (let stud of this.class_student_metadata) {
              console.log('student assignment rollup');
              console.log(stud);
              this.class_correct_problems += +(stud as any).correct_problems;
              this.class_total_problems += +(stud as any).total_problems;
              this.total_percent_correct = Math.round(100 * this.class_correct_problems / this.class_total_problems)
              this.complete_exam_count += +(stud as any).complete_assignments;
              console.log('split time');
              console.log((stud as any).total_time.split(/[ hms]/));
              test_time += +(stud as any).total_time.split(/[ hms]/)[0] * 3600 + +(stud as any).total_time.split(/[ hms]/)[2] * 60 + +(stud as any).total_time.split(/[ hms]/)[4];
            }
            this.total_test_time = "" + Math.floor(test_time / 3600) + "h " + "" + (Math.floor(test_time / 60) % 60) + "m " + "" + (test_time % 60) + "s";
          }, 750);
        }
        if (this.authService.userData.role != 'Student') {
          const linked_students = this.authService.userData.students.slice(1);
          for (const [key, stud] of Object.entries(linked_students)) {
            const student_data = this.authService.searchUserId(stud as string);
            setTimeout(() => {
              this.all_students.push(stud as string);
              if (student_data != null) {
                this.all_students_data[(stud as string)] = (student_data as object);
              }
              if ((stud as string).includes(this.authService.userData.uid as string)) {
                this.my_students.push(stud as string);
                if (student_data != null) {
                  this.my_students_data[(stud as string)] = (student_data as object);
                }
              }
            }, +key * 10);
          }
        }
        if (this.authService.userData.role == 'Student') {
          this.is_student = true;
          if (this.class_data.students.includes(this.authService.userData.uid)) {
            this.is_enrolled = true;
          }
          this.student_results(this.authService.userData.uid);
          this.selected_stud_results = '';
        }
        console.log(this.user_data);
      }
      if (this.authService.userData) {
        this.authService.getProfilePic(this.authService.userData);
        this.user_data = this.authService.userData;
        if (this.authService.userData.role != 'Student') {
          const linked_students = this.authService.userData.students.slice(1);
          var count = 0;
          for (const [key, stud] of Object.entries(linked_students)) {
            setTimeout(() => {
              if ((stud as string).includes(this.authService.userData.uid as string)) {
                count += 1;
                this.my_students.push(stud as string);
                // setTimeout(() => {
                const student_data = this.authService.searchUserId(stud as string);
                if (student_data != null) {
                  this.my_students_data[(stud as string)] = (student_data as object);
                }
              }
            }, +key * 10);
          }
          setTimeout(() => {
            this.my_students = [];
            var count = 0;
            for (const [key, stud] of Object.entries(linked_students)) {
              setTimeout(() => {
                if ((stud as string).includes(this.authService.userData.uid as string)) {
                  count += 1;
                  this.my_students.push(stud as string);
                  // setTimeout(() => {
                  const student_data = this.authService.searchUserId(stud as string);
                  if (student_data != null) {
                    this.my_students_data[(stud as string)] = (student_data as object);
                  }
                }
              }, +key * 10);
            }
          }, 500);
        }
        // if (this.authService.userData.role == 'Student') {
        //   const exam_history = this.authService.userData.exams.history;
        //   for (const [key, det] of Object.entries(exam_history)) {
        //     if (["Started", "Assigned"].includes((det as any).status) && key == this.key) {
        //       this.exam_inprogress = true;
        //       this.exam_status = (det as any).status;
        //       this.progress_number = (det as any).progress + 1;
        //       this.last_date = new Date((det as any).lasttimestamp).toLocaleDateString();
        //       this.last_time = new Date((det as any).lasttimestamp).toLocaleTimeString()
        //       if ((det as any).progress != 0) {
        //         var db_submission = this.authService.getExamSubmission2(this.key);
        //         setTimeout(() => {
        //           console.log(db_submission.problems);
        //           for (const [key2, det2] of Object.entries(db_submission.problems)) {
        //             if (+key2 != 0) {
        //               this.exam_submission[+(det2 as any).Number] = (det2 as any);
        //               // const sub_prob: any = (det2 as any);
        //               // var sub_prob_2: any = {};
        //               // for (const [field, dump] of Object.entries(det2 as any)) {
        //               //   // sub_prob[field] = dump;
        //               //   sub_prob_2[field] = dump;
        //               // }
        //               // if (typeof (det2 as any).Choice == "string") {
        //               //   sub_prob_2.Choice = [];
        //               //   sub_prob_2.Correct = [];
        //               //   sub_prob_2.Attempts = [];
        //               //   sub_prob_2.Path = [];
        //               //   sub_prob_2.Choice.push([sub_prob.Choice]);
        //               //   sub_prob_2.Correct.push([sub_prob.Correct]);
        //               //   sub_prob_2.Attempts.push(sub_prob.Attempts);
        //               //   sub_prob_2.Path.push([[sub_prob.Path]]);
        //               // }
        //               // this.exam_submission[+(det2 as any).Number] = sub_prob_2;
        //             }
        //           }
        //         }, 500);
        //       }
        //       console.log(this.exam_submission);
        //     }
        //   }
        // }
      }
      if (this.authService.userData) {
        setTimeout(() => {
          this.width_change2();
          this.data_loaded = true;
          if (this.authService.userData.uid == this.class_data.teacher) {
            this.plot_class_student_results();
          }
        }, 250);
      }
      else {
        this.width_change2();
        this.data_loaded = true;
      }
    }, 500);
  }
}