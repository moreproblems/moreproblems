import { Component, OnInit, Injectable } from '@angular/core';
import * as examMetadata from "src/assets/problems/exams.json";
import * as PA22G3MProblems from "src/assets/problems/PA22G3M/PA22G3M-problems.json";
import * as PA21G3MProblems from "src/assets/problems/PA21G3M/PA21G3M-problems.json";
import * as PA19G3MProblems from "src/assets/problems/PA19G3M/PA19G3M-problems.json";
import * as PA18G3MProblems from "src/assets/problems/PA18G3M/PA18G3M-problems.json";
import * as PA16G3MProblems from "src/assets/problems/PA16G3M/PA16G3M-problems.json";
import * as PA15G3MProblems from "src/assets/problems/PA15G3M/PA15G3M-problems.json";
import * as PA22G4MProblems from "src/assets/problems/PA22G4M/PA22G4M-problems.json";
import * as PA21G4MProblems from "src/assets/problems/PA21G4M/PA21G4M-problems.json";
import * as PA19G4MProblems from "src/assets/problems/PA19G4M/PA19G4M-problems.json";
import * as PA18G4MProblems from "src/assets/problems/PA18G4M/PA18G4M-problems.json";
import * as PA16G4MProblems from "src/assets/problems/PA16G4M/PA16G4M-problems.json";
import * as PA15G4MProblems from "src/assets/problems/PA15G4M/PA15G4M-problems.json";
import * as PA22G4SProblems from "src/assets/problems/PA22G4S/PA22G4S-problems.json";
import * as PA21G4SProblems from "src/assets/problems/PA21G4S/PA21G4S-problems.json";
import * as PA19G4SProblems from "src/assets/problems/PA19G4S/PA19G4S-problems.json";
import * as PA18G4SProblems from "src/assets/problems/PA18G4S/PA18G4S-problems.json";
import * as PA16G4SProblems from "src/assets/problems/PA16G4S/PA16G4S-problems.json";
import * as PA15G4SProblems from "src/assets/problems/PA15G4S/PA15G4S-problems.json";
import * as PA22G5MProblems from "src/assets/problems/PA22G5M/PA22G5M-problems.json";
import * as PA21G5MProblems from "src/assets/problems/PA21G5M/PA21G5M-problems.json";
import * as PA19G5MProblems from "src/assets/problems/PA19G5M/PA19G5M-problems.json";
import * as PA18G5MProblems from "src/assets/problems/PA18G5M/PA18G5M-problems.json";
import * as PA16G5MProblems from "src/assets/problems/PA16G5M/PA16G5M-problems.json";
import * as PA15G5MProblems from "src/assets/problems/PA15G5M/PA15G5M-problems.json";
import * as PA22G6MProblems from "src/assets/problems/PA22G6M/PA22G6M-problems.json";
import * as PA21G6MProblems from "src/assets/problems/PA21G6M/PA21G6M-problems.json";
import * as PA19G6MProblems from "src/assets/problems/PA19G6M/PA19G6M-problems.json";
import * as PA18G6MProblems from "src/assets/problems/PA18G6M/PA18G6M-problems.json";
import * as PA16G6MProblems from "src/assets/problems/PA16G6M/PA16G6M-problems.json";
import * as PA15G6MProblems from "src/assets/problems/PA15G6M/PA15G6M-problems.json";
import * as PA22G7MProblems from "src/assets/problems/PA22G7M/PA22G7M-problems.json";
import * as PA21G7MProblems from "src/assets/problems/PA21G7M/PA21G7M-problems.json";
import * as PA19G7MProblems from "src/assets/problems/PA19G7M/PA19G7M-problems.json";
import * as PA18G7MProblems from "src/assets/problems/PA18G7M/PA18G7M-problems.json";
import * as PA16G7MProblems from "src/assets/problems/PA16G7M/PA16G7M-problems.json";
import * as PA15G7MProblems from "src/assets/problems/PA15G7M/PA15G7M-problems.json";
import * as PA22G8MProblems from "src/assets/problems/PA22G8M/PA22G8M-problems.json";
import * as PA21G8MProblems from "src/assets/problems/PA21G8M/PA21G8M-problems.json";
import * as PA19G8MProblems from "src/assets/problems/PA19G8M/PA19G8M-problems.json";
import * as PA18G8MProblems from "src/assets/problems/PA18G8M/PA18G8M-problems.json";
import * as PA16G8MProblems from "src/assets/problems/PA16G8M/PA16G8M-problems.json";
import * as PA15G8MProblems from "src/assets/problems/PA15G8M/PA15G8M-problems.json";
import * as PA22G8SProblems from "src/assets/problems/PA22G8S/PA22G8S-problems.json";
import * as PA21G8SProblems from "src/assets/problems/PA21G8S/PA21G8S-problems.json";
import * as PA19G8SProblems from "src/assets/problems/PA19G8S/PA19G8S-problems.json";
import * as PA18G8SProblems from "src/assets/problems/PA18G8S/PA18G8S-problems.json";
import * as PA16G8SProblems from "src/assets/problems/PA16G8S/PA16G8S-problems.json";
import * as PA15G8SProblems from "src/assets/problems/PA15G8S/PA15G8S-problems.json";
import * as TX22G3MProblems from "src/assets/problems/TX22G3M/TX22G3M-problems.json";
import * as TX21G3MProblems from "src/assets/problems/TX21G3M/TX21G3M-problems.json";
import * as TX19G3MProblems from "src/assets/problems/TX19G3M/TX19G3M-problems.json";
import * as TX18G3MProblems from "src/assets/problems/TX18G3M/TX18G3M-problems.json";
import * as TX17G3MProblems from "src/assets/problems/TX17G3M/TX17G3M-problems.json";
import * as TX22G4MProblems from "src/assets/problems/TX22G4M/TX22G4M-problems.json";
import * as TX21G4MProblems from "src/assets/problems/TX21G4M/TX21G4M-problems.json";
import * as TX19G4MProblems from "src/assets/problems/TX19G4M/TX19G4M-problems.json";
import * as TX18G4MProblems from "src/assets/problems/TX18G4M/TX18G4M-problems.json";
import * as TX17G4MProblems from "src/assets/problems/TX17G4M/TX17G4M-problems.json";
import * as TX22G5MProblems from "src/assets/problems/TX22G5M/TX22G5M-problems.json";
import * as TX21G5MProblems from "src/assets/problems/TX21G5M/TX21G5M-problems.json";
import * as TX19G5MProblems from "src/assets/problems/TX19G5M/TX19G5M-problems.json";
import * as TX18G5MProblems from "src/assets/problems/TX18G5M/TX18G5M-problems.json";
import * as TX17G5MProblems from "src/assets/problems/TX17G5M/TX17G5M-problems.json";
import * as TX22G5SProblems from "src/assets/problems/TX22G5S/TX22G5S-problems.json";
import * as TX21G5SProblems from "src/assets/problems/TX21G5S/TX21G5S-problems.json";
import * as TX19G5SProblems from "src/assets/problems/TX19G5S/TX19G5S-problems.json";
import * as TX18G5SProblems from "src/assets/problems/TX18G5S/TX18G5S-problems.json";
import * as TX22G6MProblems from "src/assets/problems/TX22G6M/TX22G6M-problems.json";
import * as TX21G6MProblems from "src/assets/problems/TX21G6M/TX21G6M-problems.json";
import * as TX19G6MProblems from "src/assets/problems/TX19G6M/TX19G6M-problems.json";
import * as TX18G6MProblems from "src/assets/problems/TX18G6M/TX18G6M-problems.json";
import * as TX17G6MProblems from "src/assets/problems/TX17G6M/TX17G6M-problems.json";
import * as TX22G7MProblems from "src/assets/problems/TX22G7M/TX22G7M-problems.json";
import * as TX21G7MProblems from "src/assets/problems/TX21G7M/TX21G7M-problems.json";
import * as TX19G7MProblems from "src/assets/problems/TX19G7M/TX19G7M-problems.json";
import * as TX18G7MProblems from "src/assets/problems/TX18G7M/TX18G7M-problems.json";
import * as TX17G7MProblems from "src/assets/problems/TX17G7M/TX17G7M-problems.json";
import * as TX22G8MProblems from "src/assets/problems/TX22G8M/TX22G8M-problems.json";
import * as TX21G8MProblems from "src/assets/problems/TX21G8M/TX21G8M-problems.json";
import * as TX19G8MProblems from "src/assets/problems/TX19G8M/TX19G8M-problems.json";
import * as TX18G8MProblems from "src/assets/problems/TX18G8M/TX18G8M-problems.json";
import * as TX17G8MProblems from "src/assets/problems/TX17G8M/TX17G8M-problems.json";
import * as TX22G8SProblems from "src/assets/problems/TX22G8S/TX22G8S-problems.json";
import * as TX21G8SProblems from "src/assets/problems/TX21G8S/TX21G8S-problems.json";
import * as TX19G8SProblems from "src/assets/problems/TX19G8S/TX19G8S-problems.json";
import * as TX18G8SProblems from "src/assets/problems/TX19G8S/TX19G8S-problems.json";
import * as TX22G8SSProblems from "src/assets/problems/TX22G8SS/TX22G8SS-problems.json";
import * as TX21G8SSProblems from "src/assets/problems/TX21G8SS/TX21G8SS-problems.json";
import * as TX19G8SSProblems from "src/assets/problems/TX19G8SS/TX19G8SS-problems.json";
import * as TX18G8SSProblems from "src/assets/problems/TX18G8SS/TX18G8SS-problems.json";
import { AuthService } from "../../shared/services/auth.service";
import { HttpClient } from '@angular/common/http';

