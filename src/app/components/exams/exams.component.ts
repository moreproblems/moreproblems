import { Component, OnInit, AfterViewInit, Injectable, ElementRef, ViewChild, Input, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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

(<any>pdfMake).addVirtualFileSystem(pdfFonts);

const confetti = require('canvas-confetti').default;
const Desmos = require('desmos');

const confettiCanvas = document.getElementById('confettiCanvas');
const confettiHandler = confetti.create(confettiCanvas, {
  resize: true,
  useWorker: true,
});

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})

@Injectable()
export class ExamsComponent implements OnInit {
  // title = 'More Problems';

  user_data: any = {};
  my_students: string[] = [];
  my_students_data: any = {};
  selected_student: string = "";
  selected_student_st: string = "";
  selected_student_data: any = {};

  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  mobileWidth = 1000;
  blank = " ";
  menuOpen = false;
  stateSet = false;

  show_refsheet = false;
  show_calculator = false;
  show_protractor = false;
  show_ruler = false;
  show_supplements = true;
  data_loaded = false;
  has_classes = false;
  reviewed_st = false;
  count = 0;

  edit_e_list: any = {};

  favorite_exm_set: string[] = [];
  favorite_std_set: string[][] = [];
  filtered_set: string[] = [];
  filtered_exam_num = 0;
  filtered_prob_num = 0;
  generate_message = "";
  inprogress_set: string[] = [];
  inprogress_exams: { [key: string]: any } = {};
  inprogress_quizzes: { [key: string]: any } = {};
  my_stud_inprogress_set: string[][] = [];
  my_stud_inprogress_exams: { [key: string]: { [key: string]: any } } = {};
  my_stud_inprogress_quizzes: { [key: string]: { [key: string]: any } } = {};
  selected_stud: string = '';

  selected_state: string = '';
  selected_grade: string = '';
  selected_subject: string = '';
  state_grades: string[] = [];
  state_subjects: string[] = [];
  subject_exams: string[] = [];

  assign_e = false;
  all_students: string[] = [];
  all_students_data: any = {};
  new_assignments: string[] = [];
  my_class_metadata: any[] = [];
  class_data: any = {};
  student_list: string[] = [];
  student_metadata: any[] = [];
  my_student_metadata: any[] = [];
  student_data: any = {};
  class_list: string[] = [];
  complete_exam_count = 0;
  inprog_exam_count = 0;

  et_counter: number = 0;
  et_minutes: number = 0;
  et_timer: any;
  et_running: boolean = false;
  pt_counter: number = 0;
  pt_minutes: number = 0;
  pt_timer: any;
  pt_running: boolean = false;

  et_counter_st: number = 0;
  et_minutes_st: number = 0;
  et_timer_st: any;
  et_running_st: boolean = false;
  pt_counter_st: number = 0;
  pt_minutes_st: number = 0;
  pt_timer_st: any;
  pt_running_st: boolean = false;

  number_correct = 0;
  correct_percent = 0;

  avatars = ['bear', 'boar', 'cat', 'chicken', 'deer', 'dog', 'fox', 'giraffe', 'gorilla', 'horse', 'koala', 'lemur', 'lion', 'llama', 'owl', 'panda', 'rabbit', 'rhino', 'seal', 'shark', 'snake', 'tiger', 'walrus', 'wolf'];

  standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = { 'Title': '', 'Overview': '', 'Goals': [], 'Standards': [], 'References': [] };
  examples_dump: { [key: string]: string[] } = {};

  photoURL = "";
  create_s: boolean = false;
  edit_s_list: { [index: string]: any } = {};
  student_uid: string = "";
  create_c: boolean = false;
  edit_c_list: { [index: string]: any } = {};
  class_uid: string = "";

  exam_name = '';
  exam_url = '';
  exam_id = '';
  quiz_id = '';
  exam_dl = 0;
  exam_fav = false;
  file_source = '';
  file_page = 1;
  file_zoom = 85;
  ref_zoom = 100;

  toggle_goals: boolean = false;
  goal_state: { [key: string]: boolean } = {};
  domain_state: { [key: string]: boolean } = {};

  supp_dump: any = {};
  supp_st_dump: any = {};
  st_refsheet_source: string = '';

