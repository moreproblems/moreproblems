import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import printJS from 'print-js';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})

@Injectable()
export class ExamsComponent implements OnInit{
  title = 'More Problems';

  // online_set = ['TX21G3M', 'TX19G3M'];
  online_set: string[] = [];
 
  exam_id = '';
  exam_name = 'Find a Practice Exam Below';
  exam_url = '';
  file_source = '';
  
  constructor(private router: Router) { }

  select_exam(ex: string) {
    this.exam_id = ex;
    this.exam_url = '/exam/' + ex;
    if (ex == 'FL20G3M') {
      this.exam_name = "Florida FSA 2020 Grade 3 Math Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G3M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G3R') {
      this.exam_name = "Florida FSA 2020 Grade 3 Reading Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G3R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G4M') {
      this.exam_name = "Florida FSA 2020 Grade 4 Math Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G4M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G4R') {
      this.exam_name = "Florida FSA 2020 Grade 4 Reading Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G4R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G4W') {
      this.exam_name = "Florida FSA 2020 Grade 4 Writing Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G4W/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G5M') {
      this.exam_name = "Florida FSA 2020 Grade 5 Math Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G5M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G5R') {
      this.exam_name = "Florida FSA 2020 Grade 5 Reading Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G5R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G5W') {
      this.exam_name = "Florida FSA 2020 Grade 5 Writing Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G5W/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G5S') {
      this.exam_name = "Florida FSA 2020 Grade 5 Science Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G5S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G6M') {
      this.exam_name = "Florida FSA 2020 Grade 6 Math Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G6M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G6R') {
      this.exam_name = "Florida FSA 2020 Grade 6 Reading Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G6R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G6W') {
      this.exam_name = "Florida FSA 2020 Grade 6 Writing Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G6W/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G7M') {
      this.exam_name = "Florida FSA 2020 Grade 7 Math Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G7M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G7R') {
      this.exam_name = "Florida FSA 2020 Grade 7 Reading Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G7R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G7W') {
      this.exam_name = "Florida FSA 2020 Grade 7 Writing Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G7W/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G8M') {
      this.exam_name = "Florida FSA 2020 Grade 8 Math Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G8M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G8R') {
      this.exam_name = "Florida FSA 2020 Grade 8 Reading Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G8R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G8W') {
      this.exam_name = "Florida FSA 2020 Grade 8 Writing Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G8W/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G8S') {
      this.exam_name = "Florida FSA 2020 Grade 8 Science Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G8S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G9R') {
      this.exam_name = "Florida FSA 2020 Grade 9 Reading Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G9R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G9W') {
      this.exam_name = "Florida FSA 2020 Grade 9 Writing Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G9W/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G10R') {
      this.exam_name = "Florida FSA 2020 Grade 10 Reading Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G10R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'FL20G10W') {
      this.exam_name = "Florida FSA 2020 Grade 10 Writing Practice Exam";
      this.file_source = "./assets/Exams/Florida/FL20G10W/" + this.exam_name + ".pdf";
    }
    else if (ex == 'ILG3M') {
      this.exam_name = "Illinois IAR Grade 3 Math Practice Exam";
      this.file_source = "./assets/Exams/Illinois/ILG3M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'ILG3E') {
      this.exam_name = "Illinois IAR Grade 3 English Language Arts Practice Exam";
      this.file_source = "./assets/Exams/Illinois/ILG3E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'ILG4M') {
      this.exam_name = "Illinois IAR Grade 4 Math Practice Exam";
      this.file_source = "./assets/Exams/Illinois/ILG4M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'ILG4E') {
      this.exam_name = "Illinois IAR Grade 4 English Language Arts Practice Exam";
      this.file_source = "./assets/Exams/Illinois/ILG4E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'ILG5M') {
      this.exam_name = "Illinois IAR Grade 5 Math Practice Exam";
      this.file_source = "./assets/Exams/Illinois/ILG5M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'ILG5E') {
      this.exam_name = "Illinois IAR Grade 5 English Language Arts Practice Exam";
      this.file_source = "./assets/Exams/Illinois/ILG5E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'ILG6M') {
      this.exam_name = "Illinois IAR Grade 6 Math Practice Exam";
      this.file_source = "./assets/Exams/Illinois/ILG6M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'ILG6E') {
      this.exam_name = "Illinois IAR Grade 6 English Language Arts Practice Exam";
      this.file_source = "./assets/Exams/Illinois/ILG6E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'ILG7M') {
      this.exam_name = "Illinois IAR Grade 7 Math Practice Exam";
      this.file_source = "./assets/Exams/Illinois/ILG7M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'ILG7E') {
      this.exam_name = "Illinois IAR Grade 7 English Language Arts Practice Exam";
      this.file_source = "./assets/Exams/Illinois/ILG7E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'ILG8M') {
      this.exam_name = "Illinois IAR Grade 8 Math Practice Exam";
      this.file_source = "./assets/Exams/Illinois/ILG8M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'ILG8E') {
      this.exam_name = "Illinois IAR Grade 8 English Language Arts Practice Exam";
      this.file_source = "./assets/Exams/Illinois/ILG8E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY22G3M') {
      this.exam_name = "New York NYSTP 2022 Grade 3 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY22G3M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY22G3E') {
      this.exam_name = "New York NYSTP 2022 Grade 3 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY22G3E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY22G4M') {
      this.exam_name = "New York NYSTP 2022 Grade 4 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY22G4M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY22G4E') {
      this.exam_name = "New York NYSTP 2022 Grade 4 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY22G4E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY22G4S') {
      this.exam_name = "New York NYSTP 2022 Grade 4 Science Exam";
      this.file_source = "./assets/Exams/NewYork/NY22G4S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY22G5M') {
      this.exam_name = "New York NYSTP 2022 Grade 5 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY22G5M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY22G5E') {
      this.exam_name = "New York NYSTP 2022 Grade 5 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY22G5E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY22G6M') {
      this.exam_name = "New York NYSTP 2022 Grade 6 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY22G6M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY22G6E') {
      this.exam_name = "New York NYSTP 2022 Grade 6 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY22G6E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY22G7M') {
      this.exam_name = "New York NYSTP 2022 Grade 7 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY22G7M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY22G7E') {
      this.exam_name = "New York NYSTP 2022 Grade 7 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY22G7E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY22G8M') {
      this.exam_name = "New York NYSTP 2022 Grade 8 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY22G8M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY22G8E') {
      this.exam_name = "New York NYSTP 2022 Grade 8 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY22G8E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY22G8S') {
      this.exam_name = "New York NYSTP 2022 Grade 8 Science Exam";
      this.file_source = "./assets/Exams/NewYork/NY22G8S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY21G3M') {
      this.exam_name = "New York NYSTP 2021 Grade 3 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY21G3M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY21G3E') {
      this.exam_name = "New York NYSTP 2021 Grade 3 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY21G3E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY21G4M') {
      this.exam_name = "New York NYSTP 2021 Grade 4 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY21G4M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY21G4E') {
      this.exam_name = "New York NYSTP 2021 Grade 4 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY21G4E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY21G4S') {
      this.exam_name = "New York NYSTP 2021 Grade 4 Science Exam";
      this.file_source = "./assets/Exams/NewYork/NY21G4S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY21G5M') {
      this.exam_name = "New York NYSTP 2021 Grade 5 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY21G5M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY21G5E') {
      this.exam_name = "New York NYSTP 2021 Grade 5 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY21G5E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY21G6M') {
      this.exam_name = "New York NYSTP 2021 Grade 6 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY21G6M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY21G6E') {
      this.exam_name = "New York NYSTP 2021 Grade 6 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY21G6E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY21G7M') {
      this.exam_name = "New York NYSTP 2021 Grade 7 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY21G7M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY21G7E') {
      this.exam_name = "New York NYSTP 2021 Grade 7 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY21G7E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY21G8M') {
      this.exam_name = "New York NYSTP 2021 Grade 8 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY21G8M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY21G8E') {
      this.exam_name = "New York NYSTP 2021 Grade 8 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY21G8E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY21G8S') {
      this.exam_name = "New York NYSTP 2021 Grade 8 Science Exam";
      this.file_source = "./assets/Exams/NewYork/NY21G8S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY19G3M') {
      this.exam_name = "New York NYSTP 2019 Grade 3 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY19G3M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY19G3E') {
      this.exam_name = "New York NYSTP 2019 Grade 3 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY19G3E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY19G4M') {
      this.exam_name = "New York NYSTP 2019 Grade 4 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY19G4M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY19G4E') {
      this.exam_name = "New York NYSTP 2019 Grade 4 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY19G4E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY19G4S') {
      this.exam_name = "New York NYSTP 2019 Grade 4 Science Exam";
      this.file_source = "./assets/Exams/NewYork/NY19G4S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY19G5M') {
      this.exam_name = "New York NYSTP 2019 Grade 5 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY19G5M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY19G5E') {
      this.exam_name = "New York NYSTP 2019 Grade 5 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY19G5E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY19G6M') {
      this.exam_name = "New York NYSTP 2019 Grade 6 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY19G6M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY19G6E') {
      this.exam_name = "New York NYSTP 2019 Grade 6 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY19G6E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY19G7M') {
      this.exam_name = "New York NYSTP 2019 Grade 7 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY19G7M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY19G7E') {
      this.exam_name = "New York NYSTP 2019 Grade 7 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY19G7E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY19G8M') {
      this.exam_name = "New York NYSTP 2019 Grade 8 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY19G8M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY19G8E') {
      this.exam_name = "New York NYSTP 2019 Grade 8 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY19G8E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY19G8S') {
      this.exam_name = "New York NYSTP 2019 Grade 8 Science Exam";
      this.file_source = "./assets/Exams/NewYork/NY19G8S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY18G3M') {
      this.exam_name = "New York NYSTP 2018 Grade 3 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY18G3M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY18G3E') {
      this.exam_name = "New York NYSTP 2018 Grade 3 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY18G3E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY18G4M') {
      this.exam_name = "New York NYSTP 2018 Grade 4 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY18G4M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY18G4E') {
      this.exam_name = "New York NYSTP 2018 Grade 4 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY18G4E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY18G4S') {
      this.exam_name = "New York NYSTP 2018 Grade 4 Science Exam";
      this.file_source = "./assets/Exams/NewYork/NY18G4S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY18G5M') {
      this.exam_name = "New York NYSTP 2018 Grade 5 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY18G5M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY18G5E') {
      this.exam_name = "New York NYSTP 2018 Grade 5 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY18G5E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY18G6M') {
      this.exam_name = "New York NYSTP 2018 Grade 6 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY18G6M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY18G6E') {
      this.exam_name = "New York NYSTP 2018 Grade 6 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY18G6E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY18G7M') {
      this.exam_name = "New York NYSTP 2018 Grade 7 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY18G7M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY18G7E') {
      this.exam_name = "New York NYSTP 2018 Grade 7 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY18G7E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY18G8M') {
      this.exam_name = "New York NYSTP 2018 Grade 8 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY18G8M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY18G8E') {
      this.exam_name = "New York NYSTP 2018 Grade 8 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY18G8E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY18G8S') {
      this.exam_name = "New York NYSTP 2018 Grade 8 Science Exam";
      this.file_source = "./assets/Exams/NewYork/NY18G8S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY17G3M') {
      this.exam_name = "New York NYSTP 2017 Grade 3 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY17G3M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY17G3E') {
      this.exam_name = "New York NYSTP 2017 Grade 3 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY17G3E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY17G4M') {
      this.exam_name = "New York NYSTP 2017 Grade 4 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY17G4M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY17G4E') {
      this.exam_name = "New York NYSTP 2017 Grade 4 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY17G4E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY17G4S') {
      this.exam_name = "New York NYSTP 2017 Grade 4 Science Exam";
      this.file_source = "./assets/Exams/NewYork/NY17G4S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY17G5M') {
      this.exam_name = "New York NYSTP 2017 Grade 5 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY17G5M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY17G5E') {
      this.exam_name = "New York NYSTP 2017 Grade 5 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY17G5E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY17G6M') {
      this.exam_name = "New York NYSTP 2017 Grade 6 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY17G6M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY17G6E') {
      this.exam_name = "New York NYSTP 2017 Grade 6 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY17G6E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY17G7M') {
      this.exam_name = "New York NYSTP 2017 Grade 7 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY17G7M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY17G7E') {
      this.exam_name = "New York NYSTP 2017 Grade 7 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY17G7E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY17G8M') {
      this.exam_name = "New York NYSTP 2017 Grade 8 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY17G8M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY17G8E') {
      this.exam_name = "New York NYSTP 2017 Grade 8 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY17G8E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY17G8S') {
      this.exam_name = "New York NYSTP 2017 Grade 8 Science Exam";
      this.file_source = "./assets/Exams/NewYork/NY17G8S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY16G3M') {
      this.exam_name = "New York NYSTP 2016 Grade 3 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY16G3M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY16G3E') {
      this.exam_name = "New York NYSTP 2016 Grade 3 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY16G3E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY16G4M') {
      this.exam_name = "New York NYSTP 2016 Grade 4 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY16G4M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY16G4E') {
      this.exam_name = "New York NYSTP 2016 Grade 4 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY16G4E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY16G4S') {
      this.exam_name = "New York NYSTP 2016 Grade 4 Science Exam";
      this.file_source = "./assets/Exams/NewYork/NY16G4S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY16G5M') {
      this.exam_name = "New York NYSTP 2016 Grade 5 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY16G5M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY16G5E') {
      this.exam_name = "New York NYSTP 2016 Grade 5 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY16G5E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY16G6M') {
      this.exam_name = "New York NYSTP 2016 Grade 6 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY16G6M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY16G6E') {
      this.exam_name = "New York NYSTP 2016 Grade 6 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY16G6E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY16G7M') {
      this.exam_name = "New York NYSTP 2016 Grade 7 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY16G7M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY16G7E') {
      this.exam_name = "New York NYSTP 2016 Grade 7 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY16G7E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY16G8M') {
      this.exam_name = "New York NYSTP 2016 Grade 8 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY16G8M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY16G8E') {
      this.exam_name = "New York NYSTP 2016 Grade 8 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY16G8E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY16G8S') {
      this.exam_name = "New York NYSTP 2016 Grade 8 Science Exam";
      this.file_source = "./assets/Exams/NewYork/NY16G8S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY15G3M') {
      this.exam_name = "New York NYSTP 2015 Grade 3 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY15G3M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY15G3E') {
      this.exam_name = "New York NYSTP 2015 Grade 3 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY15G3E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY15G4M') {
      this.exam_name = "New York NYSTP 2015 Grade 4 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY15G4M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY15G4E') {
      this.exam_name = "New York NYSTP 2015 Grade 4 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY15G4E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY15G4S') {
      this.exam_name = "New York NYSTP 2015 Grade 4 Science Exam";
      this.file_source = "./assets/Exams/NewYork/NY15G4S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY15G5M') {
      this.exam_name = "New York NYSTP 2015 Grade 5 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY15G5M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY15G5E') {
      this.exam_name = "New York NYSTP 2015 Grade 5 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY15G5E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY15G6M') {
      this.exam_name = "New York NYSTP 2015 Grade 6 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY15G6M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY15G6E') {
      this.exam_name = "New York NYSTP 2015 Grade 6 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY15G6E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY15G7M') {
      this.exam_name = "New York NYSTP 2015 Grade 7 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY15G7M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY15G7E') {
      this.exam_name = "New York NYSTP 2015 Grade 7 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY15G7E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY15G8M') {
      this.exam_name = "New York NYSTP 2015 Grade 8 Math Exam";
      this.file_source = "./assets/Exams/NewYork/NY15G8M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY15G8E') {
      this.exam_name = "New York NYSTP 2015 Grade 8 English Language Arts Exam";
      this.file_source = "./assets/Exams/NewYork/NY15G8E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NY15G8S') {
      this.exam_name = "New York NYSTP 2015 Grade 8 Science Exam";
      this.file_source = "./assets/Exams/NewYork/NY15G8S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NC18G3M') {
      this.exam_name = "North Carolina EOG 2018 Grade 3 Math Exam";
      this.file_source = "./assets/Exams/NorthCarolina/NC18G3M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NC18G3R') {
      this.exam_name = "North Carolina EOG 2018 Grade 3 Reading Exam";
      this.file_source = "./assets/Exams/NorthCarolina/NC18G3R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NC18G4M') {
      this.exam_name = "North Carolina EOG 2018 Grade 4 Math Exam";
      this.file_source = "./assets/Exams/NorthCarolina/NC18G4M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NC18G4R') {
      this.exam_name = "North Carolina EOG 2018 Grade 4 Reading Exam";
      this.file_source = "./assets/Exams/NorthCarolina/NC18G4R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NC18G5M') {
      this.exam_name = "North Carolina EOG 2018 Grade 5 Math Exam";
      this.file_source = "./assets/Exams/NorthCarolina/NC18G5M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NC18G5R') {
      this.exam_name = "North Carolina EOG 2018 Grade 5 Reading Exam";
      this.file_source = "./assets/Exams/NorthCarolina/NC18G5R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NC18G5S') {
      this.exam_name = "North Carolina EOG 2018 Grade 5 Science Exam";
      this.file_source = "./assets/Exams/NorthCarolina/NC18G5S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NC18G6M') {
      this.exam_name = "North Carolina EOG 2018 Grade 6 Math Exam";
      this.file_source = "./assets/Exams/NorthCarolina/NC18G6M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NC18G6R') {
      this.exam_name = "North Carolina EOG 2018 Grade 6 Reading Exam";
      this.file_source = "./assets/Exams/NorthCarolina/NC18G6R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NC18G7M') {
      this.exam_name = "North Carolina EOG 2018 Grade 7 Math Exam";
      this.file_source = "./assets/Exams/NorthCarolina/NC18G7M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NC18G7R') {
      this.exam_name = "North Carolina EOG 2018 Grade 7 Reading Exam";
      this.file_source = "./assets/Exams/NorthCarolina/NC18G7R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NC18G8M') {
      this.exam_name = "North Carolina EOG 2018 Grade 8 Math Exam";
      this.file_source = "./assets/Exams/NorthCarolina/NC18G8M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NC18G8R') {
      this.exam_name = "North Carolina EOG 2018 Grade 8 Reading Exam";
      this.file_source = "./assets/Exams/NorthCarolina/NC18G8R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'NC18G8S') {
      this.exam_name = "North Carolina EOG 2018 Grade 8 Science Exam";
      this.file_source = "./assets/Exams/NorthCarolina/NC18G8S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA22G3M') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 3 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA22G3M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA22G3E') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 3 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA22G3E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA22G4M') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 4 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA22G4M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA22G4E') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 4 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA22G4E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA22G4S') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 4 Science Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA22G4S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA22G5M') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 5 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA22G5M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA22G5E') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 5 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA22G5E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA22G6M') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 6 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA22G6M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA22G6E') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 6 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA22G6E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA22G7M') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 7 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA22G7M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA22G7E') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 7 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA22G7E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA22G8M') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 8 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA22G8M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA22G8E') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 8 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA22G8E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA22G8S') {
      this.exam_name = "Pennsylvania PSSA 2022 Grade 8 Science Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA22G8S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA21G3M') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 3 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA21G3M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA21G3E') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 3 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA21G3E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA21G4M') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 4 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA21G4M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA21G4E') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 4 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA21G4E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA21G4S') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 4 Science Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA21G4S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA21G5M') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 5 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA21G5M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA21G5E') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 5 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA21G5E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA21G6M') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 6 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA21G6M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA21G6E') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 6 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA21G6E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA21G7M') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 7 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA21G7M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA21G7E') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 7 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA21G7E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA21G8M') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 8 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA21G8M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA21G8E') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 8 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA21G8E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA21G8S') {
      this.exam_name = "Pennsylvania PSSA 2021 Grade 8 Science Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA21G8S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA19G3M') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 3 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA19G3M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA19G3E') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 3 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA19G3E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA19G4M') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 4 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA19G4M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA19G4E') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 4 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA19G4E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA19G4S') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 4 Science Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA19G4S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA19G5M') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 5 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA19G5M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA19G5E') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 5 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA19G5E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA19G6M') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 6 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA19G6M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA19G6E') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 6 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA19G6E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA19G7M') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 7 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA19G7M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA19G7E') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 7 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA19G7E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA19G8M') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 8 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA19G8M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA19G8E') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 8 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA19G8E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA19G8S') {
      this.exam_name = "Pennsylvania PSSA 2019 Grade 8 Science Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA19G8S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA18G3M') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 3 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA18G3M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA18G3E') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 3 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA18G3E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA18G4M') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 4 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA18G4M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA18G4E') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 4 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA18G4E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA18G4S') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 4 Science Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA18G4S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA18G5M') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 5 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA18G5M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA18G5E') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 5 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA18G5E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA18G6M') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 6 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA18G6M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA18G6E') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 6 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA18G6E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA18G7M') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 7 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA18G7M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA18G7E') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 7 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA18G7E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA18G8M') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 8 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA18G8M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA18G8E') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 8 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA18G8E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA18G8S') {
      this.exam_name = "Pennsylvania PSSA 2018 Grade 8 Science Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA18G8S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA16G3M') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 3 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA16G3M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA16G3E') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 3 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA16G3E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA16G4M') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 4 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA16G4M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA16G4E') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 4 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA16G4E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA16G4S') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 4 Science Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA16G4S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA16G5M') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 5 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA16G5M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA16G5E') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 5 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA16G5E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA16G6M') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 6 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA16G6M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA16G6E') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 6 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA16G6E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA16G7M') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 7 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA16G7M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA16G7E') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 7 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA16G7E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA16G8M') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 8 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA16G8M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA16G8E') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 8 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA16G8E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA16G8S') {
      this.exam_name = "Pennsylvania PSSA 2016 Grade 8 Science Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA16G8S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA15G3M') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 3 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA15G3M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA15G3E') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 3 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA15G3E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA15G4M') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 4 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA15G4M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA15G4E') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 4 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA15G4E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA15G4S') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 4 Science Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA15G4S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA15G5M') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 5 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA15G5M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA15G5E') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 5 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA15G5E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA15G6M') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 6 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA15G6M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA15G6E') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 6 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA15G6E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA15G7M') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 7 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA15G7M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA15G7E') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 7 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA15G7E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA15G8M') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 8 Math Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA15G8M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA15G8E') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 8 English Language Arts Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA15G8E/" + this.exam_name + ".pdf";
    }
    else if (ex == 'PA15G8S') {
      this.exam_name = "Pennsylvania PSSA 2015 Grade 8 Science Exam";
      this.file_source = "./assets/Exams/Pennsylvania/PA15G8S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX22G3M') {
      this.exam_name = "Texas STAAR 2022 Grade 3 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX22G3M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX21G3M') {
      this.exam_name = "Texas STAAR 2021 Grade 3 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX21G3M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX19G3M') {
      this.exam_name = "Texas STAAR 2019 Grade 3 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX19G3M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX18G3M') {
      this.exam_name = "Texas STAAR 2018 Grade 3 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX18G3M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX17G3M') {
      this.exam_name = "Texas STAAR 2017 Grade 3 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX17G3M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX22G3R') {
      this.exam_name = "Texas STAAR 2022 Grade 3 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX22G3R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX21G3R') {
      this.exam_name = "Texas STAAR 2021 Grade 3 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX21G3R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX19G3R') {
      this.exam_name = "Texas STAAR 2019 Grade 3 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX19G3R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX18G3R') {
      this.exam_name = "Texas STAAR 2018 Grade 3 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX18G3R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX17G3R') {
      this.exam_name = "Texas STAAR 2017 Grade 3 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX17G3R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX22G4M') {
      this.exam_name = "Texas STAAR 2022 Grade 4 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX22G4M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX21G4M') {
      this.exam_name = "Texas STAAR 2021 Grade 4 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX21G4M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX19G4M') {
      this.exam_name = "Texas STAAR 2019 Grade 4 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX19G4M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX18G4M') {
      this.exam_name = "Texas STAAR 2018 Grade 4 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX18G4M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX17G4M') {
      this.exam_name = "Texas STAAR 2017 Grade 4 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX17G4M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX22G4R') {
      this.exam_name = "Texas STAAR 2022 Grade 4 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX22G4R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX21G4R') {
      this.exam_name = "Texas STAAR 2021 Grade 4 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX21G4R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX19G4R') {
      this.exam_name = "Texas STAAR 2019 Grade 4 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX19G4R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX18G4R') {
      this.exam_name = "Texas STAAR 2018 Grade 4 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX18G4R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX17G4R') {
      this.exam_name = "Texas STAAR 2017 Grade 4 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX17G4R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX22G5M') {
      this.exam_name = "Texas STAAR 2022 Grade 5 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX22G5M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX21G5M') {
      this.exam_name = "Texas STAAR 2021 Grade 5 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX21G5M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX19G5M') {
      this.exam_name = "Texas STAAR 2019 Grade 5 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX19G5M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX18G5M') {
      this.exam_name = "Texas STAAR 2018 Grade 5 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX18G5M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX17G5M') {
      this.exam_name = "Texas STAAR 2017 Grade 5 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX17G5M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX22G5R') {
      this.exam_name = "Texas STAAR 2022 Grade 5 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX22G5R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX21G5R') {
      this.exam_name = "Texas STAAR 2021 Grade 5 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX21G5R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX19G5R') {
      this.exam_name = "Texas STAAR 2019 Grade 5 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX19G5R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX18G5R') {
      this.exam_name = "Texas STAAR 2018 Grade 5 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX18G5R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX17G5R') {
      this.exam_name = "Texas STAAR 2017 Grade 5 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX17G5R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX22G5S') {
      this.exam_name = "Texas STAAR 2022 Grade 5 Science Exam";
      this.file_source = "./assets/Exams/Texas/TX22G5S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX21G5S') {
      this.exam_name = "Texas STAAR 2021 Grade 5 Science Exam";
      this.file_source = "./assets/Exams/Texas/TX21G5S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX19G5S') {
      this.exam_name = "Texas STAAR 2019 Grade 5 Science Exam";
      this.file_source = "./assets/Exams/Texas/TX19G5S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX18G5S') {
      this.exam_name = "Texas STAAR 2018 Grade 5 Science Exam";
      this.file_source = "./assets/Exams/Texas/TX18G5S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX22G6M') {
      this.exam_name = "Texas STAAR 2022 Grade 6 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX22G6M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX21G6M') {
      this.exam_name = "Texas STAAR 2021 Grade 6 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX21G6M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX19G6M') {
      this.exam_name = "Texas STAAR 2019 Grade 6 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX19G6M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX18G6M') {
      this.exam_name = "Texas STAAR 2018 Grade 6 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX18G6M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX17G6M') {
      this.exam_name = "Texas STAAR 2017 Grade 6 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX17G6M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX22G6R') {
      this.exam_name = "Texas STAAR 2022 Grade 6 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX22G6R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX21G6R') {
      this.exam_name = "Texas STAAR 2021 Grade 6 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX21G6R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX19G6R') {
      this.exam_name = "Texas STAAR 2019 Grade 6 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX19G6R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX18G6R') {
      this.exam_name = "Texas STAAR 2018 Grade 6 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX18G6R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX17G6R') {
      this.exam_name = "Texas STAAR 2017 Grade 6 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX17G6R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX22G7M') {
      this.exam_name = "Texas STAAR 2022 Grade 7 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX22G7M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX21G7M') {
      this.exam_name = "Texas STAAR 2021 Grade 7 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX21G7M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX19G7M') {
      this.exam_name = "Texas STAAR 2019 Grade 7 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX19G7M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX18G7M') {
      this.exam_name = "Texas STAAR 2018 Grade 7 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX18G7M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX17G7M') {
      this.exam_name = "Texas STAAR 2017 Grade 7 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX17G7M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX22G7R') {
      this.exam_name = "Texas STAAR 2022 Grade 7 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX22G7R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX21G7R') {
      this.exam_name = "Texas STAAR 2021 Grade 7 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX21G7R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX19G7R') {
      this.exam_name = "Texas STAAR 2019 Grade 7 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX19G7R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX18G7R') {
      this.exam_name = "Texas STAAR 2018 Grade 7 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX18G7R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX17G7R') {
      this.exam_name = "Texas STAAR 2017 Grade 7 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX17G7R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX22G8M') {
      this.exam_name = "Texas STAAR 2022 Grade 8 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX22G8M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX21G8M') {
      this.exam_name = "Texas STAAR 2021 Grade 8 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX21G8M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX19G8M') {
      this.exam_name = "Texas STAAR 2019 Grade 8 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX19G8M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX18G8M') {
      this.exam_name = "Texas STAAR 2018 Grade 8 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX18G8M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX17G8M') {
      this.exam_name = "Texas STAAR 2017 Grade 8 Math Exam";
      this.file_source = "./assets/Exams/Texas/TX17G8M/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX22G8R') {
      this.exam_name = "Texas STAAR 2022 Grade 8 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX22G8R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX21G8R') {
      this.exam_name = "Texas STAAR 2021 Grade 8 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX21G8R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX19G8R') {
      this.exam_name = "Texas STAAR 2019 Grade 8 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX19G8R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX18G8R') {
      this.exam_name = "Texas STAAR 2018 Grade 8 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX18G8R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX17G8R') {
      this.exam_name = "Texas STAAR 2017 Grade 8 Reading Exam";
      this.file_source = "./assets/Exams/Texas/TX17G8R/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX22G8S') {
      this.exam_name = "Texas STAAR 2022 Grade 8 Science Exam";
      this.file_source = "./assets/Exams/Texas/TX22G8S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX21G8S') {
      this.exam_name = "Texas STAAR 2021 Grade 8 Science Exam";
      this.file_source = "./assets/Exams/Texas/TX21G8S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX19G8S') {
      this.exam_name = "Texas STAAR 2019 Grade 8 Science Exam";
      this.file_source = "./assets/Exams/Texas/TX19G8S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX18G8S') {
      this.exam_name = "Texas STAAR 2018 Grade 8 Science Exam";
      this.file_source = "./assets/Exams/Texas/TX18G8S/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX22G8SS') {
      this.exam_name = "Texas STAAR 2022 Grade 8 Social Studies Exam";
      this.file_source = "./assets/Exams/Texas/TX22G8SS/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX21G8SS') {
      this.exam_name = "Texas STAAR 2021 Grade 8 Social Studies Exam";
      this.file_source = "./assets/Exams/Texas/TX21G8SS/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX19G8SS') {
      this.exam_name = "Texas STAAR 2019 Grade 8 Social Studies Exam";
      this.file_source = "./assets/Exams/Texas/TX19G8SS/" + this.exam_name + ".pdf";
    }
    else if (ex == 'TX18G8SS') {
      this.exam_name = "Texas STAAR 2018 Grade 8 Social Studies Exam";
      this.file_source = "./assets/Exams/Texas/TX18G8SS/" + this.exam_name + ".pdf";
    }
  }

  download_exam() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.file_source);
    link.setAttribute('download', this.exam_name);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  print_exam() {
    printJS({printable: this.file_source, type:'pdf', showModal:true});
  }

  take_exam() {
    this.router.navigateByUrl(this.exam_url)
  }

  scroll_top() {
    window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
    // window.scrollTo({left: 0, top: el.getBoundingClientRect().top-80, behavior: 'smooth'});
  }
  
  scroll2(el: HTMLElement) {
    window.scrollTo({left: 0, top: el.getBoundingClientRect().top-120, behavior: 'smooth'});
  }

  // delay(ms: number) {
  //   return new Promise( resolve => setTimeout(resolve, ms) );
  // }

  ngOnInit() {
  }
}