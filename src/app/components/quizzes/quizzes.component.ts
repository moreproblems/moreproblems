import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from "../../shared/services/auth.service";
import { serverTimestamp } from "firebase/database";
import * as Plotly from 'plotly.js-dist-min';
import * as examMetadata from "src/assets/problems/exams.json";
import * as stateMetadata from "src/assets/standards/states.json";
import * as standardMetadata from "src/assets/standards/standards.json";
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
import * as KEStandards from "src/assets/standards/CC/K-E.json";
import * as KMStandards from "src/assets/standards/CC/K-M.json";
import * as G1EStandards from "src/assets/standards/CC/G1-E.json";
import * as G1MStandards from "src/assets/standards/CC/G1-M.json";
import * as G2EStandards from "src/assets/standards/CC/G2-E.json";
import * as G2MStandards from "src/assets/standards/CC/G2-M.json";
import * as G3EStandards from "src/assets/standards/CC/G3-E.json";
import * as G3MStandards from "src/assets/standards/CC/G3-M.json";
import * as G4EStandards from "src/assets/standards/CC/G4-E.json";
import * as G4MStandards from "src/assets/standards/CC/G4-M.json";
import * as G5EStandards from "src/assets/standards/CC/G5-E.json";
import * as G5MStandards from "src/assets/standards/CC/G5-M.json";
import * as G6EStandards from "src/assets/standards/CC/G6-E.json";
import * as G6MStandards from "src/assets/standards/CC/G6-M.json";
import * as G7EStandards from "src/assets/standards/CC/G7-E.json";
import * as G7MStandards from "src/assets/standards/CC/G7-M.json";
import * as G8EStandards from "src/assets/standards/CC/G8-E.json";
import * as G8MStandards from "src/assets/standards/CC/G8-M.json";
import * as HSE1Standards from "src/assets/standards/CC/HS-E1.json";
import * as HSE2Standards from "src/assets/standards/CC/HS-E2.json";
import * as HSMAStandards from "src/assets/standards/CC/HS-M-A.json";
import * as HSMFStandards from "src/assets/standards/CC/HS-M-F.json";
import * as HSMGStandards from "src/assets/standards/CC/HS-M-G.json";
import * as HSMMStandards from "src/assets/standards/CC/HS-M-M.json";
import * as HSMNStandards from "src/assets/standards/CC/HS-M-N.json";
import * as HSMSStandards from "src/assets/standards/CC/HS-M-S.json";
import * as COPEStandards from "src/assets/standards/CO/P-E.json";
import * as COPMStandards from "src/assets/standards/CO/P-M.json";
import * as COPSStandards from "src/assets/standards/CO/P-S.json";
import * as COPSSStandards from "src/assets/standards/CO/P-SS.json";
import * as COKEStandards from "src/assets/standards/CO/K-E.json";
import * as COKMStandards from "src/assets/standards/CO/K-M.json";
import * as COKSStandards from "src/assets/standards/CO/K-S.json";
import * as COKSSStandards from "src/assets/standards/CO/K-SS.json";
import * as COG1EStandards from "src/assets/standards/CO/G1-E.json";
import * as COG1MStandards from "src/assets/standards/CO/G1-M.json";
import * as COG1SStandards from "src/assets/standards/CO/G1-S.json";
import * as COG1SSStandards from "src/assets/standards/CO/G1-SS.json";
import * as COG2EStandards from "src/assets/standards/CO/G2-E.json";
import * as COG2MStandards from "src/assets/standards/CO/G2-M.json";
import * as COG2SStandards from "src/assets/standards/CO/G2-S.json";
import * as COG2SSStandards from "src/assets/standards/CO/G2-SS.json";
import * as COG3EStandards from "src/assets/standards/CO/G3-E.json";
import * as COG3MStandards from "src/assets/standards/CO/G3-M.json";
import * as COG3SStandards from "src/assets/standards/CO/G3-S.json";
import * as COG3SSStandards from "src/assets/standards/CO/G3-SS.json";
import * as COG4EStandards from "src/assets/standards/CO/G4-E.json";
import * as COG4MStandards from "src/assets/standards/CO/G4-M.json";
import * as COG4SStandards from "src/assets/standards/CO/G4-S.json";
import * as COG4SSStandards from "src/assets/standards/CO/G4-SS.json";
import * as COG5EStandards from "src/assets/standards/CO/G5-E.json";
import * as COG5MStandards from "src/assets/standards/CO/G5-M.json";
import * as COG5SStandards from "src/assets/standards/CO/G5-S.json";
import * as COG5SSStandards from "src/assets/standards/CO/G5-SS.json";
import * as COG6EStandards from "src/assets/standards/CO/G6-E.json";
import * as COG6MStandards from "src/assets/standards/CO/G6-M.json";
import * as COG6SSStandards from "src/assets/standards/CO/G6-SS.json";
import * as COG7EStandards from "src/assets/standards/CO/G7-E.json";
import * as COG7MStandards from "src/assets/standards/CO/G7-M.json";
import * as COG7SSStandards from "src/assets/standards/CO/G7-SS.json";
import * as COG8EStandards from "src/assets/standards/CO/G8-E.json";
import * as COG8MStandards from "src/assets/standards/CO/G8-M.json";
import * as COG8SSStandards from "src/assets/standards/CO/G8-SS.json";
import * as COMSSStandards from "src/assets/standards/CO/MS-S.json";
import * as COHSE1Standards from "src/assets/standards/CO/HS-E1.json";
import * as COHSE2Standards from "src/assets/standards/CO/HS-E2.json";
import * as COHSMStandards from "src/assets/standards/CO/HS-M.json";
import * as COHSSStandards from "src/assets/standards/CO/HS-S.json";
import * as COHSSSStandards from "src/assets/standards/CO/HS-SS.json";
import * as FLKEStandards from "src/assets/standards/FL/K-E.json";
import * as FLKMStandards from "src/assets/standards/FL/K-M.json";
import * as FLG1EStandards from "src/assets/standards/FL/G1-E.json";
import * as FLG1MStandards from "src/assets/standards/FL/G1-M.json";
import * as FLG2EStandards from "src/assets/standards/FL/G2-E.json";
import * as FLG2MStandards from "src/assets/standards/FL/G2-M.json";
import * as FLG3EStandards from "src/assets/standards/FL/G3-E.json";
import * as FLG3MStandards from "src/assets/standards/FL/G3-M.json";
import * as FLG4EStandards from "src/assets/standards/FL/G4-E.json";
import * as FLG4MStandards from "src/assets/standards/FL/G4-M.json";
import * as FLG5EStandards from "src/assets/standards/FL/G5-E.json";
import * as FLG5MStandards from "src/assets/standards/FL/G5-M.json";
import * as FLG6EStandards from "src/assets/standards/FL/G6-E.json";
import * as FLG6MStandards from "src/assets/standards/FL/G6-M.json";
import * as FLG7EStandards from "src/assets/standards/FL/G7-E.json";
import * as FLG7MStandards from "src/assets/standards/FL/G7-M.json";
import * as FLG8EStandards from "src/assets/standards/FL/G8-E.json";
import * as FLG8MStandards from "src/assets/standards/FL/G8-M.json";
import * as FLG9EStandards from "src/assets/standards/FL/G9-E.json";
import * as FLG10EStandards from "src/assets/standards/FL/G10-E.json";
import * as FLG11EStandards from "src/assets/standards/FL/G11-E.json";
import * as FLG12EStandards from "src/assets/standards/FL/G12-E.json";
import * as FLHSMStandards from "src/assets/standards/FL/HS-M.json";
import * as MAPEStandards from "src/assets/standards/MA/P-E.json";
import * as MAPMStandards from "src/assets/standards/MA/P-M.json";
import * as MAPSStandards from "src/assets/standards/MA/P-S.json";
import * as MAKEStandards from "src/assets/standards/MA/K-E.json";
import * as MAKMStandards from "src/assets/standards/MA/K-M.json";
import * as MAKSStandards from "src/assets/standards/MA/K-S.json";
import * as MAEESTStandards from "src/assets/standards/MA/EES-T.json";
import * as MAG1EStandards from "src/assets/standards/MA/G1-E.json";
import * as MAG1MStandards from "src/assets/standards/MA/G1-M.json";
import * as MAG1SStandards from "src/assets/standards/MA/G1-S.json";
import * as MAG2EStandards from "src/assets/standards/MA/G2-E.json";
import * as MAG2MStandards from "src/assets/standards/MA/G2-M.json";
import * as MAG2SStandards from "src/assets/standards/MA/G2-S.json";
import * as MAG3EStandards from "src/assets/standards/MA/G3-E.json";
import * as MAG3MStandards from "src/assets/standards/MA/G3-M.json";
import * as MAG3SStandards from "src/assets/standards/MA/G3-S.json";
import * as MAUESTStandards from "src/assets/standards/MA/UES-T.json";
import * as MAG4EStandards from "src/assets/standards/MA/G4-E.json";
import * as MAG4MStandards from "src/assets/standards/MA/G4-M.json";
import * as MAG4SStandards from "src/assets/standards/MA/G4-S.json";
import * as MAG5EStandards from "src/assets/standards/MA/G5-E.json";
import * as MAG5MStandards from "src/assets/standards/MA/G5-M.json";
import * as MAG5SStandards from "src/assets/standards/MA/G5-S.json";
import * as MAG6EStandards from "src/assets/standards/MA/G6-E.json";
import * as MAG6MStandards from "src/assets/standards/MA/G6-M.json";
import * as MAG6SStandards from "src/assets/standards/MA/G6-S.json";
import * as MAMSTStandards from "src/assets/standards/MA/MS-T.json";
import * as MAG7EStandards from "src/assets/standards/MA/G7-E.json";
import * as MAG7MStandards from "src/assets/standards/MA/G7-M.json";
import * as MAG7SStandards from "src/assets/standards/MA/G7-S.json";
import * as MAG8EStandards from "src/assets/standards/MA/G8-E.json";
import * as MAG8MStandards from "src/assets/standards/MA/G8-M.json";
import * as MAG8SStandards from "src/assets/standards/MA/G8-S.json";
import * as MAHSE1Standards from "src/assets/standards/MA/HS-E1.json";
import * as MAHSE2Standards from "src/assets/standards/MA/HS-E2.json";
import * as MAHSMAStandards from "src/assets/standards/MA/HS-M-A.json";
import * as MAHSMFStandards from "src/assets/standards/MA/HS-M-F.json";
import * as MAHSMGStandards from "src/assets/standards/MA/HS-M-G.json";
import * as MAHSMMStandards from "src/assets/standards/MA/HS-M-M.json";
import * as MAHSMNStandards from "src/assets/standards/MA/HS-M-N.json";
import * as MAHSMSStandards from "src/assets/standards/MA/HS-M-S.json";
import * as MAHSSBStandards from "src/assets/standards/MA/HS-S-B.json";
import * as MAHSSCStandards from "src/assets/standards/MA/HS-S-C.json";
import * as MAHSSPStandards from "src/assets/standards/MA/HS-S-P.json";
import * as MAHSSESStandards from "src/assets/standards/MA/HS-S-ES.json";
import * as MAHSSTSStandards from "src/assets/standards/MA/HS-S-TS.json";
import * as MAHSTStandards from "src/assets/standards/MA/HS-T.json";
import * as MDPEStandards from "src/assets/standards/MD/P-E.json";
import * as MDPMStandards from "src/assets/standards/MD/P-M.json";
import * as MDKEStandards from "src/assets/standards/MD/K-E.json";
import * as MDKMStandards from "src/assets/standards/MD/K-M.json";
import * as MDG1EStandards from "src/assets/standards/MD/G1-E.json";
import * as MDG1MStandards from "src/assets/standards/MD/G1-M.json";
import * as MDG2EStandards from "src/assets/standards/MD/G2-E.json";
import * as MDG2MStandards from "src/assets/standards/MD/G2-M.json";
import * as MDG3EStandards from "src/assets/standards/MD/G3-E.json";
import * as MDG3MStandards from "src/assets/standards/MD/G3-M.json";
import * as MDG4EStandards from "src/assets/standards/MD/G4-E.json";
import * as MDG4MStandards from "src/assets/standards/MD/G4-M.json";
import * as MDG5EStandards from "src/assets/standards/MD/G5-E.json";
import * as MDG5MStandards from "src/assets/standards/MD/G5-M.json";
import * as MDG6EStandards from "src/assets/standards/MD/G6-E.json";
import * as MDG6MStandards from "src/assets/standards/MD/G6-M.json";
import * as MDG7EStandards from "src/assets/standards/MD/G7-E.json";
import * as MDG7MStandards from "src/assets/standards/MD/G7-M.json";
import * as MDG8EStandards from "src/assets/standards/MD/G8-E.json";
import * as MDG8MStandards from "src/assets/standards/MD/G8-M.json";
import * as MDHSE1Standards from "src/assets/standards/MD/HS-E1.json";
import * as MDHSE2Standards from "src/assets/standards/MD/HS-E2.json";
import * as MDHSMA1Standards from "src/assets/standards/MD/HS-M-A1.json";
import * as MDHSMA2Standards from "src/assets/standards/MD/HS-M-A2.json";
import * as MDHSMGStandards from "src/assets/standards/MD/HS-M-G.json";
import * as MDHSMSStandards from "src/assets/standards/MD/HS-M-S.json";
import * as MSKEStandards from "src/assets/standards/MS/K-E.json";
import * as MSKMStandards from "src/assets/standards/MS/K-M.json";
import * as MSG1EStandards from "src/assets/standards/MS/G1-E.json";
import * as MSG1MStandards from "src/assets/standards/MS/G1-M.json";
import * as MSG2EStandards from "src/assets/standards/MS/G2-E.json";
import * as MSG2MStandards from "src/assets/standards/MS/G2-M.json";
import * as MSG3EStandards from "src/assets/standards/MS/G3-E.json";
import * as MSG3MStandards from "src/assets/standards/MS/G3-M.json";
import * as MSG4EStandards from "src/assets/standards/MS/G4-E.json";
import * as MSG4MStandards from "src/assets/standards/MS/G4-M.json";
import * as MSG5EStandards from "src/assets/standards/MS/G5-E.json";
import * as MSG5MStandards from "src/assets/standards/MS/G5-M.json";
import * as MSG6EStandards from "src/assets/standards/MS/G6-E.json";
import * as MSG6MStandards from "src/assets/standards/MS/G6-M.json";
import * as MSG7EStandards from "src/assets/standards/MS/G7-E.json";
import * as MSG7MStandards from "src/assets/standards/MS/G7-M.json";
import * as MSG8EStandards from "src/assets/standards/MS/G8-E.json";
import * as MSG8MStandards from "src/assets/standards/MS/G8-M.json";
import * as NGKSStandards from "src/assets/standards/NG/K-S.json";
import * as NGG1SStandards from "src/assets/standards/NG/G1-S.json";
import * as NGG2SStandards from "src/assets/standards/NG/G2-S.json";
import * as NGG3SStandards from "src/assets/standards/NG/G3-S.json";
import * as NGG4SStandards from "src/assets/standards/NG/G4-S.json";
import * as NGG5SStandards from "src/assets/standards/NG/G5-S.json";
import * as NGMSSStandards from "src/assets/standards/NG/MS-S.json";
import * as NGHSSStandards from "src/assets/standards/NG/HS-S.json";
import * as NJKEStandards from "src/assets/standards/NJ/K-E.json";
import * as NJKMStandards from "src/assets/standards/NJ/K-M.json";
import * as NJKSStandards from "src/assets/standards/NJ/K-S.json";
import * as NJG1EStandards from "src/assets/standards/NJ/G1-E.json";
import * as NJG1MStandards from "src/assets/standards/NJ/G1-M.json";
import * as NJG1SStandards from "src/assets/standards/NJ/G1-S.json";
import * as NJG2EStandards from "src/assets/standards/NJ/G2-E.json";
import * as NJG2MStandards from "src/assets/standards/NJ/G2-M.json";
import * as NJG2SStandards from "src/assets/standards/NJ/G2-S.json";
import * as NJG3EStandards from "src/assets/standards/NJ/G3-E.json";
import * as NJG3MStandards from "src/assets/standards/NJ/G3-M.json";
import * as NJG3SStandards from "src/assets/standards/NJ/G3-S.json";
import * as NJG4EStandards from "src/assets/standards/NJ/G4-E.json";
import * as NJG4MStandards from "src/assets/standards/NJ/G4-M.json";
import * as NJG4SStandards from "src/assets/standards/NJ/G4-S.json";
import * as NJG5EStandards from "src/assets/standards/NJ/G5-E.json";
import * as NJG5MStandards from "src/assets/standards/NJ/G5-M.json";
import * as NJG5SStandards from "src/assets/standards/NJ/G5-S.json";
import * as NJG6EStandards from "src/assets/standards/NJ/G6-E.json";
import * as NJG6MStandards from "src/assets/standards/NJ/G6-M.json";
import * as NJG7EStandards from "src/assets/standards/NJ/G7-E.json";
import * as NJG7MStandards from "src/assets/standards/NJ/G7-M.json";
import * as NJG8EStandards from "src/assets/standards/NJ/G8-E.json";
import * as NJG8MStandards from "src/assets/standards/NJ/G8-M.json";
import * as NJMSSStandards from "src/assets/standards/NJ/MS-S.json";
import * as NYPEStandards from "src/assets/standards/NY/P-E.json";
import * as NYPMStandards from "src/assets/standards/NY/P-M.json";
import * as NYKEStandards from "src/assets/standards/NY/K-E.json";
import * as NYKMStandards from "src/assets/standards/NY/K-M.json";
import * as NYG1EStandards from "src/assets/standards/NY/G1-E.json";
import * as NYG1MStandards from "src/assets/standards/NY/G1-M.json";
import * as NYG2EStandards from "src/assets/standards/NY/G2-E.json";
import * as NYG2MStandards from "src/assets/standards/NY/G2-M.json";
import * as NYG3EStandards from "src/assets/standards/NY/G3-E.json";
import * as NYG3MStandards from "src/assets/standards/NY/G3-M.json";
import * as NYG4EStandards from "src/assets/standards/NY/G4-E.json";
import * as NYG4MStandards from "src/assets/standards/NY/G4-M.json";
import * as NYG5EStandards from "src/assets/standards/NY/G5-E.json";
import * as NYG5MStandards from "src/assets/standards/NY/G5-M.json";
import * as NYG6EStandards from "src/assets/standards/NY/G6-E.json";
import * as NYG6MStandards from "src/assets/standards/NY/G6-M.json";
import * as NYG7EStandards from "src/assets/standards/NY/G7-E.json";
import * as NYG7MStandards from "src/assets/standards/NY/G7-M.json";
import * as NYG8EStandards from "src/assets/standards/NY/G8-E.json";
import * as NYG8MStandards from "src/assets/standards/NY/G8-M.json";
import * as NYHSMA1Standards from "src/assets/standards/NY/HS-M-A1.json";
import * as NYHSMA2Standards from "src/assets/standards/NY/HS-M-A2.json";
import * as NYHSE1Standards from "src/assets/standards/NY/HS-E1.json";
import * as NYHSE2Standards from "src/assets/standards/NY/HS-E2.json";
import * as NYHSMGStandards from "src/assets/standards/NY/HS-M-G.json";
import * as PAG3EStandards from "src/assets/standards/PA/G3-E.json";
import * as PAG3MStandards from "src/assets/standards/PA/G3-M.json";
import * as PAG4EStandards from "src/assets/standards/PA/G4-E.json";
import * as PAG4MStandards from "src/assets/standards/PA/G4-M.json";
import * as PAG4SStandards from "src/assets/standards/PA/G4-S.json";
import * as PAG5EStandards from "src/assets/standards/PA/G5-E.json";
import * as PAG5MStandards from "src/assets/standards/PA/G5-M.json";
import * as PAG6EStandards from "src/assets/standards/PA/G6-E.json";
import * as PAG6MStandards from "src/assets/standards/PA/G6-M.json";
import * as PAG7EStandards from "src/assets/standards/PA/G7-E.json";
import * as PAG7MStandards from "src/assets/standards/PA/G7-M.json";
import * as PAG8EStandards from "src/assets/standards/PA/G8-E.json";
import * as PAG8MStandards from "src/assets/standards/PA/G8-M.json";
import * as PAG8SStandards from "src/assets/standards/PA/G8-S.json";
import * as RIKEStandards from "src/assets/standards/RI/K-E.json";
import * as RIKMStandards from "src/assets/standards/RI/K-M.json";
import * as RIG1EStandards from "src/assets/standards/RI/G1-E.json";
import * as RIG1MStandards from "src/assets/standards/RI/G1-M.json";
import * as RIG2EStandards from "src/assets/standards/RI/G2-E.json";
import * as RIG2MStandards from "src/assets/standards/RI/G2-M.json";
import * as RIG3EStandards from "src/assets/standards/RI/G3-E.json";
import * as RIG3MStandards from "src/assets/standards/RI/G3-M.json";
import * as RIG4EStandards from "src/assets/standards/RI/G4-E.json";
import * as RIG4MStandards from "src/assets/standards/RI/G4-M.json";
import * as RIG5EStandards from "src/assets/standards/RI/G5-E.json";
import * as RIG5MStandards from "src/assets/standards/RI/G5-M.json";
import * as RIG6EStandards from "src/assets/standards/RI/G6-E.json";
import * as RIG6MStandards from "src/assets/standards/RI/G6-M.json";
import * as RIG7EStandards from "src/assets/standards/RI/G7-E.json";
import * as RIG7MStandards from "src/assets/standards/RI/G7-M.json";
import * as RIG8EStandards from "src/assets/standards/RI/G8-E.json";
import * as RIG8MStandards from "src/assets/standards/RI/G8-M.json";
import * as RIHSE1Standards from "src/assets/standards/RI/HS-E1.json";
import * as RIHSE2Standards from "src/assets/standards/RI/HS-E2.json";
import * as RIHSMAStandards from "src/assets/standards/RI/HS-M-A.json";
import * as RIHSMFStandards from "src/assets/standards/RI/HS-M-F.json";
import * as RIHSMGStandards from "src/assets/standards/RI/HS-M-G.json";
import * as RIHSMMStandards from "src/assets/standards/RI/HS-M-M.json";
import * as RIHSMNStandards from "src/assets/standards/RI/HS-M-N.json";
import * as RIHSMSStandards from "src/assets/standards/RI/HS-M-S.json";
import * as SCKEStandards from "src/assets/standards/SC/K-E.json";
import * as SCKMStandards from "src/assets/standards/SC/K-M.json";
import * as SCKSStandards from "src/assets/standards/SC/K-S.json";
import * as SCG1EStandards from "src/assets/standards/SC/G1-E.json";
import * as SCG1MStandards from "src/assets/standards/SC/G1-M.json";
import * as SCG1SStandards from "src/assets/standards/SC/G1-S.json";
import * as SCG2EStandards from "src/assets/standards/SC/G2-E.json";
import * as SCG2MStandards from "src/assets/standards/SC/G2-M.json";
import * as SCG2SStandards from "src/assets/standards/SC/G2-S.json";
import * as SCG3EStandards from "src/assets/standards/SC/G3-E.json";
import * as SCG3MStandards from "src/assets/standards/SC/G3-M.json";
import * as SCG3SStandards from "src/assets/standards/SC/G3-S.json";
import * as SCG4EStandards from "src/assets/standards/SC/G4-E.json";
import * as SCG4MStandards from "src/assets/standards/SC/G4-M.json";
import * as SCG4SStandards from "src/assets/standards/SC/G4-S.json";
import * as SCG5EStandards from "src/assets/standards/SC/G5-E.json";
import * as SCG5MStandards from "src/assets/standards/SC/G5-M.json";
import * as SCG5SStandards from "src/assets/standards/SC/G5-S.json";
import * as SCG6EStandards from "src/assets/standards/SC/G6-E.json";
import * as SCG6MStandards from "src/assets/standards/SC/G6-M.json";
import * as SCG6SStandards from "src/assets/standards/SC/G6-S.json";
import * as SCG7EStandards from "src/assets/standards/SC/G7-E.json";
import * as SCG7MStandards from "src/assets/standards/SC/G7-M.json";
import * as SCG7SStandards from "src/assets/standards/SC/G7-S.json";
import * as SCG8EStandards from "src/assets/standards/SC/G8-E.json";
import * as SCG8MStandards from "src/assets/standards/SC/G8-M.json";
import * as SCG8SStandards from "src/assets/standards/SC/G8-S.json";
import * as TNKEStandards from "src/assets/standards/TN/K-E.json";
import * as TNKMStandards from "src/assets/standards/TN/K-M.json";
import * as TNKSStandards from "src/assets/standards/TN/K-S.json";
import * as TNG1EStandards from "src/assets/standards/TN/G1-E.json";
import * as TNG1MStandards from "src/assets/standards/TN/G1-M.json";
import * as TNG1SStandards from "src/assets/standards/TN/G1-S.json";
import * as TNG2EStandards from "src/assets/standards/TN/G2-E.json";
import * as TNG2MStandards from "src/assets/standards/TN/G2-M.json";
import * as TNG2SStandards from "src/assets/standards/TN/G2-S.json";
import * as TNG3EStandards from "src/assets/standards/TN/G3-E.json";
import * as TNG3MStandards from "src/assets/standards/TN/G3-M.json";
import * as TNG3SStandards from "src/assets/standards/TN/G3-S.json";
import * as TNG4EStandards from "src/assets/standards/TN/G4-E.json";
import * as TNG4MStandards from "src/assets/standards/TN/G4-M.json";
import * as TNG4SStandards from "src/assets/standards/TN/G4-S.json";
import * as TNG5EStandards from "src/assets/standards/TN/G5-E.json";
import * as TNG5MStandards from "src/assets/standards/TN/G5-M.json";
import * as TNG5SStandards from "src/assets/standards/TN/G5-S.json";
import * as TNG6EStandards from "src/assets/standards/TN/G6-E.json";
import * as TNG6MStandards from "src/assets/standards/TN/G6-M.json";
import * as TNG6SStandards from "src/assets/standards/TN/G6-S.json";
import * as TNG7EStandards from "src/assets/standards/TN/G7-E.json";
import * as TNG7MStandards from "src/assets/standards/TN/G7-M.json";
import * as TNG7SStandards from "src/assets/standards/TN/G7-S.json";
import * as TNG8EStandards from "src/assets/standards/TN/G8-E.json";
import * as TNG8MStandards from "src/assets/standards/TN/G8-M.json";
import * as TNG8SStandards from "src/assets/standards/TN/G8-S.json";
import * as TNHSMA1Standards from "src/assets/standards/TN/HS-M-A1.json";
import * as TNHSMA2Standards from "src/assets/standards/TN/HS-M-A2.json";
import * as TNHSSB1Standards from "src/assets/standards/TN/HS-S-B1.json";
import * as TNHSE1Standards from "src/assets/standards/TN/HS-E1.json";
import * as TNHSE2Standards from "src/assets/standards/TN/HS-E2.json";
import * as TNHSMGStandards from "src/assets/standards/TN/HS-M-G.json";
import * as TXKRStandards from "src/assets/standards/TX/K-R.json";
import * as TXKMStandards from "src/assets/standards/TX/K-M.json";
import * as TXG1RStandards from "src/assets/standards/TX/G1-R.json";
import * as TXG1MStandards from "src/assets/standards/TX/G1-M.json";
import * as TXG2RStandards from "src/assets/standards/TX/G2-R.json";
import * as TXG2MStandards from "src/assets/standards/TX/G2-M.json";
import * as TXG3RStandards from "src/assets/standards/TX/G3-R.json";
import * as TXG3MStandards from "src/assets/standards/TX/G3-M.json";
import * as TXG4RStandards from "src/assets/standards/TX/G4-R.json";
import * as TXG4MStandards from "src/assets/standards/TX/G4-M.json";
import * as TXG5RStandards from "src/assets/standards/TX/G5-R.json";
import * as TXG5MStandards from "src/assets/standards/TX/G5-M.json";
import * as TXG6RStandards from "src/assets/standards/TX/G6-R.json";
import * as TXG6MStandards from "src/assets/standards/TX/G6-M.json";
import * as TXG7RStandards from "src/assets/standards/TX/G7-R.json";
import * as TXG7MStandards from "src/assets/standards/TX/G7-M.json";
import * as TXG8RStandards from "src/assets/standards/TX/G8-R.json";
import * as TXG8MStandards from "src/assets/standards/TX/G8-M.json";
import * as TXHSE1Standards from "src/assets/standards/TX/HS-E1.json";
import * as TXHSE2Standards from "src/assets/standards/TX/HS-E2.json";
import * as TXHSE3Standards from "src/assets/standards/TX/HS-E3.json";
import * as TXHSE4Standards from "src/assets/standards/TX/HS-E4.json";
import * as TXHSMAStandards from "src/assets/standards/TX/HS-M-A1.json";
import * as TXHSMA2Standards from "src/assets/standards/TX/HS-M-A2.json";
import * as TXHSMGStandards from "src/assets/standards/TX/HS-M-G.json";
import * as TXHSMPStandards from "src/assets/standards/TX/HS-M-P.json";
import * as TXHSMSStandards from "src/assets/standards/TX/HS-M-S.json";
import * as SATMStandards from "src/assets/standards/SAT/SAT-M.json";
import * as SATRWStandards from "src/assets/standards/SAT/SAT-RW.json";

