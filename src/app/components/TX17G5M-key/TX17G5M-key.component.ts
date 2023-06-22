import { Component, OnInit, Injectable } from '@angular/core';
import * as examMetadata from "src/assets/problems/exams.json";
import * as problemsData from "src/assets/problems/TX17G5M/TX17G5M-problems.json";

const confetti = require('canvas-confetti');

const confettiCanvas = document.getElementById('confetticanvas');
const confettiHandler = confetti.create(confettiCanvas, {
    resize: true,
    useWorker: true,
});

@Component({
    selector: 'app-TX17G5M-key',
    templateUrl: '../template-key/template-key.component.html',
    styleUrls: ['./TX17G5M-key.component.css']
})

@Injectable()
export class TX17G5MKeyComponent implements OnInit {
    title = 'More Problems';

    screenWidth = window.innerWidth;
    mobileWidth = 875;

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

    key = 'TX17G5M'
    exam_attribute_dump: { [key: string]: { 'State': string, 'Grade': string, 'Subject': string, 'ExamName': string, 'ExamYear': string, 'ExamType': string, 'NumQuestions': number } } = examMetadata;

    exam_state = this.exam_attribute_dump[this.key].State;
    exam_grade = this.exam_attribute_dump[this.key].Grade;
    exam_subject = this.exam_attribute_dump[this.key].Subject;
    exam_name = this.exam_attribute_dump[this.key].ExamName;
    exam_year = this.exam_attribute_dump[this.key].ExamYear;
    exam_type = this.exam_attribute_dump[this.key].ExamType;
    exam_length = this.exam_attribute_dump[this.key].NumQuestions;

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
                                this.confetti_light();                                if (this.problem_attempts == 1) {
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
                            this.confetti_light();
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

    confetti_light() {
        confettiHandler({
            particleCount: Math.round(250 / this.problem_attempts),
            startVelocity: 125,
            scalar: 1.15,
            ticks: 150,
            decay: 0.8,
            angle: 90,
            spread: 60,
            origin: { x: 0.5, y: 1 }
        });
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

    ngOnInit() {
        this.toggleProblemTimer();
    }
}