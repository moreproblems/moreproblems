import { Component, OnInit, Injectable } from '@angular/core';
import * as problemsData from "src/assets/problems/TX21G3M/TX21G3M-problems.json";
// import {NgPipesModule} from 'ngx-pipes';
// import * as fs from 'fs';
// import * as path from 'path';

// function syncReadFile(filename: string) {
//   const result = fs.readFile(path.join(__dirname, filename), 'utf8');
//   console.log(result);
//   return result;
// }

@Component({
    selector: 'app-TX21G3M-exam',
    templateUrl: './TX21G3M-exam.component.html',
    styleUrls: ['./TX21G3M-exam.component.css']
})

@Injectable()
export class TX21G3MExamComponent implements OnInit {
    title = 'More Problems';

    screenWidth = window.innerWidth;
    mobileWidth = 800;

    et_counter: number = 0;
    et_minutes: number = 0;
    et_timer: any;
    et_running: boolean = false;
    pt_counter: number = 0;
    pt_minutes: number = 0;
    pt_timer: any;
    pt_running: boolean = false;

    expand_topics = true;
    show_correct = false;
    filters: string[] = [];
    expand_filters = true;

    exam_dump_file = 'src/app/assets/Exams/exams.txt';
    exam_code = 'TX21G3M'
    exam_file = 'src/app/assets/problems/' + this.exam_code + '/' + this.exam_code + '-problems.txt';

    // exam_data = fs.readFileSync(this.problem_file, 'utf8');
    // exam_data: string = '';
    // fileReader: FileReader = new FileReader()
    // this.fileReader.readAsText(this.problem_file);

    exam_state = 'Texas';
    exam_grade = 'Grade 3';
    exam_subject = 'Mathematics';
    exam_name = 'STAAR';
    exam_year = '2021';
    exam_length = 32;

    exam_directions = 'Read each question carefully. For a multiple-choice question, determine the best answer to the question from the four answer choices provided. For a griddable question, determine the best answer to the question. Then fill in the answer on your answer document.';

    exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topic': string, 'SubTopic': string, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = problemsData;

    exam_key: string[] = ['B', 'H', 'A', 'H', '972', 'H', 'A', 'G', 'D', 'J', 'C', 'H', 'D', '20', 'A', 'H', 'A', 'J', 'D', 'G', 'C', 'J', 'B', '13', 'A', 'G', 'D', 'F', 'B', 'F', 'C', 'G']

    problem_number = 0;
    problem_selection = '';
    problem_attempts = 0;
    attempt_path: string[] = [];
    attempt_response = '';
    exam_submission: { [key: number]: { 'Number': number, 'Topic': string, 'SubTopic': string, 'Choice': string, 'Correct': string, 'Rationale': string, 'Attempts': number, 'Path': string[], 'Time': string } } = {
        1: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        2: {

            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        3: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        4: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        5: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        6: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        7: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        8: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        9: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        10: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        11: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        12: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        13: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        14: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        15: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        16: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        17: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        18: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        19: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        20: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        21: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        22: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        23: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        24: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        25: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        26: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        27: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        28: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        29: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        30: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        31: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        32: {
            'Number': 0,
            'Topic': '',
            'SubTopic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        }
    };

    exam_submission_list: any[] = [];
    wrong_submission_list: any[] = [];
    number_correct = 0;
    correct_percent = 0;
    topic_breakdown: { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Subs': { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number } } } } = {};

    sub_form = '';
    parent_select = false;
    teacher_select = false;

    constructor() { }

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
        }
    }

    toggle_button(val: string) {
        if (!this.filters.includes(val)) {
            this.filters.push(val)
        }
        else {
            if (this.filters.indexOf(val) !== -1) {
                this.filters.splice(this.filters.indexOf(val), 1);
            }
            else {
                this.filters.pop()
            }
        }
    }

    read_exam_dump() {
        // const rawFile = new XMLHttpRequest();
        // rawFile.open("GET", "./assets/problems/TX21G3M/TX21G3M-problems.txt", false);
        // console.log(rawFile.open("GET", "./assets/problems/TX21G3M/TX21G3M-problems.txt", false));
        // this.exam_dump = JSON.parse(rawFile.responseText);
        // fetch( "./assets/problems/TX21G3M/TX21G3M-problems.txt")
        //     .then((response) => response.json())
        //     .then((json) => this.exam_dump = json);
    }

    begin_exam() {
        // this.read_exam_dump();
        this.toggleExamTimer();
        this.toggleProblemTimer();
        this.problem_number = 1;
    }

    attempt_mc_problem(choice: string) {
        if (choice != this.problem_selection) {
            this.problem_attempts += 1;
            this.attempt_path.push(choice);
            this.problem_selection = choice;
            for (const [num, prob] of Object.entries(this.exam_dump)) {
                if (this.problem_number == +num) {
                    for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                        if (choice == ch) {
                            if (key.Key.Correct == true) {
                                this.attempt_response = 'Correct'
                            }
                            else {
                                this.attempt_response = 'Incorrect'
                            }
                        }
                    }
                }
            }
        }
    }