import { partition } from 'rxjs/operators';
import { kMaxLength } from 'buffer';

const confetti = require('canvas-confetti');

const confettiCanvas = document.getElementById('confetticanvas');
const confettiHandler = confetti.create(confettiCanvas, {
  resize: true,
  useWorker: true,
});

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})

@Injectable()
export class QuizzesComponent implements OnInit {
  title = 'More Problems';

  screenWidth = window.innerWidth;
  mobileWidth = 1000;
  blank = " ";

  user_data: any = {};
  data_loaded = false;

  expand_filters = true;
  topics: string[] = [];
  subtopics: string[] = [];
  topics_count: { [key: string]: number } = {};
  subtopics_count: { [key: string]: number } = {};
  state_filters: string[] = [];
  grade_filters: string[] = [];
  subject_filters: string[] = [];
  topic_filters: string[] = [];
  // sub_topic = false;
  expand_refsheet = false;
  expand_supp = true;
  expand_overview = true;
  expand_topics = true;
  show_correct = false;
  mode = 'assess';
  length_mode = 'number';
  quiz_name = '';

  selected_curriculum: string = '';
  selected_grade: string = '';
  selected_subject: string = '';
  selected_topic = "";
  state_grades: string[] = [];
  state_subjects: string[] = [];
  subject_exams: string[] = [];
  standards_id = '';
  topic_id = '';
  enable_standards = false;
  default_standard: string[] = ['', ''];
  default_probtype: string = 'Multiple Choice';
  default_numchoices: number = 4;
  problems_loaded: boolean = false;
  enable_timelimit = false;
  shuffle_mode: boolean = false;

  assign_q = false;
  all_students: string[] = [];
  all_students_data: any = {};
  my_students: string[] = [];
  my_students_data: any = {};
  new_assignments: string[] = [];
  my_class_metadata: any[] = [];
  class_data: any = {};

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
  exam_timer = 10;

  exam_attribute_dump: { [key: string]: { 'State': string, 'Grade': string, 'Subject': string, 'ExamName': string, 'ExamYear': string, 'ExamType': string, 'NumQuestions': number, 'Timer': number, 'HideTopics': boolean, 'Directions': string, 'RefSheet': string, 'Topics': { [key: string]: number }, 'Levels': { [key: string]: number }, 'Parts': string[] } } = examMetadata;
  state_attribute_dump: { [key: string]: { 'State': string, 'EOverview': string, 'SOverview': string } } = stateMetadata;
  standards_attribute_dump: { [key: string]: { 'State': string, 'Grades': string[], 'Subject': string, 'Curriculum': string } } = standardMetadata;
  state_set: string[] = ['CO', 'FL', 'MA', 'MD', 'MS', 'NJ', 'NY', 'PA', 'RI', 'SC', 'TN', 'TX'];
  exam_set = ['COG3E', 'COG4E', 'COG5E', 'COG6E', 'COG7E', 'COG8E', 'COG3M', 'COG4M', 'COG5M', 'COG6M', 'COG7M', 'COG8M', 'COG5S', 'COG8S', 'COHSS', 'DEG4SS', 'DEG7SS', 'DEG11SS', 'FL20G3M', 'FL20G3R', 'FL20G4M', 'FL20G4R', 'FL20G4W', 'FL20G5M', 'FL20G5R', 'FL20G5W', 'FL20G5S', 'FL20G6M', 'FL20G6R', 'FL20G6W', 'FL20G7M', 'FL20G7R', 'FL20G7W', 'FL20G8M', 'FL20G8R', 'FL20G8W', 'FL20G8S', 'FL20G9R', 'FL20G9W', 'FL20G10R', 'FL20G10W', 'ILG3E', 'ILG3M', 'ILG4E', 'ILG4M', 'ILG5E', 'ILG5M', 'ILG6E', 'ILG6M', 'ILG7E', 'ILG7M', 'ILG8E', 'ILG8M', 'MA23G3E', 'MA22G3E', 'MA21G3E', 'MA19G3E', 'MAG3E', 'MA23G3M', 'MA22G3M', 'MA21G3M', 'MA19G3M', 'MAG3M', 'MA23G4E', 'MA22G4E', 'MA21G4E', 'MA19G4E', 'MAG4E', 'MA23G4M', 'MA22G4M', 'MA21G4M', 'MA19G4M', 'MAG4M', 'MA23G5E', 'MA22G5E', 'MA21G5E', 'MA19G5E', 'MAG5E', 'MA23G5M', 'MA22G5M', 'MA21G5M', 'MA19G5M', 'MAG5M', 'MA23G5S', 'MA22G5S', 'MA21G5S', 'MA19G5S', 'MAG5S', 'MA23G6E', 'MA22G6E', 'MA21G6E', 'MA19G6E', 'MAG6E', 'MA23G6M', 'MA22G6M', 'MA21G6M', 'MA19G6M', 'MAG6M', 'MA23G7E', 'MA22G7E', 'MA21G7E', 'MA19G7E', 'MAG7E', 'MA23G7M', 'MA22G7M', 'MA21G7M', 'MA19G7M', 'MAG7M', 'MA23G8E', 'MA22G8E', 'MA21G8E', 'MA19G8E', 'MAG8E', 'MA23G8M', 'MA22G8M', 'MA21G8M', 'MA19G8M', 'MAG8M', 'MA23G8S', 'MA22G8S', 'MA21G8S', 'MA19G8S', 'MAG8S', 'MA23G10E', 'MA22G10E', 'MA21G10E', 'MA19G10E', 'MAG10E', 'MA23G10M', 'MA22G10M', 'MA21G10M', 'MA19G10M', 'MAG10M', 'MA23HSB', 'MA22HSB', 'MA19HSB', 'MA23HSP', 'MA22HSP', 'MA19HSP', 'MDG3E', 'MDG4E', 'MDG5E', 'MDG6E', 'MDG7E', 'MDG8E', 'MDG10E', 'MDG3M', 'MDG4M', 'MDG5M', 'MDG6M', 'MDG7M', 'MDG8M', 'MDG5S', 'MDG8S', 'MDG8SS', 'MS23G3E', 'MS22G3E', 'MS23G4E', 'MS22G4E', 'MS23G5E', 'MS22G5E', 'MS23G6E', 'MS22G6E', 'MS23G7E', 'MS22G7E', 'MS23G8E', 'MS22G8E', 'MS23G3M', 'MS22G3M', 'MS23G4M', 'MS22G4M', 'MS23G5M', 'MS22G5M', 'MS23G6M', 'MS22G6M', 'MS23G7M', 'MS22G7M', 'MS23G8M', 'MS22G8M', 'NJG3E', 'NJG3M', 'NJG4E', 'NJG4M', 'NJG5E', 'NJG5M', 'NJG5S', 'NJG6E', 'NJG6M', 'NJG7E', 'NJG7M', 'NJG8E', 'NJG8M', 'NJG8S', 'NJG9E', 'NJG11S', 'NMG3E', 'NMG3M', 'NMG4E', 'NMG4M', 'NMG5E', 'NMG5M', 'NMG5S', 'NMG6E', 'NMG6M', 'NMG7E', 'NMG7M', 'NMG8E', 'NMG8M', 'NMG8S', 'NMG11S', 'NY23G3M', 'NY23G3E', 'NY22G3M', 'NY22G3E', 'NY21G3M', 'NY21G3E', 'NY19G3M', 'NY19G3E', 'NY18G3M', 'NY18G3E', 'NY17G3M', 'NY17G3E', 'NY16G3M', 'NY16G3E', 'NY15G3M', 'NY15G3E', 'NY23G4M', 'NY23G4E', 'NY22G4M', 'NY22G4E', 'NY21G4M', 'NY21G4E', 'NY19G4M', 'NY19G4E', 'NY18G4M', 'NY18G4E', 'NY17G4M', 'NY17G4E', 'NY16G4M', 'NY16G4E', 'NY15G4M', 'NY15G4E', 'NY22G4S', 'NY21G4S', 'NY19G4S', 'NY18G4S', 'NY17G4S', 'NY16G4S', 'NY15G4S', 'NY23G5M', 'NY23G5E', 'NY22G5M', 'NY22G5E', 'NY21G5M', 'NY21G5E', 'NY19G5M', 'NY19G5E', 'NY18G5M', 'NY18G5E', 'NY17G5M', 'NY17G5E', 'NY16G5M', 'NY16G5E', 'NY15G5M', 'NY15G5E', 'NY23G6M', 'NY23G6E', 'NY22G6M', 'NY22G6E', 'NY21G6M', 'NY21G6E', 'NY19G6M', 'NY19G6E', 'NY18G6M', 'NY18G6E', 'NY17G6M', 'NY17G6E', 'NY16G6M', 'NY16G6E', 'NY15G6M', 'NY15G6E', 'NY23G7M', 'NY23G7E', 'NY22G7M', 'NY22G7E', 'NY21G7M', 'NY21G7E', 'NY19G7M', 'NY19G7E', 'NY18G7M', 'NY18G7E', 'NY17G7M', 'NY17G7E', 'NY16G7M', 'NY16G7E', 'NY15G7M', 'NY15G7E', 'NY23G8M', 'NY23G8E', 'NY22G8M', 'NY22G8E', 'NY21G8M', 'NY21G8E', 'NY19G8M', 'NY19G8E', 'NY18G8M', 'NY18G8E', 'NY17G8M', 'NY17G8E', 'NY16G8M', 'NY16G8E', 'NY15G8M', 'NY15G8E', 'NY22G8S', 'NY21G8S', 'NY19G8S', 'NY18G8S', 'NY17G8S', 'NY16G8S', 'NY15G8S', 'PA23G3M', 'PA23G3E', 'PA22G3M', 'PA22G3E', 'PA21G3M', 'PA21G3E', 'PA19G3M', 'PA19G3E', 'PA18G3M', 'PA18G3E', 'PA16G3M', 'PA16G3E', 'PA15G3M', 'PA15G3E', 'PA23G4M', 'PA23G4E', 'PA22G4M', 'PA22G4E', 'PA21G4M', 'PA21G4E', 'PA19G4M', 'PA19G4E', 'PA18G4M', 'PA18G4E', 'PA16G4M', 'PA16G4E', 'PA15G4M', 'PA15G4E', 'PA23G4S', 'PA22G4S', 'PA21G4S', 'PA19G4S', 'PA18G4S', 'PA16G4S', 'PA15G4S', 'PA23G5M', 'PA23G5E', 'PA22G5M', 'PA22G5E', 'PA21G5M', 'PA21G5E', 'PA19G5M', 'PA19G5E', 'PA18G5M', 'PA18G5E', 'PA16G5M', 'PA16G5E', 'PA15G5M', 'PA15G5E', 'PA23G6M', 'PA23G6E', 'PA22G6M', 'PA22G6E', 'PA21G6M', 'PA21G6E', 'PA19G6M', 'PA19G6E', 'PA18G6M', 'PA18G6E', 'PA16G6M', 'PA16G6E', 'PA15G6M', 'PA15G6E', 'PA23G7M', 'PA23G7E', 'PA22G7M', 'PA22G7E', 'PA21G7M', 'PA21G7E', 'PA19G7M', 'PA19G7E', 'PA18G7M', 'PA18G7E', 'PA16G7M', 'PA16G7E', 'PA15G7M', 'PA15G7E', 'PA23G8M', 'PA23G8E', 'PA22G8M', 'PA22G8E', 'PA21G8M', 'PA21G8E', 'PA19G8M', 'PA19G8E', 'PA18G8M', 'PA18G8E', 'PA16G8M', 'PA16G8E', 'PA15G8M', 'PA15G8E', 'PA23G8S', 'PA22G8S', 'PA21G8S', 'PA19G8S', 'PA18G8S', 'PA16G8S', 'PA15G8S', 'PSAT1RW1', 'PSAT1RW2', 'PSAT1M1', 'PSAT1M2', 'RI23G3M', 'RI22G3M', 'RI21G3M', 'RI19G3M', 'RI18G3M', 'RI23G3E', 'RI22G3E', 'RI21G3E', 'RI19G3E', 'RI18G3E', 'RI23G4M', 'RI22G4M', 'RI21G4M', 'RI19G4M', 'RI18G4M', 'RI23G4E', 'RI22G4E', 'RI21G4E', 'RI19G4E', 'RI18G4E', 'RI23G5M', 'RI22G5M', 'RI21G5M', 'RI19G5M', 'RI18G5M', 'RI23G5E', 'RI22G5E', 'RI21G5E', 'RI19G5E', 'RI18G5E', 'RI23G6M', 'RI22G6M', 'RI21G6M', 'RI19G6M', 'RI18G6M', 'RI23G6E', 'RI22G6E', 'RI21G6E', 'RI19G6E', 'RI18G6E', 'RI23G7M', 'RI22G7M', 'RI21G7M', 'RI19G7M', 'RI18G7M', 'RI23G7E', 'RI22G7E', 'RI21G7E', 'RI19G7E', 'RI18G7E', 'RI23G8M', 'RI22G8M', 'RI21G8M', 'RI19G8M', 'RI18G8M', 'RI23G8E', 'RI22G8E', 'RI21G8E', 'RI19G8E', 'RI18G8E', 'SAT1RW1', 'SAT1RW2', 'SAT1M1', 'SAT1M2', 'SAT2RW1', 'SAT2RW2', 'SAT2M1', 'SAT2M2', 'SAT3RW1', 'SAT3RW2', 'SAT3M1', 'SAT3M2', 'SAT4RW1', 'SAT4RW2', 'SAT4M1', 'SAT4M2', 'SC18G3E', 'SC18G4E', 'SC18G5E', 'SC18G6E', 'SC18G7E', 'SC18G8E', 'SC18G3M', 'SC18G4M', 'SC18G5M', 'SC18G6M', 'SC18G7M', 'SC18G8M', 'SC18G4S', 'SC18G6S', 'TN20G3E', 'TN20G3M', 'TN20G3S', 'TN20G4E', 'TN20G4M', 'TN20G4S', 'TN20G5E', 'TN20G5M', 'TN20G5S', 'TN20G6E', 'TN20G6M', 'TN20G6S', 'TN20G6SS', 'TN20G7E', 'TN20G7M', 'TN20G7S', 'TN20G7SS', 'TN20G8E', 'TN20G8M', 'TN20G8S', 'TN20G8SS', 'TN20HSA1', 'TN20HSA2', 'TN20HSB', 'TN20HSE1', 'TN20HSE2', 'TN20HSG', 'TN20HSUSH', 'TX22G3M', 'TX22G3R', 'TX21G3M', 'TX21G3R', 'TX19G3M', 'TX19G3R', 'TX18G3M', 'TX18G3R', 'TX17G3M', 'TX17G3R', 'TX22G4M', 'TX22G4R', 'TX21G4M', 'TX21G4R', 'TX19G4M', 'TX19G4R', 'TX18G4M', 'TX18G4R', 'TX17G4M', 'TX17G4R', 'TX22G5M', 'TX22G5R', 'TX21G5M', 'TX21G5R', 'TX19G5M', 'TX19G5R', 'TX18G5M', 'TX18G5R', 'TX17G5M', 'TX17G5R', 'TX22G5S', 'TX21G5S', 'TX19G5S', 'TX18G5S', 'TX22G6M', 'TX22G6R', 'TX21G6M', 'TX21G6R', 'TX19G6M', 'TX19G6R', 'TX18G6M', 'TX18G6R', 'TX17G6M', 'TX17G6R', 'TX22G7M', 'TX22G7R', 'TX21G7M', 'TX21G7R', 'TX19G7M', 'TX19G7R', 'TX18G7M', 'TX18G7R', 'TX17G7M', 'TX17G7R', 'TX22G8M', 'TX22G8R', 'TX21G8M', 'TX21G8R', 'TX19G8M', 'TX19G8R', 'TX18G8M', 'TX18G8R', 'TX17G8M', 'TX17G8R', 'TX22G8S', 'TX21G8S', 'TX19G8S', 'TX18G8S', 'TX22G8SS', 'TX21G8SS', 'TX19G8SS', 'TX18G8SS', 'TX22HSA1', 'TX21HSA1', 'TX19HSA1', 'TX18HSA1', 'TX17HSA1', 'TX22HSB', 'TX21HSB', 'TX19HSB', 'TX18HSB', 'TX17HSB', 'TX22HSE1', 'TX21HSE1', 'TX19HSE1', 'TX18HSE1', 'TX17HSE1', 'TX22HSE2', 'TX21HSE2', 'TX19HSE2', 'TX18HSE2', 'TX17HSE2', 'TX22HSUSH', 'TX21HSUSH', 'TX19HSUSH', 'TX18HSUSH', 'TX17HSUSH', 'WIG3E', 'WIG4E', 'WIG5E', 'WIG6E', 'WIG7E', 'WIG8E', 'WIG3M', 'WIG4M', 'WIG5M', 'WIG6M', 'WIG7M', 'WIG8M', 'WIG4S', 'WIG8S', 'WIG4SS', 'WIG8SS', 'WIG10SS'];
  standard_set: string[] = ["KE-CC", "KM-CC", "G1E-CC", "G1M-CC", "G2E-CC", "G2M-CC", "G3E-CC", "G3M-CC", "G4E-CC", "G4M-CC", "G5E-CC", "G5M-CC", "G6E-CC", "G6M-CC", "G7E-CC", "G7M-CC", "G8E-CC", "G8M-CC", "HSE1-CC", "HSE2-CC", "HSMA-CC", "HSMF-CC", "HSMG-CC", "HSMM-CC", "HSMN-CC", "HSMS-CC", "PE-CO", "PM-CO", "PS-CO", "PSS-CO", "KE-CO", "KM-CO", "KS-CO", "KSS-CO", "G1E-CO", "G1M-CO", "G1S-CO", "G1SS-CO", "G2E-CO", "G2M-CO", "G2S-CO", "G2SS-CO", "G3E-CO", "G3M-CO", "G3S-CO", "G3SS-CO", "G4E-CO", "G4M-CO", "G4S-CO", "G4SS-CO", "G5E-CO", "G5M-CO", "G5S-CO", "G5SS-CO", "G6E-CO", "G6M-CO", "G6SS-CO", "G7E-CO", "G7M-CO", "G7SS-CO", "G8E-CO", "G8M-CO", "MSS-CO", "G8SS-CO", "HSE1-CO", "HSE2-CO", "HSM-CO", "HSS-CO", "HSSS-CO", "KE-FL", "KM-FL", "G1E-FL", "G1M-FL", "G2E-FL", "G2M-FL", "G3E-FL", "G3M-FL", "G4E-FL", "G4M-FL", "G5E-FL", "G5M-FL", "G6E-FL", "G6M-FL", "G7E-FL", "G7M-FL", "G8E-FL", "G8M-FL", "G9E-FL", "G10E-FL", "G11E-FL", "G12E-FL", "HSM-FL", "PE-MA", "PM-MA", "PS-MA", "KE-MA", "KM-MA", "KS-MA", "EEST-MA", "G1E-MA", "G1M-MA", "G1S-MA", "G2E-MA", "G2M-MA", "G2S-MA", "G3E-MA", "G3M-MA", "G3S-MA", "UEST-MA", "G4E-MA", "G4M-MA", "G4S-MA", "G5E-MA", "G5M-MA", "G5S-MA", "G6E-MA", "G6M-MA", "G6S-MA", "MST-MA", "G7E-MA", "G7M-MA", "G7S-MA", "G8E-MA", "G8M-MA", "G8S-MA", "HSE1-MA", "HSE2-MA", "HSMA-MA", "HSMF-MA", "HSMG-MA", "HSMM-MA", "HSMN-MA", "HSMS-MA", "HSSB-MA", "HSSC-MA", "HSSP-MA", "HSSES-MA", "HSSTS-MA", "HST-MA", "PE-MD", "PM-MD", "KE-MD", "KM-MD", "G1E-MD", "G1M-MD", "G2E-MD", "G2M-MD", "G3E-MD", "G3M-MD", "G4E-MD", "G4M-MD", "G5E-MD", "G5M-MD", "G6E-MD", "G6M-MD", "G7E-MD", "G7M-MD", "G8E-MD", "G8M-MD", "HSE1-MD", "HSE2-MD", "HSMA1-MD", "HSMA2-MD", "HSMG-MD", "HSMS-MD", "KE-MS", "KM-MS", "G1E-MS", "G1M-MS", "G2E-MS", "G2M-MS", "G3E-MS", "G3M-MS", "G4E-MS", "G4M-MS", "G5E-MS", "G5M-MS", "G6E-MS", "G6M-MS", "G7E-MS", "G7M-MS", "G8E-MS", "G8M-MS", "KS-NG", "G1S-NG", "G2S-NG", "G3S-NG", "G4S-NG", "G5S-NG", "MSS-NG", "HSS-NG", "KE-NJ", "KM-NJ", "KS-NJ", "G1E-NJ", "G1M-NJ", "G1S-NJ", "G2E-NJ", "G2M-NJ", "G2S-NJ", "G3E-NJ", "G3M-NJ", "G3S-NJ", "G4E-NJ", "G4M-NJ", "G4S-NJ", "G5E-NJ", "G5M-NJ", "G5S-NJ", "G6E-NJ", "G6M-NJ", "G7E-NJ", "G7M-NJ", "G8E-NJ", "G8M-NJ", "MSS-NJ", "PE-NY", "PM-NY", "KE-NY", "KM-NY", "G1E-NY", "G1M-NY", "G2E-NY", "G2M-NY", "G3E-NY", "G3M-NY", "G4E-NY", "G4M-NY", "G5E-NY", "G5M-NY", "G6E-NY", "G6M-NY", "G7E-NY", "G7M-NY", "G8E-NY", "G8M-NY", "HSE1-NY", "HSE2-NY", "HSMA1-NY", "HSMG-NY", "HSMA2-NY", "G3E-PA", "G3M-PA", "G4E-PA", "G4M-PA", "G4S-PA", "G5E-PA", "G5M-PA", "G6E-PA", "G6M-PA", "G7E-PA", "G7M-PA", "G8E-PA", "G8M-PA", "G8S-PA", "KE-RI", "KM-RI", "G1E-RI", "G1M-RI", "G2E-RI", "G2M-RI", "G3E-RI", "G3M-RI", "G4E-RI", "G4M-RI", "G5E-RI", "G5M-RI", "G6E-RI", "G6M-RI", "G7E-RI", "G7M-RI", "G8E-RI", "G8M-RI", "HSE1-RI", "HSE2-RI", "HSMA-RI", "HSMF-RI", "HSMG-RI", "HSMM-RI", "HSMN-RI", "HSMS-RI", "KE-SC", "KM-SC", "KS-SC", "G1E-SC", "G1M-SC", "G1S-SC", "G2E-SC", "G2M-SC", "G2S-SC", "G3E-SC", "G3M-SC", "G3S-SC", "G4E-SC", "G4M-SC", "G4S-SC", "G5E-SC", "G5M-SC", "G5S-SC", "G6E-SC", "G6M-SC", "G6S-SC", "G7E-SC", "G7M-SC", "G7S-SC", "G8E-SC", "G8M-SC", "G8S-SC", "KE-TN", "KM-TN", "KS-TN", "G1E-TN", "G1M-TN", "G1S-TN", "G2E-TN", "G2M-TN", "G2S-TN", "G3E-TN", "G3M-TN", "G3S-TN", "G4E-TN", "G4M-TN", "G4S-TN", "G5E-TN", "G5M-TN", "G5S-TN", "G6E-TN", "G6M-TN", "G6S-TN", "G7E-TN", "G7M-TN", "G7S-TN", "G8E-TN", "G8M-TN", "G8S-TN", "HSMA1-TN", "HSMA2-TN", "HSSB1-TN", "HSE1-TN", "HSE2-TN", "HSMG-TN", "KR-TX", "KM-TX", "G1R-TX", "G1M-TX", "G2R-TX", "G2M-TX", "G3R-TX", "G3M-TX", "G4R-TX", "G4M-TX", "G5R-TX", "G5M-TX", "G6R-TX", "G6M-TX", "G7R-TX", "G7M-TX", "G8R-TX", "G8M-TX", "HSE1-TX", "HSE2-TX", "HSE3-TX", "HSE4-TX", "HSMA1-TX", "HSMA2-TX", "HSMG-TX", "HSMP-TX", "HSMS-TX", "SAT-M", "SAT-RW"];

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