  subtopic_search_dump: { [key: number]: { 'Number': any, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'SuppTools': string[], 'Points': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = {};
  pdf_dump: any = { content: [], styles: { tableExample: { margin: [0, 5, 0, 15] } }, defaultStyle: { columnGap: 20, fontSize: 15 }, images: {} };

  signup: boolean = false;
  login: boolean = false;
  selected_topic = "";
  selected_subtopic = "";
  standards_id = '';
  standard_id = '';
  standard_fav = false;
  includes_standard = false;
  streak_count = 0;
  subtopic_streak_count = 0;
  subtopic_max_streak_count = 0;
  subtopic_problem_count = 0;
  subtopic_new_problem_count = 0;
  subtopic_correct_problem_count = 0;
  subtopic_problem_number = 0;
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
  random_index = 0
  random_list: string[] = [];

  viewerWidth = Math.round(window.innerWidth * .99).toString() + "px";
  viewerHeight = Math.round(window.innerHeight * .95).toString() + "px";

  default_problem_pdf: any = {
    columns: []
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

  constructor(public router: Router, private aRoute: ActivatedRoute, private titleService: Title, private meta: Meta, public authService: AuthService, public dumpService: DumpService, private afAuth: AngularFireAuth, private http: HttpClient) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  sub: any;

  max(num1: number, num2: number) {
    return (Math.max(num1, num2));
  }

  round(num: number) {
    return (Math.round(num));
  }

  width_change2() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    if (this.screenWidth <= this.mobileWidth) {
      this.file_zoom = 95;
    }
    else {
      this.file_zoom = 75;
    }
    if (!this.stateSet) {
      for (let domain of this.standards_dump.Standards) {
        if (this.screenWidth <= this.mobileWidth) {
          this.domain_state[domain.Label] = false;
        }
        else {
          this.domain_state[domain.Label] = true;
        }
      }
      for (let goal of this.standards_dump.Goals) {
        if (this.screenWidth <= this.mobileWidth) {
          this.goal_state[goal[0]] = false;
        }
        else {
          this.goal_state[goal[0]] = true;
        }
      }
    }
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
          for (let targ of e.targetTouches) {
              // calculate the new cursor position:
              pos1 = pos3 - targ.clientX;
              pos2 = pos4 - targ.clientY;
              pos3 = targ.clientX;
              pos4 = targ.clientY;
              // set the element's new position:
              (target as HTMLElement).style.top = ((target as HTMLElement).offsetTop - pos2) + "px";
              (target as HTMLElement).style.left = ((target as HTMLElement).offsetLeft - pos1) + "px";
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
          for (let targ of e.targetTouches) {
              // calculate the new cursor position:
              const angle = getDraggableAngle(targ);
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

  get_percent_correct(stud: any) {
    return Math.round(10000 * stud.problems.correct / stud.problems.total) / 100;
  }

  get_exam_count(stud: any) {
    this.complete_exam_count = 0;
    this.inprog_exam_count = 0;
    const exam_history = stud.exams.history;
    for (const [key, det] of Object.entries(exam_history)) {
      if ((det as any).status == "Completed") {
        this.complete_exam_count += 1;
      }
      else if (["Started", "Assigned"].includes((det as any).status)) {
        this.inprog_exam_count += 1;
      }
    }
    return [this.complete_exam_count, this.inprog_exam_count];
  }

  get_skip_count_st() {
    var count = 0;
    for (let sub of this.order_numbers_st()) {
      if (this.subtopic_submission[sub].Correct[0][0] != '✅') {
        count += 1;
      }
    }
    return (count)
  }

  get_first_try_count_st() {
    var count = 0;
    for (let sub of this.order_numbers_st()) {
      if (this.subtopic_submission[sub].Attempts[0] == 1 && this.subtopic_submission[sub].Correct[0][0] == '✅') {
        count += 1;
      }
    }
    return (count)
  }

  order_numbers_st() {
    return (Array.from({ length: Object.keys(this.subtopic_search_dump).length }, (_, i) => i + 1));
  }

  select_state(st: string) {
    this.favorite_exm_set = [];
    if (this.authService.userData) {
      for (let exm of this.authService.userData.exams.favorites.slice(1)) {
        this.favorite_exm_set.push(exm as string);
      }
    }
    this.state_grades = [];
    this.state_subjects = [];
    this.filtered_set = [];
    this.filtered_prob_num = 0;
    if (this.selected_state == st) {
      this.selected_state = '';
      this.selected_grade = '';
      this.selected_subject = '';
    }
    else {
      this.selected_state = st;
      var grades_list: string[] = [];
      if (st == 'US') {
        for (const [id, dump] of Object.entries(this.dumpService.exam_attribute_dump)) {
          if (id != 'default' && Object.keys(this.dumpService.exam_names).includes(id)) {
            if (!grades_list.includes(this.dumpService.exam_attribute_dump[id].Grade)) {
              grades_list.push(this.dumpService.exam_attribute_dump[id].Grade);
            }
            for (const [name, labels] of Object.entries(this.dumpService.subject_map)) {
              if (labels.includes(this.dumpService.exam_attribute_dump[id].Subject) && !this.state_subjects.includes(name)) {
                this.state_subjects.push(name);
              }
            }
          }
        }
        for (const [id, dump] of Object.entries(this.dumpService.exam_attribute_dump)) {
          if (id != 'default' && Object.keys(this.dumpService.exam_names).includes(id)) {
            this.filtered_set.push(id);
            this.filtered_prob_num += dump.NumProblems;
          }
        }
      }
      else {
        for (const [id, dump] of Object.entries(this.dumpService.exam_attribute_dump)) {
          if (id != 'default' && Object.keys(this.dumpService.exam_names).includes(id) && id.startsWith(this.selected_state)) {
            if (!grades_list.includes(this.dumpService.exam_attribute_dump[id].Grade)) {
              grades_list.push(this.dumpService.exam_attribute_dump[id].Grade);
            }
            for (const [name, labels] of Object.entries(this.dumpService.subject_map)) {
              if (labels.includes(this.dumpService.exam_attribute_dump[id].Subject) && !this.state_subjects.includes(name)) {
                this.state_subjects.push(name);
              }
            }
          }
        }
        for (const [id, dump] of Object.entries(this.dumpService.exam_attribute_dump)) {
          if (id != 'default' && Object.keys(this.dumpService.exam_names).includes(id) && dump.State == this.dumpService.state_labels[this.selected_state]) {
            this.filtered_set.push(id);
            this.filtered_prob_num += dump.NumProblems;
          }
        }
      }
      this.state_grades = Object.values(this.dumpService.grade_labels);
      console.log(this.state_grades);
      for (let i = 0; i < Object.values(this.dumpService.grade_labels).length; i++) {
        console.log(this.state_grades[Object.values(this.dumpService.grade_labels).length-1-i]);
        if (!grades_list.includes(this.state_grades[Object.values(this.dumpService.grade_labels).length-1-i])) {
          console.log('Remove ' + this.state_grades[Object.values(this.dumpService.grade_labels).length-1-i]);
          if (+Object.values(this.dumpService.grade_labels).length-1-i != this.state_grades.length - 1) {
            this.state_grades.splice(+Object.values(this.dumpService.grade_labels).length-1-i, 1);
          }
          else {
            this.state_grades.pop();
          }
        }
      }
      const grd = this.selected_grade;
      if (grd != '') {
        this.selected_grade = '';
        this.state_subjects = [];
        this.subject_exams = [];
        this.filtered_set = [];
        this.filtered_prob_num = 0;
        if (this.state_grades.includes(grd)) {
          this.select_grade(grd);
        }
      }
      this.filtered_exam_num = this.filtered_set.length;
    }
  }

  select_grade(grade: string) {
    this.toggle_goals = false;
    this.state_subjects = [];
    this.filtered_set = [];
    this.filtered_prob_num = 0;
    if (this.selected_grade == grade) {
      this.selected_grade = '';
      this.selected_subject = '';
      const stt = this.selected_state;
      this.selected_state = '';
      this.select_state(stt);
    }
    else {
      this.selected_grade = grade;
      if (this.selected_state == 'US') {
        for (const [id, dump] of Object.entries(this.dumpService.exam_attribute_dump)) {
          if (id != 'default' && Object.keys(this.dumpService.exam_names).includes(id)) {
            if (this.dumpService.exam_attribute_dump[id].Grade == grade) {
              for (const [name, labels] of Object.entries(this.dumpService.subject_map)) {
                if (labels.includes(this.dumpService.exam_attribute_dump[id].Subject) && !this.state_subjects.includes(name)) {
                  this.state_subjects.push(name);
                }
              }
            }
          }
        }
        for (const [id, dump] of Object.entries(this.dumpService.exam_attribute_dump)) {
          if (id != 'default' && Object.keys(this.dumpService.exam_names).includes(id)) {
            if ((this.dumpService.exam_attribute_dump[id].Grade == this.selected_grade || (this.dumpService.exam_attribute_dump[id].Grade == 'High School') && ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].includes(this.selected_grade))) {
              this.filtered_set.push(id);
              this.filtered_prob_num += dump.NumProblems;
            }
          }
        }
      }
      else {
        for (const [id, dump] of Object.entries(this.dumpService.exam_attribute_dump)) {
          if (id != 'default' && Object.keys(this.dumpService.exam_names).includes(id) && id.startsWith(this.selected_state) && this.dumpService.exam_attribute_dump[id].Grade == grade) {
            for (const [name, labels] of Object.entries(this.dumpService.subject_map)) {
              if (labels.includes(this.dumpService.exam_attribute_dump[id].Subject) && !this.state_subjects.includes(name)) {
                this.state_subjects.push(name);
              }
            }
          }
        }
        for (const [id, dump] of Object.entries(this.dumpService.exam_attribute_dump)) {
          if (id != 'default' && Object.keys(this.dumpService.exam_names).includes(id) && dump.State == this.dumpService.state_labels[this.selected_state] && (this.dumpService.exam_attribute_dump[id].Grade == this.selected_grade || (this.dumpService.exam_attribute_dump[id].Grade == 'High School') && ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].includes(this.selected_grade))) {
            this.filtered_set.push(id);
            this.filtered_prob_num += dump.NumProblems;
          }
        }
      }
      const sub = this.selected_subject;
      if (sub != '') {
        this.selected_subject = '';
        this.subject_exams = [];
        this.filtered_set = [];
        this.filtered_prob_num = 0;
        if (this.state_subjects.includes(sub)) {
          this.select_subject(sub);
        }
      }
      this.filtered_exam_num = this.filtered_set.length;
    }
  }

  select_subject(subject: string) {
    this.toggle_goals = false;
    this.subject_exams = [];
    this.filtered_set = [];
    this.filtered_prob_num = 0;
    if (this.selected_subject == subject) {
      this.selected_subject = '';
      const grd = this.selected_grade;
      this.selected_grade = '';
      this.select_grade(grd);
    }
    else {
      this.selected_subject = subject;
      if (this.selected_state == 'US') {
        for (const [id, dump] of Object.entries(this.dumpService.exam_attribute_dump)) {
          if (id != 'default' && Object.keys(this.dumpService.exam_names).includes(id)) {
            for (const [name, labels] of Object.entries(this.dumpService.subject_map)) {
              if ((this.dumpService.exam_attribute_dump[id].Grade == this.selected_grade || (this.dumpService.exam_attribute_dump[id].Grade == 'High School') && ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].includes(this.selected_grade)) && labels.includes(this.dumpService.exam_attribute_dump[id].Subject) && name == this.selected_subject) {
                this.subject_exams.push(id);
                this.filtered_set.push(id);
                this.filtered_prob_num += dump.NumProblems;
              }
            }
          }
        }
      }
      else {
        for (const [id, dump] of Object.entries(this.dumpService.exam_attribute_dump)) {
          if (id != 'default' && Object.keys(this.dumpService.exam_names).includes(id)) {
            for (const [name, labels] of Object.entries(this.dumpService.subject_map)) {
              if (this.dumpService.exam_attribute_dump[id].State == this.dumpService.state_labels[this.selected_state] && (this.dumpService.exam_attribute_dump[id].Grade == this.selected_grade || (this.dumpService.exam_attribute_dump[id].Grade == 'High School') && ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].includes(this.selected_grade)) && labels.includes(this.dumpService.exam_attribute_dump[id].Subject) && name == this.selected_subject) {
                this.subject_exams.push(id);
                this.filtered_set.push(id);
                this.filtered_prob_num += dump.NumProblems;
              }
            }
          }
        }
      }
      this.filtered_exam_num = this.filtered_set.length;
    }
    // for (const [id, dump] of Object.entries(this.dumpService.standards_attribute_dump)) {
    //   for (const [name, labels] of Object.entries(this.dumpService.subject_map)) {
    //     if (id.endsWith('-' + this.selected_state) && this.dumpService.standards_attribute_dump[id].Grades.includes(this.selected_grade) && labels.includes(this.dumpService.standards_attribute_dump[id].Subject) && name == this.selected_subject) {
    //       this.standards_id = id;
    //       this.standards_dump = this.dumpService.s_dump_dict[id][1];
    //       for (let domain of this.standards_dump.Standards) {
    //         for (let cluster of domain.Subs) {
    //           cluster.NumProb = this.search_subtopic([domain.Label], cluster.Label);
    //           this.examples_dump[cluster.Key] = cluster.Examples;
    //           for (let standard of cluster.Subs) {
    //             standard.NumProb = this.search_subtopic([domain.Label, cluster.Label], standard.Label);
    //             this.examples_dump[standard.Key] = standard.Examples;
    //             for (let substandard of standard.Subs) {
    //               substandard.NumProb = this.search_subtopic([domain.Label, cluster.Label], substandard.Label);
    //               this.examples_dump[substandard.Key] = substandard.Examples;
    //               for (let subsubstandard of substandard.Subs) {
    //                 subsubstandard.NumProb = this.search_subtopic([domain.Label, cluster.Label], subsubstandard.Label);
    //                 this.examples_dump[subsubstandard.Key] = subsubstandard.Examples;
    //               }
    //             }
    //           }
    //         }
    //       }
    //       if (this.standards_dump.Standards.length == 0) {
    //         this.toggle_goals = true;
    //       }
    //       for (let domain of this.standards_dump.Standards) {
    //         if (this.screenWidth <= this.mobileWidth) {
    //           this.domain_state[domain.Label] = false;
    //         }
    //         else {
    //           this.domain_state[domain.Label] = true;
    //         }
    //       }
    //       for (let goal of this.standards_dump.Goals) {
    //         if (this.screenWidth <= this.mobileWidth) {
    //           this.goal_state[goal[0]] = false;
    //         }
    //         else {
    //           this.goal_state[goal[0]] = true;
    //         }
    //       }
    //     }
    //   }
    // }
  }

  toggle_domain(dmn: string) {
    this.domain_state[dmn] = !this.domain_state[dmn];
    this.stateSet = true;
  }

  toggle_goal(goal: string) {
    this.goal_state[goal] = !this.goal_state[goal];
    this.stateSet = true;
  }

  select_class(uid: string) {
    this.router.navigateByUrl('class/' + uid);
  }

  select_student(id: string) {
    if (this.selected_stud != id) {
      this.selected_stud = id;
      this.student_data = this.authService.searchUserId(id);
      setTimeout(() => {
        const exam_history = this.student_data.exams.history;
        this.inprogress_set = [];
        this.inprogress_exams = {};
        this.inprogress_quizzes = {};
        for (const [key, det] of Object.entries(exam_history)) {
          if (["Started", "Assigned"].includes((det as any).status)) {
            this.inprogress_set.push(key);
            if (("" + key).startsWith('Q-')) {
              this.inprogress_quizzes[key.substring(2)] = { status: (det as any).status, progress: (det as any).progress, lastdate: new Date((det as any).lasttimestamp).toLocaleDateString(), lasttime: new Date((det as any).lasttimestamp).toLocaleTimeString() };
            }
            else {
              this.inprogress_exams[key] = { status: (det as any).status, progress: (det as any).progress, lastdate: new Date((det as any).lasttimestamp).toLocaleDateString(), lasttime: new Date((det as any).lasttimestamp).toLocaleTimeString() };
            }
            console.log(this.inprogress_quizzes);
          }
        }
      }, 200);
    }
    else {
      this.selected_stud = "";
      this.student_data = [];
      this.inprogress_set = [];
      this.inprogress_exams = {};
      this.inprogress_quizzes = {};
    }
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

  search_subtopic(topics: string[], subtopic: string) {
    var subtop_num_prob = 0;
    for (const [ex, dump] of Object.entries(this.dumpService.e_dump_dict)) {
      for (const [num, prob] of Object.entries(dump)) {
        if (typeof prob.SubTopics != 'undefined' && !this.dumpService.exam_attribute_dump[ex].HideTopics) {
          if (prob.SubTopics.includes(subtopic)) {
            for (let topic of topics) {
              if (prob.Topics[prob.SubTopics.indexOf(subtopic)].includes(topic)) {
                subtop_num_prob += 1;
              }
            }
          }
        }
      }
    }
    return (subtop_num_prob);
  }

  select_standard(topics: string[], subtopic: string, standardID: string) {
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
                for (let topic of topics) {
                  if (prob.Topics[prob.SubTopics.indexOf(subtopic)].includes(topic)) {
                    this.subtopic_new_problem_count += 1;
                  }
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
                  for (let topic of topics) {
                    if (prob.Topics[prob.SubTopics.indexOf(subtopic)].includes(topic)) {
                      if (((exam_sub.problems as any)[num].Correct.length == 1 && (exam_sub.problems as any)[num].Correct[0][0] == '✅') || ((exam_sub.problems as any)[num].Correct.length > 1 && this.is_MP_correct((exam_sub.problems as any)[num].Correct))) {
                        this.subtopic_correct_problem_count += 1;
                      }
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
            for (let topic of topics) {
              if (prob.Topics[prob.SubTopics.indexOf(subtopic)].includes(topic)) {
                this.selected_topic = topic;
                // this.standard_id = standardID;
                this.subtopic_problem_count += 1;
                this.subtopic_submission[this.subtopic_problem_count] = {
                  'Number': this.subtopic_problem_count,
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
    if (this.authService.userData && this.authService.userData.role == 'Student') {
      const exam_history = this.authService.userData.exams.history;
      this.subtopic_problem_count = 0;
      this.subtopic_search_dump = {};
      for (const [ex, dump] of Object.entries(this.dumpService.e_dump_dict)) {
        if (Object.keys(exam_history).includes(ex) && (exam_history[ex] as any).status == "Completed") {
          for (const [num, prob] of Object.entries(dump)) {
            if (typeof prob.SubTopics != 'undefined' && !this.dumpService.exam_attribute_dump[ex].HideTopics) {
              if (prob.SubTopics.includes(subtopic)) {
                for (let topic of topics) {
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
            this.subtopic_submission[Object.keys(this.subtopic_submission).length+1] = subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)];
            if (((subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct.length == 1 && subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct[0][0] == '✅') || (subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct.length > 1 && this.is_MP_correct(subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct)))) {
              this.subtopic_streak_count += 1;
              if (this.subtopic_streak_count > this.subtopic_max_streak_count) {
                this.subtopic_max_streak_count = this.subtopic_streak_count;
              }
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
                for (let topic of topics) {
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
    }
    else {
      this.subtopic_new_problem_count = this.subtopic_problem_count;
    }
    // setTimeout(() => {
    this.selected_subtopic = subtopic;
    this.standard_id = standardID;
    this.subtopic_problem_number = 0;
    this.standard_fav = false;
    if (this.authService.userData) {
      for (let fav of this.authService.userData.standards.favorites) {
        for (let topic of topics) {
          if (topic == fav[0] && subtopic == fav[1]) {
            this.standard_fav = true;
          }
        }
      }
    }
    console.log(this.subtopic_submission);
    console.log(this.subtopic_search_dump);
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
      this.toggle_exam_timer_st();
      this.toggle_problem_timer_st();
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
                  this.subtopic_submission[this.subtopic_problem_count] = {
                    'Number': this.subtopic_problem_count,
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
          this.subtopic_submission[i] = subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)];
          this.subtopic_submission[i].Number = i;
          if (((subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct.length == 1 && subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct[0][0] == '✅') || (subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct.length > 1 && this.is_MP_correct(subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct)))) {
            this.subtopic_streak_count += 1;
            if (this.subtopic_streak_count > this.subtopic_max_streak_count) {
              this.subtopic_max_streak_count = this.subtopic_streak_count;
            }
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
                  // this.subtopic_submission[this.subtopic_problem_count] = {
                  //   'Number': +Object.keys(this.subtopic_submission).length,
                  //   'Topics': [],
                  //   'SubTopics': [],
                  //   'Choice': [],
                  //   'Correct': [],
                  //   'Rationale': [],
                  //   'Attempts': [],
                  //   'Path': [],
                  //   'Seconds': 0,
                  //   'Time': '',
                  //   'Flags': [false]
                  // };
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
      console.log(this.subtopic_submission);
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

  toggle_create_student() {
    const avatar = this.avatars[Math.floor(Math.random() * this.avatars.length)];
    this.photoURL = '/assets/media/icons/user/' + avatar + '.png';
    this.create_s = !this.create_s;
    this.edit_s_list = [];
    this.edit_s_list['photoURL'] = this.photoURL;
  }

  edit_student(field: string, val: string) {
    this.edit_s_list[field] = val;
  }

  student_profile_pic(avatar: string) {
    this.photoURL = '/assets/media/icons/user/' + avatar + '.png';
    this.edit_s_list['photoURL'] = this.photoURL;
  }

  create_student() {
    this.student_uid = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i: number = 1; i <= 3; i++) {
      this.student_uid += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.edit_s_list['uid'] = this.authService.userData.uid + "-" + this.student_uid;
    this.authService.WriteUserDataList(this.edit_s_list);
    this.link_student(this.authService.userData.uid + "-" + this.student_uid);
    this.student_metadata = [];
    this.my_student_metadata = [];
    for (const [key, stud] of Object.entries(this.student_list.slice(1))) {
      setTimeout(() => {
        console.log(stud);
        this.student_data = this.authService.searchUserId(stud as string);
        console.log(this.student_data);
        this.student_metadata.push(this.student_data as object);
        this.my_student_metadata.push(this.student_data as object);
      }, +key * 10);
    }
    setTimeout(() => {
      this.student_metadata = [];
      this.my_student_metadata = [];
      for (const [key, stud] of Object.entries(this.student_list.slice(1))) {
        setTimeout(() => {
          console.log(stud);
          this.student_data = this.authService.searchUserId(stud as string);
          console.log(this.student_data);
          this.student_metadata.push(this.student_data as object);
          this.my_student_metadata.push(this.student_data as object);
        }, +key * 10);
      }
    }, 500);
  }

  link_student(id: string) {
    this.student_list = [];
    // this.student_metadata = [];
    for (let std of this.authService.userData.students) {
      this.student_list.push(std as string);
    }
    if (!this.student_list.includes(id)) {
      this.student_list.push(id);
    }
    this.authService.UpdateUserData({ 'students': {} });
    this.authService.UpdateUserData({ 'students': this.student_list });
  }

  toggle_create_class() {
    this.create_c = !this.create_c;
    this.edit_c_list = [];
    this.class_uid = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i: number = 1; i <= 5; i++) {
      this.class_uid += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  }

  edit_class(field: string, val: string) {
    this.edit_c_list[field] = val;
  }

  create_class() {
    this.edit_c_list['classes/' + this.class_uid + '/uid'] = this.class_uid;
    this.edit_c_list['classes/' + this.class_uid + '/teacher'] = this.authService.userData.uid;
    this.edit_c_list['classes/' + this.class_uid + '/students'] = [""];
    this.edit_c_list['classes/' + this.class_uid + '/assignments'] = [""];
    this.authService.UpdateDatabase(this.edit_c_list);
    this.class_list = [];
    for (let clss of this.authService.userData.classes) {
      this.class_list.push(clss as string);
    }
    this.class_list.push(this.class_uid);
    this.authService.UpdateUserData({ 'classes': {} });
    this.authService.UpdateUserData({ 'classes': this.class_list });
    this.my_class_metadata = [];
    for (const [key, clss] of Object.entries(this.class_list.slice(1))) {
      setTimeout(() => {
        console.log(clss);
        this.class_data = this.authService.searchClassId(clss as string);
        console.log(this.class_data);
        this.my_class_metadata.push(this.class_data as object);
      }, +key * 10);
    }
    setTimeout(() => {
      this.my_class_metadata = [];
      for (const [key, clss] of Object.entries(this.class_list.slice(1))) {
        setTimeout(() => {
          console.log(clss);
          this.class_data = this.authService.searchClassId(clss as string);
          console.log(this.class_data);
          this.my_class_metadata.push(this.class_data as object);
        }, +key * 10);
      }
      if (this.class_list.slice(1).length > 0) {
        this.has_classes = true;
      }
      this.toggle_create_class();
    }, 500);
    // setTimeout(() => {
    //   this.set_tab("information");
    //   this.set_tab("students");
    // }, 200);
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

  toggle_new_exam(target: string) {
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

  add_assign_exam() {
    for (let ass of this.new_assignments) {
      if (ass.length < 10) {
        const class_ass_ref = 'classes/' + ass + '/exams';
        var class_ass_set: any = [];
        var edit_c_list: any = {};
        for (let exam of this.my_class_metadata[this.authService.userData.classes.indexOf(ass) - 1].exams) {
          class_ass_set.push(exam as string);
        }
        class_ass_set.push(this.exam_id);
        edit_c_list[class_ass_ref] = class_ass_set;
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

  clear_assignments() {
    this.new_assignments = [];
    this.assign_e = false;
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

  download_exam() {
    const link = document.createElement('a');
    const exam_ref: string = 'exams/' + this.exam_id + '/downloads';
    console.log(exam_ref);
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.file_source);
    link.setAttribute('download', this.exam_name);
    document.body.appendChild(link);
    link.click();
    link.remove();
    if (this.exam_dl == 0) {
      this.edit_e_list[exam_ref] = 1;
      this.authService.UpdateDatabase({ exam_ref: {} });
      this.authService.UpdateDatabase(this.edit_e_list);
    }
    else {
      this.edit_e_list[exam_ref] = this.exam_dl + 1;
      this.authService.UpdateDatabase({ exam_ref: {} });
      this.authService.UpdateDatabase(this.edit_e_list);
    }
    this.edit_e_list = {};
    this.assert_favorite_exm();
    this.exam_dl = (this.authService.searchExamId(this.exam_id)).downloads;
    setTimeout(() => {
      this.exam_dl = (this.authService.searchExamId(this.exam_id)).downloads;
    }, 250);
  }

  print_exam() {
    printJS({ printable: this.file_source, type: 'pdf', showModal: true });
    this.assert_favorite_exm();
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
                    if (this.subtopic_streak_count > this.subtopic_max_streak_count) {
                      this.subtopic_max_streak_count = this.subtopic_streak_count;
                    }
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

  choice_attempted_st(choice: string, part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    var attempt = false;
    for (let i = 0; i < this.subtopic_attempt_path[part_num].length; i++) {
      if ((this.subtopic_search_dump[this.subtopic_problem_number].Type == 'MC' || (this.subtopic_search_dump[this.subtopic_problem_number].Type == 'MP' && this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type == 'MC')) && this.subtopic_attempt_path[part_num][i][0] == choice) {
        attempt = true;
      }
      if ((this.subtopic_search_dump[this.subtopic_problem_number].Type == 'MS' || (this.subtopic_search_dump[this.subtopic_problem_number].Type == 'MP' && this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type == 'MS'))  && this.subtopic_attempt_path[part_num][i].includes(choice)) {
        attempt = true;
      }
    }
    return (attempt);
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
                    if (this.subtopic_streak_count > this.subtopic_max_streak_count) {
                      this.subtopic_max_streak_count = this.subtopic_streak_count;
                    }
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
            if (this.subtopic_streak_count > this.subtopic_max_streak_count) {
              this.subtopic_max_streak_count = this.subtopic_streak_count;
            }
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
            if (this.subtopic_streak_count > this.subtopic_max_streak_count) {
              this.subtopic_max_streak_count = this.subtopic_streak_count;
            }
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
                if (this.subtopic_streak_count > this.subtopic_max_streak_count) {
                  this.subtopic_max_streak_count = this.subtopic_streak_count;
                }
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
                    if (this.subtopic_streak_count > this.subtopic_max_streak_count) {
                      this.subtopic_max_streak_count = this.subtopic_streak_count;
                    }
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
                  if (this.subtopic_streak_count > this.subtopic_max_streak_count) {
                    this.subtopic_max_streak_count = this.subtopic_streak_count;
                  }
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
            if (this.subtopic_streak_count > this.subtopic_max_streak_count) {
              this.subtopic_max_streak_count = this.subtopic_streak_count;
            }
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
      var correct: boolean = true;
      var attempt: boolean = false;
      var part_num = 0;
      if (part != '') {
          part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
      }
      if (choice != this.subtopic_problem_selection[part_num][+inum - 1]) {
          if (this.subtopic_problem_selection[part_num][+inum - 1] != '') {
              this.subtopic_problem_attempts[part_num] += 1;
              attempt = true;
          }
          this.subtopic_problem_selection[part_num][+inum - 1] = choice;
          if (!attempt && !this.subtopic_problem_selection[part_num].includes('')) {
              this.subtopic_problem_attempts[part_num] += 1;
          }
          this.subtopic_attempt_path[part_num].push(this.subtopic_problem_selection[part_num]);
          this.subtopic_attempt_response[part_num] = '';
          for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
              if (this.subtopic_problem_number == +num) {
                  if (part == '') {
                      for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                          if (inum + ':KEY' == ch && choice == key.Choice) {
                              this.subtopic_attempt_explanation[part_num][+inum - 1] = key.Key.Rationale;
                          }
                          else if (inum + ':KEY' == ch && choice != key.Choice) {
                              correct = false;
                          }
                          else if (this.subtopic_problem_selection[part_num][+ch[0]-1] != key.Choice) {
                              correct = false;
                          }
                      }
                  }
                  else {
                      for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                          if (inum + ':KEY' == ch && choice == key.Choice) {
                              this.subtopic_attempt_explanation[part_num][+inum - 1] = key.Key.Rationale;
                          }
                          else if (inum + ':KEY' == ch && choice != key.Choice) {
                              correct = false;
                          }
                          else if (this.subtopic_problem_selection[part_num][+ch[0]-1] != key.Choice) {
                              correct = false;
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
                          if (this.subtopic_streak_count > this.subtopic_max_streak_count) {
                            this.subtopic_max_streak_count = this.subtopic_streak_count;
                          }
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
          this.subtopic_attempt_path[part_num].push(choice);
          this.subtopic_problem_selection[part_num] = [choice];
          for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
              if (part == '') {
                  if (this.subtopic_problem_number == +num) {
                      var correct = false;
                      for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                          if (key.Choice.startsWith('equal:')) {
                              if (choice == key.Choice.slice(6)) {
                                  this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
                                  if (this.subtopic_problem_attempts[part_num] + 1 == 1) {
                                      this.subtopic_streak_count += 1;
                                      if (this.subtopic_streak_count > this.subtopic_max_streak_count) {
                                        this.subtopic_max_streak_count = this.subtopic_streak_count;
                                      }
                                      this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + (this.subtopic_problem_attempts[part_num] + 1).toString() + ' try.';
                                  }
                                  else {
                                      this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + (this.subtopic_problem_attempts[part_num] + 1).toString() + ' tries.';
                                  }
                                  correct = true;
                                  this.subtopic_problem_attempts[part_num] += 1;
                                  this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
                              }
                          }
                          else if (key.Choice.startsWith('match:')) {
                              if (choice == key.Choice.slice(6)) {
                                  this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
                                  if (this.subtopic_problem_attempts[part_num] + 1 == 1) {
                                      this.subtopic_streak_count += 1;
                                      if (this.subtopic_streak_count > this.subtopic_max_streak_count) {
                                        this.subtopic_max_streak_count = this.subtopic_streak_count;
                                      }
                                      this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + (this.subtopic_problem_attempts[part_num] + 1).toString() + ' try.';
                                  }
                                  else {
                                      this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + (this.subtopic_problem_attempts[part_num] + 1).toString() + ' tries.';
                                  }
                                  correct = true;
                                  this.subtopic_problem_attempts[part_num] += 1;
                                  this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
                              }
                          }
                      }
                      if (!correct) {
                          this.subtopic_streak_count = 0;
                          this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                          this.subtopic_problem_attempts[part_num] += 1;
                      }
                  } 
              }
              else {
                  if (this.subtopic_problem_number == +num) {
                      var correct = false;
                      for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                          if (key.Choice.startsWith('equal:')) {
                              if (choice == key.Choice.slice(6)) {
                                  this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
                                  if (this.subtopic_problem_attempts[part_num] + 1 == 1) {
                                      this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + (this.subtopic_problem_attempts[part_num] + 1).toString() + ' try.';
                                  }
                                  else {
                                      this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + (this.subtopic_problem_attempts[part_num] + 1).toString() + ' tries.';
                                  }
                                  correct = true;
                                  this.subtopic_problem_attempts[part_num] += 1;
                                  this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
                              }
                          }
                          else if (key.Choice.startsWith('match:')) {
                              if (choice == key.Choice.slice(6)) {
                                  this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
                                  if (this.subtopic_problem_attempts[part_num] + 1 == 1) {
                                      this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + (this.subtopic_problem_attempts[part_num] + 1).toString() + ' try.';
                                  }
                                  else {
                                      this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + (this.subtopic_problem_attempts[part_num] + 1).toString() + ' tries.';
                                  }
                                  correct = true;
                                  this.subtopic_problem_attempts[part_num] += 1;
                                  this.confetti_light_st(this.subtopic_problem_attempts[part_num]);
                              }
                          }
                      }
                      if (!correct) {
                          this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                          this.subtopic_problem_attempts[part_num] += 1;
                      }
                  }
              }
          }
      }
  }

  attempt_mfr_st_problem(choice: string, inum: string, part: string) {
      var correct: boolean = true;
      var attempt: boolean = false;
      var part_num = 0;
      if (part != '') {
          part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
      }
      if (choice != this.subtopic_problem_selection[part_num][+inum - 1]) {
          if (this.subtopic_problem_selection[part_num][+inum - 1] != '') {
              this.subtopic_problem_attempts[part_num] += 1;
              attempt = true;
          }
          this.subtopic_problem_selection[part_num][+inum - 1] = choice;
          if (!attempt && !this.subtopic_problem_selection[part_num].includes('')) {
              this.subtopic_problem_attempts[part_num] += 1;
          }
          this.subtopic_attempt_path[part_num].push(this.subtopic_problem_selection[part_num]);
          this.subtopic_attempt_response[part_num] = '';
          for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
              if (this.subtopic_problem_number == +num) {
                  if (part == '') {
                      for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                          if (inum + ':KEY' == ch && choice == key.Choice) {
                              this.subtopic_attempt_explanation[part_num][+inum - 1] = key.Key.Rationale;
                          }
                          else if (inum + ':KEY' == ch && choice != key.Choice) {
                              correct = false;
                          }
                          else if (this.subtopic_problem_selection[part_num][+ch[0]-1] != key.Choice) {
                              correct = false;
                          }
                      }
                  }
                  else {
                      for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                          if (inum + ':KEY' == ch && choice == key.Choice) {
                              this.subtopic_attempt_explanation[part_num][+inum - 1] = key.Key.Rationale;
                          }
                          else if (inum + ':KEY' == ch && choice != key.Choice) {
                              correct = false;
                          }
                          else if (this.subtopic_problem_selection[part_num][+ch[0]-1] != key.Choice) {
                              correct = false;
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
                          if (this.subtopic_streak_count > this.subtopic_max_streak_count) {
                            this.subtopic_max_streak_count = this.subtopic_streak_count;
                          }
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
                  if (this.subtopic_streak_count > this.subtopic_max_streak_count) {
                    this.subtopic_max_streak_count = this.subtopic_streak_count;
                  }
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
          if (this.subtopic_streak_count > this.subtopic_max_streak_count) {
            this.subtopic_max_streak_count = this.subtopic_streak_count;
          }
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
          if (this.subtopic_streak_count > this.subtopic_max_streak_count) {
            this.subtopic_max_streak_count = this.subtopic_streak_count;
          }
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
          if (this.subtopic_streak_count > this.subtopic_max_streak_count) {
            this.subtopic_max_streak_count = this.subtopic_streak_count;
          }
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
    const TIel: string = "inputTST-" + part + '-' + index;
    var input: any = document.getElementById(TIel);
    return input.value;
  }

  get_MFR_st(index: string, part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    const MFRIel: string = "inputMFRST-" + part + "-" + index;
    var dropdown: any = document.getElementById(MFRIel);
    return dropdown.value;
  }

  toggle_exam_timer_st() {
    this.et_running_st = !this.et_running_st;
    if (this.et_running_st) {
      const startTime = Date.now() - (this.et_counter_st || 0);
      this.et_timer_st = setInterval(() => {
        this.et_counter_st = Math.round((Date.now() - startTime) / 1000);
        this.et_minutes_st = Math.floor(this.et_counter_st / 60);
      });
    } else {
      clearInterval(this.et_timer_st);
    }
  }

  clear_exam_timer_st() {
    this.et_running_st = false;
    this.et_counter_st = 0;
    clearInterval(this.et_timer_st);
  }

  toggle_problem_timer_st() {
    this.pt_running_st = !this.pt_running_st;
    if (this.pt_running_st) {
      const startTime = Date.now() - (this.pt_counter_st || 0);
      this.pt_timer_st = setInterval(() => {
        this.pt_counter_st = Math.round((Date.now() - startTime) / 1000);
        this.pt_minutes_st = Math.floor(this.pt_counter_st / 60);
      });
    } else {
      clearInterval(this.pt_timer);
    }
  }

  clear_problem_timer_st() {
    this.pt_running_st = false;
    this.pt_counter_st = 0;
    clearInterval(this.pt_timer_st);
  }

  next_problem_st() {
    this.subtopic_submission[this.subtopic_problem_number].Time = (this.pt_minutes).toString() + 'm ' + (this.pt_counter % 60).toString() + 's';
    this.subtopic_submission[this.subtopic_problem_number].Seconds = this.pt_counter;
    this.subtopic_submission[this.subtopic_problem_number].Number = this.subtopic_problem_number;
    this.subtopic_submission[this.subtopic_problem_number].Topics = this.subtopic_search_dump[this.subtopic_problem_number].Topics;
    this.subtopic_submission[this.subtopic_problem_number].SubTopics = this.subtopic_search_dump[this.subtopic_problem_number].SubTopics;
    this.subtopic_submission[this.subtopic_problem_number].Choice = this.subtopic_problem_selection;
    this.subtopic_submission[this.subtopic_problem_number].Attempts = this.subtopic_problem_attempts;
    this.subtopic_submission[this.subtopic_problem_number].Path = this.subtopic_attempt_path;
    // this.subtopic_submission[this.subtopic_problem_number].Correct = this.exam_key[this.subtopic_problem_number - 1];
    this.subtopic_submission[this.subtopic_problem_number].Rationale = this.subtopic_attempt_explanation;
    for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
      if (this.subtopic_problem_number == +num) {
        for (const [num2, sub] of Object.entries(this.subtopic_submission)) {
          if (this.subtopic_problem_number == +num2) {
            console.log(sub.Choice);
            // sub.Time = this.pt_minutes.toString() + 'm ' + (this.pt_counter % 60).toString() + 's';
            // sub.Seconds = this.pt_counter;
            // sub.Number = this.problem_number;
            // sub.Topics = prob.Topics;
            // sub.SubTopics = prob.SubTopics;
            // sub.Attempts = this.problem_attempts;
            // sub.Path = this.attempt_path;
            if (Object.keys(prob.Parts).length == 0 && sub.Attempts[0] > 0) {
              // sub.Choice.push(sub.Path[0][sub.Path[0].length - 1]);
              var ms_correct = true;
              var mp_correct = true;
              if (['O', 'C', 'G'].includes(prob.Type)) {
                if ((prob.Type == 'O' && this.is_m_correct_st('', false)) || (prob.Type == 'C' && this.is_c_correct_st('', false)) || (prob.Type == 'G' && this.is_g_correct_st('', false))) {
                  sub.Correct = [['✅']];
                  this.number_correct += 1;
                }
                else {
                  // sub.Correct = [this.exam_key[this.subtopic_problem_number - 1][0]];
                }
                // sub.Rationale = this.attempt_explanation;
              }
              else if (['MR', 'LR'].includes(prob.Type)) {
                sub.Correct = [['👀']];
                if (this.subtopic_problem_selection[0] == '') {
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
                          // sub.Correct = [this.exam_key[this.subtopic_problem_number - 1][0]];
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
                          // sub.Correct = [this.exam_key[this.subtopic_problem_number - 1][0]];
                        }
                        // sub.Rationale = [[key.Key.Rationale]];
                      }
                    }
                  }
                  else if (['MS', 'IMS'].includes(prob.Type)) {
                    if (sub.Path[0].length > 0 && key.Key.Correct && !sub.Path[0][sub.Path[0].length - 1].includes(ch)) {
                      ms_correct = false;
                    }
                    else if (sub.Path[0].length > 0 && !key.Key.Correct && sub.Path[0][sub.Path[0].length - 1].includes(ch)) {
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
                      if ('equal:' + ''+sub.Path[0][sub.Path[0].length - 1][0] == key.Choice || 'match:' + ''+sub.Path[0][sub.Path[0].length - 1][0] == key.Choice) {
                        sub.Correct = [['✅']];
                        this.number_correct += 1;
                        // sub.Rationale = [[key.Key.Rationale]];
                      }
                      else {
                        // sub.Correct = [this.exam_key[this.subtopic_problem_number - 1][0]];
                        // sub.Rationale = [['No explanation available. The number submitted was not right']];
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
                // sub.Correct = [this.exam_key[this.subtopic_problem_number - 1][0]];
              }
              else if (['MFR', 'IDD', 'T'].includes(prob.Type) && (mp_correct || this.is_idd_correct_st(''))) {
                sub.Correct = [['✅']];
                this.number_correct += 1;
              }
              else if (['MFR', 'IDD', 'T'].includes(prob.Type)) {
                // sub.Correct = [this.exam_key[this.subtopic_problem_number - 1][0]];
              }
            }
            else if (Object.keys(prob.Parts).length > 0) {
              console.log(sub.Attempts.reduce((sum: any, current: any) => sum + current, 0));
              if (sub.Attempts.reduce((sum: any, current: any) => sum + current, 0) > 0) {
                sub.Correct = [];
              }
              // sub.Rationale = [];
              // sub.Rationale = this.attempt_explanation;
              for (const [name, part] of Object.entries(prob.Parts)) {
                if (sub.Attempts[Object.keys(prob.Parts).indexOf(name)] > 0) {
                  // sub.Choice.push(sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1]);
                  var ms_correct = true;
                  var mp_correct = true;
                  if (['O', 'C', 'G'].includes(part.Type)) {
                    if ((part.Type == 'O' && this.is_m_correct_st(name, false)) || (part.Type == 'C' && this.is_c_correct_st(name, false)) || (part.Type == 'G' && this.is_g_correct_st(name, false))) {
                      sub.Correct.push(['✅']);
                      this.number_correct += 1;
                    }
                    else {
                      // sub.Correct.push(this.exam_key[this.subtopic_problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                    }
                    // sub.Rationale.push(this.attempt_explanation);
                  }
                  else if (['LR'].includes(part.Type)) {
                    sub.Correct.push(['👀']);
                    if (this.subtopic_problem_selection[Object.keys(prob.Parts).indexOf(name)] == '') {
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
                          if (sub.Path[Object.keys(prob.Parts).indexOf(name)].length > 0 && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][0] == ch) {
                            if (key.Key.Correct == true) {
                              sub.Correct.push(['✅']);
                              this.number_correct += 1;
                            }
                            else {
                              // sub.Correct.push(this.exam_key[this.subtopic_problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                            }
                            // sub.Rationale.push([key.Key.Rationale]);
                          }
                        }
                      }
                      else if (['LP'].includes(part.Type)) {
                        if (sub.Attempts[Object.keys(prob.Parts).indexOf(name)] > 0) {
                          if (sub.Path[Object.keys(prob.Parts).indexOf(name)].length > 0 && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][0] == ch[0]) {
                            if (key.Key.Correct == true) {
                              sub.Correct = [['✅']];
                              this.number_correct += 1;
                            }
                            else {
                              // sub.Correct = [this.exam_key[this.subtopic_problem_number - 1][Object.keys(prob.Parts).indexOf(name)]];
                            }
                            // sub.Rationale = [[key.Key.Rationale]];
                          }
                        }
                      }
                      if (['MS', 'IMS'].includes(part.Type)) {
                        if (sub.Path[Object.keys(prob.Parts).indexOf(name)].length > 0 && key.Key.Correct && !sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1].includes(ch)) {
                          ms_correct = false;
                        }
                        else if (sub.Path[Object.keys(prob.Parts).indexOf(name)].length > 0 && !key.Key.Correct && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1].includes(ch)) {
                          ms_correct = false;
                        }
                      }
                      else if (['MFR', 'IDD', 'T'].includes(part.Type)) {
                        if (part.Type == 'T') {
                          if (sub.Path[Object.keys(prob.Parts).indexOf(name)].length > 0 && key.Key.Correct && ch.includes('KEY') && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][+ch[0] - 1] != key.Choice) {
                            mp_correct = false;
                          }
                        }
                        if (part.Type == 'MFR') {
                          if (sub.Path[Object.keys(prob.Parts).indexOf(name)].length > 0 && key.Key.Correct && ch.includes('KEY') && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][+ch[0] - 1] != key.Choice) {
                            mp_correct = false;
                          }
                        }
                        if (part.Type == 'IDD') {
                          if (sub.Path[Object.keys(prob.Parts).indexOf(name)].length > 0 && key.Key.Correct && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][+ch[0] - 1] != ch[2]) {
                            mp_correct = false;
                          }
                          else if (sub.Path[Object.keys(prob.Parts).indexOf(name)].length > 0 && !key.Key.Correct && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][+ch[0] - 1] == ch[2]) {
                            mp_correct = false;
                          }
                        }
                      }
                      else if (part.Type == 'FR') {
                        if (sub.Attempts[Object.keys(prob.Parts).indexOf(name)] > 0) {
                          if (sub.Path[Object.keys(prob.Parts).indexOf(name)].length > 0 && ('equal:' + ''+sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][0] == key.Choice || 'match:' + ''+sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][0] == key.Choice)) {
                            sub.Correct.push(['✅']);
                            this.number_correct += 1;
                            // sub.Rationale.push([key.Key.Rationale]);
                          }
                          else {
                            // sub.Correct.push(this.exam_key[this.subtopic_problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                            // sub.Rationale.push(['No explanation available. The number submitted was not right']);
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
                    // sub.Correct.push(this.exam_key[this.subtopic_problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                  }
                  else if (['MFR', 'IDD', 'T'].includes(part.Type) && (mp_correct || this.is_idd_correct_st(name))) {
                    sub.Correct.push(['✅']);
                    this.number_correct += 1;
                  }
                  else if (['MFR', 'IDD', 'T'].includes(part.Type)) {
                    // sub.Correct.push(this.exam_key[this.subtopic_problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                  }
                }
              }
            }
            console.log(sub.Choice);
          }
        }
      }
    }
    this.subtopic_problem_number += 1;
    if (this.subtopic_problem_number > this.subtopic_problem_count) {
      // this.selected_subtopic = '';
      // this.standard_id = '';
      this.toggle_exam_timer_st();
      this.toggle_problem_timer_st();
      this.confetti_fireworks();
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
    this.clear_problem_timer_st();
    this.toggle_problem_timer_st();
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

  width_change() {
    this.viewerWidth = Math.round(window.innerWidth * .99).toString() + "px";
    this.viewerHeight = Math.round(window.innerHeight * .95).toString() + "px";
  }

  data_reload() {
    location.reload();
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
    // this.titleService.setTitle("MoreProblems.Org | U.S. K-12 State Testing Practice Exams");
    // this.meta.updateTag({ name: 'description', content: "Access released practice problems & solutions to prepare for end-of-year tests - including Florida FSA, Illinois IAR, New York NYSTP, North Carolina EOG, Pennsylvania PSSA, and Texas STAAR. Choose from more 400 assessments across math, English language, science, & social studies for elementary, middle, & high school students." });

    // var subject_list: string[] = [];
    // for (let set of Object.keys(this.dumpService.exam_attribute_dump)) {
    //   if (!subject_list.includes(this.dumpService.exam_attribute_dump[set].Subject)) {
    //     subject_list.push(this.dumpService.exam_attribute_dump[set].Subject)
    //   }
    // }
    // for (let set of Object.keys(this.dumpService.exam_attribute_dump)) {
    //   if (!subject_list.includes(this.dumpService.exam_attribute_dump[set].Subject)) {
    //     subject_list.push(this.dumpService.exam_attribute_dump[set].Subject)
    //   }
    // }
    // console.log(subject_list);
    this.width_change2();
    setTimeout(() => {
      if (this.authService.userData) {
        this.authService.getProfilePic(this.authService.userData);
        this.user_data = this.authService.userData;
        setTimeout(() => {
          console.log(this.authService.pp_url);
          // this.profileUploadURL = this.authService.pp_url;
          if (this.authService.userData.state != undefined && this.authService.userData.state != '' && Object.values(this.dumpService.state_labels).includes(this.authService.userData.state)) {
            for (let state of Object.keys(this.dumpService.state_labels)) {
              if (this.dumpService.state_labels[state] == this.authService.userData.state) {
                this.select_state(state);
              }
            }
            setTimeout(() => {
              if (this.authService.userData.grade != undefined && this.authService.userData.grade != '' && Object.values(this.dumpService.grade_labels).includes(this.authService.userData.grade)) {
                this.select_grade(this.authService.userData.grade);
              }
            }, 100);
          }
          else {
            this.select_state('US');
          }
        }, 150);
        for (let exm of this.authService.userData.exams.favorites.slice(1)) {
          this.favorite_exm_set.push(exm as string);
        }
        if (this.authService.userData.role != 'Student' && this.authService.userData.role != '') {
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
          if (!['', 'Student', 'Parent'].includes(this.authService.userData.role)) {
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
        setTimeout(() => {
          this.data_loaded = true;
        }, 250);
      }
      else {
        this.select_state('US');
        this.data_loaded = true;
      }
    }, 500);
  }
}