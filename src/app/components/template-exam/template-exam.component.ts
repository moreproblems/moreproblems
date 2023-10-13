import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { WindowService } from '../../shared/services/window.service';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { serverTimestamp } from "firebase/database";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from "../../shared/services/auth.service";
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
import * as TX22G3RProblems from "src/assets/problems/TX22G3R/TX22G3R-problems.json";
import * as TX21G3MProblems from "src/assets/problems/TX21G3M/TX21G3M-problems.json";
import * as TX21G3RProblems from "src/assets/problems/TX21G3R/TX21G3R-problems.json";
import * as TX19G3MProblems from "src/assets/problems/TX19G3M/TX19G3M-problems.json";
import * as TX19G3RProblems from "src/assets/problems/TX19G3R/TX19G3R-problems.json";
import * as TX18G3MProblems from "src/assets/problems/TX18G3M/TX18G3M-problems.json";
import * as TX18G3RProblems from "src/assets/problems/TX18G3R/TX18G3R-problems.json";
import * as TX17G3MProblems from "src/assets/problems/TX17G3M/TX17G3M-problems.json";
import * as TX17G3RProblems from "src/assets/problems/TX17G3R/TX17G3R-problems.json";
import * as TX22G4MProblems from "src/assets/problems/TX22G4M/TX22G4M-problems.json";
import * as TX22G4RProblems from "src/assets/problems/TX22G4R/TX22G4R-problems.json";
import * as TX21G4MProblems from "src/assets/problems/TX21G4M/TX21G4M-problems.json";
import * as TX21G4RProblems from "src/assets/problems/TX21G4R/TX21G4R-problems.json";
import * as TX19G4MProblems from "src/assets/problems/TX19G4M/TX19G4M-problems.json";
import * as TX18G4MProblems from "src/assets/problems/TX18G4M/TX18G4M-problems.json";
import * as TX17G4MProblems from "src/assets/problems/TX17G4M/TX17G4M-problems.json";
import * as TX22G5MProblems from "src/assets/problems/TX22G5M/TX22G5M-problems.json";
import * as TX22G5RProblems from "src/assets/problems/TX22G5R/TX22G5R-problems.json";
import * as TX21G5MProblems from "src/assets/problems/TX21G5M/TX21G5M-problems.json";
import * as TX21G5RProblems from "src/assets/problems/TX21G5R/TX21G5R-problems.json";
import * as TX19G5MProblems from "src/assets/problems/TX19G5M/TX19G5M-problems.json";
import * as TX18G5MProblems from "src/assets/problems/TX18G5M/TX18G5M-problems.json";
import * as TX17G5MProblems from "src/assets/problems/TX17G5M/TX17G5M-problems.json";
import * as TX22G5SProblems from "src/assets/problems/TX22G5S/TX22G5S-problems.json";
import * as TX21G5SProblems from "src/assets/problems/TX21G5S/TX21G5S-problems.json";
import * as TX19G5SProblems from "src/assets/problems/TX19G5S/TX19G5S-problems.json";
import * as TX18G5SProblems from "src/assets/problems/TX18G5S/TX18G5S-problems.json";
import * as TX22G6MProblems from "src/assets/problems/TX22G6M/TX22G6M-problems.json";
import * as TX22G6RProblems from "src/assets/problems/TX22G6R/TX22G6R-problems.json";
import * as TX21G6MProblems from "src/assets/problems/TX21G6M/TX21G6M-problems.json";
import * as TX21G6RProblems from "src/assets/problems/TX21G6R/TX21G6R-problems.json";
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
    selector: 'app-template-exam',
    templateUrl: './template-exam.component.html',
    styleUrls: ['./template-exam.component.css']
})

@Injectable()
export class TemplateExamComponent implements OnInit {
    title = 'More Problems';

    screenWidth = window.innerWidth;
    mobileWidth = 1200;

    exam_inprogress = false;
    progress_number = 0;
    last_date: any;
    last_time: any;

    my_students: string[] = [];
    my_students_data: any = {};
    selected_student: string = "";
    selected_student_data: any = {};
    favorite_std_set: string[][] = [];

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
    expand_supp = true;

    key = "";
    exam_attribute_dump: { [key: string]: { 'State': string, 'Grade': string, 'Subject': string, 'ExamName': string, 'ExamYear': string, 'ExamType': string, 'NumQuestions': number, 'Directions': string, 'Topics': { [key: string]: number }, 'Levels': { [key: string]: number } } } = examMetadata;
    exam_state = "";
    exam_grade = "";
    exam_subject = "";
    exam_name = "";
    exam_year = "";
    exam_type = "";
    exam_length = 0;

    online_set = ['PA22G3M', 'PA21G3M', 'PA19G3M', 'PA18G3M', 'PA16G3M', 'PA15G3M', 'PA22G4M', 'PA21G4M', 'PA19G4M', 'PA18G4M', 'PA16G4M', 'PA15G4M', 'PA22G4S', 'PA21G4S', 'PA19G4S', 'PA18G4S', 'PA16G4S', 'PA15G4S', 'PA22G5M', 'PA21G5M', 'PA19G5M', 'PA18G5M', 'PA16G5M', 'PA15G5M', 'PA22G6M', 'PA21G6M', 'PA19G6M', 'PA18G6M', 'PA16G6M', 'PA15G6M', 'PA22G7M', 'PA21G7M', 'PA19G7M', 'PA18G7M', 'PA16G7M', 'PA15G7M', 'PA22G8M', 'PA21G8M', 'PA19G8M', 'PA18G8M', 'PA16G8M', 'PA15G8M', 'PA22G8S', 'PA21G8S', 'PA19G8S', 'PA18G8S', 'PA16G8S', 'PA15G8S', 'TX22G3M', 'TX22G3R', 'TX21G3M', 'TX21G3R', 'TX19G3M', 'TX19G3R', 'TX18G3M', 'TX18G3R', 'TX17G3M', 'TX17G3R', 'TX22G4M', 'TX22G4R', 'TX21G4M', 'TX21G4R', 'TX19G4M', 'TX18G4M', 'TX17G4M', 'TX22G5M', 'TX22G5R', 'TX21G5M', 'TX21G5R', 'TX19G5M', 'TX18G5M', 'TX17G5M', 'TX22G5S', 'TX21G5S', 'TX19G5S', 'TX18G5S', 'TX22G6M', 'TX22G6R', 'TX21G6M', 'TX21G6R', 'TX19G6M', 'TX18G6M', 'TX17G6M', 'TX22G7M', 'TX21G7M', 'TX19G7M', 'TX18G7M', 'TX17G7M', 'TX22G8M', 'TX21G8M', 'TX19G8M', 'TX18G8M', 'TX17G8M', 'TX22G8S', 'TX21G8S', 'TX19G8S', 'TX18G8S', 'TX22G8SS', 'TX21G8SS', 'TX19G8SS', 'TX18G8SS'];

