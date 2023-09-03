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

const confetti = require('canvas-confetti');

const confettiCanvas = document.getElementById('confetticanvas');
const confettiHandler = confetti.create(confettiCanvas, {
    resize: true,
    useWorker: true,
});

@Component({
    selector: 'app-TX22G8SS-key',
    templateUrl: '../template-key/template-key.component.html',
    styleUrls: ['./TX22G8SS-key.component.css']
})

@Injectable()
export class TX22G8SSKeyComponent implements OnInit {
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

    key = 'TX22G8SS'
    exam_attribute_dump: { [key: string]: { 'State': string, 'Grade': string, 'Subject': string, 'ExamName': string, 'ExamYear': string, 'ExamType': string, 'NumQuestions': number, 'Topics': { [key: string]: number } } } = examMetadata;

    exam_state = this.exam_attribute_dump[this.key].State;
    exam_grade = this.exam_attribute_dump[this.key].Grade;
    exam_subject = this.exam_attribute_dump[this.key].Subject;
    exam_name = this.exam_attribute_dump[this.key].ExamName;
    exam_year = this.exam_attribute_dump[this.key].ExamYear;
    exam_type = this.exam_attribute_dump[this.key].ExamType;
    exam_length = this.exam_attribute_dump[this.key].NumQuestions;

    exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G8SSProblems;
    PA22G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G3MProblems;
    PA21G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G3MProblems;
    PA19G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G3MProblems;
    PA18G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G3MProblems;
    PA16G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G3MProblems;
    PA15G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA15G3MProblems;
    PA22G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G4MProblems;
    PA21G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G4MProblems;
    PA19G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G4MProblems;
    PA18G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G4MProblems;
    PA16G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G4MProblems;
    PA15G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA15G4MProblems;
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
    PA15G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA15G5MProblems;
    PA22G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G6MProblems;
    PA21G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G6MProblems;
    PA19G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G6MProblems;
    PA18G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G6MProblems;
    PA16G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G6MProblems;
    PA15G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA15G6MProblems;
    PA22G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G7MProblems;
    PA21G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G7MProblems;
    PA19G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G7MProblems;
    PA18G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G7MProblems;
    PA16G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G7MProblems;
    PA15G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA15G7MProblems;
    PA22G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G8MProblems;
    PA21G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G8MProblems;
    PA19G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G8MProblems;
    PA18G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G8MProblems;
    PA16G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G8MProblems;
    PA15G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA15G8MProblems;
    PA22G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G8SProblems;
    PA21G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G8SProblems;
    PA19G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G8SProblems;
    PA18G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G8SProblems;
    PA16G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G8SProblems;
    PA15G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA15G8SProblems;
    TX22G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G3MProblems;
    TX21G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G3MProblems;
    TX19G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX19G3MProblems;
    TX18G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX18G3MProblems;
    TX17G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX17G3MProblems;
    TX22G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G4MProblems;
    TX21G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G4MProblems;
    TX19G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX19G4MProblems;
    TX18G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX18G4MProblems;
    TX17G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX17G4MProblems;
    TX22G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G5MProblems;
    TX21G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G5MProblems;
    TX19G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX19G5MProblems;
    TX18G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX18G5MProblems;
    TX17G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX17G5MProblems;
    TX22G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G5SProblems;
    TX21G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G5SProblems;
    TX19G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX19G5SProblems;
    TX18G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX18G5SProblems;
    TX22G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G6MProblems;
    TX21G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G6MProblems;
    TX19G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX19G6MProblems;
    TX18G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX18G6MProblems;
    TX17G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX17G6MProblems;
    TX22G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G7MProblems;
    TX21G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G7MProblems;
    TX19G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX19G7MProblems;
    TX18G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX18G7MProblems;
    TX17G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX17G7MProblems;
    TX22G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G8MProblems;
    TX21G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G8MProblems;
    TX19G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX19G8MProblems;
    TX18G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX18G8MProblems;
    TX17G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX17G8MProblems;
    TX22G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G8SProblems;
    TX21G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G8SProblems;
    TX19G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX19G8SProblems;
    TX18G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX18G8SProblems;
    TX22G8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G8SSProblems;
    TX21G8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G8SSProblems;
    TX19G8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX19G8SSProblems;
    TX18G8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX18G8SSProblems;
    dump_dict: { [key: string]: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } = {
        "PA22G3M": this.PA22G3M_exam_dump,
        "PA21G3M": this.PA21G3M_exam_dump,
        "PA19G3M": this.PA19G3M_exam_dump,
        "PA18G3M": this.PA18G3M_exam_dump,
        "PA16G3M": this.PA16G3M_exam_dump,
        "PA15G3M": this.PA15G3M_exam_dump,
        "PA22G4M": this.PA22G4M_exam_dump,
        "PA21G4M": this.PA21G4M_exam_dump,
        "PA19G4M": this.PA19G4M_exam_dump,
        "PA18G4M": this.PA18G4M_exam_dump,
        "PA16G4M": this.PA16G4M_exam_dump,
        "PA15G4M": this.PA15G4M_exam_dump,
        "PA22G4S": this.PA22G4S_exam_dump,
        "PA21G4S": this.PA21G4S_exam_dump,
        "PA19G4S": this.PA19G4S_exam_dump,
        "PA18G4S": this.PA18G4S_exam_dump,
        "PA16G4S": this.PA16G4S_exam_dump,
        "PA15G4S": this.PA15G4S_exam_dump,
        "PA22G5M": this.PA22G5M_exam_dump,
        "PA21G5M": this.PA21G5M_exam_dump,
        "PA19G5M": this.PA19G5M_exam_dump,
        "PA18G5M": this.PA18G5M_exam_dump,
        "PA16G5M": this.PA16G5M_exam_dump,
        "PA15G5M": this.PA15G5M_exam_dump,
        "PA22G6M": this.PA22G6M_exam_dump,
        "PA21G6M": this.PA21G6M_exam_dump,
        "PA19G6M": this.PA19G6M_exam_dump,
        "PA18G6M": this.PA18G6M_exam_dump,
        "PA16G6M": this.PA16G6M_exam_dump,
        "PA15G6M": this.PA15G6M_exam_dump,
        "PA22G7M": this.PA22G7M_exam_dump,
        "PA21G7M": this.PA21G7M_exam_dump,
        "PA19G7M": this.PA19G7M_exam_dump,
        "PA18G7M": this.PA18G7M_exam_dump,
        "PA16G7M": this.PA16G7M_exam_dump,
        "PA15G7M": this.PA15G7M_exam_dump,
        "PA22G8M": this.PA22G8M_exam_dump,
        "PA21G8M": this.PA21G8M_exam_dump,
        "PA19G8M": this.PA19G8M_exam_dump,
        "PA18G8M": this.PA18G8M_exam_dump,
        "PA16G8M": this.PA16G8M_exam_dump,
        "PA15G8M": this.PA15G8M_exam_dump,
        "PA22G8S": this.PA22G8S_exam_dump,
        "PA21G8S": this.PA21G8S_exam_dump,
        "PA19G8S": this.PA19G8S_exam_dump,
        "PA18G8S": this.PA18G8S_exam_dump,
        "PA16G8S": this.PA16G8S_exam_dump,
        "PA15G8S": this.PA15G8S_exam_dump,
        "TX22G3M": this.TX22G3M_exam_dump,
        "TX21G3M": this.TX21G3M_exam_dump,
        "TX19G3M": this.TX19G3M_exam_dump,
        "TX18G3M": this.TX18G3M_exam_dump,
        "TX17G3M": this.TX17G3M_exam_dump,
        "TX22G4M": this.TX22G4M_exam_dump,
        "TX21G4M": this.TX21G4M_exam_dump,
        "TX19G4M": this.TX19G4M_exam_dump,
        "TX18G4M": this.TX18G4M_exam_dump,
        "TX17G4M": this.TX17G4M_exam_dump,
        "TX22G5M": this.TX22G5M_exam_dump,
        "TX21G5M": this.TX21G5M_exam_dump,
        "TX19G5M": this.TX19G5M_exam_dump,
        "TX18G5M": this.TX18G5M_exam_dump,
        "TX17G5M": this.TX17G5M_exam_dump,
        "TX22G5S": this.TX22G5S_exam_dump,
        "TX21G5S": this.TX21G5S_exam_dump,
        "TX19G5S": this.TX19G5S_exam_dump,
        "TX18G5S": this.TX18G5S_exam_dump,
        "TX22G6M": this.TX22G6M_exam_dump,
        "TX21G6M": this.TX21G6M_exam_dump,
        "TX19G6M": this.TX19G6M_exam_dump,
        "TX18G6M": this.TX18G6M_exam_dump,
        "TX17G6M": this.TX17G6M_exam_dump,
        "TX22G7M": this.TX22G7M_exam_dump,
        "TX21G7M": this.TX21G7M_exam_dump,
        "TX19G7M": this.TX19G7M_exam_dump,
        "TX18G7M": this.TX18G7M_exam_dump,
        "TX17G7M": this.TX17G7M_exam_dump,
        "TX22G8M": this.TX22G8M_exam_dump,
        "TX21G8M": this.TX21G8M_exam_dump,
        "TX19G8M": this.TX19G8M_exam_dump,
        "TX18G8M": this.TX18G8M_exam_dump,
        "TX17G8M": this.TX17G8M_exam_dump,
        "TX22G8S": this.TX22G8S_exam_dump,
        "TX21G8S": this.TX21G8S_exam_dump,
        "TX19G8S": this.TX19G8S_exam_dump,
        "TX18G8S": this.TX18G8S_exam_dump,
        "TX22G8SS": this.TX22G8SS_exam_dump,
        "TX21G8SS": this.TX21G8SS_exam_dump,
        "TX19G8SS": this.TX19G8SS_exam_dump,
        "TX18G8SS": this.TX18G8SS_exam_dump,
    };

