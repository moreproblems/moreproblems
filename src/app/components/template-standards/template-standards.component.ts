import { Component, OnInit, AfterViewInit, Injectable, ElementRef, ViewChild, Input, Renderer2, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { serverTimestamp } from "firebase/database";
import { AuthService } from "../../shared/services/auth.service";
import { DumpService } from "../../shared/services/dump.service";
import { WindowService } from '../../shared/services/window.service';
import intlTelInput from 'intl-tel-input';
import printJS from 'print-js';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as Plotly from 'plotly.js-dist-min';
import * as Chart from 'chart.js/auto';

(<any>pdfMake).addVirtualFileSystem(pdfFonts);

const confetti = require('canvas-confetti').default;

const confettiCanvas = document.getElementById('confettiCanvas');
const confettiHandler = confetti.create(confettiCanvas, {
    resize: true,
    useWorker: true,
});

@Component({
    selector: 'app-template-standards',
    templateUrl: './template-standards.component.html',
    styleUrls: ['./template-standards.component.css']
})

@Injectable()
export class TemplateStandardsComponent implements OnInit {
    title = 'More Problems';

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    mobileWidth = 1000;
    blank = " ";
    menuOpen = false;
    stateSet = false;
    data_loaded = false;

    favorite_std_set: string[][] = [];

    user_data: any = {};
    my_students: string[] = [];
    my_students_data: any = {};
    selected_student: string = "";
    selected_student_st: string = "";
    selected_student_data: any = {};

    key: string = "";

    standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = { 'Title': '', 'Overview': '', 'Goals': [], 'Standards': [], 'References': [] };
    examples_dump: { [key: string]: string[] } = {};

    toggle_goals: boolean = false;
    goal_state: { [key: string]: boolean } = {};
    domain_state: { [key: string]: boolean } = {};

    expand_refsheet = false;
    expand_supp = true;

    problem_number = 1;
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
    random_index = 0
    random_list: string[] = [];

    subtopic_search_dump: { [key: number]: { 'Number': any, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = {};
    pdf_dump: any = { content: [], styles: { tableExample: { margin: [0, 5, 0, 15] } }, defaultStyle: { columnGap: 20, fontSize: 15 }, images: {} };

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
    subtopic_submission: any[] = [];
    supp_st_dump: any = {};
    st_refsheet_source: string = '';
    subtopic_problem_selection: any[] = [];
    subtopic_problem_attempts: number[] = [];
    subtopic_attempt_path: any[] = [];
    subtopic_attempt_response: string[] = [];
    subtopic_attempt_explanation: any[] = [];

    exam_name = '';
    exam_url = '';
    exam_id = '';
    exam_dl = 0;
    exam_fav = false;
    quiz_id = '';
    file_source = '';
    file_page = 1;
    file_zoom = 85;

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

    constructor(public router: Router, private aRoute: ActivatedRoute, public authService: AuthService, public dumpService: DumpService, private afAuth: AngularFireAuth, private http: HttpClient) { }

    sub: any;

    max(num1: number, num2: number) {
        return (Math.max(num1, num2));
    }

    width_change2() {
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
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

    sort_subtopic_problems() {
        return (Object.entries(this.subtopic_search_dump).sort(([, valueA], [, valueB]) => (this.authService.getStudProbSubmission2(this.selected_student_st, valueA.Number)).timestamp - (this.authService.getStudProbSubmission2(this.selected_student_st, valueB.Number)).timestamp));
    }

    subtopic_correct_percent() {
        return (Math.round(100 * this.subtopic_correct_problem_count / (this.subtopic_problem_count - this.subtopic_new_problem_count)));
    }

    toggle_domain(dmn: string) {
        this.domain_state[dmn] = !this.domain_state[dmn];
        this.stateSet = true;
    }

    toggle_goal(goal: string) {
        this.goal_state[goal] = !this.goal_state[goal];
        this.stateSet = true;
    }

    search_subtopic(topics: string[], subtopic: string) {
        var subtop_num_prob = 0;
        for (const [ex, dump] of Object.entries(this.dumpService.e_dump_dict)) {
            for (const [num, prob] of Object.entries(dump)) {
                var prob_added = false;
                if (typeof prob.SubTopics != 'undefined' && !this.dumpService.exam_attribute_dump[ex].HideTopics) {
                    if (prob.SubTopics.includes(subtopic)) {
                        for (let topic of topics) {
                            if (!prob_added && prob.Topics[prob.SubTopics.indexOf(subtopic)].includes(topic)) {
                                subtop_num_prob += 1;
                                prob_added = true;
                            }
                        }
                    }
                }
            }
        }
        return (subtop_num_prob);
    }

    select_subtopic(topics: string[], subtopic: string, standardID: string) {
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
                var dump_prob = false;
                if (typeof prob.SubTopics != 'undefined' && !this.dumpService.exam_attribute_dump[ex].HideTopics) {
                    if (prob.SubTopics.includes(subtopic)) {
                        for (let topic of topics) {
                            if (prob.Topics[prob.SubTopics.indexOf(subtopic)].includes(topic) && !dump_prob) {
                                dump_prob = true;
                                this.selected_topic = topic;
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
        console.log(this.subtopic_search_dump);
        if (this.authService.userData && this.authService.userData.role == 'Student') {
            const exam_history = this.authService.userData.exams.history;
            this.subtopic_problem_count = 0;
            this.subtopic_search_dump = {};
            for (const [ex, dump] of Object.entries(this.dumpService.e_dump_dict)) {
                if (Object.keys(exam_history).includes(ex) && (exam_history[ex] as any).status == "Completed") {
                    for (const [num, prob] of Object.entries(dump)) {
                        var dump_prob = false;
                        if (typeof prob.SubTopics != 'undefined' && !this.dumpService.exam_attribute_dump[ex].HideTopics) {
                            if (prob.SubTopics.includes(subtopic)) {
                                for (let topic of topics) {
                                    if (prob.Topics[prob.SubTopics.indexOf(subtopic)].includes(topic) && !dump_prob) {
                                        dump_prob = true;
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
            console.log(this.subtopic_search_dump);
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
                        var dump_prob = false;
                        if (typeof prob.SubTopics != 'undefined' && !this.dumpService.exam_attribute_dump[ex].HideTopics) {
                            if (prob.SubTopics.includes(subtopic)) {
                                for (let topic of topics) {
                                    if (prob.Topics[prob.SubTopics.indexOf(subtopic)].includes(topic) && !dump_prob) {
                                        dump_prob = true;
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
        // }, 500);
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

    begin_practice_st() {
        console.log(this.subtopic_problem_count);
        console.log(this.subtopic_new_problem_count);
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
        this.sub = this.aRoute.paramMap.subscribe((params) => {
            console.log(params);
            this.key = (params.get('subjectKey') as string);
            if (!this.dumpService.standard_set.includes(this.dumpService.s_dump_dict[this.key][0])) {
                this.router.navigate(['standards']);
            }
        });
        this.standards_dump = this.dumpService.s_dump_dict[this.key][1];
        setTimeout(() => {
            for (let domain of this.standards_dump.Standards) {
                domain.NumProb = 0;
                for (let cluster of domain.Subs) {
                    domain.NumProb += this.search_subtopic([domain.Label], cluster.Label);
                    cluster.NumProb = this.search_subtopic([domain.Label], cluster.Label);
                    cluster.Fav = false;
                    this.examples_dump[cluster.Key] = cluster.Examples;
                    if (this.authService.userData) {
                        for (let fav of this.authService.userData.standards.favorites) {
                            for (let topic of [domain.Label]) {
                                if (topic == fav[0] && cluster.Label == fav[1]) {
                                    cluster.Fav = true;
                                }
                            }
                        }
                    }
                    for (let standard of cluster.Subs) {
                        domain.NumProb += this.search_subtopic([domain.Label, cluster.Label], standard.Label);
                        standard.NumProb = this.search_subtopic([domain.Label, cluster.Label], standard.Label);
                        standard.Fav = false;
                        this.examples_dump[standard.Key] = standard.Examples;
                        if (this.authService.userData) {
                            for (let fav of this.authService.userData.standards.favorites) {
                                for (let topic of [domain.Label, cluster.Label]) {
                                    if (topic == fav[0] && standard.Label == fav[1]) {
                                        standard.Fav = true;
                                    }
                                }
                            }
                        }
                        for (let substandard of standard.Subs) {
                            domain.NumProb += this.search_subtopic([domain.Label, cluster.Label], substandard.Label);
                            substandard.NumProb = this.search_subtopic([domain.Label, cluster.Label], substandard.Label);
                            substandard.Fav = false;
                            this.examples_dump[substandard.Key] = substandard.Examples;
                            if (this.authService.userData) {
                                for (let fav of this.authService.userData.standards.favorites) {
                                    for (let topic of [domain.Label, cluster.Label]) {
                                        if (topic == fav[0] && substandard.Label == fav[1]) {
                                            substandard.Fav = true;
                                        }
                                    }
                                }
                            }
                            for (let subsubstandard of substandard.Subs) {
                                domain.NumProb += this.search_subtopic([domain.Label, cluster.Label], subsubstandard.Label);
                                subsubstandard.NumProb = this.search_subtopic([domain.Label, cluster.Label], subsubstandard.Label);
                                subsubstandard.Fav = false;
                                this.examples_dump[subsubstandard.Key] = subsubstandard.Examples;
                                if (this.authService.userData) {
                                    for (let fav of this.authService.userData.standards.favorites) {
                                        for (let topic of [domain.Label, cluster.Label]) {
                                            if (topic == fav[0] && subsubstandard.Label == fav[1]) {
                                                subsubstandard.Fav = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (this.standards_dump.Standards.length == 0) {
                this.toggle_goals = true;
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
                }, 250);
            }
            else {
                this.width_change2();
                this.data_loaded = true;
            }
        }, 500);
    }
}