import { Component, OnInit, Injectable } from '@angular/core';
// import * as fs from 'fs';
// import * as path from 'path';
import { HttpClient } from '@angular/common/http';

// function syncReadFile(filename: string) {
//   const result = fs.readFile(path.join(__dirname, filename), 'utf8');
//   console.log(result);
//   return result;
// }

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})

@Injectable()
export class ProblemsComponent implements OnInit {
  title = 'More Problems';
  
  filters: string[] = [];
  expand_filters = true;
  expand_topic = false;

  exam_key = 'src/app/assets/Exams/exams.txt';
  exam_code = 'TX21G3M'
  exam_file = 'src/app/assets/Exams/Texas/' + this.exam_code + '/' + this.exam_code + '-problems.txt';

  // exam_data = fs.readFileSync(this.problem_file, 'utf8');
  exam_data: string = '';
  // fileReader: FileReader = new FileReader()
  // this.fileReader.readAsText(this.problem_file);

  exam_state = 'Texas';
  exam_grade = 'Grade 3';
  exam_subject = 'Mathematics';
  exam_name = 'STAAR';
  exam_year = '2021';
  exam_length = '32'

  exam_dump = {
    1: {
      'Number': 1,
      'Type': 'MC',
      'Num Choices': 4,
      'Topic': 'Algebraic Reasoning',
      'SubTopic': 'Represent and solve one- and two-step multiplication and division problems within 100 using arrays, strip diagrams, and equations',
      'Content': [
        'Victor bought 36 eggs at a grocery store. The eggs were in cartons with 12 eggs in each carton.',
        'Which model best represents the number of cartons of eggs Victor bought?'
      ],
      'AnswerChoices': {
        'A': {
          'Choice': 'Exams/Texas/TX21G3M/media/1a.jpg',
          'Key': {
            'Correct': false,
            'Rationale': 'The student likely thought the values should be subtracted instead of divided. The student needs to focus on understanding the mathematical operations (+, −−, ×, ÷) needed to solve real-world problems.'
          }
        },
        'B': {
          'Choice': 'Exams/Texas/TX21G3M/media/1b.jpg',
          'Key': {
            'Correct': true,
            'Rationale': 'To determine the model that best represents the number of cartons of eggs Victor bought, the student should have identified the model that shows the total number of eggs (36) divided into equal groups with 12 eggs in each group.'
          }
        },
        'C': {
          'Choice': 'Exams/Texas/TX21G3M/media/1c.jpg',
          'Key': {
            'Correct': false,
            'Rationale': 'The student likely thought the values should be added instead of divided. The student needs to focus on understanding the mathematical operations (+, −, ×, ÷) needed to solve real-world problems.'
          }
        },
        'D': {
          'Choice': 'Exams/Texas/TX21G3M/media/1d.jpg',
          'Key': {
            'Correct': false,
            'Rationale': 'The student chose a model that shows three groups but likely did not count the total number of eggs or the number of eggs in each group. The student needs to focus on the details of models used to represent real-world problems.'
          }
        }
      }
    },
    2: {
      'Number': 2,
      'Type': 'MC',
      'Num Choices': 4,
      'Topic': 'Number & Operations',
      'SubTopic': 'Explain that the unit fraction 1/b represents the quantity formed by one part of a whole that has been partitioned into b equal parts where b is a non-zero whole number',
      'Content': [
        'Three friends divided three pizzas into pieces. The shaded parts of the models represent the pieces that the friends ate.',
        'Exams/Texas/TX21G3M/media/2a.jpg',
        'Which statement describes the fraction of a pizza that one of the friends ate?'
      ],
      'AnswerChoices': {
        'F': {
          'Choice': 'Diego ate 1/2 of a pizza, because he ate the largest piece of his 2 pieces.',
          'Key': {
            'Correct': false,
            'Rationale': 'The student likely did not understand that the pieces in the model have to be equal in size for /2 to be the fraction eaten. So although Diego’s model is divided into two parts‚ the parts are not equal in size and they do not represent halves. The student needs to focus on understanding that the parts of a fraction model must be equal in size to represent a fraction of the total number of pieces.'
          }
        },
        'G': {
          'Choice': 'Victoria ate 1/3 of a pizza, because she ate 1 piece and had 3 equal-size pieces left over.',
          'Key': {
            'Correct': false,
            'Rationale': 'The student likely did not understand how to write a fraction for the shaded part of a circle fraction model and thought the number of pieces eaten (shaded parts) should be the numerator (1) and the number of pieces not eaten (unshaded parts) should be the denominator (3), choosing 1/3 as the fraction of the pizza that Victoria ate. The student needs to focus on understanding that in a fraction model‚ the numerator is the number of designated parts (shaded parts) and the denominator is the total number of parts.'
          }
        },
        'H': {
          'Choice': 'Wesley ate 1/2 of a pizza, because he ate 1 piece of his 2 equal-size pieces.',
          'Key': {
            'Correct': true,
            'Rationale': 'To determine which statement describes the fraction of a pizza that one of the friends ate‚ the student should have understood that a fraction is composed of a numerator (top number), which represents the shaded part of the circle‚ and a denominator (bottom number), which represents the number of equal-size parts in the whole circle. The student should have then identified that the circle for Wesley was divided into 2 equal parts with 1 part shaded and therefore represents 1/2 . The student should then have realized that Wesley ate 1/2 of the pizza because he ate 1 piece of his 2 equal-size pieces.'
          }
        },
        'J': {
          'Choice': 'Victoria ate 1/3 of a pizza, because she ate 1 piece and had 3 pieces left over.',
          'Key': {
            'Correct': false,
            'Rationale': 'The student likely did not understand how to write a fraction for the shaded part of a circle fraction model and thought the number of pieces not eaten (unshaded parts) should be the numerator (3) and the number of pieces eaten (shaded parts) should be the denominator (1), choosing 3/1 as the fraction of the pizza that Victoria ate. The student needs to focus on understanding that in a fraction model‚ the numerator is the number of designated parts (shaded parts) and the denominator is the total number of parts.'
          }
        }
      }
    },
    3: {
      'Number': 3,
      'Type': 'MC',
      'Num Choices': 4,
      'Topic': 'Number & Operations',
      'SubTopic': 'Solve with fluency one-step and two-step problems involving addition and subtraction within 1,000 using strategies based on place value, properties of operations, and the relationship between addition and subtraction',
      'Content': [
        'A theater sold tickets for three movies. The table shows the number of tickets sold for each movie.',
        'Exams/Texas/TX21G3M/media/3a.jpg',
        'What was the total number of tickets the theater sold for these three movies?'
      ],
      'AnswerChoices': {
        'A': {
          'Choice': '476',
          'Key': {
            'Correct': true,
            'Rationale': 'To determine the number of tickets the theater sold for the three movies‚ the student should have added the number of tickets sold for Movie 1 (143)‚ Movie 2 (158)‚ and Movie 3 (175), resulting in 476 (143 + 158 + 175 = 476).'
          }
        },
        'B': {
          'Choice': '366',
          'Key': {
            'Correct': false,
            'Rationale': 'The student likely added the values but did not regroup to the tens place (second digit from the right) and the hundreds place (leftmost digit). The student needs to focus on understanding how to regroup when adding.'
          }
        },
        'C': {
          'Choice': '376',
          'Key': {
            'Correct': false,
            'Rationale': 'The student likely added the values but did not regroup to the hundreds place (leftmost digit). The student needs to focus on understanding how to regroup when adding.'
          }
        },
        'D': {
          'Choice': '473',
          'Key': {
            'Correct': false,
            'Rationale': 'The student likely attempted to add the values but made an error when adding the digits 3, 8, and 5 in the ones place (rightmost digit), resulting in 3 + 8 + 5 → 13. The student needs to focus on adding numbers accurately.'
          }
        }
      }
    },
    4: {
      'Number': 4,
      'Type': 'FR',
      'Num Choices': 4,
      'Topic': 'Number & Operations',
      'SubTopic': 'Determine the value of a collection of coins and bills',
      'Content': [
        'Owen received the coins and bills shown when he sold lemonade.',
        'Exams/Texas/TX21G3M/media/4a.jpg',
        'What is the value of the coins and bills Owen received?'
      ],
      'AnswerChoices': {
        'F': {
          'Choice': '$8.85',
          'Key': {
            'Correct': false,
            'Rationale': 'The student likely miscalculated the value of the quarters to be $1.50 instead of $1.75. The student needs to focus on accurately determining the value of a collection of bills and coins.'
          }
        },
        'G': {
          'Choice': '$9.00',
          'Key': {
            'Correct': false,
            'Rationale': 'The student likely miscounted the dimes or confused the values of nickels and dimes thinking that there were either one dime and three nickels ($5.00 + $2.00 + $1.75 + $0.10 + $0.15 = $9.00) or there were only two dimes ($5.00 + $2.00 + $1.75 + $0.20 + $0.05 = $9.00). The student needs to focus on distinguishing between dimes and nickels and understanding the values of a collection of coins.'
          }
        },
        'H': {
          'Choice': '$9.10',
          'Key': {
            'Correct': true,
            'Rationale': 'To determine the amount of money that Owen received from selling lemonade‚ the student could have added the values of the 1 five-dollar bill, 2 one-dollar bills, 7 quarters, 3 dimes, and 1 nickel shown using dollar notation ($5.00 + $2.00 + $1.75 + $0.30 + $0.05 = $9.10). This is an efficient way to solve the problem; however‚ other methods could be used to solve the problem correctly.'
          }
        },
        'J': {
          'Choice': '$8.90',
          'Key': {
            'Correct': false,
            'Rationale': 'The student likely counted one of the quarters as a nickel‚ confusing those values and thinking that there were six quarters and two nickels ($5.00 + $2.00 + $1.50 + $0.30 + $0.10 = $8.90). The student needs to focus on distinguishing between quarters and nickels and understanding the values of a collection of coins.'
          }
        }
      }
    },
    5: {
      'Number': 5,
      'Type': 'FR',
      'Num Choices': 0,
      'Topic': 'Number & Operations',
      'SubTopic': 'Compose and decompose numbers up to 100,000 as a sum of so many ten thousands, so many thousands, so many hundreds, so many tens, and so many ones using objects, pictorial models, and numbers, including expanded notation as appropriate',
      'Content': [
        'An expression is shown.',
        '70 + 2 + 900',
        'What number is equivalent to this expression?'
      ],
      'Key': {
        'Answer': '972',
        'Rationale': 'To determine a number that is equivalent to the expression, the student should have put the digits from the expression in place-value order. From left to right‚ the place-value order is hundreds place‚ tens place‚ and ones place. The student should have used a 9 in the hundreds place for the 900 in the expression, a 7 in the tens place for the 70 in the expression, and a 2 in the ones place for the 2 in the expression (972). This is an efficient way to solve the problem; however‚ other methods could be used to solve the problem correctly.'
      }
    }
  };

