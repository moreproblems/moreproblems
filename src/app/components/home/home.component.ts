import { Component, OnInit, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";
import printJS from 'print-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable()
export class HomeComponent implements OnInit {
  // title = 'More Problems';

  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  mobileWidth = 875;
  menuOpen = false;

  // user_data: any = null;

  online_set = ['PA22G3M', 'PA21G3M', 'PA19G3M', 'PA18G3M', 'PA16G3M', 'PA15G3M', 'PA15G4M', 'TX22G3M', 'TX21G3M', 'TX19G3M', 'TX18G3M', 'TX17G3M', 'TX22G4M', 'TX21G4M', 'TX19G4M', 'TX18G4M', 'TX17G4M', 'TX22G5M', 'TX21G5M', 'TX19G5M', 'TX18G5M', 'TX17G5M', 'TX22G5S', 'TX21G5S', 'TX19G5S', 'TX18G5S', 'TX22G6M', 'TX21G6M', 'TX19G6M', 'TX18G6M', 'TX17G6M', 'TX22G7M', 'TX21G7M', 'TX19G7M', 'TX18G7M', 'TX17G7M', 'TX22G8M', 'TX21G8M', 'TX19G8M', 'TX18G8M', 'TX17G8M', 'TX22G8S', 'TX21G8S', 'TX19G8S', 'TX18G8S', 'TX22G8SS', 'TX21G8SS', 'TX19G8SS', 'TX18G8SS'];
  favorite_set: string[] = [];
  inprogress_set: string[] = [];
  inprogress_exams: {[key: string] : any} = {};

  selected_state = '';
  selected_grade = '';

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
    "WIG10SS": "Wisconsin WFE Grade 10 Social Studies Practice Exam"
  };

  exam_id = '';
  exam_name = '';
  exam_url = '';
  exam_fav = false;
  file_source = '';
  file_page = 1;

  viewerWidth = Math.round(window.innerWidth * .99).toString() + "px";
  viewerHeight = Math.round(window.innerHeight * .95).toString() + "px";

  constructor(private router: Router, private titleService: Title, private meta: Meta, public authService: AuthService) { }

  width_change2() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  select_exam(ex: string) {
    this.exam_id = ex;
    this.exam_url = '/exam/' + ex;
    this.file_source = "./assets/exams/" + ex + ".pdf";
    this.file_page = 1;
    for (let exm of this.authService.userData.exams.favorites) {
      if (ex == exm) {
        this.exam_fav = true;
      }
    }
    this.exam_name = this.exam_names[ex];
  }

  toggle_favorite() {
    this.favorite_set = [];
    for (let exm of this.authService.userData.exams.favorites) {
      this.favorite_set.push(exm as string);
    }
    if (this.favorite_set.includes(this.exam_id)) {
      if (this.favorite_set.indexOf(this.exam_id) !== -1) {
        this.favorite_set.splice(this.favorite_set.indexOf(this.exam_id), 1);
      }
      else {
        this.favorite_set.pop()
      }
    }
    else {
      this.favorite_set.push(this.exam_id);
    }
    this.authService.UpdateUserData({ 'exams/favorites': {} });
    this.authService.UpdateUserData({ 'exams/favorites': this.favorite_set });
    this.exam_fav = !this.exam_fav;
  }

  assert_favorite() {
    this.favorite_set = [];
    for (let exm of this.authService.userData.exams.favorites) {
      this.favorite_set.push(exm as string);
    }
    if (!this.favorite_set.includes(this.exam_id)) {
      this.favorite_set.push(this.exam_id);
    }
    this.authService.UpdateUserData({ 'exams/favorites': {} });
    this.authService.UpdateUserData({ 'exams/favorites': this.favorite_set });
    this.exam_fav = true;
  }

  download_exam() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.file_source);
    link.setAttribute('download', this.exam_name);
    document.body.appendChild(link);
    link.click();
    link.remove();
    this.assert_favorite();
  }

  print_exam() {
    printJS({ printable: this.file_source, type: 'pdf', showModal: true });
    this.assert_favorite();
  }

  take_exam() {
    this.router.navigateByUrl(this.exam_url)
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
    }, 250);
    const exam_history = this.authService.userData.exams.history;
    for (const [key, det] of Object.entries(exam_history)) {
      if ((det as any).status == "Started") {
        this.inprogress_set.push(key);
        this.inprogress_exams[key] = { progress: (det as any).progress, lastdate: new Date((det as any).lasttimestamp).toLocaleDateString(), lasttime: new Date((det as any).lasttimestamp).toLocaleTimeString()} ;
      }
    }
  }
}