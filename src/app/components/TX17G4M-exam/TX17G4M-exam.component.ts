import { Component, OnInit, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AuthService } from "../../shared/services/auth.service";
import { WindowService } from '../../shared/services/window.service';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { serverTimestamp } from "firebase/database";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as examMetadata from "src/assets/problems/exams.json";
import * as problemsData from "src/assets/problems/TX17G4M/TX17G4M-problems.json";
// import * as fs from 'fs';
// import * as path from 'path';

// function syncReadFile(filename: string) {
//   const result = fs.readFile(path.join(__dirname, filename), 'utf8');
//   console.log(result);
//   return result;
// }

const confetti = require('canvas-confetti');

const confettiCanvas = document.getElementById('confetticanvas');
const confettiHandler = confetti.create(confettiCanvas, {
    resize: true,
    useWorker: true,
});

@Component({
    selector: 'app-TX17G4M-exam',
    templateUrl: './TX17G4M-exam.component.html',
    styleUrls: ['./TX17G4M-exam.component.css']
})

@Injectable()
export class TX17G4MExamComponent implements OnInit {
    title = 'More Problems';

    screenWidth = window.innerWidth;
    mobileWidth = 800;

    exam_inprogress = false;
    progress_number = 0;
    last_date: any;
    last_time: any;

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

    key = 'TX17G4M'
    exam_attribute_dump: { [key: string]: { 'State': string, 'Grade': string, 'Subject': string, 'ExamName': string, 'ExamYear': string, 'ExamType': string, 'NumQuestions': number } } = examMetadata;

    exam_state = this.exam_attribute_dump[this.key].State;
    exam_grade = this.exam_attribute_dump[this.key].Grade;
    exam_subject = this.exam_attribute_dump[this.key].Subject;
    exam_name = this.exam_attribute_dump[this.key].ExamName;
    exam_year = this.exam_attribute_dump[this.key].ExamYear;
    exam_type = this.exam_attribute_dump[this.key].ExamType;
    exam_length = this.exam_attribute_dump[this.key].NumQuestions;

    exam_directions = 'Read each question carefully. For a multiple-choice question, determine the best answer to the question from the four answer choices provided. For a griddable question, determine the best answer to the question. Then fill in the answer on your answer document.';

    TX17G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topic': string, 'SubTopic': string, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = problemsData;
    exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topic': string, 'SubTopic': string, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = {};
    dump_count = 1;

    problems_sequence: number[] = Array.from({ length: this.exam_length }, (_, i) => i + 1);
    ordered_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topic': string, 'SubTopic': string, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = {};
    random_index = 0
    random_list: number[] = Array.from({ length: this.exam_length }, (_, i) => i + 1);
    random = false;

    // exam_key: string[] = ['C', 'G', 'A', 'H', '7', 'F', 'D', 'F', 'C', 'G', 'C', 'G', 'D', '96', 'A', 'J', 'B', 'F', 'C', 'J', 'A', 'H', 'D', '18', 'B', 'J', 'B', 'H', 'B', 'F', 'B', 'J'];
    exam_key: string[] = [];

    problem_number = 0;
    problem_selection = '';
    problem_attempts = 0;
    attempt_path: string[] = [];
    attempt_response = '';
    exam_submission: { [key: number]: { 'Number': number, 'Topic': string, 'SubTopic': string, 'Choice': string, 'Correct': string, 'Rationale': string, 'Attempts': number, 'Path': string[], 'Seconds': number, 'Time': string } } = {};