const confetti = require('canvas-confetti');

const confettiCanvas = document.getElementById('confetticanvas');
const confettiHandler = confetti.create(confettiCanvas, {
  resize: true,
  useWorker: true,
});

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})

@Injectable()
export class ProblemsComponent implements OnInit {
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

  // exam_state = 'Texas';
  // exam_grade = 'Grade 3';
  // exam_subject = 'Mathematics';
  // exam_name = 'STAAR';
  // exam_year = '2021';
  exam_length = 10;

  PA22G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G3MProblems;
  PA21G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G3MProblems;
  PA19G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G3MProblems;
  PA18G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G3MProblems;
  PA16G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G3MProblems;
  PA15G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = PA15G3MProblems;
  PA22G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G4MProblems;
  PA21G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G4MProblems;
  PA19G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G4MProblems;
  PA18G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G4MProblems;
  PA16G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G4MProblems;
  PA15G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = PA15G4MProblems;
  PA22G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G4SProblems;
  PA21G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G4SProblems;
  PA19G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G4SProblems;
  PA18G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G4SProblems;
  PA16G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G4SProblems;
  PA15G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA15G4SProblems;
  PA22G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G5MProblems;
  PA21G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G5MProblems;
  PA19G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G5MProblems;
  PA18G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G5MProblems;
  PA16G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G5MProblems;
  PA15G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = PA15G5MProblems;
  PA22G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G6MProblems;
  PA21G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G6MProblems;
  PA19G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G6MProblems;
  PA18G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G6MProblems;
  PA16G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G6MProblems;
  PA15G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = PA15G6MProblems;
  PA22G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G7MProblems;
  PA21G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G7MProblems;
  PA19G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G7MProblems;
  PA18G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G7MProblems;
  PA16G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G7MProblems;
  PA15G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = PA15G7MProblems;
  PA22G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G8MProblems;
  PA21G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G8MProblems;
  PA19G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G8MProblems;
  PA18G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G8MProblems;
  PA16G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G8MProblems;
  PA15G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = PA15G8MProblems;
  PA22G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G8SProblems;
  PA21G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G8SProblems;
  PA19G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G8SProblems;
  PA18G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G8SProblems;
  PA16G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G8SProblems;
  PA15G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA15G8SProblems;
  TX22G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX22G3MProblems;
  TX21G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX21G3MProblems;
  TX19G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX19G3MProblems;
  TX18G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX18G3MProblems;
  TX17G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX17G3MProblems;
  TX22G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX22G4MProblems;
  TX21G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX21G4MProblems;
  TX19G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX19G4MProblems;
  TX18G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX18G4MProblems;
  TX17G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX17G4MProblems;
  TX22G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX22G5MProblems;
  TX21G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX21G5MProblems;
  TX19G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX19G5MProblems;
  TX18G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX18G5MProblems;
  TX17G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX17G5MProblems;
  TX22G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX22G5SProblems;
  TX21G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX21G5SProblems;
  TX19G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX19G5SProblems;
  TX18G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX18G5SProblems;
  TX22G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX22G6MProblems;
  TX21G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX21G6MProblems;
  TX19G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX19G6MProblems;
  TX18G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX18G6MProblems;
  TX17G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX17G6MProblems;
  TX22G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX22G7MProblems;
  TX21G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX21G7MProblems;
  TX19G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX19G7MProblems;
  TX18G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX18G7MProblems;
  TX17G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX17G7MProblems;
  TX22G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX22G8MProblems;
  TX21G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX21G8MProblems;
  TX19G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX19G8MProblems;
  TX18G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX18G8MProblems;
  TX17G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX17G8MProblems;
  TX22G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX22G8SProblems;
  TX21G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX21G8SProblems;
  TX19G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX19G8SProblems;
  TX18G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX18G8SProblems;
  TX22G8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX22G8SSProblems;
  TX21G8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX21G8SSProblems;
  TX19G8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX19G8SSProblems;
  TX18G8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = TX18G8SSProblems;
  exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = {};
  dump_count = 1;

