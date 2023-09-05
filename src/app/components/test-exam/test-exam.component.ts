import { Component, OnInit, Injectable } from '@angular/core';
import * as examMetadata from "src/assets/problems/exams.json";
import * as downloadData from "src/assets/problems/downloads.json";
import * as TestProblems from "src/assets/problems/TX18G3M/TX18G3M-problems.json";
import { HttpClient } from '@angular/common/http';

const confetti = require('canvas-confetti');

const confettiCanvas = document.getElementById('confetticanvas');
const confettiHandler = confetti.create(confettiCanvas, {
  resize: true,
  useWorker: true,
});

@Component({
  selector: 'app-test-exam',
  templateUrl: './test-exam.component.html',
  styleUrls: ['./test-exam.component.css']
})

@Injectable()
export class TestExamComponent implements OnInit {
  title = 'More Problems';

  screenWidth = window.innerWidth;
  mobileWidth = 875;

  state_filters: string[] = [];
  grade_filters: string[] = [];
  subject_filters: string[] = [];
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

  key = 'TX18G3M'
  exam_attribute_dump: { [key: string]: { 'State': string, 'Grade': string, 'Subject': string, 'ExamName': string, 'ExamYear': string, 'ExamType': string, 'NumQuestions': number, 'Topics': { [key: string]: number } } } = examMetadata;
  download_dump: { [key: string]: number } = downloadData;
  dl_state_breakdown: { [key: string]: number } = {};
  dl_grade_breakdown: { [key: string]: number } = {};
  dl_subject_breakdown: { [key: string]: number } = {};

  exam_state = this.exam_attribute_dump[this.key].State;
  exam_grade = this.exam_attribute_dump[this.key].Grade;
  exam_subject = this.exam_attribute_dump[this.key].Subject;
  exam_name = this.exam_attribute_dump[this.key].ExamName;
  exam_year = this.exam_attribute_dump[this.key].ExamYear;
  exam_type = this.exam_attribute_dump[this.key].ExamType;
  exam_length = this.exam_attribute_dump[this.key].NumQuestions;

  test_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TestProblems;
  exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = {};
  dump_count = 1;

  online_set = ["TX22G3M", "TX21G3M", "TX19G3M"];
  filtered_set: string[] = [];
  generate_message = "";

  problems_sequence: number[] = Array.from({ length: this.exam_length }, (_, i) => i + 1);
  ordered_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = {};
  random_index = 0
  random_list: number[] = Array.from({ length: this.exam_length }, (_, i) => i + 1);

  exam_key: string[] = [];