  problem_number = 1;
  problem_attempts = 0;
  attempt_response = '';

  // problem_type = 'MC';
  // problem_choices = 4;
  // problem_topic = 'Algebraic Reasoning';
  // topic_description = 'Represent real-world relationships using number pairs in a table and verbal descriptions.';
  // content = [
  //   'The table shows the numbers of baseball cards in different numbers of packages.',
  //   'exams/TX21G3M/media/13a.jpg',
  //   'Based on the relationship shown in the table, which statement is true?'];
  // choices = {
  //   'A': {
  //     'Choice': 'The number of packages times 1 equals the number of baseball cards.',
  //     'Key': {
  //       'Correct': false,
  //       'Rationale': 'The student likely noticed a “plus 1” relationship between consecutive values in the first column (1 + 1 = 2; 2 + 1 = 3; 3 + 1 = 4; 4 + 1 = 5) and did not find a relationship to each corresponding'
  //     }
  //   },
  //   'B': {
  //     'Choice': 'The number of packages plus 1 equals the number of baseball cards.',
  //     'Key': {
  //       'Correct': false,
  //       'Rationale': 'The student likely noticed a “plus 1” relationship between consecutive values in the first column (1 + 1 = 2; 2 + 1 = 3; 3 + 1 = 4; 4 + 1 = 5) and did not find a relationship to each corresponding'
  //     }
  //   },
  //   'C': {
  //     'Choice': 'The number of packages plus 11 equals the number of baseball cards.',
  //     'Key': {
  //       'Correct': false,
  //       'Rationale': 'The student likely noticed a “plus 11” relationship between consecutive values in the second column (22 + 11 = 33; 33 + 11 = 44; 44 + 11 = 55) and did not find a relationship to each corresponding'
  //     }
  //   },
  //   'D': {
  //     'Choice': 'The number of packages times 11 equals the number of baseball cards.',
  //     'Key': {
  //       'Correct': true,
  //       'Rationale': 'To determine which statement is true, the student should have found the relationship between each'
  //     }
  //   }
  // };

