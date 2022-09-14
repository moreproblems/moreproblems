import { Component, OnInit, Injectable } from '@angular/core';
// import { readFileSync } from 'fs';
// import { join } from 'path';
import { HttpClient } from '@angular/common/http';

// function syncReadFile(filename: string) {
//   const result = readFileSync(join(__dirname, filename), 'utf-8');

//   console.log(result);

//   return result;
// }

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})

@Injectable()
export class ProblemsComponent implements OnInit{
  title = 'More Problems';

  exam_key = 'src/app/assets/exams/exams.txt';
  problem_file = 'src/app/assets/exams/TX21G3M/TX21G3M-problems.txt';
  

  // type Exam = { State: "string"; Grade: "string"; Subject: "string"; ExamYear: number; ExamName: "string"; NumQuestions: number };

  // examMap: Map<string, Exam[]>();
  problemArr = [];
  problemNum = 0;
  
  constructor() {}

    ngOnInit() {
      this.problemNum = 1;
      // this.problemArr = syncReadFile(this.problem_file);

      // this.http.get<any>(this.exam_key).subscribe(data => {
      //   // console.log(data);
      // this.examMap = data;
      // })

      // this.http.get<any>(this.problem_file).subscribe(data => {
      //   // console.log(data);
      // this.problemArr = data;
      // })
    }
}