    exam_submission_list: any[] = [];
    wrong_submission_list: any[] = [];
    number_correct = 0;
    correct_percent = 0;
    topic_breakdown: { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Seconds': number, 'Time': string, 'Subs': { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Seconds': number, 'Time': string } } } } = {};
    performance_level = "";
    total_seconds = 0;

    sub_form = '';
    parent_select = false;
    teacher_select = false;

    db_updates: any = {};

    constructor(public authService: AuthService, public router: Router, private afAuth: AngularFireAuth) { }

    width_change2() {
        this.screenWidth = window.innerWidth;
        if (this.screenWidth <= this.mobileWidth) {
            this.expand_topics = false;
        }
    }

    toggle_random() {
        this.random = !this.random;
    }

    randomize_problems() {
        this.problems_sequence = Array.from({ length: this.exam_length }, (_, i) => i + 1);
        this.random_list = []
        for (const [num, value] of Object.entries(this.exam_dump)) {
            this.random_index = Math.floor(Math.random() * this.problems_sequence.length);
            this.random_list.push(this.problems_sequence[this.random_index]);
            this.exam_dump[+num] = this.ordered_dump[this.problems_sequence[this.random_index]];
            this.problems_sequence.splice(this.random_index, 1);
        }
        this.exam_key = [];
        for (let value of Object.values(this.exam_dump)) {
            for (const [ch, value2] of Object.entries(value.AnswerChoices)) {
                if (ch == 'Key') {
                    this.exam_key.push(value2.Choice);
                }
                else {
                    if (value2.Key.Correct) {
                        this.exam_key.push(ch);
                    }
                }
            }
        }
    }

    resume_exam() {
        for (let num of Object.keys(this.exam_dump)) {
            this.exam_submission[+num] = {
                'Number': 0,
                'Topic': '',
                'SubTopic': '',
                'Choice': '',
                'Correct': '',
                'Rationale': '',
                'Attempts': 0,
                'Path': [],
                'Seconds': 0,
                'Time': ''
            };
        }
        if (this.authService.userData) {
            this.db_updates['exams/history/' + this.key + "/lasttimestamp"] = serverTimestamp();
            this.authService.UpdateUserData(this.db_updates);
            this.db_updates = {};
            const exam_history = this.authService.userData.exams.history;
            for (const [key, det] of Object.entries(exam_history)) {
                if ((det as any).status == "Started" && key == this.key) {
                    this.exam_inprogress = true;
                    this.progress_number = (det as any).progress + 1;
                    if ((det as any).progress != 0) {
                        const db_submission = this.authService.getExamSubmission(this.key).problems;
                        for (const [key2, det2] of Object.entries(db_submission)) {
                            this.exam_submission[+key2] = (det2 as any);
                        }
                    }
                }
            }
        }
        this.toggleExamTimer();
        this.toggleProblemTimer();
        this.problem_number = this.progress_number;
    }

    begin_exam() {
        if (this.random) {
            this.randomize_problems();
        }
        if (this.authService.userData) {
            this.db_updates['exams/history/' + this.key] = { progress: 0, status: 'Started', lasttimestamp: serverTimestamp() };
            this.db_updates['problems/all/' + this.key + '-' + "" + (this.problem_number + 1) + '/status'] = 'Viewed';
            this.authService.UpdateUserData(this.db_updates);
            this.db_updates = {};
            this.db_updates['/submissions/exams/' + this.authService.userData.uid + '/' + this.key + '/starttimestamp'] = serverTimestamp();
            this.authService.UpdateDatabase(this.db_updates);
            this.db_updates = {};
        }
        for (let num of Object.keys(this.exam_dump)) {
            this.exam_submission[+num] = {
                'Number': 0,
                'Topic': '',
                'SubTopic': '',
                'Choice': '',
                'Correct': '',
                'Rationale': '',
                'Attempts': 0,
                'Path': [],
                'Seconds': 0,
                'Time': ''
            };
        }
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
                        sub.Seconds = this.pt_counter;
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
                                    // this.number_correct += 1;
                                }
                                else {
                                    sub.Correct = this.exam_key[this.problem_number - 1];
                                }
                                sub.Rationale = key.Key.Rationale;
                            }
                            else if (prob.Type == 'FR') {
                                if (choice == key.Choice) {
                                    sub.Correct = '✅';
                                    // this.number_correct += 1;
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
                else {
                    this.number_correct += 1;
                    this.total_seconds += this.exam_submission[i].Seconds;
                }
            }
            this.correct_percent = Math.round(this.number_correct / this.problem_number * 100);
            if (this.authService.userData) {
                this.db_updates['exams/history/' + this.key + '/progress'] = this.authService.userData.exams.history[this.key].progress + 1;
                this.db_updates['exams/history/' + this.key + '/lasttimestamp'] = serverTimestamp();
                this.db_updates['problems/total'] = this.authService.userData.problems.total + 1; //only add if new
                if (this.attempt_response == 'Correct') {
                    this.db_updates['problems/correct'] = this.authService.userData.problems.correct + 1;
                }
                this.db_updates['problems/all/' + this.key + '-' + "" + this.problem_number + '/status'] = this.attempt_response;
                this.authService.UpdateUserData(this.db_updates);
                this.db_updates = {};
                this.db_updates['/submissions/problems/' + this.authService.userData.uid + '/' + this.key + '-' + "" + this.problem_number] = this.exam_submission[this.problem_number];
                this.db_updates['/submissions/exams/' + this.authService.userData.uid + '/' + this.key + '/problems/' + "" + this.problem_number] = this.exam_submission[this.problem_number];
                this.db_updates['/submissions/exams/' + this.authService.userData.uid + '/' + this.key + '/endtimestamp'] = serverTimestamp();
                // this.db_updates['/submissions/exams/' + this.authService.userData.uid + '/'  + this.key] = this.exam_submission;
                this.authService.UpdateDatabase(this.db_updates);
                this.db_updates = {};
                this.db_updates['/submissions/problems/' + this.authService.userData.uid + '/' + this.key + '-' + "" + this.problem_number + '/timestamp'] = serverTimestamp();
                this.authService.UpdateDatabase(this.db_updates);
                this.db_updates = {};
            }
        }
        else {
            if (this.authService.userData) {
                this.db_updates['exams/history/' + this.key + '/progress'] = this.authService.userData.exams.history[this.key].progress + 1;
                this.db_updates['exams/history/' + this.key + '/lasttimestamp'] = serverTimestamp();
                this.db_updates['problems/total'] = this.authService.userData.problems.total + 1; //only add if new
                if (this.attempt_response == 'Correct') {
                    this.db_updates['problems/correct'] = this.authService.userData.problems.correct + 1;
                }
                this.db_updates['problems/all/' + this.key + '-' + "" + this.problem_number + '/status'] = this.attempt_response;
                this.db_updates['problems/all/' + this.key + '-' + "" + (this.problem_number + 1) + '/status'] = 'Viewed';
                this.authService.UpdateUserData(this.db_updates);
                this.db_updates = {};
                this.db_updates['/submissions/problems/' + this.authService.userData.uid + '/' + this.key + '-' + "" + this.problem_number] = this.exam_submission[this.problem_number];
                this.db_updates['/submissions/exams/' + this.authService.userData.uid + '/' + this.key + '/problems/' + "" + this.problem_number] = this.exam_submission[this.problem_number];
                this.authService.UpdateDatabase(this.db_updates);
                this.db_updates = {};this.db_updates['/submissions/problems/' + this.authService.userData.uid + '/' + this.key + '-' + "" + this.problem_number + '/timestamp'] = serverTimestamp();
                this.authService.UpdateDatabase(this.db_updates);
                this.db_updates = {};
            }
        }
        this.problem_number += 1;
        this.problem_selection = '';
        this.problem_attempts = 0;
        this.attempt_path = [];
        this.clearProblemTimer();
        this.toggleProblemTimer();
        if (this.problem_number > this.exam_length) {
            this.et_counter = this.total_seconds;
            this.et_minutes = Math.floor(this.total_seconds/60);
            this.completeExam();
        }
    }

    completeExam() {
        // retreive db sub/exam/problems if auth student, to calculate results & set db sub/exam/...
        this.toggleExamTimer();
        this.confetti_pop();
        for (let i: number = 0; i < this.exam_length; i++) {
            if (Object.keys(this.topic_breakdown).includes(this.exam_submission_list[i].Topic)) {
                this.topic_breakdown[this.exam_submission_list[i].Topic].Total += 1;
                this.topic_breakdown[this.exam_submission_list[i].Topic].Seconds += this.exam_submission_list[i].Seconds;
                if (this.exam_submission_list[i].Correct == '✅') {
                    this.topic_breakdown[this.exam_submission_list[i].Topic].Correct += 1;
                    if (Object.keys(this.topic_breakdown[this.exam_submission_list[i].Topic].Subs).includes(this.exam_submission_list[i].SubTopic)) {
                        this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic].Total += 1;
                        this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic].Correct += 1;
                        this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic].Seconds += this.exam_submission_list[i].Seconds;
                    }
                    else {
                        this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s' };
                    }
                }
                else {
                    this.topic_breakdown[this.exam_submission_list[i].Topic].Incorrect += 1;
                    if (Object.keys(this.topic_breakdown[this.exam_submission_list[i].Topic].Subs).includes(this.exam_submission_list[i].SubTopic)) {
                        this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic].Total += 1;
                        this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic].Incorrect += 1;
                        this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic].Seconds += this.exam_submission_list[i].Seconds;
                    }
                    else {
                        this.topic_breakdown[this.exam_submission_list[i].Topic].Subs[this.exam_submission_list[i].SubTopic] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s' };
                    }
                }
            }
            else {
                if (this.exam_submission_list[i].Correct == '✅') {
                    this.topic_breakdown[this.exam_submission_list[i].Topic] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s', 'Subs': { [this.exam_submission_list[i].SubTopic]: { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s' } } };
                }
                else {
                    this.topic_breakdown[this.exam_submission_list[i].Topic] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s', 'Subs': { [this.exam_submission_list[i].SubTopic]: { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s' } } };
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
        if (this.number_correct >= 29) {
            this.performance_level = "Masters Grade Level Performance";
        }
        else if (this.number_correct >= 25) {
            this.performance_level = "Meets Grade Level Performance";
        }
        else if (this.number_correct >= 17) {
            this.performance_level = "Approaches Grade Level Performance";
        }
        else {
            this.performance_level = "Does Not Meet Grade Level Performance";
        }
        if (this.authService.userData && this.authService.userData.role == 'Student') {
            this.db_updates['exams/history/' + this.key + '/status'] = 'Completed';
            this.authService.UpdateUserData(this.db_updates);
            this.db_updates = {};
            // this.db_updates['/submissions/exams/' + this.authService.userData.uid + '/'  + this.key + '/problems'] = this.exam_submission;
            // this.db_updates['/submissions/exams/' + this.authService.userData.uid + '/'  + this.key + '/topics'] = this.topic_breakdown;
            this.db_updates['/submissions/exams/' + this.authService.userData.uid + '/' + this.key + '/total'] = this.exam_length;
            this.db_updates['/submissions/exams/' + this.authService.userData.uid + '/' + this.key + '/correct'] = this.number_correct;
            this.db_updates['/submissions/exams/' + this.authService.userData.uid + '/' + this.key + '/score'] = this.correct_percent;
            this.db_updates['/submissions/exams/' + this.authService.userData.uid + '/' + this.key + '/level'] = this.performance_level;
            this.db_updates['/submissions/exams/' + this.authService.userData.uid + '/' + this.key + '/time'] = "" + ""+(Math.floor(this.total_seconds/60)) + 'm ' + "" + ""+(this.total_seconds%60) + 's';
            this.authService.UpdateDatabase(this.db_updates);
            this.db_updates = {};
        }
    }

    confetti_pop() {
        confettiHandler({
            particleCount: 750,
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
        for (const [num, value] of Object.entries(this.TX17G4M_exam_dump)) {
            if (value.Number <= this.exam_length) {
                this.exam_dump[this.dump_count] = value;
                this.ordered_dump[this.dump_count] = value;
                this.dump_count += 1;
            }
        }
        for (let value of Object.values(this.exam_dump)) {
            for (const [ch, value2] of Object.entries(value.AnswerChoices)) {
                if (ch == 'Key') {
                    this.exam_key.push(value2.Choice);
                }
                else {
                    if (value2.Key.Correct) {
                        this.exam_key.push(ch);
                    }
                }
            }
        }
        for (let num of Object.keys(this.exam_dump)) {
            this.exam_submission[+num] = {
                'Number': 0,
                'Topic': '',
                'SubTopic': '',
                'Choice': '',
                'Correct': '',
                'Rationale': '',
                'Attempts': 0,
                'Path': [],
                'Seconds': 0,
                'Time': ''
            };
        }
        if (this.authService.userData) {
            const exam_history = this.authService.userData.exams.history;
            for (const [key, det] of Object.entries(exam_history)) {
                if ((det as any).status == "Started" && key == this.key) {
                    this.exam_inprogress = true;
                    this.progress_number = (det as any).progress + 1;
                    this.last_date = new Date((det as any).lasttimestamp).toLocaleDateString();
                    this.last_time = new Date((det as any).lasttimestamp).toLocaleTimeString()
                    if ((det as any).progress != 0) {
                        const db_submission = this.authService.getExamSubmission(this.key).problems;
                        for (const [key2, det2] of Object.entries(db_submission)) {
                            this.exam_submission[+key2] = (det2 as any);
                        }
                    }
                }
            }
        }
    }
}
