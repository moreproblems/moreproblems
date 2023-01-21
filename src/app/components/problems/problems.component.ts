import { Component, OnInit, Injectable } from '@angular/core';
// import * as exams from "src/assets/problems/exams.json"; 
import * as TX21G3MProblems from "src/assets/problems/TX21G3M/TX21G3M-problems.json";
import * as TX19G3MProblems from "src/assets/problems/TX19G3M/TX19G3M-problems.json";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})

@Injectable()
export class ProblemsComponent implements OnInit {
  title = 'More Problems';

  filters: string[] = [];
  expand_filters = true;
  expand_topic = false;

  // exam_key = exams;
  // exam_code = 'TX21G3M'
  // exam_file = 'src/app/assets/problems/' + this.exam_code + '/' + this.exam_code + '-problems.txt';

  pt_counter: number = 0;
  pt_minutes: number = 0;
  pt_timer: any;
  pt_running: boolean = false;

  // exam_state = 'Texas';
  // exam_grade = 'Grade 3';
  // exam_subject = 'Mathematics';
  // exam_name = 'STAAR';
  // exam_year = '2021';
  exam_length = 0;

  TX21G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topic': string, 'SubTopic': string, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX21G3MProblems;
  TX19G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topic': string, 'SubTopic': string, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX19G3MProblems;
  exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topic': string, 'SubTopic': string, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = {};
  dump_count = 1;

  problems_sequence: number[] = Array.from({length: this.exam_length}, (_, i) => i + 1);
  ordered_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topic': string, 'SubTopic': string, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = {};
  random_index = 0
  random_list: number[] = Array.from({length: this.exam_length}, (_, i) => i + 1);

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

  generate_problems() {
    for (const [num, value] of Object.entries(this.TX21G3M_exam_dump)) {
      if (value.Number <= 32) {
        this.exam_dump[this.dump_count] = value;
        this.ordered_dump[this.dump_count] = value;
        this.dump_count += 1;
      }
    }
    for (const [num, value] of Object.entries(this.TX19G3M_exam_dump)) {
      if (value.Number <= 32) {
        this.exam_dump[this.dump_count] = value;
        this.ordered_dump[this.dump_count] = value;
        this.dump_count += 1;
      }
    }
    this.exam_length = Object.keys(this.exam_dump).length;
    this.randomize_problems();
    this.toggle_filters();
  }

  randomize_problems() {
    this.problems_sequence = Array.from({length: this.exam_length}, (_, i) => i + 1);
    this.random_list = []
    for (const [num, value] of Object.entries(this.exam_dump)) {
      this.random_index = Math.floor(Math.random() * this.problems_sequence.length);
      this.random_list.push(this.problems_sequence[this.random_index]);
      this.exam_dump[+num] = this.ordered_dump[this.problems_sequence[this.random_index]];
      this.problems_sequence.splice(this.random_index, 1);
    }
  }

  toggle_filters() {
    this.expand_filters = !this.expand_filters;
  }

  toggle_topic() {
    this.expand_topic = !this.expand_topic;
  }

  attempt_mc_problem(ch: string) {
    this.problem_attempts += 1;
    this.problem_selection = ch;
    for (const [num, prob] of Object.entries(this.exam_dump)) {
      if (this.problem_number == +num) {
        for (const [choice, key] of Object.entries(prob.AnswerChoices)) {
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

  attempt_fr_problem(ch: string) {
    this.problem_attempts += 1;
    this.problem_selection = ch;
    for (const [num, prob] of Object.entries(this.exam_dump)) {
      if (this.problem_number == +num) {
        for (const [choice, key] of Object.entries(prob.AnswerChoices)) {
          if (ch == key.Choice) {
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
    this.problem_number += 1;
    this.problem_selection = '';
    this.problem_attempts = 0;
    this.attempt_response = '';
    this.clearProblemTimer();
    this.toggleProblemTimer();
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
