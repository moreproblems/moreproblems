import { Component, OnInit, Injectable } from '@angular/core';
import * as examMetadata from "src/assets/problems/exams.json"; 
import * as problemsData from "src/assets/problems/TX19G3M/TX19G3M-problems.json";
// import * as fs from 'fs';
// import * as path from 'path';

// function syncReadFile(filename: string) {
//   const result = fs.readFile(path.join(__dirname, filename), 'utf8');
//   console.log(result);
//   return result;
// }

@Component({
    selector: 'app-TX19G3M-exam',
    templateUrl: './TX19G3M-exam.component.html',
    styleUrls: ['./TX19G3M-exam.component.css']
})

@Injectable()
export class TX19G3MExamComponent implements OnInit {
    title = 'More Problems';

    screenWidth = window.innerWidth;
    mobileWidth = 900;

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

    key = 'TX19G3M'
    exam_attribute_dump: { [key: string]: { 'State': string, 'Grade': string, 'Subject': string, 'ExamName': string, 'ExamYear': string, 'ExamType': string, 'NumQuestions': number } } = examMetadata;
  
    exam_state = this.exam_attribute_dump[this.key].State;
    exam_grade = this.exam_attribute_dump[this.key].Grade;
    exam_subject = this.exam_attribute_dump[this.key].Subject;
    exam_name = this.exam_attribute_dump[this.key].ExamName;
    exam_year = this.exam_attribute_dump[this.key].ExamYear;
    exam_type = this.exam_attribute_dump[this.key].ExamType;
    exam_length = this.exam_attribute_dump[this.key].NumQuestions;

    exam_directions = 'Read each question carefully. For a multiple-choice question, determine the best answer to the question from the four answer choices provided. For a griddable question, determine the best answer to the question. Then fill in the answer on your answer document.';

    TX19G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topic': string, 'SubTopic': string, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = problemsData;
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

    begin_exam() {
        if (this.random) {
            this.randomize_problems();
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
        if (this.number_correct >= 28) {
            this.performance_level = "Masters Grade Level Performance";
        }
        else if (this.number_correct >= 24) {
            this.performance_level = "Meets Grade Level Performance";
        }
        else if (this.number_correct >= 17) {
            this.performance_level = "Approaches Grade Level Performance";
        }
        else {
            this.performance_level = "Does Not Meet Grade Level Performance";
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
        for (const [num, value] of Object.entries(this.TX19G3M_exam_dump)) {
            if (value.Number <= 32) {
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
    }
}