  KE_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = KEStandards;
  KM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = KMStandards;
  G1E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = G1EStandards;
  G1M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = G1MStandards;
  G2E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = G2EStandards;
  G2M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = G2MStandards;
  G3E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = G3EStandards;
  G3M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = G3MStandards;
  G4E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = G4EStandards;
  G4M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = G4MStandards;
  G5E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = G5EStandards;
  G5M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = G5MStandards;
  G6E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = G6EStandards;
  G6M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = G6MStandards;
  G7E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = G7EStandards;
  G7M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = G7MStandards;
  G8E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = G8EStandards;
  G8M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = G8MStandards;
  HSE1_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = HSE1Standards;
  HSE2_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = HSE2Standards;
  HSMA_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = HSMAStandards;
  HSMF_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = HSMFStandards;
  HSMG_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = HSMGStandards;
  HSMM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = HSMMStandards;
  HSMN_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = HSMNStandards;
  HSMS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = HSMSStandards;
  COPE_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COPEStandards;
  COPM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COPMStandards;
  COPS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COPSStandards;
  COPSS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COPSSStandards;
  COKE_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COKEStandards;
  COKM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COKMStandards;
  COKS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COKSStandards;
  COKSS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COKSSStandards;
  COG1E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG1EStandards;
  COG1M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG1MStandards;
  COG1S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG1SStandards;
  COG1SS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG1SSStandards;
  COG2E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG2EStandards;
  COG2M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG2MStandards;
  COG2S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG2SStandards;
  COG2SS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG2SSStandards;
  COG3E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG3EStandards;
  COG3M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG3MStandards;
  COG3S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG3SStandards;
  COG3SS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG3SSStandards;
  COG4E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG4EStandards;
  COG4M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG4MStandards;
  COG4S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG4SStandards;
  COG4SS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG4SSStandards;
  COG5E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG5EStandards;
  COG5M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG5MStandards;
  COG5S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG5SStandards;
  COG5SS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG5SSStandards;
  COG6E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG6EStandards;
  COG6M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG6MStandards;
  COG6SS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG6SSStandards;
  COG7E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG7EStandards;
  COG7M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG7MStandards;
  COG7SS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG7SSStandards;
  COG8E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG8EStandards;
  COG8M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG8MStandards;
  COMSS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COMSSStandards;
  COG8SS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COG8SSStandards;
  COHSE1_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COHSE1Standards;
  COHSE2_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COHSE2Standards;
  COHSM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COHSMStandards;
  COHSS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COHSSStandards;
  COHSSS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = COHSSSStandards;
  FLKE_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLKEStandards;
  FLKM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLKMStandards;
  FLG1E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLG1EStandards;
  FLG1M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLG1MStandards;
  FLG2E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLG2EStandards;
  FLG2M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLG2MStandards;
  FLG3E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLG3EStandards;
  FLG3M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLG3MStandards;
  FLG4E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLG4EStandards;
  FLG4M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLG4MStandards;
  FLG5E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLG5EStandards;
  FLG5M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLG5MStandards;
  FLG6E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLG6EStandards;
  FLG6M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLG6MStandards;
  FLG7E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLG7EStandards;
  FLG7M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLG7MStandards;
  FLG8E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLG8EStandards;
  FLG8M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLG8MStandards;
  FLG9E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLG9EStandards;
  FLG10E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLG10EStandards;
  FLG11E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLG11EStandards;
  FLG12E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLG12EStandards;
  FLHSM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = FLHSMStandards;
  MAPE_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAPEStandards;
  MAPM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAPMStandards;
  MAPS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAPSStandards;
  MAKE_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAKEStandards;
  MAKM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAKMStandards;
  MAKS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAKSStandards;
  MAEEST_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAEESTStandards;
  MAG1E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG1EStandards;
  MAG1M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG1MStandards;
  MAG1S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG1SStandards;
  MAG2E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG2EStandards;
  MAG2M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG2MStandards;
  MAG2S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG2SStandards;
  MAG3E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG3EStandards;
  MAG3M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG3MStandards;
  MAG3S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG3SStandards;
  MAUEST_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAUESTStandards;
  MAG4E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG4EStandards;
  MAG4M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG4MStandards;
  MAG4S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG4SStandards;
  MAG5E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG5EStandards;
  MAG5M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG5MStandards;
  MAG5S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG5SStandards;
  MAG6E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG6EStandards;
  MAG6M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG6MStandards;
  MAG6S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG6SStandards;
  MAMST_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAMSTStandards;
  MAG7E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG7EStandards;
  MAG7M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG7MStandards;
  MAG7S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG7SStandards;
  MAG8E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG8EStandards;
  MAG8M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG8MStandards;
  MAG8S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAG8SStandards;
  MAHSE1_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAHSE1Standards;
  MAHSE2_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAHSE2Standards;
  MAHSMA_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAHSMAStandards;
  MAHSMF_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAHSMFStandards;
  MAHSMG_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAHSMGStandards;
  MAHSMM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAHSMMStandards;
  MAHSMN_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAHSMNStandards;
  MAHSMS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAHSMSStandards;
  MAHSSB_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAHSSBStandards;
  MAHSSC_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAHSSCStandards;
  MAHSSP_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAHSSPStandards;
  MAHSSES_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAHSSESStandards;
  MAHSSTS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAHSSTSStandards;
  MAHST_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MAHSTStandards;
  MDPE_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDPEStandards;
  MDPM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDPMStandards;
  MDKE_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDKEStandards;
  MDKM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDKMStandards;
  MDG1E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDG1EStandards;
  MDG1M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDG1MStandards;
  MDG2E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDG2EStandards;
  MDG2M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDG2MStandards;
  MDG3E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDG3EStandards;
  MDG3M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDG3MStandards;
  MDG4E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDG4EStandards;
  MDG4M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDG4MStandards;
  MDG5E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDG5EStandards;
  MDG5M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDG5MStandards;
  MDG6E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDG6EStandards;
  MDG6M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDG6MStandards;
  MDG7E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDG7EStandards;
  MDG7M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDG7MStandards;
  MDG8E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDG8EStandards;
  MDG8M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDG8MStandards;
  MDHSE1_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDHSE1Standards;
  MDHSE2_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDHSE2Standards;
  MDHSMA1_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDHSMA1Standards;
  MDHSMA2_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDHSMA2Standards;
  MDHSMG_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDHSMGStandards;
  MDHSMS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MDHSMSStandards;
  MSKE_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MSKEStandards;
  MSKM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MSKMStandards;
  MSG1E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MSG1EStandards;
  MSG1M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MSG1MStandards;
  MSG2E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MSG2EStandards;
  MSG2M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MSG2MStandards;
  MSG3E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MSG3EStandards;
  MSG3M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MSG3MStandards;
  MSG4E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MSG4EStandards;
  MSG4M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MSG4MStandards;
  MSG5E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MSG5EStandards;
  MSG5M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MSG5MStandards;
  MSG6E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MSG6EStandards;
  MSG6M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MSG6MStandards;
  MSG7E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MSG7EStandards;
  MSG7M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MSG7MStandards;
  MSG8E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MSG8EStandards;
  MSG8M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = MSG8MStandards;
  NGKS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NGKSStandards;
  NGG1S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NGG1SStandards;
  NGG2S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NGG2SStandards;
  NGG3S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NGG3SStandards;
  NGG4S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NGG4SStandards;
  NGG5S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NGG5SStandards;
  NGMSS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NGMSSStandards;
  NGHSS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NGHSSStandards;
  NJKE_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJKEStandards;
  NJKM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJKMStandards;
  NJKS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJKSStandards;
  NJG1E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJG1EStandards;
  NJG1M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJG1MStandards;
  NJG1S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJG1SStandards;
  NJG2E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJG2EStandards;
  NJG2M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJG2MStandards;
  NJG2S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJG2SStandards;
  NJG3E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJG3EStandards;
  NJG3M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJG3MStandards;
  NJG3S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJG3SStandards;
  NJG4E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJG4EStandards;
  NJG4M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJG4MStandards;
  NJG4S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJG4SStandards;
  NJG5E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJG5EStandards;
  NJG5M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJG5MStandards;
  NJG5S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJG5SStandards;
  NJG6E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJG6EStandards;
  NJG6M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJG6MStandards;
  NJG7E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJG7EStandards;
  NJG7M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJG7MStandards;
  NJG8E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJG8EStandards;
  NJG8M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJG8MStandards;
  NJMSS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NJMSSStandards;
  NYPE_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYPEStandards;
  NYPM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYPMStandards;
  NYKE_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYKEStandards;
  NYKM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYKMStandards;
  NYG1E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYG1EStandards;
  NYG1M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYG1MStandards;
  NYG2E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYG2EStandards;
  NYG2M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYG2MStandards;
  NYG3E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYG3EStandards;
  NYG3M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYG3MStandards;
  NYG4E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYG4EStandards;
  NYG4M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYG4MStandards;
  NYG5E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYG5EStandards;
  NYG5M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYG5MStandards;
  NYG6E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYG6EStandards;
  NYG6M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYG6MStandards;
  NYG7E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYG7EStandards;
  NYG7M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYG7MStandards;
  NYG8E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYG8EStandards;
  NYG8M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYG8MStandards;
  NYHSE1_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYHSE1Standards;
  NYHSE2_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYHSE2Standards;
  NYHSMA1_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYHSMA1Standards;
  NYHSMG_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYHSMGStandards;
  NYHSMA2_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = NYHSMA2Standards;
  PAG3E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = PAG3EStandards;
  PAG3M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = PAG3MStandards;
  PAG4E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = PAG4EStandards;
  PAG4M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = PAG4MStandards;
  PAG4S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = PAG4SStandards;
  PAG5E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = PAG5EStandards;
  PAG5M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = PAG5MStandards;
  PAG6E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = PAG6EStandards;
  PAG6M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = PAG6MStandards;
  PAG7E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = PAG7EStandards;
  PAG7M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = PAG7MStandards;
  PAG8E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = PAG8EStandards;
  PAG8M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = PAG8MStandards;
  PAG8S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = PAG8SStandards;
  RIKE_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIKEStandards;
  RIKM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIKMStandards;
  RIG1E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIG1EStandards;
  RIG1M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIG1MStandards;
  RIG2E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIG2EStandards;
  RIG2M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIG2MStandards;
  RIG3E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIG3EStandards;
  RIG3M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIG3MStandards;
  RIG4E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIG4EStandards;
  RIG4M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIG4MStandards;
  RIG5E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIG5EStandards;
  RIG5M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIG5MStandards;
  RIG6E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIG6EStandards;
  RIG6M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIG6MStandards;
  RIG7E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIG7EStandards;
  RIG7M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIG7MStandards;
  RIG8E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIG8EStandards;
  RIG8M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIG8MStandards;
  RIHSE1_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIHSE1Standards;
  RIHSE2_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIHSE2Standards;
  RIHSMA_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIHSMAStandards;
  RIHSMF_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIHSMFStandards;
  RIHSMG_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIHSMGStandards;
  RIHSMM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIHSMMStandards;
  RIHSMN_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIHSMNStandards;
  RIHSMS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = RIHSMSStandards;
  SCKE_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCKEStandards;
  SCKM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCKMStandards;
  SCKS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCKSStandards;
  SCG1E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG1EStandards;
  SCG1M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG1MStandards;
  SCG1S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG1SStandards;
  SCG2E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG2EStandards;
  SCG2M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG2MStandards;
  SCG2S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG2SStandards;
  SCG3E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG3EStandards;
  SCG3M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG3MStandards;
  SCG3S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG3SStandards;
  SCG4E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG4EStandards;
  SCG4M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG4MStandards;
  SCG4S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG4SStandards;
  SCG5E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG5EStandards;
  SCG5M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG5MStandards;
  SCG5S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG5SStandards;
  SCG6E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG6EStandards;
  SCG6M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG6MStandards;
  SCG6S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG6SStandards;
  SCG7E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG7EStandards;
  SCG7M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG7MStandards;
  SCG7S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG7SStandards;
  SCG8E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG8EStandards;
  SCG8M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG8MStandards;
  SCG8S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SCG8SStandards;
  TNKE_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNKEStandards;
  TNKM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNKMStandards;
  TNKS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNKSStandards;
  TNG1E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG1EStandards;
  TNG1M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG1MStandards;
  TNG1S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG1SStandards;
  TNG2E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG2EStandards;
  TNG2M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG2MStandards;
  TNG2S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG2SStandards;
  TNG3E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG3EStandards;
  TNG3M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG3MStandards;
  TNG3S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG3SStandards;
  TNG4E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG4EStandards;
  TNG4M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG4MStandards;
  TNG4S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG4SStandards;
  TNG5E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG5EStandards;
  TNG5M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG5MStandards;
  TNG5S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG5SStandards;
  TNG6E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG6EStandards;
  TNG6M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG6MStandards;
  TNG6S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG6SStandards;
  TNG7E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG7EStandards;
  TNG7M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG7MStandards;
  TNG7S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG7SStandards;
  TNG8E_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG8EStandards;
  TNG8M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG8MStandards;
  TNG8S_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNG8SStandards;
  TNHSMA1_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNHSMA1Standards;
  TNHSMA2_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNHSMA2Standards;
  TNHSSB1_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNHSSB1Standards;
  TNHSE1_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNHSE1Standards;
  TNHSE2_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNHSE2Standards;
  TNHSMG_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TNHSMGStandards;
  TXKR_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXKRStandards;
  TXKM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXKMStandards;
  TXG1R_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXG1RStandards;
  TXG1M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXG1MStandards;
  TXG2R_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXG2RStandards;
  TXG2M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXG2MStandards;
  TXG3R_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXG3RStandards;
  TXG3M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXG3MStandards;
  TXG4R_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXG4RStandards;
  TXG4M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXG4MStandards;
  TXG5R_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXG5RStandards;
  TXG5M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXG5MStandards;
  TXG6R_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXG6RStandards;
  TXG6M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXG6MStandards;
  TXG7R_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXG7RStandards;
  TXG7M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXG7MStandards;
  TXG8R_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXG8RStandards;
  TXG8M_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXG8MStandards;
  TXHSE1_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXHSE1Standards;
  TXHSE2_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXHSE2Standards;
  TXHSE3_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXHSE3Standards;
  TXHSE4_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXHSE4Standards;
  TXHSMA1_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXHSMAStandards;
  TXHSMA2_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXHSMA2Standards;
  TXHSMG_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXHSMGStandards;
  TXHSMP_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXHSMPStandards;
  TXHSMS_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = TXHSMSStandards;
  SATM_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SATMStandards;
  SATRW_standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SATRWStandards;
  standards_dump: { 'Title': string, 'Overview': string, 'Goals': any[], 'Standards': any[], 'References': any[] } = SATRWStandards;

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