    exam_directions = "";

    topics_count: { [key: string]: number } = {}
    PA22G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G3MProblems;
    PA21G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G3MProblems;
    PA19G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G3MProblems;
    PA18G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G3MProblems;
    PA16G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G3MProblems;
    PA15G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA15G3MProblems;
    PA22G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G4MProblems;
    PA21G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G4MProblems;
    PA19G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G4MProblems;
    PA18G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G4MProblems;
    PA16G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G4MProblems;
    PA15G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA15G4MProblems;
    PA22G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G4SProblems;
    PA21G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G4SProblems;
    PA19G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G4SProblems;
    PA18G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G4SProblems;
    PA16G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G4SProblems;
    PA15G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA15G4SProblems;
    PA22G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G5MProblems;
    PA21G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G5MProblems;
    PA19G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G5MProblems;
    PA18G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G5MProblems;
    PA16G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G5MProblems;
    PA15G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA15G5MProblems;
    PA22G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G6MProblems;
    PA21G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G6MProblems;
    PA19G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G6MProblems;
    PA18G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G6MProblems;
    PA16G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G6MProblems;
    PA15G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA15G6MProblems;
    PA22G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G7MProblems;
    PA21G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G7MProblems;
    PA19G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G7MProblems;
    PA18G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G7MProblems;
    PA16G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G7MProblems;
    PA15G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA15G7MProblems;
    PA22G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G8MProblems;
    PA21G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G8MProblems;
    PA19G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G8MProblems;
    PA18G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G8MProblems;
    PA16G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G8MProblems;
    PA15G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA15G8MProblems;
    PA22G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA22G8SProblems;
    PA21G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA21G8SProblems;
    PA19G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA19G8SProblems;
    PA18G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA18G8SProblems;
    PA16G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA16G8SProblems;
    PA15G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = PA15G8SProblems;
    TX22G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G3MProblems;
    TX22G3R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G3RProblems;
    TX21G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G3MProblems;
    TX21G3R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G3RProblems;
    TX19G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX19G3MProblems;
    TX19G3R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX19G3RProblems;
    TX18G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX18G3MProblems;
    TX18G3R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX18G3RProblems;
    TX17G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX17G3MProblems;
    TX17G3R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX17G3RProblems;
    TX22G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G4MProblems;
    TX22G4R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G4RProblems;
    TX21G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G4MProblems;
    TX21G4R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G4RProblems;
    TX19G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX19G4MProblems;
    TX18G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX18G4MProblems;
    TX17G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX17G4MProblems;
    TX22G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G5MProblems;
    TX22G5R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G5RProblems;
    TX21G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G5MProblems;
    TX21G5R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G5RProblems;
    TX19G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX19G5MProblems;
    TX18G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX18G5MProblems;
    TX17G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX17G5MProblems;
    TX22G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G5SProblems;
    TX21G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G5SProblems;
    TX19G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX19G5SProblems;
    TX18G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX18G5SProblems;
    TX22G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G6MProblems;
    TX22G6R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G6RProblems;
    TX21G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G6MProblems;
    TX21G6R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G6RProblems;
    TX19G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX19G6MProblems;
    TX18G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX18G6MProblems;
    TX17G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX17G6MProblems;
    TX22G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G7MProblems;
    TX21G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G7MProblems;
    TX19G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX19G7MProblems;
    TX18G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX18G7MProblems;
    TX17G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX17G7MProblems;
    TX22G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G8MProblems;
    TX21G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G8MProblems;
    TX19G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX19G8MProblems;
    TX18G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX18G8MProblems;
    TX17G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX17G8MProblems;
    TX22G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G8SProblems;
    TX21G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G8SProblems;
    TX19G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX19G8SProblems;
    TX18G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX18G8SProblems;
    TX22G8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX22G8SSProblems;
    TX21G8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX21G8SSProblems;
    TX19G8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX19G8SSProblems;
    TX18G8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = TX18G8SSProblems;
    dump_dict: { [key: string]: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } = {
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
        "TX22G3R": this.TX22G3R_exam_dump,
        "TX21G3M": this.TX21G3M_exam_dump,
        "TX21G3R": this.TX21G3R_exam_dump,
        "TX19G3M": this.TX19G3M_exam_dump,
        "TX19G3R": this.TX19G3R_exam_dump,
        "TX18G3M": this.TX18G3M_exam_dump,
        "TX18G3R": this.TX18G3R_exam_dump,
        "TX17G3M": this.TX17G3M_exam_dump,
        "TX17G3R": this.TX17G3R_exam_dump,
        "TX22G4M": this.TX22G4M_exam_dump,
        "TX22G4R": this.TX22G4R_exam_dump,
        "TX21G4M": this.TX21G4M_exam_dump,
        "TX21G4R": this.TX21G4R_exam_dump,
        "TX19G4M": this.TX19G4M_exam_dump,
        "TX18G4M": this.TX18G4M_exam_dump,
        "TX17G4M": this.TX17G4M_exam_dump,
        "TX22G5M": this.TX22G5M_exam_dump,
        "TX22G5R": this.TX22G5R_exam_dump,
        "TX21G5M": this.TX21G5M_exam_dump,
        "TX21G5R": this.TX21G5R_exam_dump,
        "TX19G5M": this.TX19G5M_exam_dump,
        "TX18G5M": this.TX18G5M_exam_dump,
        "TX17G5M": this.TX17G5M_exam_dump,
        "TX22G5S": this.TX22G5S_exam_dump,
        "TX21G5S": this.TX21G5S_exam_dump,
        "TX19G5S": this.TX19G5S_exam_dump,
        "TX18G5S": this.TX18G5S_exam_dump,
        "TX22G6M": this.TX22G6M_exam_dump,
        "TX22G6R": this.TX22G6R_exam_dump,
        "TX21G6M": this.TX21G6M_exam_dump,
        "TX21G6R": this.TX21G6R_exam_dump,
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
    dump_count = 1;

    problems_sequence: number[] = [];
    ordered_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = {};
    exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = {};
    supp_dump: any = {};
    supp_st_dump: any = {};
    supp_dump_list: string[] = [];
    supp_dump_labels: string[] = [];
    supp_content_list: string[][] = [];
    supp_content_labels: string[][] = [];
    supp_st_content_list: string[][] = [];
    supp_st_content_labels: string[][] = [];
    random_index = 0
    random_list: number[] = [];
    random = false;

    exam_key: { [key: number]: string } = {};

    problem_number = 0;
    problem_selection = '';
    problem_attempts = 0;
    attempt_path: string[] = [];
    attempt_response = '';
    exam_submission: { [key: number]: { 'Number': number, 'Topics': string[], 'SubTopics': string[], 'Choice': string, 'Correct': string, 'Rationale': string, 'Attempts': number, 'Path': string[], 'Seconds': number, 'Time': string } } = {};

    selected_topic = "";
    selected_subtopic = "";
    standard_id = '';
    standard_fav = false;
    includes_standard = false;
    subtopic_problem_count = 0;
    subtopic_problem_number = 0;
    subtopic_search_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } = {};
    subtopic_problem_selection = '';
    subtopic_problem_attempts = 0;
    subtopic_attempt_path: string[] = [];
    subtopic_attempt_response = '';
    subtopic_attempt_explanation = '';

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
    db_submission: any = {};