  problem_number = 0;
  problem_selection = '';
  problem_attempts = 0;
  attempt_path: string[] = [];
  attempt_response = '';
  attempt_explanation = '';
  exam_submission: { [key: number]: { 'Number': number, 'Topics': string[], 'SubTopics': string[], 'Choice': string, 'Correct': string, 'Rationale': string, 'Attempts': number, 'Path': string[], 'Time': string } } = {};

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
    for (const [num, value] of Object.entries(this.test_exam_dump)) {
      if (value.Number <= 32) {
        // this.exam_dump[this.dump_count] = value;
        this.ordered_dump[this.dump_count] = value;
        this.dump_count += 1;
      }
    }
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
    for (const [num, val] of Object.entries(this.exam_dump)) {
      for (const [ch, val2] of Object.entries(val.AnswerChoices)) {
        if (ch == 'Key') {
          this.exam_key.push(val2.Choice);
        }
        else {
          if (val2.Key.Correct) {
            this.exam_key.push(ch);
          }
        }
      }
    }
  }

  toggle_filters() {
    this.expand_filters = !this.expand_filters;
    if (this.mode == 'assess') {
      for (let num of Object.keys(this.exam_dump)) {
        this.exam_submission[+num] = {
          'Number': 0,
          'Topics': [],
          'SubTopics': [],
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
    if (ch != this.problem_selection) {
      this.problem_attempts += 1;
      this.attempt_path.push(ch);
      this.problem_selection = ch;
      for (const [num, prob] of Object.entries(this.exam_dump)) {
        if (this.problem_number == +num) {
          for (const [choice, key] of Object.entries(prob.AnswerChoices)) {
            if (choice == ch) {
              this.attempt_explanation = key.Key.Rationale;
              if (key.Key.Correct == true) {
                if (this.mode == 'explain') {
                  this.confetti_light();
                }
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

  attempt_fr_problem(ch: string) {
    if (ch != this.problem_selection) {
      this.problem_attempts += 1;
      this.attempt_path.push(ch);
      this.problem_selection = ch;
      for (const [num, prob] of Object.entries(this.exam_dump)) {
        if (this.problem_number == +num) {
          for (const [choice, key] of Object.entries(prob.AnswerChoices)) {
            if (ch == key.Choice) {
              if (this.mode == 'explain') {
                this.confetti_light();
              }
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
      this.exam_submission[this.problem_number].Topics = this.exam_dump[this.problem_number].Topics;
      this.exam_submission[this.problem_number].SubTopics = this.exam_dump[this.problem_number].SubTopics;
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
            sub.Topics = prob.Topics;
            sub.SubTopics = prob.SubTopics;
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
      for (let num: number = 0; num < this.exam_submission_list[i].Topics.length; num++) {
        if (Object.keys(this.topic_breakdown).includes(this.exam_submission_list[i].Topics[num])) {
          this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Total += 1;
          if (this.exam_submission_list[i].Correct == '✅') {
            this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Correct += 1;
            if (Object.keys(this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs).includes(this.exam_submission_list[i].SubTopics[num])) {
              this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]].Total += 1;
              this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]].Correct += 1;
            }
            else {
              this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0 };
            }
          }
          else {
            this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Incorrect += 1;
            if (Object.keys(this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs).includes(this.exam_submission_list[i].SubTopics[num])) {
              this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]].Total += 1;
              this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]].Incorrect += 1;
            }
            else {
              this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0 };
            }
          }
        }
        else {
          if (this.exam_submission_list[i].Correct == '✅') {
            this.topic_breakdown[this.exam_submission_list[i].Topics[num]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Subs': { [this.exam_submission_list[i].SubTopics[num]]: { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0 } } };
          }
          else {
            this.topic_breakdown[this.exam_submission_list[i].Topics[num]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Subs': { [this.exam_submission_list[i].SubTopics[num]]: { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0 } } };
          }
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
    this.dl_state_breakdown = {};
    this.dl_grade_breakdown = {};
    this.dl_subject_breakdown = {};
    for (const [key, val] of Object.entries(this.download_dump)) {
      // state
      const dl_state = key.substring(0,2);
      if (Object.keys(this.dl_state_breakdown).includes(dl_state)) {
        this.dl_state_breakdown[dl_state] += val;
      }
      else {
        this.dl_state_breakdown[dl_state] = val;
      }
      // grade
      if (['CO', 'IL', 'MA', 'MD', 'MN', 'MO', 'NJ'].includes(dl_state)) {
        if (key.substring(2,4) == 'G1') {
          const dl_grade = key.substring(2,5);
          if (Object.keys(this.dl_grade_breakdown).includes(dl_grade)) {
            this.dl_grade_breakdown[dl_grade] += val;
          }
          else {
            this.dl_grade_breakdown[dl_grade] = val;
          }
        }
        else {
          const dl_grade = key.substring(2,4);
          if (Object.keys(this.dl_grade_breakdown).includes(dl_grade)) {
            this.dl_grade_breakdown[dl_grade] += val;
          }
          else {
            this.dl_grade_breakdown[dl_grade] = val;
          }
        }
      }
      else {
        if (key.substring(4,6) == 'G1') {
          const dl_grade = key.substring(4,7);
          if (Object.keys(this.dl_grade_breakdown).includes(dl_grade)) {
            this.dl_grade_breakdown[dl_grade] += val;
          }
          else {
            this.dl_grade_breakdown[dl_grade] = val;
          }
        }
        else {
          const dl_grade = key.substring(4,6);
          if (Object.keys(this.dl_grade_breakdown).includes(dl_grade)) {
            this.dl_grade_breakdown[dl_grade] += val;
          }
          else {
            this.dl_grade_breakdown[dl_grade] = val;
          }
        }
      }
      // subject
      if (['CO', 'IL', 'MA', 'MD', 'MN', 'MO', 'NJ'].includes(dl_state)) {
        if (key.substring(2,4) == 'G1') {
          const dl_subject = key.substring(5);
          if (Object.keys(this.dl_subject_breakdown).includes(dl_subject)) {
            this.dl_subject_breakdown[dl_subject] += val;
          }
          else {
            this.dl_subject_breakdown[dl_subject] = val;
          }
        }
        else {
          const dl_subject = key.substring(4);
          if (Object.keys(this.dl_subject_breakdown).includes(dl_subject)) {
            this.dl_subject_breakdown[dl_subject] += val;
          }
          else {
            this.dl_subject_breakdown[dl_subject] = val;
          }
        }
      }
      else {
        if (key.substring(4,6) == 'G1') {
          const dl_subject = key.substring(7);
          if (Object.keys(this.dl_subject_breakdown).includes(dl_subject)) {
            this.dl_subject_breakdown[dl_subject] += val;
          }
          else {
            this.dl_subject_breakdown[dl_subject] = val;
          }
        }
        else {
          const dl_subject = key.substring(6);
          if (Object.keys(this.dl_subject_breakdown).includes(dl_subject)) {
            this.dl_subject_breakdown[dl_subject] += val;
          }
          else {
            this.dl_subject_breakdown[dl_subject] = val;
          }
        }
      }
    }
    console.log(this.dl_state_breakdown);
    console.log(this.dl_grade_breakdown);
    console.log(this.dl_subject_breakdown);
  }
}