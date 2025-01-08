import { Component, OnInit, AfterViewInit, Injectable, ElementRef, ViewChild, Input, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { AuthService } from "../../shared/services/auth.service";
import { WindowService } from '../../shared/services/window.service';
import intlTelInput from 'intl-tel-input';
import * as Plotly from 'plotly.js-dist-min';
import * as Chart from 'chart.js/auto';
import * as examMetadata from "src/assets/problems/exams.json";
import * as TestProblems from "src/assets/problems/test-problems.json";
import * as COG3EProblems from "src/assets/problems/COG3E/COG3E-problems.json";
import * as COG4EProblems from "src/assets/problems/COG4E/COG4E-problems.json";
import * as COG5EProblems from "src/assets/problems/COG5E/COG5E-problems.json";
import * as COG6EProblems from "src/assets/problems/COG6E/COG6E-problems.json";
import * as COG7EProblems from "src/assets/problems/COG7E/COG7E-problems.json";
import * as COG8EProblems from "src/assets/problems/COG8E/COG8E-problems.json";
import * as COG3MProblems from "src/assets/problems/COG3M/COG3M-problems.json";
import * as COG4MProblems from "src/assets/problems/COG4M/COG4M-problems.json";
import * as COG5MProblems from "src/assets/problems/COG5M/COG5M-problems.json";
import * as COG6MProblems from "src/assets/problems/COG6M/COG6M-problems.json";
import * as COG7MProblems from "src/assets/problems/COG7M/COG7M-problems.json";
import * as COG8MProblems from "src/assets/problems/COG8M/COG8M-problems.json";
import * as COG5SProblems from "src/assets/problems/COG5S/COG5S-problems.json";
import * as COG8SProblems from "src/assets/problems/COG8S/COG8S-problems.json";
import * as COHSSProblems from "src/assets/problems/COHSS/COHSS-problems.json";
import * as DEG4SSProblems from "src/assets/problems/DEG4SS/DEG4SS-problems.json";
import * as DEG7SSProblems from "src/assets/problems/DEG7SS/DEG7SS-problems.json";
import * as DEG11SSProblems from "src/assets/problems/DEG11SS/DEG11SS-problems.json";
import * as FL20G3MProblems from "src/assets/problems/FL20G3M/FL20G3M-problems.json";
import * as FL20G3RProblems from "src/assets/problems/FL20G3R/FL20G3R-problems.json";
import * as FL20G4MProblems from "src/assets/problems/FL20G4M/FL20G4M-problems.json";
import * as FL20G4RProblems from "src/assets/problems/FL20G4R/FL20G4R-problems.json";
import * as FL20G4WProblems from "src/assets/problems/FL20G4W/FL20G4W-problems.json";
import * as FL20G5MProblems from "src/assets/problems/FL20G5M/FL20G5M-problems.json";
import * as FL20G5RProblems from "src/assets/problems/FL20G5R/FL20G5R-problems.json";
import * as FL20G5SProblems from "src/assets/problems/FL20G5S/FL20G5S-problems.json";
import * as FL20G5WProblems from "src/assets/problems/FL20G5W/FL20G5W-problems.json";
import * as FL20G6MProblems from "src/assets/problems/FL20G6M/FL20G6M-problems.json";
import * as FL20G6RProblems from "src/assets/problems/FL20G6R/FL20G6R-problems.json";
import * as FL20G6WProblems from "src/assets/problems/FL20G6W/FL20G6W-problems.json";
import * as FL20G7MProblems from "src/assets/problems/FL20G7M/FL20G7M-problems.json";
import * as FL20G7RProblems from "src/assets/problems/FL20G7R/FL20G7R-problems.json";
import * as FL20G7WProblems from "src/assets/problems/FL20G7W/FL20G7W-problems.json";
import * as FL20G8MProblems from "src/assets/problems/FL20G8M/FL20G8M-problems.json";
import * as FL20G8RProblems from "src/assets/problems/FL20G8R/FL20G8R-problems.json";
import * as FL20G8SProblems from "src/assets/problems/FL20G8S/FL20G8S-problems.json";
import * as FL20G8WProblems from "src/assets/problems/FL20G8W/FL20G8W-problems.json";
import * as FL20G9RProblems from "src/assets/problems/FL20G9R/FL20G9R-problems.json";
import * as FL20G9WProblems from "src/assets/problems/FL20G9W/FL20G9W-problems.json";
import * as FL20G10RProblems from "src/assets/problems/FL20G10R/FL20G10R-problems.json";
import * as FL20G10WProblems from "src/assets/problems/FL20G10W/FL20G10W-problems.json";
import * as ILG3EProblems from "src/assets/problems/ILG3E/ILG3E-problems.json";
import * as ILG3MProblems from "src/assets/problems/ILG3M/ILG3M-problems.json";
import * as ILG4EProblems from "src/assets/problems/ILG4E/ILG4E-problems.json";
import * as ILG4MProblems from "src/assets/problems/ILG4M/ILG4M-problems.json";
import * as ILG5EProblems from "src/assets/problems/ILG5E/ILG5E-problems.json";
import * as ILG5MProblems from "src/assets/problems/ILG5M/ILG5M-problems.json";
import * as ILG6EProblems from "src/assets/problems/ILG6E/ILG6E-problems.json";
import * as ILG6MProblems from "src/assets/problems/ILG6M/ILG6M-problems.json";
import * as ILG7EProblems from "src/assets/problems/ILG7E/ILG7E-problems.json";
import * as ILG7MProblems from "src/assets/problems/ILG7M/ILG7M-problems.json";
import * as ILG8EProblems from "src/assets/problems/ILG8E/ILG8E-problems.json";
import * as ILG8MProblems from "src/assets/problems/ILG8M/ILG8M-problems.json";
import * as MA23G3EProblems from "src/assets/problems/MA23G3E/MA23G3E-problems.json";
import * as MA22G3EProblems from "src/assets/problems/MA22G3E/MA22G3E-problems.json";
import * as MA21G3EProblems from "src/assets/problems/MA21G3E/MA21G3E-problems.json";
import * as MA19G3EProblems from "src/assets/problems/MA19G3E/MA19G3E-problems.json";
import * as MAG3EProblems from "src/assets/problems/MAG3E/MAG3E-problems.json";
import * as MA23G3MProblems from "src/assets/problems/MA23G3M/MA23G3M-problems.json";
import * as MA22G3MProblems from "src/assets/problems/MA22G3M/MA22G3M-problems.json";
import * as MA21G3MProblems from "src/assets/problems/MA21G3M/MA21G3M-problems.json";
import * as MA19G3MProblems from "src/assets/problems/MA19G3M/MA19G3M-problems.json";
import * as MAG3MProblems from "src/assets/problems/MAG3M/MAG3M-problems.json";
import * as MA23G4EProblems from "src/assets/problems/MA23G4E/MA23G4E-problems.json";
import * as MA22G4EProblems from "src/assets/problems/MA22G4E/MA22G4E-problems.json";
import * as MA21G4EProblems from "src/assets/problems/MA21G4E/MA21G4E-problems.json";
import * as MA19G4EProblems from "src/assets/problems/MA19G4E/MA19G4E-problems.json";
import * as MAG4EProblems from "src/assets/problems/MAG4E/MAG4E-problems.json";
import * as MA23G4MProblems from "src/assets/problems/MA23G4M/MA23G4M-problems.json";
import * as MA22G4MProblems from "src/assets/problems/MA22G4M/MA22G4M-problems.json";
import * as MA21G4MProblems from "src/assets/problems/MA21G4M/MA21G4M-problems.json";
import * as MA19G4MProblems from "src/assets/problems/MA19G4M/MA19G4M-problems.json";
import * as MAG4MProblems from "src/assets/problems/MAG4M/MAG4M-problems.json";
import * as MA23G5EProblems from "src/assets/problems/MA23G5E/MA23G5E-problems.json";
import * as MA22G5EProblems from "src/assets/problems/MA22G5E/MA22G5E-problems.json";
import * as MA21G5EProblems from "src/assets/problems/MA21G5E/MA21G5E-problems.json";
import * as MA19G5EProblems from "src/assets/problems/MA19G5E/MA19G5E-problems.json";
import * as MAG5EProblems from "src/assets/problems/MAG5E/MAG5E-problems.json";
import * as MA23G5MProblems from "src/assets/problems/MA23G5M/MA23G5M-problems.json";
import * as MA22G5MProblems from "src/assets/problems/MA22G5M/MA22G5M-problems.json";
import * as MA21G5MProblems from "src/assets/problems/MA21G5M/MA21G5M-problems.json";
import * as MA19G5MProblems from "src/assets/problems/MA19G5M/MA19G5M-problems.json";
import * as MAG5MProblems from "src/assets/problems/MAG5M/MAG5M-problems.json";
import * as MA23G5SProblems from "src/assets/problems/MA23G5S/MA23G5S-problems.json";
import * as MA22G5SProblems from "src/assets/problems/MA22G5S/MA22G5S-problems.json";
import * as MA21G5SProblems from "src/assets/problems/MA21G5S/MA21G5S-problems.json";
import * as MA19G5SProblems from "src/assets/problems/MA19G5S/MA19G5S-problems.json";
import * as MAG5SProblems from "src/assets/problems/MAG5S/MAG5S-problems.json";
import * as MA23G6EProblems from "src/assets/problems/MA23G6E/MA23G6E-problems.json";
import * as MA22G6EProblems from "src/assets/problems/MA22G6E/MA22G6E-problems.json";
import * as MA21G6EProblems from "src/assets/problems/MA21G6E/MA21G6E-problems.json";
import * as MA19G6EProblems from "src/assets/problems/MA19G6E/MA19G6E-problems.json";
import * as MAG6EProblems from "src/assets/problems/MAG6E/MAG6E-problems.json";
import * as MA23G6MProblems from "src/assets/problems/MA23G6M/MA23G6M-problems.json";
import * as MA22G6MProblems from "src/assets/problems/MA22G6M/MA22G6M-problems.json";
import * as MA21G6MProblems from "src/assets/problems/MA21G6M/MA21G6M-problems.json";
import * as MA19G6MProblems from "src/assets/problems/MA19G6M/MA19G6M-problems.json";
import * as MAG6MProblems from "src/assets/problems/MAG6M/MAG6M-problems.json";
import * as MA23G7EProblems from "src/assets/problems/MA23G7E/MA23G7E-problems.json";
import * as MA22G7EProblems from "src/assets/problems/MA22G7E/MA22G7E-problems.json";
import * as MA21G7EProblems from "src/assets/problems/MA21G7E/MA21G7E-problems.json";
import * as MA19G7EProblems from "src/assets/problems/MA19G7E/MA19G7E-problems.json";
import * as MAG7EProblems from "src/assets/problems/MAG7E/MAG7E-problems.json";
import * as MA23G7MProblems from "src/assets/problems/MA23G7M/MA23G7M-problems.json";
import * as MA22G7MProblems from "src/assets/problems/MA22G7M/MA22G7M-problems.json";
import * as MA21G7MProblems from "src/assets/problems/MA21G7M/MA21G7M-problems.json";
import * as MA19G7MProblems from "src/assets/problems/MA19G7M/MA19G7M-problems.json";
import * as MAG7MProblems from "src/assets/problems/MAG7M/MAG7M-problems.json";
import * as MA23G8EProblems from "src/assets/problems/MA23G8E/MA23G8E-problems.json";
import * as MA22G8EProblems from "src/assets/problems/MA22G8E/MA22G8E-problems.json";
import * as MA21G8EProblems from "src/assets/problems/MA21G8E/MA21G8E-problems.json";
import * as MA19G8EProblems from "src/assets/problems/MA19G8E/MA19G8E-problems.json";
import * as MAG8EProblems from "src/assets/problems/MAG8E/MAG8E-problems.json";
import * as MA23G8MProblems from "src/assets/problems/MA23G8M/MA23G8M-problems.json";
import * as MA22G8MProblems from "src/assets/problems/MA22G8M/MA22G8M-problems.json";
import * as MA21G8MProblems from "src/assets/problems/MA21G8M/MA21G8M-problems.json";
import * as MA19G8MProblems from "src/assets/problems/MA19G8M/MA19G8M-problems.json";
import * as MAG8MProblems from "src/assets/problems/MAG8M/MAG8M-problems.json";
import * as MA23G8SProblems from "src/assets/problems/MA23G8S/MA23G8S-problems.json";
import * as MA22G8SProblems from "src/assets/problems/MA22G8S/MA22G8S-problems.json";
import * as MA21G8SProblems from "src/assets/problems/MA21G8S/MA21G8S-problems.json";
import * as MA19G8SProblems from "src/assets/problems/MA19G8S/MA19G8S-problems.json";
import * as MAG8SProblems from "src/assets/problems/MAG8S/MAG8S-problems.json";
import * as MA23G10EProblems from "src/assets/problems/MA23G10E/MA23G10E-problems.json";
import * as MA22G10EProblems from "src/assets/problems/MA22G10E/MA22G10E-problems.json";
import * as MA21G10EProblems from "src/assets/problems/MA21G10E/MA21G10E-problems.json";
import * as MA19G10EProblems from "src/assets/problems/MA19G10E/MA19G10E-problems.json";
import * as MAG10EProblems from "src/assets/problems/MAG10E/MAG10E-problems.json";
import * as MA23G10MProblems from "src/assets/problems/MA23G10M/MA23G10M-problems.json";
import * as MA22G10MProblems from "src/assets/problems/MA22G10M/MA22G10M-problems.json";
import * as MA21G10MProblems from "src/assets/problems/MA21G10M/MA21G10M-problems.json";
import * as MA19G10MProblems from "src/assets/problems/MA19G10M/MA19G10M-problems.json";
import * as MAG10MProblems from "src/assets/problems/MAG10M/MAG10M-problems.json";
import * as MA23HSBProblems from "src/assets/problems/MA23HSB/MA23HSB-problems.json";
import * as MA22HSBProblems from "src/assets/problems/MA22HSB/MA22HSB-problems.json";
import * as MA19HSBProblems from "src/assets/problems/MA19HSB/MA19HSB-problems.json";
import * as MA23HSPProblems from "src/assets/problems/MA23HSP/MA23HSP-problems.json";
import * as MA22HSPProblems from "src/assets/problems/MA22HSP/MA22HSP-problems.json";
import * as MA19HSPProblems from "src/assets/problems/MA19HSP/MA19HSP-problems.json";
import * as MDG3EProblems from "src/assets/problems/MDG3E/MDG3E-problems.json";
import * as MDG4EProblems from "src/assets/problems/MDG4E/MDG4E-problems.json";
import * as MDG5EProblems from "src/assets/problems/MDG5E/MDG5E-problems.json";
import * as MDG6EProblems from "src/assets/problems/MDG6E/MDG6E-problems.json";
import * as MDG7EProblems from "src/assets/problems/MDG7E/MDG7E-problems.json";
import * as MDG8EProblems from "src/assets/problems/MDG8E/MDG8E-problems.json";
import * as MDG10EProblems from "src/assets/problems/MDG10E/MDG10E-problems.json";
import * as MDG3MProblems from "src/assets/problems/MDG3M/MDG3M-problems.json";
import * as MDG4MProblems from "src/assets/problems/MDG4M/MDG4M-problems.json";
import * as MDG5MProblems from "src/assets/problems/MDG5M/MDG5M-problems.json";
import * as MDG6MProblems from "src/assets/problems/MDG6M/MDG6M-problems.json";
import * as MDG7MProblems from "src/assets/problems/MDG7M/MDG7M-problems.json";
import * as MDG8MProblems from "src/assets/problems/MDG8M/MDG8M-problems.json";
import * as MDG5SProblems from "src/assets/problems/MDG5S/MDG5S-problems.json";
import * as MDG8SProblems from "src/assets/problems/MDG8S/MDG8S-problems.json";
import * as MDG8SSProblems from "src/assets/problems/MDG8SS/MDG8SS-problems.json";
import * as MEG3MProblems from "src/assets/problems/MEG3M/MEG3M-problems.json";
import * as MEG4MProblems from "src/assets/problems/MEG4M/MEG4M-problems.json";
import * as MEG5MProblems from "src/assets/problems/MEG5M/MEG5M-problems.json";
import * as MEG6MProblems from "src/assets/problems/MEG6M/MEG6M-problems.json";
import * as MEG7MProblems from "src/assets/problems/MEG7M/MEG7M-problems.json";
import * as MEG8MProblems from "src/assets/problems/MEG8M/MEG8M-problems.json";
import * as MEG10MProblems from "src/assets/problems/MEG10M/MEG10M-problems.json";
import * as MEG35RProblems from "src/assets/problems/MEG35R/MEG35R-problems.json";
import * as MEG68RProblems from "src/assets/problems/MEG68R/MEG68R-problems.json";
import * as MEG10RProblems from "src/assets/problems/MEG10R/MEG10R-problems.json";
import * as MNG3MProblems from "src/assets/problems/MNG3M/MNG3M-problems.json";
import * as MNG4MProblems from "src/assets/problems/MNG4M/MNG4M-problems.json";
import * as MNG5MProblems from "src/assets/problems/MNG5M/MNG5M-problems.json";
import * as MNG6MProblems from "src/assets/problems/MNG6M/MNG6M-problems.json";
import * as MNG7MProblems from "src/assets/problems/MNG7M/MNG7M-problems.json";
import * as MNG8MProblems from "src/assets/problems/MNG8M/MNG8M-problems.json";
import * as MNG11MProblems from "src/assets/problems/MNG11M/MNG11M-problems.json";
import * as MNG3RProblems from "src/assets/problems/MNG3R/MNG3R-problems.json";
import * as MNG4RProblems from "src/assets/problems/MNG4R/MNG4R-problems.json";
import * as MNG5RProblems from "src/assets/problems/MNG5R/MNG5R-problems.json";
import * as MNG6RProblems from "src/assets/problems/MNG6R/MNG6R-problems.json";
import * as MNG7RProblems from "src/assets/problems/MNG7R/MNG7R-problems.json";
import * as MNG8RProblems from "src/assets/problems/MNG8R/MNG8R-problems.json";
import * as MNG10RProblems from "src/assets/problems/MNG10R/MNG10R-problems.json";
import * as MNG5SProblems from "src/assets/problems/MNG5S/MNG5S-problems.json";
import * as MNG8SProblems from "src/assets/problems/MNG8S/MNG8S-problems.json";
import * as MNHSSProblems from "src/assets/problems/MNHSS/MNHSS-problems.json";
import * as MOG3EProblems from "src/assets/problems/MOG3E/MOG3E-problems.json";
import * as MOG4EProblems from "src/assets/problems/MOG4E/MOG4E-problems.json";
import * as MOG5EProblems from "src/assets/problems/MOG5E/MOG5E-problems.json";
import * as MOG6EProblems from "src/assets/problems/MOG6E/MOG6E-problems.json";
import * as MOG7EProblems from "src/assets/problems/MOG7E/MOG7E-problems.json";
import * as MOG8EProblems from "src/assets/problems/MOG8E/MOG8E-problems.json";
import * as MOG3MProblems from "src/assets/problems/MOG3M/MOG3M-problems.json";
import * as MOG4MProblems from "src/assets/problems/MOG4M/MOG4M-problems.json";
import * as MOG5MProblems from "src/assets/problems/MOG5M/MOG5M-problems.json";
import * as MOG6MProblems from "src/assets/problems/MOG6M/MOG6M-problems.json";
import * as MOG7MProblems from "src/assets/problems/MOG7M/MOG7M-problems.json";
import * as MOG8MProblems from "src/assets/problems/MOG8M/MOG8M-problems.json";
import * as MOG5SProblems from "src/assets/problems/MOG5S/MOG5S-problems.json";
import * as MOG8SProblems from "src/assets/problems/MOG8S/MOG8S-problems.json";
import * as MS22G3EProblems from "src/assets/problems/MS22G3E/MS22G3E-problems.json";
import * as MS22G4EProblems from "src/assets/problems/MS22G4E/MS22G4E-problems.json";
import * as MS22G5EProblems from "src/assets/problems/MS22G5E/MS22G5E-problems.json";
import * as MS22G6EProblems from "src/assets/problems/MS22G6E/MS22G6E-problems.json";
import * as MS22G7EProblems from "src/assets/problems/MS22G7E/MS22G7E-problems.json";
import * as MS22G8EProblems from "src/assets/problems/MS22G8E/MS22G8E-problems.json";
import * as MS23G3EProblems from "src/assets/problems/MS23G3E/MS23G3E-problems.json";
import * as MS23G4EProblems from "src/assets/problems/MS23G4E/MS23G4E-problems.json";
import * as MS23G5EProblems from "src/assets/problems/MS23G5E/MS23G5E-problems.json";
import * as MS23G6EProblems from "src/assets/problems/MS23G6E/MS23G6E-problems.json";
import * as MS23G7EProblems from "src/assets/problems/MS23G7E/MS23G7E-problems.json";
import * as MS23G8EProblems from "src/assets/problems/MS23G8E/MS23G8E-problems.json";
import * as MS22G3MProblems from "src/assets/problems/MS22G3M/MS22G3M-problems.json";
import * as MS22G4MProblems from "src/assets/problems/MS22G4M/MS22G4M-problems.json";
import * as MS22G5MProblems from "src/assets/problems/MS22G5M/MS22G5M-problems.json";
import * as MS22G6MProblems from "src/assets/problems/MS22G6M/MS22G6M-problems.json";
import * as MS22G7MProblems from "src/assets/problems/MS22G7M/MS22G7M-problems.json";
import * as MS22G8MProblems from "src/assets/problems/MS22G8M/MS22G8M-problems.json";
import * as MS23G3MProblems from "src/assets/problems/MS23G3M/MS23G3M-problems.json";
import * as MS23G4MProblems from "src/assets/problems/MS23G4M/MS23G4M-problems.json";
import * as MS23G5MProblems from "src/assets/problems/MS23G5M/MS23G5M-problems.json";
import * as MS23G6MProblems from "src/assets/problems/MS23G6M/MS23G6M-problems.json";
import * as MS23G7MProblems from "src/assets/problems/MS23G7M/MS23G7M-problems.json";
import * as MS23G8MProblems from "src/assets/problems/MS23G8M/MS23G8M-problems.json";
import * as NEG3EProblems from "src/assets/problems/NEG3E/NEG3E-problems.json";
import * as NEG3MProblems from "src/assets/problems/NEG3M/NEG3M-problems.json";
import * as NEG4EProblems from "src/assets/problems/NEG4E/NEG4E-problems.json";
import * as NEG4MProblems from "src/assets/problems/NEG4M/NEG4M-problems.json";
import * as NEG5EProblems from "src/assets/problems/NEG5E/NEG5E-problems.json";
import * as NEG5MProblems from "src/assets/problems/NEG5M/NEG5M-problems.json";
import * as NEG5SProblems from "src/assets/problems/NEG5S/NEG5S-problems.json";
import * as NEG6EProblems from "src/assets/problems/NEG6E/NEG6E-problems.json";
import * as NEG6MProblems from "src/assets/problems/NEG6M/NEG6M-problems.json";
import * as NEG7EProblems from "src/assets/problems/NEG7E/NEG7E-problems.json";
import * as NEG7MProblems from "src/assets/problems/NEG7M/NEG7M-problems.json";
import * as NEG8EProblems from "src/assets/problems/NEG8E/NEG8E-problems.json";
import * as NEG8MProblems from "src/assets/problems/NEG8M/NEG8M-problems.json";
import * as NEG8SProblems from "src/assets/problems/NEG8S/NEG8S-problems.json";
import * as NJG3EProblems from "src/assets/problems/NJG3E/NJG3E-problems.json";
import * as NJG3MProblems from "src/assets/problems/NJG3M/NJG3M-problems.json";
import * as NJG4EProblems from "src/assets/problems/NJG4E/NJG4E-problems.json";
import * as NJG4MProblems from "src/assets/problems/NJG4M/NJG4M-problems.json";
import * as NJG5EProblems from "src/assets/problems/NJG5E/NJG5E-problems.json";
import * as NJG5MProblems from "src/assets/problems/NJG5M/NJG5M-problems.json";
import * as NJG5SProblems from "src/assets/problems/NJG5S/NJG5S-problems.json";
import * as NJG6EProblems from "src/assets/problems/NJG6E/NJG6E-problems.json";
import * as NJG6MProblems from "src/assets/problems/NJG6M/NJG6M-problems.json";
import * as NJG7EProblems from "src/assets/problems/NJG7E/NJG7E-problems.json";
import * as NJG7MProblems from "src/assets/problems/NJG7M/NJG7M-problems.json";
import * as NJG8EProblems from "src/assets/problems/NJG8E/NJG8E-problems.json";
import * as NJG8MProblems from "src/assets/problems/NJG8M/NJG8M-problems.json";
import * as NJG8SProblems from "src/assets/problems/NJG8S/NJG8S-problems.json";
import * as NJG9EProblems from "src/assets/problems/NJG9E/NJG9E-problems.json";
import * as NJG11SProblems from "src/assets/problems/NJG11S/NJG11S-problems.json";
import * as NMG3EProblems from "src/assets/problems/NMG3E/NMG3E-problems.json";
import * as NMG3MProblems from "src/assets/problems/NMG3M/NMG3M-problems.json";
import * as NMG4EProblems from "src/assets/problems/NMG4E/NMG4E-problems.json";
import * as NMG4MProblems from "src/assets/problems/NMG4M/NMG4M-problems.json";
import * as NMG5EProblems from "src/assets/problems/NMG5E/NMG5E-problems.json";
import * as NMG5MProblems from "src/assets/problems/NMG5M/NMG5M-problems.json";
import * as NMG5SProblems from "src/assets/problems/NMG5S/NMG5S-problems.json";
import * as NMG6EProblems from "src/assets/problems/NMG6E/NMG6E-problems.json";
import * as NMG6MProblems from "src/assets/problems/NMG6M/NMG6M-problems.json";
import * as NMG7EProblems from "src/assets/problems/NMG7E/NMG7E-problems.json";
import * as NMG7MProblems from "src/assets/problems/NMG7M/NMG7M-problems.json";
import * as NMG8EProblems from "src/assets/problems/NMG8E/NMG8E-problems.json";
import * as NMG8MProblems from "src/assets/problems/NMG8M/NMG8M-problems.json";
import * as NMG8SProblems from "src/assets/problems/NMG8S/NMG8S-problems.json";
import * as NMG11SProblems from "src/assets/problems/NMG11S/NMG11S-problems.json";
import * as NY23G3MProblems from "src/assets/problems/NY23G3M/NY23G3M-problems.json";
import * as NY23G3EProblems from "src/assets/problems/NY23G3E/NY23G3E-problems.json";
import * as NY22G3MProblems from "src/assets/problems/NY22G3M/NY22G3M-problems.json";
import * as NY22G3EProblems from "src/assets/problems/NY22G3E/NY22G3E-problems.json";
import * as NY21G3MProblems from "src/assets/problems/NY21G3M/NY21G3M-problems.json";
import * as NY21G3EProblems from "src/assets/problems/NY21G3E/NY21G3E-problems.json";
import * as NY19G3MProblems from "src/assets/problems/NY19G3M/NY19G3M-problems.json";
import * as NY19G3EProblems from "src/assets/problems/NY19G3E/NY19G3E-problems.json";
import * as NY18G3MProblems from "src/assets/problems/NY18G3M/NY18G3M-problems.json";
import * as NY18G3EProblems from "src/assets/problems/NY18G3E/NY18G3E-problems.json";
import * as NY17G3MProblems from "src/assets/problems/NY17G3M/NY17G3M-problems.json";
import * as NY17G3EProblems from "src/assets/problems/NY17G3E/NY17G3E-problems.json";
import * as NY16G3MProblems from "src/assets/problems/NY16G3M/NY16G3M-problems.json";
import * as NY16G3EProblems from "src/assets/problems/NY16G3E/NY16G3E-problems.json";
import * as NY15G3MProblems from "src/assets/problems/NY15G3M/NY15G3M-problems.json";
import * as NY15G3EProblems from "src/assets/problems/NY15G3E/NY15G3E-problems.json";
import * as NY23G4MProblems from "src/assets/problems/NY23G4M/NY23G4M-problems.json";
import * as NY23G4EProblems from "src/assets/problems/NY23G4E/NY23G4E-problems.json";
import * as NY22G4MProblems from "src/assets/problems/NY22G4M/NY22G4M-problems.json";
import * as NY22G4EProblems from "src/assets/problems/NY22G4E/NY22G4E-problems.json";
import * as NY21G4MProblems from "src/assets/problems/NY21G4M/NY21G4M-problems.json";
import * as NY21G4EProblems from "src/assets/problems/NY21G4E/NY21G4E-problems.json";
import * as NY19G4MProblems from "src/assets/problems/NY19G4M/NY19G4M-problems.json";
import * as NY19G4EProblems from "src/assets/problems/NY19G4E/NY19G4E-problems.json";
import * as NY18G4MProblems from "src/assets/problems/NY18G4M/NY18G4M-problems.json";
import * as NY18G4EProblems from "src/assets/problems/NY18G4E/NY18G4E-problems.json";
import * as NY17G4MProblems from "src/assets/problems/NY17G4M/NY17G4M-problems.json";
import * as NY17G4EProblems from "src/assets/problems/NY17G4E/NY17G4E-problems.json";
import * as NY16G4MProblems from "src/assets/problems/NY16G4M/NY16G4M-problems.json";
import * as NY16G4EProblems from "src/assets/problems/NY16G4E/NY16G4E-problems.json";
import * as NY15G4MProblems from "src/assets/problems/NY15G4M/NY15G4M-problems.json";
import * as NY15G4EProblems from "src/assets/problems/NY15G4E/NY15G4E-problems.json";
import * as NY22G4SProblems from "src/assets/problems/NY22G4S/NY22G4S-problems.json";
import * as NY21G4SProblems from "src/assets/problems/NY21G4S/NY21G4S-problems.json";
import * as NY19G4SProblems from "src/assets/problems/NY19G4S/NY19G4S-problems.json";
import * as NY18G4SProblems from "src/assets/problems/NY18G4S/NY18G4S-problems.json";
import * as NY17G4SProblems from "src/assets/problems/NY17G4S/NY17G4S-problems.json";
import * as NY16G4SProblems from "src/assets/problems/NY16G4S/NY16G4S-problems.json";
import * as NY15G4SProblems from "src/assets/problems/NY15G4S/NY15G4S-problems.json";
import * as NY23G5MProblems from "src/assets/problems/NY23G5M/NY23G5M-problems.json";
import * as NY23G5EProblems from "src/assets/problems/NY23G5E/NY23G5E-problems.json";
import * as NY22G5MProblems from "src/assets/problems/NY22G5M/NY22G5M-problems.json";
import * as NY22G5EProblems from "src/assets/problems/NY22G5E/NY22G5E-problems.json";
import * as NY21G5MProblems from "src/assets/problems/NY21G5M/NY21G5M-problems.json";
import * as NY21G5EProblems from "src/assets/problems/NY21G5E/NY21G5E-problems.json";
import * as NY19G5MProblems from "src/assets/problems/NY19G5M/NY19G5M-problems.json";
import * as NY19G5EProblems from "src/assets/problems/NY19G5E/NY19G5E-problems.json";
import * as NY18G5MProblems from "src/assets/problems/NY18G5M/NY18G5M-problems.json";
import * as NY18G5EProblems from "src/assets/problems/NY18G5E/NY18G5E-problems.json";
import * as NY17G5MProblems from "src/assets/problems/NY17G5M/NY17G5M-problems.json";
import * as NY17G5EProblems from "src/assets/problems/NY17G5E/NY17G5E-problems.json";
import * as NY16G5MProblems from "src/assets/problems/NY16G5M/NY16G5M-problems.json";
import * as NY16G5EProblems from "src/assets/problems/NY16G5E/NY16G5E-problems.json";
import * as NY15G5MProblems from "src/assets/problems/NY15G5M/NY15G5M-problems.json";
import * as NY15G5EProblems from "src/assets/problems/NY15G5E/NY15G5E-problems.json";
import * as NY23G6MProblems from "src/assets/problems/NY23G6M/NY23G6M-problems.json";
import * as NY23G6EProblems from "src/assets/problems/NY23G6E/NY23G6E-problems.json";
import * as NY22G6MProblems from "src/assets/problems/NY22G6M/NY22G6M-problems.json";
import * as NY22G6EProblems from "src/assets/problems/NY22G6E/NY22G6E-problems.json";
import * as NY21G6MProblems from "src/assets/problems/NY21G6M/NY21G6M-problems.json";
import * as NY21G6EProblems from "src/assets/problems/NY21G6E/NY21G6E-problems.json";
import * as NY19G6MProblems from "src/assets/problems/NY19G6M/NY19G6M-problems.json";
import * as NY19G6EProblems from "src/assets/problems/NY19G6E/NY19G6E-problems.json";
import * as NY18G6MProblems from "src/assets/problems/NY18G6M/NY18G6M-problems.json";
import * as NY18G6EProblems from "src/assets/problems/NY18G6E/NY18G6E-problems.json";
import * as NY17G6MProblems from "src/assets/problems/NY17G6M/NY17G6M-problems.json";
import * as NY17G6EProblems from "src/assets/problems/NY17G6E/NY17G6E-problems.json";
import * as NY16G6MProblems from "src/assets/problems/NY16G6M/NY16G6M-problems.json";
import * as NY16G6EProblems from "src/assets/problems/NY16G6E/NY16G6E-problems.json";
import * as NY15G6MProblems from "src/assets/problems/NY15G6M/NY15G6M-problems.json";
import * as NY15G6EProblems from "src/assets/problems/NY15G6E/NY15G6E-problems.json";
import * as NY23G7MProblems from "src/assets/problems/NY23G7M/NY23G7M-problems.json";
import * as NY23G7EProblems from "src/assets/problems/NY23G7E/NY23G7E-problems.json";
import * as NY22G7MProblems from "src/assets/problems/NY22G7M/NY22G7M-problems.json";
import * as NY22G7EProblems from "src/assets/problems/NY22G7E/NY22G7E-problems.json";
import * as NY21G7MProblems from "src/assets/problems/NY21G7M/NY21G7M-problems.json";
import * as NY21G7EProblems from "src/assets/problems/NY21G7E/NY21G7E-problems.json";
import * as NY19G7MProblems from "src/assets/problems/NY19G7M/NY19G7M-problems.json";
import * as NY19G7EProblems from "src/assets/problems/NY19G7E/NY19G7E-problems.json";
import * as NY18G7MProblems from "src/assets/problems/NY18G7M/NY18G7M-problems.json";
import * as NY18G7EProblems from "src/assets/problems/NY18G7E/NY18G7E-problems.json";
import * as NY17G7MProblems from "src/assets/problems/NY17G7M/NY17G7M-problems.json";
import * as NY17G7EProblems from "src/assets/problems/NY17G7E/NY17G7E-problems.json";
import * as NY16G7MProblems from "src/assets/problems/NY16G7M/NY16G7M-problems.json";
import * as NY16G7EProblems from "src/assets/problems/NY16G7E/NY16G7E-problems.json";
import * as NY15G7MProblems from "src/assets/problems/NY15G7M/NY15G7M-problems.json";
import * as NY15G7EProblems from "src/assets/problems/NY15G7E/NY15G7E-problems.json";
import * as NY23G8MProblems from "src/assets/problems/NY23G8M/NY23G8M-problems.json";
import * as NY23G8EProblems from "src/assets/problems/NY23G8E/NY23G8E-problems.json";
import * as NY22G8MProblems from "src/assets/problems/NY22G8M/NY22G8M-problems.json";
import * as NY22G8EProblems from "src/assets/problems/NY22G8E/NY22G8E-problems.json";
import * as NY21G8MProblems from "src/assets/problems/NY21G8M/NY21G8M-problems.json";
import * as NY21G8EProblems from "src/assets/problems/NY21G8E/NY21G8E-problems.json";
import * as NY19G8MProblems from "src/assets/problems/NY19G8M/NY19G8M-problems.json";
import * as NY19G8EProblems from "src/assets/problems/NY19G8E/NY19G8E-problems.json";
import * as NY18G8MProblems from "src/assets/problems/NY18G8M/NY18G8M-problems.json";
import * as NY18G8EProblems from "src/assets/problems/NY18G8E/NY18G8E-problems.json";
import * as NY17G8MProblems from "src/assets/problems/NY17G8M/NY17G8M-problems.json";
import * as NY17G8EProblems from "src/assets/problems/NY17G8E/NY17G8E-problems.json";
import * as NY16G8MProblems from "src/assets/problems/NY16G8M/NY16G8M-problems.json";
import * as NY16G8EProblems from "src/assets/problems/NY16G8E/NY16G8E-problems.json";
import * as NY15G8MProblems from "src/assets/problems/NY15G8M/NY15G8M-problems.json";
import * as NY15G8EProblems from "src/assets/problems/NY15G8E/NY15G8E-problems.json";
import * as NY22G8SProblems from "src/assets/problems/NY22G8S/NY22G8S-problems.json";
import * as NY21G8SProblems from "src/assets/problems/NY21G8S/NY21G8S-problems.json";
import * as NY19G8SProblems from "src/assets/problems/NY19G8S/NY19G8S-problems.json";
import * as NY18G8SProblems from "src/assets/problems/NY18G8S/NY18G8S-problems.json";
import * as NY17G8SProblems from "src/assets/problems/NY17G8S/NY17G8S-problems.json";
import * as NY16G8SProblems from "src/assets/problems/NY16G8S/NY16G8S-problems.json";
import * as NY15G8SProblems from "src/assets/problems/NY15G8S/NY15G8S-problems.json";
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
import * as PSAT1M1Problems from "src/assets/problems/PSAT1M1/PSAT1M1-problems.json";
import * as PSAT1M2Problems from "src/assets/problems/PSAT1M2/PSAT1M2-problems.json";
import * as PSAT1RW1Problems from "src/assets/problems/PSAT1RW1/PSAT1RW1-problems.json";
import * as PSAT1RW2Problems from "src/assets/problems/PSAT1RW2/PSAT1RW2-problems.json";
import * as RI23G3MProblems from "src/assets/problems/RI23G3M/RI23G3M-problems.json";
import * as RI22G3MProblems from "src/assets/problems/RI22G3M/RI22G3M-problems.json";
import * as RI21G3MProblems from "src/assets/problems/RI21G3M/RI21G3M-problems.json";
import * as RI19G3MProblems from "src/assets/problems/RI19G3M/RI19G3M-problems.json";
import * as RI18G3MProblems from "src/assets/problems/RI18G3M/RI18G3M-problems.json";
import * as RI23G3EProblems from "src/assets/problems/RI23G3E/RI23G3E-problems.json";
import * as RI22G3EProblems from "src/assets/problems/RI22G3E/RI22G3E-problems.json";
import * as RI21G3EProblems from "src/assets/problems/RI21G3E/RI21G3E-problems.json";
import * as RI19G3EProblems from "src/assets/problems/RI19G3E/RI19G3E-problems.json";
import * as RI18G3EProblems from "src/assets/problems/RI18G3E/RI18G3E-problems.json";
import * as RI23G4MProblems from "src/assets/problems/RI23G4M/RI23G4M-problems.json";
import * as RI22G4MProblems from "src/assets/problems/RI22G4M/RI22G4M-problems.json";
import * as RI21G4MProblems from "src/assets/problems/RI21G4M/RI21G4M-problems.json";
import * as RI19G4MProblems from "src/assets/problems/RI19G4M/RI19G4M-problems.json";
import * as RI18G4MProblems from "src/assets/problems/RI18G4M/RI18G4M-problems.json";
import * as RI23G4EProblems from "src/assets/problems/RI23G4E/RI23G4E-problems.json";
import * as RI22G4EProblems from "src/assets/problems/RI22G4E/RI22G4E-problems.json";
import * as RI21G4EProblems from "src/assets/problems/RI21G4E/RI21G4E-problems.json";
import * as RI19G4EProblems from "src/assets/problems/RI19G4E/RI19G4E-problems.json";
import * as RI18G4EProblems from "src/assets/problems/RI18G4E/RI18G4E-problems.json";
import * as RI23G5MProblems from "src/assets/problems/RI23G5M/RI23G5M-problems.json";
import * as RI22G5MProblems from "src/assets/problems/RI22G5M/RI22G5M-problems.json";
import * as RI21G5MProblems from "src/assets/problems/RI21G5M/RI21G5M-problems.json";
import * as RI19G5MProblems from "src/assets/problems/RI19G5M/RI19G5M-problems.json";
import * as RI18G5MProblems from "src/assets/problems/RI18G5M/RI18G5M-problems.json";
import * as RI23G5EProblems from "src/assets/problems/RI23G5E/RI23G5E-problems.json";
import * as RI22G5EProblems from "src/assets/problems/RI22G5E/RI22G5E-problems.json";
import * as RI21G5EProblems from "src/assets/problems/RI21G5E/RI21G5E-problems.json";
import * as RI19G5EProblems from "src/assets/problems/RI19G5E/RI19G5E-problems.json";
import * as RI18G5EProblems from "src/assets/problems/RI18G5E/RI18G5E-problems.json";
import * as RI23G6MProblems from "src/assets/problems/RI23G6M/RI23G6M-problems.json";
import * as RI22G6MProblems from "src/assets/problems/RI22G6M/RI22G6M-problems.json";
import * as RI21G6MProblems from "src/assets/problems/RI21G6M/RI21G6M-problems.json";
import * as RI19G6MProblems from "src/assets/problems/RI19G6M/RI19G6M-problems.json";
import * as RI18G6MProblems from "src/assets/problems/RI18G6M/RI18G6M-problems.json";
import * as RI23G6EProblems from "src/assets/problems/RI23G6E/RI23G6E-problems.json";
import * as RI22G6EProblems from "src/assets/problems/RI22G6E/RI22G6E-problems.json";
import * as RI21G6EProblems from "src/assets/problems/RI21G6E/RI21G6E-problems.json";
import * as RI19G6EProblems from "src/assets/problems/RI19G6E/RI19G6E-problems.json";
import * as RI18G6EProblems from "src/assets/problems/RI18G6E/RI18G6E-problems.json";
import * as RI23G7MProblems from "src/assets/problems/RI23G7M/RI23G7M-problems.json";
import * as RI22G7MProblems from "src/assets/problems/RI22G7M/RI22G7M-problems.json";
import * as RI21G7MProblems from "src/assets/problems/RI21G7M/RI21G7M-problems.json";
import * as RI19G7MProblems from "src/assets/problems/RI19G7M/RI19G7M-problems.json";
import * as RI18G7MProblems from "src/assets/problems/RI18G7M/RI18G7M-problems.json";
import * as RI23G7EProblems from "src/assets/problems/RI23G7E/RI23G7E-problems.json";
import * as RI22G7EProblems from "src/assets/problems/RI22G7E/RI22G7E-problems.json";
import * as RI21G7EProblems from "src/assets/problems/RI21G7E/RI21G7E-problems.json";
import * as RI19G7EProblems from "src/assets/problems/RI19G7E/RI19G7E-problems.json";
import * as RI18G7EProblems from "src/assets/problems/RI18G7E/RI18G7E-problems.json";
import * as RI23G8MProblems from "src/assets/problems/RI23G8M/RI23G8M-problems.json";
import * as RI22G8MProblems from "src/assets/problems/RI22G8M/RI22G8M-problems.json";
import * as RI21G8MProblems from "src/assets/problems/RI21G8M/RI21G8M-problems.json";
import * as RI19G8MProblems from "src/assets/problems/RI19G8M/RI19G8M-problems.json";
import * as RI18G8MProblems from "src/assets/problems/RI18G8M/RI18G8M-problems.json";
import * as RI23G8EProblems from "src/assets/problems/RI23G8E/RI23G8E-problems.json";
import * as RI22G8EProblems from "src/assets/problems/RI22G8E/RI22G8E-problems.json";
import * as RI21G8EProblems from "src/assets/problems/RI21G8E/RI21G8E-problems.json";
import * as RI19G8EProblems from "src/assets/problems/RI19G8E/RI19G8E-problems.json";
import * as RI18G8EProblems from "src/assets/problems/RI18G8E/RI18G8E-problems.json";
import * as SAT1M1Problems from "src/assets/problems/SAT1M1/SAT1M1-problems.json";
import * as SAT1M2Problems from "src/assets/problems/SAT1M2/SAT1M2-problems.json";
import * as SAT1RW1Problems from "src/assets/problems/SAT1RW1/SAT1RW1-problems.json";
import * as SAT1RW2Problems from "src/assets/problems/SAT1RW2/SAT1RW2-problems.json";
import * as SAT2M1Problems from "src/assets/problems/SAT2M1/SAT2M1-problems.json";
import * as SAT2M2Problems from "src/assets/problems/SAT2M2/SAT2M2-problems.json";
import * as SAT2RW1Problems from "src/assets/problems/SAT2RW1/SAT2RW1-problems.json";
import * as SAT2RW2Problems from "src/assets/problems/SAT2RW2/SAT2RW2-problems.json";
import * as SAT3M1Problems from "src/assets/problems/SAT3M1/SAT3M1-problems.json";
import * as SAT3M2Problems from "src/assets/problems/SAT3M2/SAT3M2-problems.json";
import * as SAT3RW1Problems from "src/assets/problems/SAT3RW1/SAT3RW1-problems.json";
import * as SAT3RW2Problems from "src/assets/problems/SAT3RW2/SAT3RW2-problems.json";
import * as SAT4M1Problems from "src/assets/problems/SAT4M1/SAT4M1-problems.json";
import * as SAT4M2Problems from "src/assets/problems/SAT4M2/SAT4M2-problems.json";
import * as SAT4RW1Problems from "src/assets/problems/SAT4RW1/SAT4RW1-problems.json";
import * as SAT4RW2Problems from "src/assets/problems/SAT4RW2/SAT4RW2-problems.json";
import * as SC18G3EProblems from "src/assets/problems/SC18G3E/SC18G3E-problems.json";
import * as SC18G4EProblems from "src/assets/problems/SC18G4E/SC18G4E-problems.json";
import * as SC18G5EProblems from "src/assets/problems/SC18G5E/SC18G5E-problems.json";
import * as SC18G6EProblems from "src/assets/problems/SC18G6E/SC18G6E-problems.json";
import * as SC18G7EProblems from "src/assets/problems/SC18G7E/SC18G7E-problems.json";
import * as SC18G8EProblems from "src/assets/problems/SC18G8E/SC18G8E-problems.json";
import * as SC18G3MProblems from "src/assets/problems/SC18G3M/SC18G3M-problems.json";
import * as SC18G4MProblems from "src/assets/problems/SC18G4M/SC18G4M-problems.json";
import * as SC18G5MProblems from "src/assets/problems/SC18G5M/SC18G5M-problems.json";
import * as SC18G6MProblems from "src/assets/problems/SC18G6M/SC18G6M-problems.json";
import * as SC18G7MProblems from "src/assets/problems/SC18G7M/SC18G7M-problems.json";
import * as SC18G8MProblems from "src/assets/problems/SC18G8M/SC18G8M-problems.json";
import * as SC18G4SProblems from "src/assets/problems/SC18G4S/SC18G4S-problems.json";
import * as SC18G6SProblems from "src/assets/problems/SC18G6S/SC18G6S-problems.json";
import * as TN20G3EProblems from "src/assets/problems/TN20G3E/TN20G3E-problems.json";
import * as TN20G3MProblems from "src/assets/problems/TN20G3M/TN20G3M-problems.json";
import * as TN20G3SProblems from "src/assets/problems/TN20G3S/TN20G3S-problems.json";
import * as TN20G4EProblems from "src/assets/problems/TN20G4E/TN20G4E-problems.json";
import * as TN20G4MProblems from "src/assets/problems/TN20G4M/TN20G4M-problems.json";
import * as TN20G4SProblems from "src/assets/problems/TN20G4S/TN20G4S-problems.json";
import * as TN20G5EProblems from "src/assets/problems/TN20G5E/TN20G5E-problems.json";
import * as TN20G5MProblems from "src/assets/problems/TN20G5M/TN20G5M-problems.json";
import * as TN20G5SProblems from "src/assets/problems/TN20G5S/TN20G5S-problems.json";
import * as TN20G6EProblems from "src/assets/problems/TN20G6E/TN20G6E-problems.json";
import * as TN20G6MProblems from "src/assets/problems/TN20G6M/TN20G6M-problems.json";
import * as TN20G6SProblems from "src/assets/problems/TN20G6S/TN20G6S-problems.json";
import * as TN20G6SSProblems from "src/assets/problems/TN20G6SS/TN20G6SS-problems.json";
import * as TN20G7EProblems from "src/assets/problems/TN20G7E/TN20G7E-problems.json";
import * as TN20G7MProblems from "src/assets/problems/TN20G7M/TN20G7M-problems.json";
import * as TN20G7SProblems from "src/assets/problems/TN20G7S/TN20G7S-problems.json";
import * as TN20G7SSProblems from "src/assets/problems/TN20G7SS/TN20G7SS-problems.json";
import * as TN20G8EProblems from "src/assets/problems/TN20G8E/TN20G8E-problems.json";
import * as TN20G8MProblems from "src/assets/problems/TN20G8M/TN20G8M-problems.json";
import * as TN20G8SProblems from "src/assets/problems/TN20G8S/TN20G8S-problems.json";
import * as TN20G8SSProblems from "src/assets/problems/TN20G8SS/TN20G8SS-problems.json";
import * as TN20HSA1Problems from "src/assets/problems/TN20HSA1/TN20HSA1-problems.json";
import * as TN20HSA2Problems from "src/assets/problems/TN20HSA2/TN20HSA2-problems.json";
import * as TN20HSBProblems from "src/assets/problems/TN20HSB/TN20HSB-problems.json";
import * as TN20HSE1Problems from "src/assets/problems/TN20HSE1/TN20HSE1-problems.json";
import * as TN20HSE2Problems from "src/assets/problems/TN20HSE2/TN20HSE2-problems.json";
import * as TN20HSGProblems from "src/assets/problems/TN20HSG/TN20HSG-problems.json";
import * as TN20HSUSHProblems from "src/assets/problems/TN20HSUSH/TN20HSUSH-problems.json";
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
import * as WIG3EProblems from "src/assets/problems/WIG3E/WIG3E-problems.json";
import * as WIG4EProblems from "src/assets/problems/WIG4E/WIG4E-problems.json";
import * as WIG5EProblems from "src/assets/problems/WIG5E/WIG5E-problems.json";
import * as WIG6EProblems from "src/assets/problems/WIG6E/WIG6E-problems.json";
import * as WIG7EProblems from "src/assets/problems/WIG7E/WIG7E-problems.json";
import * as WIG8EProblems from "src/assets/problems/WIG8E/WIG8E-problems.json";
import * as WIG3MProblems from "src/assets/problems/WIG3M/WIG3M-problems.json";
import * as WIG4MProblems from "src/assets/problems/WIG4M/WIG4M-problems.json";
import * as WIG5MProblems from "src/assets/problems/WIG5M/WIG5M-problems.json";
import * as WIG6MProblems from "src/assets/problems/WIG6M/WIG6M-problems.json";
import * as WIG7MProblems from "src/assets/problems/WIG7M/WIG7M-problems.json";
import * as WIG8MProblems from "src/assets/problems/WIG8M/WIG8M-problems.json";
import * as WIG4SProblems from "src/assets/problems/WIG4S/WIG4S-problems.json";
import * as WIG8SProblems from "src/assets/problems/WIG8S/WIG8S-problems.json";
import * as WIG4SSProblems from "src/assets/problems/WIG4SS/WIG4SS-problems.json";
import * as WIG8SSProblems from "src/assets/problems/WIG8SS/WIG8SS-problems.json";
import * as WIG10SSProblems from "src/assets/problems/WIG10SS/WIG10SS-problems.json";

// const MathJax = require('mathjax');
const confetti = require('canvas-confetti');

const confettiCanvas = document.getElementById('confettiCanvas');
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
    mobileWidth = 1000;
    blank = " ";

    user_data: any = {};
    my_students: string[] = [];
    my_students_data: any = {};
    selected_student: string = "";
    selected_student_st: string = "";
    selected_student_data: any = {};

    // et_counter: number = 0;
    // et_minutes: number = 0;
    // et_timer: any;
    // et_running: boolean = false;
    pt_counter: number = 0;
    pt_minutes: number = 0;
    pt_timer: any;
    pt_running: boolean = false;

    expand_filters = true;
    expand_refsheet = false;
    expand_supp = true;

    favorite_std_set: string[][] = [];

    key = "test";
    exam_attribute_dump: { [key: string]: { 'State': string, 'Grade': string, 'Subject': string, 'ExamName': string, 'ExamYear': string, 'ExamType': string, 'NumQuestions': number, 'Timer': number, 'HideTopics': boolean, 'Directions': string, 'RefSheet': string, 'Topics': { [key: string]: number }, 'Levels': { [key: string]: number }, 'Parts': string[] } } = examMetadata;
    exam_state = "";
    exam_grade = "";
    exam_subject = "";
    exam_name = "";
    exam_year = "";
    exam_type = "";
    exam_length = 73;

    exam_set = ['COG3E', 'COG4E', 'COG5E', 'COG6E', 'COG7E', 'COG8E', 'COG3M', 'COG4M', 'COG5M', 'COG6M', 'COG7M', 'COG8M', 'COG5S', 'COG8S', 'COHSS', 'DEG4SS', 'DEG7SS', 'DEG11SS', 'FL20G3M', 'FL20G3R', 'FL20G4M', 'FL20G4R', 'FL20G4W', 'FL20G5M', 'FL20G5R', 'FL20G5W', 'FL20G5S', 'FL20G6M', 'FL20G6R', 'FL20G6W', 'FL20G7M', 'FL20G7R', 'FL20G7W', 'FL20G8M', 'FL20G8R', 'FL20G8W', 'FL20G8S', 'FL20G9R', 'FL20G9W', 'FL20G10R', 'FL20G10W', 'ILG3E', 'ILG3M', 'ILG4E', 'ILG4M', 'ILG5E', 'ILG5M', 'ILG6E', 'ILG6M', 'ILG7E', 'ILG7M', 'ILG8E', 'ILG8M', 'MA23G3E', 'MA22G3E', 'MA21G3E', 'MA19G3E', 'MAG3E', 'MA23G3M', 'MA22G3M', 'MA21G3M', 'MA19G3M', 'MAG3M', 'MA23G4E', 'MA22G4E', 'MA21G4E', 'MA19G4E', 'MAG4E', 'MA23G4M', 'MA22G4M', 'MA21G4M', 'MA19G4M', 'MAG4M', 'MA23G5E', 'MA22G5E', 'MA21G5E', 'MA19G5E', 'MAG5E', 'MA23G5M', 'MA22G5M', 'MA21G5M', 'MA19G5M', 'MAG5M', 'MA23G5S', 'MA22G5S', 'MA21G5S', 'MA19G5S', 'MAG5S', 'MA23G6E', 'MA22G6E', 'MA21G6E', 'MA19G6E', 'MAG6E', 'MA23G6M', 'MA22G6M', 'MA21G6M', 'MA19G6M', 'MAG6M', 'MA23G7E', 'MA22G7E', 'MA21G7E', 'MA19G7E', 'MAG7E', 'MA23G7M', 'MA22G7M', 'MA21G7M', 'MA19G7M', 'MAG7M', 'MA23G8E', 'MA22G8E', 'MA21G8E', 'MA19G8E', 'MAG8E', 'MA23G8M', 'MA22G8M', 'MA21G8M', 'MA19G8M', 'MAG8M', 'MA23G8S', 'MA22G8S', 'MA21G8S', 'MA19G8S', 'MAG8S', 'MA23G10E', 'MA22G10E', 'MA21G10E', 'MA19G10E', 'MAG10E', 'MA23G10M', 'MA22G10M', 'MA21G10M', 'MA19G10M', 'MAG10M', 'MA23HSB', 'MA22HSB', 'MA19HSB', 'MA23HSP', 'MA22HSP', 'MA19HSP', 'MDG3E', 'MDG4E', 'MDG5E', 'MDG6E', 'MDG7E', 'MDG8E', 'MDG10E', 'MDG3M', 'MDG4M', 'MDG5M', 'MDG6M', 'MDG7M', 'MDG8M', 'MDG5S', 'MDG8S', 'MEG3M', 'MEG4M', 'MEG5M', 'MEG6M', 'MEG7M', 'MEG8M', 'MEG10M', 'MEG35R', 'MEG68R', 'MEG10R', 'MNG3M', 'MNG3R', 'MNG4M', 'MNG4R', 'MNG5M', 'MNG5R', 'MNG5S', 'MNG6M', 'MNG6R', 'MNG7M', 'MNG7R', 'MNG8M', 'MNG8R', 'MNG8S', 'MNG10R', 'MNG11M', 'MNHSS', 'MOG3E', 'MOG4E', 'MOG5E', 'MOG6E', 'MOG7E', 'MOG8E', 'MOG3M', 'MOG4M', 'MOG5M', 'MOG6M', 'MOG7M', 'MOG8M', 'MOG5S', 'MOG8S', 'MDG8SS', 'MS23G3E', 'MS22G3E', 'MS23G4E', 'MS22G4E', 'MS23G5E', 'MS22G5E', 'MS23G6E', 'MS22G6E', 'MS23G7E', 'MS22G7E', 'MS23G8E', 'MS22G8E', 'MS23G3M', 'MS22G3M', 'MS23G4M', 'MS22G4M', 'MS23G5M', 'MS22G5M', 'MS23G6M', 'MS22G6M', 'MS23G7M', 'MS22G7M', 'MS23G8M', 'MS22G8M', 'NEG3E', 'NEG3M', 'NEG4E', 'NEG4M', 'NEG5E', 'NEG5M', 'NEG5S', 'NEG6E', 'NEG6M', 'NEG7E', 'NEG7M', 'NEG8E', 'NEG8M', 'NEG8S', 'NJG3E', 'NJG3M', 'NJG4E', 'NJG4M', 'NJG5E', 'NJG5M', 'NJG5S', 'NJG6E', 'NJG6M', 'NJG7E', 'NJG7M', 'NJG8E', 'NJG8M', 'NJG8S', 'NJG9E', 'NJG11S', 'NMG3E', 'NMG3M', 'NMG4E', 'NMG4M', 'NMG5E', 'NMG5M', 'NMG5S', 'NMG6E', 'NMG6M', 'NMG7E', 'NMG7M', 'NMG8E', 'NMG8M', 'NMG8S', 'NMG11S', 'NY23G3M', 'NY23G3E', 'NY22G3M', 'NY22G3E', 'NY21G3M', 'NY21G3E', 'NY19G3M', 'NY19G3E', 'NY18G3M', 'NY18G3E', 'NY17G3M', 'NY17G3E', 'NY16G3M', 'NY16G3E', 'NY15G3M', 'NY15G3E', 'NY23G4M', 'NY23G4E', 'NY22G4M', 'NY22G4E', 'NY21G4M', 'NY21G4E', 'NY19G4M', 'NY19G4E', 'NY18G4M', 'NY18G4E', 'NY17G4M', 'NY17G4E', 'NY16G4M', 'NY16G4E', 'NY15G4M', 'NY15G4E', 'NY22G4S', 'NY21G4S', 'NY19G4S', 'NY18G4S', 'NY17G4S', 'NY16G4S', 'NY15G4S', 'NY23G5M', 'NY23G5E', 'NY22G5M', 'NY22G5E', 'NY21G5M', 'NY21G5E', 'NY19G5M', 'NY19G5E', 'NY18G5M', 'NY18G5E', 'NY17G5M', 'NY17G5E', 'NY16G5M', 'NY16G5E', 'NY15G5M', 'NY15G5E', 'NY23G6M', 'NY23G6E', 'NY22G6M', 'NY22G6E', 'NY21G6M', 'NY21G6E', 'NY19G6M', 'NY19G6E', 'NY18G6M', 'NY18G6E', 'NY17G6M', 'NY17G6E', 'NY16G6M', 'NY16G6E', 'NY15G6M', 'NY15G6E', 'NY23G7M', 'NY23G7E', 'NY22G7M', 'NY22G7E', 'NY21G7M', 'NY21G7E', 'NY19G7M', 'NY19G7E', 'NY18G7M', 'NY18G7E', 'NY17G7M', 'NY17G7E', 'NY16G7M', 'NY16G7E', 'NY15G7M', 'NY15G7E', 'NY23G8M', 'NY23G8E', 'NY22G8M', 'NY22G8E', 'NY21G8M', 'NY21G8E', 'NY19G8M', 'NY19G8E', 'NY18G8M', 'NY18G8E', 'NY17G8M', 'NY17G8E', 'NY16G8M', 'NY16G8E', 'NY15G8M', 'NY15G8E', 'NY22G8S', 'NY21G8S', 'NY19G8S', 'NY18G8S', 'NY17G8S', 'NY16G8S', 'NY15G8S', 'PA23G3M', 'PA23G3E', 'PA22G3M', 'PA22G3E', 'PA21G3M', 'PA21G3E', 'PA19G3M', 'PA19G3E', 'PA18G3M', 'PA18G3E', 'PA16G3M', 'PA16G3E', 'PA15G3M', 'PA15G3E', 'PA23G4M', 'PA23G4E', 'PA22G4M', 'PA22G4E', 'PA21G4M', 'PA21G4E', 'PA19G4M', 'PA19G4E', 'PA18G4M', 'PA18G4E', 'PA16G4M', 'PA16G4E', 'PA15G4M', 'PA15G4E', 'PA23G4S', 'PA22G4S', 'PA21G4S', 'PA19G4S', 'PA18G4S', 'PA16G4S', 'PA15G4S', 'PA23G5M', 'PA23G5E', 'PA22G5M', 'PA22G5E', 'PA21G5M', 'PA21G5E', 'PA19G5M', 'PA19G5E', 'PA18G5M', 'PA18G5E', 'PA16G5M', 'PA16G5E', 'PA15G5M', 'PA15G5E', 'PA23G6M', 'PA23G6E', 'PA22G6M', 'PA22G6E', 'PA21G6M', 'PA21G6E', 'PA19G6M', 'PA19G6E', 'PA18G6M', 'PA18G6E', 'PA16G6M', 'PA16G6E', 'PA15G6M', 'PA15G6E', 'PA23G7M', 'PA23G7E', 'PA22G7M', 'PA22G7E', 'PA21G7M', 'PA21G7E', 'PA19G7M', 'PA19G7E', 'PA18G7M', 'PA18G7E', 'PA16G7M', 'PA16G7E', 'PA15G7M', 'PA15G7E', 'PA23G8M', 'PA23G8E', 'PA22G8M', 'PA22G8E', 'PA21G8M', 'PA21G8E', 'PA19G8M', 'PA19G8E', 'PA18G8M', 'PA18G8E', 'PA16G8M', 'PA16G8E', 'PA15G8M', 'PA15G8E', 'PA23G8S', 'PA22G8S', 'PA21G8S', 'PA19G8S', 'PA18G8S', 'PA16G8S', 'PA15G8S', 'PSAT1RW1', 'PSAT1RW2', 'PSAT1M1', 'PSAT1M2', 'RI23G3M', 'RI22G3M', 'RI21G3M', 'RI19G3M', 'RI18G3M', 'RI23G3E', 'RI22G3E', 'RI21G3E', 'RI19G3E', 'RI18G3E', 'RI23G4M', 'RI22G4M', 'RI21G4M', 'RI19G4M', 'RI18G4M', 'RI23G4E', 'RI22G4E', 'RI21G4E', 'RI19G4E', 'RI18G4E', 'RI23G5M', 'RI22G5M', 'RI21G5M', 'RI19G5M', 'RI18G5M', 'RI23G5E', 'RI22G5E', 'RI21G5E', 'RI19G5E', 'RI18G5E', 'RI23G6M', 'RI22G6M', 'RI21G6M', 'RI19G6M', 'RI18G6M', 'RI23G6E', 'RI22G6E', 'RI21G6E', 'RI19G6E', 'RI18G6E', 'RI23G7M', 'RI22G7M', 'RI21G7M', 'RI19G7M', 'RI18G7M', 'RI23G7E', 'RI22G7E', 'RI21G7E', 'RI19G7E', 'RI18G7E', 'RI23G8M', 'RI22G8M', 'RI21G8M', 'RI19G8M', 'RI18G8M', 'RI23G8E', 'RI22G8E', 'RI21G8E', 'RI19G8E', 'RI18G8E', 'SAT1RW1', 'SAT1RW2', 'SAT1M1', 'SAT1M2', 'SAT2RW1', 'SAT2RW2', 'SAT2M1', 'SAT2M2', 'SAT3RW1', 'SAT3RW2', 'SAT3M1', 'SAT3M2', 'SAT4RW1', 'SAT4RW2', 'SAT4M1', 'SAT4M2', 'SC18G3E', 'SC18G4E', 'SC18G5E', 'SC18G6E', 'SC18G7E', 'SC18G8E', 'SC18G3M', 'SC18G4M', 'SC18G5M', 'SC18G6M', 'SC18G7M', 'SC18G8M', 'SC18G4S', 'SC18G6S', 'TN20G3E', 'TN20G3M', 'TN20G3S', 'TN20G4E', 'TN20G4M', 'TN20G4S', 'TN20G5E', 'TN20G5M', 'TN20G5S', 'TN20G6E', 'TN20G6M', 'TN20G6S', 'TN20G6SS', 'TN20G7E', 'TN20G7M', 'TN20G7S', 'TN20G7SS', 'TN20G8E', 'TN20G8M', 'TN20G8S', 'TN20G8SS', 'TN20HSA1', 'TN20HSA2', 'TN20HSB', 'TN20HSE1', 'TN20HSE2', 'TN20HSG', 'TN20HSUSH', 'TX22G3M', 'TX22G3R', 'TX21G3M', 'TX21G3R', 'TX19G3M', 'TX19G3R', 'TX18G3M', 'TX18G3R', 'TX17G3M', 'TX17G3R', 'TX22G4M', 'TX22G4R', 'TX21G4M', 'TX21G4R', 'TX19G4M', 'TX19G4R', 'TX18G4M', 'TX18G4R', 'TX17G4M', 'TX17G4R', 'TX22G5M', 'TX22G5R', 'TX21G5M', 'TX21G5R', 'TX19G5M', 'TX19G5R', 'TX18G5M', 'TX18G5R', 'TX17G5M', 'TX17G5R', 'TX22G5S', 'TX21G5S', 'TX19G5S', 'TX18G5S', 'TX22G6M', 'TX22G6R', 'TX21G6M', 'TX21G6R', 'TX19G6M', 'TX19G6R', 'TX18G6M', 'TX18G6R', 'TX17G6M', 'TX17G6R', 'TX22G7M', 'TX22G7R', 'TX21G7M', 'TX21G7R', 'TX19G7M', 'TX19G7R', 'TX18G7M', 'TX18G7R', 'TX17G7M', 'TX17G7R', 'TX22G8M', 'TX22G8R', 'TX21G8M', 'TX21G8R', 'TX19G8M', 'TX19G8R', 'TX18G8M', 'TX18G8R', 'TX17G8M', 'TX17G8R', 'TX22G8S', 'TX21G8S', 'TX19G8S', 'TX18G8S', 'TX22G8SS', 'TX21G8SS', 'TX19G8SS', 'TX18G8SS', 'TX22HSA1', 'TX21HSA1', 'TX19HSA1', 'TX18HSA1', 'TX17HSA1', 'TX22HSB', 'TX21HSB', 'TX19HSB', 'TX18HSB', 'TX17HSB', 'TX22HSE1', 'TX21HSE1', 'TX19HSE1', 'TX18HSE1', 'TX17HSE1', 'TX22HSE2', 'TX21HSE2', 'TX19HSE2', 'TX18HSE2', 'TX17HSE2', 'TX22HSUSH', 'TX21HSUSH', 'TX19HSUSH', 'TX18HSUSH', 'TX17HSUSH', 'WIG3E', 'WIG4E', 'WIG5E', 'WIG6E', 'WIG7E', 'WIG8E', 'WIG3M', 'WIG4M', 'WIG5M', 'WIG6M', 'WIG7M', 'WIG8M', 'WIG4S', 'WIG8S', 'WIG4SS', 'WIG8SS', 'WIG10SS'];

    test_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TestProblems;
    COG3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = COG3EProblems;
    COG4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = COG4EProblems;
    COG5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = COG5EProblems;
    COG6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = COG6EProblems;
    COG7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = COG7EProblems;
    COG8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = COG8EProblems;
    COG3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = COG3MProblems;
    COG4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = COG4MProblems;
    COG5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = COG5MProblems;
    COG6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = COG6MProblems;
    COG7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = COG7MProblems;
    COG8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = COG8MProblems;
    COG5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = COG5SProblems;
    COG8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = COG8SProblems;
    COHSS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = COHSSProblems;
    DEG4SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = DEG4SSProblems;
    DEG7SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = DEG7SSProblems;
    DEG11SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = DEG11SSProblems;
    FL20G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G3MProblems;
    FL20G3R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G3RProblems;
    FL20G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G4MProblems;
    FL20G4R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G4RProblems;
    FL20G4W_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G4WProblems;
    FL20G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G5MProblems;
    FL20G5R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G5RProblems;
    FL20G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G5SProblems;
    FL20G5W_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G5WProblems;
    FL20G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G6MProblems;
    FL20G6R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G6RProblems;
    FL20G6W_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G6WProblems;
    FL20G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G7MProblems;
    FL20G7R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G7RProblems;
    FL20G7W_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G7WProblems;
    FL20G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G8MProblems;
    FL20G8R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G8RProblems;
    FL20G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G8SProblems;
    FL20G8W_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G8WProblems;
    FL20G9R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G9RProblems;
    FL20G9W_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G9WProblems;
    FL20G10R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G10RProblems;
    FL20G10W_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = FL20G10WProblems;
    ILG3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = ILG3EProblems;
    ILG3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = ILG3MProblems;
    ILG4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = ILG4EProblems;
    ILG4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = ILG4MProblems;
    ILG5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = ILG5EProblems;
    ILG5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = ILG5MProblems;
    ILG6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = ILG6EProblems;
    ILG6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = ILG6MProblems;
    ILG7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = ILG7EProblems;
    ILG7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = ILG7MProblems;
    ILG8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = ILG8EProblems;
    ILG8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = ILG8MProblems;
    MA23G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA23G3EProblems;
    MA22G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA22G3EProblems;
    MA21G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA21G3EProblems;
    MA19G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA19G3EProblems;
    MAG3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MAG3EProblems;
    MA23G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA23G3MProblems;
    MA22G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA22G3MProblems;
    MA21G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA21G3MProblems;
    MA19G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA19G3MProblems;
    MAG3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MAG3MProblems;
    MA23G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA23G4EProblems;
    MA22G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA22G4EProblems;
    MA21G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA21G4EProblems;
    MA19G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA19G4EProblems;
    MAG4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MAG4EProblems;
    MA23G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA23G4MProblems;
    MA22G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA22G4MProblems;
    MA21G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA21G4MProblems;
    MA19G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA19G4MProblems;
    MAG4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MAG4MProblems;
    MA23G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA23G5EProblems;
    MA22G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA22G5EProblems;
    MA21G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA21G5EProblems;
    MA19G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA19G5EProblems;
    MAG5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MAG5EProblems;
    MA23G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA23G5MProblems;
    MA22G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA22G5MProblems;
    MA21G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA21G5MProblems;
    MA19G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA19G5MProblems;
    MAG5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MAG5MProblems;
    MA23G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA23G5SProblems;
    MA22G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA22G5SProblems;
    MA21G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA21G5SProblems;
    MA19G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA19G5SProblems;
    MAG5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MAG5SProblems;
    MA23G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA23G6EProblems;
    MA22G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA22G6EProblems;
    MA21G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA21G6EProblems;
    MA19G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA19G6EProblems;
    MAG6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MAG6EProblems;
    MA23G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA23G6MProblems;
    MA22G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA22G6MProblems;
    MA21G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA21G6MProblems;
    MA19G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA19G6MProblems;
    MAG6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MAG6MProblems;
    MA23G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA23G7EProblems;
    MA22G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA22G7EProblems;
    MA21G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA21G7EProblems;
    MA19G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA19G7EProblems;
    MAG7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MAG7EProblems;
    MA23G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA23G7MProblems;
    MA22G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA22G7MProblems;
    MA21G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA21G7MProblems;
    MA19G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA19G7MProblems;
    MAG7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MAG7MProblems;
    MA23G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA23G8EProblems;
    MA22G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA22G8EProblems;
    MA21G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA21G8EProblems;
    MA19G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA19G8EProblems;
    MAG8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MAG8EProblems;
    MA23G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA23G8MProblems;
    MA22G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA22G8MProblems;
    MA21G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA21G8MProblems;
    MA19G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA19G8MProblems;
    MAG8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MAG8MProblems;
    MA23G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA23G8SProblems;
    MA22G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA22G8SProblems;
    MA21G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA21G8SProblems;
    MA19G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA19G8SProblems;
    MAG8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MAG8SProblems;
    MA23G10E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA23G10EProblems;
    MA22G10E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA22G10EProblems;
    MA21G10E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA21G10EProblems;
    MA19G10E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA19G10EProblems;
    MAG10E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MAG10EProblems;
    MA23G10M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA23G10MProblems;
    MA22G10M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA22G10MProblems;
    MA21G10M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA21G10MProblems;
    MA19G10M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA19G10MProblems;
    MAG10M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MAG10MProblems;
    MA23HSB_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA23HSBProblems;
    MA22HSB_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA22HSBProblems;
    MA19HSB_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA19HSBProblems;
    MA23HSP_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA23HSPProblems;
    MA22HSP_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA22HSPProblems;
    MA19HSP_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MA19HSPProblems;
    MDG3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MDG3EProblems;
    MDG4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MDG4EProblems;
    MDG5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MDG5EProblems;
    MDG6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MDG6EProblems;
    MDG7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MDG7EProblems;
    MDG8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MDG8EProblems;
    MDG10E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MDG10EProblems;
    MDG3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MDG3MProblems;
    MDG4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MDG4MProblems;
    MDG5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MDG5MProblems;
    MDG6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MDG6MProblems;
    MDG7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MDG7MProblems;
    MDG8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MDG8MProblems;
    MDG5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MDG5SProblems;
    MDG8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MDG8SProblems;
    MDG8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MDG8SSProblems;
    MEG3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MEG3MProblems;
    MEG4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MEG4MProblems;
    MEG5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MEG5MProblems;
    MEG6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MEG6MProblems;
    MEG7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MEG7MProblems;
    MEG8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MEG8MProblems;
    MEG10M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MEG10MProblems;
    MEG35R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MEG35RProblems;
    MEG68R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MEG68RProblems;
    MEG10R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MEG10RProblems;
    MNG3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MNG3MProblems;
    MNG4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MNG4MProblems;
    MNG5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MNG5MProblems;
    MNG6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MNG6MProblems;
    MNG7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MNG7MProblems;
    MNG8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MNG8MProblems;
    MNG11M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MNG11MProblems;
    MNG3R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MNG3RProblems;
    MNG4R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MNG4RProblems;
    MNG5R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MNG5RProblems;
    MNG6R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MNG6RProblems;
    MNG7R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MNG7RProblems;
    MNG8R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MNG8RProblems;
    MNG10R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MNG10RProblems;
    MNG5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MNG5SProblems;
    MNG8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MNG8SProblems;
    MNHSS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MNHSSProblems;
    MOG3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MOG3EProblems;
    MOG4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MOG4EProblems;
    MOG5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MOG5EProblems;
    MOG6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MOG6EProblems;
    MOG7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MOG7EProblems;
    MOG8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MOG8EProblems;
    MOG3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MOG3MProblems;
    MOG4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MOG4MProblems;
    MOG5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MOG5MProblems;
    MOG6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MOG6MProblems;
    MOG7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MOG7MProblems;
    MOG8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MOG8MProblems;
    MOG5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MOG5SProblems;
    MOG8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MOG8SProblems;
    MS23G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS23G3EProblems;
    MS23G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS23G4EProblems;
    MS23G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS23G5EProblems;
    MS23G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS23G6EProblems;
    MS23G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS23G7EProblems;
    MS23G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS23G8EProblems;
    MS22G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS22G3EProblems;
    MS22G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS22G4EProblems;
    MS22G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS22G5EProblems;
    MS22G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS22G6EProblems;
    MS22G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS22G7EProblems;
    MS22G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS22G8EProblems;
    MS23G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS23G3MProblems;
    MS23G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS23G4MProblems;
    MS23G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS23G5MProblems;
    MS23G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS23G6MProblems;
    MS23G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS23G7MProblems;
    MS23G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS23G8MProblems;
    MS22G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS22G3MProblems;
    MS22G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS22G4MProblems;
    MS22G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS22G5MProblems;
    MS22G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS22G6MProblems;
    MS22G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS22G7MProblems;
    MS22G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = MS22G8MProblems;
    NEG3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NEG3EProblems;
    NEG3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NEG3MProblems;
    NEG4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NEG4EProblems;
    NEG4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NEG4MProblems;
    NEG5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NEG5EProblems;
    NEG5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NEG5MProblems;
    NEG5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NEG5SProblems;
    NEG6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NEG6EProblems;
    NEG6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NEG6MProblems;
    NEG7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NEG7EProblems;
    NEG7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NEG7MProblems;
    NEG8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NEG8EProblems;
    NEG8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NEG8MProblems;
    NEG8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NEG8SProblems;
    NJG3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NJG3EProblems;
    NJG3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NJG3MProblems;
    NJG4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NJG4EProblems;
    NJG4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NJG4MProblems;
    NJG5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NJG5EProblems;
    NJG5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NJG5MProblems;
    NJG5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NJG5SProblems;
    NJG6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NJG6EProblems;
    NJG6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NJG6MProblems;
    NJG7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NJG7EProblems;
    NJG7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NJG7MProblems;
    NJG8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NJG8EProblems;
    NJG8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NJG8MProblems;
    NJG8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NJG8SProblems;
    NJG9E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NJG9EProblems;
    NJG11S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NJG11SProblems;
    NMG3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NMG3EProblems;
    NMG3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NMG3MProblems;
    NMG4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NMG4EProblems;
    NMG4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NMG4MProblems;
    NMG5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NMG5EProblems;
    NMG5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NMG5MProblems;
    NMG5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NMG5SProblems;
    NMG6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NMG6EProblems;
    NMG6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NMG6MProblems;
    NMG7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NMG7EProblems;
    NMG7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NMG7MProblems;
    NMG8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NMG8EProblems;
    NMG8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NMG8MProblems;
    NMG8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NMG8SProblems;
    NMG11S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NMG11SProblems;
    NY23G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY23G3MProblems;
    NY23G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY23G3EProblems;
    NY22G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY22G3MProblems;
    NY22G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY22G3EProblems;
    NY21G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY21G3MProblems;
    NY21G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY21G3EProblems;
    NY19G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY19G3MProblems;
    NY19G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY19G3EProblems;
    NY18G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY18G3MProblems;
    NY18G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY18G3EProblems;
    NY17G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY17G3MProblems;
    NY17G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY17G3EProblems;
    NY16G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY16G3MProblems;
    NY16G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY16G3EProblems;
    NY15G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY15G3MProblems;
    NY15G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY15G3EProblems;
    NY23G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY23G4MProblems;
    NY23G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY23G4EProblems;
    NY22G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY22G4MProblems;
    NY22G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY22G4EProblems;
    NY21G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY21G4MProblems;
    NY21G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY21G4EProblems;
    NY19G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY19G4MProblems;
    NY19G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY19G4EProblems;
    NY18G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY18G4MProblems;
    NY18G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY18G4EProblems;
    NY17G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY17G4MProblems;
    NY17G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY17G4EProblems;
    NY16G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY16G4MProblems;
    NY16G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY16G4EProblems;
    NY15G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY15G4MProblems;
    NY15G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY15G4EProblems;
    NY22G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY22G4SProblems;
    NY21G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY21G4SProblems;
    NY19G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY19G4SProblems;
    NY18G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY18G4SProblems;
    NY17G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY17G4SProblems;
    NY16G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY16G4SProblems;
    NY15G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY15G4SProblems;
    NY23G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY23G5MProblems;
    NY23G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY23G5EProblems;
    NY22G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY22G5MProblems;
    NY22G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY22G5EProblems;
    NY21G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY21G5MProblems;
    NY21G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY21G5EProblems;
    NY19G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY19G5MProblems;
    NY19G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY19G5EProblems;
    NY18G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY18G5MProblems;
    NY18G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY18G5EProblems;
    NY17G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY17G5MProblems;
    NY17G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY17G5EProblems;
    NY16G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY16G5MProblems;
    NY16G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY16G5EProblems;
    NY15G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY15G5MProblems;
    NY15G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY15G5EProblems;
    NY23G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY23G6MProblems;
    NY23G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY23G6EProblems;
    NY22G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY22G6MProblems;
    NY22G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY22G6EProblems;
    NY21G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY21G6MProblems;
    NY21G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY21G6EProblems;
    NY19G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY19G6MProblems;
    NY19G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY19G6EProblems;
    NY18G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY18G6MProblems;
    NY18G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY18G6EProblems;
    NY17G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY17G6MProblems;
    NY17G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY17G6EProblems;
    NY16G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY16G6MProblems;
    NY16G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY16G6EProblems;
    NY15G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY15G6MProblems;
    NY15G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY15G6EProblems;
    NY23G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY23G7MProblems;
    NY23G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY23G7EProblems;
    NY22G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY22G7MProblems;
    NY22G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY22G7EProblems;
    NY21G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY21G7MProblems;
    NY21G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY21G7EProblems;
    NY19G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY19G7MProblems;
    NY19G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY19G7EProblems;
    NY18G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY18G7MProblems;
    NY18G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY18G7EProblems;
    NY17G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY17G7MProblems;
    NY17G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY17G7EProblems;
    NY16G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY16G7MProblems;
    NY16G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY16G7EProblems;
    NY15G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY15G7MProblems;
    NY15G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY15G7EProblems;
    NY23G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY23G8MProblems;
    NY23G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY23G8EProblems;
    NY22G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY22G8MProblems;
    NY22G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY22G8EProblems;
    NY21G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY21G8MProblems;
    NY21G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY21G8EProblems;
    NY19G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY19G8MProblems;
    NY19G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY19G8EProblems;
    NY18G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY18G8MProblems;
    NY18G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY18G8EProblems;
    NY17G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY17G8MProblems;
    NY17G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY17G8EProblems;
    NY16G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY16G8MProblems;
    NY16G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY16G8EProblems;
    NY15G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY15G8MProblems;
    NY15G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY15G8EProblems;
    NY22G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY22G8SProblems;
    NY21G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY21G8SProblems;
    NY19G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY19G8SProblems;
    NY18G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY18G8SProblems;
    NY17G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY17G8SProblems;
    NY16G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY16G8SProblems;
    NY15G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = NY15G8SProblems;
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
    PSAT1M1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PSAT1M1Problems;
    PSAT1M2_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PSAT1M2Problems;
    PSAT1RW1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PSAT1RW1Problems;
    PSAT1RW2_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PSAT1RW2Problems;
    RI23G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI23G3MProblems;
    RI22G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI22G3MProblems;
    RI21G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI21G3MProblems;
    RI19G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI19G3MProblems;
    RI18G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI18G3MProblems;
    RI23G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI23G3EProblems;
    RI22G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI22G3EProblems;
    RI21G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI21G3EProblems;
    RI19G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI19G3EProblems;
    RI18G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI18G3EProblems;
    RI23G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI23G4MProblems;
    RI22G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI22G4MProblems;
    RI21G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI21G4MProblems;
    RI19G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI19G4MProblems;
    RI18G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI18G4MProblems;
    RI23G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI23G4EProblems;
    RI22G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI22G4EProblems;
    RI21G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI21G4EProblems;
    RI19G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI19G4EProblems;
    RI18G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI18G4EProblems;
    RI23G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI23G5MProblems;
    RI22G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI22G5MProblems;
    RI21G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI21G5MProblems;
    RI19G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI19G5MProblems;
    RI18G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI18G5MProblems;
    RI23G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI23G5EProblems;
    RI22G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI22G5EProblems;
    RI21G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI21G5EProblems;
    RI19G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI19G5EProblems;
    RI18G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI18G5EProblems;
    RI23G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI23G6MProblems;
    RI22G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI22G6MProblems;
    RI21G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI21G6MProblems;
    RI19G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI19G6MProblems;
    RI18G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI18G6MProblems;
    RI23G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI23G6EProblems;
    RI22G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI22G6EProblems;
    RI21G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI21G6EProblems;
    RI19G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI19G6EProblems;
    RI18G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI18G6EProblems;
    RI23G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI23G7MProblems;
    RI22G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI22G7MProblems;
    RI21G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI21G7MProblems;
    RI19G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI19G7MProblems;
    RI18G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI18G7MProblems;
    RI23G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI23G7EProblems;
    RI22G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI22G7EProblems;
    RI21G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI21G7EProblems;
    RI19G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI19G7EProblems;
    RI18G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI18G7EProblems;
    RI23G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI23G8MProblems;
    RI22G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI22G8MProblems;
    RI21G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI21G8MProblems;
    RI19G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI19G8MProblems;
    RI18G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI18G8MProblems;
    RI23G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI23G8EProblems;
    RI22G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI22G8EProblems;
    RI21G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI21G8EProblems;
    RI19G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI19G8EProblems;
    RI18G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = RI18G8EProblems;
    SAT1M1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SAT1M1Problems;
    SAT1M2_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SAT1M2Problems;
    SAT1RW1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SAT1RW1Problems;
    SAT1RW2_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SAT1RW2Problems;
    SAT2M1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SAT2M1Problems;
    SAT2M2_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SAT2M2Problems;
    SAT2RW1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SAT2RW1Problems;
    SAT2RW2_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SAT2RW2Problems;
    SAT3M1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SAT3M1Problems;
    SAT3M2_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SAT3M2Problems;
    SAT3RW1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SAT3RW1Problems;
    SAT3RW2_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SAT3RW2Problems;
    SAT4M1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SAT4M1Problems;
    SAT4M2_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SAT4M2Problems;
    SAT4RW1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SAT4RW1Problems;
    SAT4RW2_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SAT4RW2Problems;
    SC18G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SC18G3EProblems;
    SC18G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SC18G4EProblems;
    SC18G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SC18G5EProblems;
    SC18G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SC18G6EProblems;
    SC18G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SC18G7EProblems;
    SC18G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SC18G8EProblems;
    SC18G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SC18G3MProblems;
    SC18G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SC18G4MProblems;
    SC18G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SC18G5MProblems;
    SC18G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SC18G6MProblems;
    SC18G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SC18G7MProblems;
    SC18G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SC18G8MProblems;
    SC18G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SC18G4SProblems;
    SC18G6S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = SC18G6SProblems;
    TN20G3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20G3EProblems;
    TN20G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20G3MProblems;
    TN20G3S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20G3SProblems;
    TN20G4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20G4EProblems;
    TN20G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20G4MProblems;
    TN20G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20G4SProblems;
    TN20G5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20G5EProblems;
    TN20G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20G5MProblems;
    TN20G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20G5SProblems;
    TN20G6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20G6EProblems;
    TN20G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20G6MProblems;
    TN20G6S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20G6SProblems;
    TN20G6SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20G6SSProblems;
    TN20G7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20G7EProblems;
    TN20G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20G7MProblems;
    TN20G7S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20G7SProblems;
    TN20G7SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20G7SSProblems;
    TN20G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20G8EProblems;
    TN20G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20G8MProblems;
    TN20G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20G8SProblems;
    TN20G8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20G8SSProblems;
    TN20HSA1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20HSA1Problems;
    TN20HSA2_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20HSA2Problems;
    TN20HSB_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20HSBProblems;
    TN20HSE1_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20HSE1Problems;
    TN20HSE2_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20HSE2Problems;
    TN20HSG_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20HSGProblems;
    TN20HSUSH_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TN20HSUSHProblems;
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
    WIG3E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = WIG3EProblems;
    WIG4E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = WIG4EProblems;
    WIG5E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = WIG5EProblems;
    WIG6E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = WIG6EProblems;
    WIG7E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = WIG7EProblems;
    WIG8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = WIG8EProblems;
    WIG3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = WIG3MProblems;
    WIG4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = WIG4MProblems;
    WIG5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = WIG5MProblems;
    WIG6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = WIG6MProblems;
    WIG7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = WIG7MProblems;
    WIG8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = WIG8MProblems;
    WIG4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = WIG4SProblems;
    WIG8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = WIG8SProblems;
    WIG4SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = WIG4SSProblems;
    WIG8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = WIG8SSProblems;
    WIG10SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = WIG10SSProblems;
    e_dump_dict: { [key: string]: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } } = {
        "COG3E": this.COG3E_exam_dump,
        "COG4E": this.COG4E_exam_dump,
        "COG5E": this.COG5E_exam_dump,
        "COG6E": this.COG6E_exam_dump,
        "COG7E": this.COG7E_exam_dump,
        "COG8E": this.COG8E_exam_dump,
        "COG3M": this.COG3M_exam_dump,
        "COG4M": this.COG4M_exam_dump,
        "COG5M": this.COG5M_exam_dump,
        "COG6M": this.COG6M_exam_dump,
        "COG7M": this.COG7M_exam_dump,
        "COG8M": this.COG8M_exam_dump,
        "COG5S": this.COG5S_exam_dump,
        "COG8S": this.COG8S_exam_dump,
        "COHSS": this.COHSS_exam_dump,
        "DEG4SS": this.DEG4SS_exam_dump,
        "DEG7SS": this.DEG7SS_exam_dump,
        "DEG11SS": this.DEG11SS_exam_dump,
        "FL20G3M": this.FL20G3M_exam_dump,
        "FL20G3R": this.FL20G3R_exam_dump,
        "FL20G4M": this.FL20G4M_exam_dump,
        "FL20G4R": this.FL20G4R_exam_dump,
        "FL20G4W": this.FL20G4W_exam_dump,
        "FL20G5M": this.FL20G5M_exam_dump,
        "FL20G5R": this.FL20G5R_exam_dump,
        "FL20G5S": this.FL20G5S_exam_dump,
        "FL20G5W": this.FL20G5W_exam_dump,
        "FL20G6M": this.FL20G6M_exam_dump,
        "FL20G6R": this.FL20G6R_exam_dump,
        "FL20G6W": this.FL20G6W_exam_dump,
        "FL20G7M": this.FL20G7M_exam_dump,
        "FL20G7R": this.FL20G7R_exam_dump,
        "FL20G7W": this.FL20G7W_exam_dump,
        "FL20G8M": this.FL20G8M_exam_dump,
        "FL20G8R": this.FL20G8R_exam_dump,
        "FL20G8S": this.FL20G8S_exam_dump,
        "FL20G8W": this.FL20G8W_exam_dump,
        "FL20G9R": this.FL20G9R_exam_dump,
        "FL20G9W": this.FL20G9W_exam_dump,
        "FL20G10R": this.FL20G10R_exam_dump,
        "FL20G10W": this.FL20G10W_exam_dump,
        "ILG3E": this.ILG3E_exam_dump,
        "ILG3M": this.ILG3M_exam_dump,
        "ILG4E": this.ILG4E_exam_dump,
        "ILG4M": this.ILG4M_exam_dump,
        "ILG5E": this.ILG5E_exam_dump,
        "ILG5M": this.ILG5M_exam_dump,
        "ILG6E": this.ILG6E_exam_dump,
        "ILG6M": this.ILG6M_exam_dump,
        "ILG7E": this.ILG7E_exam_dump,
        "ILG7M": this.ILG7M_exam_dump,
        "ILG8E": this.ILG8E_exam_dump,
        "ILG8M": this.ILG8M_exam_dump,
        "MA23G3E": this.MA23G3E_exam_dump,
        "MA22G3E": this.MA22G3E_exam_dump,
        "MA21G3E": this.MA21G3E_exam_dump,
        "MA19G3E": this.MA19G3E_exam_dump,
        "MAG3E": this.MAG3E_exam_dump,
        "MA23G3M": this.MA23G3M_exam_dump,
        "MA22G3M": this.MA22G3M_exam_dump,
        "MA21G3M": this.MA21G3M_exam_dump,
        "MA19G3M": this.MA19G3M_exam_dump,
        "MAG3M": this.MAG3M_exam_dump,
        "MA23G4E": this.MA23G4E_exam_dump,
        "MA22G4E": this.MA22G4E_exam_dump,
        "MA21G4E": this.MA21G4E_exam_dump,
        "MA19G4E": this.MA19G4E_exam_dump,
        "MAG4E": this.MAG4E_exam_dump,
        "MA23G4M": this.MA23G4M_exam_dump,
        "MA22G4M": this.MA22G4M_exam_dump,
        "MA21G4M": this.MA21G4M_exam_dump,
        "MA19G4M": this.MA19G4M_exam_dump,
        "MAG4M": this.MAG4M_exam_dump,
        "MA23G5E": this.MA23G5E_exam_dump,
        "MA22G5E": this.MA22G5E_exam_dump,
        "MA21G5E": this.MA21G5E_exam_dump,
        "MA19G5E": this.MA19G5E_exam_dump,
        "MAG5E": this.MAG5E_exam_dump,
        "MA23G5M": this.MA23G5M_exam_dump,
        "MA22G5M": this.MA22G5M_exam_dump,
        "MA21G5M": this.MA21G5M_exam_dump,
        "MA19G5M": this.MA19G5M_exam_dump,
        "MAG5M": this.MAG5M_exam_dump,
        "MA23G5S": this.MA23G5S_exam_dump,
        "MA22G5S": this.MA22G5S_exam_dump,
        "MA21G5S": this.MA21G5S_exam_dump,
        "MA19G5S": this.MA19G5S_exam_dump,
        "MAG5S": this.MAG5S_exam_dump,
        "MA23G6E": this.MA23G6E_exam_dump,
        "MA22G6E": this.MA22G6E_exam_dump,
        "MA21G6E": this.MA21G6E_exam_dump,
        "MA19G6E": this.MA19G6E_exam_dump,
        "MAG6E": this.MAG6E_exam_dump,
        "MA23G6M": this.MA23G6M_exam_dump,
        "MA22G6M": this.MA22G6M_exam_dump,
        "MA21G6M": this.MA21G6M_exam_dump,
        "MA19G6M": this.MA19G6M_exam_dump,
        "MAG6M": this.MAG6M_exam_dump,
        "MA23G7E": this.MA23G7E_exam_dump,
        "MA22G7E": this.MA22G7E_exam_dump,
        "MA21G7E": this.MA21G7E_exam_dump,
        "MA19G7E": this.MA19G7E_exam_dump,
        "MAG7E": this.MAG7E_exam_dump,
        "MA23G7M": this.MA23G7M_exam_dump,
        "MA22G7M": this.MA22G7M_exam_dump,
        "MA21G7M": this.MA21G7M_exam_dump,
        "MA19G7M": this.MA19G7M_exam_dump,
        "MAG7M": this.MAG7M_exam_dump,
        "MA23G8E": this.MA23G8E_exam_dump,
        "MA22G8E": this.MA22G8E_exam_dump,
        "MA21G8E": this.MA21G8E_exam_dump,
        "MA19G8E": this.MA19G8E_exam_dump,
        "MAG8E": this.MAG8E_exam_dump,
        "MA23G8M": this.MA23G8M_exam_dump,
        "MA22G8M": this.MA22G8M_exam_dump,
        "MA21G8M": this.MA21G8M_exam_dump,
        "MA19G8M": this.MA19G8M_exam_dump,
        "MAG8M": this.MAG8M_exam_dump,
        "MA23G8S": this.MA23G8S_exam_dump,
        "MA22G8S": this.MA22G8S_exam_dump,
        "MA21G8S": this.MA21G8S_exam_dump,
        "MA19G8S": this.MA19G8S_exam_dump,
        "MAG8S": this.MAG8S_exam_dump,
        "MA23G10E": this.MA23G10E_exam_dump,
        "MA22G10E": this.MA22G10E_exam_dump,
        "MA21G10E": this.MA21G10E_exam_dump,
        "MA19G10E": this.MA19G10E_exam_dump,
        "MAG10E": this.MAG10E_exam_dump,
        "MA23G10M": this.MA23G10M_exam_dump,
        "MA22G10M": this.MA22G10M_exam_dump,
        "MA21G10M": this.MA21G10M_exam_dump,
        "MA19G10M": this.MA19G10M_exam_dump,
        "MAG10M": this.MAG10M_exam_dump,
        "MA23HSB": this.MA23HSB_exam_dump,
        "MA22HSB": this.MA22HSB_exam_dump,
        "MA19HSB": this.MA19HSB_exam_dump,
        "MA23HSP": this.MA23HSP_exam_dump,
        "MA22HSP": this.MA22HSP_exam_dump,
        "MA19HSP": this.MA19HSP_exam_dump,
        "MDG3E": this.MDG3E_exam_dump,
        "MDG4E": this.MDG4E_exam_dump,
        "MDG5E": this.MDG5E_exam_dump,
        "MDG6E": this.MDG6E_exam_dump,
        "MDG7E": this.MDG7E_exam_dump,
        "MDG8E": this.MDG8E_exam_dump,
        "MDG10E": this.MDG10E_exam_dump,
        "MDG3M": this.MDG3M_exam_dump,
        "MDG4M": this.MDG4M_exam_dump,
        "MDG5M": this.MDG5M_exam_dump,
        "MDG6M": this.MDG6M_exam_dump,
        "MDG7M": this.MDG7M_exam_dump,
        "MDG8M": this.MDG8M_exam_dump,
        "MDG5S": this.MDG5S_exam_dump,
        "MDG8S": this.MDG8S_exam_dump,
        "MDG8SS": this.MDG8SS_exam_dump,
        "MEG3M": this.MEG3M_exam_dump,
        "MEG4M": this.MEG4M_exam_dump,
        "MEG5M": this.MEG5M_exam_dump,
        "MEG6M": this.MEG6M_exam_dump,
        "MEG7M": this.MEG7M_exam_dump,
        "MEG8M": this.MEG8M_exam_dump,
        "MEG10M": this.MEG10M_exam_dump,
        "MEG35R": this.MEG35R_exam_dump,
        "MEG68R": this.MEG68R_exam_dump,
        "MEG10R": this.MEG10R_exam_dump,
        "MNG3M": this.MNG3M_exam_dump,
        "MNG4M": this.MNG4M_exam_dump,
        "MNG5M": this.MNG5M_exam_dump,
        "MNG6M": this.MNG6M_exam_dump,
        "MNG7M": this.MNG7M_exam_dump,
        "MNG8M": this.MNG8M_exam_dump,
        "MNG11M": this.MNG11M_exam_dump,
        "MNG3R": this.MNG3R_exam_dump,
        "MNG4R": this.MNG4R_exam_dump,
        "MNG5R": this.MNG5R_exam_dump,
        "MNG6R": this.MNG6R_exam_dump,
        "MNG7R": this.MNG7R_exam_dump,
        "MNG8R": this.MNG8R_exam_dump,
        "MNG10R": this.MNG10R_exam_dump,
        "MNG5S": this.MNG5S_exam_dump,
        "MNG8S": this.MNG8S_exam_dump,
        "MNHSS": this.MNHSS_exam_dump,
        "MOG3E": this.MOG3E_exam_dump,
        "MOG4E": this.MOG4E_exam_dump,
        "MOG5E": this.MOG5E_exam_dump,
        "MOG6E": this.MOG6E_exam_dump,
        "MOG7E": this.MOG7E_exam_dump,
        "MOG8E": this.MOG8E_exam_dump,
        "MOG3M": this.MOG3M_exam_dump,
        "MOG4M": this.MOG4M_exam_dump,
        "MOG5M": this.MOG5M_exam_dump,
        "MOG6M": this.MOG6M_exam_dump,
        "MOG7M": this.MOG7M_exam_dump,
        "MOG8M": this.MOG8M_exam_dump,
        "MOG5S": this.MOG5S_exam_dump,
        "MOG8S": this.MOG8S_exam_dump,
        "MS23G3E": this.MS23G3E_exam_dump,
        "MS23G4E": this.MS23G4E_exam_dump,
        "MS23G5E": this.MS23G5E_exam_dump,
        "MS23G6E": this.MS23G6E_exam_dump,
        "MS23G7E": this.MS23G7E_exam_dump,
        "MS23G8E": this.MS23G8E_exam_dump,
        "MS22G3E": this.MS22G3E_exam_dump,
        "MS22G4E": this.MS22G4E_exam_dump,
        "MS22G5E": this.MS22G5E_exam_dump,
        "MS22G6E": this.MS22G6E_exam_dump,
        "MS22G7E": this.MS22G7E_exam_dump,
        "MS22G8E": this.MS22G8E_exam_dump,
        "MS23G3M": this.MS23G3M_exam_dump,
        "MS23G4M": this.MS23G4M_exam_dump,
        "MS23G5M": this.MS23G5M_exam_dump,
        "MS23G6M": this.MS23G6M_exam_dump,
        "MS23G7M": this.MS23G7M_exam_dump,
        "MS23G8M": this.MS23G8M_exam_dump,
        "MS22G3M": this.MS22G3M_exam_dump,
        "MS22G4M": this.MS22G4M_exam_dump,
        "MS22G5M": this.MS22G5M_exam_dump,
        "MS22G6M": this.MS22G6M_exam_dump,
        "MS22G7M": this.MS22G7M_exam_dump,
        "MS22G8M": this.MS22G8M_exam_dump,
        "NEG3E": this.NEG3E_exam_dump,
        "NEG3M": this.NEG3M_exam_dump,
        "NEG4E": this.NEG4E_exam_dump,
        "NEG4M": this.NEG4M_exam_dump,
        "NEG5E": this.NEG5E_exam_dump,
        "NEG5M": this.NEG5M_exam_dump,
        "NEG5S": this.NEG5S_exam_dump,
        "NEG6E": this.NEG6E_exam_dump,
        "NEG6M": this.NEG6M_exam_dump,
        "NEG7E": this.NEG7E_exam_dump,
        "NEG7M": this.NEG7M_exam_dump,
        "NEG8E": this.NEG8E_exam_dump,
        "NEG8M": this.NEG8M_exam_dump,
        "NEG8S": this.NEG8S_exam_dump,
        "NJG3E": this.NJG3E_exam_dump,
        "NJG3M": this.NJG3M_exam_dump,
        "NJG4E": this.NJG4E_exam_dump,
        "NJG4M": this.NJG4M_exam_dump,
        "NJG5E": this.NJG5E_exam_dump,
        "NJG5M": this.NJG5M_exam_dump,
        "NJG5S": this.NJG5S_exam_dump,
        "NJG6E": this.NJG6E_exam_dump,
        "NJG6M": this.NJG6M_exam_dump,
        "NJG7E": this.NJG7E_exam_dump,
        "NJG7M": this.NJG7M_exam_dump,
        "NJG8E": this.NJG8E_exam_dump,
        "NJG8M": this.NJG8M_exam_dump,
        "NJG8S": this.NJG8S_exam_dump,
        "NJG9E": this.NJG9E_exam_dump,
        "NJG11S": this.NJG11S_exam_dump,
        "NMG3E": this.NMG3E_exam_dump,
        "NMG3M": this.NMG3M_exam_dump,
        "NMG4E": this.NMG4E_exam_dump,
        "NMG4M": this.NMG4M_exam_dump,
        "NMG5E": this.NMG5E_exam_dump,
        "NMG5M": this.NMG5M_exam_dump,
        "NMG5S": this.NMG5S_exam_dump,
        "NMG6E": this.NMG6E_exam_dump,
        "NMG6M": this.NMG6M_exam_dump,
        "NMG7E": this.NMG7E_exam_dump,
        "NMG7M": this.NMG7M_exam_dump,
        "NMG8E": this.NMG8E_exam_dump,
        "NMG8M": this.NMG8M_exam_dump,
        "NMG8S": this.NMG8S_exam_dump,
        "NMG11S": this.NMG11S_exam_dump,
        "NY23G3M": this.NY23G3M_exam_dump,
        "NY23G3E": this.NY23G3E_exam_dump,
        "NY22G3M": this.NY22G3M_exam_dump,
        "NY22G3E": this.NY22G3E_exam_dump,
        "NY21G3M": this.NY21G3M_exam_dump,
        "NY21G3E": this.NY21G3E_exam_dump,
        "NY19G3M": this.NY19G3M_exam_dump,
        "NY19G3E": this.NY19G3E_exam_dump,
        "NY18G3M": this.NY18G3M_exam_dump,
        "NY18G3E": this.NY18G3E_exam_dump,
        "NY17G3M": this.NY17G3M_exam_dump,
        "NY17G3E": this.NY17G3E_exam_dump,
        "NY16G3M": this.NY16G3M_exam_dump,
        "NY16G3E": this.NY16G3E_exam_dump,
        "NY15G3M": this.NY15G3M_exam_dump,
        "NY15G3E": this.NY15G3E_exam_dump,
        "NY23G4M": this.NY23G4M_exam_dump,
        "NY23G4E": this.NY23G4E_exam_dump,
        "NY22G4M": this.NY22G4M_exam_dump,
        "NY22G4E": this.NY22G4E_exam_dump,
        "NY21G4M": this.NY21G4M_exam_dump,
        "NY21G4E": this.NY21G4E_exam_dump,
        "NY19G4M": this.NY19G4M_exam_dump,
        "NY19G4E": this.NY19G4E_exam_dump,
        "NY18G4M": this.NY18G4M_exam_dump,
        "NY18G4E": this.NY18G4E_exam_dump,
        "NY17G4M": this.NY17G4M_exam_dump,
        "NY17G4E": this.NY17G4E_exam_dump,
        "NY16G4M": this.NY16G4M_exam_dump,
        "NY16G4E": this.NY16G4E_exam_dump,
        "NY15G4M": this.NY15G4M_exam_dump,
        "NY15G4E": this.NY15G4E_exam_dump,
        "NY22G4S": this.NY22G4S_exam_dump,
        "NY21G4S": this.NY21G4S_exam_dump,
        "NY19G4S": this.NY19G4S_exam_dump,
        "NY18G4S": this.NY18G4S_exam_dump,
        "NY17G4S": this.NY17G4S_exam_dump,
        "NY16G4S": this.NY16G4S_exam_dump,
        "NY15G4S": this.NY15G4S_exam_dump,
        "NY23G5M": this.NY23G5M_exam_dump,
        "NY23G5E": this.NY23G5E_exam_dump,
        "NY22G5M": this.NY22G5M_exam_dump,
        "NY22G5E": this.NY22G5E_exam_dump,
        "NY21G5M": this.NY21G5M_exam_dump,
        "NY21G5E": this.NY21G5E_exam_dump,
        "NY19G5M": this.NY19G5M_exam_dump,
        "NY19G5E": this.NY19G5E_exam_dump,
        "NY18G5M": this.NY18G5M_exam_dump,
        "NY18G5E": this.NY18G5E_exam_dump,
        "NY17G5M": this.NY17G5M_exam_dump,
        "NY17G5E": this.NY17G5E_exam_dump,
        "NY16G5M": this.NY16G5M_exam_dump,
        "NY16G5E": this.NY16G5E_exam_dump,
        "NY15G5M": this.NY15G5M_exam_dump,
        "NY15G5E": this.NY15G5E_exam_dump,
        "NY23G6M": this.NY23G6M_exam_dump,
        "NY23G6E": this.NY23G6E_exam_dump,
        "NY22G6M": this.NY22G6M_exam_dump,
        "NY22G6E": this.NY22G6E_exam_dump,
        "NY21G6M": this.NY21G6M_exam_dump,
        "NY21G6E": this.NY21G6E_exam_dump,
        "NY19G6M": this.NY19G6M_exam_dump,
        "NY19G6E": this.NY19G6E_exam_dump,
        "NY18G6M": this.NY18G6M_exam_dump,
        "NY18G6E": this.NY18G6E_exam_dump,
        "NY17G6M": this.NY17G6M_exam_dump,
        "NY17G6E": this.NY17G6E_exam_dump,
        "NY16G6M": this.NY16G6M_exam_dump,
        "NY16G6E": this.NY16G6E_exam_dump,
        "NY15G6M": this.NY15G6M_exam_dump,
        "NY15G6E": this.NY15G6E_exam_dump,
        "NY23G7M": this.NY23G7M_exam_dump,
        "NY23G7E": this.NY23G7E_exam_dump,
        "NY22G7M": this.NY22G7M_exam_dump,
        "NY22G7E": this.NY22G7E_exam_dump,
        "NY21G7M": this.NY21G7M_exam_dump,
        "NY21G7E": this.NY21G7E_exam_dump,
        "NY19G7M": this.NY19G7M_exam_dump,
        "NY19G7E": this.NY19G7E_exam_dump,
        "NY18G7M": this.NY18G7M_exam_dump,
        "NY18G7E": this.NY18G7E_exam_dump,
        "NY17G7M": this.NY17G7M_exam_dump,
        "NY17G7E": this.NY17G7E_exam_dump,
        "NY16G7M": this.NY16G7M_exam_dump,
        "NY16G7E": this.NY16G7E_exam_dump,
        "NY15G7M": this.NY15G7M_exam_dump,
        "NY15G7E": this.NY15G7E_exam_dump,
        "NY23G8M": this.NY23G8M_exam_dump,
        "NY23G8E": this.NY23G8E_exam_dump,
        "NY22G8M": this.NY22G8M_exam_dump,
        "NY22G8E": this.NY22G8E_exam_dump,
        "NY21G8M": this.NY21G8M_exam_dump,
        "NY21G8E": this.NY21G8E_exam_dump,
        "NY19G8M": this.NY19G8M_exam_dump,
        "NY19G8E": this.NY19G8E_exam_dump,
        "NY18G8M": this.NY18G8M_exam_dump,
        "NY18G8E": this.NY18G8E_exam_dump,
        "NY17G8M": this.NY17G8M_exam_dump,
        "NY17G8E": this.NY17G8E_exam_dump,
        "NY16G8M": this.NY16G8M_exam_dump,
        "NY16G8E": this.NY16G8E_exam_dump,
        "NY15G8M": this.NY15G8M_exam_dump,
        "NY15G8E": this.NY15G8E_exam_dump,
        "NY22G8S": this.NY22G8S_exam_dump,
        "NY21G8S": this.NY21G8S_exam_dump,
        "NY19G8S": this.NY19G8S_exam_dump,
        "NY18G8S": this.NY18G8S_exam_dump,
        "NY17G8S": this.NY17G8S_exam_dump,
        "NY16G8S": this.NY16G8S_exam_dump,
        "NY15G8S": this.NY15G8S_exam_dump,
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
        "PSAT1M1": this.PSAT1M1_exam_dump,
        "PSAT1M2": this.PSAT1M2_exam_dump,
        "PSAT1RW1": this.PSAT1RW1_exam_dump,
        "PSAT1RW2": this.PSAT1RW2_exam_dump,
        "RI23G3M": this.RI23G3M_exam_dump,
        "RI22G3M": this.RI22G3M_exam_dump,
        "RI21G3M": this.RI21G3M_exam_dump,
        "RI19G3M": this.RI19G3M_exam_dump,
        "RI18G3M": this.RI18G3M_exam_dump,
        "RI23G3E": this.RI23G3E_exam_dump,
        "RI22G3E": this.RI22G3E_exam_dump,
        "RI21G3E": this.RI21G3E_exam_dump,
        "RI19G3E": this.RI19G3E_exam_dump,
        "RI18G3E": this.RI18G3E_exam_dump,
        "RI23G4M": this.RI23G4M_exam_dump,
        "RI22G4M": this.RI22G4M_exam_dump,
        "RI21G4M": this.RI21G4M_exam_dump,
        "RI19G4M": this.RI19G4M_exam_dump,
        "RI18G4M": this.RI18G4M_exam_dump,
        "RI23G4E": this.RI23G4E_exam_dump,
        "RI22G4E": this.RI22G4E_exam_dump,
        "RI21G4E": this.RI21G4E_exam_dump,
        "RI19G4E": this.RI19G4E_exam_dump,
        "RI18G4E": this.RI18G4E_exam_dump,
        "RI23G5M": this.RI23G5M_exam_dump,
        "RI22G5M": this.RI22G5M_exam_dump,
        "RI21G5M": this.RI21G5M_exam_dump,
        "RI19G5M": this.RI19G5M_exam_dump,
        "RI18G5M": this.RI18G5M_exam_dump,
        "RI23G5E": this.RI23G5E_exam_dump,
        "RI22G5E": this.RI22G5E_exam_dump,
        "RI21G5E": this.RI21G5E_exam_dump,
        "RI19G5E": this.RI19G5E_exam_dump,
        "RI18G5E": this.RI18G5E_exam_dump,
        "RI23G6M": this.RI23G6M_exam_dump,
        "RI22G6M": this.RI22G6M_exam_dump,
        "RI21G6M": this.RI21G6M_exam_dump,
        "RI19G6M": this.RI19G6M_exam_dump,
        "RI18G6M": this.RI18G6M_exam_dump,
        "RI23G6E": this.RI23G6E_exam_dump,
        "RI22G6E": this.RI22G6E_exam_dump,
        "RI21G6E": this.RI21G6E_exam_dump,
        "RI19G6E": this.RI19G6E_exam_dump,
        "RI18G6E": this.RI18G6E_exam_dump,
        "RI23G7M": this.RI23G7M_exam_dump,
        "RI22G7M": this.RI22G7M_exam_dump,
        "RI21G7M": this.RI21G7M_exam_dump,
        "RI19G7M": this.RI19G7M_exam_dump,
        "RI18G7M": this.RI18G7M_exam_dump,
        "RI23G7E": this.RI23G7E_exam_dump,
        "RI22G7E": this.RI22G7E_exam_dump,
        "RI21G7E": this.RI21G7E_exam_dump,
        "RI19G7E": this.RI19G7E_exam_dump,
        "RI18G7E": this.RI18G7E_exam_dump,
        "RI23G8M": this.RI23G8M_exam_dump,
        "RI22G8M": this.RI22G8M_exam_dump,
        "RI21G8M": this.RI21G8M_exam_dump,
        "RI19G8M": this.RI19G8M_exam_dump,
        "RI18G8M": this.RI18G8M_exam_dump,
        "RI23G8E": this.RI23G8E_exam_dump,
        "RI22G8E": this.RI22G8E_exam_dump,
        "RI21G8E": this.RI21G8E_exam_dump,
        "RI19G8E": this.RI19G8E_exam_dump,
        "RI18G8E": this.RI18G8E_exam_dump,
        "SAT1M1": this.SAT1M1_exam_dump,
        "SAT1M2": this.SAT1M2_exam_dump,
        "SAT1RW1": this.SAT1RW1_exam_dump,
        "SAT1RW2": this.SAT1RW2_exam_dump,
        "SAT2M1": this.SAT2M1_exam_dump,
        "SAT2M2": this.SAT2M2_exam_dump,
        "SAT2RW1": this.SAT2RW1_exam_dump,
        "SAT2RW2": this.SAT2RW2_exam_dump,
        "SAT3M1": this.SAT3M1_exam_dump,
        "SAT3M2": this.SAT3M2_exam_dump,
        "SAT3RW1": this.SAT3RW1_exam_dump,
        "SAT3RW2": this.SAT3RW2_exam_dump,
        "SAT4M1": this.SAT4M1_exam_dump,
        "SAT4M2": this.SAT4M2_exam_dump,
        "SAT4RW1": this.SAT4RW1_exam_dump,
        "SAT4RW2": this.SAT4RW2_exam_dump,
        "SC18G3E": this.SC18G3E_exam_dump,
        "SC18G4E": this.SC18G4E_exam_dump,
        "SC18G5E": this.SC18G5E_exam_dump,
        "SC18G6E": this.SC18G6E_exam_dump,
        "SC18G7E": this.SC18G7E_exam_dump,
        "SC18G8E": this.SC18G8E_exam_dump,
        "SC18G3M": this.SC18G3M_exam_dump,
        "SC18G4M": this.SC18G4M_exam_dump,
        "SC18G5M": this.SC18G5M_exam_dump,
        "SC18G6M": this.SC18G6M_exam_dump,
        "SC18G7M": this.SC18G7M_exam_dump,
        "SC18G8M": this.SC18G8M_exam_dump,
        "SC18G4S": this.SC18G4S_exam_dump,
        "SC18G6S": this.SC18G6S_exam_dump,
        "TN20G3E": this.TN20G3E_exam_dump,
        "TN20G3M": this.TN20G3M_exam_dump,
        "TN20G3S": this.TN20G3S_exam_dump,
        "TN20G4E": this.TN20G4E_exam_dump,
        "TN20G4M": this.TN20G4M_exam_dump,
        "TN20G4S": this.TN20G4S_exam_dump,
        "TN20G5E": this.TN20G5E_exam_dump,
        "TN20G5M": this.TN20G5M_exam_dump,
        "TN20G5S": this.TN20G5S_exam_dump,
        "TN20G6E": this.TN20G6E_exam_dump,
        "TN20G6M": this.TN20G6M_exam_dump,
        "TN20G6S": this.TN20G6S_exam_dump,
        "TN20G6SS": this.TN20G6SS_exam_dump,
        "TN20G7E": this.TN20G7E_exam_dump,
        "TN20G7M": this.TN20G7M_exam_dump,
        "TN20G7S": this.TN20G7S_exam_dump,
        "TN20G7SS": this.TN20G7SS_exam_dump,
        "TN20G8E": this.TN20G8E_exam_dump,
        "TN20G8M": this.TN20G8M_exam_dump,
        "TN20G8S": this.TN20G8S_exam_dump,
        "TN20G8SS": this.TN20G8SS_exam_dump,
        "TN20HSA1": this.TN20HSA1_exam_dump,
        "TN20HSA2": this.TN20HSA2_exam_dump,
        "TN20HSB": this.TN20HSB_exam_dump,
        "TN20HSE1": this.TN20HSE1_exam_dump,
        "TN20HSE2": this.TN20HSE2_exam_dump,
        "TN20HSG": this.TN20HSG_exam_dump,
        "TN20HSUSH": this.TN20HSUSH_exam_dump,
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
        "TX17HSUSH": this.TX17HSUSH_exam_dump,
        "WIG3E": this.WIG3E_exam_dump,
        "WIG4E": this.WIG4E_exam_dump,
        "WIG5E": this.WIG5E_exam_dump,
        "WIG6E": this.WIG6E_exam_dump,
        "WIG7E": this.WIG7E_exam_dump,
        "WIG8E": this.WIG8E_exam_dump,
        "WIG3M": this.WIG3M_exam_dump,
        "WIG4M": this.WIG4M_exam_dump,
        "WIG5M": this.WIG5M_exam_dump,
        "WIG6M": this.WIG6M_exam_dump,
        "WIG7M": this.WIG7M_exam_dump,
        "WIG8M": this.WIG8M_exam_dump,
        "WIG4S": this.WIG4S_exam_dump,
        "WIG8S": this.WIG8S_exam_dump,
        "WIG4SS": this.WIG4SS_exam_dump,
        "WIG8SS": this.WIG8SS_exam_dump,
        "WIG10SS": this.WIG10SS_exam_dump
    };

    exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = {};
    supp_dump: any = {};
    supp_st_dump: any = {};
    refsheet_source: string = '';
    st_refsheet_source: string = '';

    problem_number = 1;
    problem_selection: any[] = [];
    problem_attempts: number[] = [];
    attempt_path: any[] = [];
    attempt_response: string[] = [];
    attempt_explanation: any[] = [];
    m_selection: string[][] = [["", ""]];
    m_submission: { [key: string]: string }[] = [{}];
    c_submission: { [key: string]: string[] }[] = [{}];
    m_shuffled = false;
    choices_sequence: string[] = [];
    shuffle_choices: { [key: string]: string[] } = {};
    unique_choices: string[][] = [];
    random_index = 0
    random_list: string[] = [];

    signup: boolean = false;
    login: boolean = false;
    selected_topic = "";
    selected_subtopic = "";
    standard_id = '';
    standard_fav = false;
    includes_standard = false;
    subtopic_streak_count = 0;
    subtopic_problem_count = 0;
    subtopic_new_problem_count = 0;
    subtopic_correct_problem_count = 0;
    subtopic_problem_number = 0;
    subtopic_search_dump: { [key: number]: { 'Number': any, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = {};
    subtopic_submission: any[] = [];
    subtopic_problem_selection: any[] = [];
    subtopic_problem_attempts: number[] = [];
    subtopic_attempt_path: any[] = [];
    subtopic_attempt_response: string[] = [];
    subtopic_attempt_explanation: any[] = [];

    subject_labels: { [key: string]: string } = {
        "Algebra I": "Algebra I",
        "Algebra II": "Algebra II",
        "Biology": "Biology",
        "English I": "English I",
        "English II": "English II",
        "English Language Arts": "Language Arts",
        "English Reading": "Reading",
        "Geometry": "Geometry",
        "Mathematics": "Math",
        "Physics": "Physics",
        "SAT Suite": "SAT Suite",
        "Science": "Science",
        "Social Studies": "Social Studies",
        "U.S. History": "U.S. History"
    };

    iti: any;
    user: any;
    phone: string = "";
    iti_msg: string = "";
    otp: string = '';
    verify: any
    windowRef: any;
    login_method = "";
    user_role = "";
    pw_reset = false;
    win = new WindowService;

    @ViewChild('userPhone') userPhone: ElementRef;

    constructor(public router: Router, private aRoute: ActivatedRoute, public authService: AuthService, private afAuth: AngularFireAuth, private http: HttpClient) { }

    sub: any;

    max(num1: number, num2: number) {
        return (Math.max(num1, num2));
    }

    width_change2() {
        this.screenWidth = window.innerWidth;
    }

    get_probs() {
        var prob_list = [];
        for (let num of Object.keys(this.exam_dump)) {
            if ("" + num != 'default') {
                prob_list.push(num);
            }
        }
        return (prob_list);
    }

    get_part_num(part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        return part_num;
    }

    get_part_num_st(part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
        }
        return part_num;
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

    read_table(path: string) {
        // var table: any = {};
        this.http.get("./assets/" + path).subscribe(res => {
            console.log(res);
            console.log(JSON.stringify(res));
            this.supp_dump[path] = res;
            // table = res;
        });
        // return (table);
    }

    read_table_st(path: string) {
        // var table: any = {};
        this.http.get("./assets/" + path).subscribe(res => {
            console.log(res);
            console.log(JSON.stringify(res));
            this.supp_st_dump[path] = res;
            // table = res;
        });
        // return (table);
    }

    plot_graph_gp(part: string, subtop: boolean) {
        var myPlot: any = document.getElementById('myPlot');
        var x = [];
        var y = [];
        for (let i = -250; i <= 250; i++) {
            x.push(i);
        }
        for (let i = -250; i <= 250; i++) {
            y.push(i);
        }
        var z = [];
        for (let i = 0; i < y.length; i++) {
            var temp = [];
            for (let j = 0; j < x.length; j++) {
                temp.push(0);
            }
            z.push(temp);
        }
        var map: any = {
            x: x,
            y: y,
            z: z,
            type: 'heatmap',
            colorscale: [['0.0', 'rgba(0, 0, 0, 0)'], ['1.0', 'rgba(0, 0, 0, 0)']],
            xgap: 1,
            ygap: 1,
            hoverinfo: "x+y",
            showscale: false
        }
        var sub: any = {
            x: [],
            y: [],
            type: 'scatter',
            hoverinfo: false,
            marker: { color: '#1976d2', size: 16 }
        }
        var layout: any = {
            dragmode: false,
            margin: {
                l: 20,
                t: 10,
                r: 10,
                b: 30
            },
            xaxis: {
                range: [-1, 15],
                showgrid: true,
                ticks: 'inside',
                zeroline: true,
                zerolinewidth: 2,
                gridwidth: 1,
                gridcolor: '#000',
                dtick: 1,
                tickcolor: '#000'
            },
            yaxis: {
                range: [-1, 15],
                showgrid: true,
                ticks: 'inside',
                zeroline: true,
                zerolinewidth: 2,
                gridwidth: 1,
                gridcolor: '#000',
                dtick: 1,
                tickcolor: '#000'
            }
        };
        var config = {
            hoverinfo: false,
            displayModeBar: false,
            scrollZoom: false,
            responsive: false,
            editSelection: false
        };
        Plotly.newPlot('myPlot', [map, sub], layout, config);
        myPlot.on('plotly_click', (data: any) => {
            var grid = data.points.filter((obj: any) => {
                return obj.curveNumber === 0;
            })
            console.log("Selected Point: (" + grid[0].x + ", " + grid[0].y + ")");
            sub.x[0] = +grid[0].x;
            sub.y[0] = +grid[0].y;
            Plotly.redraw('myPlot');
            if (subtop) {
                this.attempt_gp_st_problem(+grid[0].x, +grid[0].y, part);
            }
            else {
                this.attempt_gp_problem(+grid[0].x, +grid[0].y, part);
            }
        })
        console.log('plot graph');
    }

    plot_graph_mgp(part: string, subtop: boolean) {
        var myPlot: any = document.getElementById('myPlot');
        var x = [];
        var y = [];
        for (let i = -250; i <= 250; i++) {
            x.push(i);
        }
        for (let i = -250; i <= 250; i++) {
            y.push(i);
        }
        var z = [];
        for (let i = 0; i < y.length; i++) {
            var temp = [];
            for (let j = 0; j < x.length; j++) {
                temp.push(0);
            }
            z.push(temp);
        }
        var map: any = {
            x: x,
            y: y,
            z: z,
            type: 'heatmap',
            colorscale: [['0.0', 'rgba(0, 0, 0, 0)'], ['1.0', 'rgba(0, 0, 0, 0)']],
            xgap: 1,
            ygap: 1,
            hoverinfo: "x+y",
            showscale: false
        }
        var sub: any = {
            x: [],
            y: [],
            type: 'scatter',
            hoverinfo: false,
            marker: { color: '#1976d2', size: 16 }
        }
        var layout: any = {
            dragmode: false,
            margin: {
                l: 20,
                t: 10,
                r: 10,
                b: 30
            },
            xaxis: {
                range: [-1, 15],
                showgrid: true,
                ticks: 'inside',
                zeroline: true,
                zerolinewidth: 2,
                gridwidth: 1,
                gridcolor: '#000',
                dtick: 1,
                tickcolor: '#000'
            },
            yaxis: {
                range: [-1, 15],
                showgrid: true,
                ticks: 'inside',
                zeroline: true,
                zerolinewidth: 2,
                gridwidth: 1,
                gridcolor: '#000',
                dtick: 1,
                tickcolor: '#000'
            }
        };
        var config = {
            hoverinfo: false,
            displayModeBar: false,
            scrollZoom: false,
            responsive: false,
            editSelection: false
        };
        Plotly.newPlot('myPlot', [map, sub], layout, config);
        myPlot.on('plotly_click', (data: any) => {
            var grid = data.points.filter((obj: any) => {
                return obj.curveNumber === 0;
            })
            var points = data.points.filter((obj: any) => {
                return obj.curveNumber === 1;
            })
            // console.log("Selected Point: (" + grid[0].x + ", " + grid[0].y +")");
            var point_graphed = false;
            if (grid[0] == undefined) {
                for (let i = 0; i < sub.x.length; i++) {
                    if (sub.x[i] == +points[0].x && sub.y[i] == +points[0].y) {
                        point_graphed = true;
                        if (i != sub.x.length - 1) {
                            sub.x.splice(i, 1);
                            sub.y.splice(i, 1);
                        }
                        else {
                            sub.x.pop();
                            sub.y.pop();
                        }
                    }
                }
                Plotly.redraw('myPlot');
                if (subtop) {
                    this.attempt_mgp_st_problem(+points[0].x, +points[0].y, part);
                }
                else {
                    this.attempt_mgp_problem(+points[0].x, +points[0].y, part);
                }
            }
            if (!point_graphed) {
                sub.x.push(+grid[0].x);
                sub.y.push(+grid[0].y);
                Plotly.redraw('myPlot');
                if (subtop) {
                    this.attempt_mgp_st_problem(+grid[0].x, +grid[0].y, part);
                }
                else {
                    this.attempt_mgp_problem(+grid[0].x, +grid[0].y, part);
                }
            }
        })
        console.log('plot graph');
    }

    is_image(blob: string) {
        return (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp', '.tiff', '.ico'].some(ext => blob.toLowerCase().endsWith(ext)));
    }

    attempt_mc_problem(choice: string, part: string) {
        var part_num = 0;
        if (part != '') {
            var part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        if (choice != this.problem_selection[part_num][0]) {
            this.problem_attempts[part_num] += 1;
            this.attempt_path[part_num].push([choice]);
            this.problem_selection[part_num] = [choice];
            for (const [num, prob] of Object.entries(this.exam_dump)) {
                if (this.problem_number == +num) {
                    if (part == '') {
                        for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                            if (ch == choice) {
                                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                                if (key.Key.Correct == true) {
                                    this.confetti_light(this.problem_attempts[part_num]);
                                    if (this.problem_attempts[part_num] == 1) {
                                        this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                                    }
                                    else {
                                        this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                                    }
                                }
                                else {
                                    this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                                }
                            }
                        }
                    }
                    else {
                        for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                            if (ch == choice) {
                                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                                if (key.Key.Correct == true) {
                                    this.confetti_light(this.problem_attempts[part_num]);
                                    if (this.problem_attempts[part_num] == 1) {
                                        this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                                    }
                                    else {
                                        this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                                    }
                                }
                                else {
                                    this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                                }
                            }
                        }
                    }
                }
            }
        }
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
                    if (part == '') {
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

    attempt_imc_problem(choice: string, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        if (choice != this.problem_selection[part_num][0]) {
            this.problem_attempts[part_num] += 1;
            this.attempt_path[part_num].push(choice);
            this.problem_selection[part_num] = [choice];
            console.log(this.problem_selection);
            for (const [num, prob] of Object.entries(this.exam_dump)) {
                if (this.problem_number == +num) {
                    if (Object.keys(prob.Parts).length == 0) {
                        for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                            if (choice == ch) {
                                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                                if (key.Key.Correct == true) {
                                    this.confetti_light(this.problem_attempts[part_num]);
                                    if (this.problem_attempts[part_num] == 1) {
                                        this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                                    }
                                    else {
                                        this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                                    }
                                }
                                else {
                                    this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                                }
                            }
                        }
                    }
                    else {
                        for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                            if (choice == ch) {
                                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                                if (key.Key.Correct == true) {
                                    this.confetti_light(this.problem_attempts[part_num]);
                                    if (this.problem_attempts[part_num] == 1) {
                                        this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                                    }
                                    else {
                                        this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                                    }
                                }
                                else {
                                    this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    attempt_imc_st_problem(choice: string, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
        }
        if (choice != this.subtopic_problem_selection[part_num][0]) {
            this.subtopic_problem_attempts[part_num] += 1;
            this.subtopic_attempt_path[part_num].push(choice);
            this.subtopic_problem_selection[part_num] = [choice];
            console.log(this.subtopic_problem_selection);
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

    attempt_ms_problem(choice: string, part: string) {
        var part_num = 0;
        if (part != '') {
            var part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        for (const [num, prob] of Object.entries(this.exam_dump)) {
            if (this.problem_number == +num) {
                this.attempt_response[part_num] = "";
                if (part == '') {
                    for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                        if (choice == ch) {
                            if (!this.problem_selection[part_num].includes(choice)) {
                                this.attempt_explanation[part_num].push(key.Key.Rationale);
                                this.problem_selection[part_num].push(choice);
                            }
                            else {
                                if (this.problem_selection[part_num].indexOf(choice) != -1) {
                                    this.attempt_explanation[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
                                    this.problem_selection[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
                                }
                                else {
                                    this.attempt_explanation[part_num].pop();
                                    this.problem_selection[part_num].pop();
                                }
                            }
                        }
                        if ((key.Key.Correct == false && this.problem_selection[part_num].includes(ch)) || (key.Key.Correct == true && !this.problem_selection[part_num].includes(ch))) {
                            this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                        }
                    }
                }
                else {
                    for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                        if (choice == ch) {
                            if (!this.problem_selection[part_num].includes(choice)) {
                                this.attempt_explanation[part_num].push(key.Key.Rationale);
                                this.problem_selection[part_num].push(choice);
                            }
                            else {
                                if (this.problem_selection[part_num].indexOf(choice) != -1) {
                                    this.attempt_explanation[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
                                    this.problem_selection[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
                                }
                                else {
                                    this.attempt_explanation[part_num].pop();
                                    this.problem_selection[part_num].pop();
                                }
                            }
                        }
                        if ((key.Key.Correct == false && this.problem_selection[part_num].includes(ch)) || (key.Key.Correct == true && !this.problem_selection[part_num].includes(ch))) {
                            this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                        }
                    }
                }
                if (!this.attempt_response[part_num].startsWith('That is not the correct answer')) {
                    this.confetti_light(this.problem_attempts[part_num]);
                    if (this.problem_attempts[part_num] == 1) {
                        this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                    }
                    else {
                        this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                    }
                }
            }
        }
        this.problem_attempts[part_num] += 1;
        var current_selection = [];
        for (let sel of this.problem_selection[part_num]) {
            current_selection.push(sel);
        }
        this.attempt_path[part_num].push(current_selection);
        console.log(this.attempt_path[part_num]);
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
        this.subtopic_attempt_path[part_num].push(this.subtopic_problem_selection[part_num]);
    }

    attempt_ims_problem(choice: string, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        this.problem_attempts[part_num] += 1;
        this.attempt_path[part_num].push(this.problem_selection[part_num]);
        for (const [num, prob] of Object.entries(this.exam_dump)) {
            if (this.problem_number == +num) {
                this.attempt_response[part_num] = "";
                if (part == '') {
                    for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                        if (choice == ch) {
                            if (!this.problem_selection[part_num].includes(choice)) {
                                this.attempt_explanation[part_num].push(key.Key.Rationale);
                                this.problem_selection[part_num].push(choice);
                            }
                            else {
                                if (this.problem_selection[part_num].indexOf(choice) != -1) {
                                    this.attempt_explanation[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
                                    this.problem_selection[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
                                }
                                else {
                                    this.attempt_explanation[part_num].pop();
                                    this.problem_selection[part_num].pop();
                                }
                            }
                        }
                        if ((key.Key.Correct == false && this.problem_selection[part_num].includes(ch)) || (key.Key.Correct == true && !this.problem_selection[part_num].includes(ch))) {
                            this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                        }
                    }
                }
                else {
                    for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                        if (choice == ch) {
                            if (!this.problem_selection[part_num].includes(choice)) {
                                this.attempt_explanation[part_num].push(key.Key.Rationale);
                                this.problem_selection[part_num].push(choice);
                            }
                            else {
                                if (this.problem_selection[part_num].indexOf(choice) != -1) {
                                    this.attempt_explanation[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
                                    this.problem_selection[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
                                }
                                else {
                                    this.attempt_explanation[part_num].pop();
                                    this.problem_selection[part_num].pop();
                                }
                            }
                        }
                        if ((key.Key.Correct == false && this.problem_selection[part_num].includes(ch)) || (key.Key.Correct == true && !this.problem_selection[part_num].includes(ch))) {
                            this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                        }
                    }
                }
                if (!this.attempt_response[part_num].startsWith('That is not the correct answer')) {
                    this.confetti_light(this.problem_attempts[part_num]);
                    if (this.problem_attempts[part_num] == 1) {
                        this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                    }
                    else {
                        this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                    }
                }
            }
        }
    }

    attempt_ims_st_problem(choice: string, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
        }
        this.subtopic_problem_attempts[part_num] += 1;
        this.subtopic_attempt_path[part_num].push(this.subtopic_problem_selection[part_num]);
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
    }

    attempt_idd_problem(inum: string, choice: string, part: string) {
        var part_num = 0;
        var index: number = +inum - 1;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        if (choice != this.problem_selection[part_num][index]) {
            this.problem_attempts[part_num] += 1;
            this.problem_selection[part_num][index] = choice;
            console.log(this.problem_selection);
            this.attempt_path[part_num].push(this.problem_selection[part_num]);
            for (const [num, prob] of Object.entries(this.exam_dump)) {
                if (this.problem_number == +num) {
                    if (part == '') {
                        for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                            if (inum + ':' + choice == ch) {
                                console.log(ch);
                                this.attempt_explanation[part_num][index] = key.Key.Rationale;
                                if (!key.Key.Correct) {
                                    this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                                    console.log(this.attempt_response);
                                }
                            }
                        }
                    }
                    else {
                        for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                            if (inum + ':' + choice == ch) {
                                this.attempt_explanation[part_num][index] = key.Key.Rationale;
                                if (!key.Key.Correct) {
                                    this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                                }
                            }
                        }
                    }
                    if (!this.problem_selection[part_num].includes('')) {
                        var correct_attempt: boolean = true;
                        for (let i = 0; i < this.problem_selection[part_num].length; i++) {
                            if (part == '') {
                                if (!this.exam_dump[this.problem_number].AnswerChoices['' + (i + 1) + ':' + this.problem_selection[part_num][i]].Key.Correct) {
                                    correct_attempt = false;
                                }
                            }
                            else {
                                if (!this.exam_dump[this.problem_number].Parts[part].AnswerChoices['' + (i + 1) + ':' + this.problem_selection[part_num][i]].Key.Correct) {
                                    correct_attempt = false;
                                }
                            }
                        }
                        if (correct_attempt) {
                            this.confetti_light(this.problem_attempts[part_num]);
                            if (this.problem_attempts[part_num] == 1) {
                                this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                            }
                            else {
                                this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                            }
                        }
                    }
                }
            }
            setTimeout(() => {
                this.update_DD(inum, part);
            }, 100);
        }
        console.log(this.problem_selection);
        console.log(this.attempt_response);
    }

    attempt_idd_st_problem(inum: string, choice: string, part: string) {
        var part_num = 0;
        var index: number = +inum - 1;
        if (part != '') {
            part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
        }
        if (choice != this.subtopic_problem_selection[part_num][index]) {
            this.subtopic_problem_attempts[part_num] += 1;
            this.subtopic_problem_selection[part_num][index] = choice;
            console.log(this.subtopic_problem_selection);
            this.subtopic_attempt_path[part_num].push(this.subtopic_problem_selection[part_num]);
            for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
                if (this.subtopic_problem_number == +num) {
                    if (part == '') {
                        for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                            if (inum + ':' + choice == ch) {
                                console.log(ch);
                                this.subtopic_attempt_explanation[part_num][index] = key.Key.Rationale;
                                if (!key.Key.Correct) {
                                    this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                                    console.log(this.subtopic_attempt_response);
                                }
                            }
                        }
                    }
                    else {
                        for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                            if (inum + ':' + choice == ch) {
                                this.subtopic_attempt_explanation[part_num][index] = key.Key.Rationale;
                                if (!key.Key.Correct) {
                                    this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                                }
                            }
                        }
                    }
                    if (!this.subtopic_problem_selection[part_num].includes('')) {
                        var correct_attempt: boolean = true;
                        for (let i = 0; i < this.subtopic_problem_selection[part_num].length; i++) {
                            if (part == '') {
                                if (!this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices['' + (i + 1) + ':' + this.subtopic_problem_selection[part_num][i]].Key.Correct) {
                                    correct_attempt = false;
                                }
                            }
                            else {
                                if (!this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices['' + (i + 1) + ':' + this.subtopic_problem_selection[part_num][i]].Key.Correct) {
                                    correct_attempt = false;
                                }
                            }
                        }
                        if (correct_attempt) {
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
            }
            setTimeout(() => {
                this.update_DD_st(inum, part);
            }, 100);
        }
        console.log(this.subtopic_problem_selection);
        console.log(this.subtopic_attempt_response);
    }

    attempt_lp_problem(numb: number, part: string) {
        var choice = '';
        var part_num = 0;
        if (part != '') {
            var part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
            for (let ch of Object.keys(this.exam_dump[this.problem_number].Parts[part].AnswerChoices)) {
                if (+this.exam_dump[this.problem_number].Parts[part].AnswerChoices[ch].Choice == numb) {
                    choice = ch[0];
                }
            }
        }
        else {
            for (let ch of Object.keys(this.exam_dump[this.problem_number].AnswerChoices)) {
                if (+this.exam_dump[this.problem_number].AnswerChoices[ch].Choice == numb) {
                    choice = ch[0];
                }
            }
        }
        if (choice != this.problem_selection[part_num][0]) {
            this.problem_attempts[part_num] += 1;
            this.attempt_path[part_num].push([choice]);
            this.problem_selection[part_num] = [choice];
            for (const [num, prob] of Object.entries(this.exam_dump)) {
                if (this.problem_number == +num) {
                    if (part == '') {
                        for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                            if (ch[0] == choice) {
                                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                                if (key.Key.Correct == true) {
                                    this.confetti_light(this.problem_attempts[part_num]);
                                    if (this.problem_attempts[part_num] == 1) {
                                        this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                                    }
                                    else {
                                        this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                                    }
                                }
                                else {
                                    this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                                }
                            }
                        }
                    }
                    else {
                        for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                            if (ch[0] == choice) {
                                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                                if (key.Key.Correct == true) {
                                    this.confetti_light(this.problem_attempts[part_num]);
                                    if (this.problem_attempts[part_num] == 1) {
                                        this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                                    }
                                    else {
                                        this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                                    }
                                }
                                else {
                                    this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    attempt_lp_st_problem(numb: number, part: string) {
        var choice = '';
        var part_num = 0;
        if (part != '') {
            var part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
            for (let ch of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices)) {
                if (+this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices[ch].Choice == numb) {
                    choice = ch[0];
                }
            }
        }
        else {
            for (let ch of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices)) {
                if (+this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices[ch].Choice == numb) {
                    choice = ch[0];
                }
            }
        }
        if (choice != this.subtopic_problem_selection[part_num][0]) {
            this.subtopic_problem_attempts[part_num] += 1;
            this.subtopic_attempt_path[part_num].push([choice]);
            this.subtopic_problem_selection[part_num] = [choice];
            for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
                if (this.subtopic_problem_number == +num) {
                    if (part == '') {
                        for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                            if (ch[0] == choice) {
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
                            if (ch[0] == choice) {
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

    attempt_gp_problem(xnum: number, ynum: number, part: string) {
        var choice = '(' + '' + xnum + ',' + '' + ynum + ')';
        console.log(choice);
        var part_num = 0;
        if (part != '') {
            var part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        if (choice != this.problem_selection[part_num][0]) {
            this.problem_attempts[part_num] += 1;
            this.attempt_path[part_num].push([choice]);
            this.problem_selection[part_num] = [choice];
            for (const [num, prob] of Object.entries(this.exam_dump)) {
                if (this.problem_number == +num) {
                    if (part == '') {
                        for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                            if (choice == key.Choice) {
                                this.confetti_light(this.problem_attempts[part_num]);
                                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                                if (this.problem_attempts[part_num] == 1) {
                                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                                }
                                else {
                                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                                }
                            }
                            else {
                                this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                            }
                        }
                    }
                    else {
                        for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                            if (choice == key.Choice) {
                                this.confetti_light(this.problem_attempts[part_num]);
                                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                                if (this.problem_attempts[part_num] == 1) {
                                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                                }
                                else {
                                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                                }
                            }
                            else {
                                this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                            }
                        }
                    }
                }
            }
        }
    }

    attempt_gp_st_problem(xnum: number, ynum: number, part: string) {
        var choice = '(' + '' + xnum + ',' + '' + ynum + ')';
        var part_num = 0;
        if (part != '') {
            var part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
        }
        if (choice != this.subtopic_problem_selection[part_num][0]) {
            this.subtopic_problem_attempts[part_num] += 1;
            this.subtopic_attempt_path[part_num].push([choice]);
            this.subtopic_problem_selection[part_num] = [choice];
            for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
                if (this.subtopic_problem_number == +num) {
                    if (part == '') {
                        for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                            if (choice == key.Choice) {
                                this.confetti_light(this.subtopic_problem_attempts[part_num]);
                                this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
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
                    else {
                        for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                            if (choice == key.Choice) {
                                this.confetti_light(this.subtopic_problem_attempts[part_num]);
                                this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
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

    attempt_mgp_problem(xnum: number, ynum: number, part: string) {
        var choice = '(' + '' + xnum + ',' + '' + ynum + ')';
        console.log(choice);
        var part_num = 0;
        if (part != '') {
            var part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        var choice_in_key = false;
        for (const [num, prob] of Object.entries(this.exam_dump)) {
            if (this.problem_number == +num) {
                this.attempt_response[part_num] = "";
                if (part == '') {
                    if (this.problem_selection[part_num].includes(choice)) {
                        if (this.problem_selection[part_num].indexOf(choice) != -1) {
                            this.attempt_explanation[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
                            this.problem_selection[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
                        }
                        else {
                            this.attempt_explanation[part_num].pop();
                            this.problem_selection[part_num].pop();
                        }
                    }
                    else {
                        this.problem_selection[part_num].push(choice);
                        for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                            if (choice == key.Choice) {
                                choice_in_key = true;
                                this.attempt_explanation[part_num].push(key.Key.Rationale);
                            }
                        }
                        if (!choice_in_key) {
                            this.attempt_explanation[part_num].push('');
                        }
                    }
                    for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                        if (!this.problem_selection[part_num].includes(key.Choice)) {
                            console.log('missing selection');
                            this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                        }
                    }
                    var graph_key = [];
                    for (let ch of Object.values(prob.AnswerChoices)) {
                        graph_key.push(ch.Choice)
                    }
                    for (let sel of this.problem_selection[part_num]) {
                        if (!graph_key.includes(sel)) {
                            console.log('extra selection');
                            this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                        }
                    }
                }
                else {
                    if (this.problem_selection[part_num].includes(choice)) {
                        if (this.problem_selection[part_num].indexOf(choice) != -1) {
                            this.attempt_explanation[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
                            this.problem_selection[part_num].splice(this.problem_selection[part_num].indexOf(choice), 1);
                        }
                        else {
                            this.attempt_explanation[part_num].pop();
                            this.problem_selection[part_num].pop();
                        }
                    }
                    else {
                        this.problem_selection[part_num].push(choice);
                        for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                            if (choice == key.Choice) {
                                choice_in_key = true;
                                this.attempt_explanation[part_num].push(key.Key.Rationale);
                            }
                        }
                        if (!choice_in_key) {
                            this.attempt_explanation[part_num].push('');
                        }
                    }
                    for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                        if (!this.problem_selection[part_num].includes(key.Choice)) {
                            console.log('missing selection');
                            this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                        }
                    }
                    var graph_key = [];
                    for (let ch of Object.values(prob.Parts[part].AnswerChoices)) {
                        graph_key.push(ch.Choice)
                    }
                    for (let sel of this.problem_selection[part_num]) {
                        if (!graph_key.includes(sel)) {
                            console.log('extra selection');
                            this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                        }
                    }
                }
                if (!this.attempt_response[part_num].startsWith('That is not the correct answer')) {
                    this.confetti_light(this.problem_attempts[part_num]);
                    if (this.problem_attempts[part_num] == 1) {
                        this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                    }
                    else {
                        this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                    }
                }
            }
        }
        this.problem_attempts[part_num] += 1;
        var current_selection = [];
        for (let sel of this.problem_selection[part_num]) {
            current_selection.push(sel);
        }
        this.attempt_path[part_num].push(current_selection);
        console.log(this.attempt_path[part_num]);
    }

    attempt_mgp_st_problem(xnum: number, ynum: number, part: string) {
        var choice = '(' + '' + xnum + ',' + '' + ynum + ')';
        console.log(choice);
        var part_num = 0;
        if (part != '') {
            var part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
        }
        var choice_in_key = false;
        for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
            if (this.subtopic_problem_number == +num) {
                this.subtopic_attempt_response[part_num] = "";
                if (part == '') {
                    if (this.subtopic_problem_selection[part_num].includes(choice)) {
                        if (this.subtopic_problem_selection[part_num].indexOf(choice) != -1) {
                            this.subtopic_attempt_explanation[part_num].splice(this.subtopic_problem_selection[part_num].indexOf(choice), 1);
                            this.subtopic_problem_selection[part_num].splice(this.subtopic_problem_selection[part_num].indexOf(choice), 1);
                        }
                        else {
                            this.subtopic_attempt_explanation[part_num].pop();
                            this.subtopic_problem_selection[part_num].pop();
                        }
                    }
                    else {
                        this.subtopic_problem_selection[part_num].push(choice);
                        for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                            if (choice == key.Choice) {
                                choice_in_key = true;
                                this.subtopic_attempt_explanation[part_num].push(key.Key.Rationale);
                            }
                        }
                        if (!choice_in_key) {
                            this.subtopic_attempt_explanation[part_num].push('');
                        }
                    }
                    for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                        if (!this.subtopic_problem_selection[part_num].includes(key.Choice)) {
                            console.log('missing selection');
                            this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                        }
                    }
                    var graph_key = [];
                    for (let ch of Object.values(prob.AnswerChoices)) {
                        graph_key.push(ch.Choice)
                    }
                    for (let sel of this.subtopic_problem_selection[part_num]) {
                        if (!graph_key.includes(sel)) {
                            console.log('extra selection');
                            this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                        }
                    }
                }
                else {
                    if (this.subtopic_problem_selection[part_num].includes(choice)) {
                        if (this.subtopic_problem_selection[part_num].indexOf(choice) != -1) {
                            this.subtopic_attempt_explanation[part_num].splice(this.subtopic_problem_selection[part_num].indexOf(choice), 1);
                            this.subtopic_problem_selection[part_num].splice(this.subtopic_problem_selection[part_num].indexOf(choice), 1);
                        }
                        else {
                            this.subtopic_attempt_explanation[part_num].pop();
                            this.subtopic_problem_selection[part_num].pop();
                        }
                    }
                    else {
                        this.subtopic_problem_selection[part_num].push(choice);
                        for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                            if (choice == key.Choice) {
                                choice_in_key = true;
                                this.subtopic_attempt_explanation[part_num].push(key.Key.Rationale);
                            }
                        }
                        if (!choice_in_key) {
                            this.subtopic_attempt_explanation[part_num].push('');
                        }
                    }
                    for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                        if (!this.subtopic_problem_selection[part_num].includes(key.Choice)) {
                            console.log('missing selection');
                            this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                        }
                    }
                    var graph_key = [];
                    for (let ch of Object.values(prob.Parts[part].AnswerChoices)) {
                        graph_key.push(ch.Choice)
                    }
                    for (let sel of this.subtopic_problem_selection[part_num]) {
                        if (!graph_key.includes(sel)) {
                            console.log('extra selection');
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
        var current_selection = [];
        for (let sel of this.subtopic_problem_selection[part_num]) {
            current_selection.push(sel);
        }
        this.subtopic_attempt_path[part_num].push(current_selection);
        console.log(this.subtopic_attempt_path[part_num]);
    }

    attempt_t_problem(choice: string, inum: string, part: string) {
        var correct: boolean = false;
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        if (choice != this.problem_selection[part_num][+inum - 1]) {
            this.problem_attempts[part_num] += 1;
            this.problem_selection[part_num][+inum - 1] = choice;
            this.attempt_path[part_num].push(this.problem_selection[part_num]);
            this.attempt_response[part_num] = '';
            for (const [num, prob] of Object.entries(this.exam_dump)) {
                if (this.problem_number == +num) {
                    if (part == '') {
                        for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                            if (inum + ':KEY' == ch && choice == key.Choice) {
                                correct = true;
                                this.attempt_explanation[part_num][+inum - 1] = key.Key.Rationale;
                            }
                        }
                    }
                    else {
                        for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                            if (inum + ':KEY' == ch && choice == key.Choice) {
                                correct = true;
                                this.attempt_explanation[part_num][+inum - 1] = key.Key.Rationale;
                            }
                        }
                    }
                    if (!correct) {
                        this.attempt_explanation[part_num][+inum - 1] = '';
                        this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                    }
                    for (let sub of Object.keys(this.problem_selection[part_num])) {
                        if (this.problem_selection[part_num][+sub] == '') {
                            this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                        }
                    }
                    if (!this.attempt_response[part_num].startsWith('That is not the correct answer')) {
                        this.confetti_light(this.problem_attempts[part_num]);
                        if (this.problem_attempts[part_num] == 1) {
                            this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                        }
                        else {
                            this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                        }
                    }
                }
            }
        }
    }

    attempt_t_st_problem(choice: string, inum: string, part: string) {
        var correct: boolean = false;
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
        }
        if (choice != this.subtopic_problem_selection[part_num][+inum - 1]) {
            this.subtopic_problem_attempts[part_num] += 1;
            this.subtopic_problem_selection[part_num][+inum - 1] = choice;
            this.subtopic_attempt_path[part_num].push(this.subtopic_problem_selection[part_num]);
            this.subtopic_attempt_response[part_num] = '';
            for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
                if (this.subtopic_problem_number == +num) {
                    if (part == '') {
                        for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                            if (inum + ':KEY' == ch && choice == key.Choice) {
                                correct = true;
                                this.subtopic_attempt_explanation[part_num][+inum - 1] = key.Key.Rationale;
                            }
                        }
                    }
                    else {
                        for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                            if (inum + ':KEY' == ch && choice == key.Choice) {
                                correct = true;
                                this.subtopic_attempt_explanation[part_num][+inum - 1] = key.Key.Rationale;
                            }
                        }
                    }
                    if (!correct) {
                        this.subtopic_attempt_explanation[part_num][+inum - 1] = '';
                        this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                    }
                    for (let sub of Object.keys(this.subtopic_problem_selection[part_num])) {
                        if (this.subtopic_problem_selection[part_num][+sub] == '') {
                            this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
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
        }
    }

    attempt_fr_problem(choice: string, part: string) {
        var part_num = 0;
        if (part != '') {
            var part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        if (choice != this.problem_selection[part_num][0]) {
            this.problem_attempts[part_num] += 1;
            this.attempt_path[part_num].push([choice]);
            this.problem_selection[part_num] = [choice];
            for (const [num, prob] of Object.entries(this.exam_dump)) {
                if (this.problem_number == +num) {
                    if (part == '') {
                        for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                            if (choice == key.Choice) {
                                this.confetti_light(this.problem_attempts[part_num]);
                                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                                if (this.problem_attempts[part_num] == 1) {
                                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                                }
                                else {
                                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                                }
                            }
                            else {
                                this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                            }
                        }
                    }
                    else {
                        for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                            if (choice == key.Choice) {
                                this.confetti_light(this.problem_attempts[part_num]);
                                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                                if (this.problem_attempts[part_num] == 1) {
                                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                                }
                                else {
                                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                                }
                            }
                            else {
                                this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                            }
                        }
                    }
                }
            }
        }
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
                if (part == '') {
                    if (this.subtopic_problem_number == +num) {
                        for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                            if (choice == key.Choice) {
                                this.confetti_light(this.subtopic_problem_attempts[part_num]);
                                this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
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
                    if (this.subtopic_problem_number == +num) {
                        for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                            if (choice == key.Choice) {
                                this.confetti_light(this.subtopic_problem_attempts[part_num]);
                                this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
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

    attempt_mfr_problem(choice: string, inum: string, part: string) {
        var correct: boolean = false;
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        if (choice != this.problem_selection[part_num][+inum - 1]) {
            this.problem_attempts[part_num] += 1;
            this.problem_selection[part_num][+inum - 1] = choice;
            this.attempt_path[part_num].push(this.problem_selection[part_num]);
            this.attempt_response[part_num] = '';
            for (const [num, prob] of Object.entries(this.exam_dump)) {
                if (this.problem_number == +num) {
                    if (part == '') {
                        for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                            if (inum + ':KEY' == ch && choice == key.Choice) {
                                correct = true;
                                this.attempt_explanation[part_num][+inum - 1] = key.Key.Rationale;
                            }
                        }
                    }
                    else {
                        for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                            if (inum + ':KEY' == ch && choice == key.Choice) {
                                correct = true;
                                this.attempt_explanation[part_num][+inum - 1] = key.Key.Rationale;
                            }
                        }
                    }
                    if (!correct) {
                        this.attempt_explanation[part_num][+inum - 1] = '';
                        this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                    }
                    for (let sub of Object.keys(this.problem_selection[part_num])) {
                        if (this.problem_selection[part_num][+sub] == '') {
                            this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                        }
                    }
                    if (!this.attempt_response[part_num].startsWith('That is not the correct answer')) {
                        this.confetti_light(this.problem_attempts[part_num]);
                        if (this.problem_attempts[part_num] == 1) {
                            this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                        }
                        else {
                            this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                        }
                    }
                }
            }
        }
    }

    attempt_mfr_st_problem(choice: string, inum: string, part: string) {
        var correct: boolean = false;
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
        }
        if (choice != this.subtopic_problem_selection[part_num][+inum - 1]) {
            this.subtopic_problem_attempts[part_num] += 1;
            this.subtopic_problem_selection[part_num][+inum - 1] = choice;
            this.subtopic_attempt_path[part_num].push(this.subtopic_problem_selection[part_num]);
            this.subtopic_attempt_response[part_num] = '';
            for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
                if (this.subtopic_problem_number == +num) {
                    if (part == '') {
                        for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                            if (inum + ':KEY' == ch && choice == key.Choice) {
                                correct = true;
                                this.subtopic_attempt_explanation[part_num][+inum - 1] = key.Key.Rationale;
                            }
                        }
                    }
                    else {
                        for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                            if (inum + ':KEY' == ch && choice == key.Choice) {
                                correct = true;
                                this.subtopic_attempt_explanation[part_num][+inum - 1] = key.Key.Rationale;
                            }
                        }
                    }
                    if (!correct) {
                        this.subtopic_attempt_explanation[part_num][+inum - 1] = '';
                        this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                    }
                    for (let sub of Object.keys(this.subtopic_problem_selection[part_num])) {
                        if (this.subtopic_problem_selection[part_num][+sub] == '') {
                            this.subtopic_attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
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
        }
    }

    attempt_sr_problem(choice: string, part: string) {
        var part_num = 0;
        if (part != '') {
            var part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        if (choice != this.problem_selection[part_num][0]) {
            this.problem_attempts[part_num] += 1;
            this.attempt_path[part_num].push([choice]);
            this.problem_selection[part_num] = [choice];
            for (const [num, prob] of Object.entries(this.exam_dump)) {
                if (this.problem_number == +num) {
                    if (part == '') {
                        for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                            if (choice == key.Choice) {
                                this.confetti_light(this.problem_attempts[part_num]);
                                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                                if (this.problem_attempts[part_num] == 1) {
                                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                                }
                                else {
                                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                                }
                            }
                            else {
                                this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                            }
                        }
                    }
                    else {
                        for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                            if (choice == key.Choice) {
                                this.confetti_light(this.problem_attempts[part_num]);
                                this.attempt_explanation[part_num][0] = key.Key.Rationale;
                                if (this.problem_attempts[part_num] == 1) {
                                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
                                }
                                else {
                                    this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
                                }
                            }
                            else {
                                this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                            }
                        }
                    }
                }
            }
        }
    }

    attempt_sr_st_problem(choice: string, part: string) {
        var part_num = 0;
        if (part != '') {
            var part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
        }
        if (choice != this.subtopic_problem_selection[part_num][0]) {
            this.subtopic_problem_attempts[part_num] += 1;
            this.subtopic_attempt_path[part_num].push(choice);
            this.subtopic_problem_selection[part_num] = [choice];
            for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
                if (part == '') {
                    if (this.subtopic_problem_number == +num) {
                        for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                            if (choice == key.Choice) {
                                this.confetti_light(this.subtopic_problem_attempts[part_num]);
                                this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
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
                    if (this.subtopic_problem_number == +num) {
                        for (const [ch, key] of Object.entries(prob.Parts[part].AnswerChoices)) {
                            if (choice == key.Choice) {
                                this.confetti_light(this.subtopic_problem_attempts[part_num]);
                                this.subtopic_attempt_explanation[part_num][0] = key.Key.Rationale;
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

    attempt_mr_problem(response: string, part: string) {
        var part_num = 0;
        if (part != '') {
            var part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        if (response != this.problem_selection[part_num][0]) {
            this.problem_selection[part_num] = [response];
            this.problem_attempts[part_num] += 1;
        }
    }

    attempt_mr_st_problem(response: string, part: string) {
        var part_num = 0;
        if (part != '') {
            var part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
        }
        if (response != this.subtopic_problem_selection[part_num][0]) {
            this.subtopic_problem_selection[part_num][0] = response;
            this.subtopic_problem_attempts[part_num] += 1;
        }
    }

    attempt_lr_problem(response: string, part: string) {
        var part_num = 0;
        if (part != '') {
            var part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        if (response != this.problem_selection[part_num][0]) {
            this.problem_selection[part_num] = [response];
            this.problem_attempts[part_num] += 1;
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

    get_choices_idd(num: string, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        var choices: any = {};
        if (part == '') {
            for (let key of Object.keys(this.exam_dump[this.problem_number].AnswerChoices)) {
                if (key[0] == num) {
                    choices[key[2]] = this.exam_dump[this.problem_number].AnswerChoices[key].Choice;
                }
            }
        }
        else {
            for (let key of Object.keys(this.exam_dump[this.problem_number].Parts[part].AnswerChoices)) {
                if (key[0] == num) {
                    choices[key[2]] = this.exam_dump[this.problem_number].Parts[part].AnswerChoices[key].Choice;
                }
            }
        }
        return (choices);
    }

    get_choices_idd_st(num: string, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
        }
        var choices: any = {};
        if (part == '') {
            for (let key of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices)) {
                if (key[0] == num) {
                    choices[key[2]] = this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices[key].Choice;
                }
            }
        }
        else {
            for (let key of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices)) {
                if (key[0] == num) {
                    choices[key[2]] = this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices[key].Choice;
                }
            }
        }
        return (choices);
    }

    shuffle_m(choices: any, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        if (!Object.keys(this.shuffle_choices).includes('' + part_num)) {
            this.m_shuffled = false;
            this.shuffle_choices['' + part_num] = []
        }
        if (!this.m_shuffled) {
            if (part == '') {
                if (this.exam_dump[this.problem_number].Type == 'G') {
                    var trimmed_choices: string[] = [];
                    for (let ch of Object.keys(choices)) {
                        if (!trimmed_choices.includes(ch.substring(0, ch.length - 2))) {
                            trimmed_choices.push(ch.substring(0, ch.length - 2));
                        }
                    }
                    this.choices_sequence = trimmed_choices;
                }
                else {
                    this.choices_sequence = Array.from(Object.keys(choices));
                }
            }
            else {
                if (this.exam_dump[this.problem_number].Parts[part].Type == 'G') {
                    var trimmed_choices: string[] = [];
                    for (let ch of Object.keys(choices)) {
                        if (!trimmed_choices.includes(ch.substring(0, ch.length - 2))) {
                            trimmed_choices.push(ch.substring(0, ch.length - 2));
                        }
                    }
                    this.choices_sequence = trimmed_choices;
                }
                else {
                    this.choices_sequence = Array.from(Object.keys(choices));
                }
            }
            this.random_list = [];
            this.shuffle_choices['' + part_num] = [];
            const num_choices1 = this.choices_sequence.length;
            for (let i = 0; i < num_choices1; i++) {
                if (this.choices_sequence[num_choices1 - i - 1] == '' || this.choices_sequence[num_choices1 - i - 1][0] == ' ') {
                    this.choices_sequence.splice(num_choices1 - i - 1, 1);
                }
            }
            const num_choices = this.choices_sequence.length;
            for (let i = 0; i < num_choices; i++) {
                this.random_index = Math.floor(Math.random() * this.choices_sequence.length);
                this.random_list.push(this.choices_sequence[this.random_index]);
                this.shuffle_choices['' + part_num][i] = this.choices_sequence[this.random_index];
                this.choices_sequence.splice(this.random_index, 1);
                console.log(i);
                console.log(this.random_index);
            }
            console.log(this.shuffle_choices);
            this.m_shuffled = true;
        }
        return (this.shuffle_choices['' + part_num].sort());
    }

    shuffle_m_st(choices: any, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
        }
        if (!Object.keys(this.shuffle_choices).includes('' + part_num)) {
            this.m_shuffled = false;
            this.shuffle_choices['' + part_num] = []
        }
        if (!this.m_shuffled) {
            if (part == '') {
                if (this.subtopic_search_dump[this.subtopic_problem_number].Type == 'G') {
                    var trimmed_choices: string[] = [];
                    for (let ch of Object.keys(choices)) {
                        if (!trimmed_choices.includes(ch.substring(0, ch.length - 2))) {
                            trimmed_choices.push(ch.substring(0, ch.length - 2));
                        }
                    }
                    this.choices_sequence = trimmed_choices;
                }
                else {
                    this.choices_sequence = Array.from(Object.keys(choices));
                }
            }
            else {
                if (this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type == 'G') {
                    var trimmed_choices: string[] = [];
                    for (let ch of Object.keys(choices)) {
                        if (!trimmed_choices.includes(ch.substring(0, ch.length - 2))) {
                            trimmed_choices.push(ch.substring(0, ch.length - 2));
                        }
                    }
                    this.choices_sequence = trimmed_choices;
                }
                else {
                    this.choices_sequence = Array.from(Object.keys(choices));
                }
            }
            this.random_list = [];
            this.shuffle_choices['' + part_num] = [];
            const num_choices1 = this.choices_sequence.length;
            for (let i = 0; i < num_choices1; i++) {
                if (this.choices_sequence[num_choices1 - i - 1] == '' || this.choices_sequence[num_choices1 - i - 1][0] == ' ') {
                    this.choices_sequence.splice(num_choices1 - i - 1, 1);
                }
            }
            const num_choices = this.choices_sequence.length;
            for (let i = 0; i < num_choices; i++) {
                this.random_index = Math.floor(Math.random() * this.choices_sequence.length);
                this.random_list.push(this.choices_sequence[this.random_index]);
                this.shuffle_choices['' + part_num][i] = this.choices_sequence[this.random_index];
                this.choices_sequence.splice(this.random_index, 1);
                console.log(i);
                console.log(this.random_index);
            }
            console.log(this.shuffle_choices);
            this.m_shuffled = true;
        }
        return (this.shuffle_choices['' + part_num].sort());
    }

    unique_m(choices: any, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        this.unique_choices[part_num] = [];
        for (const [key, choice] of Object.entries(choices)) {
            if ((choice as any).Choice != '' && (!this.unique_choices[part_num].includes((choice as any).Choice) || !Object.keys(this.c_submission[part_num]).includes((choice as any).Choice[0]) || key[0] == ' ')) {
                if (this.exam_dump[this.problem_number].Type == 'O' || (this.exam_dump[this.problem_number].Type == 'MP' && this.exam_dump[this.problem_number].Parts[part].Type == 'O')) {
                    this.unique_choices[part_num].push((choice as any).Choice + ':' + key[0])
                }
                else if (!this.unique_choices[part_num].includes((choice as any).Choice)) {
                    this.unique_choices[part_num].push((choice as any).Choice);
                }
                this.m_submission[part_num][(choice as any).Choice[0]] = "";
                if (!Object.keys(this.c_submission[part_num]).includes((choice as any).Choice[0])) {
                    this.c_submission[part_num][(choice as any).Choice[0]] = [""];
                }
                if (key[0] == ' ' && (choice as any).Key.Correct) {
                    this.m_submission[part_num][(choice as any).Choice[0]] = key;
                    this.c_submission[part_num][(choice as any).Choice[0]] = [key].concat(this.c_submission[part_num][(choice as any).Choice[0]]);
                    console.log(this.c_submission);
                }
                this.problem_selection[part_num][+(choice as any).Choice[0] - 1] = [""];
                this.attempt_explanation[part_num][+(choice as any).Choice[0] - 1] = [""];
            }
        }
        this.unique_choices[part_num].sort();
        console.log(this.unique_choices[part_num].sort());
        // return (unique_choices);
    }

    unique_m_st(choices: any, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
        }
        this.unique_choices[part_num] = [];
        for (const [key, choice] of Object.entries(choices)) {
            if ((choice as any).Choice != '' && !this.unique_choices[part_num].includes((choice as any).Choice)) {
                if (this.subtopic_search_dump[this.subtopic_problem_number].Type == 'O' || (this.subtopic_search_dump[this.subtopic_problem_number].Type == 'MP' && this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type == 'O')) {
                    this.unique_choices[part_num].push((choice as any).Choice + ':' + key[0])
                }
                else if (!this.unique_choices[part_num].includes((choice as any).Choice)) {
                    this.unique_choices[part_num].push((choice as any).Choice)
                }
                this.m_submission[part_num][(choice as any).Choice[0]] = "";
                if (!Object.keys(this.c_submission[part_num]).includes((choice as any).Choice[0])) {
                    this.c_submission[part_num][(choice as any).Choice[0]] = [""];
                }
                if (key[0] == ' ' && (choice as any).Key.Correct) {
                    this.m_submission[part_num][(choice as any).Choice[0]] = key;
                    this.c_submission[part_num][(choice as any).Choice[0]] = [key].concat(this.c_submission[part_num][(choice as any).Choice[0]]);
                }
                this.subtopic_problem_selection[part_num][+(choice as any).Choice[0] - 1] = [""];
                this.subtopic_attempt_explanation[part_num][+(choice as any).Choice[0] - 1] = [""];
            }
        }
        this.unique_choices[part_num].sort();
        console.log(this.unique_choices[part_num].sort());
        // return (unique_choices);
    }

    select_m_choice(ch: string, p: number, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        this.m_selection[part_num][p] = ch;
        if (this.m_selection[part_num][0] != '' && this.m_selection[part_num][1] != '') {
            this.m_submission[part_num][this.m_selection[part_num][1]] = this.m_selection[part_num][0];
            this.problem_selection[part_num][+this.m_selection[part_num][1] - 1] = this.m_selection[part_num][0][0];
            // this.attempt_path[part_num].push();
            this.problem_attempts[part_num] += 1;
            this.is_m_correct(part, true);
            this.m_selection[part_num] = ["", ""];
        }
        console.log(this.problem_selection);
        console.log(this.attempt_explanation);
    }

    remove_m_choice(ch: string, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        this.m_submission[part_num][ch] = '';
        this.problem_selection[part_num][+ch - 1] = '';
        this.attempt_explanation[part_num][+ch - 1] = '';
        this.select_m_choice('', 1, part)
    }

    is_matched(ch: string, p: number, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        if (p == 0) {
            if (Object.values(this.m_submission[part_num]).includes(ch)) {
                return true;
            }
            else if (Object.keys(this.c_submission[part_num]).length != 0) {
                for (let cat of Object.keys(this.c_submission[part_num])) {
                    if (Object.values(this.c_submission[part_num][cat]).includes(ch)) {
                        return true;
                    }
                }
                return false;
            }
            else {
                return false;
            }
        }
        else if (p == 1) {
            if (Object.keys(this.m_submission[part_num]).includes(ch) && this.m_submission[part_num][ch] != '') {
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

    select_c_choice(ch: string, p: number, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        this.m_selection[part_num][p] = ch;
        if (this.m_selection[part_num][0] != '' && this.m_selection[part_num][1] != '' && !this.c_submission[part_num][this.m_selection[part_num][1]].includes(this.m_selection[part_num][0])) {
            this.c_submission[part_num][this.m_selection[part_num][1]] = [this.m_selection[part_num][0]].concat(this.c_submission[part_num][this.m_selection[part_num][1]]);
            var cat_choices: string[] = [];
            for (let choice of this.c_submission[part_num][this.m_selection[part_num][1]]) {
                if (choice != '') {
                    cat_choices.push(choice[0]);
                }
            }
            this.problem_selection[part_num][+this.m_selection[part_num][1] - 1] = cat_choices;
            this.attempt_path[part_num].push();
            this.problem_attempts[part_num] += 1;
            if (this.exam_dump[this.problem_number].Type == 'C' || (this.exam_dump[this.problem_number].Type == 'MP' && this.exam_dump[this.problem_number].Parts[part].Type == 'C')) {
                this.is_c_correct(part, true);
            }
            else if (this.exam_dump[this.problem_number].Type == 'G' || (this.exam_dump[this.problem_number].Type == 'MP' && this.exam_dump[this.problem_number].Parts[part].Type == 'G')) {
                this.is_g_correct(part, true);
            }
            this.m_selection[part_num] = ["", ""];
        }
        console.log(this.m_selection);
        console.log(this.c_submission);
    }

    remove_c_choice(ch: string, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        for (let cat of Object.keys(this.c_submission[part_num])) {
            if (this.c_submission[part_num][cat].includes(ch)) {
                if (this.c_submission[part_num][cat].indexOf(ch) != -1) {
                    this.c_submission[part_num][cat].splice(this.c_submission[part_num][cat].indexOf(ch), 1);
                }
                else {
                    this.c_submission[part_num][cat].pop()
                }
            }
        }
        for (let cat of this.problem_selection[part_num]) {
            if (cat.includes(ch)) {
                if (cat.indexOf(ch) != -1) {
                    this.attempt_explanation[part_num][this.problem_selection[part_num].indexOf(cat)].splice(cat.indexOf(ch), 1);
                    cat.splice(cat.indexOf(ch), 1)
                }
                else {
                    this.attempt_explanation[part_num][this.problem_selection[part_num].indexOf(cat)].pop();
                    cat.pop();
                }
            }
        }
        this.is_c_correct(part, true);
        this.select_c_choice('', 1, part);
    }

    remove_g_choice(ch: string, cat: string, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        if (this.c_submission[part_num][cat].includes(ch)) {
            if (this.c_submission[part_num][cat].indexOf(ch) != -1) {
                this.c_submission[part_num][cat].splice(this.c_submission[part_num][cat].indexOf(ch), 1);
            }
            else {
                this.c_submission[part_num][cat].pop()
            }
        }
        if (this.problem_selection[part_num][+cat - 1].includes(ch)) {
            if (this.problem_selection[part_num][+cat - 1].indexOf(ch) != -1) {
                this.attempt_explanation[part_num][this.problem_selection[part_num].indexOf(this.problem_selection[part_num][+cat - 1])].splice(this.problem_selection[part_num][+cat - 1].indexOf(ch), 1);
                this.problem_selection[part_num][+cat - 1].splice(this.problem_selection[part_num][+cat - 1].indexOf(ch), 1)
            }
            else {
                this.attempt_explanation[part_num][this.problem_selection[part_num].indexOf(this.problem_selection[part_num][+cat - 1])].pop();
                this.problem_selection[part_num][+cat - 1].pop();
            }
        } this.is_g_correct(part, true);
        this.select_c_choice('', 1, part);
    }

    is_idd_correct(part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        for (let choice of Object.keys(this.exam_dump[this.problem_number].AnswerChoices)) {
            if (this.exam_dump[this.problem_number].AnswerChoices[choice].Key.Correct) {
                if (this.problem_selection[part_num][(+this.exam_dump[this.problem_number].AnswerChoices[choice].Choice[0]) - 1] != this.exam_dump[this.problem_number].AnswerChoices[choice].Choice[2]) {
                    return false;
                }
            }
        }
        return true;
    }

    is_m_correct(part: string, fetti: boolean) {
        var part_num = 0;
        var correct: boolean = true;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        var unique_c: string[] = [];
        if (Object.keys(this.exam_dump[this.problem_number].Parts).length == 0) {
            for (let choice of Object.keys(this.exam_dump[this.problem_number].AnswerChoices)) {
                if (!unique_c.includes(choice) && choice[0] != ' ' && choice != '') {
                    unique_c.push(choice)
                }
            }
            for (let choice of unique_c) {
                if (this.m_submission[part_num][this.exam_dump[this.problem_number].AnswerChoices[choice].Choice[0]] == choice) {
                    if (fetti) {
                        this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = this.exam_dump[this.problem_number].AnswerChoices[this.m_selection[part_num][0]].Key.Rationale;
                    }
                }
                else {
                    this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                    this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = '';
                    correct = false;
                }
            }
        }
        else {
            for (let choice of Object.keys(this.exam_dump[this.problem_number].Parts[part].AnswerChoices)) {
                if (!unique_c.includes(choice) && choice[0] != ' ' && choice != '') {
                    unique_c.push(choice)
                }
            }
            for (let choice of unique_c) {
                if (this.m_submission[part_num][this.exam_dump[this.problem_number].Parts[part].AnswerChoices[choice].Choice[0]] == choice) {
                    if (fetti) {
                        this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = this.exam_dump[this.problem_number].Parts[part].AnswerChoices[this.m_selection[part_num][0]].Key.Rationale;
                    }
                }
                else {
                    this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                    this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = '';
                    correct = false;
                }
            }
        }
        for (let sub of Object.keys(this.m_submission[part_num])) {
            if (this.m_submission[part_num][sub].length == 1 && this.m_submission[part_num][sub][0] == '') {
                this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                correct = false;
            }
        }
        if (correct && this.problem_attempts[part_num] == 1) {
            this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
        }
        else if (correct) {
            this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
        }
        // for (let selec of this.m_submission[part_num])
        if (correct && fetti) {
            this.confetti_light(this.problem_attempts[part_num]);
        }
        return correct;
    }

    is_c_correct(part: string, fetti: boolean) {
        var part_num = 0;
        var correct: boolean = true;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        var unique_c: string[] = [];
        if (Object.keys(this.exam_dump[this.problem_number].Parts).length == 0) {
            for (let choice of Object.keys(this.exam_dump[this.problem_number].AnswerChoices)) {
                if (!unique_c.includes(choice) && choice[0] != ' ' && choice != '') {
                    unique_c.push(choice)
                }
            }
            for (let choice of unique_c) {
                if (this.exam_dump[this.problem_number].AnswerChoices[choice].Choice != '' && this.c_submission[part_num][this.exam_dump[this.problem_number].AnswerChoices[choice].Choice[0]].includes(choice)) {
                    if (fetti) {
                        console.log(this.exam_dump[this.problem_number].AnswerChoices[this.m_selection[part_num][0]].Key.Rationale);
                        if (this.exam_dump[this.problem_number].AnswerChoices[this.m_selection[part_num][0]].Choice[0] == this.m_selection[part_num][1]) {
                            this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [this.exam_dump[this.problem_number].AnswerChoices[this.m_selection[part_num][0]].Key.Rationale].concat(this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                        }
                        else {
                            this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [''].concat(this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                        }
                    }
                }
                else {
                    this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                    correct = false;
                }
            }
        }
        else {
            for (let choice of Object.keys(this.exam_dump[this.problem_number].Parts[part].AnswerChoices)) {
                if (!unique_c.includes(choice) && choice[0] != ' ' && choice != '') {
                    unique_c.push(choice)
                }
            }
            for (let choice of unique_c) {
                if (this.c_submission[part_num][this.exam_dump[this.problem_number].Parts[part].AnswerChoices[choice].Choice[0]].includes(choice)) {
                    if (fetti) {
                        console.log(this.exam_dump[this.problem_number].Parts[part].AnswerChoices[this.m_selection[part_num][0]].Key.Rationale);
                        if (this.exam_dump[this.problem_number].Parts[part].AnswerChoices[this.m_selection[part_num][0]].Choice[0] == this.m_selection[part_num][1]) {
                            this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [this.exam_dump[this.problem_number].Parts[part].AnswerChoices[this.m_selection[part_num][0]].Key.Rationale].concat(this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                        }
                        else {
                            this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [''].concat(this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                        }
                    }
                }
                else {
                    this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                    correct = false;
                }
            }
        }
        if (correct && this.problem_attempts[part_num] == 1) {
            this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
        }
        else if (correct) {
            this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
        }
        if (correct && fetti) {
            this.confetti_light(this.problem_attempts[part_num]);
        }
        return correct;
    }

    is_g_correct(part: string, fetti: boolean) {
        var part_num = 0;
        var correct: boolean = true;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        var unique_c: string[] = [];
        if (Object.keys(this.exam_dump[this.problem_number].Parts).length == 0) {
            for (let choice of Object.keys(this.exam_dump[this.problem_number].AnswerChoices)) {
                if (!unique_c.includes(choice.substring(0, choice.length - 2)) && choice.substring(0, choice.length - 2) != '') {
                    unique_c.push(choice.substring(0, choice.length - 2));
                }
            }
            for (let choice of Object.keys(this.exam_dump[this.problem_number].AnswerChoices)) {
                if (choice.substring(0, choice.length - 2) != '' && this.exam_dump[this.problem_number].AnswerChoices[choice].Key.Correct && !this.c_submission[part_num][choice[choice.length - 1]].includes(choice.substring(0, choice.length - 2))) {
                    this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                    correct = false;
                }
            }
            for (let cat of Object.keys(this.c_submission[part_num])) {
                for (let choice of this.c_submission[part_num][cat]) {
                    if (choice != '' && Object.keys(this.exam_dump[this.problem_number].AnswerChoices).includes(choice + ':' + cat)) {
                        if (fetti) {
                            console.log(choice + ':' + cat);
                            console.log(this.exam_dump[this.problem_number].AnswerChoices[choice + ':' + cat].Key.Rationale);
                            if (this.exam_dump[this.problem_number].AnswerChoices[choice + ':' + cat].Choice[0] == this.m_selection[part_num][1]) {
                                this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [this.exam_dump[this.problem_number].AnswerChoices[choice + ':' + cat].Key.Rationale].concat(this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                            }
                            else {
                                this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [''].concat(this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                            }
                        }
                    }
                    else if (choice != '') {
                        this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                        correct = false;
                    }
                }
            }
        }
        else {
            for (let choice of Object.keys(this.exam_dump[this.problem_number].Parts[part].AnswerChoices)) {
                if (!unique_c.includes(choice.substring(0, choice.length - 2)) && choice.substring(0, choice.length - 2) != '') {
                    unique_c.push(choice.substring(0, choice.length - 2))
                }
            }
            for (let choice of Object.keys(this.exam_dump[this.problem_number].Parts[part].AnswerChoices)) {
                if (choice.substring(0, choice.length - 2) != '' && this.exam_dump[this.problem_number].Parts[part].AnswerChoices[choice].Key.Correct && !this.c_submission[part_num][choice[choice.length - 1]].includes(choice.substring(0, choice.length - 2))) {
                    this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                    correct = false;
                }
            }
            for (let cat of Object.keys(this.c_submission[part_num])) {
                for (let choice of this.c_submission[part_num][cat]) {
                    if (choice != '' && Object.keys(this.exam_dump[this.problem_number].Parts[part].AnswerChoices).includes(choice + ':' + cat)) {
                        if (fetti) {
                            console.log(this.exam_dump[this.problem_number].Parts[part].AnswerChoices[choice + ':' + cat].Key.Rationale);
                            if (this.exam_dump[this.problem_number].Parts[part].AnswerChoices[choice + ':' + cat].Choice[0] == this.m_selection[part_num][1]) {
                                this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [this.exam_dump[this.problem_number].Parts[part].AnswerChoices[choice + ':' + cat].Key.Rationale].concat(this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                            }
                            else {
                                this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = [''].concat(this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1]);
                            }
                        }
                    }
                    else if (choice != '') {
                        this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
                        correct = false;
                    }
                }
            }
        }
        if (correct && this.problem_attempts[part_num] == 1) {
            this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' try.';
        }
        else if (correct) {
            this.attempt_response[part_num] = 'Correct! You got the right answer in ' + this.problem_attempts[part_num].toString() + ' tries.';
        }
        if (correct && fetti) {
            this.confetti_light(this.problem_attempts[part_num]);
        }
        return correct;
    }

    get_o_key(probs: any) {
        var o_key: any[] = []
        var num_options: number = 0
        for (let ch of Object.keys(probs)) {
            if (+probs[ch].Choice[0] > num_options) {
                num_options = +probs[ch].Choice[0];
            }
        }
        for (let i: number = 0; i < num_options; i++) {
            o_key.push([]);
        }
        for (let ch of Object.keys(probs)) {
            if (probs[ch].Key.Correct) {
                o_key[+probs[ch].Choice[0] - 1].push(ch[0]);
            }
        }
        return o_key;
    }

    get_c_key(probs: any) {
        var c_key: any[] = []
        var num_options: number = 0
        for (let ch of Object.keys(probs)) {
            if (+probs[ch].Choice[0] > num_options) {
                num_options = +probs[ch].Choice[0];
            }
        }
        for (let i: number = 0; i < num_options; i++) {
            c_key.push([]);
        }
        for (let ch of Object.keys(probs)) {
            if (probs[ch].Key.Correct) {
                c_key[+probs[ch].Choice[0] - 1].push(ch[0]);
            }
        }
        return c_key;
    }

    get_g_key(probs: any) {
        var g_key: any[] = []
        var num_options: number = 0
        for (let ch of Object.keys(probs)) {
            if (+probs[ch].Choice[0] > num_options) {
                num_options = +probs[ch].Choice[0];
            }
        }
        for (let i: number = 0; i < num_options; i++) {
            g_key.push([]);
        }
        for (let ch of Object.keys(probs)) {
            if (probs[ch].Key.Correct) {
                g_key[+probs[ch].Choice[0] - 1].push(ch[0]);
            }
        }
        return g_key;
    }

    is_MP_correct(choices: any) {
        var comp = true;
        for (let part of choices) {
            for (let ch of part) {
                if (ch != '✅') {
                    comp = false;
                }
            }
        }
        return comp;
    }

    is_MP_partial(choices: any) {
        var comp = false;
        for (let part of choices) {
            for (let ch of part) {
                if (ch == '✅') {
                    comp = true;
                }
            }
        }
        return comp;
    }

    is_MP_complete() {
        var comp = true;
        for (let resp of this.attempt_response) {
            if (resp == '' || !resp.startsWith('Correct')) {
                comp = false;
            }
        }
        return comp;
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

    update_DD(index: string, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
            if (this.exam_dump[this.problem_number].Parts[part].AnswerChoices[index + ':' + this.problem_selection[part_num][+index - 1]].Key.Correct) {
                const DDICel: string = "DDInputC-" + index;
                var dropdown: any = document.getElementById(DDICel);
            }
            else {
                const DDIIel: string = "DDInputI-" + index;
                var dropdown: any = document.getElementById(DDIIel);
            }
        }
        else {
            if (this.exam_dump[this.problem_number].AnswerChoices[index + ':' + this.problem_selection[part_num][+index - 1]].Key.Correct) {
                const DDICel: string = "DDInputC-" + index;
                var dropdown: any = document.getElementById(DDICel);
            }
            else {
                const DDIIel: string = "DDInputI-" + index;
                var dropdown: any = document.getElementById(DDIIel);
            }
        }
        dropdown.value = this.problem_selection[part_num][+index - 1];
    }

    update_DD_st(index: string, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
            if (this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices[index + ':' + this.subtopic_problem_selection[part_num][+index - 1]].Key.Correct) {
                const DDICel: string = "DDInputC-" + index;
                var dropdown: any = document.getElementById(DDICel);
            }
            else {
                const DDIIel: string = "DDInputI-" + index;
                var dropdown: any = document.getElementById(DDIIel);
            }
        }
        else {
            if (this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices[index + ':' + this.subtopic_problem_selection[part_num][+index - 1]].Key.Correct) {
                const DDICel: string = "DDInputC-" + index;
                var dropdown: any = document.getElementById(DDICel);
            }
            else {
                const DDIIel: string = "DDInputI-" + index;
                var dropdown: any = document.getElementById(DDIIel);
            }
        }
        dropdown.value = this.subtopic_problem_selection[part_num][+index - 1];
    }

    get_T(index: string, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        const TIel: string = "inputT-" + part + '-' + index;
        var input: any = document.getElementById(TIel);
        return input.value;
    }

    get_T_st(index: string, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
        }
        const TIel: string = "inputT-" + part + '-' + index;
        var input: any = document.getElementById(TIel);
        return input.value;
    }

    get_MFR(index: string, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part);
        }
        const MFRIel: string = "inputMFR-" + part + "-" + index;
        var dropdown: any = document.getElementById(MFRIel);
        return dropdown.value;
    }

    get_MFR_st(index: string, part: string) {
        var part_num = 0;
        if (part != '') {
            part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
        }
        const MFRIel: string = "inputMFR-" + part + "-" + index;
        var dropdown: any = document.getElementById(MFRIel);
        return dropdown.value;
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
        if (Object.keys(this.exam_dump).indexOf("" + this.problem_number) + 1 < this.exam_length) {
            this.problem_number = +Object.keys(this.exam_dump)[Object.keys(this.exam_dump).indexOf("" + this.problem_number) + 1];
            this.attempt_path = [];
            this.attempt_response = [];
            this.attempt_explanation = [];
            this.problem_selection = [];
            this.m_shuffled = false;
            this.m_selection = [];
            this.m_submission = [];
            this.c_submission = [];
            this.shuffle_choices = {};
            this.unique_choices = [];
            if (Object.keys(this.exam_dump[this.problem_number].Parts).length == 0) {
                this.problem_attempts = [0];
                this.attempt_path = [[]];
                this.attempt_response = [''];
                this.attempt_explanation = [[]];
                this.m_selection = [["", ""]];
                this.m_submission = [{}];
                this.c_submission = [{}];
                if (['MC', 'FR', 'SR', 'MR', 'LR', 'IMC', 'LP', 'GP'].includes(this.exam_dump[this.problem_number].Type)) {
                    this.problem_selection = [['']];
                    if (['GP'].includes(this.exam_dump[this.problem_number].Type)) {
                        setTimeout(() => {
                            this.plot_graph_gp('', false);
                        }, 500);
                    }
                }
                else if (['MS', 'O', 'C', 'G', 'IM', 'IMS', 'MGP'].includes(this.exam_dump[this.problem_number].Type)) {
                    this.problem_selection = [[]];
                    if (['O', 'C', 'G'].includes(this.exam_dump[this.problem_number].Type)) {
                        this.unique_m(this.exam_dump[this.problem_number].AnswerChoices, '');
                    }
                    if (['MGP'].includes(this.exam_dump[this.problem_number].Type)) {
                        setTimeout(() => {
                            this.plot_graph_mgp('', false);
                        }, 500);
                    }
                }
                else if (['MFR', 'IDD', 'T'].includes(this.exam_dump[this.problem_number].Type)) {
                    var msp_nums: string[] = [];
                    this.problem_selection.push([]);
                    for (let choice of Object.keys(this.exam_dump[this.problem_number].AnswerChoices)) {
                        if (choice.length > 1 && choice[1] == ':' && !msp_nums.includes(choice[0])) {
                            this.problem_selection[0].push('');
                            msp_nums.push(choice[0]);
                        }
                    }
                }
            }
            else {
                this.problem_attempts = [];
                for (let part of Object.keys(this.exam_dump[this.problem_number].Parts)) {
                    this.problem_attempts.push(0);
                    this.attempt_path.push([]);
                    this.attempt_response.push('');
                    this.attempt_explanation.push([]);
                    this.m_selection.push(["", ""]);
                    this.m_submission.push({});
                    this.c_submission.push({});
                    if (['MC', 'FR', 'SR', 'MR', 'LR', 'IMC', 'LP', 'GP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                        this.problem_selection.push(['']);
                        if (['GP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                            setTimeout(() => {
                                this.plot_graph_gp(part, false);
                            }, 500);
                        }
                    }
                    else if (['MS', 'O', 'C', 'G', 'IM', 'IMS', 'MGP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                        this.problem_selection.push([]);
                        if (['O', 'C', 'G'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                            this.unique_m(this.exam_dump[this.problem_number].Parts[part].AnswerChoices, part);
                        }
                        if (['MGP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                            setTimeout(() => {
                                this.plot_graph_mgp(part, false);
                            }, 500);
                        }
                    }
                    else if (['MFR', 'IDD', 'T'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                        var msp_nums: string[] = [];
                        this.problem_selection.push([]);
                        for (let choice of Object.keys(this.exam_dump[this.problem_number].Parts[part].AnswerChoices)) {
                            if (choice.length > 1 && choice[1] == ':' && !msp_nums.includes(choice[0])) {
                                this.problem_selection[Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part)].push('');
                                msp_nums.push(choice[0]);
                            }
                        }
                    }
                }
            }
            this.refsheet_source = '../../' + this.exam_attribute_dump[this.key].RefSheet;
            for (let supp of this.exam_dump[this.problem_number].SuppContent) {
                setTimeout(() => {
                    this.read_supp_json(supp);
                }, 100 * (1 + this.exam_dump[this.problem_number].SuppContent.indexOf(supp)));
            }
            if (this.exam_dump[this.problem_number].Type == 'MP') {
                for (let part of Object.keys(this.exam_dump[this.problem_number].Parts)) {
                    for (let block of this.exam_dump[this.problem_number].Parts[part].Content) {
                        if (block.startsWith(':table:')) {
                            setTimeout(() => {
                                this.read_table(block.slice(7));
                            }, 100);
                        }
                    }
                }
            }
            if (this.exam_dump[this.problem_number].Type != 'MP') {
                for (let block of this.exam_dump[this.problem_number].Content) {
                    if (block.startsWith(':table:')) {
                        setTimeout(() => {
                            this.read_table(block.slice(7));
                        }, 100);
                    }
                }
            }
            this.clearProblemTimer();
            this.toggleProblemTimer();
        }
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
                if (['MC', 'FR', 'SR', 'MR', 'LR', 'IMC', 'LP', 'GP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
                    this.subtopic_problem_selection = [['']];
                    if (['GP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
                        setTimeout(() => {
                            this.plot_graph_gp('', true);
                        }, 500);
                    }
                }
                else if (['MS', 'O', 'C', 'G', 'IM', 'IMS', 'MGP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
                    this.subtopic_problem_selection = [[]];
                    if (['O', 'C', 'G'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
                        this.unique_m_st(this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices, '');
                    }
                    if (['MGP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
                        setTimeout(() => {
                            this.plot_graph_mgp('', true);
                        }, 500);
                    }
                }
                else if (['MFR', 'IDD', 'T'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
                    var msp_nums: string[] = [];
                    this.subtopic_problem_selection.push([]);
                    for (let choice of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices)) {
                        if (choice.length > 1 && choice[1] == ':' && !msp_nums.includes(choice[0])) {
                            this.subtopic_problem_selection[0].push('');
                            msp_nums.push(choice[0]);
                        }
                    }
                }
            }
            else {
                this.subtopic_problem_attempts = [];
                for (let part of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts)) {
                    this.subtopic_problem_attempts.push(0);
                    this.subtopic_attempt_path.push([]);
                    this.subtopic_attempt_response.push('');
                    this.subtopic_attempt_explanation.push([]);
                    this.m_selection.push(["", ""]);
                    this.m_submission.push({});
                    this.c_submission.push({});
                    if (['MC', 'FR', 'SR', 'MR', 'LR', 'IMC', 'LP', 'GP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
                        this.subtopic_problem_selection.push(['']);
                        if (['GP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
                            setTimeout(() => {
                                this.plot_graph_gp(part, true);
                            }, 500);
                        }
                    }
                    else if (['MS', 'O', 'C', 'G', 'IM', 'IMS', 'MGP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
                        this.subtopic_problem_selection.push([]);
                        if (['O', 'C', 'G'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
                            this.unique_m_st(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices, part);
                        }
                        if (['MGP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
                            setTimeout(() => {
                                this.plot_graph_mgp(part, true);
                            }, 500);
                        }
                    }
                    else if (['MFR', 'IDD', 'T'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
                        var msp_nums: string[] = [];
                        this.subtopic_problem_selection.push([]);
                        for (let choice of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices)) {
                            if (choice.length > 1 && choice[1] == ':' && !msp_nums.includes(choice[0])) {
                                this.subtopic_problem_selection[Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part)].push('');
                                msp_nums.push(choice[0]);
                            }
                        }
                    }
                }
            }
            this.st_refsheet_source = '../../' + this.exam_attribute_dump[(this.subtopic_search_dump[this.subtopic_problem_number].Number).substring(0, (this.subtopic_search_dump[this.subtopic_problem_number].Number).indexOf('-'))].RefSheet;
            for (let supp of this.subtopic_search_dump[this.subtopic_problem_number].SuppContent) {
                setTimeout(() => {
                    this.read_supp_st_json(supp);
                }, 100 * (1 + this.subtopic_search_dump[this.subtopic_problem_number].SuppContent.indexOf(supp)));
            }
            if (this.subtopic_search_dump[this.subtopic_problem_number].Type == 'MP') {
                for (let part of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts)) {
                    for (let block of this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Content) {
                        if (block.startsWith(':table:')) {
                            setTimeout(() => {
                                this.read_table_st(block.slice(7));
                            }, 100);
                        }
                    }
                }
            }
            if (this.subtopic_search_dump[this.subtopic_problem_number].Type != 'MP') {
                for (let block of this.subtopic_search_dump[this.subtopic_problem_number].Content) {
                    if (block.startsWith(':table:')) {
                        setTimeout(() => {
                            this.read_table_st(block.slice(7));
                        }, 100);
                    }
                }
            }
        }
    }

    prev_problem() {
        if (this.problem_number > 1) {
            this.problem_number -= 1;
            this.attempt_path = [];
            this.attempt_response = [];
            this.attempt_explanation = [];
            this.problem_selection = [];
            this.m_shuffled = false;
            this.shuffle_choices = {};
            this.unique_choices = [];
            if (Object.keys(this.exam_dump[this.problem_number].Parts).length == 0) {
                this.problem_attempts = [0];
                this.attempt_path = [[]];
                this.attempt_response = [''];
                this.attempt_explanation = [[]];
                this.m_selection = [["", ""]];
                this.m_submission = [{}];
                this.c_submission = [{}];
                if (['MC', 'FR', 'SR', 'MR', 'LR', 'IMC', 'LP', 'GP'].includes(this.exam_dump[this.problem_number].Type)) {
                    this.problem_selection = [['']];
                    if (['GP'].includes(this.exam_dump[this.problem_number].Type)) {
                        setTimeout(() => {
                            this.plot_graph_gp('', false);
                        }, 500);
                    }
                }
                else if (['MS', 'O', 'C', 'G', 'IM', 'IMS', 'MGP'].includes(this.exam_dump[this.problem_number].Type)) {
                    this.problem_selection = [[]];
                    if (['O', 'C', 'G'].includes(this.exam_dump[this.problem_number].Type)) {
                        this.unique_m(this.exam_dump[this.problem_number].AnswerChoices, '');
                    }
                    if (['MGP'].includes(this.exam_dump[this.problem_number].Type)) {
                        setTimeout(() => {
                            this.plot_graph_mgp('', false);
                        }, 500);
                    }
                }
                else if (['MFR', 'IDD', 'T'].includes(this.exam_dump[this.problem_number].Type)) {
                    var msp_nums: string[] = [];
                    this.problem_selection.push([]);
                    for (let choice of Object.keys(this.exam_dump[this.problem_number].AnswerChoices)) {
                        if (choice.length > 1 && choice[1] == ':' && !msp_nums.includes(choice[0])) {
                            this.problem_selection[0].push('');
                            msp_nums.push(choice[0]);
                        }
                    }
                }
            }
            else {
                this.problem_attempts = [];
                for (let part of Object.keys(this.exam_dump[this.problem_number].Parts)) {
                    this.problem_attempts.push(0);
                    this.attempt_path.push([]);
                    this.attempt_response.push('');
                    this.attempt_explanation.push([]);
                    this.m_selection.push(["", ""]);
                    this.m_submission.push({});
                    this.c_submission.push({});
                    if (['MC', 'FR', 'SR', 'MR', 'LR', 'IMC', 'LP', 'GP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                        this.problem_selection.push(['']);
                        if (['GP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                            setTimeout(() => {
                                this.plot_graph_gp(part, false);
                            }, 500);
                        }
                    }
                    else if (['MS', 'O', 'C', 'G', 'IM', 'IMS', 'MGP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                        this.problem_selection.push([]);
                        if (['O', 'C', 'G'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                            this.unique_m(this.exam_dump[this.problem_number].Parts[part].AnswerChoices, part);
                        }
                        if (['MGP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                            setTimeout(() => {
                                this.plot_graph_mgp(part, false);
                            }, 500);
                        }
                    }
                    else if (['MFR', 'IDD', 'T'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                        var msp_nums: string[] = [];
                        this.problem_selection.push([]);
                        for (let choice of Object.keys(this.exam_dump[this.problem_number].Parts[part].AnswerChoices)) {
                            if (choice.length > 1 && choice[1] == ':' && !msp_nums.includes(choice[0])) {
                                this.problem_selection[Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part)].push('');
                                msp_nums.push(choice[0]);
                            }
                        }
                    }
                }
            }
            this.refsheet_source = '../../' + this.exam_attribute_dump[this.key].RefSheet;
            for (let supp of this.exam_dump[this.problem_number].SuppContent) {
                setTimeout(() => {
                    this.read_supp_json(supp);
                }, 100 * (1 + this.exam_dump[this.problem_number].SuppContent.indexOf(supp)));
            }
            if (this.exam_dump[this.problem_number].Type == 'MP') {
                for (let part of Object.keys(this.exam_dump[this.problem_number].Parts)) {
                    for (let block of this.exam_dump[this.problem_number].Parts[part].Content) {
                        if (block.startsWith(':table:')) {
                            setTimeout(() => {
                                this.read_table(block.slice(7));
                            }, 100);
                        }
                    }
                }
            }
            if (this.exam_dump[this.problem_number].Type != 'MP') {
                for (let block of this.exam_dump[this.problem_number].Content) {
                    if (block.startsWith(':table:')) {
                        setTimeout(() => {
                            this.read_table(block.slice(7));
                        }, 100);
                    }
                }
            }
            this.clearProblemTimer();
            this.toggleProblemTimer();
        }
    }

    go_to_prob(num: number) {
        // if (num < 1) {
        //     this.problem_number = 1;
        // }
        // else if (num > this.exam_length) {
        //     this.problem_number = this.exam_length;
        // }
        // else if (Number.isNaN(num)) {
        //     this.problem_number = this.problem_number;
        // }
        // else {
        //     this.problem_number = num;
        // }
        this.problem_number = num;
        this.attempt_path = [];
        this.attempt_response = [];
        this.attempt_explanation = [];
        this.problem_selection = [];
        this.m_shuffled = false;
        this.shuffle_choices = {};
        this.unique_choices = [];
        if (Object.keys(this.exam_dump[this.problem_number].Parts).length == 0) {
            this.problem_attempts = [0];
            this.attempt_path = [[]];
            this.attempt_response = [''];
            this.attempt_explanation = [[]];
            this.m_selection = [["", ""]];
            this.m_submission = [{}];
            this.c_submission = [{}];
            if (['MC', 'FR', 'SR', 'MR', 'LR', 'IMC', 'LP', 'GP'].includes(this.exam_dump[this.problem_number].Type)) {
                this.problem_selection = [['']];
                if (['GP'].includes(this.exam_dump[this.problem_number].Type)) {
                    setTimeout(() => {
                        this.plot_graph_gp('', false);
                    }, 500);
                }
            }
            else if (['MS', 'O', 'C', 'G', 'IM', 'IMS', 'MGP'].includes(this.exam_dump[this.problem_number].Type)) {
                this.problem_selection = [[]];
                if (['O', 'C', 'G'].includes(this.exam_dump[this.problem_number].Type)) {
                    this.unique_m(this.exam_dump[this.problem_number].AnswerChoices, '');
                }
                if (['MGP'].includes(this.exam_dump[this.problem_number].Type)) {
                    setTimeout(() => {
                        this.plot_graph_mgp('', false);
                    }, 500);
                }
            }
            else if (['MFR', 'IDD', 'T'].includes(this.exam_dump[this.problem_number].Type)) {
                var msp_nums: string[] = [];
                this.problem_selection.push([]);
                for (let choice of Object.keys(this.exam_dump[this.problem_number].AnswerChoices)) {
                    if (choice.length > 1 && choice[1] == ':' && !msp_nums.includes(choice[0])) {
                        this.problem_selection[0].push('');
                        msp_nums.push(choice[0]);
                    }
                }
            }
        }
        else {
            this.problem_attempts = [];
            for (let part of Object.keys(this.exam_dump[this.problem_number].Parts)) {
                this.problem_attempts.push(0);
                this.attempt_path.push([]);
                this.attempt_response.push('');
                this.attempt_explanation.push([]);
                this.m_selection.push(["", ""]);
                this.m_submission.push({});
                this.c_submission.push({});
                if (['MC', 'FR', 'SR', 'MR', 'LR', 'IMC', 'LP', 'GP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                    this.problem_selection.push(['']);
                    if (['GP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                        setTimeout(() => {
                            this.plot_graph_gp(part, false);
                        }, 500);
                    }
                }
                else if (['MS', 'O', 'C', 'G', 'IM', 'IMS', 'MGP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                    this.problem_selection.push([]);
                    if (['O', 'C', 'G'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                        this.unique_m(this.exam_dump[this.problem_number].Parts[part].AnswerChoices, part);
                    }
                    if (['MGP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                        setTimeout(() => {
                            this.plot_graph_mgp(part, false);
                        }, 500);
                    }
                }
                else if (['MFR', 'IDD', 'T'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                    var msp_nums: string[] = [];
                    this.problem_selection.push([]);
                    for (let choice of Object.keys(this.exam_dump[this.problem_number].Parts[part].AnswerChoices)) {
                        if (choice.length > 1 && choice[1] == ':' && !msp_nums.includes(choice[0])) {
                            this.problem_selection[Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part)].push('');
                            msp_nums.push(choice[0]);
                        }
                    }
                }
            }
        }
        console.log(this.problem_selection);
        this.refsheet_source = '../../' + this.exam_attribute_dump[this.key].RefSheet;
        for (let supp of this.exam_dump[this.problem_number].SuppContent) {
            setTimeout(() => {
                this.read_supp_json(supp);
            }, 100 * (1 + this.exam_dump[this.problem_number].SuppContent.indexOf(supp)));
        }
        if (this.exam_dump[this.problem_number].Type == 'MP') {
            for (let part of Object.keys(this.exam_dump[this.problem_number].Parts)) {
                for (let block of this.exam_dump[this.problem_number].Parts[part].Content) {
                    if (block.startsWith(':table:')) {
                        setTimeout(() => {
                            this.read_table(block.slice(7));
                        }, 100);
                    }
                }
            }
        }
        if (this.exam_dump[this.problem_number].Type != 'MP') {
            for (let block of this.exam_dump[this.problem_number].Content) {
                if (block.startsWith(':table:')) {
                    setTimeout(() => {
                        this.read_table(block.slice(7));
                    }, 100);
                }
            }
        }
        this.clearProblemTimer();
        this.toggleProblemTimer();
        // MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
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

    search_subtopic(topic: string, subtopic: string) {
      this.selected_student_st = '';
      this.subtopic_problem_count = 0;
      this.subtopic_new_problem_count = 0;
      this.subtopic_correct_problem_count = 0;
      this.subtopic_search_dump = {};
      if (this.authService.userData && this.authService.userData.role == 'Student') {
        const exam_history = this.authService.userData.exams.history;
        for (const [ex, dump] of Object.entries(this.e_dump_dict)) {
          if (!Object.keys(exam_history).includes(ex) || (exam_history[ex] as any).status != "Completed") {
            for (const [num, prob] of Object.entries(dump)) {
              if (typeof prob.SubTopics != 'undefined' && !this.exam_attribute_dump[ex].HideTopics) {
                if (prob.SubTopics.includes(subtopic)) {
                  if (prob.Topics[prob.SubTopics.indexOf(subtopic)].includes(topic)) {
                    this.subtopic_new_problem_count += 1;
                  }
                }
              }
            }
          }
          if (Object.keys(exam_history).includes(ex) && (exam_history[ex] as any).status == "Completed") {
            const exam_sub = this.authService.getExamSubmission2(ex);
            setTimeout(() => {
              for (const [num, prob] of Object.entries(dump)) {
                if (typeof prob.SubTopics != 'undefined' && !this.exam_attribute_dump[ex].HideTopics) {
                  if (prob.SubTopics.includes(subtopic)) {
                    if (prob.Topics[prob.SubTopics.indexOf(subtopic)].includes(topic)) {
                      if (((exam_sub.problems as any)[num].Correct.length == 1 && (exam_sub.problems as any)[num].Correct[0][0] == '✅') || ((exam_sub.problems as any)[num].Correct.length > 1 && this.is_MP_correct((exam_sub.problems as any)[num].Correct))) {
                        this.subtopic_correct_problem_count += 1;
                      }
                    }
                  }
                }
              }
            }, 50);
          }
        }
      }
      // else{}
      for (const [ex, dump] of Object.entries(this.e_dump_dict)) {
        for (const [num, prob] of Object.entries(dump)) {
          if (typeof prob.SubTopics != 'undefined' && !this.exam_attribute_dump[ex].HideTopics) {
            if (prob.SubTopics.includes(subtopic)) {
              if (prob.Topics[prob.SubTopics.indexOf(subtopic)].includes(topic)) {
                this.selected_topic = topic;
                // this.standard_id = standardID;
                this.subtopic_problem_count += 1;
                this.subtopic_search_dump[this.subtopic_problem_count] = prob;
                if (!('' + this.subtopic_search_dump[this.subtopic_problem_count].Number).includes('-')) {
                  this.subtopic_search_dump[this.subtopic_problem_count].Number = ex + '-' + '' + this.subtopic_search_dump[this.subtopic_problem_count].Number;
                }
              }
            }
          }
        }
      }
      if (this.authService.userData && this.authService.userData.role == 'Student') {
        const exam_history = this.authService.userData.exams.history;
        this.subtopic_problem_count = 0;
        this.subtopic_search_dump = {};
        for (const [ex, dump] of Object.entries(this.e_dump_dict)) {
          if (Object.keys(exam_history).includes(ex) && (exam_history[ex] as any).status == "Completed") {
            for (const [num, prob] of Object.entries(dump)) {
              if (typeof prob.SubTopics != 'undefined' && !this.exam_attribute_dump[ex].HideTopics) {
                if (prob.SubTopics.includes(subtopic)) {
                  if (prob.Topics[prob.SubTopics.indexOf(subtopic)].includes(topic)) {
                    this.subtopic_problem_count += 1;
                    this.subtopic_search_dump[this.subtopic_problem_count] = prob;
                    if (!('' + this.subtopic_search_dump[this.subtopic_problem_count].Number).includes('-')) {
                      this.subtopic_search_dump[this.subtopic_problem_count].Number = ex + '-' + '' + this.subtopic_search_dump[this.subtopic_problem_count].Number;
                    }
                  }
                }
              }
            }
          }
        }
        Object.entries(this.subtopic_search_dump).sort(([, valueA], [, valueB]) => (this.authService.getStudProbSubmission2(this.user_data.uid, valueA.Number)).timestamp - (this.authService.getStudProbSubmission2(this.user_data.uid, valueB.Number)).timestamp);
        this.subtopic_streak_count = 0;
        var streak = true;
        var nums: string[] = [];
        var subs: any[] = [];
        for (let i = 1; i <= Object.keys(this.subtopic_search_dump).length; i++) {
          nums.push(this.subtopic_search_dump[Object.keys(this.subtopic_search_dump)[Object.keys(this.subtopic_search_dump).length - i] as any].Number);
          subs.push(this.authService.getStudExamSubmission2(this.user_data.uid, this.subtopic_search_dump[Object.keys(this.subtopic_search_dump)[Object.keys(this.subtopic_search_dump).length - i] as any].Number.substring(0, (this.subtopic_search_dump[Object.keys(this.subtopic_search_dump)[Object.keys(this.subtopic_search_dump).length - i] as any].Number).indexOf('-'))));
        }
        console.log(nums);
        console.log(subs);
        setTimeout(() => {
          for (let i = 1; i <= Object.keys(this.subtopic_search_dump).length; i++) {
            this.subtopic_submission.push(subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)]);
            if (streak && ((subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct.length == 1 && subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct[0][0] == '✅') || (subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct.length > 1 && this.is_MP_correct(subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct)))) {
              this.subtopic_streak_count += 1;
            }
            else {
              streak = false;
              this.subtopic_streak_count = 0;
            }
          }
        }, 50);
        for (const [ex, dump] of Object.entries(this.e_dump_dict)) {
          if (!Object.keys(exam_history).includes(ex) || (exam_history[ex] as any).status != "Completed") {
            for (const [num, prob] of Object.entries(dump)) {
              if (typeof prob.SubTopics != 'undefined' && !this.exam_attribute_dump[ex].HideTopics) {
                if (prob.SubTopics.includes(subtopic)) {
                  if (prob.Topics[prob.SubTopics.indexOf(subtopic)].includes(topic)) {
                    this.subtopic_problem_count += 1;
                    this.subtopic_search_dump[this.subtopic_problem_count] = prob;
                    if (!('' + this.subtopic_search_dump[this.subtopic_problem_count].Number).includes('-')) {
                      this.subtopic_search_dump[this.subtopic_problem_count].Number = ex + '-' + '' + this.subtopic_search_dump[this.subtopic_problem_count].Number;
                    }
                  }
                }
              }
            }
          }
        }
      }
      // setTimeout(() => {
      this.selected_subtopic = subtopic;
      this.subtopic_problem_number = 0;
      this.standard_fav = false;
      if (this.authService.userData) {
        for (let fav of this.authService.userData.standards.favorites) {
          if (topic == fav[0] && subtopic == fav[1]) {
            this.standard_fav = true;
          }
        }
      }
      // }, 500);
    }

    begin_practice_st() {
        if (this.subtopic_problem_count != this.subtopic_new_problem_count) {
            this.subtopic_problem_number = this.subtopic_problem_count - this.subtopic_new_problem_count + 1;
        }
        else {
            this.subtopic_problem_number = 1;
        }
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
                if (['MC', 'FR', 'SR', 'MR', 'LR', 'IMC', 'LP', 'GP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
                    this.subtopic_problem_selection = [['']];
                    if (['GP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
                        setTimeout(() => {
                            this.plot_graph_gp('', true);
                        }, 500);
                    }
                }
                else if (['MS', 'O', 'C', 'G', 'IM', 'IMS', 'MGP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
                    this.subtopic_problem_selection = [[]];
                    if (['O', 'C', 'G'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
                        this.unique_m_st(this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices, '');
                    }
                    if (['MGP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
                        setTimeout(() => {
                            this.plot_graph_mgp('', true);
                        }, 500);
                    }
                }
                else if (['MFR', 'IDD', 'T'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
                    var msp_nums: string[] = [];
                    this.subtopic_problem_selection.push([]);
                    for (let choice of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].AnswerChoices)) {
                        if (choice.length > 1 && choice[1] == ':' && !msp_nums.includes(choice[0])) {
                            this.subtopic_problem_selection[0].push('');
                            msp_nums.push(choice[0]);
                        }
                    }
                }
            }
            else {
                this.subtopic_problem_attempts = [];
                for (let part of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts)) {
                    this.subtopic_problem_attempts.push(0);
                    this.subtopic_attempt_path.push([]);
                    this.subtopic_attempt_response.push('');
                    this.subtopic_attempt_explanation.push([]);
                    if (['MC', 'FR', 'SR', 'MR', 'LR', 'IMC', 'LP', 'GP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
                        this.subtopic_problem_selection.push(['']);
                        if (['GP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
                            setTimeout(() => {
                                this.plot_graph_gp(part, true);
                            }, 500);
                        }
                    }
                    else if (['MS', 'O', 'C', 'G', 'IM', 'IMS', 'MGP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
                        this.subtopic_problem_selection.push([]);
                        if (['O', 'C', 'G'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
                            this.unique_m_st(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices, part);
                        }
                        if (['MGP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
                            setTimeout(() => {
                                this.plot_graph_mgp(part, true);
                            }, 500);
                        }
                    }
                    else if (['MFR', 'IDD', 'T'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
                        var msp_nums: string[] = [];
                        this.subtopic_problem_selection.push([]);
                        for (let choice of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].AnswerChoices)) {
                            if (choice.length > 1 && choice[1] == ':' && !msp_nums.includes(choice[0])) {
                                this.subtopic_problem_selection[Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part)].push('');
                                msp_nums.push(choice[0]);
                            }
                        }
                    }
                }
            }
            this.st_refsheet_source = '../../' + this.exam_attribute_dump[(this.subtopic_search_dump[this.subtopic_problem_number].Number).substring(0, (this.subtopic_search_dump[this.subtopic_problem_number].Number).indexOf('-'))].RefSheet;
            for (let supp of this.subtopic_search_dump[this.subtopic_problem_number].SuppContent) {
                setTimeout(() => {
                    this.read_supp_st_json(supp);
                }, 100 * (1 + this.subtopic_search_dump[this.subtopic_problem_number].SuppContent.indexOf(supp)));
            }
            if (this.subtopic_search_dump[this.subtopic_problem_number].Type == 'MP') {
                for (let part of Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts)) {
                    for (let block of this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Content) {
                        if (block.startsWith(':table:')) {
                            setTimeout(() => {
                                this.read_table_st(block.slice(7));
                            }, 100);
                        }
                    }
                }
            }
            if (this.subtopic_search_dump[this.subtopic_problem_number].Type != 'MP') {
                for (let block of this.subtopic_search_dump[this.subtopic_problem_number].Content) {
                    if (block.startsWith(':table:')) {
                        setTimeout(() => {
                            this.read_table_st(block.slice(7));
                        }, 100);
                    }
                }
            }
        }
    }

    select_student_st(id: string) {
        //   this.exam_inprogress = false;
        //   this.progress_number = 0;
        if (id != this.selected_student_st) {
            console.log(this.subtopic_search_dump);
            this.selected_student_st = '';
            this.selected_student_data = this.my_students_data[id];
            const exam_history = this.my_students_data[id].exams.history;
            this.subtopic_problem_count = 0;
            this.subtopic_search_dump = {};
            for (const [ex, dump] of Object.entries(this.e_dump_dict)) {
                if (Object.keys(exam_history).includes(ex) && (exam_history[ex] as any).status == "Completed") {
                    for (const [num, prob] of Object.entries(dump)) {
                        if (typeof prob.SubTopics != 'undefined' && !this.exam_attribute_dump[ex].HideTopics) {
                            if (prob.SubTopics.includes(this.selected_subtopic)) {
                                if (prob.Topics[prob.SubTopics.indexOf(this.selected_subtopic)].includes(this.selected_topic)) {
                                    this.subtopic_problem_count += 1;
                                    this.subtopic_search_dump[this.subtopic_problem_count] = prob;
                                    if (!('' + this.subtopic_search_dump[this.subtopic_problem_count].Number).includes('-')) {
                                        this.subtopic_search_dump[this.subtopic_problem_count].Number = ex + '-' + '' + this.subtopic_search_dump[this.subtopic_problem_count].Number;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            Object.entries(this.subtopic_search_dump).sort(([, valueA], [, valueB]) => (this.authService.getStudProbSubmission2(id, valueA.Number)).timestamp - (this.authService.getStudProbSubmission2(id, valueB.Number)).timestamp);
            console.log(this.subtopic_search_dump);
            this.subtopic_streak_count = 0;
            var streak = true;
            var nums: string[] = [];
            var subs: any[] = [];
            for (let i = 1; i <= Object.keys(this.subtopic_search_dump).length; i++) {
                nums.push(this.subtopic_search_dump[Object.keys(this.subtopic_search_dump)[Object.keys(this.subtopic_search_dump).length - i] as any].Number);
                subs.push(this.authService.getStudExamSubmission2(id, this.subtopic_search_dump[Object.keys(this.subtopic_search_dump)[Object.keys(this.subtopic_search_dump).length - i] as any].Number.substring(0, (this.subtopic_search_dump[Object.keys(this.subtopic_search_dump)[Object.keys(this.subtopic_search_dump).length - i] as any].Number).indexOf('-'))));
            }
            console.log(nums);
            console.log(subs);
            setTimeout(() => {
                for (let i = 1; i <= subs.length; i++) {
                    this.subtopic_submission.push(subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)]);
                    if (streak && ((subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct.length == 1 && subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct[0][0] == '✅') || (subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct.length > 1 && this.is_MP_correct(subs[i - 1].problems[+nums[i - 1].substring(nums[i - 1].indexOf('-') + 1)].Correct)))) {
                        this.subtopic_streak_count += 1;
                    }
                    else {
                        streak = false;
                        this.subtopic_streak_count = 0;
                    }
                }
            }, 100);
            for (const [ex, dump] of Object.entries(this.e_dump_dict)) {
                if (!Object.keys(exam_history).includes(ex) || (exam_history[ex] as any).status != "Completed") {
                    for (const [num, prob] of Object.entries(dump)) {
                        if (typeof prob.SubTopics != 'undefined' && !this.exam_attribute_dump[ex].HideTopics) {
                            if (prob.SubTopics.includes(this.selected_subtopic)) {
                                if (prob.Topics[prob.SubTopics.indexOf(this.selected_subtopic)].includes(this.selected_topic)) {
                                    this.subtopic_problem_count += 1;
                                    this.subtopic_search_dump[this.subtopic_problem_count] = prob;
                                    if (!('' + this.subtopic_search_dump[this.subtopic_problem_count].Number).includes('-')) {
                                        this.subtopic_search_dump[this.subtopic_problem_count].Number = ex + '-' + '' + this.subtopic_search_dump[this.subtopic_problem_count].Number;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            this.subtopic_new_problem_count = 0;
            this.subtopic_correct_problem_count = 0;
            for (const [ex, dump] of Object.entries(this.e_dump_dict)) {
                if (!Object.keys(exam_history).includes(ex) || (exam_history[ex] as any).status != "Completed") {
                    for (const [num, prob] of Object.entries(dump)) {
                        if (typeof prob.SubTopics != 'undefined' && !this.exam_attribute_dump[ex].HideTopics) {
                            if (prob.SubTopics.includes(this.selected_subtopic)) {
                                if (prob.Topics[prob.SubTopics.indexOf(this.selected_subtopic)].includes(this.selected_topic)) {
                                    this.subtopic_new_problem_count += 1;
                                }
                            }
                        }
                    }
                }
                if (Object.keys(exam_history).includes(ex) && (exam_history[ex] as any).status == "Completed") {
                    const exam_sub = this.authService.getStudExamSubmission2(id, ex);
                    setTimeout(() => {
                        for (const [num, prob] of Object.entries(dump)) {
                            if (typeof prob.SubTopics != 'undefined' && !this.exam_attribute_dump[ex].HideTopics) {
                                if (prob.SubTopics.includes(this.selected_subtopic)) {
                                    if (prob.Topics[prob.SubTopics.indexOf(this.selected_subtopic)].includes(this.selected_topic)) {
                                        if (((exam_sub.problems as any)[num].Correct.length == 1 && (exam_sub.problems as any)[num].Correct[0][0] == '✅') || ((exam_sub.problems as any)[num].Correct.length > 1 && this.is_MP_correct((exam_sub.problems as any)[num].Correct))) {
                                            this.subtopic_correct_problem_count += 1;
                                        }
                                    }
                                }
                            }
                        }
                    }, 100);
                }
            }
            console.log(this.subtopic_search_dump);
            setTimeout(() => {
                this.selected_student_st = id;
            }, 250);
        }
        else {
            this.selected_student_st = '';
        }
    }

    subtopic_correct_percent() {
      return (Math.round(100 * this.subtopic_correct_problem_count / (this.subtopic_problem_count - this.subtopic_new_problem_count)));
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

    set_user_role(role: string) {
        if (this.user_role != role) {
            this.user_role = role;
        }
        else {
            this.user_role = "";
        }
    }

    set_login_method(mthd: string) {
        if (this.login_method != mthd) {
            this.login_method = mthd;
        }
        else {
            this.login_method = "";
        }
        setTimeout(() => {
            this.iti = intlTelInput(this.userPhone.nativeElement, {
                allowDropdown: true,
                autoPlaceholder: "aggressive",
                placeholderNumberType: "FIXED_LINE_OR_MOBILE",
                nationalMode: true,
                formatOnDisplay: true,
                initialCountry: 'auto',
                geoIpLookup: callback => {
                    fetch("https://ipapi.co/json")
                        .then(res => res.json())
                        .then(data => callback(data.country_code))
                        .catch(() => callback("us"));
                },
                utilsScript: "node_modules/intl-tel-input/build/js/utils.js",
                // onlyCountries: ['JP'],
                separateDialCode: true,
            });
        }, 10);
    }

    toggle_login_method(mthd: string) {
        if (this.login_method != mthd) {
            this.login_method = mthd;
        }
        else {
            this.login_method = "";
        }
        if (this.login_method == 'phone') {
            setTimeout(() => {
                this.iti = intlTelInput(this.userPhone.nativeElement, {
                    allowDropdown: true,
                    autoPlaceholder: "aggressive",
                    placeholderNumberType: "FIXED_LINE_OR_MOBILE",
                    nationalMode: true,
                    formatOnDisplay: true,
                    initialCountry: 'auto',
                    geoIpLookup: callback => {
                        fetch("https://ipapi.co/json")
                            .then(res => res.json())
                            .then(data => callback(data.country_code))
                            .catch(() => callback("us"));
                    },
                    utilsScript: "node_modules/intl-tel-input/build/js/utils.js",
                    // onlyCountries: ['JP'],
                    separateDialCode: true,
                });
            }, 25);
        }
    }

    reset_password() {
        this.pw_reset = true;
    }

    sendLoginCode(phone: string) {
        // const appVerifier = this.windowRef.recaptchaVerifier;
        // const num = `+${phone}`;
        const appVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            // 'callback': (response) => {
            //   // reCAPTCHA solved, allow signInWithPhoneNumber.
            //   // onSignInSubmit();
            // }
        }, getAuth());
        const intlPhone = '+' + "" + this.iti.getSelectedCountryData().dialCode + phone;
        if (phone != '') {
            this.afAuth
                .signInWithPhoneNumber(intlPhone, appVerifier)
                .then(result => {
                    this.windowRef.confirmationResult = result;
                    console.log(result);
                })
                .catch((error: any) => window.alert(error.message));
        } else {
            this.iti_msg = "Please enter a valid number below";
            window.alert(this.iti_msg);
        }
    }

    verifyLoginCodeL(code: string) {
        this.windowRef.confirmationResult
            .confirm(code)
            .then((result: any) => {
                this.user = result.user;
                // check if user in database, write user data
                this.authService.userData = this.user;
                // this.login = false;
                console.log(result);
                this.onLogIn();
            })
            .catch((error: any) => console.log(error, 'Incorrect code entered?'));
        // get(child(ref(getDatabase()), '/users/' + this.user.uid)).then((snapshot) => {
        //   if (snapshot.exists()) {
        //     console.log(snapshot.val());
        //     this.authService.userData = snapshot.val();
        //   } else {
        //     console.log("No data available");
        //     this.authService.WriteUserData(this.user, "");
        //     this.authService.SetUserData(this.user);
        //   }
        // }).catch((error) => {
        //   console.error(error);
        // });
    }

    verifyLoginCodeS(phone: string, code: string, role: string) {
        const appVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            // 'callback': (response) => {
            //   // reCAPTCHA solved, allow signInWithPhoneNumber.
            //   // onSignInSubmit();
            // }
        }, getAuth());
        this.windowRef.confirmationResult
            .confirm(code)
            .then((result: any) => {
                this.user = result.user;
                // check if user in database, write user data
                // this.authService.userData = this.user;
                this.authService.WriteUserData(this.user, role);
                this.authService.SetUserData(this.user);
                this.signup = false;
                // console.log(this.user);
                // console.log(result);
            })
            .catch((error: any) => window.alert(error));
        // get(child(ref(getDatabase()), '/users/' + this.user.uid)).then((snapshot) => {
        //   if (snapshot.exists()) {
        //     console.log(snapshot.val());
        //     this.authService.userData = snapshot.val();
        //   } else {
        //     console.log("No data available");
        //     this.authService.WriteUserData(this.user, this.user_role);
        //     this.authService.SetUserData(this.user);
        //   }
        // }).catch((error) => {
        //   console.error(error);
        // });
    }

    onLogIn() {
        setTimeout(() => {
            this.login = true;
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
                setTimeout(() => {
                    this.my_students = [];
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
                }, 500);
            }
            this.login = false;
        }, 500);
    }

    onOtpChange(otpCode: any) {
        this.otp = otpCode;
    }

    ngAfterViewInit() {

    }

    ngOnInit() {
        this.exam_dump = this.test_exam_dump;
        this.exam_state = this.exam_attribute_dump[this.key].State;
        this.exam_grade = this.exam_attribute_dump[this.key].Grade;
        this.exam_name = this.exam_attribute_dump[this.key].ExamName;
        this.exam_type = this.exam_attribute_dump[this.key].ExamType;
        this.exam_year = this.exam_attribute_dump[this.key].ExamYear;
        this.exam_subject = this.exam_attribute_dump[this.key].Subject;
        if (Object.keys(this.exam_dump[this.problem_number].Parts).length == 0) {
            this.problem_attempts = [0];
            this.attempt_path = [[]];
            this.attempt_response = [''];
            this.attempt_explanation = [[]];
            this.m_selection = [["", ""]];
            this.m_submission = [{}];
            this.c_submission = [{}];
            if (['MC', 'FR', 'SR', 'MR', 'LR', 'IMC', 'LP', 'GP'].includes(this.exam_dump[this.problem_number].Type)) {
                this.problem_selection = [['']];
                if (['GP'].includes(this.exam_dump[this.problem_number].Type)) {
                    setTimeout(() => {
                        this.plot_graph_gp('', false);
                    }, 500);
                }
            }
            else if (['MS', 'O', 'C', 'G', 'IM', 'IMS', 'MGP'].includes(this.exam_dump[this.problem_number].Type)) {
                this.problem_selection = [[]];
                if (['O', 'C', 'G'].includes(this.exam_dump[this.problem_number].Type)) {
                    this.unique_m(this.exam_dump[this.problem_number].AnswerChoices, '');
                }
                if (['MGP'].includes(this.exam_dump[this.problem_number].Type)) {
                    setTimeout(() => {
                        this.plot_graph_mgp('', false);
                    }, 500);
                }
            }
            else if (['MFR', 'IDD', 'T'].includes(this.exam_dump[this.problem_number].Type)) {
                var msp_nums: string[] = [];
                this.problem_selection.push([]);
                for (let choice of Object.keys(this.exam_dump[this.problem_number].AnswerChoices)) {
                    if (choice.length > 1 && choice[1] == ':' && !msp_nums.includes(choice[0])) {
                        this.problem_selection[0].push('');
                        msp_nums.push(choice[0]);
                    }
                }
            }
        }
        else {
            this.problem_attempts = [];
            for (let part of Object.keys(this.exam_dump[this.problem_number].Parts)) {
                this.problem_attempts.push(0);
                this.attempt_path.push([]);
                this.attempt_response.push('');
                this.attempt_explanation.push([]);
                this.m_selection.push(["", ""]);
                this.m_submission.push({});
                this.c_submission.push({});
                if (['MC', 'FR', 'SR', 'MR', 'LR', 'IMC', 'LP', 'GP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                    this.problem_selection.push(['']);
                    if (['GP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                        setTimeout(() => {
                            this.plot_graph_gp(part, false);
                        }, 500);
                    }
                }
                else if (['MS', 'O', 'C', 'G', 'IM', 'IMS', 'MGP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                    this.problem_selection.push([]);
                    if (['O', 'C', 'G'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                        this.unique_m(this.exam_dump[this.problem_number].Parts[part].AnswerChoices, part);
                    }
                    if (['MGP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                        setTimeout(() => {
                            this.plot_graph_mgp(part, false);
                        }, 500);
                    }
                }
                else if (['MFR', 'IDD', 'T'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
                    var msp_nums: string[] = [];
                    this.problem_selection.push([]);
                    for (let choice of Object.keys(this.exam_dump[this.problem_number].Parts[part].AnswerChoices)) {
                        if (choice.length > 1 && choice[1] == ':' && !msp_nums.includes(choice[0])) {
                            this.problem_selection[Object.keys(this.exam_dump[this.problem_number].Parts).indexOf(part)].push('');
                            msp_nums.push(choice[0]);
                        }
                    }
                }
            }
        }
        console.log(this.problem_selection);
        for (let supp of this.exam_dump[this.problem_number].SuppContent) {
            setTimeout(() => {
                this.read_supp_json(supp);
            }, 100 * (1 + this.exam_dump[this.problem_number].SuppContent.indexOf(supp)));
        }
        if (this.exam_dump[this.problem_number].Type == 'MP') {
            for (let part of Object.keys(this.exam_dump[this.problem_number].Parts)) {
                for (let block of this.exam_dump[this.problem_number].Parts[part].Content) {
                    if (block.startsWith(':table:')) {
                        setTimeout(() => {
                            this.read_table(block.slice(7));
                        }, 100);
                    }
                }
            }
        }
        if (this.exam_dump[this.problem_number].Type != 'MP') {
            for (let block of this.exam_dump[this.problem_number].Content) {
                if (block.startsWith(':table:')) {
                    setTimeout(() => {
                        this.read_table(block.slice(7));
                    }, 100);
                }
            }
        }
        if (this.authService.userData) {
            this.authService.getProfilePic(this.authService.userData);
            this.user_data = this.authService.userData;
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
                setTimeout(() => {
                    this.my_students = [];
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
                }, 500);
            }
            // if (this.authService.userData.role == 'Student') {
            //   const exam_history = this.authService.userData.exams.history;
            //   for (const [key, det] of Object.entries(exam_history)) {
            //     if (["Started", "Assigned"].includes((det as any).status) && key == this.key) {
            //       this.exam_inprogress = true;
            //       this.exam_status = (det as any).status;
            //       this.progress_number = (det as any).progress + 1;
            //       this.last_date = new Date((det as any).lasttimestamp).toLocaleDateString();
            //       this.last_time = new Date((det as any).lasttimestamp).toLocaleTimeString()
            //       if ((det as any).progress != 0) {
            //         var db_submission = this.authService.getExamSubmission2(this.key);
            //         setTimeout(() => {
            //           console.log(db_submission.problems);
            //           for (const [key2, det2] of Object.entries(db_submission.problems)) {
            //             if (+key2 != 0) {
            //               this.exam_submission[+(det2 as any).Number] = (det2 as any);
            //               // const sub_prob: any = (det2 as any);
            //               // var sub_prob_2: any = {};
            //               // for (const [field, dump] of Object.entries(det2 as any)) {
            //               //   // sub_prob[field] = dump;
            //               //   sub_prob_2[field] = dump;
            //               // }
            //               // if (typeof (det2 as any).Choice == "string") {
            //               //   sub_prob_2.Choice = [];
            //               //   sub_prob_2.Correct = [];
            //               //   sub_prob_2.Attempts = [];
            //               //   sub_prob_2.Path = [];
            //               //   sub_prob_2.Choice.push([sub_prob.Choice]);
            //               //   sub_prob_2.Correct.push([sub_prob.Correct]);
            //               //   sub_prob_2.Attempts.push(sub_prob.Attempts);
            //               //   sub_prob_2.Path.push([[sub_prob.Path]]);
            //               // }
            //               // this.exam_submission[+(det2 as any).Number] = sub_prob_2;
            //             }
            //           }
            //         }, 500);
            //       }
            //       console.log(this.exam_submission);
            //     }
            //   }
            // }
        }
        this.toggleProblemTimer();
    }
}