  exam_attribute_dump: { [key: string]: { 'State': string, 'Grade': string, 'Subject': string, 'ExamName': string, 'ExamYear': string, 'ExamType': string, 'NumQuestions': number } } = examMetadata;
  online_set = ["PA22G3M", "PA21G3M", "PA19G3M", "PA18G3M", "PA16G3M", "PA15G3M", "PA22G4M", "PA21G4M", "PA19G4M", "PA18G4M", "PA16G4M", "PA15G4M", "PA22G4S", "PA21G4S", "PA19G4S", "PA18G4S", "PA16G4S", "PA15G4S", "PA22G5M", "PA21G5M", "PA19G5M", "PA18G5M", "PA16G5M", "PA15G5M", "PA22G6M", "PA21G6M", "PA19G6M", "PA18G6M", "PA16G6M", "PA15G6M", "PA22G7M", "PA21G7M", "PA19G7M", "PA18G7M", "PA16G7M", "PA15G7M", "PA22G8M", "PA21G8M", "PA19G8M", "PA18G8M", "PA16G8M", "PA15G8M", "PA22G8S", "PA21G8S", "PA19G8S", "PA18G8S", "PA16G8S", "PA15G8S", "TX22G3M", "TX21G3M", "TX19G3M", "TX18G3M", "TX17G3M", "TX22G4M", "TX21G4M", "TX19G4M", "TX18G4M", "TX17G4M", "TX22G5M", "TX21G5M", "TX19G5M", "TX18G5M", "TX17G5M", "TX22G5S", "TX21G5S", "TX19G5S", "TX18G5S", "TX22G6M", "TX21G6M", "TX19G6M", "TX18G6M", "TX17G6M", "TX22G7M", "TX21G7M", "TX19G7M", "TX18G7M", "TX17G7M", "TX22G8M", "TX21G8M", "TX19G8M", "TX18G8M", "TX17G8M", "TX22G8S", "TX21G8S", "TX19G8S", "TX18G8S", "TX22G8SS", "TX21G8SS", "TX19G8SS", "TX18G8SS"];
  filtered_set: string[] = this.online_set;
  filtered_exam_num = 0;
  filtered_prob_num = 0;
  generate_message = "";