    constructor(public authService: AuthService, public router: Router, private aRoute: ActivatedRoute, private afAuth: AngularFireAuth, private http: HttpClient) { }

    sub: any;

    width_change2() {
        this.screenWidth = window.innerWidth;
        if (this.screenWidth <= this.mobileWidth) {
            this.expand_topics = false;
        }
    }

    read_supp_json(path: string) {
        this.supp_dump_list = [];
        this.supp_dump_labels = [];
        this.http.get("./assets/" + path).subscribe(res => {
            console.log(res);
            console.log(JSON.stringify(res));
            this.supp_dump[path] = res;
            for (let val of this.supp_dump[path].Content) {
                this.supp_dump_list.push(val[1]);
                this.supp_dump_labels.push(val[0]);
            }
            this.supp_content_list.push(this.supp_dump_list);
            this.supp_content_labels.push(this.supp_dump_labels);
        });
    }

    read_supp_st_json(path: string) {
      this.supp_dump_list = [];
      this.supp_dump_labels = [];
      this.http.get("./assets/" + path).subscribe(res => {
        console.log(res);
        console.log(JSON.stringify(res));
        this.supp_st_dump[path] = res;
        for (let val of this.supp_st_dump[path].Content) {
          this.supp_dump_list.push(val[1]);
          this.supp_dump_labels.push(val[0]);
        }
        this.supp_st_content_list.push(this.supp_dump_list);
        this.supp_st_content_labels.push(this.supp_dump_labels);
      });
    }

    select_student(id: string) {
        this.exam_inprogress = false;
        this.progress_number = 0;
        if (id != this.selected_student) {
            this.selected_student = id;
            const exam_history = this.my_students_data[id].exams.history;
            for (const [key, det] of Object.entries(exam_history)) {
                if ((det as any).status == "Started" && key == this.key) {
                    this.exam_inprogress = true;
                    this.progress_number = (det as any).progress + 1;
                    this.last_date = new Date((det as any).lasttimestamp).toLocaleDateString();
                    this.last_time = new Date((det as any).lasttimestamp).toLocaleTimeString()
                    if ((det as any).progress != 0) {
                        const db_submission = this.authService.getExamSubmission(this.key).problems;
                        for (const [key2, det2] of Object.entries(db_submission)) {
                            if (+key2 != 0) {
                                this.exam_submission[+(det2 as any).Number] = (det2 as any);
                            }
                        }
                    }
                }
            }
        }
        else {
            this.selected_student = '';
        }
    }

    toggle_random() {
        this.random = !this.random;
    }

    randomize_problems() {
        this.problems_sequence = Array.from({ length: this.exam_length }, (_, i) => i + 1);
        this.random_list = []
        console.log(this.problems_sequence);
        for (let i = 1; i <= this.exam_length; i++) {
            this.random_index = Math.floor(Math.random() * this.problems_sequence.length);
            this.random_list.push(this.problems_sequence[this.random_index]);
            this.exam_dump[i] = this.ordered_dump[this.problems_sequence[this.random_index]];
            this.problems_sequence.splice(this.random_index, 1);
        }
        this.exam_key = {};
        console.log(this.random_list);
        console.log(this.exam_dump);
        for (const [num, val] of Object.entries(this.exam_dump)) {
            for (const [ch, val2] of Object.entries(val.AnswerChoices)) {
                if (ch == 'KEY') {
                    this.exam_key[+num] = val2.Choice;
                }
                else {
                    if (val2.Key.Correct) {
                        this.exam_key[+num] = ch;
                    }
                }
            }
        }
    }

