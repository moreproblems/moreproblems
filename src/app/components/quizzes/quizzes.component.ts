import { Component, OnInit, AfterViewInit, Injectable, ElementRef, ViewChild, Input, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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

import { partition } from 'rxjs/operators';
import { kMaxLength } from 'buffer';

(<any>pdfMake).addVirtualFileSystem(pdfFonts);

const confetti = require('canvas-confetti').default;

const confettiCanvas = document.getElementById('confettiCanvas');
const confettiHandler = confetti.create(confettiCanvas, {
  resize: true,
  useWorker: true,
});

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})

@Injectable()
export class QuizzesComponent implements OnInit {
  title = 'More Problems';

  screenWidth = window.innerWidth;
  mobileWidth = 1000;
  blank = " ";


  user_data: any = {};
  my_students: string[] = [];
  my_students_data: any = {};
  selected_student: string = "";
  selected_student_st: string = "";
  selected_student_data: any = {};
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
  expand_refsheet = false;
  expand_supp = true;
  expand_overview = true;
  expand_topics = true;
  show_correct = false;
  mode = 'assess';
  length_mode = 'number';
  quiz_name = '';
  quiz_config: any = {};

  signup: boolean = false;
  login: boolean = false;
  selected_curriculum: string = '';
  selected_grade: string = '';
  selected_subject: string = '';
  selected_topic = "";
  state_grades: string[] = [];
  state_subjects: string[] = [];
  subject_exams: string[] = [];
  standards_id = '';
  topic_id = '';
  enable_standards = false;
  default_standard: string[] = ['', ''];
  default_probtype: string = 'Multiple Choice';
  default_numchoices: number = 4;
  problems_loaded: boolean = false;
  enable_timelimit = false;
  shuffle_mode: boolean = false;

  assign_q = false;
  all_students: string[] = [];
  all_students_data: any = {};
  new_assignments: string[] = [];
  my_class_metadata: any[] = [];
  class_data: any = {};

  et_counter: number = 0;
  et_minutes: number = 0;
  et_timer: any;
  et_running: boolean = false;
  pt_counter: number = 0;
  pt_minutes: number = 0;
  pt_timer: any;
  pt_running: boolean = false;

  // exam_state = 'Texas';
  // exam_grade = 'Grade 3';
  // exam_subject = 'Mathematics';
  // exam_name = 'STAAR';
  // exam_year = '2021';
  quiz_length = 10;
  exam_timer = 10;

  favorite_set: string[] = [];

  standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = { 'Title': '', 'Overview': '', 'Goals': [], 'Standards': [], 'References': [] };
  examples_dump: { [key: string]: string[] } = {};

  dump_count = 0;

  favorite_std_set: string[][] = [];
  filtered_set: string[] = this.dumpService.exam_set;
  filtered_exam_num = 0;
  filtered_prob_num = 0;
  generate_message = "";