    attempt_fr_problem(choice: string) {
        if (choice != this.problem_selection) {
            this.problem_attempts += 1;
            this.attempt_path.push(choice);
            this.problem_selection = choice;
            for (const [num, prob] of Object.entries(this.exam_dump)) {
                if (this.problem_number == +num) {
                    for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                        if (choice == key.Choice) {
                            this.attempt_response = 'Correct'
                        }
                        else {
                            this.attempt_response = 'Incorrect'
                        }
                    }
                }
            }
        }
    }

    next_problem(choice: string) {
        for (const [num, prob] of Object.entries(this.exam_dump)) {
            if (this.problem_number == +num) {
                for (const [num2, sub] of Object.entries(this.exam_submission)) {
                    if (this.problem_number == +num2) {
                        sub.Time = this.pt_minutes.toString() + 'm ' + (this.pt_counter % 60).toString() + 's';
                        sub.Number = this.problem_number;
                        sub.Topic = prob.Topic;
                        sub.SubTopic = prob.SubTopic;
                        sub.Choice = choice;
                        sub.Attempts = this.problem_attempts;
                        sub.Path = this.attempt_path;
                        for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                            if (choice == ch) {
                                if (key.Key.Correct == true) {
                                    sub.Correct = '✅';
                                    this.number_correct += 1;
                                }
                                else {
                                    sub.Correct = this.exam_key[this.problem_number - 1];
                                }
                                sub.Rationale = key.Key.Rationale;
                            }
                            else if (prob.Type == 'FR') {
                                if (choice == key.Choice) {
                                    sub.Correct = '✅';
                                    this.number_correct += 1;
                                    sub.Rationale = key.Key.Rationale;
                                }
                                else {
                                    sub.Correct = this.exam_key[this.problem_number - 1];
                                    sub.Rationale = 'No rationale provided. The number submitted was not right';
                                }
                            }
                        }
                    }
                }
            }
        }
        if (this.problem_number == this.exam_length) {
            for (let i: number = 1; i <= this.exam_length; i++) {
                this.exam_submission_list.push(this.exam_submission[i]);
                if (this.exam_submission[i].Correct != '✅') {
                    this.wrong_submission_list.push(this.exam_submission[i]);
                }
            }
        }
        this.correct_percent = Math.round(this.number_correct / this.problem_number * 100);
        this.problem_number += 1;
        this.problem_selection = '';
        this.problem_attempts = 0;
        this.attempt_path = [];
        this.clearProblemTimer();
        this.toggleProblemTimer();
        if (this.problem_number > this.exam_length) {
            this.completeExam();
        }
    }

    completeExam() {
        this.toggleExamTimer();
        for (let i: number = 0; i < this.exam_length; i++) {
            if (Object.keys(this.topic_breakdown).includes(this.exam_submission_list[i].Topic)) {
                this.topic_breakdown[this.exam_submission_list[i].Topic].Total += 1;
                if (this.exam_submission_list[i].Correct == '✅') {
                    this.topic_breakdown[this.exam_submission_list[i].Topic].Correct += 1;
                    if (Object.keys(this.topic_breakdown[this.exam_submission_list[i].Topic].Subs).includes(this.exam_submission_list[i].SubTopic)) {
                        this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic].Total += 1;
                        this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic].Correct += 1;
                    }
                    else {
                        this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0 };
                    }
                }
                else {
                    this.topic_breakdown[this.exam_submission_list[i].Topic].Incorrect += 1;
                    if (Object.keys(this.topic_breakdown[this.exam_submission_list[i].Topic].Subs).includes(this.exam_submission_list[i].SubTopic)) {
                        this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic].Total += 1;
                        this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic].Incorrect += 1;
                    }
                    else {
                        this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0 };
                    }
                }
            }
            else {
                if (this.exam_submission_list[i].Correct == '✅') {
                    this.topic_breakdown[this.exam_submission_list[i].Topic] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Subs': { [this.exam_submission_list[i].SubTopic]: { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0 } } };
                }
                else {
                    this.topic_breakdown[this.exam_submission_list[i].Topic] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Subs': { [this.exam_submission_list[i].SubTopic]: { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0 } } };
                }
            }
        }
        for (let topic of Object.keys(this.topic_breakdown)) {
            this.topic_breakdown[topic].Percent = Math.round(100 * this.topic_breakdown[topic].Correct / (this.topic_breakdown[topic].Total));
            for (let subtopic of Object.keys(this.topic_breakdown[topic].Subs)) {
                this.topic_breakdown[topic].Subs[subtopic].Percent = Math.round(100 * this.topic_breakdown[topic].Subs[subtopic].Correct / (this.topic_breakdown[topic].Subs[subtopic].Total));
            }
        }
    }

    toggleExamTimer() {
        this.et_running = !this.et_running;
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

    expandTopics() {
        this.expand_topics = !this.expand_topics;
    }

    showCorrect() {
        this.show_correct = !this.show_correct;
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