  s_dump_dict: any = {
    "KE-CC": ["KE-CC", this.KE_standards_dump],
    "KM-CC": ["KM-CC", this.KM_standards_dump],
    "G1E-CC": ["G1E-CC", this.G1E_standards_dump],
    "G1M-CC": ["G1M-CC", this.G1M_standards_dump],
    "G2E-CC": ["G2E-CC", this.G2E_standards_dump],
    "G2M-CC": ["G2M-CC", this.G2M_standards_dump],
    "G3E-CC": ["G3E-CC", this.G3E_standards_dump],
    "G3M-CC": ["G3M-CC", this.G3M_standards_dump],
    "G4E-CC": ["G4E-CC", this.G4E_standards_dump],
    "G4M-CC": ["G4M-CC", this.G4M_standards_dump],
    "G5E-CC": ["G5E-CC", this.G5E_standards_dump],
    "G5M-CC": ["G5M-CC", this.G5M_standards_dump],
    "G6E-CC": ["G6E-CC", this.G6E_standards_dump],
    "G6M-CC": ["G6M-CC", this.G6M_standards_dump],
    "G7E-CC": ["G7E-CC", this.G7E_standards_dump],
    "G7M-CC": ["G7M-CC", this.G7M_standards_dump],
    "G8E-CC": ["G8E-CC", this.G8E_standards_dump],
    "G8M-CC": ["G8M-CC", this.G8M_standards_dump],
    "HSE1-CC": ["HSE1-CC", this.HSE2_standards_dump],
    "HSE2-CC": ["HSE2-CC", this.HSE2_standards_dump],
    "HSMA-CC": ["HSMA-CC", this.HSMA_standards_dump],
    "HSMF-CC": ["HSMF-CC", this.HSMF_standards_dump],
    "HSMG-CC": ["HSMG-CC", this.HSMG_standards_dump],
    "HSMM-CC": ["HSMM-CC", this.HSMM_standards_dump],
    "HSMN-CC": ["HSMN-CC", this.HSMN_standards_dump],
    "HSMS-CC": ["HSMS-CC", this.HSMS_standards_dump],
    "PE-CO": ["PE-CO", this.COPE_standards_dump],
    "PM-CO": ["PM-CO", this.COPM_standards_dump],
    "PS-CO": ["PS-CO", this.COPS_standards_dump],
    "PSS-CO": ["PSS-CO", this.COPSS_standards_dump],
    "KE-CO": ["KE-CO", this.COKE_standards_dump],
    "KM-CO": ["KM-CO", this.COKM_standards_dump],
    "KS-CO": ["KS-CO", this.COKS_standards_dump],
    "KSS-CO": ["KSS-CO", this.COKSS_standards_dump],
    "G1E-CO": ["G1E-CO", this.COG1E_standards_dump],
    "G1M-CO": ["G1M-CO", this.COG1M_standards_dump],
    "G1S-CO": ["G1S-CO", this.COG1S_standards_dump],
    "G1SS-CO": ["G1SS-CO", this.COG1SS_standards_dump],
    "G2E-CO": ["G2E-CO", this.COG2E_standards_dump],
    "G2M-CO": ["G2M-CO", this.COG2M_standards_dump],
    "G2S-CO": ["G2S-CO", this.COG2S_standards_dump],
    "G2SS-CO": ["G2SS-CO", this.COG2SS_standards_dump],
    "G3E-CO": ["G3E-CO", this.COG3E_standards_dump],
    "G3M-CO": ["G3M-CO", this.COG3M_standards_dump],
    "G3S-CO": ["G3S-CO", this.COG3S_standards_dump],
    "G3SS-CO": ["G3SS-CO", this.COG3SS_standards_dump],
    "G4E-CO": ["G4E-CO", this.COG4E_standards_dump],
    "G4M-CO": ["G4M-CO", this.COG4M_standards_dump],
    "G4S-CO": ["G4S-CO", this.COG4S_standards_dump],
    "G4SS-CO": ["G4SS-CO", this.COG4SS_standards_dump],
    "G5E-CO": ["G5E-CO", this.COG5E_standards_dump],
    "G5M-CO": ["G5M-CO", this.COG5M_standards_dump],
    "G5S-CO": ["G5S-CO", this.COG5S_standards_dump],
    "G5SS-CO": ["G5SS-CO", this.COG5SS_standards_dump],
    "G6E-CO": ["G6E-CO", this.COG6E_standards_dump],
    "G6M-CO": ["G6M-CO", this.COG6M_standards_dump],
    "G6SS-CO": ["G6SS-CO", this.COG6SS_standards_dump],
    "G7E-CO": ["G7E-CO", this.COG7E_standards_dump],
    "G7M-CO": ["G7M-CO", this.COG7M_standards_dump],
    "G7SS-CO": ["G7SS-CO", this.COG7SS_standards_dump],
    "G8E-CO": ["G8E-CO", this.COG8E_standards_dump],
    "G8M-CO": ["G8M-CO", this.COG8M_standards_dump],
    "MSS-CO": ["MSS-CO", this.COMSS_standards_dump],
    "G8SS-CO": ["G8SS-CO", this.COG8SS_standards_dump],
    "HSE1-CO": ["HSE1-CO", this.COHSE1_standards_dump],
    "HSE2-CO": ["HSE2-CO", this.COHSE2_standards_dump],
    "HSM-CO": ["HSM-CO", this.COHSM_standards_dump],
    "HSS-CO": ["HSS-CO", this.COHSS_standards_dump],
    "HSSS-CO": ["HSSS-CO", this.COHSSS_standards_dump],
    "KE-FL": ["KE-FL", this.FLKE_standards_dump],
    "KM-FL": ["KM-FL", this.FLKM_standards_dump],
    "G1E-FL": ["G1E-FL", this.FLG1E_standards_dump],
    "G1M-FL": ["G1M-FL", this.FLG1M_standards_dump],
    "G2E-FL": ["G2E-FL", this.FLG2E_standards_dump],
    "G2M-FL": ["G2M-FL", this.FLG2M_standards_dump],
    "G3E-FL": ["G3E-FL", this.FLG3E_standards_dump],
    "G3M-FL": ["G3M-FL", this.FLG3M_standards_dump],
    "G4E-FL": ["G4M-FL", this.FLG4E_standards_dump],
    "G4M-FL": ["G4M-FL", this.FLG4M_standards_dump],
    "G5E-FL": ["G5E-FL", this.FLG5E_standards_dump],
    "G5M-FL": ["G5M-FL", this.FLG5M_standards_dump],
    "G6E-FL": ["G6E-FL", this.FLG6E_standards_dump],
    "G6M-FL": ["G6M-FL", this.FLG6M_standards_dump],
    "G7E-FL": ["G7E-FL", this.FLG7E_standards_dump],
    "G7M-FL": ["G7M-FL", this.FLG7M_standards_dump],
    "G8E-FL": ["G8E-FL", this.FLG8E_standards_dump],
    "G8M-FL": ["G8M-FL", this.FLG8M_standards_dump],
    "G9E-FL": ["G9E-FL", this.FLG9E_standards_dump],
    "G10E-FL": ["G10E-FL", this.FLG10E_standards_dump],
    "G11E-FL": ["G11E-FL", this.FLG11E_standards_dump],
    "G12E-FL": ["G12E-FL", this.FLG12E_standards_dump],
    "HSM-FL": ["HSM-FL", this.FLHSM_standards_dump],
    "PE-MA": ["PE-MA", this.MAPE_standards_dump],
    "PM-MA": ["PM-MA", this.MAPM_standards_dump],
    "PS-MA": ["PS-MA", this.MAPS_standards_dump],
    "KE-MA": ["KE-MA", this.MAKE_standards_dump],
    "KM-MA": ["KM-MA", this.MAKM_standards_dump],
    "KS-MA": ["KS-MA", this.MAKS_standards_dump],
    "EEST-MA": ["EEST-MA", this.MAEEST_standards_dump],
    "G1E-MA": ["G1E-MA", this.MAG1E_standards_dump],
    "G1M-MA": ["G1M-MA", this.MAG1M_standards_dump],
    "G1S-MA": ["G1S-MA", this.MAG1S_standards_dump],
    "G2E-MA": ["G2E-MA", this.MAG2E_standards_dump],
    "G2M-MA": ["G2M-MA", this.MAG2M_standards_dump],
    "G2S-MA": ["G2S-MA", this.MAG2S_standards_dump],
    "G3E-MA": ["G3E-MA", this.MAG3E_standards_dump],
    "G3M-MA": ["G3M-MA", this.MAG3M_standards_dump],
    "G3S-MA": ["G3S-MA", this.MAG3S_standards_dump],
    "UEST-MA": ["UEST-MA", this.MAUEST_standards_dump],
    "G4E-MA": ["G4E-MA", this.MAG4E_standards_dump],
    "G4M-MA": ["G4M-MA", this.MAG4M_standards_dump],
    "G4S-MA": ["G4S-MA", this.MAG4S_standards_dump],
    "G5E-MA": ["G5E-MA", this.MAG5E_standards_dump],
    "G5M-MA": ["G5M-MA", this.MAG5M_standards_dump],
    "G5S-MA": ["G5S-MA", this.MAG5S_standards_dump],
    "G6E-MA": ["G6E-MA", this.MAG6E_standards_dump],
    "G6M-MA": ["G6M-MA", this.MAG6M_standards_dump],
    "G6S-MA": ["G6S-MA", this.MAG6S_standards_dump],
    "MST-MA": ["MST-MA", this.MAMST_standards_dump],
    "G7E-MA": ["G7E-MA", this.MAG7E_standards_dump],
    "G7M-MA": ["G7M-MA", this.MAG7M_standards_dump],
    "G7S-MA": ["G7S-MA", this.MAG7S_standards_dump],
    "G8E-MA": ["G8E-MA", this.MAG8E_standards_dump],
    "G8M-MA": ["G8M-MA", this.MAG8M_standards_dump],
    "G8S-MA": ["G8S-MA", this.MAG8S_standards_dump],
    "HSE1-MA": ["HSE1-MA", this.MAHSE1_standards_dump],
    "HSE2-MA": ["HSE2-MA", this.MAHSE2_standards_dump],
    "HSMA-MA": ["HSMA-MA", this.MAHSMA_standards_dump],
    "HSMF-MA": ["HSMF-MA", this.MAHSMF_standards_dump],
    "HSMG-MA": ["HSMG-MA", this.MAHSMG_standards_dump],
    "HSMM-MA": ["HSMM-MA", this.MAHSMM_standards_dump],
    "HSMN-MA": ["HSMN-MA", this.MAHSMN_standards_dump],
    "HSMS-MA": ["HSMS-MA", this.MAHSMS_standards_dump],
    "HSSB-MA": ["HSSB-MA", this.MAHSSB_standards_dump],
    "HSSC-MA": ["HSSC-MA", this.MAHSSC_standards_dump],
    "HSSP-MA": ["HSSP-MA", this.MAHSSP_standards_dump],
    "HSSES-MA": ["HSSES-MA", this.MAHSSES_standards_dump],
    "HSSTS-MA": ["HSSTS-MA", this.MAHSSTS_standards_dump],
    "HST-MA": ["HST-MA", this.MAHST_standards_dump],
    "PE-MD": ["PE-MD", this.MDPE_standards_dump],
    "PM-MD": ["PM-MD", this.MDPM_standards_dump],
    "KE-MD": ["KE-MD", this.MDKE_standards_dump],
    "KM-MD": ["KM-MD", this.MDKM_standards_dump],
    "KS-MD": ["KS-NG", this.NGKS_standards_dump],
    "G1E-MD": ["G1E-MD", this.MDG1E_standards_dump],
    "G1M-MD": ["G1M-MD", this.MDG1M_standards_dump],
    "G1S-MD": ["G1S-NG", this.NGG1S_standards_dump],
    "G2E-MD": ["G2E-MD", this.MDG2E_standards_dump],
    "G2M-MD": ["G2M-MD", this.MDG2M_standards_dump],
    "G2S-MD": ["G2S-NG", this.NGG1S_standards_dump],
    "G3E-MD": ["G3E-MD", this.MDG3E_standards_dump],
    "G3M-MD": ["G3M-MD", this.MDG3M_standards_dump],
    "G3S-MD": ["G3S-NG", this.NGG3S_standards_dump],
    "G4E-MD": ["G4E-MD", this.MDG4E_standards_dump],
    "G4M-MD": ["G4M-MD", this.MDG4M_standards_dump],
    "G4S-MD": ["G4S-NG", this.NGG4S_standards_dump],
    "G5E-MD": ["G5E-MD", this.MDG5E_standards_dump],
    "G5M-MD": ["G5M-MD", this.MDG5M_standards_dump],
    "G5S-MD": ["G5S-NG", this.NGG5S_standards_dump],
    "G6E-MD": ["G6E-MD", this.MDG6E_standards_dump],
    "G6M-MD": ["G6M-MD", this.MDG6M_standards_dump],
    "G7E-MD": ["G7E-MD", this.MDG7E_standards_dump],
    "G7M-MD": ["G7M-MD", this.MDG7M_standards_dump],
    "G8E-MD": ["G8E-MD", this.MDG8E_standards_dump],
    "G8M-MD": ["G8M-MD", this.MDG8M_standards_dump],
    "MSS-MD": ["MSS-NG", this.NGMSS_standards_dump],
    "HSE1-MD": ["HSE1-MD", this.MDHSE1_standards_dump],
    "HSE2-MD": ["HSE2-MD", this.MDHSE2_standards_dump],
    "HSMA1-MD": ["HSMA1-MD", this.MDHSMA1_standards_dump],
    "HSMA2-MD": ["HSMA2-MD", this.MDHSMA2_standards_dump],
    "HSMG-MD": ["HSMG-MD", this.MDHSMG_standards_dump],
    "HSMS-MD": ["HSMS-MD", this.MDHSMS_standards_dump],
    "HSS-MD": ["HSS-NG", this.NGHSS_standards_dump],
    "KE-MS": ["KE-MS", this.MSKE_standards_dump],
    "KM-MS": ["KM-MS", this.MSKM_standards_dump],
    "G1E-MS": ["G1E-MS", this.MSG1E_standards_dump],
    "G1M-MS": ["G1M-MS", this.MSG1M_standards_dump],
    "G2E-MS": ["G2E-MS", this.MSG2E_standards_dump],
    "G2M-MS": ["G2M-MS", this.MSG2M_standards_dump],
    "G3E-MS": ["G3E-MS", this.MSG3E_standards_dump],
    "G3M-MS": ["G3M-MS", this.MSG3M_standards_dump],
    "G4E-MS": ["G4E-MS", this.MSG4E_standards_dump],
    "G4M-MS": ["G4M-MS", this.MSG4M_standards_dump],
    "G5E-MS": ["G5E-MS", this.MSG5E_standards_dump],
    "G5M-MS": ["G5M-MS", this.MSG5M_standards_dump],
    "G6E-MS": ["G6E-MS", this.MSG6E_standards_dump],
    "G6M-MS": ["G6M-MS", this.MSG6M_standards_dump],
    "G7E-MS": ["G7E-MS", this.MSG7E_standards_dump],
    "G7M-MS": ["G7M-MS", this.MSG7M_standards_dump],
    "G8E-MS": ["G8E-MS", this.MSG8E_standards_dump],
    "G8M-MS": ["G8M-MS", this.MSG8M_standards_dump],
    "KE-NJ": ["KE-NJ", this.NJKE_standards_dump],
    "KM-NJ": ["KM-NJ", this.NJKM_standards_dump],
    "KS-NJ": ["KS-NJ", this.NJKS_standards_dump],
    "G1E-NJ": ["G1E-NJ", this.NJG1E_standards_dump],
    "G1M-NJ": ["G1M-NJ", this.NJG1M_standards_dump],
    "G1S-NJ": ["G1S-NJ", this.NJG1S_standards_dump],
    "G2E-NJ": ["G2E-NJ", this.NJG2E_standards_dump],
    "G2M-NJ": ["G2M-NJ", this.NJG2M_standards_dump],
    "G2S-NJ": ["G2S-NJ", this.NJG2S_standards_dump],
    "G3E-NJ": ["G3E-NJ", this.NJG3E_standards_dump],
    "G3M-NJ": ["G3M-NJ", this.NJG3M_standards_dump],
    "G3S-NJ": ["G3S-NJ", this.NJG3S_standards_dump],
    "G4E-NJ": ["G4E-NJ", this.NJG4E_standards_dump],
    "G4M-NJ": ["G4M-NJ", this.NJG4M_standards_dump],
    "G4S-NJ": ["G4S-NJ", this.NJG4S_standards_dump],
    "G5E-NJ": ["G5E-NJ", this.NJG5E_standards_dump],
    "G5M-NJ": ["G5M-NJ", this.NJG5M_standards_dump],
    "G5S-NJ": ["G5S-NJ", this.NJG5S_standards_dump],
    "G6E-NJ": ["G6E-NJ", this.NJG6E_standards_dump],
    "G6M-NJ": ["G6M-NJ", this.NJG6M_standards_dump],
    "G7E-NJ": ["G7E-NJ", this.NJG7E_standards_dump],
    "G7M-NJ": ["G7M-NJ", this.NJG7M_standards_dump],
    "G8E-NJ": ["G8E-NJ", this.NJG8E_standards_dump],
    "G8M-NJ": ["G8M-NJ", this.NJG8M_standards_dump],
    "MSS-NJ": ["MSS-NJ", this.NJMSS_standards_dump],
    "PE-NY": ["PE-NY", this.NYPE_standards_dump],
    "PM-NY": ["PM-NY", this.NYPM_standards_dump],
    "KE-NY": ["KE-NY", this.NYKE_standards_dump],
    "KM-NY": ["KM-NY", this.NYKM_standards_dump],
    "G1E-NY": ["G1E-NY", this.NYG1E_standards_dump],
    "G1M-NY": ["G1M-NY", this.NYG1M_standards_dump],
    "G2E-NY": ["G2E-NY", this.NYG2E_standards_dump],
    "G2M-NY": ["G2M-NY", this.NYG2M_standards_dump],
    "G3E-NY": ["G3E-NY", this.NYG3E_standards_dump],
    "G3M-NY": ["G3M-NY", this.NYG3M_standards_dump],
    "G4E-NY": ["G4E-NY", this.NYG4E_standards_dump],
    "G4M-NY": ["G4M-NY", this.NYG4M_standards_dump],
    "G5E-NY": ["G5E-NY", this.NYG5E_standards_dump],
    "G5M-NY": ["G5M-NY", this.NYG5M_standards_dump],
    "G6E-NY": ["G6E-NY", this.NYG6E_standards_dump],
    "G6M-NY": ["G6M-NY", this.NYG6M_standards_dump],
    "G7E-NY": ["G7E-NY", this.NYG7E_standards_dump],
    "G7M-NY": ["G7M-NY", this.NYG7M_standards_dump],
    "G8E-NY": ["G8E-NY", this.NYG8E_standards_dump],
    "G8M-NY": ["G8M-NY", this.NYG8M_standards_dump],
    "HSE1-NY": ["HSE1-NY", this.NYHSE1_standards_dump],
    "HSE2-NY": ["HSE2-NY", this.NYHSE2_standards_dump],
    "HSMA1-NY": ["SMA1-NY", this.NYHSMA1_standards_dump],
    "HSMG-NY": ["HSMG-NY", this.NYHSMG_standards_dump],
    "HSMA2-NY": ["HSMA2-NY", this.NYHSMA2_standards_dump],
    "G3E-PA": ["G3E-PA", this.PAG3E_standards_dump],
    "G3M-PA": ["G3M-PA", this.PAG3M_standards_dump],
    "G4E-PA": ["G4E-PA", this.PAG4E_standards_dump],
    "G4M-PA": ["G4M-PA", this.PAG4M_standards_dump],
    "G4S-PA": ["G4S-PA", this.PAG4S_standards_dump],
    "G5E-PA": ["G5E-PA", this.PAG5E_standards_dump],
    "G5M-PA": ["G5M-PA", this.PAG5M_standards_dump],
    "G6E-PA": ["G6E-PA", this.PAG6E_standards_dump],
    "G6M-PA": ["G6M-PA", this.PAG6M_standards_dump],
    "G7E-PA": ["G7E-PA", this.PAG7E_standards_dump],
    "G7M-PA": ["G7M-PA", this.PAG7M_standards_dump],
    "G8E-PA": ["G8E-PA", this.PAG8E_standards_dump],
    "G8M-PA": ["G8M-PA", this.PAG8M_standards_dump],
    "G8S-PA": ["G8S-PA", this.PAG8S_standards_dump],
    "KE-RI": ["KE-RI", this.RIKE_standards_dump],
    "KM-RI": ["KM-RI", this.RIKM_standards_dump],
    "G1E-RI": ["G1E-RI", this.RIG1E_standards_dump],
    "G1M-RI": ["G1M-RI", this.RIG1M_standards_dump],
    "G2E-RI": ["G2E-RI", this.RIG2E_standards_dump],
    "G2M-RI": ["G2M-RI", this.RIG2M_standards_dump],
    "G3E-RI": ["G3E-RI", this.RIG3E_standards_dump],
    "G3M-RI": ["G3M-RI", this.RIG3M_standards_dump],
    "G4E-RI": ["G4E-RI", this.RIG4E_standards_dump],
    "G4M-RI": ["G4M-RI", this.RIG4M_standards_dump],
    "G5E-RI": ["G5E-RI", this.RIG5E_standards_dump],
    "G5M-RI": ["G5M-RI", this.RIG5M_standards_dump],
    "G6E-RI": ["G6E-RI", this.RIG6E_standards_dump],
    "G6M-RI": ["G6M-RI", this.RIG6M_standards_dump],
    "G7E-RI": ["G7E-RI", this.RIG7E_standards_dump],
    "G7M-RI": ["G7M-RI", this.RIG7M_standards_dump],
    "G8E-RI": ["G8E-RI", this.RIG8E_standards_dump],
    "G8M-RI": ["G8M-RI", this.RIG8M_standards_dump],
    "HSE1-RI": ["HSE1-RI", this.RIHSE2_standards_dump],
    "HSE2-RI": ["HSE2-RI", this.RIHSE2_standards_dump],
    "HSMA-RI": ["HSMA-RI", this.RIHSMA_standards_dump],
    "HSMF-RI": ["HSMF-RI", this.RIHSMF_standards_dump],
    "HSMG-RI": ["HSMG-RI", this.RIHSMG_standards_dump],
    "HSMM-RI": ["HSMM-RI", this.RIHSMM_standards_dump],
    "HSMN-RI": ["HSMN-RI", this.RIHSMN_standards_dump],
    "HSMS-RI": ["HSMS-RI", this.RIHSMS_standards_dump],
    "KE-SC": ["KE-SC", this.SCKE_standards_dump],
    "KM-SC": ["KM-SC", this.SCKM_standards_dump],
    "KS-SC": ["KS-SC", this.SCKS_standards_dump],
    "G1E-SC": ["G1E-SC", this.SCG1E_standards_dump],
    "G1M-SC": ["G1M-SC", this.SCG1M_standards_dump],
    "G1S-SC": ["G1S-SC", this.SCG1S_standards_dump],
    "G2E-SC": ["G2E-SC", this.SCG2E_standards_dump],
    "G2M-SC": ["G2M-SC", this.SCG2M_standards_dump],
    "G2S-SC": ["G2S-SC", this.SCG2S_standards_dump],
    "G3E-SC": ["G3E-SC", this.SCG3E_standards_dump],
    "G3M-SC": ["G3M-SC", this.SCG3M_standards_dump],
    "G3S-SC": ["G3S-SC", this.SCG3S_standards_dump],
    "G4E-SC": ["G4E-SC", this.SCG4E_standards_dump],
    "G4M-SC": ["G4M-SC", this.SCG4M_standards_dump],
    "G4S-SC": ["G4S-SC", this.SCG4S_standards_dump],
    "G5E-SC": ["G5E-SC", this.SCG5E_standards_dump],
    "G5M-SC": ["G5M-SC", this.SCG5M_standards_dump],
    "G5S-SC": ["G5S-SC", this.SCG5S_standards_dump],
    "G6E-SC": ["G6E-SC", this.SCG6E_standards_dump],
    "G6M-SC": ["G6M-SC", this.SCG6M_standards_dump],
    "G6S-SC": ["G6S-SC", this.SCG6S_standards_dump],
    "G7E-SC": ["G7E-SC", this.SCG7E_standards_dump],
    "G7M-SC": ["G7M-SC", this.SCG7M_standards_dump],
    "G7S-SC": ["G7S-SC", this.SCG7S_standards_dump],
    "G8E-SC": ["G8E-SC", this.SCG8E_standards_dump],
    "G8M-SC": ["G8M-SC", this.SCG8M_standards_dump],
    "G8S-SC": ["G8S-SC", this.SCG8S_standards_dump],
    "KE-TN": ["KE-TN", this.TNKE_standards_dump],
    "KM-TN": ["KM-TN", this.TNKM_standards_dump],
    "KS-TN": ["KS-TN", this.TNKS_standards_dump],
    "G1E-TN": ["G1E-TN", this.TNG1E_standards_dump],
    "G1M-TN": ["G1M-TN", this.TNG1M_standards_dump],
    "G1S-TN": ["G1S-TN", this.TNG1S_standards_dump],
    "G2E-TN": ["G2E-TN", this.TNG2E_standards_dump],
    "G2M-TN": ["G2M-TN", this.TNG2M_standards_dump],
    "G2S-TN": ["G2S-TN", this.TNG2S_standards_dump],
    "G3E-TN": ["G3E-TN", this.TNG3E_standards_dump],
    "G3M-TN": ["G3M-TN", this.TNG3M_standards_dump],
    "G3S-TN": ["G3S-TN", this.TNG3S_standards_dump],
    "G4E-TN": ["G4E-TN", this.TNG4E_standards_dump],
    "G4M-TN": ["G4M-TN", this.TNG4M_standards_dump],
    "G4S-TN": ["G4S-TN", this.TNG4S_standards_dump],
    "G5E-TN": ["G5E-TN", this.TNG5E_standards_dump],
    "G5M-TN": ["G5M-TN", this.TNG5M_standards_dump],
    "G5S-TN": ["G5S-TN", this.TNG5S_standards_dump],
    "G6E-TN": ["G6E-TN", this.TNG6E_standards_dump],
    "G6M-TN": ["G6M-TN", this.TNG6M_standards_dump],
    "G6S-TN": ["G6S-TN", this.TNG6S_standards_dump],
    "G7E-TN": ["G7E-TN", this.TNG7E_standards_dump],
    "G7M-TN": ["G7M-TN", this.TNG7M_standards_dump],
    "G7S-TN": ["G7S-TN", this.TNG7S_standards_dump],
    "G8E-TN": ["G8E-TN", this.TNG8E_standards_dump],
    "G8M-TN": ["G8M-TN", this.TNG8M_standards_dump],
    "G8S-TN": ["G8S-TN", this.TNG8S_standards_dump],
    "HSMA1-TN": ["HSMA1-TN", this.TNHSMA1_standards_dump],
    "HSMA2-TN": ["HSMA2-TN", this.TNHSMA2_standards_dump],
    "HSSB1-TN": ["HSSB1-TN", this.TNHSSB1_standards_dump],
    "HSE1-TN": ["HSE1-TN", this.TNHSE1_standards_dump],
    "HSE2-TN": ["HSE2-TN", this.TNHSE2_standards_dump],
    "HSMG-TN": ["HSMG-TN", this.TNHSMG_standards_dump],
    "KR-TX": ["KR-TX", this.TXKR_standards_dump],
    "KM-TX": ["KM-TX", this.TXKM_standards_dump],
    "G1R-TX": ["G1R-TX", this.TXG1R_standards_dump],
    "G1M-TX": ["G1M-TX", this.TXG1M_standards_dump],
    "G2R-TX": ["G2R-TX", this.TXG2R_standards_dump],
    "G2M-TX": ["G2M-TX", this.TXG2M_standards_dump],
    "G3R-TX": ["G3R-TX", this.TXG3R_standards_dump],
    "G3M-TX": ["G3M-TX", this.TXG3M_standards_dump],
    "G4R-TX": ["G4R-TX", this.TXG4R_standards_dump],
    "G4M-TX": ["G4M-TX", this.TXG4M_standards_dump],
    "G5R-TX": ["G5R-TX", this.TXG5R_standards_dump],
    "G5M-TX": ["G5M-TX", this.TXG5M_standards_dump],
    "G6R-TX": ["G6R-TX", this.TXG6R_standards_dump],
    "G6M-TX": ["G6M-TX", this.TXG6M_standards_dump],
    "G7R-TX": ["G7R-TX", this.TXG7R_standards_dump],
    "G7M-TX": ["G7M-TX", this.TXG7M_standards_dump],
    "G8R-TX": ["G8R-TX", this.TXG8R_standards_dump],
    "G8M-TX": ["G8M-TX", this.TXG8M_standards_dump],
    "HSE1-TX": ["HSE1-TX", this.TXHSE1_standards_dump],
    "HSE2-TX": ["HSE2-TX", this.TXHSE2_standards_dump],
    "HSE3-TX": ["HSE3-TX", this.TXHSE3_standards_dump],
    "HSE4-TX": ["HSE4-TX", this.TXHSE4_standards_dump],
    "HSMA1-TX": ["HSMA1-TX", this.TXHSMA1_standards_dump],
    "HSMA2-TX": ["HSMA2-TX", this.TXHSMA2_standards_dump],
    "HSMG-TX": ["HSMG-TX", this.TXHSMG_standards_dump],
    "HSMP-TX": ["HSMP-TX", this.TXHSMP_standards_dump],
    "HSMS-TX": ["HSMS-TX", this.TXHSMS_standards_dump],
    "SAT-M": ["SAT-M", this.SATM_standards_dump],
    "SAT-RW": ["SAT-RW", this.SATRW_standards_dump]
  };