  constructor() { }

  // public onChange(file: File): void {
  //   let fileReader: FileReader = new FileReader();
  //   let self = this;
  //   fileReader.onloadend = function(x) {
  //     self.exam_data = fileReader.result;
  //   }
  //   fileReader.readAsText(file);
  // }

  toggle_button(val: string) {
    if (!this.filters.includes(val)) {
      this.filters.push(val)
    }
    else {
      if (this.filters.indexOf(val) !== -1) {
        this.filters.splice(this.filters.indexOf(val), 1);
      }
      else {
        this.filters.pop()
      }
    }
  }

  toggle_filter() {
    this.expand_filters = !this.expand_filters;
  }

  toggle_topic() {
    this.expand_topic = !this.expand_topic;
  }

  attempt_problem(ch: string) {
    this.problem_attempts += 1;
    if (this.problem_number == 1) {
      if (ch == 'A' && this.exam_dump[1].AnswerChoices.A.Key.Correct == true) {
        if (this.problem_attempts == 1) {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' try.'
        }
        else {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.'
        }
      }
      else if (ch == 'B' && this.exam_dump[1].AnswerChoices.B.Key.Correct == true) {
        if (this.problem_attempts == 1) {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' try.'
        }
        else {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.'
        }
      }
      else if (ch == 'C' && this.exam_dump[1].AnswerChoices.C.Key.Correct == true) {
        if (this.problem_attempts == 1) {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' try.'
        }
        else {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.'
        }
      }
      else if (ch == 'D' && this.exam_dump[1].AnswerChoices.D.Key.Correct == true) {
        if (this.problem_attempts == 1) {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' try.'
        }
        else {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.'
        }
      }
      else {
        this.attempt_response = 'That is not the correct answer - have another try.'
      }
    }
    if (this.problem_number == 2) {
      if (ch == 'F' && this.exam_dump[2].AnswerChoices.F.Key.Correct == true) {
        if (this.problem_attempts == 1) {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' try.'
        }
        else {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.'
        }
      }
      else if (ch == 'G' && this.exam_dump[2].AnswerChoices.G.Key.Correct == true) {
        if (this.problem_attempts == 1) {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' try.'
        }
        else {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.'
        }
      }
      else if (ch == 'H' && this.exam_dump[2].AnswerChoices.H.Key.Correct == true) {
        if (this.problem_attempts == 1) {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' try.'
        }
        else {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.'
        }
      }
      else if (ch == 'J' && this.exam_dump[2].AnswerChoices.J.Key.Correct == true) {
        if (this.problem_attempts == 1) {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' try.'
        }
        else {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.'
        }
      }
      else {
        this.attempt_response = 'That is not the correct answer - have another try.'
      }
    }
    if (this.problem_number == 3) {
      if (ch == 'A' && this.exam_dump[3].AnswerChoices.A.Key.Correct == true) {
        if (this.problem_attempts == 1) {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' try.'
        }
        else {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.'
        }
      }
      else if (ch == 'B' && this.exam_dump[3].AnswerChoices.B.Key.Correct == true) {
        if (this.problem_attempts == 1) {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' try.'
        }
        else {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.'
        }
      }
      else if (ch == 'C' && this.exam_dump[3].AnswerChoices.C.Key.Correct == true) {
        if (this.problem_attempts == 1) {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' try.'
        }
        else {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.'
        }
      }
      else if (ch == 'D' && this.exam_dump[3].AnswerChoices.D.Key.Correct == true) {
        if (this.problem_attempts == 1) {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' try.'
        }
        else {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.'
        }
      }
      else {
        this.attempt_response = 'That is not the correct answer - have another try.'
      }
    }
    if (this.problem_number == 4) {
      if (ch == 'F' && this.exam_dump[4].AnswerChoices.F.Key.Correct == true) {
        if (this.problem_attempts == 1) {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' try.'
        }
        else {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.'
        }
      }
      else if (ch == 'G' && this.exam_dump[4].AnswerChoices.G.Key.Correct == true) {
        if (this.problem_attempts == 1) {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' try.'
        }
        else {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.'
        }
      }
      else if (ch == 'H' && this.exam_dump[4].AnswerChoices.H.Key.Correct == true) {
        if (this.problem_attempts == 1) {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' try.'
        }
        else {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.'
        }
      }
      else if (ch == 'J' && this.exam_dump[4].AnswerChoices.J.Key.Correct == true) {
        if (this.problem_attempts == 1) {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' try.'
        }
        else {
          this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.'
        }
      }
      else {
        this.attempt_response = 'That is not the correct answer - have another try.'
      }
    }
    if (this.problem_number == 5) {
      // if (ch == 'A' && this.exam_dump[5].AnswerChoices.A.Key.Correct == true) {
      //   this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.'
      // }
      // else if (ch == 'B' && this.exam_dump[5].AnswerChoices.B.Key.Correct == true) {
      //   this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.'
      // }
      // else if (ch == 'C' && this.exam_dump[5].AnswerChoices.C.Key.Correct == true) {
      //   this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.'
      // }
      // else if (ch == 'D' && this.exam_dump[5].AnswerChoices.D.Key.Correct == true) {
      //   this.attempt_response = 'Correct! You got the right answer in ' + this.problem_attempts.toString() + ' tries.'
      // }
      // else {
      //   this.attempt_response = 'That is not the correct answer - have another try.'
      // }
    }
  }

  next_problem() {
    this.problem_number += 1;
    this.problem_attempts = 0;
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }
  
  scroll2(el: HTMLElement) {
    window.scrollTo({left: 0, top: el.getBoundingClientRect().top-80, behavior: 'smooth'});
  }

  ngOnInit() {

  }
}