    resume_exam() {
        for (let num of Object.keys(this.ordered_dump)) {
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
        if (this.authService.userData) {
            if (this.authService.userData.role == 'Student') {
                const exam_history = this.authService.userData.exams.history;
                for (const [key, det] of Object.entries(exam_history)) {
                    if ((det as any).status == "Started" && key == this.key) {
                        if ((det as any).progress != 0) {
                            this.db_submission = this.authService.getExamSubmission(this.key).problems;
                        }
                        this.exam_inprogress = true;
                        this.progress_number = (det as any).progress + 1;
                        if ((det as any).shuffle) {
                            this.random = true;
                            this.problems_sequence = Array.from({ length: this.exam_length }, (_, i) => i + 1);
                            this.random_list = [];
                        }
                        if ((det as any).progress != 0) {
                            console.log(this.db_submission);
                            for (const [key2, det2] of Object.entries(this.db_submission)) {
                                if (+key2 != 0) {[]
                                    this.exam_submission[(det2 as any).Number] = (det2 as any);
                                }
                            }
                            if ((det as any).shuffle) {
                                for (const [key2, det2] of Object.entries(this.db_submission)) {
                                    this.problems_sequence.splice(this.problems_sequence.indexOf((det2 as any).Number), 1);
                                }
                            }
                        }
                        if ((det as any).shuffle) {
                            const remaining_length = this.problems_sequence.length;
                            for (let i = 1; i <= remaining_length; i++) {
                                this.random_index = Math.floor(Math.random() * this.problems_sequence.length);
                                this.random_list.push(this.problems_sequence[this.random_index]);
                                this.exam_dump[i + (det as any).progress] = this.ordered_dump[this.problems_sequence[this.random_index]];
                                this.problems_sequence.splice(this.random_index, 1);
                            }
                            console.log(this.exam_dump);
                            console.log(this.exam_submission);
                            this.exam_key = {};
                            for (const [num, val] of Object.entries(this.exam_dump)) {
                                for (const [ch, val2] of Object.entries(val.AnswerChoices)) {
                                    if (ch == 'KEY') {
                                        this.exam_key[+num] = val2.Choice;
                                    }
                                    else {
                                        if (val2.Key.Correct) {
                                            this.exam_key[+num] = ch;
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            for (let i = 1; i <= this.exam_length; i++) {
                                this.exam_dump[i] = this.ordered_dump[i];
                            }
                            this.exam_key = {};
                            for (const [num, val] of Object.entries(this.exam_dump)) {
                                for (const [ch, val2] of Object.entries(val.AnswerChoices)) {
                                    if (ch == 'KEY') {
                                        this.exam_key[+num] = val2.Choice;
                                    }
                                    else {
                                        if (val2.Key.Correct) {
                                            this.exam_key[+num] = ch;
                                        }
                                    }
                                }
                            }
                            console.log(this.exam_dump);
                            console.log(this.exam_key);
                        }
                    }
                }
                this.db_updates['exams/history/' + this.key + "/lasttimestamp"] = serverTimestamp();
                this.authService.UpdateUserData(this.db_updates);
                this.db_updates = {};
            }
            else if (this.selected_student != '') {
                const exam_history = this.my_students_data[this.selected_student].exams.history;
                for (const [key, det] of Object.entries(exam_history)) {
                    if ((det as any).status == "Started" && key == this.key) {
                        if ((det as any).progress != 0) {
                            this.db_submission = this.authService.getStudExamSubmission(this.selected_student, this.key).problems;
                        }
                        this.exam_inprogress = true;
                        this.progress_number = (det as any).progress + 1;
                        if ((det as any).shuffle) {
                            this.random = true;
                            this.problems_sequence = Array.from({ length: this.exam_length }, (_, i) => i + 1);
                            this.random_list = [];
                        }
                        if ((det as any).progress != 0) {
                            console.log(this.db_submission);
                            for (const [key2, det2] of Object.entries(this.db_submission)) {
                                if (+key2 != 0) {
                                    this.exam_submission[(det2 as any).Number] = (det2 as any);
                                }
                            }
                            if ((det as any).shuffle) {
                                for (const [key2, det2] of Object.entries(this.db_submission)) {
                                    this.problems_sequence.splice(this.problems_sequence.indexOf((det2 as any).Number), 1);
                                }
                            }
                        }
                        if ((det as any).shuffle) {
                            const remaining_length = this.problems_sequence.length;
                            console.log(remaining_length);
                            for (let i = 1; i <= remaining_length; i++) {
                                this.random_index = Math.floor(Math.random() * this.problems_sequence.length);
                                this.random_list.push(this.problems_sequence[this.random_index]);
                                this.exam_dump[i + (det as any).progress] = this.ordered_dump[this.problems_sequence[this.random_index]];
                                this.problems_sequence.splice(this.random_index, 1);
                            }
                            console.log(this.exam_dump);
                            console.log(this.exam_submission);
                            this.exam_key = {};
                            for (const [num, val] of Object.entries(this.exam_dump)) {
                                for (const [ch, val2] of Object.entries(val.AnswerChoices)) {
                                    if (ch == 'KEY') {
                                        this.exam_key[+num] = val2.Choice;
                                    }
                                    else {
                                        if (val2.Key.Correct) {
                                            this.exam_key[+num] = ch;
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            for (let i = 1; i <= this.exam_length; i++) {
                                this.exam_dump[i] = this.ordered_dump[i];
                            }
                            this.exam_key = {};
                            for (const [num, val] of Object.entries(this.exam_dump)) {
                                for (const [ch, val2] of Object.entries(val.AnswerChoices)) {
                                    if (ch == 'KEY') {
                                        this.exam_key[+num] = val2.Choice;
                                    }
                                    else {
                                        if (val2.Key.Correct) {
                                            this.exam_key[+num] = ch;
                                        }
                                    }
                                }
                            }
                            console.log(this.exam_dump);
                            console.log(this.exam_key);
                        }
                    }
                }
                this.db_updates['users/' + this.selected_student + '/exams/history/' + this.key + "/lasttimestamp"] = serverTimestamp();
                this.authService.UpdateDatabase(this.db_updates);
                this.db_updates = {};
            }
        }
        this.toggleExamTimer();
        this.toggleProblemTimer();
        this.problem_number = this.progress_number;
        this.supp_content_list = [];
        this.supp_content_labels = [];
        for (let supp of this.exam_dump[this.problem_number].SuppContent) {
            setTimeout(() => {
                this.read_supp_json(supp);
            }, 100*(1+this.exam_dump[this.problem_number].SuppContent.indexOf(supp)));
        }
    }

    begin_exam() {
        if (this.random) {
            this.randomize_problems();
        }
        else {
            for (let i = 1; i <= this.exam_length; i++) {
                this.exam_dump[i] = this.ordered_dump[i];
            }
            for (const [num, val] of Object.entries(this.exam_dump)) {
                for (const [ch, val2] of Object.entries(val.AnswerChoices)) {
                    if (ch == 'KEY') {
                        this.exam_key[+num] = val2.Choice;
                    }
                    else {
                        if (val2.Key.Correct) {
                            this.exam_key[+num] = ch;
                        }
                    }
                }
            }
        }
        console.log(this.exam_dump);
        console.log(this.exam_key);
        if (this.authService.userData) {
            if (this.authService.userData.role == 'Student') {
                this.db_updates['exams/history/' + this.key] = { progress: 0, status: 'Started', shuffle: this.random, lasttimestamp: serverTimestamp() };
                this.db_updates['problems/all/' + this.key + '-' + "" + (this.problem_number + 1) + '/status'] = 'Viewed';
                this.authService.UpdateUserData(this.db_updates);
                this.db_updates = {};
                this.db_updates['/submissions/exams/' + this.authService.userData.uid + '/' + this.key + '/starttimestamp'] = serverTimestamp();
            }
            else if (this.selected_student != '') {
                this.db_updates['users/' + this.selected_student + '/exams/history/' + this.key] = { progress: 0, status: 'Started', shuffle: this.random, lasttimestamp: serverTimestamp() };
                this.db_updates['users/' + this.selected_student + '/problems/all/' + this.key + '-' + "" + (this.problem_number + 1) + '/status'] = 'Viewed';
                this.db_updates['/submissions/exams/' + this.selected_student + '/' + this.key + '/starttimestamp'] = serverTimestamp();
            }
            this.authService.UpdateDatabase(this.db_updates);
            this.db_updates = {};
        }
        for (let num of Object.keys(this.ordered_dump)) {
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
        this.toggleProblemTimer();
        this.problem_number = 1;
        this.supp_content_list = [];
        this.supp_content_labels = [];
        for (let supp of this.exam_dump[this.problem_number].SuppContent) {
            setTimeout(() => {
                this.read_supp_json(supp);
            }, 100*(1+this.exam_dump[this.problem_number].SuppContent.indexOf(supp)));
        }

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

    attempt_mc_st_problem(ch: string) {
        if (ch != this.subtopic_problem_selection) {
            this.subtopic_problem_attempts += 1;
            this.subtopic_attempt_path.push(ch);
            this.subtopic_problem_selection = ch;
            for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
                if (this.subtopic_problem_number == +num) {
                    for (const [choice, key] of Object.entries(prob.AnswerChoices)) {
                        if (choice == ch) {
                            this.subtopic_attempt_explanation = key.Key.Rationale;
                            if (key.Key.Correct == true) {
                                this.confetti_light(this.subtopic_problem_attempts);
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

    attempt_fr_st_problem(ch: string) {
        if (ch != this.subtopic_problem_selection) {
            this.subtopic_problem_attempts += 1;
            this.subtopic_attempt_path.push(ch);
            this.subtopic_problem_selection = ch;
            for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
                if (this.subtopic_problem_number == +num) {
                    for (const [choice, key] of Object.entries(prob.AnswerChoices)) {
                        if (ch == key.Choice) {
                            this.confetti_light(this.subtopic_problem_attempts);
                            this.subtopic_attempt_explanation = key.Key.Rationale;
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

    next_problem(choice: string) {
        console.log(this.exam_dump);
        console.log(this.exam_submission);
        for (const [num, prob] of Object.entries(this.exam_dump)) {
            if (this.problem_number == +num) {
                for (const [num2, sub] of Object.entries(this.exam_submission)) {
                    if (prob.Number == +num2) {
                        sub.Time = this.pt_minutes.toString() + 'm ' + (this.pt_counter % 60).toString() + 's';
                        sub.Seconds = this.pt_counter;
                        sub.Number = prob.Number;
                        sub.Topics = prob.Topics;
                        sub.SubTopics = prob.SubTopics;
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
                                    console.log(this.exam_key);
                                    console.log(this.exam_key[this.problem_number]);
                                    sub.Correct = this.exam_key[this.problem_number];
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
                                    sub.Correct = this.exam_key[this.problem_number];
                                    sub.Rationale = 'No rationale provided. The number submitted was not right';
                                }
                            }
                        }
                    }
                }
            }
        }
        if (this.authService.userData) {
            if (this.authService.userData.role == 'Student') {
                this.db_updates['exams/history/' + this.key + '/progress'] = this.authService.userData.exams.history[this.key].progress + 1;
                this.db_updates['exams/history/' + this.key + '/lasttimestamp'] = serverTimestamp();
                this.db_updates['problems/total'] = this.authService.userData.problems.total + 1; //only add if new
                if (this.attempt_response == 'Correct') {
                    this.db_updates['problems/correct'] = this.authService.userData.problems.correct + 1;
                }
                this.db_updates['problems/all/' + this.key + '-' + "" + this.exam_submission[this.exam_dump[this.problem_number].Number].Number + '/status'] = this.attempt_response;
                this.authService.UpdateUserData(this.db_updates);
                this.db_updates = {};
                this.db_updates['/submissions/problems/' + this.authService.userData.uid + '/' + this.key + '-' + "" + this.exam_submission[this.exam_dump[this.problem_number].Number].Number] = this.exam_submission[this.exam_dump[this.problem_number].Number];
                this.db_updates['/submissions/exams/' + this.authService.userData.uid + '/' + this.key + '/problems/' + "" + this.exam_submission[this.exam_dump[this.problem_number].Number].Number] = this.exam_submission[this.exam_dump[this.problem_number].Number];
                if (this.problem_number == this.exam_length) {
                    this.db_updates['/submissions/exams/' + this.authService.userData.uid + '/' + this.key + '/endtimestamp'] = serverTimestamp();
                }
                this.authService.UpdateDatabase(this.db_updates);
                this.db_updates = {};
                this.db_updates['/submissions/problems/' + this.authService.userData.uid + '/' + this.key + '-' + "" + this.exam_submission[this.exam_dump[this.problem_number].Number].Number + '/timestamp'] = serverTimestamp();
                this.authService.UpdateDatabase(this.db_updates);
                this.db_updates = {};
            }
            else if (this.selected_student != '') {
                this.selected_student_data = this.authService.searchUserId(this.selected_student);
                this.db_updates['users/' + this.selected_student + '/exams/history/' + this.key + '/progress'] = this.selected_student_data.exams.history[this.key].progress + 1;
                this.db_updates['users/' + this.selected_student + '/exams/history/' + this.key + '/lasttimestamp'] = serverTimestamp();
                this.db_updates['users/' + this.selected_student + '/problems/total'] = this.selected_student_data.problems.total + 1; //only add if new
                if (this.attempt_response == 'Correct') {
                    this.db_updates['users/' + this.selected_student + '/problems/correct'] = this.selected_student_data.problems.correct + 1;
                }
                this.db_updates['users/' + this.selected_student + '/problems/all/' + this.key + '-' + "" + this.exam_submission[this.exam_dump[this.problem_number].Number].Number + '/status'] = this.attempt_response;
                console.log(this.exam_submission[this.exam_dump[this.problem_number].Number]);
                this.authService.UpdateDatabase(this.db_updates);
                this.db_updates = {};
                this.db_updates['/submissions/problems/' + this.selected_student + '/' + this.key + '-' + "" + this.exam_submission[this.exam_dump[this.problem_number].Number].Number] = this.exam_submission[this.exam_dump[this.problem_number].Number];
                this.db_updates['/submissions/exams/' + this.selected_student + '/' + this.key + '/problems/' + "" + this.exam_submission[this.exam_dump[this.problem_number].Number].Number] = this.exam_submission[this.exam_dump[this.problem_number].Number];
                if (this.problem_number == this.exam_length) {
                    this.db_updates['/submissions/exams/' + this.selected_student + '/' + this.key + '/endtimestamp'] = serverTimestamp();
                }
                this.authService.UpdateDatabase(this.db_updates);
                this.db_updates = {};
                this.db_updates['/submissions/problems/' + this.selected_student + '/' + this.key + '-' + "" + this.exam_submission[this.exam_dump[this.problem_number].Number].Number + '/timestamp'] = serverTimestamp();
                this.authService.UpdateDatabase(this.db_updates);
                this.db_updates = {};
            }
        }
        this.problem_number += 1;
        if (this.problem_number <= this.exam_length) {
            if (this.authService.userData) {
                if (this.authService.userData.role == 'Student') {
                    this.db_updates['problems/all/' + this.key + '-' + "" + this.exam_submission[this.exam_dump[this.problem_number].Number].Number + '/status'] = 'Viewed';
                    this.authService.UpdateUserData(this.db_updates);
                    this.db_updates = {};
                }
                else if (this.selected_student != '') {
                    console.log(this.exam_submission[this.exam_dump[this.problem_number].Number].Number);
                    this.db_updates['users/' + this.selected_student + '/problems/all/' + this.key + '-' + "" + this.exam_submission[this.exam_dump[this.problem_number].Number].Number + '/status'] = 'Viewed';
                    this.authService.UpdateDatabase(this.db_updates);
                    this.db_updates = {};
                }
            }
        }
        else {
            if (this.authService.userData) {
                if (this.authService.userData.role == 'Student') {
                    this.db_updates['/submissions/exams/' + this.authService.userData.uid + '/' + this.key + '/endtimestamp'] = serverTimestamp();
                }
                else if (this.selected_student != '') {
                    this.db_updates['/submissions/exams/' + this.selected_student + '/' + this.key + '/endtimestamp'] = serverTimestamp();
                }
                this.authService.UpdateDatabase(this.db_updates);
                this.db_updates = {};
            }
        }
        this.problem_selection = '';
        this.problem_attempts = 0;
        this.attempt_path = [];
        this.supp_content_list = [];
        this.supp_content_labels = [];
        for (let supp of this.exam_dump[this.problem_number].SuppContent) {
            setTimeout(() => {
                this.read_supp_json(supp);
            }, 100*(1+this.exam_dump[this.problem_number].SuppContent.indexOf(supp)));
        }
        this.clearProblemTimer();
        this.toggleProblemTimer();
        if (this.problem_number > this.exam_length) {
            this.toggleExamTimer();
            this.completeExam();
        }
    }

    next_problem_st() {
        this.subtopic_problem_number += 1;
        this.subtopic_problem_selection = '';
        this.subtopic_problem_attempts = 0;
        this.subtopic_attempt_path = [];
        this.subtopic_attempt_response = '';
        this.subtopic_attempt_explanation = '';
        if (this.subtopic_problem_number > this.subtopic_problem_count) {
            this.selected_subtopic = '';
        }
        else {
            this.supp_st_content_list = [];
            this.supp_st_content_labels = [];
            for (let supp of this.subtopic_search_dump[this.subtopic_problem_number].SuppContent) {
              setTimeout(() => {
                this.read_supp_st_json(supp);
              }, 100 * (1 + this.subtopic_search_dump[this.subtopic_problem_number].SuppContent.indexOf(supp)));
            }
        }
    }

    completeExam() {
        // retreive db sub/exam/problems if auth student, to calculate results & set db sub/exam/...
        for (let i: number = 1; i <= this.exam_length; i++) {
            this.exam_submission_list.push(this.exam_submission[i]);
            if (this.exam_submission[i].Correct != '✅') {
                this.wrong_submission_list.push(this.exam_submission[i]);
            }
            else {
                this.number_correct += 1;
            }
            this.total_seconds += this.exam_submission[i].Seconds;
        }
        this.et_counter = this.total_seconds;
        this.et_minutes = Math.floor(this.total_seconds / 60);
        this.correct_percent = Math.round(this.number_correct / (this.problem_number - 1) * 100);
        this.confetti_pop();
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
            for (let topic of Object.keys(this.topic_breakdown)) {
                this.topic_breakdown[topic].Percent = Math.round(100 * this.topic_breakdown[topic].Correct / (this.topic_breakdown[topic].Total));
                this.topic_breakdown[topic].Time = (Math.floor(this.topic_breakdown[topic].Seconds / this.topic_breakdown[topic].Total / 60)).toString() + 'm ' + (Math.round(this.topic_breakdown[topic].Seconds / this.topic_breakdown[topic].Total % 60)).toString() + 's';
                for (let subtopic of Object.keys(this.topic_breakdown[topic].Subs)) {
                    this.topic_breakdown[topic].Subs[subtopic].Percent = Math.round(100 * this.topic_breakdown[topic].Subs[subtopic].Correct / (this.topic_breakdown[topic].Subs[subtopic].Total));
                    this.topic_breakdown[topic].Subs[subtopic].Time = (Math.floor(this.topic_breakdown[topic].Subs[subtopic].Seconds / this.topic_breakdown[topic].Subs[subtopic].Total / 60)).toString() + 'm ' + (Math.round(this.topic_breakdown[topic].Subs[subtopic].Seconds / this.topic_breakdown[topic].Subs[subtopic].Total % 60)).toString() + 's'
                }
            }
            for (const [level, floor] of Object.entries(this.exam_attribute_dump[this.key].Levels)) {
                if (level == "") {
                    break;
                }
                else if (this.number_correct >= floor) {
                    this.performance_level = level;
                    break;
                }
            }
            if (this.authService.userData) {
                if (this.authService.userData.role == 'Student') {
                    this.db_updates['exams/history/' + this.key + '/status'] = 'Completed';
                    this.authService.UpdateUserData(this.db_updates);
                    this.db_updates = {};
                    this.db_updates['/submissions/exams/' + this.authService.userData.uid + '/' + this.key + '/total'] = this.exam_length;
                    this.db_updates['/submissions/exams/' + this.authService.userData.uid + '/' + this.key + '/correct'] = this.number_correct;
                    this.db_updates['/submissions/exams/' + this.authService.userData.uid + '/' + this.key + '/score'] = this.correct_percent;
                    this.db_updates['/submissions/exams/' + this.authService.userData.uid + '/' + this.key + '/level'] = this.performance_level;
                    this.db_updates['/submissions/exams/' + this.authService.userData.uid + '/' + this.key + '/time'] = "" + "" + (Math.floor(this.total_seconds / 60)) + 'm ' + "" + "" + (this.total_seconds % 60) + 's';
                    this.authService.UpdateDatabase(this.db_updates);
                    this.db_updates = {};
                }
                else if (this.selected_student != '') {
                    this.db_updates['users/' + this.selected_student + '/exams/history/' + this.key + '/status'] = 'Completed';
                    this.authService.UpdateDatabase(this.db_updates);
                    this.db_updates = {};
                    this.db_updates['/submissions/exams/' + this.selected_student + '/' + this.key + '/total'] = this.exam_length;
                    this.db_updates['/submissions/exams/' + this.selected_student + '/' + this.key + '/correct'] = this.number_correct;
                    this.db_updates['/submissions/exams/' + this.selected_student + '/' + this.key + '/score'] = this.correct_percent;
                    this.db_updates['/submissions/exams/' + this.selected_student + '/' + this.key + '/level'] = this.performance_level;
                    this.db_updates['/submissions/exams/' + this.selected_student + '/' + this.key + '/time'] = "" + "" + (Math.floor(this.total_seconds / 60)) + 'm ' + "" + "" + (this.total_seconds % 60) + 's';
                    this.authService.UpdateDatabase(this.db_updates);
                    this.db_updates = {};
                }
            }
        }
    }

    toggle_favorite_std() {
        this.favorite_std_set = [];
        for (let std of this.authService.userData.standards.favorites) {
            this.favorite_std_set.push(std as string[]);
        }
        this.includes_standard = false;
        if (this.favorite_std_set.length != 0) {
            for (const [key, std] of Object.entries(this.favorite_std_set)) {
                if (std[0] == this.selected_topic && std[1] == this.selected_subtopic) {
                    this.includes_standard = true;
                    if (+key != this.favorite_std_set.length - 1) {
                        this.favorite_std_set.splice(+key, 1);
                    }
                    else {
                        this.favorite_std_set.pop();
                    }
                }
            }
        }
        if (!this.includes_standard) {
            this.favorite_std_set.push([this.selected_topic, this.selected_subtopic]);
        }
        this.authService.UpdateUserData({ 'standards/favorites': {} });
        this.authService.UpdateUserData({ 'standards/favorites': this.favorite_std_set });
        this.standard_fav = !this.standard_fav;
    }

    assert_favorite_std() {
        this.favorite_std_set = [];
        for (let std of this.authService.userData.standards.favorites) {
            this.favorite_std_set.push(std as string[]);
        }
        this.includes_standard = false;
        if (this.favorite_std_set.length != 0) {
            for (const [key, std] of Object.entries(this.favorite_std_set)) {
                if (std[0] == this.selected_topic && std[1] == this.selected_subtopic) {
                    this.includes_standard = true;
                }
            }
        }
        if (!this.includes_standard) {
            this.favorite_std_set.push([this.selected_topic, this.selected_subtopic]);
        }
        this.authService.UpdateUserData({ 'standards/favorites': {} });
        this.authService.UpdateUserData({ 'standards/favorites': this.favorite_std_set });
        this.standard_fav = true;
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

    confetti_light(attempts: number) {
        confettiHandler({
            particleCount: Math.round(250 / attempts),
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
        this.subtopic_problem_selection = '';
        this.subtopic_problem_attempts = 0;
        this.subtopic_attempt_path = [];
        this.subtopic_attempt_response = '';
        this.subtopic_attempt_explanation = '';
        this.standard_id = topic + ": " + subtopic;
        this.standard_fav = false;
        this.supp_st_content_list = [];
        this.supp_st_content_labels = [];
        for (let supp of this.subtopic_search_dump[this.subtopic_problem_number].SuppContent) {
          setTimeout(() => {
            this.read_supp_st_json(supp);
          }, 100 * (1 + this.subtopic_search_dump[this.subtopic_problem_number].SuppContent.indexOf(supp)));
        }
        for (let fav of this.authService.userData.standards.favorites) {
          if (topic == fav[0] && subtopic == fav[1]) {
            this.standard_fav = true;
          }
        }
    }

    fav_std_includes(topic: string, subtopic: string) {
      this.favorite_std_set = [];
      for (let std of this.authService.userData.standards.favorites) {
        this.favorite_std_set.push(std as string[]);
      }
      this.includes_standard = false;
      if (this.favorite_std_set.length != 0) {
        for (const [key, std] of Object.entries(this.favorite_std_set)) {
          if (std[0] == topic && std[1] == subtopic) {
            this.includes_standard = true;
          }
        }
      }
      return this.includes_standard;
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
        this.sub = this.aRoute.paramMap.subscribe((params) => {
            console.log(params);
            this.key = (params.get('examKey') as string);
            if (!this.online_set.includes(this.key)) {
                this.router.navigate(['exams']);
            }
        });
        this.exam_state = this.exam_attribute_dump[this.key].State;
        this.exam_grade = this.exam_attribute_dump[this.key].Grade;
        this.exam_subject = this.exam_attribute_dump[this.key].Subject;
        this.exam_name = this.exam_attribute_dump[this.key].ExamName;
        this.exam_year = this.exam_attribute_dump[this.key].ExamYear;
        this.exam_type = this.exam_attribute_dump[this.key].ExamType;
        this.exam_length = this.exam_attribute_dump[this.key].NumQuestions;
        this.exam_directions = this.exam_attribute_dump[this.key].Directions;
        this.ordered_dump = this.dump_dict[this.key];
        for (let num of Object.keys(this.ordered_dump)) {
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
        setTimeout(() => {
            if (this.authService.userData) {
                if (this.authService.userData.role != 'Student') {
                    const linked_students = this.authService.userData.students.slice(1);
                    var count = 0;
                    for (const [key, stud] of Object.entries(linked_students)) {
                        setTimeout(() => {
                            if ((stud as string).includes(this.authService.userData.uid as string)) {
                                count += 1;
                                this.my_students.push(stud as string);
                                // setTimeout(() => {
                                const student_data = this.authService.searchUserId(stud as string);
                                if (student_data != null) {
                                    this.my_students_data[(stud as string)] = (student_data as object);
                                }
                            }
                        }, +key * 10);
                    }
                }
                if (this.authService.userData.role == 'Student') {
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
                                    if (+key2 != 0) {
                                        this.exam_submission[+(det2 as any).Number] = (det2 as any);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }, 50);
        for (const [num, value] of Object.entries(this.ordered_dump)) {
            if (value.Number <= this.exam_length) {
                for (let topic of value.Topics) {
                    if (!Object.keys(this.topics_count).includes(topic)) {
                        this.topics_count[topic] = 1;
                    }
                    else {
                        this.topics_count[topic] += 1;
                    }
                }
                // this.exam_dump[this.dump_count] = value;
                this.ordered_dump[this.dump_count] = value;
                this.dump_count += 1;
            }
        }
        console.log(this.topics_count);
        for (const [num, val] of Object.entries(this.ordered_dump)) {
            for (const [ch, val2] of Object.entries(val.AnswerChoices)) {
                if (ch == 'KEY') {
                    this.exam_key[+num] = val2.Choice;
                }
                else {
                    if (val2.Key.Correct) {
                        this.exam_key[+num] = ch;
                    }
                }
            }
        }
    }
}