  dump_count = 0;

  favorite_std_set: string[][] = [];
  filtered_set: string[] = this.exam_set;
  filtered_exam_num = 0;
  filtered_prob_num = 0;
  generate_message = "";

  problems_sequence: number[] = [];
  ordered_dump: { [key: number]: { 'Number': any, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = {};
  exam_dump: { [key: number]: { 'Number': any, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = {};
  refsheet_source: string = '';
  st_refsheet_source: string = '';
  supp_dump: any = {};
  supp_st_dump: any = {};
  random_index = 0
  random_list: string[] = [];

  exam_key: any[] = [];

  problem_number = 1;
  max_problem_number = 1;
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
  unique_choices: string[] = [];

  exam_submission: { [key: number]: { 'Number': number, 'Topics': string[], 'SubTopics': string[], 'Choice': string[][], 'Correct': string[][], 'Rationale': string[][], 'Attempts': number[], 'Path': string[][][], 'Seconds': number, 'Time': string, 'Flags': boolean[] } } = {};

  exam_submission_list: any[] = [];
  wrong_submission_list: any[] = [];
  number_correct = 0;
  correct_percent = 0;
  topic_breakdown: { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Seconds': number, 'Time': string, 'Subs': { [key: string]: { 'Correct': number, 'Incorrect': number, 'Total': number, 'Percent': number, 'Seconds': number, 'Time': string } } } } = {};

  selected_quiz = "";
  // selected_topic = "";
  selected_subtopic = "";
  standard_id = '';
  standard_fav = false;
  includes_standard = false;
  subtopic_problem_count = 0;
  subtopic_problem_number = 0;
  subtopic_search_dump: { [key: number]: { 'Number': any, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = {};
  subtopic_problem_selection: any[] = [];
  subtopic_problem_attempts: number[] = [];
  subtopic_attempt_path: any[] = [];
  subtopic_attempt_response: string[] = [];
  subtopic_attempt_explanation: any[] = [];

  public_quiz_results: any = {};

  quiz_page: string = "default";
  cquiz_page: string = "";
  quiz_public = false;
  prob_images: { [key: number]: any } = {};
  image_index: number = 0;
  image_choice_index: string = '';
  prob_statuses: { [key: number]: any } = {};
  incomplete_probs: any[] = [];
  content_hover: boolean[][] = [];
  choices_hover: boolean[][] = [];

  problem_types: { [key: string]: any[] } = {
    "MC": ["Multiple Choice", 4],
    "MS": ["Multiple Select", 4],
    "FR": ["Free Response", 0]
    // "LR": ["Long Response", 0],
    // "IM": ["Inline Matching", 4],
    // "IMC": ["Inline Multiple Choice", 4],
    // "IMS": ["Inline Multiple Select", 4],
    // "IDD": ["Inline Drop Down", 4],
    // "OM": ["Order Matching", 4],
    // "CM": ["Category Matching", 4],
    // "LP": ["Line Plot", 4],
    // "GP": ["Graph Plot", 0],
    // "T": ["Table", 4],
  };

  content_types: string[] = ['Text', 'Image'];

  default_problem: { 'Number': any, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } = {
    "Number": 0,
    "Type": "MC",
    "NumChoices": 4,
    "Topics": [],
    "SubTopics": [],
    "SuppContent": [],
    "Explain": false,
    "Content": [
      ""
    ],
    "AnswerChoices": {
      "A": {
        "Choice": "",
        "Key": {
          "Correct": false,
          "Rationale": "",
          "Percent": 0
        }
      },
      "B": {
        "Choice": "",
        "Key": {
          "Correct": false,
          "Rationale": "",
          "Percent": 0
        }
      },
      "C": {
        "Choice": "",
        "Key": {
          "Correct": false,
          "Rationale": "",
          "Percent": 0
        }
      },
      "D": {
        "Choice": "",
        "Key": {
          "Correct": false,
          "Rationale": "",
          "Percent": 0
        }
      }
    },
    "Parts": {}
  };

  default_choice: any = {
    "Choice": "",
    "Key": {
      "Correct": false,
      "Rationale": "",
      "Percent": 0
    }
  };

  choices_list = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',]

  state_labels: { [key: string]: string } = {
    "CC": "Common Core",
    "CO": "Colorado",
    "FL": "Florida",
    "MA": "Massachusetts",
    "MD": "Maryland",
    "MS": "Mississippi",
    "NJ": "New Jersey",
    "NY": "New York",
    "PA": "Pennsylvania",
    "RI": "Rhode Island",
    "TN": "Tennessee",
    "TX": "Texas"
  };

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
    "Sciences": "Science",
    "Science": "Science",
    "Social Studies": "Social Studies",
    "U.S. History": "U.S. History"
  };

  sub_subjects: { [key: string]: string[] } = {
    "English Language Arts": ["English Language Arts", "English I", "English II"],
    "Mathematics": ["Mathematics", "Algebra I", "Algebra II", 'Geometry'],
    "Sciences": ["Sciences", "Science", "Biology", "Physics"],
    "Social Studies": ["Social Studies", "U.S. History"],
    "Reading & Writing": ["Reading & Writing", "English Reading", "English Writing"],
  };

  subject_map: { [key: string]: string[] } = {
    "English Language Arts": ["English Language Arts", "English Language Arts & Reading", "Reading, Writing & Communication", "Reading & Writing", "English Reading", "English Writing", "English I", "English II"],
    "Social Studies": ["Social Studies", "U.S. History"],
    "Sciences": ["Sciences", "Science"],
    "Biology I": ["Biology", "Science - Biology", "Science - Biology 1"],
    "Biology II": ["Science - Biology 2"],
    "Mathematics": ["Mathematics"],
    "Geometry": ["Geometry", "Mathematics - Geometry"],
    "Algebra": ["Algebra I", "Mathematics - Algebra", "Mathematics - Algebra 1"],
    "Algebra II": ["Algebra II", "Mathematics - Algebra 2"],
    "Functions": ["Mathematics - Functions"],
    "Modeling": ["Mathematics - Modeling"],
    "Number & Quantity": ["Mathematics - Number & Quantity"],
    "Statistics": ["Mathematics - Statistics & Probability", "Mathematics - Statistics"],
    "Precalculus": ["Mathematics - Precalculus"],
    "Physics": ["Physics", "Science - Introductory Physics"],
    "Earth & Space": ["Science - Earth & Space Science"],
    "Engineering": ["Science - Technology/Engineering"]
  }

  constructor(public router: Router, public authService: AuthService, private http: HttpClient, private sanitizer: DomSanitizer) { }

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
      this.expand_overview = false;
    }
    else {
      this.expand_topics = true;
      this.expand_overview = true;
    }
  }

  master_filters(filts: string[]) {
    var master_filts = []
    if (filts != undefined) {
      for (let filt of filts) {
        if (Object.keys(this.sub_subjects).includes(filt)) {
          master_filts.push(filt);
        }
      }
    }
    return master_filts;
  }

  quiz_results_entries() {
    return (Object.keys(this.public_quiz_results));
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

  toggle_topic(val: string) {
    if (!this.topic_filters.includes(val)) {
      this.topic_filters.push(val)
    }
    else {
      if (this.topic_filters.indexOf(val) != -1) {
        this.topic_filters.splice(this.topic_filters.indexOf(val), 1);
      }
      else {
        this.topic_filters.pop()
      }
    }
    this.filter_exams();
  }

  select_curriculum(curriculum: string) {
    this.selected_curriculum = curriculum;
    this.selected_grade = "";
    this.selected_subject = ""
    this.selected_topic = "";
    this.state_grades = [];
    for (const [id, dump] of Object.entries(this.standards_attribute_dump)) {
      if (id.endsWith('-' + this.selected_curriculum)) {
        for (let grade of this.standards_attribute_dump[id].Grades) {
          if (!this.state_grades.includes(grade)) {
            this.state_grades.push(grade);
          }
        }
      }
    }
  }

  select_grade(grade: string) {
    this.selected_grade = grade;
    this.selected_subject = "";
    this.state_subjects = [];
    for (const [id, dump] of Object.entries(this.standards_attribute_dump)) {
      if (id.endsWith('-' + this.selected_curriculum) && this.standards_attribute_dump[id].Grades.includes(grade)) {
        for (const [name, labels] of Object.entries(this.subject_map)) {
          if (labels.includes(this.standards_attribute_dump[id].Subject) && !this.state_subjects.includes(name)) {
            this.state_subjects.push(name);
          }
        }
      }
    }
  }

  select_subject(subject: string) {
    this.selected_subject = subject;
    this.selected_topic = '';
    this.subject_exams = [];
    this.topics = [];
    for (const [id, dump] of Object.entries(this.standards_attribute_dump)) {
      for (const [name, labels] of Object.entries(this.subject_map)) {
        if (id.endsWith('-' + this.selected_curriculum) && this.standards_attribute_dump[id].Grades.includes(this.selected_grade) && labels.includes(this.standards_attribute_dump[id].Subject) && name == this.selected_subject) {
          this.standards_id = id;
          this.standards_dump = this.s_dump_dict[id][1];
          for (let domain of this.standards_dump.Standards) {
            this.topics.push(domain.Label);
          }
        }
      }
    }
  }

  select_topic(topic: string) {
    this.default_standard = ['', ''];
    if (this.selected_topic != topic) {
      this.selected_topic = topic;
      if (this.enable_standards) {
        this.default_problem.Topics.pop();
        this.default_problem.Topics.push(topic);
      }
    }
    else {
      this.selected_topic = '';
      if (this.enable_standards) {
        this.default_problem.Topics.pop();
        this.default_problem.Topics.push('');
      }

    }
  }

  get_topic_subs(topic: string) {
    var subs: { [key: string]: string } = {};
    this.standards_dump = this.s_dump_dict[this.standards_id][1];
    for (let domain of this.standards_dump.Standards) {
      if (domain.Label == topic) {
        for (let cluster of domain.Subs) {
          subs[cluster.Key] = cluster.Label;
          for (let standard of cluster.Subs) {
            subs[standard.Key] = standard.Label;
            for (let substandard of standard.Subs) {
              subs[substandard.Key] = substandard.Label;
              for (let subsubstandard of substandard.Subs) {
                subs[subsubstandard.Key] = subsubstandard.Label;
              }
            }
          }
        }
      }
    }
    return (subs as any);
  }

  toggle_standards() {
    this.enable_standards = !this.enable_standards;
    if (this.enable_standards) {
      this.default_problem.Topics.push(this.selected_topic);
      this.default_problem.SubTopics.push('');
    }
    else {
      this.default_problem.Topics.pop();
      this.default_problem.SubTopics.pop();
    }
  }

  set_default_standard(id: string, standard: string) {
    this.default_standard = [id, standard];
    this.default_problem.SubTopics.pop();
    this.default_problem.SubTopics.push(standard);
    if (Object.keys(this.exam_dump).length > 0) {
      for (let i = 1; i <= this.exam_length; i++) {
        this.exam_dump[i].SubTopics.pop();
        this.exam_dump[i].SubTopics.push(standard);
      }
    }
    console.log(this.default_problem);
  }

  set_default_probtype(type: string) {
    this.default_probtype = type;
    this.default_problem.Type = this.get_probtype_key(type);
    this.default_problem.AnswerChoices = {};
    if (+this.problem_types[this.get_probtype_key(type)][1] > 0) {
      this.default_problem.NumChoices = +this.default_numchoices;
      for (let i = 0; i < +this.default_numchoices; i++) {
        this.default_problem.AnswerChoices[this.choices_list[i]] = JSON.parse(JSON.stringify(this.default_choice));
      }
    }
    else if (this.get_probtype_key(type) == 'FR') {
      this.default_problem.AnswerChoices['KEY'] = JSON.parse(JSON.stringify(this.default_choice));
      this.default_problem.NumChoices = 0;
    }
    if (Object.keys(this.exam_dump).length > 0) {
      for (let n = 1; n <= this.exam_length; n++) {
        this.exam_dump[n].Type = this.get_probtype_key(type);
        this.exam_dump[n].AnswerChoices = {};
        if (+this.problem_types[this.get_probtype_key(type)][1] > 0) {
          this.exam_dump[n].NumChoices = +this.default_numchoices;
          for (let i = 0; i < +this.default_numchoices; i++) {
            this.exam_dump[n].AnswerChoices[this.choices_list[i]] = JSON.parse(JSON.stringify(this.default_choice));
          }
        }
        else {
          this.exam_dump[n].NumChoices = 0;
        }
      }
    }
    setTimeout(() => {
      for (let i = 1; i <= this.exam_length; i++) {
        const probtypeSel: string = "probtypeInput" + '' + i;
        (document.getElementById(probtypeSel) as any).value = this.problem_types[this.exam_dump[i].Type][0];
      }
    }, 25);
    console.log(this.default_problem);
  }

  get_probtype_key(val: string) {
    var matched_key = "";
    for (let standard of Object.keys(this.problem_types)) {
      if (this.problem_types[standard][0] == val) {
        matched_key = standard;
      }
    }
    return (matched_key);
  }

  set_default_numchoices(num: number) {
    const initial_num: number = +this.default_numchoices;
    if (num < 2) {
      this.default_numchoices = 2;
    }
    else if (num > 10) {
      this.default_numchoices = 10;
    }
    else {
      this.default_numchoices = num;
    }
    if (this.default_numchoices != initial_num) {
      // var prob_dump: any = {};
      // for (const [k, val] of Object.entries(this.default_problem)) {
      //   prob_dump[k] = val;
      // }
      // prob_dump.NumChoices = this.default_numchoices;
      // for (let i = 0; i < this.default_numchoices; i++) {
      //   prob_dump.AnswerChoices[this.choices_list[i]] = this.default_choice;
      // }
      // this.default_problem = (prob_dump as any);
      this.default_problem.NumChoices = this.default_numchoices;
      this.default_problem.AnswerChoices = {};
      for (let i = 0; i < this.default_numchoices; i++) {
        this.default_problem.AnswerChoices[this.choices_list[i]] = JSON.parse(JSON.stringify(this.default_choice));
      }
      if (Object.keys(this.exam_dump).length > 0) {
        for (let n = 1; n <= this.exam_length; n++) {
          if (+this.problem_types[this.exam_dump[n].Type][1] > 0) {
            this.exam_dump[n].NumChoices = this.default_numchoices;
            this.exam_dump[n].AnswerChoices = {};
            for (let i = 0; i < this.default_numchoices; i++) {
              this.exam_dump[n].AnswerChoices[this.choices_list[i]] = JSON.parse(JSON.stringify(this.default_choice));
            }
          }
        }
        setTimeout(() => {
          for (let i = 1; i <= this.exam_length; i++) {
            const numchoicesSel: string = "choicesEntry" + '' + i;
            const numchoicesSliderSel: string = "choicesSlider" + '' + i;
            (document.getElementById(numchoicesSel) as any).value = this.exam_dump[i].NumChoices;
            (document.getElementById(numchoicesSliderSel) as any).value = this.exam_dump[i].NumChoices;
          }
        }, 25);
      }
    }
    console.log(this.exam_dump);
  }

  set_problem_num(num: number) {
    const initial_num: number = this.exam_length;
    if (num < 5) {
      this.exam_length = 5;
    }
    else if (num > 50) {
      this.exam_length = 50;
    }
    else {
      this.exam_length = num;
    }
    if (this.exam_length != initial_num) {
      const initial_dump = JSON.parse(JSON.stringify(this.exam_dump));
      const initial_images = JSON.parse(JSON.stringify(this.prob_images));
      const initial_statuses = JSON.parse(JSON.stringify(this.prob_statuses));
      const initial_content = JSON.parse(JSON.stringify(this.content_hover));
      const initial_choices = JSON.parse(JSON.stringify(this.choices_hover));
      this.problems_loaded = false;
      this.exam_dump = {};
      this.prob_images = {};
      this.prob_statuses = {};
      for (let i = 1; i <= this.exam_length; i++) {
        if (Object.keys(initial_dump).includes('' + i)) {
          this.exam_dump[i] = JSON.parse(JSON.stringify(initial_dump[i]));
          this.content_hover[i] = JSON.parse(JSON.stringify(initial_content[i]));
          this.choices_hover[i] = JSON.parse(JSON.stringify(initial_choices[i]));
          if (Object.keys(initial_images).includes('' + i)) {
            var new_images: any = {};
            for (const [k, image] of Object.entries(initial_images[i])) {
              new_images[k] = this.save_dupe_image((image as any).changingThisBreaksApplicationSecurity as string);
            }
            this.prob_images[i] = new_images;
          }
          this.prob_statuses[i] = JSON.parse(JSON.stringify(initial_statuses[i]));
          this.exam_dump[i].Number = i;
        }
        else {
          this.exam_dump[i] = JSON.parse(JSON.stringify(this.default_problem));
          this.content_hover[i] = [false];
          var choices: boolean[] = [];
          for (let i = 1; i <= this.default_numchoices; i++) {
            choices.push(false);
          }
          this.choices_hover[i] = choices;
          this.prob_statuses[i] = [false, false];
          this.exam_dump[i].Number = i;
        }
      }
      this.cquiz_page = "content";
      this.problems_loaded = true;
      setTimeout(() => {
        for (let i = 1; i <= this.exam_length; i++) {
          if (this.enable_standards) {
            const standardSel: string = "standardInput" + '' + i;
            (document.getElementById(standardSel) as any).value = Object.keys(this.get_topic_subs(this.selected_topic))[Object.values(this.get_topic_subs(this.selected_topic)).indexOf(this.exam_dump[i].SubTopics[0])] + ': ' + this.exam_dump[i].SubTopics[0];
          }
          const probtypeSel: string = "probtypeInput" + '' + i;
          (document.getElementById(probtypeSel) as any).value = this.problem_types[this.exam_dump[i].Type][0];
        }
        this.scroll_top();
      }, 25);
    }
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

  get_standard_sel(num: number) {
    const standardSel: string = "standardInput" + '' + num;
    var dropdown: any = document.getElementById(standardSel);
    return dropdown.value;
  }

  get_probtype_sel(num: number) {
    const probtypeSel: string = "probtypeInput" + '' + num;
    var dropdown: any = document.getElementById(probtypeSel);
    return dropdown.value;
  }

  get_numchoices_sel(num: number) {
    const numchoicesSel: string = "choicesEntry" + '' + num;
    var dropdown: any = document.getElementById(numchoicesSel);
    return dropdown.value;
  }

  get_numchoices_slider_sel(num: number) {
    const numchoicesSel: string = "choicesSlider" + '' + num;
    var slider: any = document.getElementById(numchoicesSel);
    return slider.value;
  }

  get_contenttype_sel(num: number, index: number) {
    const contenttypeSel: string = "contenttypeInput" + '' + num + '-' + '' + index;
    var dropdown: any = document.getElementById(contenttypeSel);
    return dropdown.value;
  }

  get_choicetype_sel(num: number, index: string) {
    const choicetypeSel: string = "choicetypeInput" + '' + num + '-' + index;
    var dropdown: any = document.getElementById(choicetypeSel);
    return dropdown.value;
  }

  get_content_keys(content: any) {
    var index: number = 0;
    var keys: number[] = []
    for (let block of content) {
      keys.push(index);
      index += 1;
    }
    return (keys);
  }

  get_choice_keys(choices: any) {
    return (Object.keys(choices) as string[]);
  }

  get_add_images_sel(num: number) {
    const addimagesSel: string = "uploadProbImage" + '' + num;
    var input: any = document.getElementById(addimagesSel);
    return (input.files as any);
  }

  get_add_imagesinv_sel(num: number) {
    const addimagesinvSel: string = "uploadProbImageInv" + '' + num;
    var input: any = document.getElementById(addimagesinvSel);
    return (input.files as any);
  }

  get_add_imageschinv_sel(num: number) {
    const addimageschinvSel: string = "uploadChoiceImageInv" + '' + num;
    var input: any = document.getElementById(addimageschinvSel);
    return (input.files as any);
  }

  change_prob_standard(num: number) {
    for (let i = 1; i <= this.exam_length; i++) {
      if (i == num) {
        // var prob_dump: any = {};
        // for (const [k, val] of Object.entries(this.exam_dump[num])) {
        //   prob_dump[k] = (val as any);
        // }
        this.exam_dump[i].SubTopics.pop();
        this.exam_dump[i].SubTopics.push(this.get_standard_sel(num).slice(this.get_standard_sel(num).split(': ')[0].length + 2));
        // this.exam_dump[num] = { ...prob_dump };
      }
    }
  }

  set_probtype(num: number, type: string) {
    const initial_type: string = this.exam_dump[num].Type;
    if (type != initial_type) {
      this.exam_dump[num].Type = type;
      this.exam_dump[num].NumChoices = 0;
      this.exam_dump[num].AnswerChoices = {};
      if (+this.problem_types[type][1] > 0) {
        this.exam_dump[num].NumChoices = +this.default_numchoices;
        for (let i = 0; i < +this.default_numchoices; i++) {
          this.exam_dump[num].AnswerChoices[this.choices_list[i]] = JSON.parse(JSON.stringify(this.default_choice));
        }
      }
      else if (type == 'FR') {
        this.exam_dump[num].AnswerChoices['KEY'] = JSON.parse(JSON.stringify(this.default_choice));
      }
    }
  }

  set_prob_numchoices(num: number, numchoices: number) {
    const initial_num: number = this.exam_dump[num].NumChoices;
    var final_num: number = 0;
    if (numchoices < 2) {
      final_num = 2;
    }
    else if (numchoices > 10) {
      final_num = 10;
    }
    else {
      final_num = numchoices;
    }
    if (final_num != initial_num) {
      this.exam_dump[num].NumChoices = final_num;
      this.exam_dump[num].AnswerChoices = {};
      this.choices_hover[num] = [];
      for (let i = 0; i < final_num; i++) {
        this.exam_dump[num].AnswerChoices[this.choices_list[i]] = JSON.parse(JSON.stringify(this.default_choice));
        this.choices_hover[num].push(false);
      }
    }
  }

  set_content_type(num: number, index: number, type: string) {
    if (type == 'Text') {
      console.log();
    }
    else if (type == 'Image') {
      // this.add_image(num, this.get_add_images_sel(num))
      this.image_index = index;
      const el_id: string = 'uploadProbImageInv' + '' + num;
      var upload: any = document.getElementById(el_id);
      upload.click();
    }
  }

  set_choice_type(num: number, index: string, type: string) {
    if (type == 'Text') {
      console.log();
    }
    else if (type == 'Image') {
      // this.add_image(num, this.get_add_images_sel(num))
      this.image_choice_index = index;
      const el_id: string = 'uploadChoiceImageInv' + '' + num;
      var upload: any = document.getElementById(el_id);
      upload.click();
    }
  }

  add_text(num: number) {
    this.exam_dump[num].Content.push('');
    this.content_hover[num].push(false);
    console.log(this.exam_dump);
  }

  get_text_rows(el: any, blob: string) {
    // element.style.height = "1px";
    // element.style.height = (25+element.scrollHeight)+"px";
    return (Math.max(1, Math.ceil(blob.length / (95))));
  }

  add_image(num: number, index: number, images: any) {
    for (let image of images) {
      if (index == -1) {
        this.exam_dump[num].Content.push('' + image.name);
      }
      else {
        this.exam_dump[num].Content[index] = '' + image.name;
      }
      this.content_hover[num].push(false);
      if (!Object.keys(this.prob_images).includes('' + num)) {
        var image_dump: any = {}
        image_dump['' + image.name] = [this.save_image(image), image];
        this.prob_images[num] = image_dump;
      }
      else {
        this.prob_images[num]['' + image.name] = [this.save_image(image), image];
      }
      this.content_hover[num].push(false);
    }
    console.log(this.prob_images);
  }

  add_choice_image(num: number, index: string, images: any) {
    for (let image of images) {
      if (index == '') {
        // this.exam_dump[num].AnswerChoices[].Choice = ''+image.name;
        console.log();
      }
      else {
        this.exam_dump[num].AnswerChoices[index].Choice = '' + image.name;
      }
      if (!Object.keys(this.prob_images).includes('' + num)) {
        var image_dump: any = {}
        image_dump['' + image.name] = [this.save_image(image), image];
        this.prob_images[num] = image_dump;
      }
      else {
        this.prob_images[num]['' + image.name] = [this.save_image(image), image];
      }
    }
    console.log(this.prob_images);
  }

  save_image(image: any) {
    return (this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(image)) as string);
  }

  save_dupe_image(image: any) {
    return (this.sanitizer.bypassSecurityTrustUrl(image) as string);
  }

  hover_card(num: number, type: string, index: number, hover: boolean) {
    if (type == 'content') {
      this.content_hover[num][index] = hover;
    }
    else if (type == 'choices') {
      this.choices_hover[num][index] = hover;
    }
  }

  hover_delete(num: number, type: string, index: number) {
    if (type == 'content') {
      return (this.content_hover[num][index]);
    }
    else if (type == 'choices') {
      return (this.choices_hover[num][index]);
    }
    else {
      return;
    }
  }

  delete_content(num: number, index: number) {
    this.problems_loaded = false;
    if (this.is_image(this.exam_dump[num].Content[index])) {
      const initial_images = this.prob_images[num]
      var new_images: any = {};
      for (const [k, image] of Object.entries(initial_images)) {
        if (k != this.exam_dump[num].Content[index]) {
          new_images[k] = [this.save_dupe_image(((image as any)[0] as any).changingThisBreaksApplicationSecurity as string), (image as any)[1]];
        }
      }
      this.prob_images[num] = new_images;
    }
    if (index != this.exam_dump[num].Content.length - 1) {
      this.exam_dump[num].Content.splice(index, 1);
      this.content_hover[num].splice(index, 1);
    }
    else {
      this.exam_dump[num].Content.pop();
      this.content_hover[num].pop();
    }
    setTimeout(() => {
      this.problems_loaded = true;
      setTimeout(() => {
        for (let i = 1; i <= this.exam_length; i++) {
          if (this.enable_standards) {
            const standardSel: string = "standardInput" + '' + i;
            (document.getElementById(standardSel) as any).value = Object.keys(this.get_topic_subs(this.selected_topic))[Object.values(this.get_topic_subs(this.selected_topic)).indexOf(this.exam_dump[i].SubTopics[0])] + ': ' + this.exam_dump[i].SubTopics[0];
          }
          const probtypeSel: string = "probtypeInput" + '' + i;
          (document.getElementById(probtypeSel) as any).value = this.problem_types[this.exam_dump[i].Type][0];
        }
      }, 25);
    }, 25);
    console.log(this.exam_dump);
  }

  add_choice(num: number) {
    this.exam_dump[num].AnswerChoices[this.choices_list[this.exam_dump[num].NumChoices]] = JSON.parse(JSON.stringify(this.default_choice));
    this.exam_dump[num].NumChoices += 1;
    this.choices_hover[num].push(false);
  }

  delete_choice(num: number, choice: string) {
    this.problems_loaded = false;
    const initial_prob: any = JSON.parse(JSON.stringify(this.exam_dump[num]));
    var choice_num = 1;
    this.exam_dump[num].AnswerChoices = {}
    for (let i = 1; i <= Object.keys(initial_prob.AnswerChoices).length; i++) {
      if (this.choices_list[i - 1] != choice) {
        this.exam_dump[num].AnswerChoices[this.choices_list[choice_num - 1]] = JSON.parse(JSON.stringify(initial_prob.AnswerChoices[this.choices_list[i - 1]]));
        choice_num += 1;
      }
    }
    this.exam_dump[num].NumChoices -= 1;
    this.choices_hover[num].splice(Object.keys(initial_prob.AnswerChoices).indexOf(choice), 1);
    setTimeout(() => {
      this.problems_loaded = true;
      setTimeout(() => {
        for (let i = 1; i <= this.exam_length; i++) {
          if (this.enable_standards) {
            const standardSel: string = "standardInput" + '' + i;
            (document.getElementById(standardSel) as any).value = Object.keys(this.get_topic_subs(this.selected_topic))[Object.values(this.get_topic_subs(this.selected_topic)).indexOf(this.exam_dump[i].SubTopics[0])] + ': ' + this.exam_dump[i].SubTopics[0];
          }
          const probtypeSel: string = "probtypeInput" + '' + i;
          (document.getElementById(probtypeSel) as any).value = this.problem_types[this.exam_dump[i].Type][0];
        }
      }, 25);
    }, 25);
    console.log(this.exam_dump);
  }

  check_content_complete(num: number) {
    var complete = true;
    for (let block of this.exam_dump[num].Content) {
      if (block == '') {
        complete = false;
      }
    }
    for (let [k, choice] of Object.entries(this.exam_dump[num].AnswerChoices)) {
      if (choice.Choice == '' && k != 'KEY') {
        complete = false;
      }
    }
    if (this.enable_standards && this.exam_dump[num].SubTopics[0] == '') {
      complete = false;
    }
    this.prob_statuses[num][0] = complete;
  }

  check_all_content_complete() {
    var complete = true;
    this.incomplete_probs = [];
    for (let prob of Object.keys(this.exam_dump)) {
      if (!this.prob_statuses[+prob][0]) {
        complete = false;
        this.incomplete_probs.push(prob);
      }
    }
    return (complete);
  }

  check_key_complete(num: number) {
    var complete = false;
    for (let choice of Object.values(this.exam_dump[num].AnswerChoices)) {
      if (choice.Key.Correct) {
        complete = true;
      }
    }
    this.prob_statuses[num][1] = complete;
  }

  check_all_key_complete() {
    var complete = true;
    this.incomplete_probs = [];
    for (let prob of Object.keys(this.exam_dump)) {
      if (!this.prob_statuses[+prob][1]) {
        complete = false;
        this.incomplete_probs.push(prob);
      }
    }
    return (complete);
  }

  add_problem() {
    this.problems_loaded = false;
    this.exam_dump[this.exam_length + 1] = JSON.parse(JSON.stringify(this.default_problem));
    this.exam_dump[this.exam_length + 1].Number = this.exam_length + 1;
    this.prob_statuses[this.exam_length + 1] = [false, false];
    this.content_hover[this.exam_length + 1] = [false];
    var choices: boolean[] = [];
    for (let i = 1; i <= this.exam_length; i++) {
      choices.push(false);
    }
    this.choices_hover[this.exam_length + 1] = choices;
    this.exam_length += 1;
    setTimeout(() => {
      this.problems_loaded = true;
      setTimeout(() => {
        for (let i = 1; i <= this.exam_length; i++) {
          if (this.enable_standards) {
            const standardSel: string = "standardInput" + '' + i;
            (document.getElementById(standardSel) as any).value = Object.keys(this.get_topic_subs(this.selected_topic))[Object.values(this.get_topic_subs(this.selected_topic)).indexOf(this.exam_dump[i].SubTopics[0])] + ': ' + this.exam_dump[i].SubTopics[0];
          }
          const probtypeSel: string = "probtypeInput" + '' + i;
          (document.getElementById(probtypeSel) as any).value = this.problem_types[this.exam_dump[i].Type][0];
        }
      }, 25);
    }, 25);
    console.log(this.exam_dump);
  }

  delete_problem(num: number) {
    this.problems_loaded = false;
    const initial_dump: any = JSON.parse(JSON.stringify(this.exam_dump));
    const initial_images: any = JSON.parse(JSON.stringify(this.prob_images));
    const initial_statuses: any = JSON.parse(JSON.stringify(this.prob_statuses));
    var prob = 1;
    this.exam_dump = {};
    this.prob_images = {};
    this.prob_statuses = {};
    for (let i = 1; i <= this.exam_length; i++) {
      if (i != num) {
        this.exam_dump[prob] = JSON.parse(JSON.stringify(initial_dump[i]));
        if (Object.keys(initial_images).includes('' + i)) {
          var new_images: any = {};
          for (const [k, image] of Object.entries(initial_images[i])) {
            new_images[k] = [this.save_dupe_image(((image as any)[0] as any).changingThisBreaksApplicationSecurity as string), (image as any)[1]];
          }
          this.prob_images[prob] = new_images;
        }
        this.prob_statuses[prob] = JSON.parse(JSON.stringify(initial_statuses[i]));
        this.exam_dump[prob].Number = prob;
        prob += 1;
      }
    }
    this.exam_length -= 1;
    setTimeout(() => {
      this.problems_loaded = true;
      setTimeout(() => {
        for (let i = 1; i <= this.exam_length; i++) {
          if (this.enable_standards) {
            const standardSel: string = "standardInput" + '' + i;
            (document.getElementById(standardSel) as any).value = Object.keys(this.get_topic_subs(this.selected_topic))[Object.values(this.get_topic_subs(this.selected_topic)).indexOf(this.exam_dump[i].SubTopics[0])] + ': ' + this.exam_dump[i].SubTopics[0];
          }
          const probtypeSel: string = "probtypeInput" + '' + i;
          (document.getElementById(probtypeSel) as any).value = this.problem_types[this.exam_dump[i].Type][0];
        }
      }, 25);
    }, 25);
    console.log(this.exam_dump);
  }

  complete_preview() {
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
    this.cquiz_page = 'postquiz';
  }

  is_image(blob: string) {
    return (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp', '.tiff', '.ico'].some(ext => blob.toLowerCase().endsWith(ext)));
  }

  get_refsheet(key: string) {
    // console.log('../../' + this.exam_attribute_dump[key.substring(0, key.indexOf('-'))].RefSheet);
    return ('../../' + this.exam_attribute_dump[key.substring(0, key.indexOf('-'))].RefSheet);
  }

  get_flag_count() {
    var count = 0;
    for (let sub of this.order_numbers()) {
      if (sub <= this.max_problem_number && (this.exam_submission[sub].Attempts[0] != 0) && this.exam_submission[sub].Flags[this.exam_submission[sub].Flags.length - 1]) {
        count += 1;
      }
    }
    return (count)
  }

  get_skip_count() {
    var count = 0;
    for (let sub of this.order_numbers()) {
      if (sub < this.max_problem_number && (this.exam_submission[sub].Attempts[0] == 0)) {
        count += 1;
      }
    }
    return (count)
  }

  order_numbers() {
    return (Array.from({ length: Object.keys(this.exam_dump).length }, (_, i) => i + 1));
  }

  toggle_flag() {
    console.log('flag');
    this.exam_submission[this.problem_number].Flags.push(!this.exam_submission[this.problem_number].Flags[this.exam_submission[this.problem_number].Flags.length - 1]);
    console.log(this.exam_submission[this.problem_number].Flags);
  }

  toggle_button(val: string) {
    if (['English Language Arts', 'Mathematics', 'Sciences', 'Social Studies', 'Reading & Writing'].includes(val)) {
      for (let subval of this.sub_subjects[val]) {
        if (!this.subject_filters.includes(subval)) {
          this.subject_filters.push(subval)
        }
        else {
          if (this.subject_filters.indexOf(subval) != -1) {
            this.subject_filters.splice(this.subject_filters.indexOf(subval), 1);
          }
          else {
            this.subject_filters.pop()
          }
        }
      }
    }
    else if (['Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'High School'].includes(val)) {
      if (['High School'].includes(val)) {
        for (let subval of ['High School', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']) {
          if (!this.grade_filters.includes(subval)) {
            this.grade_filters.push(subval)
          }
          else {
            if (this.grade_filters.indexOf(subval) != -1) {
              this.grade_filters.splice(this.grade_filters.indexOf(subval), 1);
            }
            else {
              this.grade_filters.pop()
            }
          }
        }
      }
      else {
        if (!this.grade_filters.includes(val)) {
          this.grade_filters.push(val)
        }
        else {
          if (this.grade_filters.indexOf(val) != -1) {
            this.grade_filters.splice(this.grade_filters.indexOf(val), 1);
          }
          else {
            this.grade_filters.pop()
          }
        }
      }
    }
    else {
      if (['SAT'].includes(val)) {
        for (let subval of ['SAT', 'PSAT']) {
          if (!this.state_filters.includes(subval)) {
            this.state_filters.push(subval)
          }
          else {
            if (this.state_filters.indexOf(subval) != -1) {
              this.state_filters.splice(this.state_filters.indexOf(subval), 1);
            }
            else {
              this.state_filters.pop()
            }
          }
        }
      }
      else {
        if (!this.state_filters.includes(val)) {
          this.state_filters.push(val)
        }
        else {
          if (this.state_filters.indexOf(val) != -1) {
            this.state_filters.splice(this.state_filters.indexOf(val), 1);
          }
          else {
            this.state_filters.pop()
          }
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

  toggle_length_mode() {
    if (this.length_mode == 'timer') {
      this.length_mode = 'number';
    }
    else if (this.length_mode == 'number') {
      this.length_mode = 'timer';
    }
  }

  set_timer(num: number) {
    if (num < 5) {
      this.exam_timer = 5;
    }
    else if (num > 60) {
      this.exam_timer = 60;
    }
    else {
      this.exam_timer = num;
    }
  }

  filter_exams() {
    this.filtered_set = [];
    this.topics = [];
    this.topics_count = {};
    for (let i = 0; i < this.exam_set.length; i++) {
      if ((this.state_filters.includes(this.exam_attribute_dump[this.exam_set[i]].State) || this.state_filters.includes(this.exam_attribute_dump[this.exam_set[i]].ExamName) || this.state_filters.length == 0) && (this.grade_filters.includes(this.exam_attribute_dump[this.exam_set[i]].Grade) || this.grade_filters.length == 0) && (this.subject_filters.includes(this.exam_attribute_dump[this.exam_set[i]].Subject) || this.subject_filters.length == 0)) {
        this.filtered_set.push(this.exam_set[i]);
      }
    }
    this.filtered_exam_num = this.filtered_set.length;
    this.filtered_prob_num = 0;
    for (let i = 0; i < this.filtered_set.length; i++) {
      this.filtered_prob_num += this.exam_attribute_dump[this.filtered_set[i]].NumQuestions;
      if (!this.exam_attribute_dump[this.filtered_set[i]].HideTopics) {
        for (const [key, val] of Object.entries(this.exam_attribute_dump[this.filtered_set[i]].Topics)) {
          if (!this.topics.includes(key)) {
            this.topics.push(key);
          }
          if (!Object.keys(this.topics_count).includes(key)) {
            this.topics_count[key] = val;
          }
          else {
            this.topics_count[key] += val;
          }
        }
      }
    }
    // for (let topic of this.topic_filters) {
    //   if (!this.topics.includes(topic)) {
    //     this.toggle_topic(topic);
    //   }
    // }
    if (this.grade_filters.length == 0 && this.subject_filters.length == 0) {
      this.topics = [];
      this.topics_count = {};
      this.topic_filters = []
    }
    if (this.filtered_set.length == 0) {
      this.generate_message = "There are no problems based on your selection.";
    }
  }

  generate_problems() {
    this.filter_exams();
    this.dump_count = 0;
    for (let online_key of this.exam_set) {
      if (this.filtered_set.includes(online_key)) {
        for (const [num, value] of Object.entries(this.e_dump_dict[online_key])) {
          if (value.Number <= this.exam_attribute_dump[online_key].NumQuestions) {
            var prob: any = {};
            for (const [key, val] of Object.entries(value)) {
              prob[key] = val;
            }
            if (this.topic_filters.length == 0) {
              this.ordered_dump[this.dump_count] = prob;
              this.ordered_dump[this.dump_count].Number = online_key + '-' + (this.ordered_dump[this.dump_count].Number as string);
              this.dump_count += 1;
            }
            else if (!this.exam_attribute_dump[online_key].HideTopics) {
              for (let topic of value.Topics) {
                if (this.topic_filters.includes(topic)) {
                  this.ordered_dump[this.dump_count] = prob;
                  this.ordered_dump[this.dump_count].Number = online_key + '-' + (this.ordered_dump[this.dump_count].Number as string);
                  this.dump_count += 1;
                }
              }
            }
            console.log(this.dump_count);
          }
        }
      }
    }
    console.log(this.ordered_dump);
    if (this.filtered_set.length != 0) {
      this.generate_message = "";
      if (this.length_mode == 'number') {
        this.randomize_problems(this.exam_length);
      }
      else {
        this.randomize_problems(Math.min(100, this.filtered_prob_num));
      }
      this.toggle_filters();
    }
  }

  randomize_problems(total: number) {
    this.problems_sequence = Array.from({ length: Object.keys(this.ordered_dump).length }, (_, i) => i);
    this.random_list = []
    for (let i = 1; i <= total; i++) {
      this.random_index = Math.floor(Math.random() * this.problems_sequence.length);
      this.random_list.push('' + this.problems_sequence[this.random_index]);
      this.exam_dump[i] = this.ordered_dump[this.problems_sequence[this.random_index]];
      this.problems_sequence.splice(this.random_index, 1);
    }
    console.log(this.exam_dump);
    this.exam_key = [];
    for (const [num, val] of Object.entries(this.exam_dump)) {
      this.exam_key.push([]);
      if (Object.keys(val.Parts).length == 0) {
        this.exam_key[this.exam_key.length - 1].push([]);
        if (Object.keys(val.AnswerChoices).length == 0) {
          this.exam_key[this.exam_key.length - 1][0].push('');
        }
        else if (['O'].includes(val.Type)) {
          this.exam_key[this.exam_key.length - 1][0] = this.get_o_key(val.AnswerChoices);
        }
        else if (['C'].includes(val.Type)) {
          this.exam_key[this.exam_key.length - 1][0] = this.get_c_key(val.AnswerChoices);
        }
        else if (['G'].includes(val.Type)) {
          this.exam_key[this.exam_key.length - 1][0] = this.get_g_key(val.AnswerChoices);
        }
        else {
          for (const [ch, val2] of Object.entries(val.AnswerChoices)) {
            if (['MC', 'IMC', 'MS', 'IMS'].includes(val.Type) && val2.Key.Correct) {
              this.exam_key[this.exam_key.length - 1][0].push(ch);
            }
            else if (['IDD'].includes(val.Type) && val2.Key.Correct) {
              this.exam_key[this.exam_key.length - 1][0].push([ch[2]]);
            }
            else if (['FR'].includes(val.Type) && ch.includes('KEY')) {
              this.exam_key[this.exam_key.length - 1][0].push(val2.Choice);
            }
            else if (['MFR'].includes(val.Type) && ch.includes('KEY')) {
              this.exam_key[this.exam_key.length - 1][0].push([val2.Choice]);
            }
            else if (['T'].includes(val.Type) && ch.includes('KEY')) {
              this.exam_key[this.exam_key.length - 1][0].push([val2.Choice]);
            }
          }
        }
      }
      else {
        for (let part of Object.keys(val.Parts)) {
          this.exam_key[this.exam_key.length - 1].push([]);
          if (Object.keys(val.Parts[part].AnswerChoices).length == 0) {
            this.exam_key[this.exam_key.length - 1][Object.keys(val.Parts).indexOf(part)].push('');
          }
          else if (['O'].includes(val.Parts[part].Type)) {
            this.exam_key[this.exam_key.length - 1][Object.keys(val.Parts).indexOf(part)] = this.get_o_key(val.Parts[part].AnswerChoices);
          }
          else if (['C'].includes(val.Parts[part].Type)) {
            this.exam_key[this.exam_key.length - 1][Object.keys(val.Parts).indexOf(part)] = this.get_c_key(val.Parts[part].AnswerChoices);
          }
          else if (['G'].includes(val.Parts[part].Type)) {
            this.exam_key[this.exam_key.length - 1][Object.keys(val.Parts).indexOf(part)] = this.get_g_key(val.Parts[part].AnswerChoices);
          }
          else {
            for (const [ch, val2] of Object.entries(val.Parts[part].AnswerChoices)) {
              if (['MC', 'IMC', 'MS', 'IMS'].includes(val.Parts[part].Type) && val2.Key.Correct) {
                this.exam_key[this.exam_key.length - 1][Object.keys(val.Parts).indexOf(part)].push(ch);
              }
              else if (['IDD'].includes(val.Parts[part].Type) && val2.Key.Correct) {
                this.exam_key[this.exam_key.length - 1][Object.keys(val.Parts).indexOf(part)].push([ch[2]]);
              }
              else if (['FR'].includes(val.Parts[part].Type) && ch.includes('KEY')) {
                this.exam_key[this.exam_key.length - 1][Object.keys(val.Parts).indexOf(part)].push(val2.Choice);
              }
              else if (['MFR'].includes(val.Parts[part].Type) && ch.includes('KEY')) {
                this.exam_key[this.exam_key.length - 1][Object.keys(val.Parts).indexOf(part)].push([val2.Choice]);
              }
              else if (['T'].includes(val.Parts[part].Type) && ch.includes('KEY')) {
                this.exam_key[this.exam_key.length - 1][Object.keys(val.Parts).indexOf(part)].push([val2.Choice]);
              }
            }
          }
        }
      }
    }
    console.log(JSON.stringify(this.exam_dump));
    console.log(this.exam_submission);
    console.log(this.exam_key);
  }

  can_assign_s(std: string, ass: string) {
    return (!Object.keys(this.all_students_data[std].exams.history).includes('Q-' + ass));
  }

  can_assign_c(clss: string, ass: string) {
    return (!this.my_class_metadata[this.authService.userData.classes.indexOf(clss) - 1].exams.includes('Q-' + ass));
  }

  assign_quiz() {
    if (!this.assign_q) {
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
    this.assign_q = !this.assign_q;
  }

  toggle_new_quiz(target: string) {
    if (!this.new_assignments.includes(target)) {
      this.new_assignments.push(target);
    }
    else {
      if (this.new_assignments.indexOf(target) != -1) {
        this.new_assignments.splice(this.new_assignments.indexOf(target), 1);
      }
      else {
        this.new_assignments.pop()
      }
    }
  }

  toggle_assign_quiz() {
    if (!this.assign_q) {
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
    this.assign_q = !this.assign_q;
  }

  add_assign_quiz() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    var quiz_id = '';
    for (let i: number = 1; i <= 5; i++) {
      quiz_id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    if (this.quiz_page == 'custom') {
      for (let prob of Object.values(this.prob_images)) {
        for (const [name, image] of Object.entries(prob)) {
          // image should be an acutal image, instead of the URL
          this.authService.UploadQuizPic(quiz_id, name, (image as any)[1]);
        }
      }
    }
    var db_updates: any = {};
    if (this.quiz_page == 'default') {
      db_updates['quizzes/' + quiz_id] = { name: this.quiz_name, grades: this.grade_filters, subjects: this.subject_filters, states: this.state_filters, topics: this.topic_filters, mode: this.mode, length: this.exam_length, timer: this.exam_timer, shuffle: true, public: false, author: this.authService.userData.uid };
    }
    if (this.quiz_page == 'custom') {
      db_updates['quizzes/' + quiz_id] = { name: this.quiz_name, problems: this.exam_dump, grades: [this.selected_grade], subjects: [this.selected_subject], states: [this.state_labels[this.selected_curriculum]], topics: [this.selected_topic], mode: this.mode, length: this.exam_length, timer: this.exam_timer, shuffle: this.shuffle_mode, public: this.quiz_public, author: this.authService.userData.uid };
    }
    this.authService.UpdateDatabase(db_updates);
    for (let ass of this.new_assignments) {
      if (ass.length < 10) {
        const class_ass_ref = 'classes/' + ass + '/quizzes';
        var class_ass_set: any = [];
        var edit_c_list: any = {};
        for (let quiz of this.my_class_metadata[this.authService.userData.classes.indexOf(ass) - 1].quizzes) {
          class_ass_set.push(quiz as string);
        }
        class_ass_set.push(quiz_id);
        edit_c_list[class_ass_ref] = class_ass_set;
        this.authService.UpdateDatabase({ class_ass_ref: {} });
        this.authService.UpdateDatabase(edit_c_list);
      }
      else {
        db_updates = {};
        db_updates['users/' + ass + '/exams/history/Q-' + quiz_id] = { progress: 0, status: 'Assigned', shuffle: this.shuffle_mode, lasttimestamp: serverTimestamp() };
        // this.db_updates['users/' + ass + '/problems/all/' + this.exam_id + '-' + "" + (this.problem_number + 1) + '/status'] = 'Viewed';
        db_updates['/submissions/exams/' + ass + '/Q-' + quiz_id + '/starttimestamp'] = serverTimestamp();
        this.authService.UpdateDatabase(db_updates);
      }
    }
    if (this.quiz_page == 'custom') {
      setTimeout(() => {
        this.router.navigate(['quiz/' + quiz_id]);
      }, 500);
    }
  }

  clear_assignments() {
    this.new_assignments = [];
    this.assign_q = false;
  }

  toggle_filters() {
    this.expand_filters = !this.expand_filters;
    if (this.mode == 'assess') {
      for (let num of Object.keys(this.exam_dump)) {
        this.exam_submission[+num] = {
          'Number': +num,
          'Topics': [],
          'SubTopics': [],
          'Choice': [],
          'Correct': [],
          'Rationale': [],
          'Attempts': [],
          'Path': [],
          'Seconds': 0,
          'Time': '',
          'Flags': [false]
        };
        if (Object.keys(this.exam_dump[+num].Parts).length == 0) {
          this.exam_submission[+num].Path.push([['']]);
          this.exam_submission[+num].Attempts.push(0);
        }
        else {
          for (let part of Object.keys(this.exam_dump[+num].Parts)) {
            this.exam_submission[+num].Path.push([['']]);
            this.exam_submission[+num].Attempts.push(0);
          }
        }
      }
    }
    this.toggleExamTimer();
    this.toggleProblemTimer();
    this.problem_number = 1;
    this.max_problem_number = 1;
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
    this.refsheet_source = '../../' + this.exam_attribute_dump[(this.exam_dump[this.problem_number].Number).substring(0, (this.exam_dump[this.problem_number].Number).indexOf('-'))].RefSheet;
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
    this.refsheet_source = '../../' + this.exam_attribute_dump[(this.exam_dump[this.problem_number].Number).substring(0, (this.exam_dump[this.problem_number].Number).indexOf('-'))].RefSheet;
    console.log(this.exam_dump[this.problem_number].Number);
    console.log((this.exam_dump[this.problem_number].Number).substring(0, (this.exam_dump[this.problem_number].Number).indexOf('-')));
    console.log(this.exam_attribute_dump[(this.exam_dump[this.problem_number].Number).substring(0, (this.exam_dump[this.problem_number].Number).indexOf('-'))].RefSheet);
  }

  select_mc_key(num: number, choice: string) {
    for (let k of Object.keys(this.exam_dump[num].AnswerChoices)) {
      this.exam_dump[num].AnswerChoices[k].Key.Correct = false;
    }
    this.exam_dump[num].AnswerChoices[choice].Key.Correct = true;
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
                  if (this.mode == 'explain') {
                    this.confetti_light(this.problem_attempts[part_num]);
                  }
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
                  if (this.mode == 'explain') {
                    this.confetti_light(this.problem_attempts[part_num]);
                  }
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
                  if (this.mode == 'explain') {
                    this.confetti_light(this.problem_attempts[part_num]);
                  }
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
                  if (this.mode == 'explain') {
                    this.confetti_light(this.problem_attempts[part_num]);
                  }
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

  select_ms_key(num: number, choice: string) {
    this.exam_dump[num].AnswerChoices[choice].Key.Correct = !this.exam_dump[num].AnswerChoices[choice].Key.Correct;
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
          if (this.mode == 'explain') {
            this.confetti_light(this.problem_attempts[part_num]);
          }
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
          if (this.mode == 'explain') {
            this.confetti_light(this.problem_attempts[part_num]);
          }
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
              if (this.mode == 'explain') {
                this.confetti_light(this.problem_attempts[part_num]);
              }
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
                  if (this.mode == 'explain') {
                    this.confetti_light(this.problem_attempts[part_num]);
                  }
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
                  if (this.mode == 'explain') {
                    this.confetti_light(this.problem_attempts[part_num]);
                  }
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
                if (this.mode == 'explain') {
                  this.confetti_light(this.problem_attempts[part_num]);
                }
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
                if (this.mode == 'explain') {
                  this.confetti_light(this.problem_attempts[part_num]);
                }
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
          if (this.mode == 'explain') {
            this.confetti_light(this.problem_attempts[part_num]);
          }
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
            if (this.mode == 'explain') {
              this.confetti_light(this.problem_attempts[part_num]);
            }
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

  select_fr_key(num: number, choice: string) {
    this.exam_dump[num].AnswerChoices['KEY'].Choice = choice;
    this.exam_dump[num].AnswerChoices['KEY'].Key.Correct = true;
    console.log(this.exam_dump);
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
                if (this.mode == 'explain') {
                  this.confetti_light(this.problem_attempts[part_num]);
                }
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
                if (this.mode == 'explain') {
                  this.confetti_light(this.problem_attempts[part_num]);
                }
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
      for (const [num, prob] of Object.entries(this.subtopic_search_dump)) {
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
            if (this.mode == 'explain') {
              this.confetti_light(this.problem_attempts[part_num]);
            }
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
      for (const [num, prob] of Object.entries(this.exam_dump)) {
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
                if (this.mode == 'explain') {
                  this.confetti_light(this.problem_attempts[part_num]);
                }
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
                if (this.mode == 'explain') {
                  this.confetti_light(this.problem_attempts[part_num]);
                }
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
      console.log(this.choices_sequence);
      for (let i = 0; i < this.choices_sequence.length; i++) {
        if (this.choices_sequence[i] == '') {
          this.choices_sequence.splice(i, 1);
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
      console.log(this.choices_sequence);
      for (let i = 0; i < this.choices_sequence.length; i++) {
        if (this.choices_sequence[i] == '') {
          this.choices_sequence.splice(i, 1);
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
    this.unique_choices = [];
    for (const [key, choice] of Object.entries(choices)) {
      if ((choice as any).Choice != '' && !this.unique_choices.includes((choice as any).Choice)) {
        if (this.exam_dump[this.problem_number].Type == 'O' || (this.exam_dump[this.problem_number].Type == 'MP' && this.exam_dump[this.problem_number].Parts[part].Type == 'O')) {
          this.unique_choices.push((choice as any).Choice + ':' + key[0])
        }
        else {
          this.unique_choices.push((choice as any).Choice)
        }
        this.c_submission[part_num][(choice as any).Choice[0]] = [""];
        this.problem_selection[part_num][+(choice as any).Choice[0] - 1] = [""];
        this.attempt_explanation[part_num][+(choice as any).Choice[0] - 1] = [""];
      }
    }
    this.unique_choices.sort();
    console.log(this.unique_choices.sort());
    // return (unique_choices);
  }

  unique_m_st(choices: any, part: string) {
    var part_num = 0;
    if (part != '') {
      part_num = Object.keys(this.subtopic_search_dump[this.subtopic_problem_number].Parts).indexOf(part);
    }
    this.unique_choices = [];
    for (const [key, choice] of Object.entries(choices)) {
      if ((choice as any).Choice != '' && !this.unique_choices.includes((choice as any).Choice)) {
        if (this.subtopic_search_dump[this.subtopic_problem_number].Type == 'O' || (this.subtopic_search_dump[this.subtopic_problem_number].Type == 'MP' && this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type == 'O')) {
          this.unique_choices.push((choice as any).Choice + ':' + key[0])
        }
        else {
          this.unique_choices.push((choice as any).Choice)
        }
        this.c_submission[part_num][(choice as any).Choice[0]] = [""];
        this.subtopic_problem_selection[part_num][+(choice as any).Choice[0] - 1] = [""];
        this.subtopic_attempt_explanation[part_num][+(choice as any).Choice[0] - 1] = [""];
      }
    }
    this.unique_choices.sort();
    console.log(this.unique_choices.sort());
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
      this.attempt_path[part_num].push(this.problem_selection[part_num]);
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
    this.attempt_path[part_num].push(this.problem_selection[part_num]);
    this.problem_attempts[part_num] += 1;
    this.is_m_correct(part, true);
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
      this.attempt_path[part_num].push(this.problem_selection[part_num]);
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
    this.attempt_path[part_num].push(this.problem_selection[part_num]);
    this.problem_attempts[part_num] += 1;
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
    }
    this.attempt_path[part_num].push(this.problem_selection[part_num]);
    this.problem_attempts[part_num] += 1;
    this.is_g_correct(part, true);
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
        if (!unique_c.includes(choice) && choice != '') {
          unique_c.push(choice)
        }
      }
      for (let choice of unique_c) {
        if (this.m_submission[part_num][this.exam_dump[this.problem_number].AnswerChoices[choice].Choice[0]] == choice) {
          if (fetti) {
            this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = this.exam_dump[this.problem_number].AnswerChoices[this.m_selection[part_num][0]].Key.Rationale;
          }
        }
        else if (this.exam_dump[this.problem_number].Parts[part].AnswerChoices[choice].Key.Correct) {
          this.attempt_response[part_num] = 'That is not the correct answer - review the question again and submit a different response.';
          this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = '';
          correct = false;
        }
      }
    }
    else {
      for (let choice of Object.keys(this.exam_dump[this.problem_number].Parts[part].AnswerChoices)) {
        if (!unique_c.includes(choice) && choice != '') {
          unique_c.push(choice)
        }
      }
      for (let choice of unique_c) {
        if (this.m_submission[part_num][this.exam_dump[this.problem_number].Parts[part].AnswerChoices[choice].Choice[0]] == choice) {
          if (fetti) {
            this.attempt_explanation[part_num][+this.m_selection[part_num][1] - 1] = this.exam_dump[this.problem_number].Parts[part].AnswerChoices[this.m_selection[part_num][0]].Key.Rationale;
          }
        }
        else if (this.exam_dump[this.problem_number].Parts[part].AnswerChoices[choice].Key.Correct) {
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
      if (this.mode == 'explain') {
        this.confetti_light(this.problem_attempts[part_num]);
      }
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
        if (!unique_c.includes(choice) && choice != '') {
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
        if (!unique_c.includes(choice) && choice != '') {
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
      if (this.mode == 'explain') {
        this.confetti_light(this.problem_attempts[part_num]);
      }
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
      if (this.mode == 'explain') {
        this.confetti_light(this.problem_attempts[part_num]);
      }
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

  is_MP_complete() {
    var comp = true;
    if (this.mode == 'explain') {
      for (let resp of this.attempt_response) {
        if (resp == '' || !resp.startsWith('Correct')) {
          comp = false;
        }
      }
    }
    else if (this.mode == 'assess') {
      for (let tempt of this.problem_attempts) {
        if (tempt == 0) {
          comp = false;
        }
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

  total_attempts(attempts: number[]) {
    var sum = 0;
    for (let num of attempts) {
      sum += num;
    }
    return (sum);
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

  toggleExamTimer() {
    this.et_running = !this.et_running;
    if (this.length_mode == 'number') {
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
    else {
      if (this.et_running) {
        const startTime = Date.now() - (this.et_counter || 0);
        this.et_timer = setInterval(() => {
          this.et_counter = Math.round(this.exam_timer * 60 - ((Date.now() - startTime) / 1000));
          this.et_minutes = Math.floor(this.et_counter / 60);
          if (this.et_counter <= 0) {
            this.completeExam();
          }
        });
      } else {
        clearInterval(this.et_timer);
      }
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
      this.exam_submission[this.problem_number].Choice = this.problem_selection;
      this.exam_submission[this.problem_number].Attempts = this.problem_attempts;
      this.exam_submission[this.problem_number].Path = this.attempt_path;
      // this.exam_submission[this.problem_number].Correct = this.exam_key[this.problem_number - 1];
      this.exam_submission[this.problem_number].Rationale = this.attempt_explanation;
      for (const [num, prob] of Object.entries(this.exam_dump)) {
        if (this.problem_number == +num) {
          for (const [num2, sub] of Object.entries(this.exam_submission)) {
            if (this.problem_number == +num2) {
              console.log(sub.Choice);
              // sub.Time = this.pt_minutes.toString() + 'm ' + (this.pt_counter % 60).toString() + 's';
              // sub.Seconds = this.pt_counter;
              // sub.Number = this.problem_number;
              // sub.Topics = prob.Topics;
              // sub.SubTopics = prob.SubTopics;
              // sub.Attempts = this.problem_attempts;
              // sub.Path = this.attempt_path;
              if (Object.keys(prob.Parts).length == 0) {
                // sub.Choice.push(sub.Path[0][sub.Path[0].length - 1]);
                var ms_correct = true;
                var mp_correct = true;
                if (['O', 'C', 'G'].includes(prob.Type)) {
                  if ((prob.Type == 'O' && this.is_m_correct('', false)) || (prob.Type == 'C' && this.is_c_correct('', false)) || (prob.Type == 'G' && this.is_g_correct('', false))) {
                    sub.Correct = [['✅']];
                    this.number_correct += 1;
                  }
                  else {
                    sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                  }
                  // sub.Rationale = this.attempt_explanation;
                }
                else if (['MR', 'LR'].includes(prob.Type)) {
                  sub.Correct = [['👀']];
                  if (this.problem_selection[0] == '') {
                    sub.Choice = [['No Student Response Given']];
                  }
                  else {
                    this.number_correct += 1;
                  }
                }
                else {
                  for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                    if (['MC', 'IMC'].includes(prob.Type)) {
                      if (sub.Attempts[0] > 0) {
                        if (sub.Path[0][sub.Path[0].length - 1][0] == ch) {
                          if (key.Key.Correct == true) {
                            sub.Correct = [['✅']];
                            this.number_correct += 1;
                          }
                          else {
                            sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                          }
                          // sub.Rationale = [[key.Key.Rationale]];
                        }
                      }
                    }
                    else if (['LP'].includes(prob.Type)) {
                      if (sub.Attempts[0] > 0) {
                        if (sub.Path[0][sub.Path[0].length - 1][0] == ch[0]) {
                          if (key.Key.Correct == true) {
                            sub.Correct = [['✅']];
                            this.number_correct += 1;
                          }
                          else {
                            sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                          }
                          // sub.Rationale = [[key.Key.Rationale]];
                        }
                      }
                    }
                    else if (['MS', 'IMS'].includes(prob.Type)) {
                      if (key.Key.Correct && !sub.Path[0][sub.Path[0].length - 1].includes(ch)) {
                        ms_correct = false;
                      }
                      else if (!key.Key.Correct && sub.Path[0][sub.Path[0].length - 1].includes(ch)) {
                        ms_correct = false;
                      }
                    }
                    else if (['MFR', 'IDD', 'T'].includes(prob.Type)) {
                      if (prob.Type == 'MFR') {
                        if (key.Key.Correct && ch.includes('KEY') && sub.Path[0][sub.Path[0].length - 1][+ch[0] - 1] != key.Choice) {
                          mp_correct = false;
                        }
                      }
                      if (prob.Type == 'T') {
                        if (key.Key.Correct && ch.includes('KEY') && sub.Path[0][sub.Path[0].length - 1][+ch[0] - 1] != key.Choice) {
                          mp_correct = false;
                        }
                      }
                      if (prob.Type == 'IDD') {
                        if (key.Key.Correct && sub.Path[0][sub.Path[0].length - 1][+ch[0] - 1] != ch[2]) {
                          mp_correct = false;
                        }
                        else if (!key.Key.Correct && sub.Path[0][sub.Path[0].length - 1][+ch[0] - 1] == ch[2]) {
                          mp_correct = false;
                        }
                      }
                    }
                    else if (prob.Type == 'FR') {
                      if (sub.Attempts[0] > 0) {
                        if (sub.Path[0][sub.Path[0].length - 1][0] == key.Choice) {
                          sub.Correct = [['✅']];
                          this.number_correct += 1;
                          // sub.Rationale = [[key.Key.Rationale]];
                        }
                        else {
                          sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                          // sub.Rationale = [['No rationale provided. The number submitted was not right']];
                        }
                      }
                    }
                  }
                }
                if (['MS', 'IMS'].includes(prob.Type) && ms_correct) {
                  sub.Correct = [['✅']];
                  this.number_correct += 1;
                }
                else if (['MS', 'IMS'].includes(prob.Type)) {
                  sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                }
                else if (['MFR', 'IDD', 'T'].includes(prob.Type) && (mp_correct || this.is_idd_correct(''))) {
                  sub.Correct = [['✅']];
                  this.number_correct += 1;
                }
                else if (['MFR', 'IDD', 'T'].includes(prob.Type)) {
                  sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                }
              }
              else {
                sub.Correct = [];
                // sub.Rationale = [];
                // sub.Rationale = this.attempt_explanation;
                for (const [name, part] of Object.entries(prob.Parts)) {
                  // sub.Choice.push(sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1]);
                  var ms_correct = true;
                  var mp_correct = true;
                  if (['O', 'C', 'G'].includes(part.Type)) {
                    if ((part.Type == 'O' && this.is_m_correct(name, false)) || (part.Type == 'C' && this.is_c_correct(name, false)) || (part.Type == 'G' && this.is_g_correct(name, false))) {
                      sub.Correct.push(['✅']);
                      this.number_correct += 1;
                    }
                    else {
                      sub.Correct.push(this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                    }
                    // sub.Rationale.push(this.attempt_explanation);
                  }
                  else if (['LR'].includes(part.Type)) {
                    sub.Correct.push(['👀']);
                    if (this.problem_selection[Object.keys(prob.Parts).indexOf(name)] == '') {
                      sub.Choice[Object.keys(prob.Parts).indexOf(name)] = ['No Student Response Given'];
                    }
                    else {
                      this.number_correct += 1;
                    }
                  }
                  else {
                    for (const [ch, key] of Object.entries(part.AnswerChoices)) {
                      if (['MC', 'IMC'].includes(part.Type)) {
                        if (sub.Attempts[Object.keys(prob.Parts).indexOf(name)] > 0) {
                          if (sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][0] == ch) {
                            if (key.Key.Correct == true) {
                              sub.Correct.push(['✅']);
                              this.number_correct += 1;
                            }
                            else {
                              sub.Correct.push(this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                            }
                            // sub.Rationale.push([key.Key.Rationale]);
                          }
                        }
                      }
                      else if (['LP'].includes(part.Type)) {
                        if (sub.Attempts[Object.keys(prob.Parts).indexOf(name)] > 0) {
                          if (sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][0] == ch[0]) {
                            if (key.Key.Correct == true) {
                              sub.Correct = [['✅']];
                              this.number_correct += 1;
                            }
                            else {
                              sub.Correct = [this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]];
                            }
                            // sub.Rationale = [[key.Key.Rationale]];
                          }
                        }
                      }
                      if (['MS', 'IMS'].includes(part.Type)) {
                        if (key.Key.Correct && !sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1].includes(ch)) {
                          ms_correct = false;
                        }
                        else if (!key.Key.Correct && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1].includes(ch)) {
                          ms_correct = false;
                        }
                      }
                      else if (['MFR', 'IDD', 'T'].includes(part.Type)) {
                        if (part.Type == 'T') {
                          if (key.Key.Correct && ch.includes('KEY') && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][+ch[0] - 1] != key.Choice) {
                            mp_correct = false;
                          }
                        }
                        if (part.Type == 'MFR') {
                          if (key.Key.Correct && ch.includes('KEY') && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][+ch[0] - 1] != key.Choice) {
                            mp_correct = false;
                          }
                        }
                        if (part.Type == 'IDD') {
                          if (key.Key.Correct && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][+ch[0] - 1] != ch[2]) {
                            mp_correct = false;
                          }
                          else if (!key.Key.Correct && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][+ch[0] - 1] == ch[2]) {
                            mp_correct = false;
                          }
                        }
                      }
                      else if (part.Type == 'FR') {
                        if (sub.Attempts[Object.keys(prob.Parts).indexOf(name)] > 0) {
                          if (sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][0] == key.Choice) {
                            sub.Correct.push(['✅']);
                            this.number_correct += 1;
                            // sub.Rationale.push([key.Key.Rationale]);
                          }
                          else {
                            sub.Correct.push(this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                            // sub.Rationale.push(['No rationale provided. The number submitted was not right']);
                          }
                        }
                      }
                    }
                  }
                  if (['MS', 'IMS'].includes(part.Type) && ms_correct) {
                    sub.Correct.push(['✅']);
                    this.number_correct += 1;
                  }
                  else if (['MS', 'IMS'].includes(part.Type)) {
                    sub.Correct.push(this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                  }
                  else if (['MFR', 'IDD', 'T'].includes(part.Type) && (mp_correct || this.is_idd_correct(name))) {
                    sub.Correct.push(['✅']);
                    this.number_correct += 1;
                  }
                  else if (['MFR', 'IDD', 'T'].includes(part.Type)) {
                    sub.Correct.push(this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                  }
                }
              }
              console.log(sub.Choice);
            }
          }
        }
      }
      console.log(this.exam_submission);
    }
    this.problem_number += 1;
    if (this.problem_number > this.max_problem_number) {
      this.max_problem_number = this.problem_number;
    }
    if (this.problem_number > this.exam_length && this.length_mode == 'number') {
      this.completeExam();
    }
    else if (this.max_problem_number == this.problem_number) {
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
      this.refsheet_source = '../../' + this.exam_attribute_dump[(this.exam_dump[this.problem_number].Number).substring(0, (this.exam_dump[this.problem_number].Number).indexOf('-'))].RefSheet;
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
    }
    else {
      this.attempt_path = [this.exam_submission[this.problem_number].Path];
      this.attempt_response = [''];
      this.attempt_explanation = this.exam_submission[this.problem_number].Rationale;
      this.problem_selection = this.exam_submission[this.problem_number].Choice;
      this.problem_attempts = this.exam_submission[this.problem_number].Attempts;
      this.refsheet_source = '../../' + this.exam_attribute_dump[(this.exam_dump[this.problem_number].Number).substring(0, (this.exam_dump[this.problem_number].Number).indexOf('-'))].RefSheet;
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
    }
    this.clearProblemTimer();
    this.toggleProblemTimer();
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

  go_to_prob(num: number) {
    if (num <= this.max_problem_number) {
      this.exam_submission[this.problem_number].Time = (this.pt_minutes).toString() + 'm ' + (this.pt_counter % 60).toString() + 's';
      this.exam_submission[this.problem_number].Seconds = this.pt_counter;
      this.exam_submission[this.problem_number].Number = this.problem_number;
      this.exam_submission[this.problem_number].Topics = this.exam_dump[this.problem_number].Topics;
      this.exam_submission[this.problem_number].SubTopics = this.exam_dump[this.problem_number].SubTopics;
      this.exam_submission[this.problem_number].Choice = this.problem_selection;
      this.exam_submission[this.problem_number].Attempts = this.problem_attempts;
      this.exam_submission[this.problem_number].Path = this.attempt_path;
      // this.exam_submission[this.problem_number].Correct = this.exam_key[this.problem_number - 1];
      this.exam_submission[this.problem_number].Rationale = this.attempt_explanation;
      // if (this.exam_submission[this.problem_number].Attempts.reduce((accumulator, currentValue) => accumulator + currentValue, 0) > 0) {
      if (this.total_attempts(this.exam_submission[this.problem_number].Attempts) > 0) {
        for (const [num, prob] of Object.entries(this.exam_dump)) {
          if (this.problem_number == +num) {
            for (const [num2, sub] of Object.entries(this.exam_submission)) {
              if (this.problem_number == +num2) {
                console.log(sub.Choice);
                // sub.Time = this.pt_minutes.toString() + 'm ' + (this.pt_counter % 60).toString() + 's';
                // sub.Seconds = this.pt_counter;
                // sub.Number = this.problem_number;
                // sub.Topics = prob.Topics;
                // sub.SubTopics = prob.SubTopics;
                // sub.Attempts = this.problem_attempts;
                // sub.Path = this.attempt_path;
                if (Object.keys(prob.Parts).length == 0) {
                  // sub.Choice.push(sub.Path[0][sub.Path[0].length - 1]);
                  var ms_correct = true;
                  var mp_correct = true;
                  if (['O', 'C', 'G'].includes(prob.Type)) {
                    if ((prob.Type == 'O' && this.is_m_correct('', false)) || (prob.Type == 'C' && this.is_c_correct('', false)) || (prob.Type == 'G' && this.is_g_correct('', false))) {
                      sub.Correct = [['✅']];
                      this.number_correct += 1;
                    }
                    else {
                      sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                    }
                    // sub.Rationale = this.attempt_explanation;
                  }
                  else if (['MR', 'LR'].includes(prob.Type)) {
                    sub.Correct = [['👀']];
                    if (this.problem_selection[0] == '') {
                      sub.Choice = [['No Student Response Given']];
                    }
                    else {
                      this.number_correct += 1;
                    }
                  }
                  else {
                    for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                      if (['MC', 'IMC'].includes(prob.Type)) {
                        if (sub.Attempts[0] > 0) {
                          if (sub.Path[0][sub.Path[0].length - 1][0] == ch) {
                            if (key.Key.Correct == true) {
                              sub.Correct = [['✅']];
                              this.number_correct += 1;
                            }
                            else {
                              sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                            }
                            // sub.Rationale = [[key.Key.Rationale]];
                          }
                        }
                      }
                      else if (['LP'].includes(prob.Type)) {
                        if (sub.Attempts[0] > 0) {
                          if (sub.Path[0][sub.Path[0].length - 1][0] == ch[0]) {
                            if (key.Key.Correct == true) {
                              sub.Correct = [['✅']];
                              this.number_correct += 1;
                            }
                            else {
                              sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                            }
                            // sub.Rationale = [[key.Key.Rationale]];
                          }
                        }
                      }
                      else if (['MS', 'IMS'].includes(prob.Type)) {
                        if (key.Key.Correct && !sub.Path[0][sub.Path[0].length - 1].includes(ch)) {
                          ms_correct = false;
                        }
                        else if (!key.Key.Correct && sub.Path[0][sub.Path[0].length - 1].includes(ch)) {
                          ms_correct = false;
                        }
                      }
                      else if (['MFR', 'IDD', 'T'].includes(prob.Type)) {
                        if (prob.Type == 'T') {
                          if (key.Key.Correct && ch.includes('KEY') && sub.Path[0][sub.Path[0].length - 1][+ch[0] - 1] != key.Choice) {
                            mp_correct = false;
                          }
                        }
                        if (prob.Type == 'MFR') {
                          if (key.Key.Correct && ch.includes('KEY') && sub.Path[0][sub.Path[0].length - 1][+ch[0] - 1] != key.Choice) {
                            mp_correct = false;
                          }
                        }
                        if (prob.Type == 'IDD') {
                          if (key.Key.Correct && sub.Path[0][sub.Path[0].length - 1][+ch[0] - 1] != ch[2]) {
                            mp_correct = false;
                          }
                          else if (!key.Key.Correct && sub.Path[0][sub.Path[0].length - 1][+ch[0] - 1] == ch[2]) {
                            mp_correct = false;
                          }
                        }
                      }
                      else if (prob.Type == 'FR') {
                        if (sub.Attempts[0] > 0) {
                          if (sub.Path[0][sub.Path[0].length - 1][0] == key.Choice) {
                            sub.Correct = [['✅']];
                            this.number_correct += 1;
                            // sub.Rationale = [[key.Key.Rationale]];
                          }
                          else {
                            sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                            // sub.Rationale = [['No rationale provided. The number submitted was not right']];
                          }
                        }
                      }
                    }
                  }
                  if (['MS', 'IMS'].includes(prob.Type) && ms_correct) {
                    sub.Correct = [['✅']];
                    this.number_correct += 1;
                  }
                  else if (['MS', 'IMS'].includes(prob.Type)) {
                    sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                  }
                  else if (['MFR', 'IDD', 'T'].includes(prob.Type) && (mp_correct || this.is_idd_correct(''))) {
                    sub.Correct = [['✅']];
                    this.number_correct += 1;
                  }
                  else if (['MFR', 'IDD', 'T'].includes(prob.Type)) {
                    sub.Correct = [this.exam_key[this.problem_number - 1][0]];
                  }
                }
                else {
                  sub.Correct = [];
                  // sub.Rationale = [];
                  // sub.Rationale = this.attempt_explanation;
                  for (const [name, part] of Object.entries(prob.Parts)) {
                    if (this.problem_attempts[Object.keys(prob.Parts).indexOf(name)] > 0) {
                      // sub.Choice.push(sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1]);
                      var ms_correct = true;
                      var mp_correct = true;
                      if (['O', 'C', 'G'].includes(part.Type)) {
                        if ((part.Type == 'O' && this.is_m_correct(name, false)) || (part.Type == 'C' && this.is_c_correct(name, false)) || (part.Type == 'G' && this.is_g_correct(name, false))) {
                          sub.Correct.push(['✅']);
                          this.number_correct += 1;
                        }
                        else {
                          sub.Correct.push(this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                        }
                        // sub.Rationale.push(this.attempt_explanation);
                      }
                      else if (['LR'].includes(part.Type)) {
                        sub.Correct.push(['👀']);
                        if (this.problem_selection[Object.keys(prob.Parts).indexOf(name)] == '') {
                          sub.Choice[Object.keys(prob.Parts).indexOf(name)] = ['No Student Response Given'];
                        }
                        else {
                          this.number_correct += 1;
                        }
                      }
                      else {
                        for (const [ch, key] of Object.entries(part.AnswerChoices)) {
                          if (['MC', 'IMC'].includes(part.Type)) {
                            if (sub.Attempts[Object.keys(prob.Parts).indexOf(name)] > 0) {
                              if (sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][0] == ch) {
                                if (key.Key.Correct == true) {
                                  sub.Correct.push(['✅']);
                                  this.number_correct += 1;
                                }
                                else {
                                  sub.Correct.push(this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                                }
                                // sub.Rationale.push([key.Key.Rationale]);
                              }
                            }
                          }
                          else if (['LP'].includes(part.Type)) {
                            if (sub.Attempts[Object.keys(prob.Parts).indexOf(name)] > 0) {
                              if (sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][0] == ch[0]) {
                                if (key.Key.Correct == true) {
                                  sub.Correct = [['✅']];
                                  this.number_correct += 1;
                                }
                                else {
                                  sub.Correct = [this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]];
                                }
                                // sub.Rationale = [[key.Key.Rationale]];
                              }
                            }
                          }
                          if (['MS', 'IMS'].includes(part.Type)) {
                            if (key.Key.Correct && !sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1].includes(ch)) {
                              ms_correct = false;
                            }
                            else if (!key.Key.Correct && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1].includes(ch)) {
                              ms_correct = false;
                            }
                          }
                          else if (['MFR', 'IDD', 'T'].includes(part.Type)) {
                            if (part.Type == 'T') {
                              if (key.Key.Correct && ch.includes('KEY') && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][+ch[0] - 1] != key.Choice) {
                                mp_correct = false;
                              }
                            }
                            if (part.Type == 'MFR') {
                              if (key.Key.Correct && ch.includes('KEY') && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][+ch[0] - 1] != key.Choice) {
                                mp_correct = false;
                              }
                            }
                            if (part.Type == 'IDD') {
                              if (key.Key.Correct && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][+ch[0] - 1] != ch[2]) {
                                mp_correct = false;
                              }
                              else if (!key.Key.Correct && sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][+ch[0] - 1] == ch[2]) {
                                mp_correct = false;
                              }
                            }
                          }
                          else if (part.Type == 'FR') {
                            if (sub.Attempts[Object.keys(prob.Parts).indexOf(name)] > 0) {
                              if (sub.Path[Object.keys(prob.Parts).indexOf(name)][sub.Path[Object.keys(prob.Parts).indexOf(name)].length - 1][0] == key.Choice) {
                                sub.Correct.push(['✅']);
                                this.number_correct += 1;
                                // sub.Rationale.push([key.Key.Rationale]);
                              }
                              else {
                                sub.Correct.push(this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                                // sub.Rationale.push(['No rationale provided. The number submitted was not right']);
                              }
                            }
                          }
                        }
                      }
                      if (['MS', 'IMS'].includes(part.Type) && ms_correct) {
                        sub.Correct.push(['✅']);
                        this.number_correct += 1;
                      }
                      else if (['MS', 'IMS'].includes(part.Type)) {
                        sub.Correct.push(this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                      }
                      else if (['MFR', 'IDD', 'T'].includes(part.Type) && (mp_correct || this.is_idd_correct(name))) {
                        sub.Correct.push(['✅']);
                        this.number_correct += 1;
                      }
                      else if (['MFR', 'IDD', 'T'].includes(part.Type)) {
                        sub.Correct.push(this.exam_key[this.problem_number - 1][Object.keys(prob.Parts).indexOf(name)]);
                      }
                    }
                  }
                }
                console.log(sub.Choice);
              }
            }
          }
        }
      }
      this.problem_number = num;
      this.attempt_path = this.exam_submission[num].Path;
      this.attempt_explanation = this.exam_submission[num].Rationale;
      this.problem_selection = this.exam_submission[num].Choice;
      this.problem_attempts = this.exam_submission[num].Attempts;
      this.attempt_response = [];
      this.m_shuffled = false;
      this.m_selection = [];
      this.m_submission = [];
      this.c_submission = [];
      this.shuffle_choices = {};
      this.unique_choices = [];
      if (Object.keys(this.exam_dump[this.problem_number].Parts).length == 0) {
        this.attempt_response = [''];
        this.m_selection = [["", ""]];
        this.m_submission = [{}];
        this.c_submission = [{}];
        // set m/c_sub based on problem selection
        if (['O', 'C', 'G'].includes(this.exam_dump[this.problem_number].Type)) {
          this.unique_m(this.exam_dump[this.problem_number].AnswerChoices, '');
        }
      }
      else {
        for (let part of Object.keys(this.exam_dump[this.problem_number].Parts)) {
          this.attempt_response.push('');
          this.m_selection.push(["", ""]);
          this.m_submission.push({});
          this.c_submission.push({});
          // set m/c_sub based on problem selection
          if (['O', 'C', 'G'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
            this.unique_m(this.exam_dump[this.problem_number].Parts[part].AnswerChoices, part);
          }
        }
      }
      console.log(this.problem_selection);
      this.refsheet_source = '../../' + this.exam_attribute_dump[(this.exam_dump[this.problem_number].Number).substring(0, (this.exam_dump[this.problem_number].Number).indexOf('-'))].RefSheet;
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

  completeExam() {
    console.log(this.exam_submission);
    this.toggleExamTimer();
    this.toggleProblemTimer();
    this.confetti_pop();
    if (this.mode == 'explain') {
      this.resetExam();
    }
    else if (this.mode == 'assess') {
      var length_num = 0;
      if (this.length_mode == 'number') {
        length_num = this.exam_length;
      }
      else {
        length_num = this.max_problem_number - 1;
      }
      this.number_correct = 0;
      for (let i: number = 1; i <= length_num; i++) {
        console.log('' + i);
        this.exam_submission_list.push(this.exam_submission[i]);
        if (Object.keys(this.exam_dump[i].Parts).length == 0) {
          if (this.exam_submission[i].Correct[0][0] != '✅') {
            this.wrong_submission_list.push(this.exam_submission[i]);
          }
          else {
            this.number_correct += 1;
          }
        }
        else {
          var pushed_wrong = false;
          for (let part of Object.keys(this.exam_dump[i].Parts)) {
            if (!pushed_wrong && this.exam_submission[i].Correct[(Object.keys(this.exam_dump[i].Parts)).indexOf(part)][0] != '✅') {
              this.wrong_submission_list.push(this.exam_submission[i]);
              pushed_wrong = true;
            }
          }
          if (!pushed_wrong) {
            this.number_correct += 1;
          }
        }
      }
      this.correct_percent = Math.round(this.number_correct / length_num * 100);
      for (let i: number = 0; i < length_num; i++) {
        for (let num: number = 0; num < this.exam_submission_list[i].Topics.length; num++) {
          if (Object.keys(this.topic_breakdown).includes(this.exam_submission_list[i].Topics[num])) {
            this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Total += 1;
            this.topic_breakdown[this.exam_submission_list[i].Topics[num]].Seconds += this.exam_submission_list[i].Seconds;
            if (this.exam_submission_list[i].Correct[0] == '✅') {
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
            if (this.exam_submission_list[i].Correct[0] == '✅') {
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
      // this.authService.UpdateUserData({ 'problems': this.exam_submission });
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

  resetExam() {
    // Object.keys(this.ordered_dump).forEach(key => delete this.ordered_dump[+key]);
    // Object.keys(this.exam_dump).forEach(key => delete this.exam_dump[+key]);
    this.exam_dump = {};
    this.ordered_dump = {};
    this.exam_key = [];
    this.attempt_path = [];
    this.exam_submission = {};
    this.exam_submission_list = [];
    this.wrong_submission_list = [];
    this.topic_breakdown = {};
    this.problem_number = 0;
    this.max_problem_number = 0;
    this.number_correct = 0;
    this.expand_filters = true;
    // this.filter_exams();
  }

  searchSubTopic(topic: string, subtopic: string) {
    this.subtopic_problem_count = 0;
    this.subtopic_search_dump = {};
    for (const [ex, dump] of Object.entries(this.e_dump_dict)) {
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
    this.standard_id = topic + ": " + subtopic;
    this.standard_fav = false;
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
    setTimeout(() => {
      // this.favorite_std_set = [];
      this.public_quiz_results = this.authService.getPublicQuizzes();
      for (const [id, dump] of Object.entries(this.public_quiz_results)) {
        this.public_quiz_results[id].id = id;
      }
      this.filter_exams();
      if (this.authService.userData) {
        console.log('logged in');
        // this.is_auth = true;
        this.authService.getProfilePic(this.authService.userData);
        // setTimeout(() => {
        //   console.log(this.authService.pp_url);
        //   this.profileUploadURL = this.authService.pp_url;
        // }, 150);
        this.user_data = this.authService.userData;
        for (let std of this.authService.userData.standards.favorites.slice(1)) {
          this.favorite_std_set.push(std as string[]);
        }
        if (this.authService.userData.role != 'Student' && this.authService.userData.role != '') {
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
      }
      setTimeout(() => {
        this.width_change2();
        this.data_loaded = true;
      }, 500);
    }, 100);
    // // Just to de-dupe all the subtopic labels
    // for (let exam of this.exam_set) {
    //   if (!this.exam_attribute_dump[exam].HideTopics) {
    //     for (const [key, val] of Object.entries(this.e_dump_dict[exam])) {
    //       if (typeof val.SubTopics != 'undefined') {
    //         for (let subtop of val.SubTopics) {
    //           if (!this.subtopics.includes(subtop)) {
    //             this.subtopics.push(subtop);
    //           }
    //           if (!Object.keys(this.subtopics_count).includes(subtop)) {
    //             this.subtopics_count[subtop] = 1;
    //           }
    //           else {
    //             this.subtopics_count[subtop] += 1;
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    // const subtopics_array = Object.keys(this.subtopics_count).map(sub => [sub, this.subtopics_count[sub]] as [string, number]);
    // subtopics_array.sort((a, b) => b[1] - a[1])
    // const sorted_subtopics_count: { [key: string]: number } = {};
    // subtopics_array.forEach(([sub, count]) => {
    //   sorted_subtopics_count[sub] = count;
    // });
    // console.log(sorted_subtopics_count);
    // console.log(this.subtopics.sort());
  }
}
