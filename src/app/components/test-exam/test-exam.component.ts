import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from "../../shared/services/auth.service";
import * as Plotly from 'plotly.js-dist-min';
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
import * as MAG3EProblems from "src/assets/problems/MAG3E/MAG3E-problems.json";
import * as MAG3MProblems from "src/assets/problems/MAG3M/MAG3M-problems.json";
import * as MAG4EProblems from "src/assets/problems/MAG4E/MAG4E-problems.json";
import * as MAG4MProblems from "src/assets/problems/MAG4M/MAG4M-problems.json";
import * as MAG5EProblems from "src/assets/problems/MAG5E/MAG5E-problems.json";
import * as MAG5MProblems from "src/assets/problems/MAG5M/MAG5M-problems.json";
import * as MAG5SProblems from "src/assets/problems/MAG5S/MAG5S-problems.json";
import * as MAG6EProblems from "src/assets/problems/MAG6E/MAG6E-problems.json";
import * as MAG6MProblems from "src/assets/problems/MAG6M/MAG6M-problems.json";
import * as MAG7EProblems from "src/assets/problems/MAG7E/MAG7E-problems.json";
import * as MAG7MProblems from "src/assets/problems/MAG7M/MAG7M-problems.json";
import * as MAG8EProblems from "src/assets/problems/MAG8E/MAG8E-problems.json";
import * as MAG8MProblems from "src/assets/problems/MAG8M/MAG8M-problems.json";
import * as MAG8SProblems from "src/assets/problems/MAG8S/MAG8S-problems.json";
import * as MAG10EProblems from "src/assets/problems/MAG10E/MAG10E-problems.json";
import * as MAG10MProblems from "src/assets/problems/MAG10M/MAG10M-problems.json";
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
    mobileWidth = 1000;

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

    exam_set = ['COG3E', 'COG4E', 'COG5E', 'COG6E', 'COG7E', 'COG8E', 'COG3M', 'COG4M', 'COG5M', 'COG6M', 'COG7M', 'COG8M', 'COG5S', 'COG8S', 'COHSS', 'FL20G3M', 'FL20G3R', 'FL20G4M', 'FL20G4R', 'FL20G4W', 'FL20G5M', 'FL20G5R', 'FL20G5W', 'FL20G5S', 'FL20G6M', 'FL20G6R', 'FL20G6W', 'FL20G7M', 'FL20G7R', 'FL20G7W', 'FL20G8M', 'FL20G8R', 'FL20G8W', 'FL20G8S', 'FL20G9R', 'FL20G9W', 'FL20G10R', 'FL20G10W', 'MAG3E', 'MAG3M', 'MAG4E', 'MAG4M', 'MAG5E', 'MAG5M', 'MAG5S', 'MAG6E', 'MAG6M', 'MAG7E', 'MAG7M', 'MAG8E', 'MAG8M', 'MAG8S', 'MAG10E', 'MAG10M', 'NJG3E', 'NJG3M', 'NJG4E', 'NJG4M', 'NJG5E', 'NJG5M', 'NJG5S', 'NJG6E', 'NJG6M', 'NJG7E', 'NJG7M', 'NJG8E', 'NJG8M', 'NJG8S', 'NJG9E', 'NJG11S', 'NY23G3M', 'NY23G3E', 'NY22G3M', 'NY22G3E', 'NY21G3M', 'NY21G3E', 'NY19G3M', 'NY19G3E', 'NY18G3M', 'NY18G3E', 'NY17G3M', 'NY17G3E', 'NY16G3M', 'NY16G3E', 'NY15G3M', 'NY15G3E', 'NY23G4M', 'NY23G4E', 'NY22G4M', 'NY22G4E', 'NY21G4M', 'NY21G4E', 'NY19G4M', 'NY19G4E', 'NY18G4M', 'NY18G4E', 'NY17G4M', 'NY17G4E', 'NY16G4M', 'NY16G4E', 'NY15G4M', 'NY15G4E', 'NY22G4S', 'NY21G4S', 'NY19G4S', 'NY18G4S', 'NY17G4S', 'NY16G4S', 'NY15G4S', 'NY23G5M', 'NY23G5E', 'NY22G5M', 'NY22G5E', 'NY21G5M', 'NY21G5E', 'NY19G5M', 'NY19G5E', 'NY18G5M', 'NY18G5E', 'NY17G5M', 'NY17G5E', 'NY16G5M', 'NY16G5E', 'NY15G5M', 'NY15G5E', 'NY23G6M', 'NY23G6E', 'NY22G6M', 'NY22G6E', 'NY21G6M', 'NY21G6E', 'NY19G6M', 'NY19G6E', 'NY18G6M', 'NY18G6E', 'NY17G6M', 'NY17G6E', 'NY16G6M', 'NY16G6E', 'NY15G6M', 'NY15G6E', 'NY23G7M', 'NY23G7E', 'NY22G7M', 'NY22G7E', 'NY21G7M', 'NY21G7E', 'NY19G7M', 'NY19G7E', 'NY18G7M', 'NY18G7E', 'NY17G7M', 'NY17G7E', 'NY16G7M', 'NY16G7E', 'NY15G7M', 'NY15G7E', 'NY23G8M', 'NY23G8E', 'NY22G8M', 'NY22G8E', 'NY21G8M', 'NY21G8E', 'NY19G8M', 'NY19G8E', 'NY18G8M', 'NY18G8E', 'NY17G8M', 'NY17G8E', 'NY16G8M', 'NY16G8E', 'NY15G8M', 'NY15G8E', 'NY22G8S', 'NY21G8S', 'NY19G8S', 'NY18G8S', 'NY17G8S', 'NY16G8S', 'NY15G8S', 'PA23G3M', 'PA23G3E', 'PA22G3M', 'PA22G3E', 'PA21G3M', 'PA21G3E', 'PA19G3M', 'PA19G3E', 'PA18G3M', 'PA18G3E', 'PA16G3M', 'PA16G3E', 'PA15G3M', 'PA15G3E', 'PA23G4M', 'PA23G4E', 'PA22G4M', 'PA22G4E', 'PA21G4M', 'PA21G4E', 'PA19G4M', 'PA19G4E', 'PA18G4M', 'PA18G4E', 'PA16G4M', 'PA16G4E', 'PA15G4M', 'PA15G4E', 'PA23G4S', 'PA22G4S', 'PA21G4S', 'PA19G4S', 'PA18G4S', 'PA16G4S', 'PA15G4S', 'PA23G5M', 'PA23G5E', 'PA22G5M', 'PA22G5E', 'PA21G5M', 'PA21G5E', 'PA19G5M', 'PA19G5E', 'PA18G5M', 'PA18G5E', 'PA16G5M', 'PA16G5E', 'PA15G5M', 'PA15G5E', 'PA23G6M', 'PA23G6E', 'PA22G6M', 'PA22G6E', 'PA21G6M', 'PA21G6E', 'PA19G6M', 'PA19G6E', 'PA18G6M', 'PA18G6E', 'PA16G6M', 'PA16G6E', 'PA15G6M', 'PA15G6E', 'PA23G7M', 'PA23G7E', 'PA22G7M', 'PA22G7E', 'PA21G7M', 'PA21G7E', 'PA19G7M', 'PA19G7E', 'PA18G7M', 'PA18G7E', 'PA16G7M', 'PA16G7E', 'PA15G7M', 'PA15G7E', 'PA23G8M', 'PA23G8E', 'PA22G8M', 'PA22G8E', 'PA21G8M', 'PA21G8E', 'PA19G8M', 'PA19G8E', 'PA18G8M', 'PA18G8E', 'PA16G8M', 'PA16G8E', 'PA15G8M', 'PA15G8E', 'PA23G8S', 'PA22G8S', 'PA21G8S', 'PA19G8S', 'PA18G8S', 'PA16G8S', 'PA15G8S', 'PSAT1', 'RI23G3M', 'RI22G3M', 'RI21G3M', 'RI19G3M', 'RI18G3M', 'RI23G3E', 'RI22G3E', 'RI21G3E', 'RI19G3E', 'RI18G3E', 'RI23G4M', 'RI22G4M', 'RI21G4M', 'RI19G4M', 'RI18G4M', 'RI23G4E', 'RI22G4E', 'RI21G4E', 'RI19G4E', 'RI18G4E', 'RI23G5M', 'RI22G5M', 'RI21G5M', 'RI19G5M', 'RI18G5M', 'RI23G5E', 'RI22G5E', 'RI21G5E', 'RI19G5E', 'RI18G5E', 'RI23G6M', 'RI22G6M', 'RI21G6M', 'RI19G6M', 'RI18G6M', 'RI23G6E', 'RI22G6E', 'RI21G6E', 'RI19G6E', 'RI18G6E', 'RI23G7M', 'RI22G7M', 'RI21G7M', 'RI19G7M', 'RI18G7M', 'RI23G7E', 'RI22G7E', 'RI21G7E', 'RI19G7E', 'RI18G7E', 'RI23G8M', 'RI22G8M', 'RI21G8M', 'RI19G8M', 'RI18G8M', 'RI23G8E', 'RI22G8E', 'RI21G8E', 'RI19G8E', 'RI18G8E', 'SAT1', 'SAT2', 'SAT3', 'SAT4', 'SC18G3E', 'SC18G4E', 'SC18G5E', 'SC18G6E', 'SC18G7E', 'SC18G8E', 'SC18G3M', 'SC18G4M', 'SC18G5M', 'SC18G6M', 'SC18G7M', 'SC18G8M', 'SC18G4S', 'SC18G6S', 'TN20G3E', 'TN20G3M', 'TN20G3S', 'TN20G4E', 'TN20G4M', 'TN20G4S', 'TN20G5E', 'TN20G5M', 'TN20G5S', 'TN20G6E', 'TN20G6M', 'TN20G6S', 'TN20G6SS', 'TN20G7E', 'TN20G7M', 'TN20G7S', 'TN20G7SS', 'TN20G8E', 'TN20G8M', 'TN20G8S', 'TN20G8SS', 'TN20HSA1', 'TN20HSA2', 'TN20HSB', 'TN20HSE1', 'TN20HSE2', 'TN20HSG', 'TN20HSUSH', 'TX22G3M', 'TX22G3R', 'TX21G3M', 'TX21G3R', 'TX19G3M', 'TX19G3R', 'TX18G3M', 'TX18G3R', 'TX17G3M', 'TX17G3R', 'TX22G4M', 'TX22G4R', 'TX21G4M', 'TX21G4R', 'TX19G4M', 'TX19G4R', 'TX18G4M', 'TX18G4R', 'TX17G4M', 'TX17G4R', 'TX22G5M', 'TX22G5R', 'TX21G5M', 'TX21G5R', 'TX19G5M', 'TX19G5R', 'TX18G5M', 'TX18G5R', 'TX17G5M', 'TX17G5R', 'TX22G5S', 'TX21G5S', 'TX19G5S', 'TX18G5S', 'TX22G6M', 'TX22G6R', 'TX21G6M', 'TX21G6R', 'TX19G6M', 'TX19G6R', 'TX18G6M', 'TX18G6R', 'TX17G6M', 'TX17G6R', 'TX22G7M', 'TX22G7R', 'TX21G7M', 'TX21G7R', 'TX19G7M', 'TX19G7R', 'TX18G7M', 'TX18G7R', 'TX17G7M', 'TX17G7R', 'TX22G8M', 'TX22G8R', 'TX21G8M', 'TX21G8R', 'TX19G8M', 'TX19G8R', 'TX18G8M', 'TX18G8R', 'TX17G8M', 'TX17G8R', 'TX22G8S', 'TX21G8S', 'TX19G8S', 'TX18G8S', 'TX22G8SS', 'TX21G8SS', 'TX19G8SS', 'TX18G8SS', 'TX22HSA1', 'TX21HSA1', 'TX19HSA1', 'TX18HSA1', 'TX17HSA1', 'TX22HSB', 'TX21HSB', 'TX19HSB', 'TX18HSB', 'TX17HSB', 'TX22HSE1', 'TX21HSE1', 'TX19HSE1', 'TX18HSE1', 'TX17HSE1', 'TX22HSE2', 'TX21HSE2', 'TX19HSE2', 'TX18HSE2', 'TX17HSE2', 'TX22HSUSH', 'TX21HSUSH', 'TX19HSUSH', 'TX18HSUSH', 'TX17HSUSH'];

    test_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TestProblems;
    PA22G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G3MProblems;
    PA21G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G3MProblems;
    PA19G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G3MProblems;
    PA18G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G3MProblems;
    PA16G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G3MProblems;
    PA15G3M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G3MProblems;
    PA22G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G4MProblems;
    PA21G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G4MProblems;
    PA19G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G4MProblems;
    PA18G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G4MProblems;
    PA16G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G4MProblems;
    PA15G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G4MProblems;
    PA22G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G4SProblems;
    PA21G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G4SProblems;
    PA19G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G4SProblems;
    PA18G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G4SProblems;
    PA16G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G4SProblems;
    PA15G4S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G4SProblems;
    PA22G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G5MProblems;
    PA21G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G5MProblems;
    PA19G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G5MProblems;
    PA18G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G5MProblems;
    PA16G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G5MProblems;
    PA15G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G5MProblems;
    PA22G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G6MProblems;
    PA21G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G6MProblems;
    PA19G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G6MProblems;
    PA18G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G6MProblems;
    PA16G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G6MProblems;
    PA15G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G6MProblems;
    PA22G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G7MProblems;
    PA21G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G7MProblems;
    PA19G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G7MProblems;
    PA18G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G7MProblems;
    PA16G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G7MProblems;
    PA15G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G7MProblems;
    PA22G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G8MProblems;
    PA21G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G8MProblems;
    PA21G8E_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G8EProblems;
    PA19G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G8MProblems;
    PA18G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G8MProblems;
    PA16G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G8MProblems;
    PA15G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G8MProblems;
    PA22G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA22G8SProblems;
    PA21G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA21G8SProblems;
    PA19G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA19G8SProblems;
    PA18G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA18G8SProblems;
    PA16G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA16G8SProblems;
    PA15G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = PA15G8SProblems;
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
    TX18G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G4MProblems;
    TX17G4M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17G4MProblems;
    TX22G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G5MProblems;
    TX22G5R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G5RProblems;
    TX21G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G5MProblems;
    TX21G5R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G5RProblems;
    TX19G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G5MProblems;
    TX18G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G5MProblems;
    TX17G5M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17G5MProblems;
    TX22G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G5SProblems;
    TX21G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G5SProblems;
    TX19G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G5SProblems;
    TX18G5S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G5SProblems;
    TX22G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G6MProblems;
    TX22G6R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G6RProblems;
    TX21G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G6MProblems;
    TX21G6R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G6RProblems;
    TX19G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G6MProblems;
    TX18G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G6MProblems;
    TX17G6M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17G6MProblems;
    TX22G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G7MProblems;
    TX22G7R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G7RProblems;
    TX21G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G7MProblems;
    TX21G7R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G7RProblems;
    TX19G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G7MProblems;
    TX18G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G7MProblems;
    TX17G7M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17G7MProblems;
    TX22G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G8MProblems;
    TX22G8R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G8RProblems;
    TX21G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G8MProblems;
    TX21G8R_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G8RProblems;
    TX19G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G8MProblems;
    TX18G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G8MProblems;
    TX17G8M_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX17G8MProblems;
    TX22G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G8SProblems;
    TX21G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G8SProblems;
    TX19G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G8SProblems;
    TX18G8S_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G8SProblems;
    TX22G8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX22G8SSProblems;
    TX21G8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX21G8SSProblems;
    TX19G8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX19G8SSProblems;
    TX18G8SS_exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } = TX18G8SSProblems;
    dump_dict: { [key: string]: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topics': string[], 'SubTopics': string[], 'SuppContent': string[], 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } }, 'Parts': { [key: string]: { 'Type': string, 'NumChoices': number, 'Explain': boolean, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string, 'Percent': number } } } } } } } } = {
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
        "PA21G8E": this.PA21G8E_exam_dump,
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
        "TX22G7R": this.TX22G7R_exam_dump,
        "TX21G7M": this.TX21G7M_exam_dump,
        "TX21G7R": this.TX21G7R_exam_dump,
        "TX19G7M": this.TX19G7M_exam_dump,
        "TX18G7M": this.TX18G7M_exam_dump,
        "TX17G7M": this.TX17G7M_exam_dump,
        "TX22G8M": this.TX22G8M_exam_dump,
        "TX22G8R": this.TX22G8R_exam_dump,
        "TX21G8M": this.TX21G8M_exam_dump,
        "TX21G8R": this.TX21G8R_exam_dump,
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
    unique_choices: string[] = [];
    random_index = 0
    random_list: string[] = [];

    selected_topic = "";
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

    constructor(public router: Router, private aRoute: ActivatedRoute, public authService: AuthService, private http: HttpClient) { }

    sub: any;

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
            if (this.c_submission[part_num][cat].indexOf(ch) !== -1) {
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
                else {
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
                if (!unique_c.includes(choice) && choice != '') {
                    unique_c.push(choice)
                }
            }
            for (let choice of unique_c) {
                if (this.c_submission[part_num][this.exam_dump[this.problem_number].AnswerChoices[choice].Choice[0]].includes(choice)) {
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
                else if (['MS', 'O', 'C', 'G', 'IMS', 'MGP'].includes(this.exam_dump[this.problem_number].Type)) {
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
                    else if (['MS', 'O', 'C', 'G', 'IMS', 'MGP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
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
                else if (['MS', 'O', 'C', 'G', 'IMS', 'MGP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
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
                    else if (['MS', 'O', 'C', 'G', 'IMS', 'MGP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
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
                else if (['MS', 'O', 'C', 'G', 'IMS', 'MGP'].includes(this.exam_dump[this.problem_number].Type)) {
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
                    else if (['MS', 'O', 'C', 'G', 'IMS', 'MGP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
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
            else if (['MS', 'O', 'C', 'G', 'IMS', 'MGP'].includes(this.exam_dump[this.problem_number].Type)) {
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
                else if (['MS', 'O', 'C', 'G', 'IMS', 'MGP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
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

    searchSubTopic(topic: string, subtopic: string) {
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
            if (['MC', 'FR', 'SR', 'MR', 'LR', 'IMC', 'LP', 'GP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
                this.subtopic_problem_selection = [['']];
                if (['GP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
                    setTimeout(() => {
                        this.plot_graph_gp('', true);
                    }, 500);
                }
            }
            else if (['MS', 'O', 'C', 'G', 'IMS', 'MGP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Type)) {
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
                else if (['MS', 'O', 'C', 'G', 'IMS', 'MGP'].includes(this.subtopic_search_dump[this.subtopic_problem_number].Parts[part].Type)) {
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
            else if (['MS', 'O', 'C', 'G', 'IMS', 'MGP'].includes(this.exam_dump[this.problem_number].Type)) {
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
                else if (['MS', 'O', 'C', 'G', 'IMS', 'MGP'].includes(this.exam_dump[this.problem_number].Parts[part].Type)) {
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
        this.toggleProblemTimer();
    }
}