import { Component, OnInit, Injectable } from '@angular/core';
import * as problemsData from "src/assets/problems/TX22G3M/TX22G3M-problems.json";
// import * as fs from 'fs';
// import * as path from 'path';
// import { HttpClient } from '@angular/common/http';

// function syncReadFile(filename: string) {
//   const result = fs.readFile(path.join(__dirname, filename), 'utf8');
//   console.log(result);
//   return result;
// }

@Component({
    selector: 'app-TX22G3M-key',
    templateUrl: './TX22G3M-key.component.html',
    styleUrls: ['./TX22G3M-key.component.css']
})

@Injectable()
export class TX22G3MKeyComponent implements OnInit {
    title = 'More Problems';

    screenWidth = window.innerWidth;
    mobileWidth = 800;

    // et_counter: number = 0;
    // et_minutes: number = 0;
    // et_timer: any;
    // et_running: boolean = false;
    pt_counter: number = 0;
    pt_minutes: number = 0;
    pt_timer: any;
    pt_running: boolean = false;

    expand_filters = true;
    expand_topic = false;

    exam_key = 'src/app/assets/Exams/exams.txt';
    exam_code = 'TX22G3M'
    exam_file = 'src/app/assets/problems/' + this.exam_code + '/' + this.exam_code + '-problems.txt';

    // exam_data = fs.readFileSync(this.problem_file, 'utf8');
    // exam_data: string = '';
    // fileReader: FileReader = new FileReader()
    // this.fileReader.readAsText(this.problem_file);

    exam_state = 'Texas';
    exam_grade = 'Grade 3';
    exam_subject = 'Mathematics';
    exam_name = 'STAAR';
    exam_year = '2022';
    exam_length = 32;

    exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topic': string, 'SubTopic': string, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = problemsData;

    problem_number = 1;
    problem_selection = '';
    problem_attempts = 0;
    attempt_response = '';
    attempt_explanation = '';

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
    }

    toggle_topic() {
        this.expand_topic = !this.expand_topic;
    }

    attempt_mc_problem(choice: string) {
        if (choice != this.problem_selection) {
            this.problem_attempts += 1;
            this.problem_selection = choice;
            for (const [num, prob] of Object.entries(this.exam_dump)) {
                if (this.problem_number == +num) {
                    for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                        if (choice == ch) {
                            this.attempt_explanation = key.Key.Rationale;
                            if (key.Key.Correct == true) {
                                if (this.problem_attempts == 1) {
                                    this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' try.';
                                }
                                else {
                                    this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.';
                                }
                            }
                            else {
                                this.attempt_response = 'That is not the correct answer - have another try.';
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
            this.problem_selection = choice;
            for (const [num, prob] of Object.entries(this.exam_dump)) {
                if (this.problem_number == +num) {
                    for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                        if (choice == key.Choice) {
                            this.attempt_explanation = key.Key.Rationale;
                            if (this.problem_attempts == 1) {
                                this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' try.';
                            }
                            else {
                                this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.';
                            }
                        }
                        else {
                            this.attempt_response = 'That is not the correct answer - have another try.';
                        }
                    }
                }
            }
        }
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
        if (this.problem_number < this.exam_length) {
            this.problem_number += 1;
            this.problem_selection = '';
            this.problem_attempts = 0;
            this.attempt_response = '';
            this.clearProblemTimer();
            this.toggleProblemTimer();
        }
    }

    prev_problem() {
        if (this.problem_number > 1) {
            this.problem_number -= 1;
            this.problem_selection = '';
            this.problem_attempts = 0;
            this.attempt_response = '';
            this.clearProblemTimer();
            this.toggleProblemTimer();
        }
    }

    go_to_prob(num: number) {
        if (num < 1) {
            this.problem_number = 1;
        }
        else if (num > this.exam_length) {
            this.problem_number = this.exam_length;
        }
        else if (Number.isNaN(num)) {
            this.problem_number = this.problem_number;
        }
        else {
            this.problem_number = num;
        }
        this.problem_selection = '';
        this.problem_attempts = 0;
        this.attempt_response = '';
    }

    scroll(el: HTMLElement) {
        el.scrollIntoView({ behavior: 'smooth' });
    }

    scroll2(el: HTMLElement) {
        window.scrollTo({ left: 0, top: el.getBoundingClientRect().top - 80, behavior: 'smooth' });
    }

    ngOnInit() {
        this.toggleProblemTimer();
    }
}