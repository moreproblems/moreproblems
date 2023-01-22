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

  screenWidth = window.innerWidth;
  mobileWidth = 800;

  filters: string[] = [];
  expand_filters = true;
  sub_topic = false;
  expand_topics = true;
  show_correct = false;
  mode = 'assess';

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
  exam_length = 10;

  TX21G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topic': string, 'SubTopic': string, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX21G3MProblems;
  TX19G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topic': string, 'SubTopic': string, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX19G3MProblems;
  exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topic': string, 'SubTopic': string, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = {};
  dump_count = 1;

  problems_sequence: number[] = Array.from({ length: this.exam_length }, (_, i) => i + 1);
  ordered_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topic': string, 'SubTopic': string, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = {};
  random_index = 0
  random_list: number[] = Array.from({ length: this.exam_length }, (_, i) => i + 1);

  exam_key: string[] = [];

  problem_number = 0;
  problem_selection = '';
  problem_attempts = 0;
  attempt_path: string[] = [];
  attempt_response = '';
  attempt_explanation = '';
  exam_submission: { [key: number]: { 'Number': number, 'Topic': string, 'SubTopic': string, 'Choice': string, 'Correct': string, 'Rationale': string, 'Attempts': number, 'Path': string[], 'Time': string } } = {};

  exam_submission_list: any[] = [];
  wrong_submission_list: any[] = [];
  number_correct = 0;
  correct_percent = 0;
  topic_breakdown: { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Subs': { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number } } } } = {};

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

  toggle_mode() {
    if (this.mode == 'assess') {
      this.mode = 'explain';
    }
    else if (this.mode == 'explain') {
      this.mode = 'assess';
    }
  }

  set_problem_num(num: number) {
    if (num < 5) {
      this.exam_length = 5;
    }
    else if (num > 50) {
      this.exam_length = 50;
    }
    else {
      this.exam_length = num;
    }
  }

  generate_problems() {
    for (const [num, value] of Object.entries(this.TX21G3M_exam_dump)) {
      if (value.Number <= 32) {
        // this.exam_dump[this.dump_count] = value;
        this.ordered_dump[this.dump_count] = value;
        this.dump_count += 1;
      }
    }
    for (const [num, value] of Object.entries(this.TX19G3M_exam_dump)) {
      if (value.Number <= 32) {
        // this.exam_dump[this.dump_count] = value;
        this.ordered_dump[this.dump_count] = value;
        this.dump_count += 1;
      }
    }
    // this.exam_length = Object.keys(this.exam_dump).length;
    this.randomize_problems(this.exam_length);
    this.toggle_filters();
  }

  randomize_problems(total: number) {
    this.problems_sequence = Array.from({ length: Object.keys(this.ordered_dump).length }, (_, i) => i + 1);
    this.random_list = []
    for (let i = 1; i <= this.exam_length; i++) {
      this.random_index = Math.floor(Math.random() * this.problems_sequence.length);
      this.random_list.push(this.problems_sequence[this.random_index]);
      this.exam_dump[i] = this.ordered_dump[this.problems_sequence[this.random_index]];
      this.problems_sequence.splice(this.random_index, 1);
    }
  }

  toggle_filters() {
    this.expand_filters = !this.expand_filters;
    if (this.mode == 'assess') {
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
          'Time': ''
        };
      }
      this.toggleExamTimer();
    }
    this.toggleProblemTimer();
    this.problem_number = 1;
  }

  toggle_topic() {
    this.sub_topic = !this.sub_topic;
  }

  attempt_mc_problem(ch: string) {
    this.problem_attempts += 1;
    this.attempt_path.push(ch);
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
    this.attempt_path.push(ch);
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

  next_problem() {
    if (this.mode == 'assess') {
      this.exam_submission[this.problem_number].Number = this.problem_number;
      this.exam_submission[this.problem_number].Topic = this.exam_dump[this.problem_number].Topic;
      this.exam_submission[this.problem_number].SubTopic = this.exam_dump[this.problem_number].SubTopic;
      if (this.problem_number == this.exam_length) {
        for (let i: number = 1; i <= this.exam_length; i++) {
          this.exam_submission_list.push(this.exam_submission[i]);
          if (this.exam_submission[i].Correct != '✅') {
            this.wrong_submission_list.push(this.exam_submission[i]);
          }
        }
      }
    }
    this.problem_number += 1;
    this.problem_selection = '';
    this.problem_attempts = 0;
    this.attempt_response = '';
    this.clearProblemTimer();
    this.toggleProblemTimer();
    if (this.problem_number > this.exam_length) {
      this.completeExam();
    }
  }

  next_problem_a(choice: string) {
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