  problems_sequence: number[] = Array.from({ length: this.exam_length }, (_, i) => i + 1);
  ordered_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = {};
  random_index = 0
  random_list: number[] = Array.from({ length: this.exam_length }, (_, i) => i + 1);

  exam_key: string[] = [];

  problem_number = 0;
  problem_selection = '';
  problem_attempts = 0;
  attempt_path: string[] = [];
  attempt_response = '';
  attempt_explanation = '';
  exam_submission: { [key: number]: { 'Number': number, 'Topics': string[], 'SubTopics': string[], 'Choice': string, 'Correct': string, 'Rationale': string, 'Attempts': number, 'Path': string[], 'Seconds': number, 'Time': string } } = {};

  exam_submission_list: any[] = [];
  wrong_submission_list: any[] = [];
  number_correct = 0;
  correct_percent = 0;
  topic_breakdown: { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Seconds': number, 'Time': string, 'Subs': { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Seconds': number, 'Time': string } } } } = {};

  constructor(public authService: AuthService) { }

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
    if (['Mathematics', 'English Reading', 'English Writing', 'Science', 'Social Studies'].includes(val)) {
      if (!this.subject_filters.includes(val)) {
        this.subject_filters.push(val)
      }
      else {
        if (this.subject_filters.indexOf(val) !== -1) {
          this.subject_filters.splice(this.subject_filters.indexOf(val), 1);
        }
        else {
          this.subject_filters.pop()
        }
      }
    }
    else if (['Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8'].includes(val)) {
      if (!this.grade_filters.includes(val)) {
        this.grade_filters.push(val)
      }
      else {
        if (this.grade_filters.indexOf(val) !== -1) {
          this.grade_filters.splice(this.grade_filters.indexOf(val), 1);
        }
        else {
          this.grade_filters.pop()
        }
      }
    }
    else {
      if (!this.state_filters.includes(val)) {
        this.state_filters.push(val)
      }
      else {
        if (this.state_filters.indexOf(val) !== -1) {
          this.state_filters.splice(this.state_filters.indexOf(val), 1);
        }
        else {
          this.state_filters.pop()
        }
      }
    }
    this.filter_exams();
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

  filter_exams() {
    this.filtered_set = [];
    for (let i = 0; i < this.online_set.length; i++) {
      if ((this.state_filters.includes(this.exam_attribute_dump[this.online_set[i]].State) || this.state_filters.length == 0) && (this.grade_filters.includes(this.exam_attribute_dump[this.online_set[i]].Grade) || this.grade_filters.length == 0) && (this.subject_filters.includes(this.exam_attribute_dump[this.online_set[i]].Subject) || this.subject_filters.length == 0)) {
        this.filtered_set.push(this.online_set[i]);
      }
    }
    this.filtered_exam_num = this.filtered_set.length;
    this.filtered_prob_num = 0;
    for (let i = 0; i < this.filtered_set.length; i++) {
      this.filtered_prob_num += this.exam_attribute_dump[this.filtered_set[i]].NumQuestions;
    }
    if (this.filtered_set.length == 0) {
      this.generate_message = "There are no problems based on your selection.";
    }
  }

  generate_problems() {
    this.filter_exams();
    if (this.filtered_set.includes('PA22G3M')) {
      for (const [num, value] of Object.entries(this.PA22G3M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA21G3M')) {
      for (const [num, value] of Object.entries(this.PA21G3M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA19G3M')) {
      for (const [num, value] of Object.entries(this.PA19G3M_exam_dump)) {
        if (value.Number <= 17) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA18G3M')) {
      for (const [num, value] of Object.entries(this.PA18G3M_exam_dump)) {
        if (value.Number <= 15) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA16G3M')) {
      for (const [num, value] of Object.entries(this.PA16G3M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA15G3M')) {
      for (const [num, value] of Object.entries(this.PA15G3M_exam_dump)) {
        if (value.Number <= 45) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA22G4M')) {
      for (const [num, value] of Object.entries(this.PA22G4M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA21G4M')) {
      for (const [num, value] of Object.entries(this.PA21G4M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA19G4M')) {
      for (const [num, value] of Object.entries(this.PA19G4M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA18G4M')) {
      for (const [num, value] of Object.entries(this.PA18G4M_exam_dump)) {
        if (value.Number <= 15) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA16G4M')) {
      for (const [num, value] of Object.entries(this.PA16G4M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA15G4M')) {
      for (const [num, value] of Object.entries(this.PA15G4M_exam_dump)) {
        if (value.Number <= 45) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA22G4S')) {
      for (const [num, value] of Object.entries(this.PA22G4S_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA21G4S')) {
      for (const [num, value] of Object.entries(this.PA21G4S_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA19G4S')) {
      for (const [num, value] of Object.entries(this.PA19G4S_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA18G4S')) {
      for (const [num, value] of Object.entries(this.PA18G4S_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA16G4S')) {
      for (const [num, value] of Object.entries(this.PA16G4S_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA15G4S')) {
      for (const [num, value] of Object.entries(this.PA15G4S_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA22G5M')) {
      for (const [num, value] of Object.entries(this.PA22G5M_exam_dump)) {
        if (value.Number <= 15) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA21G5M')) {
      for (const [num, value] of Object.entries(this.PA21G5M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA19G5M')) {
      for (const [num, value] of Object.entries(this.PA19G5M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA18G5M')) {
      for (const [num, value] of Object.entries(this.PA18G5M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA16G5M')) {
      for (const [num, value] of Object.entries(this.PA16G5M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA15G5M')) {
      for (const [num, value] of Object.entries(this.PA15G5M_exam_dump)) {
        if (value.Number <= 45) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA22G6M')) {
      for (const [num, value] of Object.entries(this.PA22G6M_exam_dump)) {
        if (value.Number <= 15) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA21G6M')) {
      for (const [num, value] of Object.entries(this.PA21G6M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA19G6M')) {
      for (const [num, value] of Object.entries(this.PA19G6M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA18G6M')) {
      for (const [num, value] of Object.entries(this.PA18G6M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA16G6M')) {
      for (const [num, value] of Object.entries(this.PA16G6M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA15G6M')) {
      for (const [num, value] of Object.entries(this.PA15G6M_exam_dump)) {
        if (value.Number <= 45) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA22G7M')) {
      for (const [num, value] of Object.entries(this.PA22G7M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA21G7M')) {
      for (const [num, value] of Object.entries(this.PA21G7M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA19G7M')) {
      for (const [num, value] of Object.entries(this.PA19G7M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA18G7M')) {
      for (const [num, value] of Object.entries(this.PA18G7M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA16G7M')) {
      for (const [num, value] of Object.entries(this.PA16G7M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA15G7M')) {
      for (const [num, value] of Object.entries(this.PA15G7M_exam_dump)) {
        if (value.Number <= 45) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA22G8M')) {
      for (const [num, value] of Object.entries(this.PA22G8M_exam_dump)) {
        if (value.Number <= 15) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA21G8M')) {
      for (const [num, value] of Object.entries(this.PA21G8M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA19G8M')) {
      for (const [num, value] of Object.entries(this.PA19G8M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA18G8M')) {
      for (const [num, value] of Object.entries(this.PA18G8M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA16G8M')) {
      for (const [num, value] of Object.entries(this.PA16G8M_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA15G8M')) {
      for (const [num, value] of Object.entries(this.PA15G8M_exam_dump)) {
        if (value.Number <= 45) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA22G8S')) {
      for (const [num, value] of Object.entries(this.PA22G8S_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA21G8S')) {
      for (const [num, value] of Object.entries(this.PA21G8S_exam_dump)) {
        if (value.Number <= 12) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA19G8S')) {
      for (const [num, value] of Object.entries(this.PA19G8S_exam_dump)) {
        if (value.Number <= 12) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA18G8S')) {
      for (const [num, value] of Object.entries(this.PA18G8S_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA16G8S')) {
      for (const [num, value] of Object.entries(this.PA16G8S_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('PA15G8S')) {
      for (const [num, value] of Object.entries(this.PA15G8S_exam_dump)) {
        if (value.Number <= 16) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX22G3M')) {
      for (const [num, value] of Object.entries(this.TX22G3M_exam_dump)) {
        if (value.Number <= 32) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX21G3M')) {
      for (const [num, value] of Object.entries(this.TX21G3M_exam_dump)) {
        if (value.Number <= 32) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX19G3M')) {
      for (const [num, value] of Object.entries(this.TX19G3M_exam_dump)) {
        if (value.Number <= 32) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX18G3M')) {
      for (const [num, value] of Object.entries(this.TX18G3M_exam_dump)) {
        if (value.Number <= 32) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX17G3M')) {
      for (const [num, value] of Object.entries(this.TX17G3M_exam_dump)) {
        if (value.Number <= 32) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX22G4M')) {
      for (const [num, value] of Object.entries(this.TX22G4M_exam_dump)) {
        if (value.Number <= 34) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX21G4M')) {
      for (const [num, value] of Object.entries(this.TX21G4M_exam_dump)) {
        if (value.Number <= 34) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX19G4M')) {
      for (const [num, value] of Object.entries(this.TX19G4M_exam_dump)) {
        if (value.Number <= 34) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX18G4M')) {
      for (const [num, value] of Object.entries(this.TX18G4M_exam_dump)) {
        if (value.Number <= 34) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX17G4M')) {
      for (const [num, value] of Object.entries(this.TX17G4M_exam_dump)) {
        if (value.Number <= 34) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX22G5M')) {
      for (const [num, value] of Object.entries(this.TX22G5M_exam_dump)) {
        if (value.Number <= 36) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX21G5M')) {
      for (const [num, value] of Object.entries(this.TX21G5M_exam_dump)) {
        if (value.Number <= 36) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX19G5M')) {
      for (const [num, value] of Object.entries(this.TX19G5M_exam_dump)) {
        if (value.Number <= 36) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX18G5M')) {
      for (const [num, value] of Object.entries(this.TX18G5M_exam_dump)) {
        if (value.Number <= 36) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX17G5M')) {
      for (const [num, value] of Object.entries(this.TX17G5M_exam_dump)) {
        if (value.Number <= 36) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX22G5S')) {
      for (const [num, value] of Object.entries(this.TX22G5S_exam_dump)) {
        if (value.Number <= 36) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX21G5S')) {
      for (const [num, value] of Object.entries(this.TX21G5S_exam_dump)) {
        if (value.Number <= 36) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX19G5S')) {
      for (const [num, value] of Object.entries(this.TX19G5S_exam_dump)) {
        if (value.Number <= 36) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX18G5S')) {
      for (const [num, value] of Object.entries(this.TX18G5S_exam_dump)) {
        if (value.Number <= 36) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX22G6M')) {
      for (const [num, value] of Object.entries(this.TX22G6M_exam_dump)) {
        if (value.Number <= 38) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX21G6M')) {
      for (const [num, value] of Object.entries(this.TX21G6M_exam_dump)) {
        if (value.Number <= 38) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX19G6M')) {
      for (const [num, value] of Object.entries(this.TX19G6M_exam_dump)) {
        if (value.Number <= 38) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX18G6M')) {
      for (const [num, value] of Object.entries(this.TX18G6M_exam_dump)) {
        if (value.Number <= 38) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX17G6M')) {
      for (const [num, value] of Object.entries(this.TX17G6M_exam_dump)) {
        if (value.Number <= 38) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX22G7M')) {
      for (const [num, value] of Object.entries(this.TX22G7M_exam_dump)) {
        if (value.Number <= 40) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX21G7M')) {
      for (const [num, value] of Object.entries(this.TX21G7M_exam_dump)) {
        if (value.Number <= 40) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX19G7M')) {
      for (const [num, value] of Object.entries(this.TX19G7M_exam_dump)) {
        if (value.Number <= 40) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX18G7M')) {
      for (const [num, value] of Object.entries(this.TX18G7M_exam_dump)) {
        if (value.Number <= 40) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX17G7M')) {
      for (const [num, value] of Object.entries(this.TX17G7M_exam_dump)) {
        if (value.Number <= 40) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX22G8M')) {
      for (const [num, value] of Object.entries(this.TX22G8M_exam_dump)) {
        if (value.Number <= 42) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX21G8M')) {
      for (const [num, value] of Object.entries(this.TX21G8M_exam_dump)) {
        if (value.Number <= 42) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX19G8M')) {
      for (const [num, value] of Object.entries(this.TX19G8M_exam_dump)) {
        if (value.Number <= 42) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX18G8M')) {
      for (const [num, value] of Object.entries(this.TX18G8M_exam_dump)) {
        if (value.Number <= 42) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX17G8M')) {
      for (const [num, value] of Object.entries(this.TX17G8M_exam_dump)) {
        if (value.Number <= 42) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX22G8S')) {
      for (const [num, value] of Object.entries(this.TX22G8S_exam_dump)) {
        if (value.Number <= 42) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX21G8S')) {
      for (const [num, value] of Object.entries(this.TX21G8S_exam_dump)) {
        if (value.Number <= 42) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX19G8S')) {
      for (const [num, value] of Object.entries(this.TX19G8S_exam_dump)) {
        if (value.Number <= 42) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX18G8S')) {
      for (const [num, value] of Object.entries(this.TX18G8S_exam_dump)) {
        if (value.Number <= 42) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX22G8SS')) {
      for (const [num, value] of Object.entries(this.TX22G8SS_exam_dump)) {
        if (value.Number <= 44) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX21G8SS')) {
      for (const [num, value] of Object.entries(this.TX21G8SS_exam_dump)) {
        if (value.Number <= 44) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX19G8SS')) {
      for (const [num, value] of Object.entries(this.TX19G8SS_exam_dump)) {
        if (value.Number <= 44) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.includes('TX18G8SS')) {
      for (const [num, value] of Object.entries(this.TX18G8SS_exam_dump)) {
        if (value.Number <= 44) {
          // this.exam_dump[this.dump_count] = value;
          this.ordered_dump[this.dump_count] = value;
          this.dump_count += 1;
        }
      }
    }
    if (this.filtered_set.length != 0) {
      this.generate_message = "";
      this.randomize_problems(this.exam_length);
      this.toggle_filters();
    }
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
        if (ch == 'KEY') {
          this.exam_key.push(val2.Choice);
        }
        else {
          if (val2.Key.Correct) {
            this.exam_key.push(ch);
          }
        }
      }
    }
    console.log(this.exam_key);
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
          'Seconds': 0,
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
      this.exam_submission[this.problem_number].Time = (this.pt_minutes).toString() + 'm ' + (this.pt_counter % 60).toString() + 's';
      this.exam_submission[this.problem_number].Seconds = this.pt_counter;
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
            sub.Seconds = this.pt_counter;
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
    this.confetti_pop();
    if (this.mode == 'explain') {
      this.resetExam();
    }
    for (let i: number = 0; i < this.exam_length; i++) {
      for (let num: number = 0; num < this.exam_submission_list[i].Topics.length; num++) {
        if (Object.keys(this.topic_breakdown).includes(this.exam_submission_list[i].Topics[num])) {
          this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Total += 1;
          this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Seconds += this.exam_submission_list[i].Seconds;
          if (this.exam_submission_list[i].Correct == '✅') {
            this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Correct += 1;
            if (Object.keys(this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs).includes(this.exam_submission_list[i].SubTopics[num])) {
              this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]].Total += 1;
              this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]].Correct += 1;
              this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]].Seconds += this.exam_submission_list[i].Seconds;
            }
            else {
              this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s' };
            }
          }
          else {
            this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Incorrect += 1;
            if (Object.keys(this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs).includes(this.exam_submission_list[i].SubTopics[num])) {
              this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]].Total += 1;
              this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]].Incorrect += 1;
              this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]].Seconds += this.exam_submission_list[i].Seconds;
            }
            else {
              this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Subs[this.exam_submission_list[i].SubTopics[num]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s' };
            }
          }
        }
        else {
          if (this.exam_submission_list[i].Correct == '✅') {
            this.topic_breakdown[this.exam_submission_list[i].Topics[num]] = { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s', 'Subs': { [this.exam_submission_list[i].SubTopics[num]]: { 'Correct': 1, 'Incorrect': 0, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s' } } };
          }
          else {
            this.topic_breakdown[this.exam_submission_list[i].Topics[num]] = { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s', 'Subs': { [this.exam_submission_list[i].SubTopics[num]]: { 'Correct': 0, 'Incorrect': 1, 'Total': 1, 'Percent': 0, 'Seconds': this.exam_submission_list[i].Seconds, 'Time': '0s' } } };
          }
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
    this.authService.UpdateUserData({'problems': this.exam_submission});
    // if (this.mode == 'explain') {
    //   this.resetExam();
    // }
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

  resetExam() {
    this.expand_filters = true;
    this.exam_dump = {};
    this.exam_key = [];
    this.attempt_path = [];
    this.exam_submission = {};
    this.exam_submission_list = [];
    this.wrong_submission_list = [];
    this.topic_breakdown = {};
    this.problem_number = 0;
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
    this.filter_exams();
  }
}