  problems_sequence: number[] = [];
  ordered_dump: { [key: number]: { 'Number': any, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = {};
  exam_dump: { [key: number]: { 'Number': any, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = {};
  pdf_dump: any = { content: [], styles: { tableExample: { margin: [0, 5, 0, 15] } }, defaultStyle: { columnGap: 20, fontSize: 15 }, images: {} };
  refsheet_source: string = '';
  st_refsheet_source: string = '';
  supp_dump: any = {};
  supp_st_dump: any = {};
  random_index = 0
  random_list: string[] = [];

  exam_key: any[] = [];

  problem_number = 1;
  max_problem_number = 1;
  problem_selection: any[] = [];
  problem_attempts: number[] = [];
  attempt_path: any[] = [];
  attempt_response: string[] = [];
  attempt_explanation: any[] = [];
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

  exam_submission: { [key: number]: { 'Number': number, 'Topics': string[], 'SubTopics': string[], 'Choice': string[][], 'Correct': string[][], 'Rationale': string[][], 'Attempts': number[], 'Path': string[][][], 'Seconds': number, 'Time': string, 'Flags': boolean[] } } = {};

  exam_submission_list: any[] = [];
  wrong_submission_list: any[] = [];
  number_correct = 0;
  correct_percent = 0;
  topic_breakdown: { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Seconds': number, 'Time': string, 'Subs': { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Seconds': number, 'Time': string } } } } = {};

  selected_quiz = "";
  // selected_topic = "";
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
  subtopic_search_dump: { [key: number]: { 'Number': any, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = {};
  subtopic_submission: any[] = [];
  subtopic_problem_selection: any[] = [];
  subtopic_problem_attempts: number[] = [];
  subtopic_attempt_path: any[] = [];
  subtopic_attempt_response: string[] = [];
  subtopic_attempt_explanation: any[] = [];

  public_quiz_results: any = {};

  quiz_page: string = "default";
  cquiz_page: string = "";
  quiz_public = false;
  prob_images: { [key: number]: any } = {};
  image_index: number = 0;
  image_choice_index: string = '';
  prob_statuses: { [key: number]: any } = {};
  incomplete_probs: any[] = [];
  problem_hover: boolean[] = [];
  content_hover: boolean[][] = [];
  choices_hover: boolean[][] = [];

  exam_id = '';
  exam_dl = 0;
  exam_name = '';
  exam_url = '';
  exam_fav = false;
  file_source = '';
  file_page = 1;
  file_zoom = 85;

  problem_types: { [key: string]: any[] } = {
    "MC": ["Multiple Choice", 4],
    "MS": ["Multiple Select", 4],
    "FR": ["Free Response", 0]
    // "LR": ["Long Response", 0],
    // "IM": ["Inline Matching", 4],
    // "IMC": ["Inline Multiple Choice", 4],
    // "IMS": ["Inline Multiple Select", 4],
    // "IDD": ["Inline Drop Down", 4],
    // "OM": ["Order Matching", 4],
    // "CM": ["Category Matching", 4],
    // "LP": ["Line Plot", 4],
    // "GP": ["Graph Plot", 0],
    // "T": ["Table", 4],
  };

  content_types: string[] = ['Text', 'Image'];

  default_problem: { 'Number': any, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } = {
    "Number": 0,
    "Type": "MC",
    "NumChoices": 4,
    "Topics": [],
    "SubTopics": [],
    "SuppContent": [],
    "Explain": false,
    "Content": [
      ""
    ],
    "AnswerChoices": {
      "A": {
        "Choice": "",
        "Key": {
          "Correct": false,
          "Rationale": "",
          "Percent": 0
        }
      },
      "B": {
        "Choice": "",
        "Key": {
          "Correct": false,
          "Rationale": "",
          "Percent": 0
        }
      },
      "C": {
        "Choice": "",
        "Key": {
          "Correct": false,
          "Rationale": "",
          "Percent": 0
        }
      },
      "D": {
        "Choice": "",
        "Key": {
          "Correct": false,
          "Rationale": "",
          "Percent": 0
        }
      }
    },
    "Parts": {}
  };

  default_choice: any = {
    "Choice": "",
    "Key": {
      "Correct": false,
      "Rationale": "",
      "Percent": 0
    }
  };

  default_problem_pdf: any = {
    columns: []
  };

  choices_list = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',];

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

  constructor(public router: Router, public authService: AuthService, public dumpService: DumpService, private afAuth: AngularFireAuth, private http: HttpClient, private sanitizer: DomSanitizer) { }

  max(num1: number, num2: number) {
    return (Math.max(num1, num2));
  }

  // public onChange(file: File): void {
  //   let fileReader: FileReader = new FileReader();
  //   let self = this;
  //   fileReader.onloadend = function(x) {
  //     self.exam_data = fileReader.result;
  //   }
  //   fileReader.readAsText(file);
  // }

  width_change2() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= this.mobileWidth) {
      this.expand_topics = false;
      this.expand_overview = false;
      this.file_zoom = 95;
    }
    else {
      this.expand_topics = true;
      this.expand_overview = true;
      this.file_zoom = 75;
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

  quiz_results_entries() {
    return (Object.keys(this.public_quiz_results));
  }

  get_part_num(part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
    }
    return part_num;
  }

  get_part_num_st(part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    return part_num;
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

  read_table(path: string) {
    // var table: any = {};
    this.http.get("./assets/" + path).subscribe(res => {
      console.log(res);
      console.log(JSON.stringify(res));
      this.supp_dump[path] = res;
      // table = res;
    });
    // return (table);
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
      else {
        this.attempt_gp_problem(+grid[0].x, +grid[0].y, part);
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
        else {
          this.attempt_mgp_problem(+points[0].x, +points[0].y, part);
        }
      }
      if (!point_graphed) {
        sub.x.push(+grid[0].x);
        sub.y.push(+grid[0].y);
        Plotly.redraw('myPlot');
        if (subtop) {
          this.attempt_mgp_st_problem(+grid[0].x, +grid[0].y, part);
        }
        else {
          this.attempt_mgp_problem(+grid[0].x, +grid[0].y, part);
        }
      }
    })
    console.log('plot graph');
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

  select_curriculum(curriculum: string) {
    this.selected_curriculum = curriculum;
    this.selected_grade = "";
    this.selected_subject = ""
    this.selected_topic = "";
    this.state_grades = [];
    for (const [id, dump] of Object.entries(this.dumpService.standards_attribute_dump)) {
      if (id.endsWith('-' + this.selected_curriculum)) {
        for (let grade of this.dumpService.standards_attribute_dump[id].Grades) {
          if (!this.state_grades.includes(grade)) {
            this.state_grades.push(grade);
          }
        }
      }
    }
    this.scroll_bottom();
  }

  select_grade(grade: string) {
    this.selected_grade = grade;
    this.selected_subject = "";
    this.state_subjects = [];
    for (const [id, dump] of Object.entries(this.dumpService.standards_attribute_dump)) {
      if (id.endsWith('-' + this.selected_curriculum) && this.dumpService.standards_attribute_dump[id].Grades.includes(grade)) {
        for (const [name, labels] of Object.entries(this.dumpService.subject_map)) {
          if (labels.includes(this.dumpService.standards_attribute_dump[id].Subject) && !this.state_subjects.includes(name)) {
            this.state_subjects.push(name);
          }
        }
      }
    }
    this.scroll_bottom();
  }

  select_subject(subject: string) {
    this.selected_subject = subject;
    this.selected_topic = '';
    this.subject_exams = [];
    this.topics = [];
    for (const [id, dump] of Object.entries(this.dumpService.standards_attribute_dump)) {
      for (const [name, labels] of Object.entries(this.dumpService.subject_map)) {
        if (id.endsWith('-' + this.selected_curriculum) && this.dumpService.standards_attribute_dump[id].Grades.includes(this.selected_grade) && labels.includes(this.dumpService.standards_attribute_dump[id].Subject) && name == this.selected_subject) {
          this.standards_id = id;
          this.standards_dump = this.dumpService.s_dump_dict[id][1];
          for (let domain of this.standards_dump.Standards) {
            this.topics.push(domain.Label);
          }
        }
      }
    }
    this.scroll_bottom();
  }

  select_topic(topic: string) {
    this.default_standard = ['', ''];
    if (this.selected_topic != topic) {
      this.selected_topic = topic;
      if (this.enable_standards) {
        this.default_problem.Topics.pop();
        this.default_problem.Topics.push(topic);
      }
    }
    else {
      this.selected_topic = '';
      if (this.enable_standards) {
        this.default_problem.Topics.pop();
        this.default_problem.Topics.push('');
      }

    }
    this.scroll_bottom();
  }

  get_topic_subs(topic: string) {
    var subs: { [key: string]: string } = {};
    this.standards_dump = this.dumpService.s_dump_dict[this.standards_id][1];
    for (let domain of this.standards_dump.Standards) {
      if (domain.Label == topic) {
        for (let cluster of domain.Subs) {
          subs[cluster.Key] = cluster.Label;
          for (let standard of cluster.Subs) {
            subs[standard.Key] = standard.Label;
            for (let substandard of standard.Subs) {
              subs[substandard.Key] = substandard.Label;
              for (let subsubstandard of substandard.Subs) {
                subs[subsubstandard.Key] = subsubstandard.Label;
              }
            }
          }
        }
      }
    }
    return (subs as any);
  }

  toggle_standards() {
    this.enable_standards = !this.enable_standards;
    if (this.enable_standards) {
      this.default_problem.Topics.push(this.selected_topic);
      this.default_problem.SubTopics.push('');
    }
    else {
      this.default_problem.Topics.pop();
      this.default_problem.SubTopics.pop();
    }
  }

  set_default_standard(id: string, standard: string) {
    this.default_standard = [id, standard];
    this.default_problem.SubTopics.pop();
    this.default_problem.SubTopics.push(standard);
    if (Object.keys(this.exam_dump).length > 0) {
      for (let i = 1; i <= this.quiz_length; i++) {
        this.exam_dump[i].SubTopics.pop();
        this.exam_dump[i].SubTopics.push(standard);
      }
    }
    console.log(this.default_problem);
  }

  set_default_probtype(type: string) {
    this.default_probtype = type;
    this.default_problem.Type = this.get_probtype_key(type);
    this.default_problem.AnswerChoices = {};
    if (+this.problem_types[this.get_probtype_key(type)][1] > 0) {
      this.default_problem.NumChoices = +this.default_numchoices;
      for (let i = 0; i < +this.default_numchoices; i++) {
        this.default_problem.AnswerChoices[this.choices_list[i]] = JSON.parse(JSON.stringify(this.default_choice));
      }
    }
    else if (this.get_probtype_key(type) == 'FR') {
      this.default_problem.AnswerChoices['KEY'] = JSON.parse(JSON.stringify(this.default_choice));
      this.default_problem.NumChoices = 0;
    }
    if (Object.keys(this.exam_dump).length > 0) {
      for (let n = 1; n <= this.quiz_length; n++) {
        this.exam_dump[n].Type = this.get_probtype_key(type);
        this.exam_dump[n].AnswerChoices = {};
        if (+this.problem_types[this.get_probtype_key(type)][1] > 0) {
          this.exam_dump[n].NumChoices = +this.default_numchoices;
          for (let i = 0; i < +this.default_numchoices; i++) {
            this.exam_dump[n].AnswerChoices[this.choices_list[i]] = JSON.parse(JSON.stringify(this.default_choice));
          }
        }
        else {
          this.exam_dump[n].NumChoices = 0;
        }
      }
    }
    setTimeout(() => {
      for (let i = 1; i <= this.quiz_length; i++) {
        const probtypeSel: string = "probtypeInput" + '' + i;
        (document.getElementById(probtypeSel) as any).value = this.problem_types[this.exam_dump[i].Type][0];
      }
    }, 25);
    console.log(this.default_problem);
  }

  get_probtype_key(val: string) {
    var matched_key = "";
    for (let standard of Object.keys(this.problem_types)) {
      if (this.problem_types[standard][0] == val) {
        matched_key = standard;
      }
    }
    return (matched_key);
  }

  set_default_numchoices(num: number) {
    const initial_num: number = +this.default_numchoices;
    if (num < 2) {
      this.default_numchoices = 2;
    }
    else if (num > 10) {
      this.default_numchoices = 10;
    }
    else {
      this.default_numchoices = num;
    }
    if (this.default_numchoices != initial_num) {
      // var prob_dump: any = {};
      // for (const [k, val] of Object.entries(this.default_problem)) {
      //   prob_dump[k] = val;
      // }
      // prob_dump.NumChoices = this.default_numchoices;
      // for (let i = 0; i < this.default_numchoices; i++) {
      //   prob_dump.AnswerChoices[this.choices_list[i]] = this.default_choice;
      // }
      // this.default_problem = (prob_dump as any);
      this.default_problem.NumChoices = this.default_numchoices;
      this.default_problem.AnswerChoices = {};
      for (let i = 0; i < this.default_numchoices; i++) {
        this.default_problem.AnswerChoices[this.choices_list[i]] = JSON.parse(JSON.stringify(this.default_choice));
      }
      if (Object.keys(this.exam_dump).length > 0) {
        for (let n = 1; n <= this.quiz_length; n++) {
          if (+this.problem_types[this.exam_dump[n].Type][1] > 0) {
            this.exam_dump[n].NumChoices = this.default_numchoices;
            this.exam_dump[n].AnswerChoices = {};
            for (let i = 0; i < this.default_numchoices; i++) {
              this.exam_dump[n].AnswerChoices[this.choices_list[i]] = JSON.parse(JSON.stringify(this.default_choice));
            }
          }
        }
        setTimeout(() => {
          for (let i = 1; i <= this.quiz_length; i++) {
            const numchoicesSel: string = "choicesEntry" + '' + i;
            const numchoicesSliderSel: string = "choicesSlider" + '' + i;
            (document.getElementById(numchoicesSel) as any).value = this.exam_dump[i].NumChoices;
            (document.getElementById(numchoicesSliderSel) as any).value = this.exam_dump[i].NumChoices;
          }
        }, 25);
      }
    }
    console.log(this.exam_dump);
  }

  set_problem_num(num: number) {
    const initial_num: number = this.quiz_length;
    if (num < 5) {
      this.quiz_length = 5;
    }
    else if (num > 50) {
      this.quiz_length = 50;
    }
    else {
      this.quiz_length = num;
    }
    if (this.quiz_length != initial_num) {
      const initial_dump = JSON.parse(JSON.stringify(this.exam_dump));
      const initial_images = JSON.parse(JSON.stringify(this.prob_images));
      const initial_statuses = JSON.parse(JSON.stringify(this.prob_statuses));
      this.problems_loaded = false;
      this.exam_dump = {};
      this.prob_images = {};
      this.prob_statuses = {};
      for (let i = 1; i <= this.quiz_length; i++) {
        if (Object.keys(initial_dump).includes('' + i)) {
          this.exam_dump[i] = JSON.parse(JSON.stringify(initial_dump[i]));
          if (Object.keys(initial_images).includes('' + i)) {
            var new_images: any = {};
            for (const [k, image] of Object.entries(initial_images[i])) {
              new_images[k] = this.save_dupe_image((image as any).changingThisBreaksApplicationSecurity as string);
            }
            this.prob_images[i] = new_images;
          }
          this.prob_statuses[i] = JSON.parse(JSON.stringify(initial_statuses[i]));
          this.exam_dump[i].Number = i;
        }
        else {
          this.exam_dump[i] = JSON.parse(JSON.stringify(this.default_problem));
          this.prob_statuses[i] = [false, false];
          this.exam_dump[i].Number = i;
        }
        this.problem_hover[i] = false;
        this.content_hover[i] = [false];
        var choices: boolean[] = [];
        for (let i = 1; i <= this.default_numchoices; i++) {
          choices.push(false);
        }
        this.choices_hover[i] = choices;
      }
      if (this.quiz_page == 'custom') {
        this.cquiz_page = "content";
      }
      this.problems_loaded = true;
      setTimeout(() => {
        for (let i = 1; i <= this.quiz_length; i++) {
          if (this.enable_standards) {
            const standardSel: string = "standardInput" + '' + i;
            (document.getElementById(standardSel) as any).value = Object.keys(this.get_topic_subs(this.selected_topic))[Object.values(this.get_topic_subs(this.selected_topic)).indexOf(this.exam_dump[i].SubTopics[0])] + ': ' + this.exam_dump[i].SubTopics[0];
          }
          const probtypeSel: string = "probtypeInput" + '' + i;
          (document.getElementById(probtypeSel) as any).value = this.problem_types[this.exam_dump[i].Type][0];
        }
        this.scroll_top();
      }, 25);
    }
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

  get_standard_sel(num: number) {
    const standardSel: string = "standardInput" + '' + num;
    var dropdown: any = document.getElementById(standardSel);
    return dropdown.value;
  }

  get_probtype_sel(num: number) {
    const probtypeSel: string = "probtypeInput" + '' + num;
    var dropdown: any = document.getElementById(probtypeSel);
    return dropdown.value;
  }

  get_numchoices_sel(num: number) {
    const numchoicesSel: string = "choicesEntry" + '' + num;
    var dropdown: any = document.getElementById(numchoicesSel);
    return dropdown.value;
  }

  get_numchoices_slider_sel(num: number) {
    const numchoicesSel: string = "choicesSlider" + '' + num;
    var slider: any = document.getElementById(numchoicesSel);
    return slider.value;
  }

  get_contenttype_sel(num: number, index: number) {
    const contenttypeSel: string = "contenttypeInput" + '' + num + '-' + '' + index;
    var dropdown: any = document.getElementById(contenttypeSel);
    return dropdown.value;
  }

  get_choicetype_sel(num: number, index: string) {
    const choicetypeSel: string = "choicetypeInput" + '' + num + '-' + index;
    var dropdown: any = document.getElementById(choicetypeSel);
    return dropdown.value;
  }

  get_content_keys(content: any) {
    var index: number = 0;
    var keys: number[] = []
    for (let block of content) {
      keys.push(index);
      index += 1;
    }
    return (keys);
  }

  get_choice_keys(choices: any) {
    return (Object.keys(choices) as string[]);
  }

  get_add_images_sel(num: number) {
    const addimagesSel: string = "uploadProbImage" + '' + num;
    var input: any = document.getElementById(addimagesSel);
    return (input.files as any);
  }

  get_add_imagesinv_sel(num: number) {
    const addimagesinvSel: string = "uploadProbImageInv" + '' + num;
    var input: any = document.getElementById(addimagesinvSel);
    return (input.files as any);
  }

  get_add_imageschinv_sel(num: number) {
    const addimageschinvSel: string = "uploadChoiceImageInv" + '' + num;
    var input: any = document.getElementById(addimageschinvSel);
    return (input.files as any);
  }

  change_prob_standard(num: number) {
    for (let i = 1; i <= this.quiz_length; i++) {
      if (i == num) {
        // var prob_dump: any = {};
        // for (const [k, val] of Object.entries(this.exam_dump[num])) {
        //   prob_dump[k] = (val as any);
        // }
        this.exam_dump[i].SubTopics.pop();
        this.exam_dump[i].SubTopics.push(this.get_standard_sel(num).slice(this.get_standard_sel(num).split(': ')[0].length + 2));
        // this.exam_dump[num] = { ...prob_dump };
      }
    }
  }

  set_probtype(num: number, type: string) {
    const initial_type: string = this.exam_dump[num].Type;
    if (type != initial_type) {
      this.exam_dump[num].Type = type;
      this.exam_dump[num].NumChoices = 0;
      this.exam_dump[num].AnswerChoices = {};
      if (+this.problem_types[type][1] > 0) {
        this.exam_dump[num].NumChoices = +this.default_numchoices;
        for (let i = 0; i < +this.default_numchoices; i++) {
          this.exam_dump[num].AnswerChoices[this.choices_list[i]] = JSON.parse(JSON.stringify(this.default_choice));
        }
      }
      else if (type == 'FR') {
        this.exam_dump[num].AnswerChoices['KEY'] = JSON.parse(JSON.stringify(this.default_choice));
      }
    }
  }

  set_prob_numchoices(num: number, numchoices: number) {
    const initial_num: number = this.exam_dump[num].NumChoices;
    var final_num: number = 0;
    if (numchoices < 2) {
      final_num = 2;
    }
    else if (numchoices > 10) {
      final_num = 10;
    }
    else {
      final_num = numchoices;
    }
    if (final_num != initial_num) {
      this.exam_dump[num].NumChoices = final_num;
      this.exam_dump[num].AnswerChoices = {};
      for (let i = 0; i < final_num; i++) {
        this.exam_dump[num].AnswerChoices[this.choices_list[i]] = JSON.parse(JSON.stringify(this.default_choice));
        this.choices_hover[num][i] = false;
      }
    }
  }

  set_content_type(num: number, index: number, type: string) {
    if (type == 'Text') {
      console.log();
    }
    else if (type == 'Image') {
      // this.add_image(num, this.get_add_images_sel(num))
      this.image_index = index;
      const el_id: string = 'uploadProbImageInv' + '' + num;
      var upload: any = document.getElementById(el_id);
      upload.click();
    }
  }

  set_choice_type(num: number, index: string, type: string) {
    if (type == 'Text') {
      console.log();
    }
    else if (type == 'Image') {
      // this.add_image(num, this.get_add_images_sel(num))
      this.image_choice_index = index;
      const el_id: string = 'uploadChoiceImageInv' + '' + num;
      var upload: any = document.getElementById(el_id);
      upload.click();
    }
  }

  add_text(num: number) {
    this.exam_dump[num].Content.push('');
    this.content_hover[num].push(false);
    console.log(this.exam_dump);
  }

  get_text_rows(el: any, blob: string) {
    // element.style.height = "1px";
    // element.style.height = (25+element.scrollHeight)+"px";
    return (Math.max(1, Math.ceil(blob.length / (95))));
  }

  add_image(num: number, index: number, images: any) {
    for (let image of images) {
      if (index == -1) {
        this.exam_dump[num].Content.push('' + image.name);
      }
      else {
        this.exam_dump[num].Content[index] = '' + image.name;
      }
      if (!Object.keys(this.prob_images).includes('' + num)) {
        var image_dump: any = {}
        image_dump['' + image.name] = [this.save_image(image), image];
        this.prob_images[num] = image_dump;
      }
      else {
        this.prob_images[num]['' + image.name] = [this.save_image(image), image];
      }
      this.content_hover[num].push(false);
    }
    console.log(this.prob_images);
  }

  add_choice_image(num: number, index: string, images: any) {
    for (let image of images) {
      if (index == '') {
        // this.exam_dump[num].AnswerChoices[].Choice = ''+image.name;
        console.log();
      }
      else {
        this.exam_dump[num].AnswerChoices[index].Choice = '' + image.name;
      }
      if (!Object.keys(this.prob_images).includes('' + num)) {
        var image_dump: any = {}
        image_dump['' + image.name] = [this.save_image(image), image];
        this.prob_images[num] = image_dump;
      }
      else {
        this.prob_images[num]['' + image.name] = [this.save_image(image), image];
      }
    }
    console.log(this.prob_images);
  }

  save_image(image: any) {
    return (this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(image)) as string);
  }

  save_dupe_image(image: any) {
    return (this.sanitizer.bypassSecurityTrustUrl(image) as string);
  }

  hover_card(num: number, type: string, index: number, hover: boolean) {
    if (type == 'problem') {
      this.problem_hover[num] = hover;
    }
    else if (type == 'content') {
      this.content_hover[num][index] = hover;
    }
    else if (type == 'choices') {
      this.choices_hover[num][index] = hover;
    }
  }

  hover_delete(num: number, type: string, index: number) {
    if (type == 'problem') {
      return (this.problem_hover[num]);
    }
    else if (type == 'content') {
      return (this.content_hover[num][index]);
    }
    else if (type == 'choices') {
      return (this.choices_hover[num][index]);
    }
    else {
      return;
    }
  }

  delete_content(num: number, index: number) {
    this.problems_loaded = false;
    if (this.is_image(this.exam_dump[num].Content[index])) {
      const initial_images = this.prob_images[num]
      var new_images: any = {};
      for (const [k, image] of Object.entries(initial_images)) {
        if (k != this.exam_dump[num].Content[index]) {
          new_images[k] = [this.save_dupe_image(((image as any)[0] as any).changingThisBreaksApplicationSecurity as string), (image as any)[1]];
        }
      }
      this.prob_images[num] = new_images;
    }
    this.exam_dump[num].Content.splice(index, 1);
    this.content_hover[num].splice(index, 1);
    // if (index != this.exam_dump[num].Content.length - 1) {
    //   this.exam_dump[num].Content.splice(index, 1);
    //   this.content_hover[num].splice(index, 1);
    // }
    // else {
    //   this.exam_dump[num].Content.pop();
    //   this.content_hover[num].pop();
    // }
    setTimeout(() => {
      this.problems_loaded = true;
      setTimeout(() => {
        for (let i = 1; i <= this.quiz_length; i++) {
          if (this.enable_standards) {
            const standardSel: string = "standardInput" + '' + i;
            (document.getElementById(standardSel) as any).value = Object.keys(this.get_topic_subs(this.selected_topic))[Object.values(this.get_topic_subs(this.selected_topic)).indexOf(this.exam_dump[i].SubTopics[0])] + ': ' + this.exam_dump[i].SubTopics[0];
          }
          const probtypeSel: string = "probtypeInput" + '' + i;
          (document.getElementById(probtypeSel) as any).value = this.problem_types[this.exam_dump[i].Type][0];
        }
      }, 25);
    }, 25);
    console.log(this.exam_dump);
  }

  add_choice(num: number) {
    this.exam_dump[num].AnswerChoices[this.choices_list[this.exam_dump[num].NumChoices]] = JSON.parse(JSON.stringify(this.default_choice));
    this.exam_dump[num].NumChoices += 1;
    this.choices_hover[num].push(false);
  }

  delete_choice(num: number, choice: string) {
    this.problems_loaded = false;
    const initial_prob: any = JSON.parse(JSON.stringify(this.exam_dump[num]));
    var choice_num = 1;
    this.exam_dump[num].AnswerChoices = {}
    for (let i = 1; i <= Object.keys(initial_prob.AnswerChoices).length; i++) {
      if (this.choices_list[i - 1] != choice) {
        this.exam_dump[num].AnswerChoices[this.choices_list[choice_num - 1]] = JSON.parse(JSON.stringify(initial_prob.AnswerChoices[this.choices_list[i - 1]]));
        choice_num += 1;
      }
    }
    this.exam_dump[num].NumChoices -= 1;
    this.choices_hover[num].splice(Object.keys(initial_prob.AnswerChoices).indexOf(choice), 1);
    setTimeout(() => {
      this.problems_loaded = true;
      setTimeout(() => {
        for (let i = 1; i <= this.quiz_length; i++) {
          if (this.enable_standards) {
            const standardSel: string = "standardInput" + '' + i;
            (document.getElementById(standardSel) as any).value = Object.keys(this.get_topic_subs(this.selected_topic))[Object.values(this.get_topic_subs(this.selected_topic)).indexOf(this.exam_dump[i].SubTopics[0])] + ': ' + this.exam_dump[i].SubTopics[0];
          }
          const probtypeSel: string = "probtypeInput" + '' + i;
          (document.getElementById(probtypeSel) as any).value = this.problem_types[this.exam_dump[i].Type][0];
        }
      }, 25);
    }, 25);
    console.log(this.exam_dump);
  }

  check_content_complete(num: number) {
    var complete = true;
    for (let block of this.exam_dump[num].Content) {
      if (block == '') {
        complete = false;
      }
    }
    for (let [k, choice] of Object.entries(this.exam_dump[num].AnswerChoices)) {
      if (choice.Choice == '' && k != 'KEY') {
        complete = false;
      }
    }
    if (this.enable_standards && this.exam_dump[num].SubTopics[0] == '') {
      complete = false;
    }
    this.prob_statuses[num][0] = complete;
  }

  check_all_content_complete() {
    var complete = true;
    this.incomplete_probs = [];
    for (let prob of Object.keys(this.exam_dump)) {
      if (!this.prob_statuses[+prob][0]) {
        complete = false;
        this.incomplete_probs.push(prob);
      }
    }
    return (complete);
  }

  check_key_complete(num: number) {
    var complete = false;
    for (let choice of Object.values(this.exam_dump[num].AnswerChoices)) {
      if (choice.Key.Correct) {
        complete = true;
      }
    }
    this.prob_statuses[num][1] = complete;
  }

  check_all_key_complete() {
    var complete = true;
    this.incomplete_probs = [];
    for (let prob of Object.keys(this.exam_dump)) {
      if (!this.prob_statuses[+prob][1]) {
        complete = false;
        this.incomplete_probs.push(prob);
      }
    }
    return (complete);
  }

  add_problem() {
    this.problems_loaded = false;
    this.exam_dump[this.quiz_length + 1] = JSON.parse(JSON.stringify(this.default_problem));
    this.exam_dump[this.quiz_length + 1].Number = this.quiz_length + 1;
    this.prob_statuses[this.quiz_length + 1] = [false, false];
    this.problem_hover[this.quiz_length + 1] = false;
    this.content_hover[this.quiz_length + 1] = [false];
    var choices: boolean[] = [];
    for (let i = 1; i <= this.quiz_length; i++) {
      choices.push(false);
    }
    this.choices_hover[this.quiz_length + 1] = choices;
    this.quiz_length += 1;
    setTimeout(() => {
      this.problems_loaded = true;
      setTimeout(() => {
        for (let i = 1; i <= this.quiz_length; i++) {
          if (this.enable_standards) {
            const standardSel: string = "standardInput" + '' + i;
            (document.getElementById(standardSel) as any).value = Object.keys(this.get_topic_subs(this.selected_topic))[Object.values(this.get_topic_subs(this.selected_topic)).indexOf(this.exam_dump[i].SubTopics[0])] + ': ' + this.exam_dump[i].SubTopics[0];
          }
          const probtypeSel: string = "probtypeInput" + '' + i;
          (document.getElementById(probtypeSel) as any).value = this.problem_types[this.exam_dump[i].Type][0];
        }
      }, 25);
    }, 25);
    console.log(this.exam_dump);
  }

  delete_problem(num: number) {
    this.problems_loaded = false;
    const initial_dump: any = JSON.parse(JSON.stringify(this.exam_dump));
    const initial_images: any = JSON.parse(JSON.stringify(this.prob_images));
    const initial_statuses: any = JSON.parse(JSON.stringify(this.prob_statuses));
    var prob = 1;
    this.exam_dump = {};
    this.prob_images = {};
    this.prob_statuses = {};
    for (let i = 1; i <= this.quiz_length; i++) {
      if (i != num) {
        this.exam_dump[prob] = JSON.parse(JSON.stringify(initial_dump[i]));
        if (Object.keys(initial_images).includes('' + i)) {
          var new_images: any = {};
          for (const [k, image] of Object.entries(initial_images[i])) {
            new_images[k] = [this.save_dupe_image(((image as any)[0] as any).changingThisBreaksApplicationSecurity as string), (image as any)[1]];
          }
          this.prob_images[prob] = new_images;
        }
        this.prob_statuses[prob] = JSON.parse(JSON.stringify(initial_statuses[i]));
        this.exam_dump[prob].Number = prob;
        prob += 1;
      }
    }
    this.problem_hover.splice(num, 1);
    this.content_hover.splice(num, 1);
    this.choices_hover.splice(num, 1);
    this.quiz_length -= 1;
    setTimeout(() => {
      this.problems_loaded = true;
      setTimeout(() => {
        for (let i = 1; i <= this.quiz_length; i++) {
          if (this.enable_standards) {
            const standardSel: string = "standardInput" + '' + i;
            (document.getElementById(standardSel) as any).value = Object.keys(this.get_topic_subs(this.selected_topic))[Object.values(this.get_topic_subs(this.selected_topic)).indexOf(this.exam_dump[i].SubTopics[0])] + ': ' + this.exam_dump[i].SubTopics[0];
          }
          const probtypeSel: string = "probtypeInput" + '' + i;
          (document.getElementById(probtypeSel) as any).value = this.problem_types[this.exam_dump[i].Type][0];
        }
      }, 25);
    }, 25);
    console.log(this.exam_dump);
  }

  complete_preview() {
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
    this.cquiz_page = 'postquiz';
  }

  is_image(blob: string) {
    // return (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp', '.tiff', '.ico'].some(ext => blob.toLowerCase().endsWith(ext)));
    return (['.jpg', '.jpeg', '.png', '.bmp', '.svg', '.webp', '.tiff', '.ico'].some(ext => blob.toLowerCase().endsWith(ext)));
  }

  get_refsheet(key: string) {
    // console.log('../../' + this.dumpService.exam_attribute_dump[key.substring(0, key.indexOf('-'))].RefSheet);
    return ('../../' + this.dumpService.exam_attribute_dump[key.substring(0, key.indexOf('-'))].RefSheet);
  }

  get_flag_count() {
    var count = 0;
    for (let sub of this.order_numbers()) {
      if (sub <= this.max_problem_number && (this.exam_submission[sub].Attempts[0] != 0) && this.exam_submission[sub].Flags[this.exam_submission[sub].Flags.length - 1]) {
        count += 1;
      }
    }
    return (count)
  }

  get_skip_count() {
    var count = 0;
    for (let sub of this.order_numbers()) {
      if (sub < this.max_problem_number && (this.exam_submission[sub].Attempts[0] == 0)) {
        count += 1;
      }
    }
    return (count)
  }

  order_numbers() {
    return (Array.from({ length: Object.keys(this.exam_dump).length }, (_, i) => i + 1));
  }

  toggle_flag() {
    console.log('flag');
    this.exam_submission[this.problem_number].Flags.push(!this.exam_submission[this.problem_number].Flags[this.exam_submission[this.problem_number].Flags.length - 1]);
    console.log(this.exam_submission[this.problem_number].Flags);
  }

  toggle_button(val: string) {
    if (['English Language Arts', 'Mathematics', 'Sciences', 'Social Studies', 'Reading & Writing'].includes(val)) {
      for (let subval of this.dumpService.sub_subjects[val]) {
        if (!this.subject_filters.includes(subval)) {
          this.subject_filters.push(subval)
        }
        else {
          if (this.subject_filters.indexOf(subval) != -1) {
            this.subject_filters.splice(this.subject_filters.indexOf(subval), 1);
          }
          else {
            this.subject_filters.pop()
          }
        }
      }
    }
    else if (['Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'High School'].includes(val)) {
      if (['High School'].includes(val)) {
        for (let subval of ['High School', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']) {
          if (!this.grade_filters.includes(subval)) {
            this.grade_filters.push(subval)
          }
          else {
            if (this.grade_filters.indexOf(subval) != -1) {
              this.grade_filters.splice(this.grade_filters.indexOf(subval), 1);
            }
            else {
              this.grade_filters.pop()
            }
          }
        }
      }
      else {
        if (!this.grade_filters.includes(val)) {
          this.grade_filters.push(val)
        }
        else {
          if (this.grade_filters.indexOf(val) != -1) {
            this.grade_filters.splice(this.grade_filters.indexOf(val), 1);
          }
          else {
            this.grade_filters.pop()
          }
        }
      }
    }
    else {
      if (['SAT'].includes(val)) {
        for (let subval of ['SAT', 'PSAT']) {
          if (!this.state_filters.includes(subval)) {
            this.state_filters.push(subval)
          }
          else {
            if (this.state_filters.indexOf(subval) != -1) {
              this.state_filters.splice(this.state_filters.indexOf(subval), 1);
            }
            else {
              this.state_filters.pop()
            }
          }
        }
      }
      else {
        if (!this.state_filters.includes(val)) {
          this.state_filters.push(val)
        }
        else {
          if (this.state_filters.indexOf(val) != -1) {
            this.state_filters.splice(this.state_filters.indexOf(val), 1);
          }
          else {
            this.state_filters.pop()
          }
        }
      }
    }
    this.filter_exams();
  }

  toggle_mode() {
    if (this.mode == 'assess') {
      this.mode = 'explain';
    }
    else if (this.mode == 'explain') {
      this.mode = 'assess';
    }
  }

  toggle_length_mode() {
    if (this.length_mode == 'timer') {
      this.length_mode = 'number';
    }
    else if (this.length_mode == 'number') {
      this.length_mode = 'timer';
    }
  }

  set_timer(num: number) {
    if (num < 5) {
      this.exam_timer = 5;
    }
    else if (num > 60) {
      this.exam_timer = 60;
    }
    else {
      this.exam_timer = num;
    }
  }

  filter_exams() {
    this.filtered_set = [];
    this.topics = [];
    this.topics_count = {};
    for (let i = 0; i < this.dumpService.exam_set.length; i++) {
      if (Object.keys(this.dumpService.exam_names).includes(this.dumpService.exam_set[i]) && (this.state_filters.includes(this.dumpService.exam_attribute_dump[this.dumpService.exam_set[i]].State) || this.state_filters.includes(this.dumpService.exam_attribute_dump[this.dumpService.exam_set[i]].ExamName) || this.state_filters.length == 0) && (this.grade_filters.includes(this.dumpService.exam_attribute_dump[this.dumpService.exam_set[i]].Grade) || this.grade_filters.length == 0) && (this.subject_filters.includes(this.dumpService.exam_attribute_dump[this.dumpService.exam_set[i]].Subject) || this.subject_filters.length == 0)) {
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
    // for (let topic of this.topic_filters) {
    //   if (!this.topics.includes(topic)) {
    //     this.toggle_topic(topic);
    //   }
    // }
    if (this.grade_filters.length == 0 && this.subject_filters.length == 0) {
      this.topics = [];
      this.topics_count = {};
      this.topic_filters = []
    }
    if (this.filtered_set.length == 0) {
      this.generate_message = "There are no problems based on your selection.";
    }
  }

  generate_problems() {
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
      if (this.length_mode == 'number') {
        this.randomize_problems(this.quiz_length);
      }
      else {
        this.randomize_problems(Math.min(100, this.filtered_prob_num));
      }
      this.toggle_filters();
    }
  }

  randomize_problems(total: number) {
    this.problems_sequence = Array.from({ length: Object.keys(this.ordered_dump).length }, (_, i) => i);
    this.random_list = []
    for (let i = 1; i <= total; i++) {
      this.random_index = Math.floor(Math.random() * this.problems_sequence.length);
      this.random_list.push('' + this.problems_sequence[this.random_index]);
      this.exam_dump[i] = this.ordered_dump[this.problems_sequence[this.random_index]];
      this.problems_sequence.splice(this.random_index, 1);
    }
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

  can_assign_s(std: string, ass: string) {
    return (!Object.keys(this.all_students_data[std].exams.history).includes('Q-' + ass));
  }

  can_assign_c(clss: string, ass: string) {
    return (!this.my_class_metadata[this.authService.userData.classes.indexOf(clss) - 1].exams.includes('Q-' + ass));
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

  add_assign_quiz() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    var quiz_id = '';
    for (let i: number = 1; i <= 5; i++) {
      quiz_id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    if (this.quiz_page == 'custom') {
      for (let prob of Object.values(this.prob_images)) {
        for (const [name, image] of Object.entries(prob)) {
          // image should be an acutal image, instead of the URL
          this.authService.UploadQuizPic(quiz_id, name, (image as any)[1]);
        }
      }
    }
    var db_updates: any = {};
    if (this.quiz_page == 'default') {
      db_updates['quizzes/' + quiz_id] = { name: this.quiz_name, grades: this.grade_filters, subjects: this.subject_filters, states: this.state_filters, topics: this.topic_filters, mode: this.mode, length: this.quiz_length, timer: this.exam_timer, shuffle: true, public: false, author: this.authService.userData.uid };
    }
    if (this.quiz_page == 'custom') {
      db_updates['quizzes/' + quiz_id] = { name: this.quiz_name, problems: this.exam_dump, grades: [this.selected_grade], subjects: [this.selected_subject], states: [this.dumpService.state_labels[this.selected_curriculum]], topics: [this.selected_topic], mode: this.mode, length: this.quiz_length, timer: this.exam_timer, shuffle: this.shuffle_mode, public: this.quiz_public, author: this.authService.userData.uid };
    }
    this.authService.UpdateDatabase(db_updates);
    for (let ass of this.new_assignments) {
      if (ass.length < 10) {
        const class_ass_ref = 'classes/' + ass + '/quizzes';
        var class_ass_set: any = [];
        var edit_c_list: any = {};
        for (let quiz of this.my_class_metadata[this.authService.userData.classes.indexOf(ass) - 1].quizzes) {
          class_ass_set.push(quiz as string);
        }
        class_ass_set.push(quiz_id);
        edit_c_list[class_ass_ref] = class_ass_set;
        this.authService.UpdateDatabase({ class_ass_ref: {} });
        this.authService.UpdateDatabase(edit_c_list);
      }
      else {
        db_updates = {};
        db_updates['users/' + ass + '/exams/history/Q-' + quiz_id] = { progress: 0, status: 'Assigned', shuffle: this.shuffle_mode, lasttimestamp: serverTimestamp() };
        // this.db_updates['users/' + ass + '/problems/all/' + this.exam_id + '-' + "" + (this.problem_number + 1) + '/status'] = 'Viewed';
        db_updates['/submissions/exams/' + ass + '/Q-' + quiz_id + '/starttimestamp'] = serverTimestamp();
        this.authService.UpdateDatabase(db_updates);
      }
    }
    if (this.quiz_page == 'custom') {
      setTimeout(() => {
        this.router.navigate(['quiz/' + quiz_id]);
      }, 500);
    }
  }

  clear_assignments() {
    this.new_assignments = [];
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

  toggle_quiz_pdf() {
    // this.selected_quiz = quiz;
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
      if (this.length_mode == 'number') {
        this.randomize_problems(this.quiz_length);
      }
      else {
        this.randomize_problems(Math.min(100, this.filtered_prob_num));
      }
    }
    // this.quiz_config = (this.authService.searchQuizId(quiz) as any);
    this.pdf_dump = { content: [], styles: { tableExample: { fontSize: 14, alignment: 'center', margin: [0, 5, 0, 15] }, tableHeader: { bold: true, alignment: 'center', fontSize: 15, fillColor: '#AAAAAA' } }, defaultStyle: { columnGap: 10, font: 'Helvetica', fontSize: 14 }, images: {}, footer: function (currentPage: any, pageCount: any) { return [{ columns: [{ margin: [150, 10, 0, 0], width: '*', text: 'Page ' + currentPage.toString() + ' of ' + pageCount, alignment: 'left', italics: true }, { margin: [0, 10, 150, 0], width: "*", alignment: 'right', font: 'MajorMonoDisplay', characterSpacing: -2, text: 'moreproblems.org' }] }]; } };
    this.pdf_dump.content.push({ margin: [0, 0, 0, 15], columns: [{ width: "*", fontSize: 18, lineHeight: 0.9, alignment: 'center', bold: true, text: 'Practice Worksheet' }, { margin: [0, 5, 0, 0], width: "auto", fontSize: 24, alignment: 'right', font: 'MajorMonoDisplay', characterSpacing: -2, text: 'More+Problems!' }] });
    this.pdf_dump.content.push({ columns: [[{ mdargin: [0, 1, 0, 1], columns: [{ width: 45, fontSize: 16, bold: true, alignment: 'right', text: 'Name' }, { table: { widths: [195], heights: [20], body: [['']] } }] }, { margin: [0, 1, 0, 1], columns: [{ width: 45, fontSize: 15, bold: true, alignment: 'right', text: 'Date' }, { table: { widths: [195], heights: [20], body: [['']] } }] }], [{ margin: [0, 0, 0, 5], width: 200, fontSize: 15, lineHeight: 1.1, italics: true, alignment: 'center', text: ((this.topic_filters.length > 0) ? this.topic_filters[0] : 'No Topics Added') }, { margin: [0, 0, 0, 5], fontSize: 16, alignment: 'center', text: ((this.length_mode == 'number') ? '' + this.quiz_length + ' total problems' : '' + this.quiz_length + ' minutes allowed') }]] });
    this.pdf_dump.content.push('\n\n');
    setTimeout(() => {
      // this.quiz_config = (this.authService.searchQuizId(quiz) as any);
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
    this.selected_quiz = quiz;
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
                  prob_pdf_content.push({ margin: [0, 0, 40, 5], unbreakable: true, ssssalignment: 'center', table: { widths: ['*'], heights: ['auto'], body: [[{ border: [true, true, true, false], margin: [15, 15, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }], [{ border: [true, false, true, false], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; } } }], [{ border: [true, false, true, true], margin: [15, 0, 15, 0], table: { widths: ['*'], body: [[" "], [" "]] }, layout: { hLineWidth: function (i: any, node: any) { return (i === 0 || i === node.table.body.length) ? 0 : 2; }, vLineWidth: function (i: any, node: any) { return 0; }, } }]] } });
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

  toggle_favorite() {
    if (this.authService.userData) {
      this.favorite_set = [];
      for (let exm of this.authService.userData.exams.favorites) {
        this.favorite_set.push(exm as string);
      }
      if (this.favorite_set.includes(this.exam_id)) {
        if (this.favorite_set.indexOf(this.exam_id) != -1) {
          this.favorite_set.splice(this.favorite_set.indexOf(this.exam_id), 1);
        }
        else {
          this.favorite_set.pop()
        }
      }
      else {
        this.favorite_set.push(this.exam_id);
      }
      this.authService.UpdateUserData({ 'exams/favorites': {} });
      this.authService.UpdateUserData({ 'exams/favorites': this.favorite_set });
      this.exam_fav = !this.exam_fav;
    }
  }

  assert_favorite() {
    if (this.authService.userData) {
      this.favorite_set = [];
      for (let exm of this.authService.userData.exams.favorites) {
        this.favorite_set.push(exm as string);
      }
      if (!this.favorite_set.includes(this.exam_id)) {
        this.favorite_set.push(this.exam_id);
      }
      this.authService.UpdateUserData({ 'exams/favorites': {} });
      this.authService.UpdateUserData({ 'exams/favorites': this.favorite_set });
      this.exam_fav = true;
    }
  }

  download_quiz() {
    const link = document.createElement('a');
    // const exam_ref: string = 'exams/' + this.exam_id + '/downloads';
    // console.log(exam_ref);
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.file_source);
    if (this.selected_quiz != '') {
      link.setAttribute('download', this.quiz_config.name);
    }
    else {
      link.setAttribute('download', 'MoreProblems Practice Worksheet');
    }
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
    printJS({ printable: this.file_source, documentTitle: (this.selected_quiz != '') ? this.quiz_config.name : 'MoreProblems Practice Worksheet', type: 'pdf', showModal: true });
    // this.assert_favorite();
  }

  take_exam() {
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

  toggle_filters() {
    this.expand_filters = !this.expand_filters;
    if (this.mode == 'assess') {
      for (let num of Object.keys(this.exam_dump)) {
        this.exam_submission[+num] = {
          'Number': +num,
          'Topics': [],
          'SubTopics': [],
          'Choice': [],
          'Correct': [],
          'Rationale': [],
          'Attempts': [],
          'Path': [],
          'Seconds': 0,
          'Time': '',
          'Flags': [false]
        };
        if (Object.keys(this.exam_dump[+num].Parts).length == 0) {
          this.exam_submission[+num].Path.push([['']]);
          this.exam_submission[+num].Attempts.push(0);
        }
        else {
          for (let part of Object.keys(this.exam_dump[+num].Parts)) {
            this.exam_submission[+num].Path.push([['']]);
            this.exam_submission[+num].Attempts.push(0);
          }
        }
      }
    }
    this.toggleExamTimer();
    this.toggleProblemTimer();
    this.streak_count = 0;
    this.problem_number = 1;
    this.max_problem_number = 1;
    this.attempt_path = [];
    this.attempt_response = [];
    this.attempt_explanation = [];
    this.problem_selection = [];
    this.m_shuffled = false;
    this.m_selection = [];
    this.m_submission = [];
    this.c_submission = [];
    this.shuffle_choices = {};
    this.unique_choices = [];
    if (Object.keys(this.exam_dump[this.problem_number].Parts).length == 0) {
      this.problem_attempts = [0];
      this.attempt_path = [[]];
      this.attempt_response = [''];
      this.attempt_explanation = [[]];
      this.m_selection = [["", ""]];
      this.m_submission = [{}];
      this.c_submission = [{}];
      if (['MC', 'FR', 'SR', 'MR', 'LR', 'IMC', 'LP', 'GP'].includes(this.exam_dump[this.problem_number].Type)) {
        this.problem_selection = [['']];
        if (['GP'].includes(this.exam_dump[this.problem_number].Type)) {
          setTimeout(() => {
            this.plot_graph_gp('', false);
          }, 500);
        }
      }
      else if (['MS', 'O', 'C', 'G', 'IM', 'IMS', 'MGP'].includes(this.exam_dump[this.problem_number].Type)) {
        this.problem_selection = [[]];
        if (['O', 'C', 'G'].includes(this.exam_dump[this.problem_number].Type)) {
          this.unique_m(this.exam_dump[this.problem_number].AnswerChoices, '');
        }
        if (['MGP'].includes(this.exam_dump[this.problem_number].Type)) {
          setTimeout(() => {
            this.plot_graph_mgp('', false);
          }, 500);
        }
      }
      else if (['MFR', 'IDD', 'T'].includes(this.exam_dump[this.problem_number].Type)) {
        var msp_nums: string[] = [];
        this.problem_selection.push([]);
        for (let choice of Object.keys(this.exam_dump[this.problem_number].AnswerChoices)) {
          if (choice.length > 1 && choice[1] == ':' && !msp_nums.includes(choice[0])) {
            this.problem_selection[0].push('');
            msp_nums.push(choice[0]);
          }
        }
      }
    }
    else {
      this.problem_attempts = [];
      for (let part of Object.keys(this.exam_dump[this.problem_number].Parts)) {
        this.problem_attempts.push(0);
        this.attempt_path.push([]);
        this.attempt_response.push('');
        this.attempt_explanation.push([]);
        this.m_selection.push(["", ""]);
        this.m_submission.push({});
        this.c_submission.push({});
        if (['MC', 'FR', 'SR', 'MR', 'LR', 'IMC', 'LP', 'GP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
          this.problem_selection.push(['']);
          if (['GP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
            setTimeout(() => {
              this.plot_graph_gp(part, false);
            }, 500);
          }
        }
        else if (['MS', 'O', 'C', 'G', 'IM', 'IMS', 'MGP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
          this.problem_selection.push([]);
          if (['O', 'C', 'G'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
            this.unique_m(this.exam_dump[this.problem_number].Parts[part].AnswerChoices, part);
          }
          if (['MGP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
            setTimeout(() => {
              this.plot_graph_mgp(part, false);
            }, 500);
          }
        }
        else if (['MFR', 'IDD', 'T'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
          var msp_nums: string[] = [];
          this.problem_selection.push([]);
          for (let choice of Object.keys(this.exam_dump[this.problem_number].Parts[part].AnswerChoices)) {
            if (choice.length > 1 && choice[1] == ':' && !msp_nums.includes(choice[0])) {
              this.problem_selection[Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part)].push('');
              msp_nums.push(choice[0]);
            }
          }
        }
      }
    }
    this.refsheet_source = '../../' + this.dumpService.exam_attribute_dump[(this.exam_dump[this.problem_number].Number).substring(0, (this.exam_dump[this.problem_number].Number).indexOf('-'))].RefSheet;
    for (let supp of this.exam_dump[this.problem_number].SuppContent) {
      setTimeout(() => {
        this.read_supp_json(supp);
      }, 100 * (1 + this.exam_dump[this.problem_number].SuppContent.indexOf(supp)));
    }
    if (this.exam_dump[this.problem_number].Type == 'MP') {
      for (let part of Object.keys(this.exam_dump[this.problem_number].Parts)) {
        for (let block of this.exam_dump[this.problem_number].Parts[part].Content) {
          if (block.startsWith(':table:')) {
            setTimeout(() => {
              this.read_table(block.slice(7));
            }, 100);
          }
        }
      }
    }
    if (this.exam_dump[this.problem_number].Type != 'MP') {
      for (let block of this.exam_dump[this.problem_number].Content) {
        if (block.startsWith(':table:')) {
          setTimeout(() => {
            this.read_table(block.slice(7));
          }, 100);
        }
      }
    }
    this.refsheet_source = '../../' + this.dumpService.exam_attribute_dump[(this.exam_dump[this.problem_number].Number).substring(0, (this.exam_dump[this.problem_number].Number).indexOf('-'))].RefSheet;
    console.log(this.exam_dump[this.problem_number].Number);
    console.log((this.exam_dump[this.problem_number].Number).substring(0, (this.exam_dump[this.problem_number].Number).indexOf('-')));
    console.log(this.dumpService.exam_attribute_dump[(this.exam_dump[this.problem_number].Number).substring(0, (this.exam_dump[this.problem_number].Number).indexOf('-'))].RefSheet);
  }

  select_mc_key(num: number, choice: string) {
    for (let k of Object.keys(this.exam_dump[num].AnswerChoices)) {
      this.exam_dump[num].AnswerChoices[k].Key.Correct = false;
    }
    this.exam_dump[num].AnswerChoices[choice].Key.Correct = true;
  }

  attempt_mc_problem(choice: string, part: string) {
    var part_num = 0;
    if (part != '') {
      var part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
    }
    if (choice != this.problem_selection[part_num][0]) {
      this.problem_attempts[part_num] += 1;
      this.attempt_path[part_num].push([choice]);
      this.problem_selection[part_num] = [choice];
      for (const [num, prob] of Object.entries(this.exam_dump)) {
        if (this.problem_number == +num) {
          if (part == '') {
            for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
              if (ch == choice) {
                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                if (key.Key.Correct == true) {
                  if (this.problem_attempts[part_num] == 1) {
                    this.streak_count += 1;
                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                  }
                  else {
                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                  }
                  if (this.mode == 'explain') {
                    this.confetti_light(this.problem_attempts[part_num]);
                  }
                }
                else {
                  this.streak_count = 0;
                  this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                }
              }
            }
          }
          else {
            for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
              if (ch == choice) {
                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                if (key.Key.Correct == true) {
                  if (this.problem_attempts[part_num] == 1) {
                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                  }
                  else {
                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                  }
                  if (this.mode == 'explain') {
                    this.confetti_light(this.problem_attempts[part_num]);
                  }
                }
                else {
                  this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                }
              }
            }
          }
        }
      }
    }
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

  attempt_imc_problem(choice: string, part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
    }
    if (choice != this.problem_selection[part_num][0]) {
      this.problem_attempts[part_num] += 1;
      this.attempt_path[part_num].push(choice);
      this.problem_selection[part_num] = [choice];
      console.log(this.problem_selection);
      for (const [num, prob] of Object.entries(this.exam_dump)) {
        if (this.problem_number == +num) {
          if (Object.keys(prob.Parts).length == 0) {
            for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
              if (choice == ch) {
                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                if (key.Key.Correct == true) {
                  if (this.problem_attempts[part_num] == 1) {
                    this.streak_count += 1;
                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                  }
                  else {
                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                  }
                  if (this.mode == 'explain') {
                    this.confetti_light(this.problem_attempts[part_num]);
                  }
                }
                else {
                  this.streak_count = 0;
                  this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                }
              }
            }
          }
          else {
            for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
              if (choice == ch) {
                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                if (key.Key.Correct == true) {
                  if (this.problem_attempts[part_num] == 1) {
                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                  }
                  else {
                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                  }
                  if (this.mode == 'explain') {
                    this.confetti_light(this.problem_attempts[part_num]);
                  }
                }
                else {
                  this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
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

  select_ms_key(num: number, choice: string) {
    this.exam_dump[num].AnswerChoices[choice].Key.Correct = !this.exam_dump[num].AnswerChoices[choice].Key.Correct;
  }

  attempt_ms_problem(choice: string, part: string) {
    var part_num = 0;
    if (part != '') {
      var part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
    }
    for (const [num, prob] of Object.entries(this.exam_dump)) {
      if (this.problem_number == +num) {
        this.attempt_response[part_num] = "";
        if (part == '') {
          for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
            if (choice == ch) {
              if (!this.problem_selection[part_num].includes(choice)) {
                this.attempt_explanation[part_num].push(key.Key.Rationale);
                this.problem_selection[part_num].push(choice);
              }
              else {
                if (this.problem_selection[part_num].indexOf(choice) != -1) {
                  this.attempt_explanation[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
                  this.problem_selection[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
                }
                else {
                  this.attempt_explanation[part_num].pop();
                  this.problem_selection[part_num].pop();
                }
              }
            }
            if ((key.Key.Correct == false && this.problem_selection[part_num].includes(ch)) || (key.Key.Correct == true && !this.problem_selection[part_num].includes(ch))) {
              this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
            }
          }
        }
        else {
          for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
            if (choice == ch) {
              if (!this.problem_selection[part_num].includes(choice)) {
                this.attempt_explanation[part_num].push(key.Key.Rationale);
                this.problem_selection[part_num].push(choice);
              }
              else {
                if (this.problem_selection[part_num].indexOf(choice) != -1) {
                  this.attempt_explanation[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
                  this.problem_selection[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
                }
                else {
                  this.attempt_explanation[part_num].pop();
                  this.problem_selection[part_num].pop();
                }
              }
            }
            if ((key.Key.Correct == false && this.problem_selection[part_num].includes(ch)) || (key.Key.Correct == true && !this.problem_selection[part_num].includes(ch))) {
              this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
            }
          }
        }
        if (!this.attempt_response[part_num].startsWith('That is not the correct answer')) {
          if (this.problem_attempts[part_num] == 1) {
            this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
          }
          else {
            this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
          }
          if (this.mode == 'explain') {
            this.confetti_light(this.problem_attempts[part_num]);
          }
        }
      }
    }
    this.problem_attempts[part_num] += 1;
    var current_selection = [];
    for (let sel of this.problem_selection[part_num]) {
      current_selection.push(sel);
    }
    this.attempt_path[part_num].push(current_selection);
    console.log(this.attempt_path[part_num]);
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

  attempt_ims_problem(choice: string, part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
    }
    this.problem_attempts[part_num] += 1;
    this.attempt_path[part_num].push(this.problem_selection[part_num]);
    for (const [num, prob] of Object.entries(this.exam_dump)) {
      if (this.problem_number == +num) {
        this.attempt_response[part_num] = "";
        if (part == '') {
          for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
            if (choice == ch) {
              if (!this.problem_selection[part_num].includes(choice)) {
                this.attempt_explanation[part_num].push(key.Key.Rationale);
                this.problem_selection[part_num].push(choice);
              }
              else {
                if (this.problem_selection[part_num].indexOf(choice) != -1) {
                  this.attempt_explanation[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
                  this.problem_selection[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
                }
                else {
                  this.attempt_explanation[part_num].pop();
                  this.problem_selection[part_num].pop();
                }
              }
            }
            if ((key.Key.Correct == false && this.problem_selection[part_num].includes(ch)) || (key.Key.Correct == true && !this.problem_selection[part_num].includes(ch))) {
              this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
            }
          }
        }
        else {
          for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
            if (choice == ch) {
              if (!this.problem_selection[part_num].includes(choice)) {
                this.attempt_explanation[part_num].push(key.Key.Rationale);
                this.problem_selection[part_num].push(choice);
              }
              else {
                if (this.problem_selection[part_num].indexOf(choice) != -1) {
                  this.attempt_explanation[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
                  this.problem_selection[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
                }
                else {
                  this.attempt_explanation[part_num].pop();
                  this.problem_selection[part_num].pop();
                }
              }
            }
            if ((key.Key.Correct == false && this.problem_selection[part_num].includes(ch)) || (key.Key.Correct == true && !this.problem_selection[part_num].includes(ch))) {
              this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
            }
          }
        }
        if (!this.attempt_response[part_num].startsWith('That is not the correct answer')) {
          if (this.problem_attempts[part_num] == 1) {
            this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
          }
          else {
            this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
          }
          if (this.mode == 'explain') {
            this.confetti_light(this.problem_attempts[part_num]);
          }
        }
      }
    }
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

  attempt_idd_problem(inum: string, choice: string, part: string) {
    var part_num = 0;
    var index: number = +inum - 1;
    if (part != '') {
      part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
    }
    if (choice != this.problem_selection[part_num][index]) {
      this.problem_attempts[part_num] += 1;
      this.problem_selection[part_num][index] = choice;
      console.log(this.problem_selection);
      this.attempt_path[part_num].push(this.problem_selection[part_num]);
      for (const [num, prob] of Object.entries(this.exam_dump)) {
        if (this.problem_number == +num) {
          if (part == '') {
            for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
              if (inum + ':' + choice == ch) {
                console.log(ch);
                this.attempt_explanation[part_num][index] = key.Key.Rationale;
                if (!key.Key.Correct) {
                  this.streak_count = 0;
                  this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                  console.log(this.attempt_response);
                }
              }
            }
          }
          else {
            for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
              if (inum + ':' + choice == ch) {
                this.attempt_explanation[part_num][index] = key.Key.Rationale;
                if (!key.Key.Correct) {
                  this.streak_count = 0;
                  this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                }
              }
            }
          }
          if (!this.problem_selection[part_num].includes('')) {
            var correct_attempt: boolean = true;
            for (let i = 0; i < this.problem_selection[part_num].length; i++) {
              if (part == '') {
                if (!this.exam_dump[this.problem_number].AnswerChoices['' + (i + 1) + ':' + this.problem_selection[part_num][i]].Key.Correct) {
                  correct_attempt = false;
                }
              }
              else {
                if (!this.exam_dump[this.problem_number].Parts[part].AnswerChoices['' + (i + 1) + ':' + this.problem_selection[part_num][i]].Key.Correct) {
                  correct_attempt = false;
                }
              }
            }
            if (correct_attempt) {
              if (this.problem_attempts[part_num] == 1) {
                this.streak_count += 1;
                this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
              }
              else {
                this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
              }
              if (this.mode == 'explain') {
                this.confetti_light(this.problem_attempts[part_num]);
              }
            }
          }
        }
      }
      setTimeout(() => {
        this.update_DD(inum, part);
      }, 100);
    }
    console.log(this.problem_selection);
    console.log(this.attempt_response);
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

  attempt_lp_problem(numb: number, part: string) {
    var choice = '';
    var part_num = 0;
    if (part != '') {
      var part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
      for (let ch of Object.keys(this.exam_dump[this.problem_number].Parts[part].AnswerChoices)) {
        if (+this.exam_dump[this.problem_number].Parts[part].AnswerChoices[ch].Choice == numb) {
          choice = ch[0];
        }
      }
    }
    else {
      for (let ch of Object.keys(this.exam_dump[this.problem_number].AnswerChoices)) {
        if (+this.exam_dump[this.problem_number].AnswerChoices[ch].Choice == numb) {
          choice = ch[0];
        }
      }
    }
    if (choice != this.problem_selection[part_num][0]) {
      this.problem_attempts[part_num] += 1;
      this.attempt_path[part_num].push([choice]);
      this.problem_selection[part_num] = [choice];
      for (const [num, prob] of Object.entries(this.exam_dump)) {
        if (this.problem_number == +num) {
          if (part == '') {
            for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
              if (ch[0] == choice) {
                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                if (key.Key.Correct == true) {
                  if (this.problem_attempts[part_num] == 1) {
                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                  }
                  else {
                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                  }
                  if (this.mode == 'explain') {
                    this.confetti_light(this.problem_attempts[part_num]);
                  }
                }
                else {
                  this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                }
              }
            }
          }
          else {
            for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
              if (ch[0] == choice) {
                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                if (key.Key.Correct == true) {
                  if (this.problem_attempts[part_num] == 1) {
                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                  }
                  else {
                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                  }
                  if (this.mode == 'explain') {
                    this.confetti_light(this.problem_attempts[part_num]);
                  }
                }
                else {
                  this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                }
              }
            }
          }
        }
      }
    }
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

  attempt_gp_problem(xnum: number, ynum: number, part: string) {
    var choice = '(' + '' + xnum + ',' + '' + ynum + ')';
    console.log(choice);
    var part_num = 0;
    if (part != '') {
      var part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
    }
    if (choice != this.problem_selection[part_num][0]) {
      this.problem_attempts[part_num] += 1;
      this.attempt_path[part_num].push([choice]);
      this.problem_selection[part_num] = [choice];
      for (const [num, prob] of Object.entries(this.exam_dump)) {
        if (this.problem_number == +num) {
          if (part == '') {
            for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
              if (choice == key.Choice) {
                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                if (this.problem_attempts[part_num] == 1) {
                  this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                }
                else {
                  this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                }
                if (this.mode == 'explain') {
                  this.confetti_light(this.problem_attempts[part_num]);
                }
              }
              else {
                this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
              }
            }
          }
          else {
            for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
              if (choice == key.Choice) {
                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                if (this.problem_attempts[part_num] == 1) {
                  this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                }
                else {
                  this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                }
                if (this.mode == 'explain') {
                  this.confetti_light(this.problem_attempts[part_num]);
                }
              }
              else {
                this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
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

  attempt_mgp_problem(xnum: number, ynum: number, part: string) {
    var choice = '(' + '' + xnum + ',' + '' + ynum + ')';
    console.log(choice);
    var part_num = 0;
    if (part != '') {
      var part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
    }
    var choice_in_key = false;
    for (const [num, prob] of Object.entries(this.exam_dump)) {
      if (this.problem_number == +num) {
        this.attempt_response[part_num] = "";
        if (part == '') {
          if (this.problem_selection[part_num].includes(choice)) {
            if (this.problem_selection[part_num].indexOf(choice) != -1) {
              this.attempt_explanation[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
              this.problem_selection[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
            }
            else {
              this.attempt_explanation[part_num].pop();
              this.problem_selection[part_num].pop();
            }
          }
          else {
            this.problem_selection[part_num].push(choice);
            for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
              if (choice == key.Choice) {
                choice_in_key = true;
                this.attempt_explanation[part_num].push(key.Key.Rationale);
              }
            }
            if (!choice_in_key) {
              this.attempt_explanation[part_num].push('');
            }
          }
          for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
            if (!this.problem_selection[part_num].includes(key.Choice)) {
              console.log('missing selection');
              this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
            }
          }
          var graph_key = [];
          for (let ch of Object.values(prob.AnswerChoices)) {
            graph_key.push(ch.Choice)
          }
          for (let sel of this.problem_selection[part_num]) {
            if (!graph_key.includes(sel)) {
              console.log('extra selection');
              this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
            }
          }
        }
        else {
          if (this.problem_selection[part_num].includes(choice)) {
            if (this.problem_selection[part_num].indexOf(choice) != -1) {
              this.attempt_explanation[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
              this.problem_selection[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
            }
            else {
              this.attempt_explanation[part_num].pop();
              this.problem_selection[part_num].pop();
            }
          }
          else {
            this.problem_selection[part_num].push(choice);
            for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
              if (choice == key.Choice) {
                choice_in_key = true;
                this.attempt_explanation[part_num].push(key.Key.Rationale);
              }
            }
            if (!choice_in_key) {
              this.attempt_explanation[part_num].push('');
            }
          }
          for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
            if (!this.problem_selection[part_num].includes(key.Choice)) {
              console.log('missing selection');
              this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
            }
          }
          var graph_key = [];
          for (let ch of Object.values(prob.Parts[part].AnswerChoices)) {
            graph_key.push(ch.Choice)
          }
          for (let sel of this.problem_selection[part_num]) {
            if (!graph_key.includes(sel)) {
              console.log('extra selection');
              this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
            }
          }
        }
        if (!this.attempt_response[part_num].startsWith('That is not the correct answer')) {
          if (this.problem_attempts[part_num] == 1) {
            this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
          }
          else {
            this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
          }
          if (this.mode == 'explain') {
            this.confetti_light(this.problem_attempts[part_num]);
          }
        }
      }
    }
    this.problem_attempts[part_num] += 1;
    var current_selection = [];
    for (let sel of this.problem_selection[part_num]) {
      current_selection.push(sel);
    }
    this.attempt_path[part_num].push(current_selection);
    console.log(this.attempt_path[part_num]);
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

  attempt_t_problem(choice: string, inum: string, part: string) {
    var correct: boolean = false;
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
    }
    if (choice != this.problem_selection[part_num][+inum - 1]) {
      this.problem_attempts[part_num] += 1;
      this.problem_selection[part_num][+inum - 1] = choice;
      this.attempt_path[part_num].push(this.problem_selection[part_num]);
      this.attempt_response[part_num] = '';
      for (const [num, prob] of Object.entries(this.exam_dump)) {
        if (this.problem_number == +num) {
          if (part == '') {
            for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
              if (inum + ':KEY' == ch && choice == key.Choice) {
                correct = true;
                this.attempt_explanation[part_num][+inum - 1] = key.Key.Rationale;
              }
            }
          }
          else {
            for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
              if (inum + ':KEY' == ch && choice == key.Choice) {
                correct = true;
                this.attempt_explanation[part_num][+inum - 1] = key.Key.Rationale;
              }
            }
          }
          if (!correct) {
            this.attempt_explanation[part_num][+inum - 1] = '';
            this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
          }
          for (let sub of Object.keys(this.problem_selection[part_num])) {
            if (this.problem_selection[part_num][+sub] == '') {
              this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
            }
          }
          if (!this.attempt_response[part_num].startsWith('That is not the correct answer')) {
            if (this.problem_attempts[part_num] == 1) {
              this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
            }
            else {
              this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
            }
            if (this.mode == 'explain') {
              this.confetti_light(this.problem_attempts[part_num]);
            }
          }
        }
      }
    }
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

  select_fr_key(num: number, choice: string) {
    this.exam_dump[num].AnswerChoices['KEY'].Choice = choice;
    this.exam_dump[num].AnswerChoices['KEY'].Key.Correct = true;
    console.log(this.exam_dump);
  }

  attempt_fr_problem(choice: string, part: string) {
    var part_num = 0;
    if (part != '') {
      var part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
    }
    if (choice != this.problem_selection[part_num][0]) {
      this.problem_attempts[part_num] += 1;
      this.attempt_path[part_num].push([choice]);
      this.problem_selection[part_num] = [choice];
      for (const [num, prob] of Object.entries(this.exam_dump)) {
        if (this.problem_number == +num) {
          if (part == '') {
            for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
              if (choice == key.Choice) {
                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                if (this.problem_attempts[part_num] == 1) {
                  this.streak_count += 1;
                  this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                }
                else {
                  this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                }
                if (this.mode == 'explain') {
                  this.confetti_light(this.problem_attempts[part_num]);
                }
              }
              else {
                this.streak_count = 0;
                this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
              }
            }
          }
          else {
            for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
              if (choice == key.Choice) {
                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                if (this.problem_attempts[part_num] == 1) {
                  this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                }
                else {
                  this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                }
                if (this.mode == 'explain') {
                  this.confetti_light(this.problem_attempts[part_num]);
                }
              }
              else {
                this.streak_count = 0;
                this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
              }
            }
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

  attempt_mfr_problem(choice: string, inum: string, part: string) {
    var correct: boolean = false;
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
    }
    if (choice != this.problem_selection[part_num][+inum - 1]) {
      this.problem_attempts[part_num] += 1;
      this.problem_selection[part_num][+inum - 1] = choice;
      this.attempt_path[part_num].push(this.problem_selection[part_num]);
      this.attempt_response[part_num] = '';
      for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
        if (this.problem_number == +num) {
          if (part == '') {
            for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
              if (inum + ':KEY' == ch && choice == key.Choice) {
                correct = true;
                this.attempt_explanation[part_num][+inum - 1] = key.Key.Rationale;
              }
            }
          }
          else {
            for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
              if (inum + ':KEY' == ch && choice == key.Choice) {
                correct = true;
                this.attempt_explanation[part_num][+inum - 1] = key.Key.Rationale;
              }
            }
          }
          if (!correct) {
            this.attempt_explanation[part_num][+inum - 1] = '';
            this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
          }
          for (let sub of Object.keys(this.problem_selection[part_num])) {
            if (this.problem_selection[part_num][+sub] == '') {
              this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
            }
          }
          if (!this.attempt_response[part_num].startsWith('That is not the correct answer')) {
            if (this.problem_attempts[part_num] == 1) {
              this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
            }
            else {
              this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
            }
            if (this.mode == 'explain') {
              this.confetti_light(this.problem_attempts[part_num]);
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

  attempt_sr_problem(choice: string, part: string) {
    var part_num = 0;
    if (part != '') {
      var part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
    }
    if (choice != this.problem_selection[part_num][0]) {
      this.problem_attempts[part_num] += 1;
      this.attempt_path[part_num].push([choice]);
      this.problem_selection[part_num] = [choice];
      for (const [num, prob] of Object.entries(this.exam_dump)) {
        if (this.problem_number == +num) {
          if (part == '') {
            for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
              if (choice == key.Choice) {
                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                if (this.problem_attempts[part_num] == 1) {
                  this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                }
                else {
                  this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                }
                if (this.mode == 'explain') {
                  this.confetti_light(this.problem_attempts[part_num]);
                }
              }
              else {
                this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
              }
            }
          }
          else {
            for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
              if (choice == key.Choice) {
                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                if (this.problem_attempts[part_num] == 1) {
                  this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                }
                else {
                  this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                }
                if (this.mode == 'explain') {
                  this.confetti_light(this.problem_attempts[part_num]);
                }
              }
              else {
                this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
              }
            }
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

  attempt_mr_problem(response: string, part: string) {
    var part_num = 0;
    if (part != '') {
      var part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
    }
    if (response != this.problem_selection[part_num][0]) {
      this.problem_selection[part_num] = [response];
      this.problem_attempts[part_num] += 1;
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

  attempt_lr_problem(response: string, part: string) {
    var part_num = 0;
    if (part != '') {
      var part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
    }
    if (response != this.problem_selection[part_num][0]) {
      this.problem_selection[part_num] = [response];
      this.problem_attempts[part_num] += 1;
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

  get_choices_idd(num: string, part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
    }
    var choices: any = {};
    if (part == '') {
      for (let key of Object.keys(this.exam_dump[this.problem_number].AnswerChoices)) {
        if (key[0] == num) {
          choices[key[2]] = this.exam_dump[this.problem_number].AnswerChoices[key].Choice;
        }
      }
    }
    else {
      for (let key of Object.keys(this.exam_dump[this.problem_number].Parts[part].AnswerChoices)) {
        if (key[0] == num) {
          choices[key[2]] = this.exam_dump[this.problem_number].Parts[part].AnswerChoices[key].Choice;
        }
      }
    }
    return (choices);
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

  shuffle_m(choices: any, part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
    }
    if (!Object.keys(this.shuffle_choices).includes('' + part_num)) {
      this.m_shuffled = false;
      this.shuffle_choices['' + part_num] = []
    }
    if (!this.m_shuffled) {
      if (part == '') {
        if (this.exam_dump[this.problem_number].Type == 'G') {
          var trimmed_choices: string[] = [];
          for (let ch of Object.keys(choices)) {
            if (!trimmed_choices.includes(ch.substring(0, ch.length - 2))) {
              trimmed_choices.push(ch.substring(0, ch.length - 2));
            }
          }
          this.choices_sequence = trimmed_choices;
        }
        else {
          this.choices_sequence = Array.from(Object.keys(choices));
        }
      }
      else {
        if (this.exam_dump[this.problem_number].Parts[part].Type == 'G') {
          var trimmed_choices: string[] = [];
          for (let ch of Object.keys(choices)) {
            if (!trimmed_choices.includes(ch.substring(0, ch.length - 2))) {
              trimmed_choices.push(ch.substring(0, ch.length - 2));
            }
          }
          this.choices_sequence = trimmed_choices;
        }
        else {
          this.choices_sequence = Array.from(Object.keys(choices));
        }
      }
      this.random_list = [];
      this.shuffle_choices['' + part_num] = [];
      const num_choices1 = this.choices_sequence.length;
      for (let i = 0; i < num_choices1; i++) {
        if (this.choices_sequence[num_choices1 - i - 1] == '' || this.choices_sequence[num_choices1 - i - 1][0] == ' ') {
          this.choices_sequence.splice(num_choices1 - i - 1, 1);
        }
      }
      const num_choices = this.choices_sequence.length;
      for (let i = 0; i < num_choices; i++) {
        this.random_index = Math.floor(Math.random() * this.choices_sequence.length);
        this.random_list.push(this.choices_sequence[this.random_index]);
        this.shuffle_choices['' + part_num][i] = this.choices_sequence[this.random_index];
        this.choices_sequence.splice(this.random_index, 1);
        console.log(i);
        console.log(this.random_index);
      }
      console.log(this.shuffle_choices);
      this.m_shuffled = true;
    }
    return (this.shuffle_choices['' + part_num].sort());
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

  unique_m(choices: any, part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
    }
    this.unique_choices[part_num] = [];
    for (const [key, choice] of Object.entries(choices)) {
      if ((choice as any).Choice != '' && (!this.unique_choices[part_num].includes((choice as any).Choice) || !Object.keys(this.c_submission[part_num]).includes((choice as any).Choice[0]) || key[0] == ' ')) {
        if (this.exam_dump[this.problem_number].Type == 'O' || (this.exam_dump[this.problem_number].Type == 'MP' && this.exam_dump[this.problem_number].Parts[part].Type == 'O')) {
          this.unique_choices[part_num].push((choice as any).Choice + ':' + key[0])
        }
        else if (!this.unique_choices[part_num].includes((choice as any).Choice)) {
          this.unique_choices[part_num].push((choice as any).Choice);
        }
        this.m_submission[part_num][(choice as any).Choice[0]] = "";
        if (!Object.keys(this.c_submission[part_num]).includes((choice as any).Choice[0])) {
          this.c_submission[part_num][(choice as any).Choice[0]] = [""];
        }
        if (key[0] == ' ' && (choice as any).Key.Correct) {
          this.m_submission[part_num][(choice as any).Choice[0]] = key;
          this.c_submission[part_num][(choice as any).Choice[0]] = [key].concat(this.c_submission[part_num][(choice as any).Choice[0]]);
          console.log(this.c_submission);
        }
        this.problem_selection[part_num][+(choice as any).Choice[0] - 1] = [""];
        this.attempt_explanation[part_num][+(choice as any).Choice[0] - 1] = [""];
      }
    }
    this.unique_choices[part_num].sort();
    console.log(this.unique_choices[part_num].sort());
    // return (unique_choices);
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

  select_m_choice(ch: string, p: number, part: string) {
      var part_num = 0;
      if (part != '') {
          part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
      }
      this.m_selection[part_num][p] = ch;
      if (this.m_selection[part_num][0] != '' && this.m_selection[part_num][1] != '') {
          this.m_submission[part_num][this.m_selection[part_num][1]] = this.m_selection[part_num][0];
          this.problem_selection[part_num][+this.m_selection[part_num][1] - 1] = this.m_selection[part_num][0][0];
          // this.attempt_path[part_num].push();
          this.problem_attempts[part_num] += 1;
          this.is_m_correct(part, true);
          this.m_selection[part_num] = ["", ""];
      }
      console.log(this.problem_selection);
      console.log(this.attempt_explanation);
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

  remove_m_choice(ch: string, part: string) {
      var part_num = 0;
      if (part != '') {
          part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
      }
      this.m_submission[part_num][ch] = '';
      this.problem_selection[part_num][+ch - 1] = '';
      this.attempt_explanation[part_num][+ch - 1] = '';
      this.select_m_choice('', 1, part)
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

  is_matched(ch: string, p: number, part: string) {
      var part_num = 0;
      if (part != '') {
          part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
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

  select_c_choice(ch: string, p: number, part: string) {
      var part_num = 0;
      if (part != '') {
          part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
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
          this.problem_selection[part_num][+this.m_selection[part_num][1] - 1] = cat_choices;
          this.attempt_path[part_num].push();
          this.problem_attempts[part_num] += 1;
          if (this.exam_dump[this.problem_number].Type == 'C' || (this.exam_dump[this.problem_number].Type == 'MP' && this.exam_dump[this.problem_number].Parts[part].Type == 'C')) {
              this.is_c_correct(part, true);
          }
          else if (this.exam_dump[this.problem_number].Type == 'G' || (this.exam_dump[this.problem_number].Type == 'MP' && this.exam_dump[this.problem_number].Parts[part].Type == 'G')) {
              this.is_g_correct(part, true);
          }
          this.m_selection[part_num] = ["", ""];
      }
      console.log(this.m_selection);
      console.log(this.c_submission);
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

  remove_c_choice(ch: string, part: string) {
      var part_num = 0;
      if (part != '') {
          part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
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
      for (let cat of this.problem_selection[part_num]) {
          if (cat.includes(ch)) {
              if (cat.indexOf(ch) != -1) {
                  this.attempt_explanation[part_num][this.problem_selection[part_num].indexOf(cat)].splice(cat.indexOf(ch), 1);
                  cat.splice(cat.indexOf(ch), 1)
              }
              else {
                  this.attempt_explanation[part_num][this.problem_selection[part_num].indexOf(cat)].pop();
                  cat.pop();
              }
          }
      }
      this.is_c_correct(part, true);
      this.select_c_choice('', 1, part);
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

  remove_g_choice(ch: string, cat: string, part: string) {
      var part_num = 0;
      if (part != '') {
          part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
      }
      if (this.c_submission[part_num][cat].includes(ch)) {
          if (this.c_submission[part_num][cat].indexOf(ch) != -1) {
              this.c_submission[part_num][cat].splice(this.c_submission[part_num][cat].indexOf(ch), 1);
          }
          else {
              this.c_submission[part_num][cat].pop()
          }
      }
      if (this.problem_selection[part_num][+cat - 1].includes(ch)) {
          if (this.problem_selection[part_num][+cat - 1].indexOf(ch) != -1) {
              this.attempt_explanation[part_num][this.problem_selection[part_num].indexOf(this.problem_selection[part_num][+cat - 1])].splice(this.problem_selection[part_num][+cat - 1].indexOf(ch), 1);
              this.problem_selection[part_num][+cat - 1].splice(this.problem_selection[part_num][+cat - 1].indexOf(ch), 1)
          }
          else {
              this.attempt_explanation[part_num][this.problem_selection[part_num].indexOf(this.problem_selection[part_num][+cat - 1])].pop();
              this.problem_selection[part_num][+cat - 1].pop();
          }
      }
      this.is_g_correct(part, true);
      this.select_c_choice('', 1, part);
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

  is_idd_correct(part: string) {
      var part_num = 0;
      if (part != '') {
          part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
      }
      for (let choice of Object.keys(this.exam_dump[this.problem_number].AnswerChoices)) {
          if (this.exam_dump[this.problem_number].AnswerChoices[choice].Key.Correct) {
              if (this.problem_selection[part_num][(+this.exam_dump[this.problem_number].AnswerChoices[choice].Choice[0]) - 1] != this.exam_dump[this.problem_number].AnswerChoices[choice].Choice[2]) {
                  return false;
              }
          }
      }
      return true;
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

  is_m_correct(part: string, fetti: boolean) {
      var part_num = 0;
      var correct: boolean = true;
      if (part != '') {
          part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
      }
      var unique_c: string[] = [];
      if (Object.keys(this.exam_dump[this.problem_number].Parts).length == 0) {
          for (let choice of Object.keys(this.exam_dump[this.problem_number].AnswerChoices)) {
              if (!unique_c.includes(choice) && choice[0] != ' ' && choice != '') {
                  unique_c.push(choice)
              }
          }
          for (let choice of unique_c) {
              if (this.m_submission[part_num][this.exam_dump[this.problem_number].AnswerChoices[choice].Choice[0]] == choice) {
                  if (fetti) {
                      this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = this.exam_dump[this.problem_number].AnswerChoices[this.m_selection[part_num][0]].Key.Rationale;
                  }
              }
              else if (this.exam_dump[this.problem_number].AnswerChoices[choice].Key.Correct) {
                  this.streak_count = 0;
                  this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                  this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = '';
                  correct = false;
              }
          }
      }
      else {
          for (let choice of Object.keys(this.exam_dump[this.problem_number].Parts[part].AnswerChoices)) {
              if (!unique_c.includes(choice) && choice[0] != ' ' && choice != '') {
                  unique_c.push(choice)
              }
          }
          for (let choice of unique_c) {
              if (this.m_submission[part_num][this.exam_dump[this.problem_number].Parts[part].AnswerChoices[choice].Choice[0]] == choice) {
                  if (fetti) {
                      this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = this.exam_dump[this.problem_number].Parts[part].AnswerChoices[this.m_selection[part_num][0]].Key.Rationale;
                  }
              }
              else if (this.exam_dump[this.problem_number].Parts[part].AnswerChoices[choice].Key.Correct) {
                  this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                  this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = '';
                  correct = false;
              }
          }
      }
      for (let sub of Object.keys(this.m_submission[part_num])) {
          if (this.m_submission[part_num][sub].length == 1 && this.m_submission[part_num][sub][0] == '') {
              this.streak_count = 0;
              this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
              correct = false;
          }
      }
      if (correct && this.problem_attempts[part_num] == 1) {
          this.subtopic_streak_count += 1;
          this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
      }
      else if (correct) {
          this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
      }
      // for (let selec of this.m_submission[part_num])
      if (correct && fetti) {
          this.confetti_light(this.problem_attempts[part_num]);
      }
      return correct;
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

  is_c_correct(part: string, fetti: boolean) {
      var part_num = 0;
      var correct: boolean = true;
      if (part != '') {
          part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
      }
      var unique_c: string[] = [];
      if (Object.keys(this.exam_dump[this.problem_number].Parts).length == 0) {
          for (let choice of Object.keys(this.exam_dump[this.problem_number].AnswerChoices)) {
              if (!unique_c.includes(choice) && choice[0] != ' ' && choice != '') {
                  unique_c.push(choice)
              }
          }
          for (let choice of unique_c) {
              if (this.exam_dump[this.problem_number].AnswerChoices[choice].Choice != '' && this.c_submission[part_num][this.exam_dump[this.problem_number].AnswerChoices[choice].Choice[0]].includes(choice)) {
                  if (fetti) {
                      console.log(this.exam_dump[this.problem_number].AnswerChoices[this.m_selection[part_num][0]].Key.Rationale);
                      if (this.exam_dump[this.problem_number].AnswerChoices[this.m_selection[part_num][0]].Choice[0] == this.m_selection[part_num][1]) {
                          this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [this.exam_dump[this.problem_number].AnswerChoices[this.m_selection[part_num][0]].Key.Rationale].concat(this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                      }
                      else {
                          this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [''].concat(this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                      }
                  }
              }
              else {
                  this.streak_count = 0;
                  this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                  correct = false;
              }
          }
      }
      else {
          for (let choice of Object.keys(this.exam_dump[this.problem_number].Parts[part].AnswerChoices)) {
              if (!unique_c.includes(choice) && choice[0] != ' ' && choice != '') {
                  unique_c.push(choice)
              }
          }
          for (let choice of unique_c) {
              if (this.c_submission[part_num][this.exam_dump[this.problem_number].Parts[part].AnswerChoices[choice].Choice[0]].includes(choice)) {
                  if (fetti) {
                      console.log(this.exam_dump[this.problem_number].Parts[part].AnswerChoices[this.m_selection[part_num][0]].Key.Rationale);
                      if (this.exam_dump[this.problem_number].Parts[part].AnswerChoices[this.m_selection[part_num][0]].Choice[0] == this.m_selection[part_num][1]) {
                          this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [this.exam_dump[this.problem_number].Parts[part].AnswerChoices[this.m_selection[part_num][0]].Key.Rationale].concat(this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                      }
                      else {
                          this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [''].concat(this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                      }
                  }
              }
              else {
                  this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                  correct = false;
              }
          }
      }
      if (correct && this.problem_attempts[part_num] == 1) {
          this.streak_count += 1;
          this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
      }
      else if (correct) {
          this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
      }
      if (correct && fetti) {
          this.confetti_light(this.problem_attempts[part_num]);
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

  is_g_correct(part: string, fetti: boolean) {
      var part_num = 0;
      var correct: boolean = true;
      if (part != '') {
          part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
      }
      var unique_c: string[] = [];
      if (Object.keys(this.exam_dump[this.problem_number].Parts).length == 0) {
          for (let choice of Object.keys(this.exam_dump[this.problem_number].AnswerChoices)) {
              if (!unique_c.includes(choice.substring(0, choice.length - 2)) && choice.substring(0, choice.length - 2) != '') {
                  unique_c.push(choice.substring(0, choice.length - 2));
              }
          }
          for (let choice of Object.keys(this.exam_dump[this.problem_number].AnswerChoices)) {
              if (choice.substring(0, choice.length - 2) != '' && this.exam_dump[this.problem_number].AnswerChoices[choice].Key.Correct && !this.c_submission[part_num][choice[choice.length - 1]].includes(choice.substring(0, choice.length - 2))) {
                  this.streak_count += 0;
                  this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                  correct = false;
              }
          }
          for (let cat of Object.keys(this.c_submission[part_num])) {
              for (let choice of this.c_submission[part_num][cat]) {
                  if (choice != '' && Object.keys(this.exam_dump[this.problem_number].AnswerChoices).includes(choice + ':' + cat)) {
                      if (fetti) {
                          console.log(choice + ':' + cat);
                          console.log(this.exam_dump[this.problem_number].AnswerChoices[choice + ':' + cat].Key.Rationale);
                          if (this.exam_dump[this.problem_number].AnswerChoices[choice + ':' + cat].Choice[0] == this.m_selection[part_num][1]) {
                              this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [this.exam_dump[this.problem_number].AnswerChoices[choice + ':' + cat].Key.Rationale].concat(this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                          }
                          else {
                              this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [''].concat(this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                          }
                      }
                  }
                  else if (choice != '') {
                      this.streak_count = 0;
                      this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                      correct = false;
                  }
              }
          }
      }
      else {
          for (let choice of Object.keys(this.exam_dump[this.problem_number].Parts[part].AnswerChoices)) {
              if (!unique_c.includes(choice.substring(0, choice.length - 2)) && choice.substring(0, choice.length - 2) != '') {
                  unique_c.push(choice.substring(0, choice.length - 2))
              }
          }
          for (let choice of Object.keys(this.exam_dump[this.problem_number].Parts[part].AnswerChoices)) {
              if (choice.substring(0, choice.length - 2) != '' && this.exam_dump[this.problem_number].Parts[part].AnswerChoices[choice].Key.Correct && !this.c_submission[part_num][choice[choice.length - 1]].includes(choice.substring(0, choice.length - 2))) {
                  this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                  correct = false;
              }
          }
          for (let cat of Object.keys(this.c_submission[part_num])) {
              for (let choice of this.c_submission[part_num][cat]) {
                  if (choice != '' && Object.keys(this.exam_dump[this.problem_number].Parts[part].AnswerChoices).includes(choice + ':' + cat)) {
                      if (fetti) {
                          console.log(this.exam_dump[this.problem_number].Parts[part].AnswerChoices[choice + ':' + cat].Key.Rationale);
                          if (this.exam_dump[this.problem_number].Parts[part].AnswerChoices[choice + ':' + cat].Choice[0] == this.m_selection[part_num][1]) {
                              this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [this.exam_dump[this.problem_number].Parts[part].AnswerChoices[choice + ':' + cat].Key.Rationale].concat(this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                          }
                          else {
                              this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [''].concat(this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                          }
                      }
                  }
                  else if (choice != '') {
                      this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                      correct = false;
                  }
              }
          }
      }
      if (correct && this.problem_attempts[part_num] == 1) {
          this.streak_count += 1;
          this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
      }
      else if (correct) {
          this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
      }
      if (correct && fetti) {
          this.confetti_light(this.problem_attempts[part_num]);
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

  is_MP_complete() {
    var comp = true;
    if (this.mode == 'explain') {
      for (let resp of this.attempt_response) {
        if (resp == '' || !resp.startsWith('Correct')) {
          comp = false;
        }
      }
    }
    else if (this.mode == 'assess') {
      for (let tempt of this.problem_attempts) {
        if (tempt == 0) {
          comp = false;
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

  total_attempts(attempts: number[]) {
    var sum = 0;
    for (let num of attempts) {
      sum += num;
    }
    return (sum);
  }

  update_DD(index: string, part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
      if (this.exam_dump[this.problem_number].Parts[part].AnswerChoices[index + ':' + this.problem_selection[part_num][+index - 1]].Key.Correct) {
        const DDICel: string = "DDInputC-" + index;
        var dropdown: any = document.getElementById(DDICel);
      }
      else {
        const DDIIel: string = "DDInputI-" + index;
        var dropdown: any = document.getElementById(DDIIel);
      }
    }
    else {
      if (this.exam_dump[this.problem_number].AnswerChoices[index + ':' + this.problem_selection[part_num][+index - 1]].Key.Correct) {
        const DDICel: string = "DDInputC-" + index;
        var dropdown: any = document.getElementById(DDICel);
      }
      else {
        const DDIIel: string = "DDInputI-" + index;
        var dropdown: any = document.getElementById(DDIIel);
      }
    }
    dropdown.value = this.problem_selection[part_num][+index - 1];
  }

  get_T(index: string, part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
    }
    const TIel: string = "inputT-" + part + '-' + index;
    var input: any = document.getElementById(TIel);
    return input.value;
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

  get_MFR(index: string, part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
    }
    const MFRIel: string = "inputMFR-" + part + "-" + index;
    var dropdown: any = document.getElementById(MFRIel);
    return dropdown.value;
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

  toggleExamTimer() {
    this.et_running = !this.et_running;
    if (this.length_mode == 'number') {
      if (this.et_running) {
        const startTime = Date.now() - (this.et_counter || 0);
        this.et_timer = setInterval(() => {
          this.et_counter = Math.round((Date.now() - startTime) / 1000);
          this.et_minutes = Math.floor(this.et_counter / 60);
        });
      } else {
        clearInterval(this.et_timer);
      }
    }
    else {
      if (this.et_running) {
        const startTime = Date.now() - (this.et_counter || 0);
        this.et_timer = setInterval(() => {
          this.et_counter = Math.round(this.exam_timer * 60 - ((Date.now() - startTime) / 1000));
          this.et_minutes = Math.floor(this.et_counter / 60);
          if (this.et_counter <= 0) {
            this.completeExam();
          }
        });
      } else {
        clearInterval(this.et_timer);
      }
    }
  }

  clearExamTimer() {
    this.et_running = false;
    this.et_counter = 0;
    clearInterval(this.et_timer);
  }

  toggleProblemTimer() {
    this.pt_running = !this.pt_running;
    if (this.pt_running) {
      const startTime = Date.now() - (this.pt_counter || 0);
      this.pt_timer = setInterval(() => {
        this.pt_counter = Math.round((Date.now() - startTime) / 1000);
        this.pt_minutes = Math.floor(this.pt_counter / 60);
      });
    } else {
      clearInterval(this.pt_timer);
    }
  }

  clearProblemTimer() {
    this.pt_running = false;
    this.pt_counter = 0;
    clearInterval(this.pt_timer);
  }

  next_problem() {
    if (this.mode == 'assess') {
      this.exam_submission[this.problem_number].Time = (this.pt_minutes).toString() + 'm ' + (this.pt_counter % 60).toString() + 's';
      this.exam_submission[this.problem_number].Seconds = this.pt_counter;
      this.exam_submission[this.problem_number].Number = this.problem_number;
      this.exam_submission[this.problem_number].Topics = this.exam_dump[this.problem_number].Topics;
      this.exam_submission[this.problem_number].SubTopics = this.exam_dump[this.problem_number].SubTopics;
      this.exam_submission[this.problem_number].Choice = this.problem_selection;
      this.exam_submission[this.problem_number].Attempts = this.problem_attempts;
      this.exam_submission[this.problem_number].Path = this.attempt_path;
      // this.exam_submission[this.problem_number].Correct = this.exam_key[this.problem_number - 1];
      this.exam_submission[this.problem_number].Rationale = this.attempt_explanation;
      for (const [num, prob] of Object.entries(this.exam_dump)) {
        if (this.problem_number == +num) {
          for (const [num2, sub] of Object.entries(this.exam_submission)) {
            if (this.problem_number == +num2) {
              console.log(sub.Choice);
              // sub.Time = this.pt_minutes.toString() + 'm ' + (this.pt_counter % 60).toString() + 's';
              // sub.Seconds = this.pt_counter;
              // sub.Number = this.problem_number;
              // sub.Topics = prob.Topics;
              // sub.SubTopics = prob.SubTopics;
              // sub.Attempts = this.problem_attempts;
              // sub.Path = this.attempt_path;
              if (Object.keys(prob.Parts).length == 0) {
                // sub.Choice.push(sub.Path[0][sub.Path[0].length - 1]);
                var ms_correct = true;
                var mp_correct = true;
                if (['O', 'C', 'G'].includes(prob.Type)) {
                  if ((prob.Type == 'O' && this.is_m_correct('', false)) || (prob.Type == 'C' && this.is_c_correct('', false)) || (prob.Type == 'G' && this.is_g_correct('', false))) {
                    sub.Correct = [['✅']];
                    this.number_correct += 1;
                  }
                  else {
                    sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                  }
                  // sub.Rationale = this.attempt_explanation;
                }
                else if (['MR', 'LR'].includes(prob.Type)) {
                  sub.Correct = [['👀']];
                  if (this.problem_selection[0] == '') {
                    sub.Choice = [['No Student Response Given']];
                  }
                  else {
                    this.number_correct += 1;
                  }
                }
                else {
                  for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                    if (['MC', 'IMC'].includes(prob.Type)) {
                      if (sub.Attempts[0] > 0) {
                        if (sub.Path[0][sub.Path[0].length - 1][0] == ch) {
                          if (key.Key.Correct == true) {
                            sub.Correct = [['✅']];
                            this.number_correct += 1;
                          }
                          else {
                            sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                          }
                          // sub.Rationale = [[key.Key.Rationale]];
                        }
                      }
                    }
                    else if (['LP'].includes(prob.Type)) {
                      if (sub.Attempts[0] > 0) {
                        if (sub.Path[0][sub.Path[0].length - 1][0] == ch[0]) {
                          if (key.Key.Correct == true) {
                            sub.Correct = [['✅']];
                            this.number_correct += 1;
                          }
                          else {
                            sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                          }
                          // sub.Rationale = [[key.Key.Rationale]];
                        }
                      }
                    }
                    else if (['MS', 'IMS'].includes(prob.Type)) {
                      if (key.Key.Correct && !sub.Path[0][sub.Path[0].length - 1].includes(ch)) {
                        ms_correct = false;
                      }
                      else if (!key.Key.Correct && sub.Path[0][sub.Path[0].length - 1].includes(ch)) {
                        ms_correct = false;
                      }
                    }
                    else if (['MFR', 'IDD', 'T'].includes(prob.Type)) {
                      if (prob.Type == 'MFR') {
                        if (key.Key.Correct && ch.includes('KEY') && sub.Path[0][sub.Path[0].length - 1][+ch[0] - 1] != key.Choice) {
                          mp_correct = false;
                        }
                      }
                      if (prob.Type == 'T') {
                        if (key.Key.Correct && ch.includes('KEY') && sub.Path[0][sub.Path[0].length - 1][+ch[0] - 1] != key.Choice) {
                          mp_correct = false;
                        }
                      }
                      if (prob.Type == 'IDD') {
                        if (key.Key.Correct && sub.Path[0][sub.Path[0].length - 1][+ch[0] - 1] != ch[2]) {
                          mp_correct = false;
                        }
                        else if (!key.Key.Correct && sub.Path[0][sub.Path[0].length - 1][+ch[0] - 1] == ch[2]) {
                          mp_correct = false;
                        }
                      }
                    }
                    else if (prob.Type == 'FR') {
                      if (sub.Attempts[0] > 0) {
                        if (sub.Path[0][sub.Path[0].length - 1][0] == key.Choice) {
                          sub.Correct = [['✅']];
                          this.number_correct += 1;
                          // sub.Rationale = [[key.Key.Rationale]];
                        }
                        else {
                          sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                          // sub.Rationale = [['No rationale provided. The number submitted was not right']];
                        }
                      }
                    }
                  }
                }
                if (['MS', 'IMS'].includes(prob.Type) && ms_correct) {
                  sub.Correct = [['✅']];
                  this.number_correct += 1;
                }
                else if (['MS', 'IMS'].includes(prob.Type)) {
                  sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                }
                else if (['MFR', 'IDD', 'T'].includes(prob.Type) && (mp_correct || this.is_idd_correct(''))) {
                  sub.Correct = [['✅']];
                  this.number_correct += 1;
                }
                else if (['MFR', 'IDD', 'T'].includes(prob.Type)) {
                  sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                }
              }
              else {
                sub.Correct = [];
                // sub.Rationale = [];
                // sub.Rationale = this.attempt_explanation;
                for (const [name, part] of Object.entries(prob.Parts)) {
                  // sub.Choice.push(sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1]);
                  var ms_correct = true;
                  var mp_correct = true;
                  if (['O', 'C', 'G'].includes(part.Type)) {
                    if ((part.Type == 'O' && this.is_m_correct(name, false)) || (part.Type == 'C' && this.is_c_correct(name, false)) || (part.Type == 'G' && this.is_g_correct(name, false))) {
                      sub.Correct.push(['✅']);
                      this.number_correct += 1;
                    }
                    else {
                      sub.Correct.push(this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                    }
                    // sub.Rationale.push(this.attempt_explanation);
                  }
                  else if (['LR'].includes(part.Type)) {
                    sub.Correct.push(['👀']);
                    if (this.problem_selection[Object.keys(prob.Parts).indexOf(name)] == '') {
                      sub.Choice[Object.keys(prob.Parts).indexOf(name)] = ['No Student Response Given'];
                    }
                    else {
                      this.number_correct += 1;
                    }
                  }
                  else {
                    for (const [ch, key] of Object.entries(part.AnswerChoices)) {
                      if (['MC', 'IMC'].includes(part.Type)) {
                        if (sub.Attempts[Object.keys(prob.Parts).indexOf(name)] > 0) {
                          if (sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][0] == ch) {
                            if (key.Key.Correct == true) {
                              sub.Correct.push(['✅']);
                              this.number_correct += 1;
                            }
                            else {
                              sub.Correct.push(this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                            }
                            // sub.Rationale.push([key.Key.Rationale]);
                          }
                        }
                      }
                      else if (['LP'].includes(part.Type)) {
                        if (sub.Attempts[Object.keys(prob.Parts).indexOf(name)] > 0) {
                          if (sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][0] == ch[0]) {
                            if (key.Key.Correct == true) {
                              sub.Correct = [['✅']];
                              this.number_correct += 1;
                            }
                            else {
                              sub.Correct = [this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]];
                            }
                            // sub.Rationale = [[key.Key.Rationale]];
                          }
                        }
                      }
                      if (['MS', 'IMS'].includes(part.Type)) {
                        if (key.Key.Correct && !sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1].includes(ch)) {
                          ms_correct = false;
                        }
                        else if (!key.Key.Correct && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1].includes(ch)) {
                          ms_correct = false;
                        }
                      }
                      else if (['MFR', 'IDD', 'T'].includes(part.Type)) {
                        if (part.Type == 'T') {
                          if (key.Key.Correct && ch.includes('KEY') && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][+ch[0] - 1] != key.Choice) {
                            mp_correct = false;
                          }
                        }
                        if (part.Type == 'MFR') {
                          if (key.Key.Correct && ch.includes('KEY') && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][+ch[0] - 1] != key.Choice) {
                            mp_correct = false;
                          }
                        }
                        if (part.Type == 'IDD') {
                          if (key.Key.Correct && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][+ch[0] - 1] != ch[2]) {
                            mp_correct = false;
                          }
                          else if (!key.Key.Correct && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][+ch[0] - 1] == ch[2]) {
                            mp_correct = false;
                          }
                        }
                      }
                      else if (part.Type == 'FR') {
                        if (sub.Attempts[Object.keys(prob.Parts).indexOf(name)] > 0) {
                          if (sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][0] == key.Choice) {
                            sub.Correct.push(['✅']);
                            this.number_correct += 1;
                            // sub.Rationale.push([key.Key.Rationale]);
                          }
                          else {
                            sub.Correct.push(this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                            // sub.Rationale.push(['No rationale provided. The number submitted was not right']);
                          }
                        }
                      }
                    }
                  }
                  if (['MS', 'IMS'].includes(part.Type) && ms_correct) {
                    sub.Correct.push(['✅']);
                    this.number_correct += 1;
                  }
                  else if (['MS', 'IMS'].includes(part.Type)) {
                    sub.Correct.push(this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                  }
                  else if (['MFR', 'IDD', 'T'].includes(part.Type) && (mp_correct || this.is_idd_correct(name))) {
                    sub.Correct.push(['✅']);
                    this.number_correct += 1;
                  }
                  else if (['MFR', 'IDD', 'T'].includes(part.Type)) {
                    sub.Correct.push(this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                  }
                }
              }
              console.log(sub.Choice);
            }
          }
        }
      }
      console.log(this.exam_submission);
    }
    this.problem_number += 1;
    if (this.problem_number > this.max_problem_number) {
      this.max_problem_number = this.problem_number;
    }
    if (this.problem_number > this.quiz_length && this.length_mode == 'number') {
      this.completeExam();
    }
    else if (this.max_problem_number == this.problem_number) {
      this.attempt_path = [];
      this.attempt_response = [];
      this.attempt_explanation = [];
      this.problem_selection = [];
      this.m_shuffled = false;
      this.m_selection = [];
      this.m_submission = [];
      this.c_submission = [];
      this.shuffle_choices = {};
      this.unique_choices = [];
      if (Object.keys(this.exam_dump[this.problem_number].Parts).length == 0) {
        this.problem_attempts = [0];
        this.attempt_path = [[]];
        this.attempt_response = [''];
        this.attempt_explanation = [[]];
        this.m_selection = [["", ""]];
        this.m_submission = [{}];
        this.c_submission = [{}];
        if (['MC', 'FR', 'SR', 'MR', 'LR', 'IMC', 'LP', 'GP'].includes(this.exam_dump[this.problem_number].Type)) {
          this.problem_selection = [['']];
          if (['GP'].includes(this.exam_dump[this.problem_number].Type)) {
            setTimeout(() => {
              this.plot_graph_gp('', false);
            }, 500);
          }
        }
        else if (['MS', 'O', 'C', 'G', 'IM', 'IMS', 'MGP'].includes(this.exam_dump[this.problem_number].Type)) {
          this.problem_selection = [[]];
          if (['O', 'C', 'G'].includes(this.exam_dump[this.problem_number].Type)) {
            this.unique_m(this.exam_dump[this.problem_number].AnswerChoices, '');
          }
          if (['MGP'].includes(this.exam_dump[this.problem_number].Type)) {
            setTimeout(() => {
              this.plot_graph_mgp('', false);
            }, 500);
          }
        }
        else if (['MFR', 'IDD', 'T'].includes(this.exam_dump[this.problem_number].Type)) {
          var msp_nums: string[] = [];
          this.problem_selection.push([]);
          for (let choice of Object.keys(this.exam_dump[this.problem_number].AnswerChoices)) {
            if (choice.length > 1 && choice[1] == ':' && !msp_nums.includes(choice[0])) {
              this.problem_selection[0].push('');
              msp_nums.push(choice[0]);
            }
          }
        }
      }
      else {
        this.problem_attempts = [];
        for (let part of Object.keys(this.exam_dump[this.problem_number].Parts)) {
          this.problem_attempts.push(0);
          this.attempt_path.push([]);
          this.attempt_response.push('');
          this.attempt_explanation.push([]);
          this.m_selection.push(["", ""]);
          this.m_submission.push({});
          this.c_submission.push({});
          if (['MC', 'FR', 'SR', 'MR', 'LR', 'IMC', 'LP', 'GP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
            this.problem_selection.push(['']);
            if (['GP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
              setTimeout(() => {
                this.plot_graph_gp(part, false);
              }, 500);
            }
          }
          else if (['MS', 'O', 'C', 'G', 'IM', 'IMS', 'MGP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
            this.problem_selection.push([]);
            if (['O', 'C', 'G'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
              this.unique_m(this.exam_dump[this.problem_number].Parts[part].AnswerChoices, part);
            }
            if (['MGP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
              setTimeout(() => {
                this.plot_graph_mgp(part, false);
              }, 500);
            }
          }
          else if (['MFR', 'IDD', 'T'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
            var msp_nums: string[] = [];
            this.problem_selection.push([]);
            for (let choice of Object.keys(this.exam_dump[this.problem_number].Parts[part].AnswerChoices)) {
              if (choice.length > 1 && choice[1] == ':' && !msp_nums.includes(choice[0])) {
                this.problem_selection[Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part)].push('');
                msp_nums.push(choice[0]);
              }
            }
          }
        }
      }
      this.refsheet_source = '../../' + this.dumpService.exam_attribute_dump[(this.exam_dump[this.problem_number].Number).substring(0, (this.exam_dump[this.problem_number].Number).indexOf('-'))].RefSheet;
      for (let supp of this.exam_dump[this.problem_number].SuppContent) {
        setTimeout(() => {
          this.read_supp_json(supp);
        }, 100 * (1 + this.exam_dump[this.problem_number].SuppContent.indexOf(supp)));
      }
      if (this.exam_dump[this.problem_number].Type == 'MP') {
        for (let part of Object.keys(this.exam_dump[this.problem_number].Parts)) {
          for (let block of this.exam_dump[this.problem_number].Parts[part].Content) {
            if (block.startsWith(':table:')) {
              setTimeout(() => {
                this.read_table(block.slice(7));
              }, 100);
            }
          }
        }
      }
      if (this.exam_dump[this.problem_number].Type != 'MP') {
        for (let block of this.exam_dump[this.problem_number].Content) {
          if (block.startsWith(':table:')) {
            setTimeout(() => {
              this.read_table(block.slice(7));
            }, 100);
          }
        }
      }
    }
    else {
      this.attempt_path = [this.exam_submission[this.problem_number].Path];
      this.attempt_response = [''];
      this.attempt_explanation = this.exam_submission[this.problem_number].Rationale;
      this.problem_selection = this.exam_submission[this.problem_number].Choice;
      this.problem_attempts = this.exam_submission[this.problem_number].Attempts;
      this.refsheet_source = '../../' + this.dumpService.exam_attribute_dump[(this.exam_dump[this.problem_number].Number).substring(0, (this.exam_dump[this.problem_number].Number).indexOf('-'))].RefSheet;
      for (let supp of this.exam_dump[this.problem_number].SuppContent) {
        setTimeout(() => {
          this.read_supp_json(supp);
        }, 100 * (1 + this.exam_dump[this.problem_number].SuppContent.indexOf(supp)));
      }
      if (this.exam_dump[this.problem_number].Type == 'MP') {
        for (let part of Object.keys(this.exam_dump[this.problem_number].Parts)) {
          for (let block of this.exam_dump[this.problem_number].Parts[part].Content) {
            if (block.startsWith(':table:')) {
              setTimeout(() => {
                this.read_table(block.slice(7));
              }, 100);
            }
          }
        }
      }
      if (this.exam_dump[this.problem_number].Type != 'MP') {
        for (let block of this.exam_dump[this.problem_number].Content) {
          if (block.startsWith(':table:')) {
            setTimeout(() => {
              this.read_table(block.slice(7));
            }, 100);
          }
        }
      }
    }
    this.clearProblemTimer();
    this.toggleProblemTimer();
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

  go_to_prob(num: number) {
    if (num <= this.max_problem_number) {
      this.exam_submission[this.problem_number].Time = (this.pt_minutes).toString() + 'm ' + (this.pt_counter % 60).toString() + 's';
      this.exam_submission[this.problem_number].Seconds = this.pt_counter;
      this.exam_submission[this.problem_number].Number = this.problem_number;
      this.exam_submission[this.problem_number].Topics = this.exam_dump[this.problem_number].Topics;
      this.exam_submission[this.problem_number].SubTopics = this.exam_dump[this.problem_number].SubTopics;
      this.exam_submission[this.problem_number].Choice = this.problem_selection;
      this.exam_submission[this.problem_number].Attempts = this.problem_attempts;
      this.exam_submission[this.problem_number].Path = this.attempt_path;
      // this.exam_submission[this.problem_number].Correct = this.exam_key[this.problem_number - 1];
      this.exam_submission[this.problem_number].Rationale = this.attempt_explanation;
      // if (this.exam_submission[this.problem_number].Attempts.reduce((accumulator, currentValue) => accumulator + currentValue, 0) > 0) {
      if (this.total_attempts(this.exam_submission[this.problem_number].Attempts) > 0) {
        for (const [num, prob] of Object.entries(this.exam_dump)) {
          if (this.problem_number == +num) {
            for (const [num2, sub] of Object.entries(this.exam_submission)) {
              if (this.problem_number == +num2) {
                console.log(sub.Choice);
                // sub.Time = this.pt_minutes.toString() + 'm ' + (this.pt_counter % 60).toString() + 's';
                // sub.Seconds = this.pt_counter;
                // sub.Number = this.problem_number;
                // sub.Topics = prob.Topics;
                // sub.SubTopics = prob.SubTopics;
                // sub.Attempts = this.problem_attempts;
                // sub.Path = this.attempt_path;
                if (Object.keys(prob.Parts).length == 0) {
                  // sub.Choice.push(sub.Path[0][sub.Path[0].length - 1]);
                  var ms_correct = true;
                  var mp_correct = true;
                  if (['O', 'C', 'G'].includes(prob.Type)) {
                    if ((prob.Type == 'O' && this.is_m_correct('', false)) || (prob.Type == 'C' && this.is_c_correct('', false)) || (prob.Type == 'G' && this.is_g_correct('', false))) {
                      sub.Correct = [['✅']];
                      this.number_correct += 1;
                    }
                    else {
                      sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                    }
                    // sub.Rationale = this.attempt_explanation;
                  }
                  else if (['MR', 'LR'].includes(prob.Type)) {
                    sub.Correct = [['👀']];
                    if (this.problem_selection[0] == '') {
                      sub.Choice = [['No Student Response Given']];
                    }
                    else {
                      this.number_correct += 1;
                    }
                  }
                  else {
                    for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                      if (['MC', 'IMC'].includes(prob.Type)) {
                        if (sub.Attempts[0] > 0) {
                          if (sub.Path[0][sub.Path[0].length - 1][0] == ch) {
                            if (key.Key.Correct == true) {
                              sub.Correct = [['✅']];
                              this.number_correct += 1;
                            }
                            else {
                              sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                            }
                            // sub.Rationale = [[key.Key.Rationale]];
                          }
                        }
                      }
                      else if (['LP'].includes(prob.Type)) {
                        if (sub.Attempts[0] > 0) {
                          if (sub.Path[0][sub.Path[0].length - 1][0] == ch[0]) {
                            if (key.Key.Correct == true) {
                              sub.Correct = [['✅']];
                              this.number_correct += 1;
                            }
                            else {
                              sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                            }
                            // sub.Rationale = [[key.Key.Rationale]];
                          }
                        }
                      }
                      else if (['MS', 'IMS'].includes(prob.Type)) {
                        if (key.Key.Correct && !sub.Path[0][sub.Path[0].length - 1].includes(ch)) {
                          ms_correct = false;
                        }
                        else if (!key.Key.Correct && sub.Path[0][sub.Path[0].length - 1].includes(ch)) {
                          ms_correct = false;
                        }
                      }
                      else if (['MFR', 'IDD', 'T'].includes(prob.Type)) {
                        if (prob.Type == 'T') {
                          if (key.Key.Correct && ch.includes('KEY') && sub.Path[0][sub.Path[0].length - 1][+ch[0] - 1] != key.Choice) {
                            mp_correct = false;
                          }
                        }
                        if (prob.Type == 'MFR') {
                          if (key.Key.Correct && ch.includes('KEY') && sub.Path[0][sub.Path[0].length - 1][+ch[0] - 1] != key.Choice) {
                            mp_correct = false;
                          }
                        }
                        if (prob.Type == 'IDD') {
                          if (key.Key.Correct && sub.Path[0][sub.Path[0].length - 1][+ch[0] - 1] != ch[2]) {
                            mp_correct = false;
                          }
                          else if (!key.Key.Correct && sub.Path[0][sub.Path[0].length - 1][+ch[0] - 1] == ch[2]) {
                            mp_correct = false;
                          }
                        }
                      }
                      else if (prob.Type == 'FR') {
                        if (sub.Attempts[0] > 0) {
                          if (sub.Path[0][sub.Path[0].length - 1][0] == key.Choice) {
                            sub.Correct = [['✅']];
                            this.number_correct += 1;
                            // sub.Rationale = [[key.Key.Rationale]];
                          }
                          else {
                            sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                            // sub.Rationale = [['No rationale provided. The number submitted was not right']];
                          }
                        }
                      }
                    }
                  }
                  if (['MS', 'IMS'].includes(prob.Type) && ms_correct) {
                    sub.Correct = [['✅']];
                    this.number_correct += 1;
                  }
                  else if (['MS', 'IMS'].includes(prob.Type)) {
                    sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                  }
                  else if (['MFR', 'IDD', 'T'].includes(prob.Type) && (mp_correct || this.is_idd_correct(''))) {
                    sub.Correct = [['✅']];
                    this.number_correct += 1;
                  }
                  else if (['MFR', 'IDD', 'T'].includes(prob.Type)) {
                    sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                  }
                }
                else {
                  sub.Correct = [];
                  // sub.Rationale = [];
                  // sub.Rationale = this.attempt_explanation;
                  for (const [name, part] of Object.entries(prob.Parts)) {
                    if (this.problem_attempts[Object.keys(prob.Parts).indexOf(name)] > 0) {
                      // sub.Choice.push(sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1]);
                      var ms_correct = true;
                      var mp_correct = true;
                      if (['O', 'C', 'G'].includes(part.Type)) {
                        if ((part.Type == 'O' && this.is_m_correct(name, false)) || (part.Type == 'C' && this.is_c_correct(name, false)) || (part.Type == 'G' && this.is_g_correct(name, false))) {
                          sub.Correct.push(['✅']);
                          this.number_correct += 1;
                        }
                        else {
                          sub.Correct.push(this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                        }
                        // sub.Rationale.push(this.attempt_explanation);
                      }
                      else if (['LR'].includes(part.Type)) {
                        sub.Correct.push(['👀']);
                        if (this.problem_selection[Object.keys(prob.Parts).indexOf(name)] == '') {
                          sub.Choice[Object.keys(prob.Parts).indexOf(name)] = ['No Student Response Given'];
                        }
                        else {
                          this.number_correct += 1;
                        }
                      }
                      else {
                        for (const [ch, key] of Object.entries(part.AnswerChoices)) {
                          if (['MC', 'IMC'].includes(part.Type)) {
                            if (sub.Attempts[Object.keys(prob.Parts).indexOf(name)] > 0) {
                              if (sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][0] == ch) {
                                if (key.Key.Correct == true) {
                                  sub.Correct.push(['✅']);
                                  this.number_correct += 1;
                                }
                                else {
                                  sub.Correct.push(this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                                }
                                // sub.Rationale.push([key.Key.Rationale]);
                              }
                            }
                          }
                          else if (['LP'].includes(part.Type)) {
                            if (sub.Attempts[Object.keys(prob.Parts).indexOf(name)] > 0) {
                              if (sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][0] == ch[0]) {
                                if (key.Key.Correct == true) {
                                  sub.Correct = [['✅']];
                                  this.number_correct += 1;
                                }
                                else {
                                  sub.Correct = [this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]];
                                }
                                // sub.Rationale = [[key.Key.Rationale]];
                              }
                            }
                          }
                          if (['MS', 'IMS'].includes(part.Type)) {
                            if (key.Key.Correct && !sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1].includes(ch)) {
                              ms_correct = false;
                            }
                            else if (!key.Key.Correct && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1].includes(ch)) {
                              ms_correct = false;
                            }
                          }
                          else if (['MFR', 'IDD', 'T'].includes(part.Type)) {
                            if (part.Type == 'T') {
                              if (key.Key.Correct && ch.includes('KEY') && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][+ch[0] - 1] != key.Choice) {
                                mp_correct = false;
                              }
                            }
                            if (part.Type == 'MFR') {
                              if (key.Key.Correct && ch.includes('KEY') && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][+ch[0] - 1] != key.Choice) {
                                mp_correct = false;
                              }
                            }
                            if (part.Type == 'IDD') {
                              if (key.Key.Correct && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][+ch[0] - 1] != ch[2]) {
                                mp_correct = false;
                              }
                              else if (!key.Key.Correct && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][+ch[0] - 1] == ch[2]) {
                                mp_correct = false;
                              }
                            }
                          }
                          else if (part.Type == 'FR') {
                            if (sub.Attempts[Object.keys(prob.Parts).indexOf(name)] > 0) {
                              if (sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][0] == key.Choice) {
                                sub.Correct.push(['✅']);
                                this.number_correct += 1;
                                // sub.Rationale.push([key.Key.Rationale]);
                              }
                              else {
                                sub.Correct.push(this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                                // sub.Rationale.push(['No rationale provided. The number submitted was not right']);
                              }
                            }
                          }
                        }
                      }
                      if (['MS', 'IMS'].includes(part.Type) && ms_correct) {
                        sub.Correct.push(['✅']);
                        this.number_correct += 1;
                      }
                      else if (['MS', 'IMS'].includes(part.Type)) {
                        sub.Correct.push(this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                      }
                      else if (['MFR', 'IDD', 'T'].includes(part.Type) && (mp_correct || this.is_idd_correct(name))) {
                        sub.Correct.push(['✅']);
                        this.number_correct += 1;
                      }
                      else if (['MFR', 'IDD', 'T'].includes(part.Type)) {
                        sub.Correct.push(this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                      }
                    }
                  }
                }
                console.log(sub.Choice);
              }
            }
          }
        }
      }
      this.problem_number = num;
      this.attempt_path = this.exam_submission[num].Path;
      this.attempt_explanation = this.exam_submission[num].Rationale;
      this.problem_selection = this.exam_submission[num].Choice;
      this.problem_attempts = this.exam_submission[num].Attempts;
      this.attempt_response = [];
      this.m_shuffled = false;
      this.m_selection = [];
      this.m_submission = [];
      this.c_submission = [];
      this.shuffle_choices = {};
      this.unique_choices = [];
      if (Object.keys(this.exam_dump[this.problem_number].Parts).length == 0) {
        this.attempt_response = [''];
        this.m_selection = [["", ""]];
        this.m_submission = [{}];
        this.c_submission = [{}];
        // set m/c_sub based on problem selection
        if (['O', 'C', 'G'].includes(this.exam_dump[this.problem_number].Type)) {
          this.unique_m(this.exam_dump[this.problem_number].AnswerChoices, '');
        }
      }
      else {
        for (let part of Object.keys(this.exam_dump[this.problem_number].Parts)) {
          this.attempt_response.push('');
          this.m_selection.push(["", ""]);
          this.m_submission.push({});
          this.c_submission.push({});
          // set m/c_sub based on problem selection
          if (['O', 'C', 'G'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
            this.unique_m(this.exam_dump[this.problem_number].Parts[part].AnswerChoices, part);
          }
        }
      }
      console.log(this.problem_selection);
      this.refsheet_source = '../../' + this.dumpService.exam_attribute_dump[(this.exam_dump[this.problem_number].Number).substring(0, (this.exam_dump[this.problem_number].Number).indexOf('-'))].RefSheet;
      for (let supp of this.exam_dump[this.problem_number].SuppContent) {
        setTimeout(() => {
          this.read_supp_json(supp);
        }, 100 * (1 + this.exam_dump[this.problem_number].SuppContent.indexOf(supp)));
      }
      if (this.exam_dump[this.problem_number].Type == 'MP') {
        for (let part of Object.keys(this.exam_dump[this.problem_number].Parts)) {
          for (let block of this.exam_dump[this.problem_number].Parts[part].Content) {
            if (block.startsWith(':table:')) {
              setTimeout(() => {
                this.read_table(block.slice(7));
              }, 100);
            }
          }
        }
      }
      if (this.exam_dump[this.problem_number].Type != 'MP') {
        for (let block of this.exam_dump[this.problem_number].Content) {
          if (block.startsWith(':table:')) {
            setTimeout(() => {
              this.read_table(block.slice(7));
            }, 100);
          }
        }
      }
      this.clearProblemTimer();
      this.toggleProblemTimer();
    }
  }

  completeExam() {
    console.log(this.exam_submission);
    this.toggleExamTimer();
    this.toggleProblemTimer();
    this.confetti_fireworks();
    if (this.mode == 'explain') {
      this.resetExam();
    }
    else if (this.mode == 'assess') {
      var length_num = 0;
      if (this.length_mode == 'number') {
        length_num = this.quiz_length;
      }
      else {
        length_num = this.max_problem_number - 1;
      }
      this.number_correct = 0;
      for (let i: number = 1; i <= length_num; i++) {
        console.log('' + i);
        this.exam_submission_list.push(this.exam_submission[i]);
        if (Object.keys(this.exam_dump[i].Parts).length == 0) {
          if (this.exam_submission[i].Correct[0][0] != '✅') {
            this.wrong_submission_list.push(this.exam_submission[i]);
          }
          else {
            this.number_correct += 1;
          }
        }
        else {
          var pushed_wrong = false;
          for (let part of Object.keys(this.exam_dump[i].Parts)) {
            if (!pushed_wrong && this.exam_submission[i].Correct[(Object.keys(this.exam_dump[i].Parts)).indexOf(part)][0] != '✅') {
              this.wrong_submission_list.push(this.exam_submission[i]);
              pushed_wrong = true;
            }
          }
          if (!pushed_wrong) {
            this.number_correct += 1;
          }
        }
      }
      this.correct_percent = Math.round(this.number_correct / length_num * 100);
      for (let i: number = 0; i < length_num; i++) {
        for (let num: number = 0; num < this.exam_submission_list[i].Topics.length; num++) {
          if (Object.keys(this.topic_breakdown).includes(this.exam_submission_list[i].Topics[num])) {
            this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Total += 1;
            this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Seconds += this.exam_submission_list[i].Seconds;
            if (this.exam_submission_list[i].Correct[0] == '✅') {
              this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Correct += 1;
              if (Object.keys(this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs).includes(this.exam_submission_list[i].SubTopics[num])) {
                this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]].Total += 1;
                this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]].Correct += 1;
                this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]].Seconds += this.exam_submission_list[i].Seconds;
              }
              else {
                this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s' };
              }
            }
            else {
              this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Incorrect += 1;
              if (Object.keys(this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs).includes(this.exam_submission_list[i].SubTopics[num])) {
                this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]].Total += 1;
                this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]].Incorrect += 1;
                this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]].Seconds += this.exam_submission_list[i].Seconds;
              }
              else {
                this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s' };
              }
            }
          }
          else {
            if (this.exam_submission_list[i].Correct[0] == '✅') {
              this.topic_breakdown[this.exam_submission_list[i].Topics[num]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s', 'Subs': { [this.exam_submission_list[i].SubTopics[num]]: { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s' } } };
            }
            else {
              this.topic_breakdown[this.exam_submission_list[i].Topics[num]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s', 'Subs': { [this.exam_submission_list[i].SubTopics[num]]: { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s' } } };
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
      // this.authService.UpdateUserData({ 'problems': this.exam_submission });
    }
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

  confetti_pop() {
    confettiHandler({
      particleCount: 1000,
      startVelocity: 100,
      scalar: 1.15,
      ticks: 300,
      decay: 0.9,
      angle: 90,
      spread: 360,
      origin: { x: 0.25, y: 0.25 }
    });
    confettiHandler({
      particleCount: 1000,
      startVelocity: 100,
      scalar: 1.15,
      ticks: 300,
      decay: 0.9,
      angle: 90,
      spread: 360,
      origin: { x: 0.25, y: 0.75 }
    });
    confettiHandler({
      particleCount: 1000,
      startVelocity: 100,
      scalar: 1.15,
      ticks: 300,
      decay: 0.9,
      angle: 90,
      spread: 360,
      origin: { x: 0.75, y: 0.25 }
    });
    confettiHandler({
      particleCount: 1000,
      startVelocity: 100,
      scalar: 1.15,
      ticks: 300,
      decay: 0.9,
      angle: 90,
      spread: 360,
      origin: { x: 0.75, y: 0.75 }
    });
    if (this.screenWidth > this.mobileWidth) {
      confettiHandler({
        shapes: ['star'],
        colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
        particleCount: 100,
        startVelocity: 250,
        ticks: 200,
        decay: 0.45,
        scalar: 1.5,
        angle: 270,
        spread: 180,
        origin: { x: 0.5, y: 0 }
      });
    }
  }

  confetti_fireworks() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, scalar: 1.15 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 100 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
      // if (this.screenWidth > this.mobileWidth) {
      confetti({
        ...defaults,
        particleCount: particleCount / 5,
        scalar: 1.5,
        shapes: ['star'],
        colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount: particleCount / 5,
        scalar: 1.5,
        shapes: ['star'],
        colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
      // }
    }, 250);
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

  resetExam() {
    // Object.keys(this.ordered_dump).forEach(key => delete this.ordered_dump[+key]);
    // Object.keys(this.exam_dump).forEach(key => delete this.exam_dump[+key]);
    this.exam_dump = {};
    this.ordered_dump = {};
    this.exam_key = [];
    this.attempt_path = [];
    this.exam_submission = {};
    this.exam_submission_list = [];
    this.wrong_submission_list = [];
    this.topic_breakdown = {};
    this.problem_number = 0;
    this.max_problem_number = 0;
    this.number_correct = 0;
    this.expand_filters = true;
    // this.filter_exams();
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

  expandTopics() {
    this.expand_topics = !this.expand_topics;
  }

  showCorrect() {
    this.show_correct = !this.show_correct;
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
    setTimeout(() => {
      // this.favorite_std_set = [];
      this.public_quiz_results = this.authService.getPublicQuizzes();
      for (const [id, dump] of Object.entries(this.public_quiz_results)) {
        this.public_quiz_results[id].id = id;
      }
      this.filter_exams();
      if (this.authService.userData) {
        this.authService.getProfilePic(this.authService.userData);
        this.user_data = this.authService.userData;
        setTimeout(() => {
          console.log(this.authService.pp_url);
          // this.profileUploadURL = this.authService.pp_url;
          if (this.authService.userData.state != undefined && this.authService.userData.state != '' && Object.values(this.dumpService.state_labels).includes(this.authService.userData.state)) {
            for (let state of Object.keys(this.dumpService.state_labels)) {
              if (this.dumpService.state_labels[state] == this.authService.userData.state) {
                this.toggle_button(this.dumpService.state_labels[state]);
              }
            }
            if (this.authService.userData.grade != undefined && this.authService.userData.grade != '' && Object.values(this.dumpService.grade_labels).includes(this.authService.userData.grade)) {
              for (let grade of Object.keys(this.dumpService.grade_labels)) {
                if (this.dumpService.grade_labels[grade] == this.authService.userData.grade) {
                  if (['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].includes(this.dumpService.grade_labels[grade])) {
                    this.toggle_button('High School');
                  }
                  else {
                    this.toggle_button(this.dumpService.grade_labels[grade]);
                  }
                }
              }
            }
          }
        }, 150);
        if (this.authService.userData.role != '') {
          for (let std of this.authService.userData.standards.favorites.slice(1)) {
            this.favorite_std_set.push(std as string[]);
          }
        }
        if (!['', 'Student'].includes(this.authService.userData.role)) {
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
          if (!['', 'Student'].includes(this.authService.userData.role)) {
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
          }
          if (!['', 'Parent'].includes(this.authService.userData.role)) {
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
        }
      }
      if (this.authService.userData) {
        this.authService.getProfilePic(this.authService.userData);
        this.user_data = this.authService.userData;
        if (!['', 'Student'].includes(this.authService.userData.role)) {
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
        }, 250);
      }
      else {
        this.width_change2();
        this.data_loaded = true;
      }
    }, 500);
    // // Just to de-dupe all the subtopic labels
    // for (let exam of this.dumpService.exam_set) {
    //   if (!this.dumpService.exam_attribute_dump[exam].HideTopics) {
    //     for (const [key, val] of Object.entries(this.dumpService.e_dump_dict[exam])) {
    //       if (typeof val.SubTopics != 'undefined') {
    //         for (let subtop of val.SubTopics) {
    //           if (!this.subtopics.includes(subtop)) {
    //             this.subtopics.push(subtop);
    //           }
    //           if (!Object.keys(this.subtopics_count).includes(subtop)) {
    //             this.subtopics_count[subtop] = 1;
    //           }
    //           else {
    //             this.subtopics_count[subtop] += 1;
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    // const subtopics_array = Object.keys(this.subtopics_count).map(sub => [sub, this.subtopics_count[sub]] as [string, number]);
    // subtopics_array.sort((a, b) => b[1] - a[1])
    // const sorted_subtopics_count: { [key: string]: number } = {};
    // subtopics_array.forEach(([sub, count]) => {
    //   sorted_subtopics_count[sub] = count;
    // });
    // console.log(sorted_subtopics_count);
    // console.log(this.subtopics.sort());
  }
}