    problem_number = 1;
    problem_selection = '';
    problem_attempts = 0;
    attempt_response = '';
    attempt_explanation = '';

    selected_topic = "";
    selected_subtopic = "";
    subtopic_problem_count = 0;
    subtopic_problem_number = 0;
    subtopic_search_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = {};
    subtopic_problem_selection = '';
    subtopic_problem_attempts = 0;
    subtopic_attempt_response = '';
    subtopic_attempt_explanation = '';

    constructor() { }

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
                                this.confetti_light(); if (this.problem_attempts == 1) {
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

    attempt_mc_st_problem(ch: string) {
      if (ch != this.subtopic_problem_selection) {
        this.subtopic_problem_attempts += 1;
        this.subtopic_problem_selection = ch;
        for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
          if (this.subtopic_problem_number == +num) {
            for (const [choice, key] of Object.entries(prob.AnswerChoices)) {
              if (choice == ch) {
                this.subtopic_attempt_explanation = key.Key.Rationale;
                if (key.Key.Correct == true) {
                  this.confetti_light();
                  if (this.subtopic_problem_attempts == 1) {
                    this.subtopic_attempt_response = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts.toString() + ' try.';
                  }
                  else {
                    this.subtopic_attempt_response = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts.toString() + ' tries.';
                  }
                }
                else {
                  this.subtopic_attempt_response = 'That is not the correct answer - have another try.';
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

    attempt_fr_st_problem(ch: string) {
      if (ch != this.subtopic_problem_selection) {
        this.subtopic_problem_attempts += 1;
        this.subtopic_problem_selection = ch;
        for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
          if (this.subtopic_problem_number == +num) {
            for (const [choice, key] of Object.entries(prob.AnswerChoices)) {
              if (ch == key.Choice) {
                this.confetti_light();
                this.subtopic_attempt_explanation = key.Key.Rationale;
                if (this.problem_attempts == 1) {
                  this.subtopic_attempt_response = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts.toString() + ' try.';
                }
                else {
                  this.subtopic_attempt_response = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts.toString() + ' tries.';
                }
              }
              else {
                this.subtopic_attempt_response = 'That is not the correct answer - have another try.';
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

    next_problem_st() {
      this.subtopic_problem_number += 1;
      this.subtopic_problem_selection = '';
      this.subtopic_problem_attempts = 0;
      this.subtopic_attempt_response = '';
      this.subtopic_attempt_explanation = '';
      if (this.subtopic_problem_number > this.subtopic_problem_count) {
        this.selected_subtopic = '';
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

    searchSubTopic(topic: string, subtopic: string) {
        this.subtopic_problem_count = 0;
        this.subtopic_search_dump = {};
        for (const [ex, dump] of Object.entries(this.dump_dict)) {
            for (const [num, prob] of Object.entries(dump)) {
                if (typeof prob.SubTopics != 'undefined') {
                    if (prob.SubTopics.includes(subtopic)) {
                        this.subtopic_problem_count += 1;
                        this.subtopic_search_dump[this.subtopic_problem_count] = prob;
                    }
                }
            }
        }
        this.selected_topic = topic;
        this.selected_subtopic = subtopic;
        this.subtopic_problem_number = 1;
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