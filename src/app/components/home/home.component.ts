import { Component, OnInit, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from "../../shared/services/auth.service";
import { serverTimestamp } from "firebase/database";
import printJS from 'print-js';
import * as examMetadata from "src/assets/problems/exams.json";
import * as PA23G3MProblems from "src/assets/problems/PA23G3M/PA23G3M-problems.json";
import * as PA23G3EProblems from "src/assets/problems/PA23G3E/PA23G3E-problems.json";
import * as PA22G3MProblems from "src/assets/problems/PA22G3M/PA22G3M-problems.json";
import * as PA22G3EProblems from "src/assets/problems/PA22G3E/PA22G3E-problems.json";
import * as PA21G3MProblems from "src/assets/problems/PA21G3M/PA21G3M-problems.json";
import * as PA21G3EProblems from "src/assets/problems/PA21G3E/PA21G3E-problems.json";
import * as PA19G3MProblems from "src/assets/problems/PA19G3M/PA19G3M-problems.json";
import * as PA19G3EProblems from "src/assets/problems/PA19G3E/PA19G3E-problems.json";
import * as PA18G3MProblems from "src/assets/problems/PA18G3M/PA18G3M-problems.json";
import * as PA18G3EProblems from "src/assets/problems/PA18G3E/PA18G3E-problems.json";
import * as PA16G3MProblems from "src/assets/problems/PA16G3M/PA16G3M-problems.json";
import * as PA16G3EProblems from "src/assets/problems/PA16G3E/PA16G3E-problems.json";
import * as PA15G3MProblems from "src/assets/problems/PA15G3M/PA15G3M-problems.json";
import * as PA15G3EProblems from "src/assets/problems/PA15G3E/PA15G3E-problems.json";
import * as PA23G4MProblems from "src/assets/problems/PA23G4M/PA23G4M-problems.json";
import * as PA23G4EProblems from "src/assets/problems/PA23G4E/PA23G4E-problems.json";
import * as PA22G4MProblems from "src/assets/problems/PA22G4M/PA22G4M-problems.json";
import * as PA22G4EProblems from "src/assets/problems/PA22G4E/PA22G4E-problems.json";
import * as PA21G4MProblems from "src/assets/problems/PA21G4M/PA21G4M-problems.json";
import * as PA21G4EProblems from "src/assets/problems/PA21G4E/PA21G4E-problems.json";
import * as PA19G4MProblems from "src/assets/problems/PA19G4M/PA19G4M-problems.json";
import * as PA19G4EProblems from "src/assets/problems/PA19G4E/PA19G4E-problems.json";
import * as PA18G4MProblems from "src/assets/problems/PA18G4M/PA18G4M-problems.json";
import * as PA18G4EProblems from "src/assets/problems/PA18G4E/PA18G4E-problems.json";
import * as PA16G4MProblems from "src/assets/problems/PA16G4M/PA16G4M-problems.json";
import * as PA16G4EProblems from "src/assets/problems/PA16G4E/PA16G4E-problems.json";
import * as PA15G4MProblems from "src/assets/problems/PA15G4M/PA15G4M-problems.json";
import * as PA15G4EProblems from "src/assets/problems/PA15G4E/PA15G4E-problems.json";
import * as PA23G4SProblems from "src/assets/problems/PA23G4S/PA23G4S-problems.json";
import * as PA22G4SProblems from "src/assets/problems/PA22G4S/PA22G4S-problems.json";
import * as PA21G4SProblems from "src/assets/problems/PA21G4S/PA21G4S-problems.json";
import * as PA19G4SProblems from "src/assets/problems/PA19G4S/PA19G4S-problems.json";
import * as PA18G4SProblems from "src/assets/problems/PA18G4S/PA18G4S-problems.json";
import * as PA16G4SProblems from "src/assets/problems/PA16G4S/PA16G4S-problems.json";
import * as PA15G4SProblems from "src/assets/problems/PA15G4S/PA15G4S-problems.json";
import * as PA23G5MProblems from "src/assets/problems/PA23G5M/PA23G5M-problems.json";
import * as PA23G5EProblems from "src/assets/problems/PA23G5E/PA23G5E-problems.json";
import * as PA22G5MProblems from "src/assets/problems/PA22G5M/PA22G5M-problems.json";
import * as PA22G5EProblems from "src/assets/problems/PA22G5E/PA22G5E-problems.json";
import * as PA21G5MProblems from "src/assets/problems/PA21G5M/PA21G5M-problems.json";
import * as PA21G5EProblems from "src/assets/problems/PA21G5E/PA21G5E-problems.json";
import * as PA19G5MProblems from "src/assets/problems/PA19G5M/PA19G5M-problems.json";
import * as PA19G5EProblems from "src/assets/problems/PA19G5E/PA19G5E-problems.json";
import * as PA18G5MProblems from "src/assets/problems/PA18G5M/PA18G5M-problems.json";
import * as PA18G5EProblems from "src/assets/problems/PA18G5E/PA18G5E-problems.json";
import * as PA16G5MProblems from "src/assets/problems/PA16G5M/PA16G5M-problems.json";
import * as PA16G5EProblems from "src/assets/problems/PA16G5E/PA16G5E-problems.json";
import * as PA15G5MProblems from "src/assets/problems/PA15G5M/PA15G5M-problems.json";
import * as PA15G5EProblems from "src/assets/problems/PA15G5E/PA15G5E-problems.json";
import * as PA23G6MProblems from "src/assets/problems/PA23G6M/PA23G6M-problems.json";
import * as PA23G6EProblems from "src/assets/problems/PA23G6E/PA23G6E-problems.json";
import * as PA22G6MProblems from "src/assets/problems/PA22G6M/PA22G6M-problems.json";
import * as PA22G6EProblems from "src/assets/problems/PA22G6E/PA22G6E-problems.json";
import * as PA21G6MProblems from "src/assets/problems/PA21G6M/PA21G6M-problems.json";
import * as PA21G6EProblems from "src/assets/problems/PA21G6E/PA21G6E-problems.json";
import * as PA19G6MProblems from "src/assets/problems/PA19G6M/PA19G6M-problems.json";
import * as PA19G6EProblems from "src/assets/problems/PA19G6E/PA19G6E-problems.json";
import * as PA18G6MProblems from "src/assets/problems/PA18G6M/PA18G6M-problems.json";
import * as PA18G6EProblems from "src/assets/problems/PA18G6E/PA18G6E-problems.json";
import * as PA16G6MProblems from "src/assets/problems/PA16G6M/PA16G6M-problems.json";
import * as PA16G6EProblems from "src/assets/problems/PA16G6E/PA16G6E-problems.json";
import * as PA15G6MProblems from "src/assets/problems/PA15G6M/PA15G6M-problems.json";
import * as PA15G6EProblems from "src/assets/problems/PA15G6E/PA15G6E-problems.json";
import * as PA23G7MProblems from "src/assets/problems/PA23G7M/PA23G7M-problems.json";
import * as PA23G7EProblems from "src/assets/problems/PA23G7E/PA23G7E-problems.json";
import * as PA22G7MProblems from "src/assets/problems/PA22G7M/PA22G7M-problems.json";
import * as PA22G7EProblems from "src/assets/problems/PA22G7E/PA22G7E-problems.json";
import * as PA21G7MProblems from "src/assets/problems/PA21G7M/PA21G7M-problems.json";
import * as PA21G7EProblems from "src/assets/problems/PA21G7E/PA21G7E-problems.json";
import * as PA19G7MProblems from "src/assets/problems/PA19G7M/PA19G7M-problems.json";
import * as PA19G7EProblems from "src/assets/problems/PA19G7E/PA19G7E-problems.json";
import * as PA18G7MProblems from "src/assets/problems/PA18G7M/PA18G7M-problems.json";
import * as PA18G7EProblems from "src/assets/problems/PA18G7E/PA18G7E-problems.json";
import * as PA16G7MProblems from "src/assets/problems/PA16G7M/PA16G7M-problems.json";
import * as PA16G7EProblems from "src/assets/problems/PA16G7E/PA16G7E-problems.json";
import * as PA15G7MProblems from "src/assets/problems/PA15G7M/PA15G7M-problems.json";
import * as PA15G7EProblems from "src/assets/problems/PA15G7E/PA15G7E-problems.json";
import * as PA23G8MProblems from "src/assets/problems/PA23G8M/PA23G8M-problems.json";
import * as PA23G8EProblems from "src/assets/problems/PA23G8E/PA23G8E-problems.json";
import * as PA22G8MProblems from "src/assets/problems/PA22G8M/PA22G8M-problems.json";
import * as PA22G8EProblems from "src/assets/problems/PA22G8E/PA22G8E-problems.json";
import * as PA21G8MProblems from "src/assets/problems/PA21G8M/PA21G8M-problems.json";
import * as PA21G8EProblems from "src/assets/problems/PA21G8E/PA21G8E-problems.json";
import * as PA19G8MProblems from "src/assets/problems/PA19G8M/PA19G8M-problems.json";
import * as PA19G8EProblems from "src/assets/problems/PA19G8E/PA19G8E-problems.json";
import * as PA18G8MProblems from "src/assets/problems/PA18G8M/PA18G8M-problems.json";
import * as PA18G8EProblems from "src/assets/problems/PA18G8E/PA18G8E-problems.json";
import * as PA16G8MProblems from "src/assets/problems/PA16G8M/PA16G8M-problems.json";
import * as PA16G8EProblems from "src/assets/problems/PA16G8E/PA16G8E-problems.json";
import * as PA15G8MProblems from "src/assets/problems/PA15G8M/PA15G8M-problems.json";
import * as PA15G8EProblems from "src/assets/problems/PA15G8E/PA15G8E-problems.json";
import * as PA23G8SProblems from "src/assets/problems/PA23G8S/PA23G8S-problems.json";
import * as PA22G8SProblems from "src/assets/problems/PA22G8S/PA22G8S-problems.json";
import * as PA21G8SProblems from "src/assets/problems/PA21G8S/PA21G8S-problems.json";
import * as PA19G8SProblems from "src/assets/problems/PA19G8S/PA19G8S-problems.json";
import * as PA18G8SProblems from "src/assets/problems/PA18G8S/PA18G8S-problems.json";
import * as PA16G8SProblems from "src/assets/problems/PA16G8S/PA16G8S-problems.json";
import * as PA15G8SProblems from "src/assets/problems/PA15G8S/PA15G8S-problems.json";
import * as SAT1M1Problems from "src/assets/problems/SAT1M1/SAT1M1-problems.json";
import * as SAT1M2Problems from "src/assets/problems/SAT1M2/SAT1M2-problems.json";
import * as SAT1RW1Problems from "src/assets/problems/SAT1RW1/SAT1RW1-problems.json";
import * as SAT1RW2Problems from "src/assets/problems/SAT1RW2/SAT1RW2-problems.json";
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
import * as TX19G4RProblems from "src/assets/problems/TX19G4R/TX19G4R-problems.json";
import * as TX18G4MProblems from "src/assets/problems/TX18G4M/TX18G4M-problems.json";
import * as TX18G4RProblems from "src/assets/problems/TX18G4R/TX18G4R-problems.json";
import * as TX17G4MProblems from "src/assets/problems/TX17G4M/TX17G4M-problems.json";
import * as TX17G4RProblems from "src/assets/problems/TX17G4R/TX17G4R-problems.json";
import * as TX22G5MProblems from "src/assets/problems/TX22G5M/TX22G5M-problems.json";
import * as TX22G5RProblems from "src/assets/problems/TX22G5R/TX22G5R-problems.json";
import * as TX21G5MProblems from "src/assets/problems/TX21G5M/TX21G5M-problems.json";
import * as TX21G5RProblems from "src/assets/problems/TX21G5R/TX21G5R-problems.json";
import * as TX19G5MProblems from "src/assets/problems/TX19G5M/TX19G5M-problems.json";
import * as TX19G5RProblems from "src/assets/problems/TX19G5R/TX19G5R-problems.json";
import * as TX18G5MProblems from "src/assets/problems/TX18G5M/TX18G5M-problems.json";
import * as TX18G5RProblems from "src/assets/problems/TX18G5R/TX18G5R-problems.json";
import * as TX17G5MProblems from "src/assets/problems/TX17G5M/TX17G5M-problems.json";
import * as TX17G5RProblems from "src/assets/problems/TX17G5R/TX17G5R-problems.json";
import * as TX22G5SProblems from "src/assets/problems/TX22G5S/TX22G5S-problems.json";
import * as TX21G5SProblems from "src/assets/problems/TX21G5S/TX21G5S-problems.json";
import * as TX19G5SProblems from "src/assets/problems/TX19G5S/TX19G5S-problems.json";
import * as TX18G5SProblems from "src/assets/problems/TX18G5S/TX18G5S-problems.json";
import * as TX22G6MProblems from "src/assets/problems/TX22G6M/TX22G6M-problems.json";
import * as TX22G6RProblems from "src/assets/problems/TX22G6R/TX22G6R-problems.json";
import * as TX21G6MProblems from "src/assets/problems/TX21G6M/TX21G6M-problems.json";
import * as TX21G6RProblems from "src/assets/problems/TX21G6R/TX21G6R-problems.json";
import * as TX19G6MProblems from "src/assets/problems/TX19G6M/TX19G6M-problems.json";
import * as TX19G6RProblems from "src/assets/problems/TX19G6R/TX19G6R-problems.json";
import * as TX18G6MProblems from "src/assets/problems/TX18G6M/TX18G6M-problems.json";
import * as TX18G6RProblems from "src/assets/problems/TX18G6R/TX18G6R-problems.json";
import * as TX17G6MProblems from "src/assets/problems/TX17G6M/TX17G6M-problems.json";
import * as TX17G6RProblems from "src/assets/problems/TX17G6R/TX17G6R-problems.json";
import * as TX22G7MProblems from "src/assets/problems/TX22G7M/TX22G7M-problems.json";
import * as TX22G7RProblems from "src/assets/problems/TX22G7R/TX22G7R-problems.json";
import * as TX21G7MProblems from "src/assets/problems/TX21G7M/TX21G7M-problems.json";
import * as TX21G7RProblems from "src/assets/problems/TX21G7R/TX21G7R-problems.json";
import * as TX19G7MProblems from "src/assets/problems/TX19G7M/TX19G7M-problems.json";
import * as TX19G7RProblems from "src/assets/problems/TX19G7R/TX19G7R-problems.json";
import * as TX18G7MProblems from "src/assets/problems/TX18G7M/TX18G7M-problems.json";
import * as TX18G7RProblems from "src/assets/problems/TX18G7R/TX18G7R-problems.json";
import * as TX17G7MProblems from "src/assets/problems/TX17G7M/TX17G7M-problems.json";
import * as TX17G7RProblems from "src/assets/problems/TX17G7R/TX17G7R-problems.json";
import * as TX22G8MProblems from "src/assets/problems/TX22G8M/TX22G8M-problems.json";
import * as TX22G8RProblems from "src/assets/problems/TX22G8R/TX22G8R-problems.json";
import * as TX21G8MProblems from "src/assets/problems/TX21G8M/TX21G8M-problems.json";
import * as TX21G8RProblems from "src/assets/problems/TX21G8R/TX21G8R-problems.json";
import * as TX19G8MProblems from "src/assets/problems/TX19G8M/TX19G8M-problems.json";
import * as TX19G8RProblems from "src/assets/problems/TX19G8R/TX19G8R-problems.json";
import * as TX18G8MProblems from "src/assets/problems/TX18G8M/TX18G8M-problems.json";
import * as TX18G8RProblems from "src/assets/problems/TX18G8R/TX18G8R-problems.json";
import * as TX17G8MProblems from "src/assets/problems/TX17G8M/TX17G8M-problems.json";
import * as TX17G8RProblems from "src/assets/problems/TX17G8R/TX17G8R-problems.json";
import * as TX22G8SProblems from "src/assets/problems/TX22G8S/TX22G8S-problems.json";
import * as TX21G8SProblems from "src/assets/problems/TX21G8S/TX21G8S-problems.json";
import * as TX19G8SProblems from "src/assets/problems/TX19G8S/TX19G8S-problems.json";
import * as TX18G8SProblems from "src/assets/problems/TX19G8S/TX19G8S-problems.json";
import * as TX22G8SSProblems from "src/assets/problems/TX22G8SS/TX22G8SS-problems.json";
import * as TX21G8SSProblems from "src/assets/problems/TX21G8SS/TX21G8SS-problems.json";
import * as TX19G8SSProblems from "src/assets/problems/TX19G8SS/TX19G8SS-problems.json";
import * as TX18G8SSProblems from "src/assets/problems/TX18G8SS/TX18G8SS-problems.json";
import * as TX22HSA1Problems from "src/assets/problems/TX22HSA1/TX22HSA1-problems.json";
import * as TX21HSA1Problems from "src/assets/problems/TX21HSA1/TX21HSA1-problems.json";
import * as TX19HSA1Problems from "src/assets/problems/TX19HSA1/TX19HSA1-problems.json";
import * as TX18HSA1Problems from "src/assets/problems/TX18HSA1/TX18HSA1-problems.json";
import * as TX17HSA1Problems from "src/assets/problems/TX17HSA1/TX17HSA1-problems.json";
import * as TX22HSBProblems from "src/assets/problems/TX22HSB/TX22HSB-problems.json";
import * as TX21HSBProblems from "src/assets/problems/TX21HSB/TX21HSB-problems.json";
import * as TX19HSBProblems from "src/assets/problems/TX19HSB/TX19HSB-problems.json";
import * as TX18HSBProblems from "src/assets/problems/TX18HSB/TX18HSB-problems.json";
import * as TX17HSBProblems from "src/assets/problems/TX17HSB/TX17HSB-problems.json";
import * as TX22HSE1Problems from "src/assets/problems/TX22HSE1/TX22HSE1-problems.json";
import * as TX21HSE1Problems from "src/assets/problems/TX21HSE1/TX21HSE1-problems.json";
import * as TX19HSE1Problems from "src/assets/problems/TX19HSE1/TX19HSE1-problems.json";
import * as TX18HSE1Problems from "src/assets/problems/TX18HSE1/TX18HSE1-problems.json";
import * as TX17HSE1Problems from "src/assets/problems/TX17HSE1/TX17HSE1-problems.json";
import * as TX22HSE2Problems from "src/assets/problems/TX22HSE2/TX22HSE2-problems.json";
import * as TX21HSE2Problems from "src/assets/problems/TX21HSE2/TX21HSE2-problems.json";
import * as TX19HSE2Problems from "src/assets/problems/TX19HSE2/TX19HSE2-problems.json";
import * as TX18HSE2Problems from "src/assets/problems/TX18HSE2/TX18HSE2-problems.json";
import * as TX17HSE2Problems from "src/assets/problems/TX17HSE2/TX17HSE2-problems.json";
import * as TX22HSUSHProblems from "src/assets/problems/TX22HSUSH/TX22HSUSH-problems.json";
import * as TX21HSUSHProblems from "src/assets/problems/TX21HSUSH/TX21HSUSH-problems.json";
import * as TX19HSUSHProblems from "src/assets/problems/TX19HSUSH/TX19HSUSH-problems.json";
import * as TX18HSUSHProblems from "src/assets/problems/TX18HSUSH/TX18HSUSH-problems.json";
import * as TX17HSUSHProblems from "src/assets/problems/TX17HSUSH/TX17HSUSH-problems.json";

const confetti = require('canvas-confetti');

const confettiCanvas = document.getElementById('confetticanvas');
const confettiHandler = confetti.create(confettiCanvas, {
  resize: true,
  useWorker: true,
});

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable()
export class HomeComponent implements OnInit {
  // title = 'More Problems';
  
  user_data: any = {};

  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  mobileWidth = 1000;
  menuOpen = false;
  expand_refsheet = false;
  expand_supp = true;
  data_loaded = false;
  has_classes = false;
  count = 0;

  // user_data: any = null;
  edit_e_list: any = {};
  
  exam_attribute_dump: { [key: string]: { 'State': string, 'Grade': string, 'Subject': string, 'ExamName': string, 'ExamYear': string, 'ExamType': string, 'NumQuestions': number, 'Timer': number, 'HideTopics': boolean, 'Directions': string, 'RefSheet': string, 'Topics': { [key: string]: number }, 'Levels': { [key: string]: number }, 'Parts': string[] } } = examMetadata;
  online_set = ['NY23G3M', 'NY23G3E', 'NY22G3M', 'NY22G3E', 'NY21G3M', 'NY21G3E', 'NY19G3M', 'NY19G3E', 'NY18G3M', 'NY18G3E', 'NY17G3M', 'NY17G3E', 'NY16G3M', 'NY16G3E', 'NY15G3M', 'NY15G3E', 'NY23G4M', 'NY23G4E', 'NY22G4M', 'NY22G4E', 'NY21G4M', 'NY21G4E', 'NY19G4M', 'NY19G4E', 'NY18G4M', 'NY18G4E', 'NY17G4M', 'NY17G4E', 'NY16G4M', 'NY16G4E', 'NY15G4M', 'NY15G4E', 'NY22G4S', 'NY21G4S', 'NY19G4S', 'NY18G4S', 'NY17G4S', 'NY16G4S', 'NY15G4S', 'NY23G5M', 'NY23G5E', 'NY22G5M', 'NY22G5E', 'NY21G5M', 'NY21G5E', 'NY19G5M', 'NY19G5E', 'NY18G5M', 'NY18G5E', 'NY17G5M', 'NY17G5E', 'NY16G5M', 'NY16G5E', 'NY15G5M', 'NY15G5E', 'NY23G6M', 'NY23G6E', 'NY22G6M', 'NY22G6E', 'NY21G6M', 'NY21G6E', 'NY19G6M', 'NY19G6E', 'NY18G6M', 'NY18G6E', 'NY17G6M', 'NY17G6E', 'NY16G6M', 'NY16G6E', 'NY15G6M', 'NY15G6E', 'NY23G7M', 'NY23G7E', 'NY22G7M', 'NY22G7E', 'NY21G7M', 'NY21G7E', 'NY19G7M', 'NY19G7E', 'NY18G7M', 'NY18G7E', 'NY17G7M', 'NY17G7E', 'NY16G7M', 'NY16G7E', 'NY15G7M', 'NY15G7E', 'NY23G8M', 'NY23G8E', 'NY22G8M', 'NY22G8E', 'NY21G8M', 'NY21G8E', 'NY19G8M', 'NY19G8E', 'NY18G8M', 'NY18G8E', 'NY17G8M', 'NY17G8E', 'NY16G8M', 'NY16G8E', 'NY15G8M', 'NY15G8E', 'NY22G8S', 'NY21G8S', 'NY19G8S', 'NY18G8S', 'NY17G8S', 'NY16G8S', 'NY15G8S', 'PA23G3M', 'PA23G3E', 'PA22G3M', 'PA22G3E', 'PA21G3M', 'PA21G3E', 'PA19G3M', 'PA19G3E', 'PA18G3M', 'PA18G3E', 'PA16G3M', 'PA16G3E', 'PA15G3M', 'PA15G3E', 'PA23G4M', 'PA23G4E', 'PA22G4M', 'PA22G4E', 'PA21G4M', 'PA21G4E', 'PA19G4M', 'PA19G4E', 'PA18G4M', 'PA18G4E', 'PA16G4M', 'PA16G4E', 'PA15G4M', 'PA15G4E', 'PA23G4S', 'PA22G4S', 'PA21G4S', 'PA19G4S', 'PA18G4S', 'PA16G4S', 'PA15G4S', 'PA23G5M', 'PA23G5E', 'PA22G5M', 'PA22G5E', 'PA21G5M', 'PA21G5E', 'PA19G5M', 'PA19G5E', 'PA18G5M', 'PA18G5E', 'PA16G5M', 'PA16G5E', 'PA15G5M', 'PA15G5E', 'PA23G6M', 'PA23G6E', 'PA22G6M', 'PA22G6E', 'PA21G6M', 'PA21G6E', 'PA19G6M', 'PA19G6E', 'PA18G6M', 'PA18G6E', 'PA16G6M', 'PA16G6E', 'PA15G6M', 'PA15G6E', 'PA23G7M', 'PA23G7E', 'PA22G7M', 'PA22G7E', 'PA21G7M', 'PA21G7E', 'PA19G7M', 'PA19G7E', 'PA18G7M', 'PA18G7E', 'PA16G7M', 'PA16G7E', 'PA15G7M', 'PA15G7E', 'PA23G8M', 'PA23G8E', 'PA22G8M', 'PA22G8E', 'PA21G8M', 'PA21G8E', 'PA19G8M', 'PA19G8E', 'PA18G8M', 'PA18G8E', 'PA16G8M', 'PA16G8E', 'PA15G8M', 'PA15G8E', 'PA23G8S', 'PA22G8S', 'PA21G8S', 'PA19G8S', 'PA18G8S', 'PA16G8S', 'PA15G8S', 'SAT1', 'TX22G3M', 'TX22G3R', 'TX21G3M', 'TX21G3R', 'TX19G3M', 'TX19G3R', 'TX18G3M', 'TX18G3R', 'TX17G3M', 'TX17G3R', 'TX22G4M', 'TX22G4R', 'TX21G4M', 'TX21G4R', 'TX19G4M', 'TX19G4R', 'TX18G4M', 'TX18G4R', 'TX17G4M', 'TX17G4R', 'TX22G5M', 'TX22G5R', 'TX21G5M', 'TX21G5R', 'TX19G5M', 'TX19G5R', 'TX18G5M', 'TX18G5R', 'TX17G5M', 'TX17G5R', 'TX22G5S', 'TX21G5S', 'TX19G5S', 'TX18G5S', 'TX22G6M', 'TX22G6R', 'TX21G6M', 'TX21G6R', 'TX19G6M', 'TX19G6R', 'TX18G6M', 'TX18G6R', 'TX17G6M', 'TX17G6R', 'TX22G7M', 'TX22G7R', 'TX21G7M', 'TX21G7R', 'TX19G7M', 'TX19G7R', 'TX18G7M', 'TX18G7R', 'TX17G7M', 'TX17G7R', 'TX22G8M', 'TX22G8R', 'TX21G8M', 'TX21G8R', 'TX19G8M', 'TX19G8R', 'TX18G8M', 'TX18G8R', 'TX17G8M', 'TX17G8R', 'TX22G8S', 'TX21G8S', 'TX19G8S', 'TX18G8S', 'TX22G8SS', 'TX21G8SS', 'TX19G8SS', 'TX18G8SS', 'TX22HSA1', 'TX21HSA1', 'TX19HSA1', 'TX18HSA1', 'TX17HSA1', 'TX22HSB', 'TX21HSB', 'TX19HSB', 'TX18HSB', 'TX17HSB', 'TX22HSE1', 'TX21HSE1', 'TX19HSE1', 'TX18HSE1', 'TX17HSE1', 'TX22HSE2', 'TX21HSE2', 'TX19HSE2', 'TX18HSE2', 'TX17HSE2', 'TX22HSUSH', 'TX21HSUSH', 'TX19HSUSH', 'TX18HSUSH', 'TX17HSUSH'];
  // online_set = ['NY23G3M', 'NY23G3E', 'NY22G3M', 'NY22G3E', 'NY21G3M', 'NY21G3E', 'NY19G3M', 'NY19G3E', 'NY18G3M', 'NY18G3E', 'NY17G3M', 'NY17G3E', 'NY16G3M', 'NY16G3E', 'NY15G3M', 'NY15G3E', 'NY23G4M', 'NY23G4E', 'NY22G4M', 'NY22G4E', 'NY21G4M', 'NY21G4E', 'NY19G4M', 'NY19G4E', 'NY18G4M', 'NY18G4E', 'NY17G4M', 'NY17G4E', 'NY16G4M', 'NY16G4E', 'NY15G4M', 'NY15G4E', 'NY22G4S', 'NY21G4S', 'NY19G4S', 'NY18G4S', 'NY17G4S', 'NY16G4S', 'NY15G4S', 'NY23G5M', 'NY23G5E', 'NY22G5M', 'NY22G5E', 'NY21G5M', 'NY21G5E', 'NY19G5M', 'NY19G5E', 'NY18G5M', 'NY18G5E', 'NY17G5M', 'NY17G5E', 'NY16G5M', 'NY16G5E', 'NY15G5M', 'NY15G5E', 'NY23G6M', 'NY23G6E', 'NY22G6M', 'NY22G6E', 'NY21G6M', 'NY21G6E', 'NY19G6M', 'NY19G6E', 'NY18G6M', 'NY18G6E', 'NY17G6M', 'NY17G6E', 'NY16G6M', 'NY16G6E', 'NY15G6M', 'NY15G6E', 'NY23G7M', 'NY23G7E', 'NY22G7M', 'NY22G7E', 'NY21G7M', 'NY21G7E', 'NY19G7M', 'NY19G7E', 'NY18G7M', 'NY18G7E', 'NY17G7M', 'NY17G7E', 'NY16G7M', 'NY16G7E', 'NY15G7M', 'NY15G7E', 'NY23G8M', 'NY23G8E', 'NY22G8M', 'NY22G8E', 'NY21G8M', 'NY21G8E', 'NY19G8M', 'NY19G8E', 'NY18G8M', 'NY18G8E', 'NY17G8M', 'NY17G8E', 'NY16G8M', 'NY16G8E', 'NY15G8M', 'NY15G8E', 'NY22G8S', 'NY21G8S', 'NY19G8S', 'NY18G8S', 'NY17G8S', 'NY16G8S', 'NY15G8S', 'PA23G3M', 'PA23G3E', 'PA22G3M', 'PA22G3E', 'PA21G3M', 'PA21G3E', 'PA19G3M', 'PA19G3E', 'PA18G3M', 'PA18G3E', 'PA16G3M', 'PA16G3E', 'PA15G3M', 'PA15G3E', 'PA23G4M', 'PA23G4E', 'PA22G4M', 'PA22G4E', 'PA21G4M', 'PA21G4E', 'PA19G4M', 'PA19G4E', 'PA18G4M', 'PA18G4E', 'PA16G4M', 'PA16G4E', 'PA15G4M', 'PA15G4E', 'PA23G4S', 'PA22G4S', 'PA21G4S', 'PA19G4S', 'PA18G4S', 'PA16G4S', 'PA15G4S', 'PA23G5M', 'PA23G5E', 'PA22G5M', 'PA22G5E', 'PA21G5M', 'PA21G5E', 'PA19G5M', 'PA19G5E', 'PA18G5M', 'PA18G5E', 'PA16G5M', 'PA16G5E', 'PA15G5M', 'PA15G5E', 'PA23G6M', 'PA23G6E', 'PA22G6M', 'PA22G6E', 'PA21G6M', 'PA21G6E', 'PA19G6M', 'PA19G6E', 'PA18G6M', 'PA18G6E', 'PA16G6M', 'PA16G6E', 'PA15G6M', 'PA15G6E', 'PA23G7M', 'PA23G7E', 'PA22G7M', 'PA22G7E', 'PA21G7M', 'PA21G7E', 'PA19G7M', 'PA19G7E', 'PA18G7M', 'PA18G7E', 'PA16G7M', 'PA16G7E', 'PA15G7M', 'PA15G7E', 'PA23G8M', 'PA23G8E', 'PA22G8M', 'PA22G8E', 'PA21G8M', 'PA21G8E', 'PA19G8M', 'PA19G8E', 'PA18G8M', 'PA18G8E', 'PA16G8M', 'PA16G8E', 'PA15G8M', 'PA15G8E', 'PA23G8S', 'PA22G8S', 'PA21G8S', 'PA19G8S', 'PA18G8S', 'PA16G8S', 'PA15G8S', 'TX22G3M', 'TX22G3R', 'TX21G3M', 'TX21G3R', 'TX19G3M', 'TX19G3R', 'TX18G3M', 'TX18G3R', 'TX17G3M', 'TX17G3R', 'TX22G4M', 'TX22G4R', 'TX21G4M', 'TX21G4R', 'TX19G4M', 'TX19G4R', 'TX18G4M', 'TX18G4R', 'TX17G4M', 'TX17G4R', 'TX22G5M', 'TX22G5R', 'TX21G5M', 'TX21G5R', 'TX19G5M', 'TX19G5R', 'TX18G5M', 'TX18G5R', 'TX17G5M', 'TX17G5R', 'TX22G5S', 'TX21G5S', 'TX19G5S', 'TX18G5S', 'TX22G6M', 'TX22G6R', 'TX21G6M', 'TX21G6R', 'TX19G6M', 'TX19G6R', 'TX18G6M', 'TX18G6R', 'TX17G6M', 'TX17G6R', 'TX22G7M', 'TX22G7R', 'TX21G7M', 'TX21G7R', 'TX19G7M', 'TX19G7R', 'TX18G7M', 'TX18G7R', 'TX17G7M', 'TX17G7R', 'TX22G8M', 'TX22G8R', 'TX21G8M', 'TX21G8R', 'TX19G8M', 'TX19G8R', 'TX18G8M', 'TX18G8R', 'TX17G8M', 'TX17G8R', 'TX22G8S', 'TX21G8S', 'TX19G8S', 'TX18G8S', 'TX22G8SS', 'TX21G8SS', 'TX19G8SS', 'TX18G8SS', 'TX22HSA1', 'TX21HSA1', 'TX19HSA1', 'TX18HSA1', 'TX17HSA1', 'TX22HSB', 'TX21HSB', 'TX19HSB', 'TX18HSB', 'TX17HSB', 'TX22HSE1', 'TX21HSE1', 'TX19HSE1', 'TX18HSE1', 'TX17HSE1', 'TX22HSE2', 'TX21HSE2', 'TX19HSE2', 'TX18HSE2', 'TX17HSE2', 'TX22HSUSH', 'TX21HSUSH', 'TX19HSUSH', 'TX18HSUSH', 'TX17HSUSH'];
  favorite_exm_set: string[] = [];
  favorite_std_set: string[][] = [];
  inprogress_set: string[] = [];
  inprogress_exams: {[key: string] : any} = {};
  my_stud_inprogress_set: string[][] = [];
  my_stud_inprogress_exams: {[key: string] : {[key: string] : any}} = {};
  selected_stud = '';

  selected_state = '';
  selected_grade = '';

  assign_e = false;
  all_students: string[] = [];
  all_students_data: any = {};
  my_students: string[] = [];
  my_students_data: any = {};
  new_assignments: string[] = [];
  my_class_metadata: any[] = [];
  class_data: any = {};
  student_list: string[] = [];
  student_metadata: any[] = [];
  my_student_metadata: any[] = [];
  student_data: any = {};
  class_list: string[] = [];
  complete_exam_count = 0;
  inprog_exam_count = 0;

  avatars = ['bear', 'boar', 'cat', 'chicken', 'deer', 'dog', 'fox', 'giraffe', 'gorilla', 'horse', 'koala', 'lemur', 'lion', 'llama', 'owl', 'panda', 'rabbit', 'rhino', 'seal', 'shark', 'snake', 'tiger', 'walrus', 'wolf'];

  PA23G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA23G3MProblems;
  PA23G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA23G3EProblems;
  PA22G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G3MProblems;
  PA22G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G3EProblems;
  PA21G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G3MProblems;
  PA21G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G3EProblems;
  PA19G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G3MProblems;
  PA19G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G3EProblems;
  PA18G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G3MProblems;
  PA18G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G3EProblems;
  PA16G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G3MProblems;
  PA16G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G3EProblems;
  PA15G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G3MProblems;
  PA15G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G3EProblems;
  PA23G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA23G4MProblems;
  PA23G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA23G4EProblems;
  PA22G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G4MProblems;
  PA22G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G4EProblems;
  PA21G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G4MProblems;
  PA21G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G4EProblems;
  PA19G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G4MProblems;
  PA19G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G4EProblems;
  PA18G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G4MProblems;
  PA18G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G4EProblems;
  PA16G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G4MProblems;
  PA16G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G4EProblems;
  PA15G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G4MProblems;
  PA15G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G4EProblems;
  PA23G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA23G4SProblems;
  PA22G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G4SProblems;
  PA21G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G4SProblems;
  PA19G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G4SProblems;
  PA18G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G4SProblems;
  PA16G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G4SProblems;
  PA15G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G4SProblems;
  PA23G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA23G5MProblems;
  PA23G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA23G5EProblems;
  PA22G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G5MProblems;
  PA22G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G5EProblems;
  PA21G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G5MProblems;
  PA21G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G5EProblems;
  PA19G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G5MProblems;
  PA19G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G5EProblems;
  PA18G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G5MProblems;
  PA18G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G5EProblems;
  PA16G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G5MProblems;
  PA16G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G5EProblems;
  PA15G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G5MProblems;
  PA15G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G5EProblems;
  PA23G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA23G6MProblems;
  PA23G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA23G6EProblems;
  PA22G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G6MProblems;
  PA22G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G6EProblems;
  PA21G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G6MProblems;
  PA21G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G6EProblems;
  PA19G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G6MProblems;
  PA19G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G6EProblems;
  PA18G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G6MProblems;
  PA18G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G6EProblems;
  PA16G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G6MProblems;
  PA16G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G6EProblems;
  PA15G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G6MProblems;
  PA15G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G6EProblems;
  PA23G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA23G7MProblems;
  PA23G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA23G7EProblems;
  PA22G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G7MProblems;
  PA22G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G7EProblems;
  PA21G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G7MProblems;
  PA21G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G7EProblems;
  PA19G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G7MProblems;
  PA19G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G7EProblems;
  PA18G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G7MProblems;
  PA18G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G7EProblems;
  PA16G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G7MProblems;
  PA16G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G7EProblems;
  PA15G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G7MProblems;
  PA15G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G7EProblems;
  PA23G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA23G8MProblems;
  PA23G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA23G8EProblems;
  PA22G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G8MProblems;
  PA22G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G8EProblems;
  PA21G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G8MProblems;
  PA21G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G8EProblems;
  PA19G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G8MProblems;
  PA19G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G8EProblems;
  PA18G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G8MProblems;
  PA18G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G8EProblems;
  PA16G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G8MProblems;
  PA16G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G8EProblems;
  PA15G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G8MProblems;
  PA15G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G8EProblems;
  PA23G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA23G8SProblems;
  PA22G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G8SProblems;
  PA21G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G8SProblems;
  PA19G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G8SProblems;
  PA18G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G8SProblems;
  PA16G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G8SProblems;
  PA15G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G8SProblems;
  SAT1M1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SAT1M1Problems;
  SAT1M2_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SAT1M2Problems;
  SAT1RW1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SAT1RW1Problems;
  SAT1RW2_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SAT1RW2Problems;
  TX22G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G3MProblems;
  TX22G3R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G3RProblems;
  TX21G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G3MProblems;
  TX21G3R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G3RProblems;
  TX19G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G3MProblems;
  TX19G3R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G3RProblems;
  TX18G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G3MProblems;
  TX18G3R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G3RProblems;
  TX17G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17G3MProblems;
  TX17G3R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17G3RProblems;
  TX22G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G4MProblems;
  TX22G4R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G4RProblems;
  TX21G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G4MProblems;
  TX21G4R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G4RProblems;
  TX19G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G4MProblems;
  TX19G4R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G4RProblems;
  TX18G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G4MProblems;
  TX18G4R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G4RProblems;
  TX17G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17G4MProblems;
  TX17G4R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17G4RProblems;
  TX22G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G5MProblems;
  TX22G5R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G5RProblems;
  TX21G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G5MProblems;
  TX21G5R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G5RProblems;
  TX19G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G5MProblems;
  TX19G5R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G5RProblems;
  TX18G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G5MProblems;
  TX18G5R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G5RProblems;
  TX17G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17G5MProblems;
  TX17G5R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17G5RProblems;
  TX22G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G5SProblems;
  TX21G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G5SProblems;
  TX19G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G5SProblems;
  TX18G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G5SProblems;
  TX22G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G6MProblems;
  TX22G6R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G6RProblems;
  TX21G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G6MProblems;
  TX21G6R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G6RProblems;
  TX19G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G6MProblems;
  TX19G6R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G6RProblems;
  TX18G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G6MProblems;
  TX18G6R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G6RProblems;
  TX17G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17G6MProblems;
  TX17G6R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17G6RProblems;
  TX22G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G7MProblems;
  TX22G7R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G7RProblems;
  TX21G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G7MProblems;
  TX21G7R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G7RProblems;
  TX19G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G7MProblems;
  TX19G7R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G7RProblems;
  TX18G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G7MProblems;
  TX18G7R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G7RProblems;
  TX17G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17G7MProblems;
  TX17G7R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17G7RProblems;
  TX22G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G8MProblems;
  TX22G8R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G8RProblems;
  TX21G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G8MProblems;
  TX21G8R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G8RProblems;
  TX19G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G8MProblems;
  TX19G8R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G8RProblems;
  TX18G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G8MProblems;
  TX18G8R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G8RProblems;
  TX17G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17G8MProblems;
  TX17G8R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17G8RProblems;
  TX22G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G8SProblems;
  TX21G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G8SProblems;
  TX19G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G8SProblems;
  TX18G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G8SProblems;
  TX22G8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G8SSProblems;
  TX21G8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G8SSProblems;
  TX19G8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G8SSProblems;
  TX18G8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G8SSProblems;
  TX22HSA1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22HSA1Problems;
  TX21HSA1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21HSA1Problems;
  TX19HSA1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19HSA1Problems;
  TX18HSA1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18HSA1Problems;
  TX17HSA1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17HSA1Problems;
  TX22HSB_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22HSBProblems;
  TX21HSB_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21HSBProblems;
  TX19HSB_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19HSBProblems;
  TX18HSB_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18HSBProblems;
  TX17HSB_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17HSBProblems;
  TX22HSE1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22HSE1Problems;
  TX21HSE1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21HSE1Problems;
  TX19HSE1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19HSE1Problems;
  TX18HSE1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18HSE1Problems;
  TX17HSE1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17HSE1Problems;
  TX22HSE2_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22HSE2Problems;
  TX21HSE2_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21HSE2Problems;
  TX19HSE2_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19HSE2Problems;
  TX18HSE2_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18HSE2Problems;
  TX17HSE2_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17HSE2Problems;
  TX22HSUSH_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22HSUSHProblems;
  TX21HSUSH_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21HSUSHProblems;
  TX19HSUSH_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19HSUSHProblems;
  TX18HSUSH_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18HSUSHProblems;
  TX17HSUSH_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17HSUSHProblems;
  dump_dict: { [key: string]: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } } = {
    "PA23G3M": this.PA23G3M_exam_dump,
    "PA23G3E": this.PA23G3E_exam_dump,
    "PA22G3M": this.PA22G3M_exam_dump,
    "PA22G3E": this.PA22G3E_exam_dump,
    "PA21G3M": this.PA21G3M_exam_dump,
    "PA21G3E": this.PA21G3E_exam_dump,
    "PA19G3M": this.PA19G3M_exam_dump,
    "PA19G3E": this.PA19G3E_exam_dump,
    "PA18G3M": this.PA18G3M_exam_dump,
    "PA18G3E": this.PA18G3E_exam_dump,
    "PA16G3M": this.PA16G3M_exam_dump,
    "PA16G3E": this.PA16G3E_exam_dump,
    "PA15G3M": this.PA15G3M_exam_dump,
    "PA15G3E": this.PA15G3E_exam_dump,
    "PA23G4M": this.PA23G4M_exam_dump,
    "PA23G4E": this.PA23G4E_exam_dump,
    "PA22G4M": this.PA22G4M_exam_dump,
    "PA22G4E": this.PA22G4E_exam_dump,
    "PA21G4M": this.PA21G4M_exam_dump,
    "PA21G4E": this.PA21G4E_exam_dump,
    "PA19G4M": this.PA19G4M_exam_dump,
    "PA19G4E": this.PA19G4E_exam_dump,
    "PA18G4M": this.PA18G4M_exam_dump,
    "PA18G4E": this.PA18G4E_exam_dump,
    "PA16G4M": this.PA16G4M_exam_dump,
    "PA16G4E": this.PA16G4E_exam_dump,
    "PA15G4M": this.PA15G4M_exam_dump,
    "PA15G4E": this.PA15G4E_exam_dump,
    "PA23G4S": this.PA23G4S_exam_dump,
    "PA22G4S": this.PA22G4S_exam_dump,
    "PA21G4S": this.PA21G4S_exam_dump,
    "PA19G4S": this.PA19G4S_exam_dump,
    "PA18G4S": this.PA18G4S_exam_dump,
    "PA16G4S": this.PA16G4S_exam_dump,
    "PA15G4S": this.PA15G4S_exam_dump,
    "PA23G5M": this.PA23G5M_exam_dump,
    "PA23G5E": this.PA23G5E_exam_dump,
    "PA22G5M": this.PA22G5M_exam_dump,
    "PA22G5E": this.PA22G5E_exam_dump,
    "PA21G5M": this.PA21G5M_exam_dump,
    "PA21G5E": this.PA21G5E_exam_dump,
    "PA19G5M": this.PA19G5M_exam_dump,
    "PA19G5E": this.PA19G5E_exam_dump,
    "PA18G5M": this.PA18G5M_exam_dump,
    "PA18G5E": this.PA18G5E_exam_dump,
    "PA16G5M": this.PA16G5M_exam_dump,
    "PA16G5E": this.PA16G5E_exam_dump,
    "PA15G5M": this.PA15G5M_exam_dump,
    "PA15G5E": this.PA15G5E_exam_dump,
    "PA23G6M": this.PA23G6M_exam_dump,
    "PA23G6E": this.PA23G6E_exam_dump,
    "PA22G6M": this.PA22G6M_exam_dump,
    "PA22G6E": this.PA22G6E_exam_dump,
    "PA21G6M": this.PA21G6M_exam_dump,
    "PA21G6E": this.PA21G6E_exam_dump,
    "PA19G6M": this.PA19G6M_exam_dump,
    "PA19G6E": this.PA19G6E_exam_dump,
    "PA18G6M": this.PA18G6M_exam_dump,
    "PA18G6E": this.PA18G6E_exam_dump,
    "PA16G6M": this.PA16G6M_exam_dump,
    "PA16G6E": this.PA16G6E_exam_dump,
    "PA15G6M": this.PA15G6M_exam_dump,
    "PA15G6E": this.PA15G6E_exam_dump,
    "PA23G7M": this.PA23G7M_exam_dump,
    "PA23G7E": this.PA23G7E_exam_dump,
    "PA22G7M": this.PA22G7M_exam_dump,
    "PA22G7E": this.PA22G7E_exam_dump,
    "PA21G7M": this.PA21G7M_exam_dump,
    "PA21G7E": this.PA21G7E_exam_dump,
    "PA19G7M": this.PA19G7M_exam_dump,
    "PA19G7E": this.PA19G7E_exam_dump,
    "PA18G7M": this.PA18G7M_exam_dump,
    "PA18G7E": this.PA18G7E_exam_dump,
    "PA16G7M": this.PA16G7M_exam_dump,
    "PA16G7E": this.PA16G7E_exam_dump,
    "PA15G7M": this.PA15G7M_exam_dump,
    "PA15G7E": this.PA15G7E_exam_dump,
    "PA23G8M": this.PA23G8M_exam_dump,
    "PA23G8E": this.PA23G8E_exam_dump,
    "PA22G8M": this.PA22G8M_exam_dump,
    "PA22G8E": this.PA22G8E_exam_dump,
    "PA21G8M": this.PA21G8M_exam_dump,
    "PA21G8E": this.PA21G8E_exam_dump,
    "PA19G8M": this.PA19G8M_exam_dump,
    "PA19G8E": this.PA19G8E_exam_dump,
    "PA18G8M": this.PA18G8M_exam_dump,
    "PA18G8E": this.PA18G8E_exam_dump,
    "PA16G8M": this.PA16G8M_exam_dump,
    "PA16G8E": this.PA16G8E_exam_dump,
    "PA15G8M": this.PA15G8M_exam_dump,
    "PA15G8E": this.PA15G8E_exam_dump,
    "PA23G8S": this.PA23G8S_exam_dump,
    "PA22G8S": this.PA22G8S_exam_dump,
    "PA21G8S": this.PA21G8S_exam_dump,
    "PA19G8S": this.PA19G8S_exam_dump,
    "PA18G8S": this.PA18G8S_exam_dump,
    "PA16G8S": this.PA16G8S_exam_dump,
    "PA15G8S": this.PA15G8S_exam_dump,
    "SAT1M1": this.SAT1M1_exam_dump,
    "SAT1M2": this.SAT1M2_exam_dump,
    "SAT1RW1": this.SAT1RW1_exam_dump,
    "SAT1RW2": this.SAT1RW2_exam_dump,
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
    "TX19G4R": this.TX19G4R_exam_dump,
    "TX18G4M": this.TX18G4M_exam_dump,
    "TX18G4R": this.TX18G4R_exam_dump,
    "TX17G4M": this.TX17G4M_exam_dump,
    "TX17G4R": this.TX17G4R_exam_dump,
    "TX22G5M": this.TX22G5M_exam_dump,
    "TX22G5R": this.TX22G5R_exam_dump,
    "TX21G5M": this.TX21G5M_exam_dump,
    "TX21G5R": this.TX21G5R_exam_dump,
    "TX19G5M": this.TX19G5M_exam_dump,
    "TX19G5R": this.TX19G5R_exam_dump,
    "TX18G5M": this.TX18G5M_exam_dump,
    "TX18G5R": this.TX18G5R_exam_dump,
    "TX17G5M": this.TX17G5M_exam_dump,
    "TX17G5R": this.TX17G5R_exam_dump,
    "TX22G5S": this.TX22G5S_exam_dump,
    "TX21G5S": this.TX21G5S_exam_dump,
    "TX19G5S": this.TX19G5S_exam_dump,
    "TX18G5S": this.TX18G5S_exam_dump,
    "TX22G6M": this.TX22G6M_exam_dump,
    "TX22G6R": this.TX22G6R_exam_dump,
    "TX21G6M": this.TX21G6M_exam_dump,
    "TX21G6R": this.TX21G6R_exam_dump,
    "TX19G6M": this.TX19G6M_exam_dump,
    "TX19G6R": this.TX19G6R_exam_dump,
    "TX18G6M": this.TX18G6M_exam_dump,
    "TX18G6R": this.TX18G6R_exam_dump,
    "TX17G6M": this.TX17G6M_exam_dump,
    "TX17G6R": this.TX17G6R_exam_dump,
    "TX22G7M": this.TX22G7M_exam_dump,
    "TX22G7R": this.TX22G7R_exam_dump,
    "TX21G7M": this.TX21G7M_exam_dump,
    "TX21G7R": this.TX21G7R_exam_dump,
    "TX19G7M": this.TX19G7M_exam_dump,
    "TX19G7R": this.TX19G7R_exam_dump,
    "TX18G7M": this.TX18G7M_exam_dump,
    "TX18G7R": this.TX18G7R_exam_dump,
    "TX17G7M": this.TX17G7M_exam_dump,
    "TX17G7R": this.TX17G7R_exam_dump,
    "TX22G8M": this.TX22G8M_exam_dump,
    "TX22G8R": this.TX22G8R_exam_dump,
    "TX21G8M": this.TX21G8M_exam_dump,
    "TX21G8R": this.TX21G8R_exam_dump,
    "TX19G8M": this.TX19G8M_exam_dump,
    "TX19G8R": this.TX19G8R_exam_dump,
    "TX18G8M": this.TX18G8M_exam_dump,
    "TX18G8R": this.TX18G8R_exam_dump,
    "TX17G8M": this.TX17G8M_exam_dump,
    "TX17G8R": this.TX17G8R_exam_dump,
    "TX22G8S": this.TX22G8S_exam_dump,
    "TX21G8S": this.TX21G8S_exam_dump,
    "TX19G8S": this.TX19G8S_exam_dump,
    "TX18G8S": this.TX18G8S_exam_dump,
    "TX22G8SS": this.TX22G8SS_exam_dump,
    "TX21G8SS": this.TX21G8SS_exam_dump,
    "TX19G8SS": this.TX19G8SS_exam_dump,
    "TX18G8SS": this.TX18G8SS_exam_dump,
    "TX22HSA1": this.TX22HSA1_exam_dump,
    "TX21HSA1": this.TX21HSA1_exam_dump,
    "TX19HSA1": this.TX19HSA1_exam_dump,
    "TX18HSA1": this.TX18HSA1_exam_dump,
    "TX17HSA1": this.TX17HSA1_exam_dump,
    "TX22HSB": this.TX22HSB_exam_dump,
    "TX21HSB": this.TX21HSB_exam_dump,
    "TX19HSB": this.TX19HSB_exam_dump,
    "TX18HSB": this.TX18HSB_exam_dump,
    "TX17HSB": this.TX17HSB_exam_dump,
    "TX22HSE1": this.TX22HSE1_exam_dump,
    "TX21HSE1": this.TX21HSE1_exam_dump,
    "TX19HSE1": this.TX19HSE1_exam_dump,
    "TX18HSE1": this.TX18HSE1_exam_dump,
    "TX17HSE1": this.TX17HSE1_exam_dump,
    "TX22HSE2": this.TX22HSE2_exam_dump,
    "TX21HSE2": this.TX21HSE2_exam_dump,
    "TX19HSE2": this.TX19HSE2_exam_dump,
    "TX18HSE2": this.TX18HSE2_exam_dump,
    "TX17HSE2": this.TX17HSE2_exam_dump,
    "TX22HSUSH": this.TX22HSUSH_exam_dump,
    "TX21HSUSH": this.TX21HSUSH_exam_dump,
    "TX19HSUSH": this.TX19HSUSH_exam_dump,
    "TX18HSUSH": this.TX18HSUSH_exam_dump,
    "TX17HSUSH": this.TX17HSUSH_exam_dump
  };

  exam_names: {[key: string]: string} = {
    "COG3M": "Colorado CMAS Grade 3 Math Practice Exam",
    "COG3E": "Colorado CMAS Grade 3 English Language Arts Practice Exam",
    "COG4M": "Colorado CMAS Grade 4 Math Practice Exam",
    "COG4E": "Colorado CMAS Grade 4 English Language Arts Practice Exam",
    "COG5M": "Colorado CMAS Grade 5 Math Practice Exam",
    "COG5E": "Colorado CMAS Grade 5 English Language Arts Practice Exam",
    "COG5S": "Colorado CMAS Grade 5 Science Practice Exam",
    "COG6M": "Colorado CMAS Grade 6 Math Practice Exam",
    "COG6E": "Colorado CMAS Grade 6 English Language Arts Practice Exam",
    "COG7M": "Colorado CMAS Grade 7 Math Practice Exam",
    "COG7E": "Colorado CMAS Grade 7 English Language Arts Practice Exam",
    "COG8M": "Colorado CMAS Grade 8 Math Practice Exam",
    "COG8E": "Colorado CMAS Grade 8 English Language Arts Practice Exam",
    "COG8S": "Colorado CMAS Grade 8 Science Practice Exam",
    "COHSS": "Colorado CMAS High School Science Practice Exam",
    "DEG4SS": "Delaware DeSSA Grade 4 Social Studies Practice Exam",
    "DEG5S": "Delaware DeSSA Grade 5 Science Practice Exam",
    "DEG7SS": "Delaware DeSSA Grade 7 Social Studies Practice Exam",
    "DEG8S": "Delaware DeSSA Grade 8 Science Practice Exam",
    "DEG11SS": "Delaware DeSSA Grade 11 Social Studies Practice Exam",
    "FL20G3M": "Florida FSA 2020 Grade 3 Math Practice Exam",
    "FL20G3R": "Florida FSA 2020 Grade 3 Reading Practice Exam",
    "FL20G4M": "Florida FSA 2020 Grade 4 Math Practice Exam",
    "FL20G4R": "Florida FSA 2020 Grade 4 Reading Practice Exam",
    "FL20G4W": "Florida FSA 2020 Grade 4 Writing Practice Exam",
    "FL20G5M": "Florida FSA 2020 Grade 5 Math Practice Exam",
    "FL20G5R": "Florida FSA 2020 Grade 5 Reading Practice Exam",
    "FL20G5W": "Florida FSA 2020 Grade 5 Writing Practice Exam",
    "FL20G5S": "Florida FSA 2020 Grade 5 Science Practice Exam",
    "FL20G6M": "Florida FSA 2020 Grade 6 Math Practice Exam",
    "FL20G6R": "Florida FSA 2020 Grade 6 Reading Practice Exam",
    "FL20G6W": "Florida FSA 2020 Grade 6 Writing Practice Exam",
    "FL20G7M": "Florida FSA 2020 Grade 7 Math Practice Exam",
    "FL20G7R": "Florida FSA 2020 Grade 7 Reading Practice Exam",
    "FL20G7W": "Florida FSA 2020 Grade 7 Writing Practice Exam",
    "FL20G8M": "Florida FSA 2020 Grade 8 Math Practice Exam",
    "FL20G8R": "Florida FSA 2020 Grade 8 Reading Practice Exam",
    "FL20G8W": "Florida FSA 2020 Grade 8 Writing Practice Exam",
    "FL20G8S": "Florida FSA 2020 Grade 8 Science Practice Exam",
    "FL20G9R": "Florida FSA 2020 Grade 9 Reading Practice Exam",
    "FL20G9W": "Florida FSA 2020 Grade 9 Writing Practice Exam",
    "FL20G10R": "Florida FSA 2020 Grade 10 Reading Practice Exam",
    "FL20G10W": "Florida FSA 2020 Grade 10 Writing Practice Exam",
    "ILG3M": "Illinois IAR Grade 3 Math Practice Exam",
    "ILG3E": "Illinois IAR Grade 3 English Language Arts Practice Exam",
    "ILG4M": "Illinois IAR Grade 4 Math Practice Exam",
    "ILG4E": "Illinois IAR Grade 4 English Language Arts Practice Exam",
    "ILG5M": "Illinois IAR Grade 5 Math Practice Exam",
    "ILG5E": "Illinois IAR Grade 5 English Language Arts Practice Exam",
    "ILG6M": "Illinois IAR Grade 6 Math Practice Exam",
    "ILG6E": "Illinois IAR Grade 6 English Language Arts Practice Exam",
    "ILG7M": "Illinois IAR Grade 7 Math Practice Exam",
    "ILG7E": "Illinois IAR Grade 7 English Language Arts Practice Exam",
    "ILG8M": "Illinois IAR Grade 8 Math Practice Exam",
    "ILG8E": "Illinois IAR Grade 8 English Language Arts Practice Exam",
    "MDG3M": "Maryland MCAP Grade 3 Math Practice Exam",
    "MDG3E": "Maryland MCAP Grade 3 English Language Arts Practice Exam",
    "MDG4M": "Maryland MCAP Grade 4 Math Practice Exam",
    "MDG4E": "Maryland MCAP Grade 4 English Language Arts Practice Exam",
    "MDG5M": "Maryland MCAP Grade 5 Math Practice Exam",
    "MDG5E": "Maryland MCAP Grade 5 English Language Arts Practice Exam",
    "MDG5S": "Maryland MCAP Grade 5 Science Practice Exam",
    "MDG6M": "Maryland MCAP Grade 6 Math Practice Exam",
    "MDG6E": "Maryland MCAP Grade 6 English Language Arts Practice Exam",
    "MDG7M": "Maryland MCAP Grade 7 Math Practice Exam",
    "MDG7E": "Maryland MCAP Grade 7 English Language Arts Practice Exam",
    "MDG8M": "Maryland MCAP Grade 8 Math Practice Exam",
    "MDG8E": "Maryland MCAP Grade 8 English Language Arts Practice Exam",
    "MDG8S": "Maryland MCAP Grade 8 Science Practice Exam",
    "MDG8SS": "Maryland MCAP Grade 8 Social Studies Practice Exam",
    "MDG10E": "Maryland MCAP Grade 10 English Language Arts Practice Exam",
    "MEG3M": "Maine MEA Grade 3 Math Practice Exam",
    "MEG4M": "Maine MEA Grade 4 Math Practice Exam",
    "MEG5M": "Maine MEA Grade 5 Math Practice Exam",
    "MEG35R": "Maine MEA Grades 3 - 5 Reading Practice Exam",
    "MEG6M": "Maine MEA Grade 6 Math Practice Exam",
    "MEG7M": "Maine MEA Grade 7 Math Practice Exam",
    "MEG8M": "Maine MEA Grade 8 Math Practice Exam",
    "MEG68R": "Maine MEA Grades 6 - 8 Reading Practice Exam",
    "MEG10M": "Maine MEA Grade 10 Math Practice Exam",
    "MEG10R": "Maine MEA Grade 10 Reading Practice Exam",
    "MAG3M": "Massachusetts MCAS Grade 3 Math Practice Exam",
    "MAG3E": "Massachusetts MCAS Grade 3 English Language Arts Practice Exam",
    "MAG4M": "Massachusetts MCAS Grade 4 Math Practice Exam",
    "MAG4E": "Massachusetts MCAS Grade 4 English Language Arts Practice Exam",
    "MAG5M": "Massachusetts MCAS Grade 5 Math Practice Exam",
    "MAG5E": "Massachusetts MCAS Grade 5 English Language Arts Practice Exam",
    "MAG5S": "Massachusetts MCAS Grade 5 Science Practice Exam",
    "MAG6M": "Massachusetts MCAS Grade 6 Math Practice Exam",
    "MAG6E": "Massachusetts MCAS Grade 6 English Language Arts Practice Exam",
    "MAG7M": "Massachusetts MCAS Grade 7 Math Practice Exam",
    "MAG7E": "Massachusetts MCAS Grade 7 English Language Arts Practice Exam",
    "MAG8M": "Massachusetts MCAS Grade 8 Math Practice Exam",
    "MAG8E": "Massachusetts MCAS Grade 8 English Language Arts Practice Exam",
    "MAG8S": "Massachusetts MCAS Grade 8 Science Practice Exam",
    "MAG10M": "Massachusetts MCAS Grade 10 Math Practice Exam",
    "MAG10E": "Massachusetts MCAS Grade 10 English Language Arts Practice Exam",
    "MNG3M": "Minnesota MCA Grade 3 Math Practice Exam",
    "MNG3R": "Minnesota MCA Grade 3 Reading Practice Exam",
    "MNG4M": "Minnesota MCA Grade 4 Math Practice Exam",
    "MNG4R": "Minnesota MCA Grade 4 Reading Practice Exam",
    "MNG5M": "Minnesota MCA Grade 5 Math Practice Exam",
    "MNG5R": "Minnesota MCA Grade 5 Reading Practice Exam",
    "MNG5S": "Minnesota MCA Grade 5 Science Practice Exam",
    "MNG6M": "Minnesota MCA Grade 6 Math Practice Exam",
    "MNG6R": "Minnesota MCA Grade 6 Reading Practice Exam",
    "MNG7M": "Minnesota MCA Grade 7 Math Practice Exam",
    "MNG7R": "Minnesota MCA Grade 7 Reading Practice Exam",
    "MNG8M": "Minnesota MCA Grade 8 Math Practice Exam",
    "MNG8R": "Minnesota MCA Grade 8 Reading Practice Exam",
    "MNG8S": "Minnesota MCA Grade 8 Science Practice Exam",
    "MNG8SS": "Minnesota MCA Grade 8 Social Studies Practice Exam",
    "MNG10R": "Minnesota MCA Grade 10 Reading Practice Exam",
    "MNG11M": "Minnesota MCA Grade 11 Math Practice Exam",
    "MNHSS": "Minnesota MCA High School Science Practice Exam",
    "MOG3M": "Missouri MAP Grade 3 Math Practice Exam",
    "MOG3E": "Missouri MAP Grade 3 English Language Arts Practice Exam",
    "MOG4M": "Missouri MAP Grade 4 Math Practice Exam",
    "MOG4E": "Missouri MAP Grade 4 English Language Arts Practice Exam",
    "MOG5M": "Missouri MAP Grade 5 Math Practice Exam",
    "MOG5E": "Missouri MAP Grade 5 English Language Arts Practice Exam",
    "MOG5S": "Missouri MAP Grade 5 Science Practice Exam",
    "MOG6M": "Missouri MAP Grade 6 Math Practice Exam",
    "MOG6E": "Missouri MAP Grade 6 English Language Arts Practice Exam",
    "MOG7M": "Missouri MAP Grade 7 Math Practice Exam",
    "MOG7E": "Missouri MAP Grade 7 English Language Arts Practice Exam",
    "MOG8M": "Missouri MAP Grade 8 Math Practice Exam",
    "MOG8E": "Missouri MAP Grade 8 English Language Arts Practice Exam",
    "MOG8S": "Missouri MAP Grade 8 Science Practice Exam",
    "MS22G3M": "Mississippi MAAP 2022 Grade 3 Math Practice Exam",
    "MS22G3E": "Mississippi MAAP 2022 Grade 3 English Language Arts Practice Exam",
    "MS22G4M": "Mississippi MAAP 2022 Grade 4 Math Practice Exam",
    "MS22G4E": "Mississippi MAAP 2022 Grade 4 English Language Arts Practice Exam",
    "MS22G5M": "Mississippi MAAP 2022 Grade 5 Math Practice Exam",
    "MS22G5E": "Mississippi MAAP 2022 Grade 5 English Language Arts Practice Exam",
    "MS22G6M": "Mississippi MAAP 2022 Grade 6 Math Practice Exam",
    "MS22G6E": "Mississippi MAAP 2022 Grade 6 English Language Arts Practice Exam",
    "MS22G7M": "Mississippi MAAP 2022 Grade 7 Math Practice Exam",
    "MS22G7E": "Mississippi MAAP 2022 Grade 7 English Language Arts Practice Exam",
    "MS22G8M": "Mississippi MAAP 2022 Grade 8 Math Practice Exam",
    "MS22G8E": "Mississippi MAAP 2022 Grade 8 English Language Arts Practice Exam",
    "MS23G3M": "Mississippi MAAP 2023 Grade 3 Math Practice Exam",
    "MS23G3E": "Mississippi MAAP 2023 Grade 3 English Language Arts Practice Exam",
    "MS23G4M": "Mississippi MAAP 2023 Grade 4 Math Practice Exam",
    "MS23G4E": "Mississippi MAAP 2023 Grade 4 English Language Arts Practice Exam",
    "MS23G5M": "Mississippi MAAP 2023 Grade 5 Math Practice Exam",
    "MS23G5E": "Mississippi MAAP 2023 Grade 5 English Language Arts Practice Exam",
    "MS23G6M": "Mississippi MAAP 2023 Grade 6 Math Practice Exam",
    "MS23G6E": "Mississippi MAAP 2023 Grade 6 English Language Arts Practice Exam",
    "MS23G7M": "Mississippi MAAP 2023 Grade 7 Math Practice Exam",
    "MS23G7E": "Mississippi MAAP 2023 Grade 7 English Language Arts Practice Exam",
    "MS23G8M": "Mississippi MAAP 2023 Grade 8 Math Practice Exam",
    "MS23G8E": "Mississippi MAAP 2023 Grade 8 English Language Arts Practice Exam",
    "NC18G3M": "North Carolina EOG 2018 Grade 3 Math Exam",
    "NC18G3R": "North Carolina EOG 2018 Grade 3 Reading Exam",
    "NC18G4M": "North Carolina EOG 2018 Grade 4 Math Exam",
    "NC18G4R": "North Carolina EOG 2018 Grade 4 Reading Exam",
    "NC18G5M": "North Carolina EOG 2018 Grade 5 Math Exam",
    "NC18G5R": "North Carolina EOG 2018 Grade 5 Reading Exam",
    "NC18G5S": "North Carolina EOG 2018 Grade 5 Science Exam",
    "NC18G6M": "North Carolina EOG 2018 Grade 6 Math Exam",
    "NC18G6R": "North Carolina EOG 2018 Grade 6 Reading Exam",
    "NC18G7M": "North Carolina EOG 2018 Grade 7 Math Exam",
    "NC18G7R": "North Carolina EOG 2018 Grade 7 Reading Exam",
    "NC18G8M": "North Carolina EOG 2018 Grade 8 Math Exam",
    "NC18G8R": "North Carolina EOG 2018 Grade 8 Reading Exam",
    "NC18G8S": "North Carolina EOG 2018 Grade 8 Science Exam",
    "NEG3M": "Nebraska NSCAS Grade 3 Math Practice Exam",
    "NEG3E": "Nebraska NSCAS Grade 3 English Language Arts Practice Exam",
    "NEG4M": "Nebraska NSCAS Grade 4 Math Practice Exam",
    "NEG4E": "Nebraska NSCAS Grade 4 English Language Arts Practice Exam",
    "NEG5M": "Nebraska NSCAS Grade 5 Math Practice Exam",
    "NEG5E": "Nebraska NSCAS Grade 5 English Language Arts Practice Exam",
    "NEG5S": "Nebraska NSCAS Grade 5 Science Practice Exam",
    "NEG6M": "Nebraska NSCAS Grade 6 Math Practice Exam",
    "NEG6E": "Nebraska NSCAS Grade 6 English Language Arts Practice Exam",
    "NEG7M": "Nebraska NSCAS Grade 7 Math Practice Exam",
    "NEG7E": "Nebraska NSCAS Grade 7 English Language Arts Practice Exam",
    "NEG8M": "Nebraska NSCAS Grade 8 Math Practice Exam",
    "NEG8E": "Nebraska NSCAS Grade 8 English Language Arts Practice Exam",
    "NEG8S": "Nebraska NSCAS Grade 8 Science Practice Exam",
    "NJG3M": "New Jersey NJSLA Grade 3 Math Practice Exam",
    "NJG3E": "New Jersey NJSLA Grade 3 English Language Arts Practice Exam",
    "NJG4M": "New Jersey NJSLA Grade 4 Math Practice Exam",
    "NJG4E": "New Jersey NJSLA Grade 4 English Language Arts Practice Exam",
    "NJG5M": "New Jersey NJSLA Grade 5 Math Practice Exam",
    "NJG5E": "New Jersey NJSLA Grade 5 English Language Arts Practice Exam",
    "NJG5S": "New Jersey NJSLA Grade 5 Science Practice Exam",
    "NJG6M": "New Jersey NJSLA Grade 6 Math Practice Exam",
    "NJG6E": "New Jersey NJSLA Grade 6 English Language Arts Practice Exam",
    "NJG7M": "New Jersey NJSLA Grade 7 Math Practice Exam",
    "NJG7E": "New Jersey NJSLA Grade 7 English Language Arts Practice Exam",
    "NJG8M": "New Jersey NJSLA Grade 8 Math Practice Exam",
    "NJG8E": "New Jersey NJSLA Grade 8 English Language Arts Practice Exam",
    "NJG8S": "New Jersey NJSLA Grade 8 Science Practice Exam",
    "NJG9E": "New Jersey NJSLA Grade 9 English Language Arts Practice Exam",
    "NJG11S": "New Jersey NJSLA Grade 11 Science Practice Exam",
    "NMG3M": "New Mexico NM-MSSA Grade 3 Math Practice Exam",
    "NMG3E": "New Mexico NM-MSSA Grade 3 English Language Arts Practice Exam",
    "NMG4M": "New Mexico NM-MSSA Grade 4 Math Practice Exam",
    "NMG4E": "New Mexico NM-MSSA Grade 4 English Language Arts Practice Exam",
    "NMG5M": "New Mexico NM-MSSA Grade 5 Math Practice Exam",
    "NMG5E": "New Mexico NM-MSSA Grade 5 English Language Arts Practice Exam",
    "NMG5S": "New Mexico NM-ASR Grade 5 Science Practice Exam",
    "NMG6M": "New Mexico NM-MSSA Grade 6 Math Practice Exam",
    "NMG6E": "New Mexico NM-MSSA Grade 6 English Language Arts Practice Exam",
    "NMG7M": "New Mexico NM-MSSA Grade 7 Math Practice Exam",
    "NMG7E": "New Mexico NM-MSSA Grade 7 English Language Arts Practice Exam",
    "NMG8M": "New Mexico NM-MSSA Grade 8 Math Practice Exam",
    "NMG8E": "New Mexico NM-MSSA Grade 8 English Language Arts Practice Exam",
    "NMG8S": "New Mexico NM-ASR Grade 8 Science Practice Exam",
    "NMG11S": "New Mexico NM-ASR Grade 11 Science Practice Exam",
    "NY23G3M": "New York NYSTP 2023 Grade 3 Math Exam",
    "NY23G3E": "New York NYSTP 2023 Grade 3 English Language Arts Exam",
    "NY23G4M": "New York NYSTP 2023 Grade 4 Math Exam",
    "NY23G4E": "New York NYSTP 2023 Grade 4 English Language Arts Exam",
    "NY23G5M": "New York NYSTP 2023 Grade 5 Math Exam",
    "NY23G5E": "New York NYSTP 2023 Grade 5 English Language Arts Exam",
    "NY23G6M": "New York NYSTP 2023 Grade 6 Math Exam",
    "NY23G6E": "New York NYSTP 2023 Grade 6 English Language Arts Exam",
    "NY23G7M": "New York NYSTP 2023 Grade 7 Math Exam",
    "NY23G7E": "New York NYSTP 2023 Grade 7 English Language Arts Exam",
    "NY23G8M": "New York NYSTP 2023 Grade 8 Math Exam",
    "NY23G8E": "New York NYSTP 2023 Grade 8 English Language Arts Exam",
    "NY23G8S": "New York NYSTP 2023 Grade 8 Science Exam",
    "NY22G3M": "New York NYSTP 2022 Grade 3 Math Exam",
    "NY22G3E": "New York NYSTP 2022 Grade 3 English Language Arts Exam",
    "NY22G4M": "New York NYSTP 2022 Grade 4 Math Exam",
    "NY22G4E": "New York NYSTP 2022 Grade 4 English Language Arts Exam",
    "NY22G4S": "New York NYSTP 2022 Grade 4 Science Exam",
    "NY22G5M": "New York NYSTP 2022 Grade 5 Math Exam",
    "NY22G5E": "New York NYSTP 2022 Grade 5 English Language Arts Exam",
    "NY22G6M": "New York NYSTP 2022 Grade 6 Math Exam",
    "NY22G6E": "New York NYSTP 2022 Grade 6 English Language Arts Exam",
    "NY22G7M": "New York NYSTP 2022 Grade 7 Math Exam",
    "NY22G7E": "New York NYSTP 2022 Grade 7 English Language Arts Exam",
    "NY22G8M": "New York NYSTP 2022 Grade 8 Math Exam",
    "NY22G8E": "New York NYSTP 2022 Grade 8 English Language Arts Exam",
    "NY22G8S": "New York NYSTP 2022 Grade 8 Science Exam",
    "NY21G3M": "New York NYSTP 2021 Grade 3 Math Exam",
    "NY21G3E": "New York NYSTP 2021 Grade 3 English Language Arts Exam",
    "NY21G4M": "New York NYSTP 2021 Grade 4 Math Exam",
    "NY21G4E": "New York NYSTP 2021 Grade 4 English Language Arts Exam",
    "NY21G4S": "New York NYSTP 2021 Grade 4 Science Exam",
    "NY21G5M": "New York NYSTP 2021 Grade 5 Math Exam",
    "NY21G5E": "New York NYSTP 2021 Grade 5 English Language Arts Exam",
    "NY21G6M": "New York NYSTP 2021 Grade 6 Math Exam",
    "NY21G6E": "New York NYSTP 2021 Grade 6 English Language Arts Exam",
    "NY21G7M": "New York NYSTP 2021 Grade 7 Math Exam",
    "NY21G7E": "New York NYSTP 2021 Grade 7 English Language Arts Exam",
    "NY21G8M": "New York NYSTP 2021 Grade 8 Math Exam",
    "NY21G8E": "New York NYSTP 2021 Grade 8 English Language Arts Exam",
    "NY21G8S": "New York NYSTP 2021 Grade 8 Science Exam",
    "NY19G3M": "New York NYSTP 2019 Grade 3 Math Exam",
    "NY19G3E": "New York NYSTP 2019 Grade 3 English Language Arts Exam",
    "NY19G4M": "New York NYSTP 2019 Grade 4 Math Exam",
    "NY19G4E": "New York NYSTP 2019 Grade 4 English Language Arts Exam",
    "NY19G4S": "New York NYSTP 2019 Grade 4 Science Exam",
    "NY19G5M": "New York NYSTP 2019 Grade 5 Math Exam",
    "NY19G5E": "New York NYSTP 2019 Grade 5 English Language Arts Exam",
    "NY19G6M": "New York NYSTP 2019 Grade 6 Math Exam",
    "NY19G6E": "New York NYSTP 2019 Grade 6 English Language Arts Exam",
    "NY19G7M": "New York NYSTP 2019 Grade 7 Math Exam",
    "NY19G7E": "New York NYSTP 2019 Grade 7 English Language Arts Exam",
    "NY19G8M": "New York NYSTP 2019 Grade 8 Math Exam",
    "NY19G8E": "New York NYSTP 2019 Grade 8 English Language Arts Exam",
    "NY19G8S": "New York NYSTP 2019 Grade 8 Science Exam",
    "NY18G3M": "New York NYSTP 2018 Grade 3 Math Exam",
    "NY18G3E": "New York NYSTP 2018 Grade 3 English Language Arts Exam",
    "NY18G4M": "New York NYSTP 2018 Grade 4 Math Exam",
    "NY18G4E": "New York NYSTP 2018 Grade 4 English Language Arts Exam",
    "NY18G4S": "New York NYSTP 2018 Grade 4 Science Exam",
    "NY18G5M": "New York NYSTP 2018 Grade 5 Math Exam",
    "NY18G5E": "New York NYSTP 2018 Grade 5 English Language Arts Exam",
    "NY18G6M": "New York NYSTP 2018 Grade 6 Math Exam",
    "NY18G6E": "New York NYSTP 2018 Grade 6 English Language Arts Exam",
    "NY18G7M": "New York NYSTP 2018 Grade 7 Math Exam",
    "NY18G7E": "New York NYSTP 2018 Grade 7 English Language Arts Exam",
    "NY18G8M": "New York NYSTP 2018 Grade 8 Math Exam",
    "NY18G8E": "New York NYSTP 2018 Grade 8 English Language Arts Exam",
    "NY18G8S": "New York NYSTP 2018 Grade 8 Science Exam",
    "NY17G3M": "New York NYSTP 2017 Grade 3 Math Exam",
    "NY17G3E": "New York NYSTP 2017 Grade 3 English Language Arts Exam",
    "NY17G4M": "New York NYSTP 2017 Grade 4 Math Exam",
    "NY17G4E": "New York NYSTP 2017 Grade 4 English Language Arts Exam",
    "NY17G4S": "New York NYSTP 2017 Grade 4 Science Exam",
    "NY17G5M": "New York NYSTP 2017 Grade 5 Math Exam",
    "NY17G5E": "New York NYSTP 2017 Grade 5 English Language Arts Exam",
    "NY17G6M": "New York NYSTP 2017 Grade 6 Math Exam",
    "NY17G6E": "New York NYSTP 2017 Grade 6 English Language Arts Exam",
    "NY17G7M": "New York NYSTP 2017 Grade 7 Math Exam",
    "NY17G7E": "New York NYSTP 2017 Grade 7 English Language Arts Exam",
    "NY17G8M": "New York NYSTP 2017 Grade 8 Math Exam",
    "NY17G8E": "New York NYSTP 2017 Grade 8 English Language Arts Exam",
    "NY17G8S": "New York NYSTP 2017 Grade 8 Science Exam",
    "NY16G3M": "New York NYSTP 2016 Grade 3 Math Exam",
    "NY16G3E": "New York NYSTP 2016 Grade 3 English Language Arts Exam",
    "NY16G4M": "New York NYSTP 2016 Grade 4 Math Exam",
    "NY16G4E": "New York NYSTP 2016 Grade 4 English Language Arts Exam",
    "NY16G4S": "New York NYSTP 2016 Grade 4 Science Exam",
    "NY16G5M": "New York NYSTP 2016 Grade 5 Math Exam",
    "NY16G5E": "New York NYSTP 2016 Grade 5 English Language Arts Exam",
    "NY16G6M": "New York NYSTP 2016 Grade 6 Math Exam",
    "NY16G6E": "New York NYSTP 2016 Grade 6 English Language Arts Exam",
    "NY16G7M": "New York NYSTP 2016 Grade 7 Math Exam",
    "NY16G7E": "New York NYSTP 2016 Grade 7 English Language Arts Exam",
    "NY16G8M": "New York NYSTP 2016 Grade 8 Math Exam",
    "NY16G8E": "New York NYSTP 2016 Grade 8 English Language Arts Exam",
    "NY16G8S": "New York NYSTP 2016 Grade 8 Science Exam",
    "NY15G3M": "New York NYSTP 2015 Grade 3 Math Exam",
    "NY15G3E": "New York NYSTP 2015 Grade 3 English Language Arts Exam",
    "NY15G4M": "New York NYSTP 2015 Grade 4 Math Exam",
    "NY15G4E": "New York NYSTP 2015 Grade 4 English Language Arts Exam",
    "NY15G4S": "New York NYSTP 2015 Grade 4 Science Exam",
    "NY15G5M": "New York NYSTP 2015 Grade 5 Math Exam",
    "NY15G5E": "New York NYSTP 2015 Grade 5 English Language Arts Exam",
    "NY15G6M": "New York NYSTP 2015 Grade 6 Math Exam",
    "NY15G6E": "New York NYSTP 2015 Grade 6 English Language Arts Exam",
    "NY15G7M": "New York NYSTP 2015 Grade 7 Math Exam",
    "NY15G7E": "New York NYSTP 2015 Grade 7 English Language Arts Exam",
    "NY15G8M": "New York NYSTP 2015 Grade 8 Math Exam",
    "NY15G8E": "New York NYSTP 2015 Grade 8 English Language Arts Exam",
    "NY15G8S": "New York NYSTP 2015 Grade 8 Science Exam",
    "PA23G3M": "Pennsylvania PSSA 2023 Grade 3 Math Exam",
    "PA23G3E": "Pennsylvania PSSA 2023 Grade 3 English Language Arts Exam",
    "PA23G4M": "Pennsylvania PSSA 2023 Grade 4 Math Exam",
    "PA23G4E": "Pennsylvania PSSA 2023 Grade 4 English Language Arts Exam",
    "PA23G4S": "Pennsylvania PSSA 2023 Grade 4 Science Exam",
    "PA23G5M": "Pennsylvania PSSA 2023 Grade 5 Math Exam",
    "PA23G5E": "Pennsylvania PSSA 2023 Grade 5 English Language Arts Exam",
    "PA23G6M": "Pennsylvania PSSA 2023 Grade 6 Math Exam",
    "PA23G6E": "Pennsylvania PSSA 2023 Grade 6 English Language Arts Exam",
    "PA23G7M": "Pennsylvania PSSA 2023 Grade 7 Math Exam",
    "PA23G7E": "Pennsylvania PSSA 2023 Grade 7 English Language Arts Exam",
    "PA23G8M": "Pennsylvania PSSA 2023 Grade 8 Math Exam",
    "PA23G8E": "Pennsylvania PSSA 2023 Grade 8 English Language Arts Exam",
    "PA23G8S": "Pennsylvania PSSA 2023 Grade 8 Science Exam",
    "PA22G3M": "Pennsylvania PSSA 2022 Grade 3 Math Exam",
    "PA22G3E": "Pennsylvania PSSA 2022 Grade 3 English Language Arts Exam",
    "PA22G4M": "Pennsylvania PSSA 2022 Grade 4 Math Exam",
    "PA22G4E": "Pennsylvania PSSA 2022 Grade 4 English Language Arts Exam",
    "PA22G4S": "Pennsylvania PSSA 2022 Grade 4 Science Exam",
    "PA22G5M": "Pennsylvania PSSA 2022 Grade 5 Math Exam",
    "PA22G5E": "Pennsylvania PSSA 2022 Grade 5 English Language Arts Exam",
    "PA22G6M": "Pennsylvania PSSA 2022 Grade 6 Math Exam",
    "PA22G6E": "Pennsylvania PSSA 2022 Grade 6 English Language Arts Exam",
    "PA22G7M": "Pennsylvania PSSA 2022 Grade 7 Math Exam",
    "PA22G7E": "Pennsylvania PSSA 2022 Grade 7 English Language Arts Exam",
    "PA22G8M": "Pennsylvania PSSA 2022 Grade 8 Math Exam",
    "PA22G8E": "Pennsylvania PSSA 2022 Grade 8 English Language Arts Exam",
    "PA22G8S": "Pennsylvania PSSA 2022 Grade 8 Science Exam",
    "PA21G3M": "Pennsylvania PSSA 2021 Grade 3 Math Exam",
    "PA21G3E": "Pennsylvania PSSA 2021 Grade 3 English Language Arts Exam",
    "PA21G4M": "Pennsylvania PSSA 2021 Grade 4 Math Exam",
    "PA21G4E": "Pennsylvania PSSA 2021 Grade 4 English Language Arts Exam",
    "PA21G4S": "Pennsylvania PSSA 2021 Grade 4 Science Exam",
    "PA21G5M": "Pennsylvania PSSA 2021 Grade 5 Math Exam",
    "PA21G5E": "Pennsylvania PSSA 2021 Grade 5 English Language Arts Exam",
    "PA21G6M": "Pennsylvania PSSA 2021 Grade 6 Math Exam",
    "PA21G6E": "Pennsylvania PSSA 2021 Grade 6 English Language Arts Exam",
    "PA21G7M": "Pennsylvania PSSA 2021 Grade 7 Math Exam",
    "PA21G7E": "Pennsylvania PSSA 2021 Grade 7 English Language Arts Exam",
    "PA21G8M": "Pennsylvania PSSA 2021 Grade 8 Math Exam",
    "PA21G8E": "Pennsylvania PSSA 2021 Grade 8 English Language Arts Exam",
    "PA21G8S": "Pennsylvania PSSA 2021 Grade 8 Science Exam",
    "PA19G3M": "Pennsylvania PSSA 2019 Grade 3 Math Exam",
    "PA19G3E": "Pennsylvania PSSA 2019 Grade 3 English Language Arts Exam",
    "PA19G4M": "Pennsylvania PSSA 2019 Grade 4 Math Exam",
    "PA19G4E": "Pennsylvania PSSA 2019 Grade 4 English Language Arts Exam",
    "PA19G4S": "Pennsylvania PSSA 2019 Grade 4 Science Exam",
    "PA19G5M": "Pennsylvania PSSA 2019 Grade 5 Math Exam",
    "PA19G5E": "Pennsylvania PSSA 2019 Grade 5 English Language Arts Exam",
    "PA19G6M": "Pennsylvania PSSA 2019 Grade 6 Math Exam",
    "PA19G6E": "Pennsylvania PSSA 2019 Grade 6 English Language Arts Exam",
    "PA19G7M": "Pennsylvania PSSA 2019 Grade 7 Math Exam",
    "PA19G7E": "Pennsylvania PSSA 2019 Grade 7 English Language Arts Exam",
    "PA19G8M": "Pennsylvania PSSA 2019 Grade 8 Math Exam",
    "PA19G8E": "Pennsylvania PSSA 2019 Grade 8 English Language Arts Exam",
    "PA19G8S": "Pennsylvania PSSA 2019 Grade 8 Science Exam",
    "PA18G3M": "Pennsylvania PSSA 2018 Grade 3 Math Exam",
    "PA18G3E": "Pennsylvania PSSA 2018 Grade 3 English Language Arts Exam",
    "PA18G4M": "Pennsylvania PSSA 2018 Grade 4 Math Exam",
    "PA18G4E": "Pennsylvania PSSA 2018 Grade 4 English Language Arts Exam",
    "PA18G4S": "Pennsylvania PSSA 2018 Grade 4 Science Exam",
    "PA18G5M": "Pennsylvania PSSA 2018 Grade 5 Math Exam",
    "PA18G5E": "Pennsylvania PSSA 2018 Grade 5 English Language Arts Exam",
    "PA18G6M": "Pennsylvania PSSA 2018 Grade 6 Math Exam",
    "PA18G6E": "Pennsylvania PSSA 2018 Grade 6 English Language Arts Exam",
    "PA18G7M": "Pennsylvania PSSA 2018 Grade 7 Math Exam",
    "PA18G7E": "Pennsylvania PSSA 2018 Grade 7 English Language Arts Exam",
    "PA18G8M": "Pennsylvania PSSA 2018 Grade 8 Math Exam",
    "PA18G8E": "Pennsylvania PSSA 2018 Grade 8 English Language Arts Exam",
    "PA18G8S": "Pennsylvania PSSA 2018 Grade 8 Science Exam",
    "PA16G3M": "Pennsylvania PSSA 2016 Grade 3 Math Exam",
    "PA16G3E": "Pennsylvania PSSA 2016 Grade 3 English Language Arts Exam",
    "PA16G4M": "Pennsylvania PSSA 2016 Grade 4 Math Exam",
    "PA16G4E": "Pennsylvania PSSA 2016 Grade 4 English Language Arts Exam",
    "PA16G4S": "Pennsylvania PSSA 2016 Grade 4 Science Exam",
    "PA16G5M": "Pennsylvania PSSA 2016 Grade 5 Math Exam",
    "PA16G5E": "Pennsylvania PSSA 2016 Grade 5 English Language Arts Exam",
    "PA16G6M": "Pennsylvania PSSA 2016 Grade 6 Math Exam",
    "PA16G6E": "Pennsylvania PSSA 2016 Grade 6 English Language Arts Exam",
    "PA16G7M": "Pennsylvania PSSA 2016 Grade 7 Math Exam",
    "PA16G7E": "Pennsylvania PSSA 2016 Grade 7 English Language Arts Exam",
    "PA16G8M": "Pennsylvania PSSA 2016 Grade 8 Math Exam",
    "PA16G8E": "Pennsylvania PSSA 2016 Grade 8 English Language Arts Exam",
    "PA16G8S": "Pennsylvania PSSA 2016 Grade 8 Science Exam",
    "PA15G3M": "Pennsylvania PSSA 2015 Grade 3 Math Exam",
    "PA15G3E": "Pennsylvania PSSA 2015 Grade 3 English Language Arts Exam",
    "PA15G4M": "Pennsylvania PSSA 2015 Grade 4 Math Exam",
    "PA15G4E": "Pennsylvania PSSA 2015 Grade 4 English Language Arts Exam",
    "PA15G4S": "Pennsylvania PSSA 2015 Grade 4 Science Exam",
    "PA15G5M": "Pennsylvania PSSA 2015 Grade 5 Math Exam",
    "PA15G5E": "Pennsylvania PSSA 2015 Grade 5 English Language Arts Exam",
    "PA15G6M": "Pennsylvania PSSA 2015 Grade 6 Math Exam",
    "PA15G6E": "Pennsylvania PSSA 2015 Grade 6 English Language Arts Exam",
    "PA15G7M": "Pennsylvania PSSA 2015 Grade 7 Math Exam",
    "PA15G7E": "Pennsylvania PSSA 2015 Grade 7 English Language Arts Exam",
    "PA15G8M": "Pennsylvania PSSA 2015 Grade 8 Math Exam",
    "PA15G8E": "Pennsylvania PSSA 2015 Grade 8 English Language Arts Exam",
    "PA15G8S": "Pennsylvania PSSA 2015 Grade 8 Science Exam",
    "RI22G3M": "Rhode Island RICAS 2022 Grade 3 Math Exam",
    "RI21G3M": "Rhode Island RICAS 2021 Grade 3 Math Exam",
    "RI19G3M": "Rhode Island RICAS 2019 Grade 3 Math Exam",
    "RI18G3M": "Rhode Island RICAS 2018 Grade 3 Math Exam",
    "RI22G3E": "Rhode Island RICAS 2022 Grade 3 English Language Arts Exam",
    "RI21G3E": "Rhode Island RICAS 2021 Grade 3 English Language Arts Exam",
    "RI19G3E": "Rhode Island RICAS 2019 Grade 3 English Language Arts Exam",
    "RI18G3E": "Rhode Island RICAS 2018 Grade 3 English Language Arts Exam",
    "RI22G4M": "Rhode Island RICAS 2022 Grade 4 Math Exam",
    "RI21G4M": "Rhode Island RICAS 2021 Grade 4 Math Exam",
    "RI19G4M": "Rhode Island RICAS 2019 Grade 4 Math Exam",
    "RI18G4M": "Rhode Island RICAS 2018 Grade 4 Math Exam",
    "RI22G4E": "Rhode Island RICAS 2022 Grade 4 English Language Arts Exam",
    "RI21G4E": "Rhode Island RICAS 2021 Grade 4 English Language Arts Exam",
    "RI19G4E": "Rhode Island RICAS 2019 Grade 4 English Language Arts Exam",
    "RI18G4E": "Rhode Island RICAS 2018 Grade 4 English Language Arts Exam",
    "RI22G5M": "Rhode Island RICAS 2022 Grade 5 Math Exam",
    "RI21G5M": "Rhode Island RICAS 2021 Grade 5 Math Exam",
    "RI19G5M": "Rhode Island RICAS 2019 Grade 5 Math Exam",
    "RI18G5M": "Rhode Island RICAS 2018 Grade 5 Math Exam",
    "RI22G5E": "Rhode Island RICAS 2022 Grade 5 English Language Arts Exam",
    "RI21G5E": "Rhode Island RICAS 2021 Grade 5 English Language Arts Exam",
    "RI19G5E": "Rhode Island RICAS 2019 Grade 5 English Language Arts Exam",
    "RI18G5E": "Rhode Island RICAS 2018 Grade 5 English Language Arts Exam",
    "RI22G6M": "Rhode Island RICAS 2022 Grade 6 Math Exam",
    "RI21G6M": "Rhode Island RICAS 2021 Grade 6 Math Exam",
    "RI19G6M": "Rhode Island RICAS 2019 Grade 6 Math Exam",
    "RI18G6M": "Rhode Island RICAS 2018 Grade 6 Math Exam",
    "RI22G6E": "Rhode Island RICAS 2022 Grade 6 English Language Arts Exam",
    "RI21G6E": "Rhode Island RICAS 2021 Grade 6 English Language Arts Exam",
    "RI19G6E": "Rhode Island RICAS 2019 Grade 6 English Language Arts Exam",
    "RI18G6E": "Rhode Island RICAS 2018 Grade 6 English Language Arts Exam",
    "RI22G7M": "Rhode Island RICAS 2022 Grade 7 Math Exam",
    "RI21G7M": "Rhode Island RICAS 2021 Grade 7 Math Exam",
    "RI19G7M": "Rhode Island RICAS 2019 Grade 7 Math Exam",
    "RI18G7M": "Rhode Island RICAS 2018 Grade 7 Math Exam",
    "RI22G7E": "Rhode Island RICAS 2022 Grade 7 English Language Arts Exam",
    "RI21G7E": "Rhode Island RICAS 2021 Grade 7 English Language Arts Exam",
    "RI19G7E": "Rhode Island RICAS 2019 Grade 7 English Language Arts Exam",
    "RI18G7E": "Rhode Island RICAS 2018 Grade 7 English Language Arts Exam",
    "RI22G8M": "Rhode Island RICAS 2022 Grade 8 Math Exam",
    "RI21G8M": "Rhode Island RICAS 2021 Grade 8 Math Exam",
    "RI19G8M": "Rhode Island RICAS 2019 Grade 8 Math Exam",
    "RI18G8M": "Rhode Island RICAS 2018 Grade 8 Math Exam",
    "RI22G8E": "Rhode Island RICAS 2022 Grade 8 English Language Arts Exam",
    "RI21G8E": "Rhode Island RICAS 2021 Grade 8 English Language Arts Exam",
    "RI19G8E": "Rhode Island RICAS 2019 Grade 8 English Language Arts Exam",
    "RI18G8E": "Rhode Island RICAS 2018 Grade 8 English Language Arts Exam",
    "SAT1M1": "The SAT Practice Test #1 - Math, Module 1",
    "SAT1M2": "The SAT Practice Test #1 - Math, Module 2",
    "SAT1RW1": "The SAT Practice Test #1 - Reading & Writing, Module 1",
    "SAT1RW2": "The SAT Practice Test #1 - Reading & Writing, Module 2",
    "SC18G3M": "South Carolina SC READY Grade 3 Math Practice Exam",
    "SC18G3E": "South Carolina SC READY Grade 3 English Language Arts Practice Exam",
    "SC18G4M": "South Carolina SC READY Grade 4 Math Practice Exam",
    "SC18G4E": "South Carolina SC READY Grade 4 English Language Arts Practice Exam",
    "SC18G4S": "South Carolina SC PASS Grade 4 Science Practice Exam",
    "SC18G5M": "South Carolina SC READY Grade 5 Math Practice Exam",
    "SC18G5E": "South Carolina SC READY Grade 5 English Language Arts Practice Exam",
    "SC18G6M": "South Carolina SC READY Grade 6 Math Practice Exam",
    "SC18G6E": "South Carolina SC READY Grade 6 English Language Arts Practice Exam",
    "SC18G6S": "South Carolina SC PASS Grade 6 Science Practice Exam",
    "SC18G7M": "South Carolina SC READY Grade 7 Math Practice Exam",
    "SC18G7E": "South Carolina SC READY Grade 7 English Language Arts Practice Exam",
    "SC18G8M": "South Carolina SC READY Grade 8 Math Practice Exam",
    "SC18G8E": "South Carolina SC READY Grade 8 English Language Arts Practice Exam",
    "TN20G3M": "Tennessee TCAP Grade 3 Math Practice Exam",
    "TN20G3E": "Tennessee TCAP Grade 3 English Language Arts Practice Exam",
    "TN20G3S": "Tennessee TCAP Grade 3 Science Practice Exam",
    "TN20G4M": "Tennessee TCAP Grade 4 Math Practice Exam",
    "TN20G4E": "Tennessee TCAP Grade 4 English Language Arts Practice Exam",
    "TN20G4S": "Tennessee TCAP Grade 4 Science Practice Exam",
    "TN20G5M": "Tennessee TCAP Grade 5 Math Practice Exam",
    "TN20G5E": "Tennessee TCAP Grade 5 English Language Arts Practice Exam",
    "TN20G5S": "Tennessee TCAP Grade 5 Science Practice Exam",
    "TN20G6M": "Tennessee TCAP Grade 6 Math Practice Exam",
    "TN20G6E": "Tennessee TCAP Grade 6 English Language Arts Practice Exam",
    "TN20G6S": "Tennessee TCAP Grade 6 Science Practice Exam",
    "TN20G6SS": "Tennessee TCAP Grade 6 Social Studies Practice Exam",
    "TN20G7M": "Tennessee TCAP Grade 7 Math Practice Exam",
    "TN20G7E": "Tennessee TCAP Grade 7 English Language Arts Practice Exam",
    "TN20G7S": "Tennessee TCAP Grade 7 Science Practice Exam",
    "TN20G7SS": "Tennessee TCAP Grade 7 Social Studies Practice Exam",
    "TN20G8M": "Tennessee TCAP Grade 8 Math Practice Exam",
    "TN20G8E": "Tennessee TCAP Grade 8 English Language Arts Practice Exam",
    "TN20G8S": "Tennessee TCAP Grade 8 Science Practice Exam",
    "TN20G8SS": "Tennessee TCAP Grade 8 Social Studies Practice Exam",
    "TX22G3M": "Texas STAAR 2022 Grade 3 Math Exam",
    "TX21G3M": "Texas STAAR 2021 Grade 3 Math Exam",
    "TX19G3M": "Texas STAAR 2019 Grade 3 Math Exam",
    "TX18G3M": "Texas STAAR 2018 Grade 3 Math Exam",
    "TX17G3M": "Texas STAAR 2017 Grade 3 Math Exam",
    "TX22G3R": "Texas STAAR 2022 Grade 3 Reading Exam",
    "TX21G3R": "Texas STAAR 2021 Grade 3 Reading Exam",
    "TX19G3R": "Texas STAAR 2019 Grade 3 Reading Exam",
    "TX18G3R": "Texas STAAR 2018 Grade 3 Reading Exam",
    "TX17G3R": "Texas STAAR 2017 Grade 3 Reading Exam",
    "TX22G4M": "Texas STAAR 2022 Grade 4 Math Exam",
    "TX21G4M": "Texas STAAR 2021 Grade 4 Math Exam",
    "TX19G4M": "Texas STAAR 2019 Grade 4 Math Exam",
    "TX18G4M": "Texas STAAR 2018 Grade 4 Math Exam",
    "TX17G4M": "Texas STAAR 2017 Grade 4 Math Exam",
    "TX22G4R": "Texas STAAR 2022 Grade 4 Reading Exam",
    "TX21G4R": "Texas STAAR 2021 Grade 4 Reading Exam",
    "TX19G4R": "Texas STAAR 2019 Grade 4 Reading Exam",
    "TX18G4R": "Texas STAAR 2018 Grade 4 Reading Exam",
    "TX17G4R": "Texas STAAR 2017 Grade 4 Reading Exam",
    "TX22G5M": "Texas STAAR 2022 Grade 5 Math Exam",
    "TX21G5M": "Texas STAAR 2021 Grade 5 Math Exam",
    "TX19G5M": "Texas STAAR 2019 Grade 5 Math Exam",
    "TX18G5M": "Texas STAAR 2018 Grade 5 Math Exam",
    "TX17G5M": "Texas STAAR 2017 Grade 5 Math Exam",
    "TX22G5R": "Texas STAAR 2022 Grade 5 Reading Exam",
    "TX21G5R": "Texas STAAR 2021 Grade 5 Reading Exam",
    "TX19G5R": "Texas STAAR 2019 Grade 5 Reading Exam",
    "TX18G5R": "Texas STAAR 2018 Grade 5 Reading Exam",
    "TX17G5R": "Texas STAAR 2017 Grade 5 Reading Exam",
    "TX22G5S": "Texas STAAR 2022 Grade 5 Science Exam",
    "TX21G5S": "Texas STAAR 2021 Grade 5 Science Exam",
    "TX19G5S": "Texas STAAR 2019 Grade 5 Science Exam",
    "TX18G5S": "Texas STAAR 2018 Grade 5 Science Exam",
    "TX22G6M": "Texas STAAR 2022 Grade 6 Math Exam",
    "TX21G6M": "Texas STAAR 2021 Grade 6 Math Exam",
    "TX19G6M": "Texas STAAR 2019 Grade 6 Math Exam",
    "TX18G6M": "Texas STAAR 2018 Grade 6 Math Exam",
    "TX17G6M": "Texas STAAR 2017 Grade 6 Math Exam",
    "TX22G6R": "Texas STAAR 2022 Grade 6 Reading Exam",
    "TX21G6R": "Texas STAAR 2021 Grade 6 Reading Exam",
    "TX19G6R": "Texas STAAR 2019 Grade 6 Reading Exam",
    "TX18G6R": "Texas STAAR 2018 Grade 6 Reading Exam",
    "TX17G6R": "Texas STAAR 2017 Grade 6 Reading Exam",
    "TX22G7M": "Texas STAAR 2022 Grade 7 Math Exam",
    "TX21G7M": "Texas STAAR 2021 Grade 7 Math Exam",
    "TX19G7M": "Texas STAAR 2019 Grade 7 Math Exam",
    "TX18G7M": "Texas STAAR 2018 Grade 7 Math Exam",
    "TX17G7M": "Texas STAAR 2017 Grade 7 Math Exam",
    "TX22G7R": "Texas STAAR 2022 Grade 7 Reading Exam",
    "TX21G7R": "Texas STAAR 2021 Grade 7 Reading Exam",
    "TX19G7R": "Texas STAAR 2019 Grade 7 Reading Exam",
    "TX18G7R": "Texas STAAR 2018 Grade 7 Reading Exam",
    "TX17G7R": "Texas STAAR 2017 Grade 7 Reading Exam",
    "TX22G8M": "Texas STAAR 2022 Grade 8 Math Exam",
    "TX21G8M": "Texas STAAR 2021 Grade 8 Math Exam",
    "TX19G8M": "Texas STAAR 2019 Grade 8 Math Exam",
    "TX18G8M": "Texas STAAR 2018 Grade 8 Math Exam",
    "TX17G8M": "Texas STAAR 2017 Grade 8 Math Exam",
    "TX22G8R": "Texas STAAR 2022 Grade 8 Reading Exam",
    "TX21G8R": "Texas STAAR 2021 Grade 8 Reading Exam",
    "TX19G8R": "Texas STAAR 2019 Grade 8 Reading Exam",
    "TX18G8R": "Texas STAAR 2018 Grade 8 Reading Exam",
    "TX17G8R": "Texas STAAR 2017 Grade 8 Reading Exam",
    "TX22G8S": "Texas STAAR 2022 Grade 8 Science Exam",
    "TX21G8S": "Texas STAAR 2021 Grade 8 Science Exam",
    "TX19G8S": "Texas STAAR 2019 Grade 8 Science Exam",
    "TX18G8S": "Texas STAAR 2018 Grade 8 Science Exam",
    "TX22G8SS": "Texas STAAR 2022 Grade 8 Social Studies Exam",
    "TX21G8SS": "Texas STAAR 2021 Grade 8 Social Studies Exam",
    "TX19G8SS": "Texas STAAR 2019 Grade 8 Social Studies Exam",
    "TX18G8SS": "Texas STAAR 2018 Grade 8 Social Studies Exam",
    "TX22HSA1": "Texas STAAR 2022 Algebra I Exam",
    "TX21HSA1": "Texas STAAR 2021 Algebra I Exam",
    "TX19HSA1": "Texas STAAR 2019 Algebra I Exam",
    "TX18HSA1": "Texas STAAR 2018 Algebra I Exam",
    "TX17HSA1": "Texas STAAR 2017 Algebra I Exam",
    "TX22HSB": "Texas STAAR 2022 Biology Exam",
    "TX21HSB": "Texas STAAR 2021 Biology Exam",
    "TX19HSB": "Texas STAAR 2019 Biology Exam",
    "TX18HSB": "Texas STAAR 2018 Biology Exam",
    "TX17HSB": "Texas STAAR 2017 Biology Exam",
    "TX22HSE1": "Texas STAAR 2022 English I Exam",
    "TX21HSE1": "Texas STAAR 2021 English I Exam",
    "TX19HSE1": "Texas STAAR 2019 English I Exam",
    "TX18HSE1": "Texas STAAR 2018 English I Exam",
    "TX17HSE1": "Texas STAAR 2017 English I Exam",
    "TX22HSE2": "Texas STAAR 2022 English II Exam",
    "TX21HSE2": "Texas STAAR 2021 English II Exam",
    "TX19HSE2": "Texas STAAR 2019 English II Exam",
    "TX18HSE2": "Texas STAAR 2018 English II Exam",
    "TX17HSE2": "Texas STAAR 2017 English II Exam",
    "TX22HSUSH": "Texas STAAR 2022 U.S. History Exam",
    "TX21HSUSH": "Texas STAAR 2021 U.S. History Exam",
    "TX19HSUSH": "Texas STAAR 2019 U.S. History Exam",
    "TX18HSUSH": "Texas STAAR 2018 U.S. History Exam",
    "TX17HSUSH": "Texas STAAR 2017 U.S. History Exam",
    "WIG3M": "Wisconsin WFE Grade 3 Math Practice Exam",
    "WIG3E": "Wisconsin WFE Grade 3 English Language Arts Practice Exam",
    "WIG4M": "Wisconsin WFE Grade 4 Math Practice Exam",
    "WIG4E": "Wisconsin WFE Grade 4 English Language Arts Practice Exam",
    "WIG4S": "Wisconsin WFE Grade 4 Science Practice Exam",
    "WIG4SS": "Wisconsin WFE Grade 4 Social Studies Practice Exam",
    "WIG5M": "Wisconsin WFE Grade 5 Math Practice Exam",
    "WIG5E": "Wisconsin WFE Grade 5 English Language Arts Practice Exam",
    "WIG6M": "Wisconsin WFE Grade 6 Math Practice Exam",
    "WIG6E": "Wisconsin WFE Grade 6 English Language Arts Practice Exam",
    "WIG7M": "Wisconsin WFE Grade 7 Math Practice Exam",
    "WIG7E": "Wisconsin WFE Grade 7 English Language Arts Practice Exam",
    "WIG8M": "Wisconsin WFE Grade 8 Math Practice Exam",
    "WIG8E": "Wisconsin WFE Grade 8 English Language Arts Practice Exam",
    "WIG8S": "Wisconsin WFE Grade 8 Science Practice Exam",
    "WIG8SS": "Wisconsin WFE Grade 8 Social Studies Practice Exam",
    "WIG10SS": "Wisconsin WFE Grade 10 Social Studies Practice Exam",
    "SAT1": "The SAT Practice Test #1",
    "SAT2": "The SAT Practice Test #2",
    "SAT3": "The SAT Practice Test #3",
    "SAT4": "The SAT Practice Test #4",
    "SAT5": "The SAT Practice Test #5",
    "SAT6": "The SAT Practice Test #6",
    "SAT7": "The SAT Practice Test #7",
    "SAT8": "The SAT Practice Test #8",
    "SAT9": "The SAT Practice Test #9",
    "SAT10": "The SAT Practice Test #10",
    "PSAT1": "PSAT/NMSQT Practice Test #1",
    "PSAT101": "PSAT 10 Practice Test #1",
    "PSAT102": "PSAT 10 Practice Test #2",
    "PSAT891": "PSAT 8/9 Practice Test #1"
  };

  photoURL = "";
  create_s: boolean = false;
  edit_s_list: { [index: string]: any } = {};
  student_uid: string = "";
  create_c: boolean = false;
  edit_c_list: { [index: string]: any } = {};
  class_uid: string = "";

  exam_name = '';
  exam_url = '';
  exam_id = '';
  exam_dl = 0;
  exam_fav = false;
  file_source = '';
  file_page = 1;

  supp_dump: any = {};
  supp_st_dump: any = {};
  st_refsheet_source: string = '';

  selected_topic = "";
  selected_subtopic = "";
  standard_id = '';
  standard_fav = false;
  includes_standard = false;
  subtopic_problem_count = 0;
  subtopic_problem_number = 0;
  subtopic_search_dump: { [key: number]: { 'Number': any, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = {};
  subtopic_problem_selection: string[][] = [];
  subtopic_problem_attempts: number[] = [];
  subtopic_attempt_path: any[] = [];
  subtopic_attempt_response: string[] = [];
  subtopic_attempt_explanation: string[][] = [];
  m_selection: string[] = ["", ""];
  m_submission: { [key: string]: string } = {};
  m_shuffled = false;
  choices_sequence: string[] = [];
  shuffle_choices: string[] = [];
  random_index = 0
  random_list: string[] = [];

  viewerWidth = Math.round(window.innerWidth * .99).toString() + "px";
  viewerHeight = Math.round(window.innerHeight * .95).toString() + "px";

  subject_labels: { [key: string]: string } = {
    "Algebra I": "Algebra I",
    "Biology": "Biology",
    "English I": "English I",
    "English II": "English II",
    "English Language Arts": "Language Arts",
    "English Reading": "Reading",
    "Mathematics": "Math",
    "Science": "Science",
    "Social Studies": "Social Studies",
    "U.S. History": "U.S. History",
  };

  constructor(public router: Router, private titleService: Title, private meta: Meta, public authService: AuthService, private http: HttpClient) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  width_change2() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  can_assign_s(std: string) {
    return (!Object.keys(this.all_students_data[std].exams.history).includes(this.exam_id));
  }

  can_assign_c(clss: string) {
    return (!this.my_class_metadata[this.authService.userData.classes.indexOf(clss)-1].assignments.includes(this.exam_id));
  }

  read_supp_json(path: string) {
      this.http.get("./assets/" + path).subscribe(res => {
          console.log(res);
          console.log(JSON.stringify(res));
          this.supp_dump[path] = res;
          for (let block of this.supp_dump[path].Content) {
              if (block[1].endsWith('.json')) {
                  this.read_supp_json(block[1]);
              }
          }
      });
  }

  read_supp_st_json(path: string) {
    this.http.get("./assets/" + path).subscribe(res => {
      console.log(res);
      console.log(JSON.stringify(res));
      this.supp_st_dump[path] = res;
      for (let block of this.supp_st_dump[path].Content) {
          if (block[1].endsWith('.json')) {
              this.read_supp_st_json(block[1]);
          }
      }
    });
  }

  get_percent_correct(stud: any) {
    return Math.round(10000 * stud.problems.correct / stud.problems.total) / 100;
  }

  get_exam_count(stud: any) {
    this.complete_exam_count = 0;
    this.inprog_exam_count = 0;
    const exam_history = stud.exams.history;
    for (const [key, det] of Object.entries(exam_history)) {
      if ((det as any).status == "Completed") {
        this.complete_exam_count += 1;
      }
      else if (["Started", "Assigned"].includes((det as any).status)) {
        this.inprog_exam_count += 1;
      }
    }
    return [this.complete_exam_count, this.inprog_exam_count];
  }

  select_class(uid: string) {
    this.router.navigateByUrl('class/' + uid);
  }
  
  select_student(id: string) {
    if (this.selected_stud != id) {
      this.selected_stud = id;
      this.student_data = this.authService.searchUserId(id);
      setTimeout(() => {
        const exam_history = this.student_data.exams.history;
        this.inprogress_set = [];
        this.inprogress_exams = {};
        for (const [key, det] of Object.entries(exam_history)) {
          if (["Started", "Assigned"].includes((det as any).status)) {
            this.inprogress_set.push(key);
            this.inprogress_exams[key] = { status: (det as any).status, progress: (det as any).progress, lastdate: new Date((det as any).lasttimestamp).toLocaleDateString(), lasttime: new Date((det as any).lasttimestamp).toLocaleTimeString()};
          }
        }
      }, 200);
    }
    else {
      this.selected_stud = "";
      this.student_data = [];
      this.inprogress_set = [];
      this.inprogress_exams = {};
    }
  }

  select_exam(ex: string) {
    this.exam_dl = (this.authService.searchExamId(ex)).downloads;
    setTimeout(() => {
      console.log(this.exam_dl);
      this.exam_dl = (this.authService.searchExamId(ex)).downloads;
      console.log(this.exam_dl);
      this.exam_id = ex;
      this.exam_url = '/exam/' + ex;
      this.file_source = "./assets/exams/" + ex + ".pdf";
      this.file_page = 1;
      this.exam_name = this.exam_names[ex];
      if (this.authService.userData) {
        for (let exm of this.authService.userData.exams.favorites) {
          if (ex == exm) {
            this.exam_fav = true;
          }
        }
      }
    }, 250);
  }

  select_standard(topic: string, subtopic: string) {
    this.subtopic_problem_count = 0;
    this.subtopic_search_dump = {};
    for (const [ex, dump] of Object.entries(this.dump_dict)) {
      for (const [num, prob] of Object.entries(dump)) {
        if (typeof prob.SubTopics != 'undefined' && !this.exam_attribute_dump[ex].HideTopics) {
          if (prob.SubTopics.includes(subtopic)) {
            if (prob.Topics[prob.SubTopics.indexOf(subtopic)] == topic) {
              this.subtopic_problem_count += 1;
              this.subtopic_search_dump[this.subtopic_problem_count] = prob;
              this.subtopic_search_dump[this.subtopic_problem_count].Number = ex + '-' + '' + this.subtopic_search_dump[this.subtopic_problem_count].Number;
            }
          }
        }
      }
    }
    this.selected_topic = topic;
    this.selected_subtopic = subtopic;
    this.subtopic_problem_number = 1;
    this.subtopic_attempt_path = [];
    this.subtopic_attempt_response = [];
    this.subtopic_attempt_explanation = [];
    this.subtopic_problem_selection = [];
    if (Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).length == 0) {
        this.subtopic_problem_attempts = [0];
        this.subtopic_attempt_path = [[]];
        this.subtopic_attempt_response = [''];
        this.subtopic_attempt_explanation = [[]];
        if (['MC', 'FR', 'LR'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
            this.subtopic_problem_selection = [['']];
        }
        else if (['MS', 'O'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
            this.subtopic_problem_selection = [[]];
        }
    }
    else {
        this.subtopic_problem_attempts = [];
        for (let part of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts)) {
            this.subtopic_problem_attempts.push(0);
            this.subtopic_attempt_path.push([]);
            this.subtopic_attempt_response.push('');
            this.subtopic_attempt_explanation.push([]);
            if (['MC', 'FR', 'LR'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
                this.subtopic_problem_selection.push(['']);
            }
            else if (['MS', 'O'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
                this.subtopic_problem_selection.push([]);
            }
        }
    }
    this.standard_id = topic + ": " + subtopic;
    this.standard_fav = false;
    this.st_refsheet_source = '../../' + this.exam_attribute_dump[(this.subtopic_search_dump[this.subtopic_problem_number].Number).substring(0, (this.subtopic_search_dump[this.subtopic_problem_number].Number).indexOf('-'))].RefSheet;
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

  toggle_create_student() {
    const avatar = this.avatars[Math.floor(Math.random() * this.avatars.length)];
    this.photoURL = '/assets/icons/user/' + avatar + '.png';
    this.create_s = !this.create_s;
    this.edit_s_list = [];
    this.edit_s_list['photoURL'] = this.photoURL;
  }

  edit_student(field: string, val: string) {
    this.edit_s_list[field] = val;
  }

  student_profile_pic(avatar: string) {
    this.photoURL = '/assets/icons/user/' + avatar + '.png';
    this.edit_s_list['photoURL'] = this.photoURL;
  }

  create_student() {
    this.student_uid = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i: number = 1; i <= 3; i++) {
      this.student_uid += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.edit_s_list['uid'] = this.authService.userData.uid + "-" + this.student_uid;
    this.authService.WriteUserDataList(this.edit_s_list);
    this.link_student(this.authService.userData.uid + "-" + this.student_uid);
    this.student_metadata = [];
    this.my_student_metadata = [];
    for (const [key, stud] of Object.entries(this.student_list.slice(1))) {
      setTimeout(() => {
        console.log(stud);
        this.student_data = this.authService.searchUserId(stud as string);
        console.log(this.student_data);
        this.student_metadata.push(this.student_data as object);
        this.my_student_metadata.push(this.student_data as object);
      }, +key * 10);
    }
    setTimeout(() => {
      this.student_metadata = [];
      this.my_student_metadata = [];
      for (const [key, stud] of Object.entries(this.student_list.slice(1))) {
        setTimeout(() => {
          console.log(stud);
          this.student_data = this.authService.searchUserId(stud as string);
          console.log(this.student_data);
          this.student_metadata.push(this.student_data as object);
          this.my_student_metadata.push(this.student_data as object);
        }, +key * 10);
      }
    }, 500);
  }

  link_student(id: string) {
    this.student_list = [];
    // this.student_metadata = [];
    for (let std of this.authService.userData.students) {
      this.student_list.push(std as string);
    }
    if (!this.student_list.includes(id)) {
      this.student_list.push(id);
    }
    this.authService.UpdateUserData({ 'students': {} });
    this.authService.UpdateUserData({ 'students': this.student_list });
  }

  toggle_create_class() {
    this.create_c = !this.create_c;
    this.edit_c_list = [];
    this.class_uid = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i: number = 1; i <= 5; i++) {
      this.class_uid += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  }

  edit_class(field: string, val: string) {
    this.edit_c_list[field] = val;
  }

  create_class() {
    this.edit_c_list['classes/' + this.class_uid + '/uid'] = this.class_uid;
    this.edit_c_list['classes/' + this.class_uid + '/teacher'] = this.authService.userData.uid;
    this.edit_c_list['classes/' + this.class_uid + '/students'] = [""];
    this.edit_c_list['classes/' + this.class_uid + '/assignments'] = [""];
    this.authService.UpdateDatabase(this.edit_c_list);
    this.class_list = [];
    for (let clss of this.authService.userData.classes) {
      this.class_list.push(clss as string);
    }
    this.class_list.push(this.class_uid);
    this.authService.UpdateUserData({ 'classes': {} });
    this.authService.UpdateUserData({ 'classes': this.class_list });
    this.my_class_metadata = [];
    for (const [key, clss] of Object.entries(this.class_list.slice(1))) {
      setTimeout(() => {
        console.log(clss);
        this.class_data = this.authService.searchClassId(clss as string);
        console.log(this.class_data);
        this.my_class_metadata.push(this.class_data as object);
      }, +key * 10);
    }
    setTimeout(() => {
      this.my_class_metadata = [];
      for (const [key, clss] of Object.entries(this.class_list.slice(1))) {
        setTimeout(() => {
          console.log(clss);
          this.class_data = this.authService.searchClassId(clss as string);
          console.log(this.class_data);
          this.my_class_metadata.push(this.class_data as object);
        }, +key * 10);
      }
      if (this.class_list.slice(1).length > 0) {
        this.has_classes = true;
      }
      this.toggle_create_class();
    }, 500);
    // setTimeout(() => {
    //   this.set_tab("information");
    //   this.set_tab("students");
    // }, 200);
  }

  toggle_assign_exam() {
    if (!this.assign_e) {
      this.all_students = [];
      this.my_students = [];
      const linked_students = this.authService.userData.students.slice(1);
      for (const [key, stud] of Object.entries(linked_students)) {
        setTimeout(() => {
          const student_data = this.authService.searchUserId(stud as string);
          this.all_students.push(stud as string);
          if (student_data != null) {
            this.all_students_data[(stud as string)] = (student_data as object);
          }
          if ((stud as string).includes(this.authService.userData.uid as string)) {
            this.my_students.push(stud as string);
            if (student_data != null) {
              this.my_students_data[(stud as string)] = (student_data as object);
            }
          }
        }, +key * 10);
      }
      setTimeout(() => {
        this.all_students = [];
        this.my_students = [];
        const linked_students = this.authService.userData.students.slice(1);
        for (const [key, stud] of Object.entries(linked_students)) {
          setTimeout(() => {
            const student_data = this.authService.searchUserId(stud as string);
            this.all_students.push(stud as string);
            if (student_data != null) {
              this.all_students_data[(stud as string)] = (student_data as object);
            }
            if ((stud as string).includes(this.authService.userData.uid as string)) {
              this.my_students.push(stud as string);
              if (student_data != null) {
                this.my_students_data[(stud as string)] = (student_data as object);
              }
            }
          }, +key * 10);
        }
      }, 100);
      this.my_class_metadata = [];
      const linked_classes = this.authService.userData.classes.slice(1);
      for (const [key, clss] of Object.entries(linked_classes)) {
        setTimeout(() => {
          console.log(clss);
          this.class_data = this.authService.searchClassId(clss as string);
          console.log(this.class_data);
          this.my_class_metadata.push(this.class_data as object);
        }, +key * 10);
      }
      setTimeout(() => {
        this.my_class_metadata = [];
        const linked_classes = this.authService.userData.classes.slice(1);
        for (const [key, clss] of Object.entries(linked_classes)) {
          setTimeout(() => {
            console.log(clss);
            this.class_data = this.authService.searchClassId(clss as string);
            console.log(this.class_data);
            this.my_class_metadata.push(this.class_data as object);
          }, +key * 10);
        }
      }, 100);
    }
    this.assign_e = !this.assign_e;
  }

  toggle_new_assignment(target: string) {
    if (!this.new_assignments.includes(target)) {
      this.new_assignments.push(target);
    }
    else {
      if (this.new_assignments.indexOf(target) !== -1) {
        this.new_assignments.splice(this.new_assignments.indexOf(target), 1);
      }
      else {
        this.new_assignments.pop()
      }
    }
  }

  add_assignments() {
    for (let ass of this.new_assignments) {
      if (ass.length < 10) {
        const class_ass_ref = 'classes/' + ass + '/assignments';
        var class_ass_set: any = [];
        var edit_c_list: any = {};
        for (let exam of this.my_class_metadata[this.authService.userData.classes.indexOf(ass)-1].assignments) {
          class_ass_set.push(exam as string);
        }
        class_ass_set.push(this.exam_id);
        edit_c_list[class_ass_ref] = class_ass_set;
        this.authService.UpdateDatabase({ class_ass_ref: {} });
        this.authService.UpdateDatabase(edit_c_list);
      }
      else {
        var db_updates: any = {};
        db_updates['users/' + ass + '/exams/history/' + this.exam_id] = { progress: 0, status: 'Assigned', shuffle: false, lasttimestamp: serverTimestamp() };
        // this.db_updates['users/' + ass + '/problems/all/' + this.exam_id + '-' + "" + (this.problem_number + 1) + '/status'] = 'Viewed';
        db_updates['/submissions/exams/' + ass + '/' + this.exam_id + '/starttimestamp'] = serverTimestamp();
        this.authService.UpdateDatabase(db_updates);
      }
    }
  }

  clear_assignments() {
    this.new_assignments = [];
    this.assign_e = false;
  }

  toggle_favorite_exm() {
    this.favorite_exm_set = [];
    for (let exm of this.authService.userData.exams.favorites) {
      this.favorite_exm_set.push(exm as string);
    }
    if (this.favorite_exm_set.includes(this.exam_id)) {
      if (this.favorite_exm_set.indexOf(this.exam_id) !== -1) {
        this.favorite_exm_set.splice(this.favorite_exm_set.indexOf(this.exam_id), 1);
      }
      else {
        this.favorite_exm_set.pop()
      }
    }
    else {
      this.favorite_exm_set.push(this.exam_id);
    }
    this.authService.UpdateUserData({ 'exams/favorites': {} });
    this.authService.UpdateUserData({ 'exams/favorites': this.favorite_exm_set });
    this.exam_fav = !this.exam_fav;
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

  assert_favorite_exm() {
    this.favorite_exm_set = [];
    for (let exm of this.authService.userData.exams.favorites) {
      this.favorite_exm_set.push(exm as string);
    }
    if (!this.favorite_exm_set.includes(this.exam_id)) {
      this.favorite_exm_set.push(this.exam_id);
    }
    this.authService.UpdateUserData({ 'exams/favorites': {} });
    this.authService.UpdateUserData({ 'exams/favorites': this.favorite_exm_set });
    this.exam_fav = true;
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

  download_exam() {
    const link = document.createElement('a');
    const exam_ref: string = 'exams/' + this.exam_id + '/downloads';
    console.log(exam_ref);
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.file_source);
    link.setAttribute('download', this.exam_name);
    document.body.appendChild(link);
    link.click();
    link.remove();
    if (this.exam_dl == 0) {
      this.edit_e_list[exam_ref] = 1;
      this.authService.UpdateDatabase({exam_ref: {}});
      this.authService.UpdateDatabase(this.edit_e_list);
    }
    else {
      this.edit_e_list[exam_ref] = this.exam_dl + 1;
      this.authService.UpdateDatabase({exam_ref: {}});
      this.authService.UpdateDatabase(this.edit_e_list);
    }
    this.edit_e_list = {};
    this.assert_favorite_exm();
    this.exam_dl = (this.authService.searchExamId(this.exam_id)).downloads;
    setTimeout(() => {
      this.exam_dl = (this.authService.searchExamId(this.exam_id)).downloads;
    }, 250);
  }

  print_exam() {
    printJS({ printable: this.file_source, type: 'pdf', showModal: true });
    this.assert_favorite_exm();
  }

  take_exam() {
    this.assert_favorite_exm();
    this.router.navigateByUrl(this.exam_url);
  }

  prev_page() {
    this.file_page = Math.max(1, this.file_page - 1);
  }

  next_page() {
    this.file_page = this.file_page + 1;
  }

  go_to_page(num: number) {
    this.file_page = num;
  }

  attempt_mc_st_problem(choice: string, part: string) {
      var part_num = 0;
      if (part != '') {
          var part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
      }
      if (choice != this.subtopic_problem_selection[part_num][0]) {
          this.subtopic_problem_attempts[part_num] += 1;
          this.subtopic_attempt_path[part_num].push(choice);
          this.subtopic_problem_selection[part_num] = [choice];
          for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
              if (this.subtopic_problem_number == +num) {
                  if (Object.keys(prob.Parts).length == 0) {
                      for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                          if (choice == ch) {
                              this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
                              if (key.Key.Correct == true) {
                                  this.confetti_light(this.subtopic_problem_attempts[part_num]);
                                  if (this.subtopic_problem_attempts[part_num] == 1) {
                                      this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
                                  }
                                  else {
                                      this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
                                  }
                              }
                              else {
                                  this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                              }
                          }
                      }
                  }
                  else {
                      for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                          if (choice == ch) {
                              this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
                              if (key.Key.Correct == true) {
                                  this.confetti_light(this.subtopic_problem_attempts[part_num]);
                                  if (this.subtopic_problem_attempts[part_num] == 1) {
                                      this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
                                  }
                                  else {
                                      this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
                                  }
                              }
                              else {
                                  this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                              }
                          }
                      }
                  }
              }
          }
      }
  }

  attempt_ms_st_problem(choice: string, part: string) {
      var part_num = 0;
      if (part != '') {
          var part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
      }
      for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
          if (this.subtopic_problem_number == +num) {
              this.subtopic_attempt_response[part_num] = "";
              if (part == '') {
                  for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                      if (choice == ch) {
                          if (!this.subtopic_problem_selection[part_num].includes(choice)) {
                              this.subtopic_attempt_explanation[part_num].push(key.Key.Rationale);
                              this.subtopic_problem_selection[part_num].push(choice);
                          }
                          else {
                              if (this.subtopic_problem_selection[part_num].indexOf(choice) != -1) {
                                  this.subtopic_attempt_explanation[part_num].splice(this.subtopic_problem_selection[part_num].indexOf(choice), 1);
                                  this.subtopic_problem_selection[part_num].splice(this.subtopic_problem_selection[part_num].indexOf(choice), 1);
                              }
                              else {
                                  this.subtopic_attempt_explanation[part_num].pop();
                                  this.subtopic_problem_selection[part_num].pop();
                              }
                          }
                      }
                      if ((key.Key.Correct == false && this.subtopic_problem_selection[part_num].includes(ch)) || (key.Key.Correct == true && !this.subtopic_problem_selection[part_num].includes(ch))) {
                          this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                      }
                  }
              }
              else {
                  for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                      if (choice == ch) {
                          if (!this.subtopic_problem_selection[part_num].includes(choice)) {
                              this.subtopic_attempt_explanation[part_num].push(key.Key.Rationale);
                              this.subtopic_problem_selection[part_num].push(choice);
                          }
                          else {
                              if (this.subtopic_problem_selection[part_num].indexOf(choice) != -1) {
                                  this.subtopic_attempt_explanation[part_num].splice(this.subtopic_problem_selection[part_num].indexOf(choice), 1);
                                  this.subtopic_problem_selection[part_num].splice(this.subtopic_problem_selection[part_num].indexOf(choice), 1);
                              }
                              else {
                                  this.subtopic_attempt_explanation[part_num].pop();
                                  this.subtopic_problem_selection[part_num].pop();
                              }
                          }
                      }
                      if ((key.Key.Correct == false && this.subtopic_problem_selection[part_num].includes(ch)) || (key.Key.Correct == true && !this.subtopic_problem_selection[part_num].includes(ch))) {
                          this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                      }
                  }
              }
              if (!this.subtopic_attempt_response[part_num].startsWith('That is not the correct answer')) {
                  this.confetti_light(this.subtopic_problem_attempts[part_num]);
                  if (this.subtopic_problem_attempts[part_num] == 1) {
                      this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
                  }
                  else {
                      this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
                  }
              }
          }
      }
      this.subtopic_problem_attempts[part_num] += 1;
      this.subtopic_attempt_path.push(this.subtopic_problem_selection[part_num]);
  }

  attempt_fr_st_problem(choice: string, part: string) {
      var part_num = 0;
      if (part != '') {
          var part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
      }
      if (choice != this.subtopic_problem_selection[part_num][0]) {
          this.subtopic_problem_attempts[part_num] += 1;
          this.subtopic_attempt_path[part_num].push(choice);
          this.subtopic_problem_selection[part_num] = [choice];
          for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
              if (this.subtopic_problem_number == +num) {
                  for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                      if (choice == key.Choice) {
                          this.confetti_light(this.subtopic_problem_attempts[part_num]);
                          this.subtopic_attempt_explanation[part_num][0]= key.Key.Rationale;
                          if (this.subtopic_problem_attempts[part_num] == 1) {
                              this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' try.';
                          }
                          else {
                              this.subtopic_attempt_response[part_num] = 'Correct! You got the right answer in ' + this.subtopic_problem_attempts[part_num].toString() + ' tries.';
                          }
                      }
                      else {
                          this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                      }
                  }
              }
          }
      }
  }

  attempt_lr_st_problem(response: string, part: string) {
      var part_num = 0;
      if (part != '') {
          var part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
      }
      if (response != this.subtopic_problem_selection[part_num][0]) {
          this.subtopic_problem_selection[part_num][0] = response;
          this.subtopic_problem_attempts[part_num] += 1;
      }
  }

  shuffle_m(choices: any) {
      if (!this.m_shuffled) {
          this.choices_sequence = Array.from(Object.keys(choices));
          this.random_list = [];
          this.shuffle_choices = [];
          for (let i = 0; i < Object.keys(choices).length; i++) {
              this.random_index = Math.floor(Math.random() * this.choices_sequence.length);
              this.random_list.push(this.choices_sequence[this.random_index]);
              this.shuffle_choices[i] = choices[this.choices_sequence[this.random_index]].Choice;
              this.choices_sequence.splice(this.random_index, 1);
          }
          this.m_shuffled = true;
      }
      return (this.shuffle_choices);
  }

  select_m_choice(ch: string, p: number) {
      this.m_selection[p] = ch;
      if (this.m_selection[0] != '' && this.m_selection[1] != '') {
          this.m_submission[this.m_selection[1]] = this.m_selection[0];
          this.m_selection = ["", ""];
      }
  }

  remove_m_choice(ch: string) {
      this.m_submission[ch] = '';
      this.select_m_choice('', 1)
  }

  is_matched(ch: string, p: number) {
      if (p == 0) {
          if (Object.values(this.m_submission).includes(ch)) {
              return true;
          }
          else {
              return false;
          }
      }
      else if (p == 1) {
          if (Object.keys(this.m_submission).includes(ch) && this.m_submission[ch] != '') {
              return true;
          }
          else {
              return false;
          }
      }
      else {
          return false
      }
  }

  is_MP_st_complete() {
      var comp = true;
      for (let resp of this.subtopic_attempt_response) {
          if (resp == '' || !resp.startsWith('Correct')) {
              comp = false;
          }
      }
      return comp;
  }

  next_problem_st() {
      this.subtopic_problem_number += 1;
      if (this.subtopic_problem_number > this.subtopic_problem_count) {
          this.selected_subtopic = '';
          this.standard_id = '';
      }
      else {
          this.subtopic_attempt_path = [];
          this.subtopic_attempt_response = [];
          this.subtopic_attempt_explanation = [];
          this.subtopic_problem_selection = [];
          if (Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).length == 0) {
              this.subtopic_problem_attempts = [0];
              this.subtopic_attempt_path = [[]];
              this.subtopic_attempt_response = [''];
              this.subtopic_attempt_explanation = [[]];
              if (['MC', 'FR', 'LR'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
                  this.subtopic_problem_selection = [['']];
              }
              else if (['MS', 'O'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
                  this.subtopic_problem_selection = [[]];
              }
          }
          else {
              this.subtopic_problem_attempts = [];
              for (let part of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts)) {
                  this.subtopic_problem_attempts.push(0);
                  this.subtopic_attempt_path.push([]);
                  this.subtopic_attempt_response.push('');
                  this.subtopic_attempt_explanation.push([]);
                  if (['MC', 'FR', 'LR'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
                      this.subtopic_problem_selection.push(['']);
                  }
                  else if (['MS', 'O'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
                      this.subtopic_problem_selection.push([]);
                  }
              }
          }
          this.st_refsheet_source = '../../' + this.exam_attribute_dump[(this.subtopic_search_dump[this.subtopic_problem_number].Number).substring(0, (this.subtopic_search_dump[this.subtopic_problem_number].Number).indexOf('-'))].RefSheet;
          for (let supp of this.subtopic_search_dump[this.subtopic_problem_number].SuppContent) {
            setTimeout(() => {
              this.read_supp_st_json(supp);
            }, 100 * (1 + this.subtopic_search_dump[this.subtopic_problem_number].SuppContent.indexOf(supp)));
          }
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

  width_change() {
    this.viewerWidth = Math.round(window.innerWidth * .99).toString() + "px";
    this.viewerHeight = Math.round(window.innerHeight * .95).toString() + "px";
  }

  data_reload() {
    location.reload();
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

  ngOnInit() {
    this.titleService.setTitle("MoreProblems.Org | U.S. K-12 State Testing Practice Exams");
    this.meta.updateTag({ name: 'description', content: "Access released practice problems & solutions to prepare for end-of-year tests - including Florida FSA, Illinois IAR, New York NYSTP, North Carolina EOG, Pennsylvania PSSA, and Texas STAAR. Choose from more 400 assessments across math, English language, science, & social studies for elementary, middle, & high school students." });
    setTimeout(() => {
      if (!this.authService.userData) {
        this.router.navigate(['exams']);
      }
      else {
        this.authService.getProfilePic(this.authService.userData);
        this.user_data = this.authService.userData;
        // for (let exm of this.authService.userData.exams.favorites.slice(1)) {
        //   this.favorite_set.push(exm as string);
        // }
        if (this.authService.userData.role == 'Student') {
          const exam_history = this.authService.userData.exams.history;
          for (const [key, det] of Object.entries(exam_history)) {
            if (["Started", "Assigned"].includes((det as any).status)) {
              this.inprogress_set.push(key);
              this.inprogress_exams[key] = { status: (det as any).status, progress: (det as any).progress, lastdate: new Date((det as any).lasttimestamp).toLocaleDateString(), lasttime: new Date((det as any).lasttimestamp).toLocaleTimeString()};
            }
          }
          this.my_class_metadata = [];
          const linked_classes = this.authService.userData.classes.slice(1);
          for (const [key, clss] of Object.entries(linked_classes)) {
            setTimeout(() => {
              console.log(clss);
              this.class_data = this.authService.searchClassId(clss as string);
              console.log(this.class_data);
              this.my_class_metadata.push(this.class_data as object);
            }, +key * 10);
          }
          setTimeout(() => {
            this.my_class_metadata = [];
            const linked_classes = this.authService.userData.classes.slice(1);
            for (const [key, clss] of Object.entries(linked_classes)) {
              setTimeout(() => {
                console.log(clss);
                this.class_data = this.authService.searchClassId(clss as string);
                console.log(this.class_data);
                this.my_class_metadata.push(this.class_data as object);
              }, +key * 10);
            }
            if (linked_classes.length > 0) {
              this.has_classes = true;
            }
          }, 100);
        }
        if (this.authService.userData.role != 'Student') {
          this.student_metadata = [];
          this.my_student_metadata = [];
          var linked_students = {};
          if (this.authService.userData.students) {
            linked_students = this.authService.userData.students.slice(1);
          }
          for (const [key, stud] of Object.entries(linked_students)) {
            setTimeout(() => {
              console.log(stud);
              this.student_data = this.authService.searchUserId(stud as string);
              console.log(this.student_data);
              this.student_metadata.push(this.student_data as object);
              if (this.student_data.uid.includes(this.authService.userData.uid)) {
                this.my_student_metadata.push(this.student_data as object);
              }
            }, +key * 10);
          }
          setTimeout(() => {
            this.student_metadata = [];
            this.my_student_metadata = [];
            const linked_students = this.authService.userData.students.slice(1);
            for (const [key, stud] of Object.entries(linked_students)) {
              setTimeout(() => {
                console.log(stud);
                this.student_data = this.authService.searchUserId(stud as string);
                console.log(this.student_data);
                this.student_metadata.push(this.student_data as object);
                if (this.student_data.uid.includes(this.authService.userData.uid)) {
                  this.my_student_metadata.push(this.student_data as object);
                }
              }, +key * 10);
            }
            this.my_class_metadata = [];
            const linked_classes = this.authService.userData.classes.slice(1);
            for (const [key, clss] of Object.entries(linked_classes)) {
              setTimeout(() => {
                console.log(clss);
                this.class_data = this.authService.searchClassId(clss as string);
                console.log(this.class_data);
                this.my_class_metadata.push(this.class_data as object);
              }, +key * 10);
            }
            setTimeout(() => {
              this.my_class_metadata = [];
              const linked_classes = this.authService.userData.classes.slice(1);
              for (const [key, clss] of Object.entries(linked_classes)) {
                setTimeout(() => {
                  console.log(clss);
                  this.class_data = this.authService.searchClassId(clss as string);
                  console.log(this.class_data);
                  this.my_class_metadata.push(this.class_data as object);
                }, +key * 10);
              }
            }, 100);
          }, 100);
          // setTimeout(() => {
          //   const all_inprog_exams = this.authService.getMyStudInProgExams(linked_students);
          //   setTimeout(() => {
          //     for (const [key, stud] of Object.entries(all_inprog_exams)) {
          //       for (const [key2, xm] of Object.entries(stud as any)) {
          //         if (key != undefined && key2 != undefined) {
          //           this.my_stud_inprogress_set.push([(key as string), (key2 as string)]);
          //           this.my_stud_inprogress_exams[(key as string)][(key2 as string)] = { progress: (xm as any).progress, lastdate: new Date((xm as any).lasttimestamp).toLocaleDateString(), lasttime: new Date((xm as any).lasttimestamp).toLocaleTimeString()};
          //         }
          //       }
          //     }
          //   }, 200);
          // }, 200);
          // setTimeout(() => {
          //   this.router.navigate(['home']);
          // }, 1000);
        }
      }
      setTimeout(() => {
        this.data_loaded = true;
      }, 500);
    }, 1000);
  }
}