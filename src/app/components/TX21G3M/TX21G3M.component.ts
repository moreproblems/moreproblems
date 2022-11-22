import { Component, OnInit, Injectable } from '@angular/core';
// import {NgPipesModule} from 'ngx-pipes';
// import * as fs from 'fs';
// import * as path from 'path';

// function syncReadFile(filename: string) {
//   const result = fs.readFile(path.join(__dirname, filename), 'utf8');
//   console.log(result);
//   return result;
// }

@Component({
    selector: 'app-problems',
    templateUrl: './TX21G3M.component.html',
    styleUrls: ['./TX21G3M.component.css']
})

@Injectable()
export class TX21G3MComponent implements OnInit {
    title = 'More Problems';

    et_counter: number = 0;
    et_minutes: number = 0;
    et_timer: any;
    et_running: boolean = false;
    pt_counter: number = 0;
    pt_minutes: number = 0;
    pt_timer: any;
    pt_running: boolean = false;

    filters: string[] = [];
    expand_filters = true;

    exam_dump_file = 'src/app/assets/Exams/exams.txt';
    exam_code = 'TX21G3M'
    exam_file = 'src/app/assets/Exams/Texas/' + this.exam_code + '/' + this.exam_code + '-problems.txt';

    // exam_data = fs.readFileSync(this.problem_file, 'utf8');
    // exam_data: string = '';
    // fileReader: FileReader = new FileReader()
    // this.fileReader.readAsText(this.problem_file);

    exam_state = 'Texas';
    exam_grade = 'Grade 3';
    exam_subject = 'Mathematics';
    exam_name = 'STAAR';
    exam_year = '2021';
    exam_length = 32;

    exam_dump: { [key: number]: { 'Number': number, 'Type': string, 'NumChoices': number, 'Topic': string, 'SubTopic': string, 'Content': string[], 'AnswerChoices': { [key: string]: { 'Choice': string, 'Key': { 'Correct': boolean, 'Rationale': string } } } } } = {
        1: {
            'Number': 1,
            'Type': 'MC',
            'NumChoices': 4,
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
            'NumChoices': 4,
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
            'NumChoices': 4,
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
            'Type': 'MC',
            'NumChoices': 4,
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
            'NumChoices': 0,
            'Topic': 'Number & Operations',
            'SubTopic': 'Compose and decompose numbers up to 100,000 as a sum of so many ten thousands, so many thousands, so many hundreds, so many tens, and so many ones using objects, pictorial models, and numbers, including expanded notation as appropriate',
            'Content': [
                'An expression is shown.',
                '70 + 2 + 900',
                'What number is equivalent to this expression?'
            ],
            'AnswerChoices': {
                'Key': {
                    'Choice': '972',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'To determine a number that is equivalent to the expression, the student should have put the digits from the expression in place-value order. From left to right‚ the place-value order is hundreds place‚ tens place‚ and ones place. The student should have used a 9 in the hundreds place for the 900 in the expression, a 7 in the tens place for the 70 in the expression, and a 2 in the ones place for the 2 in the expression (972). This is an efficient way to solve the problem; however‚ other methods could be used to solve the problem correctly.'
                    }
                }
            }
        },
        6: {
            'Number': 6,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Data Analysis',
            'SubTopic': 'Summarize a data set with multiple categories using a frequency table, dot plot, pictograph, or bar graph with scaled intervals',
            'Content': [
                'The bar graph shows the number of math problems each of five students completed during math class.',
                'Exams/Texas/TX21G3M/media/6a.jpg',
                'Which list matches the data in the bar graph?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': 'Jeff: 6 Amber: 24 Gary: 8 Farrah: 14 Steve: 20',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely miscounted the unlabeled grid lines as 2 instead of 3 on the bar graph and chose the list in which Gary completed 8 math problems instead of 9, Farrah completed 14 math problems instead of 15, and Steve completed 20 math problems instead of 21. The student needs to focus on understanding how to accurately interpret data on a bar graph when the values fall on unlabeled grid lines.'
                    }
                },
                'G': {
                    'Choice': 'Jeff: 9 Amber: 24 Gary: 6 Farrah: 15 Steve: 21',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely switched the values for Jeff and Gary and chose the list in which Gary completed 6 instead of 9 math problems and Jeff completed 9 instead of 6 math problems. The student needs to focus on understanding how to accurately read and interpret a bar graph.'
                    }
                },
                'H': {
                    'Choice': 'Jeff: 6 Amber: 24 Gary: 9 Farrah: 15 Steve: 21',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the list that matches the data in the bar graph, the student should have determined the value of each bar to determine the number of math problems each of the five students completed. The student should have determined that Jeff completed 6 math problems, Amber completed 24 math problems, Gary completed 9 math problems (since the bar falls halfway between the labeled increments of 6 and 12), Farrah completed 15 math problems (since the bar falls halfway between the labeled increments of 12 and 18), and Steve completed 21 math problems (since the bar falls halfway between the labeled increments of 18 and 24). Then the student should have chosen the list of data matching the bar lengths for each student.'
                    }
                },
                'J': {
                    'Choice': 'Jeff: 6 Amber: 21 Gary: 9 Farrah: 15 Steve: 24',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely switched the values of the data for Steve and Amber and chose the list in which Amber completed 21 instead of 24 math problems and Steve completed 24 instead of 21 math problems. The student needs to focus on understanding how to accurately read and interpret a bar graph.'
                    }
                }
            }
        },
        7: {
            'Number': 7,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Geometry & Measurement',
            'SubTopic': 'Determine the area of rectangles with whole number side lengths in problems using multiplication related to the number of rows times the number of unit squares in each row',
            'Content': [
                'Workers at a school are covering a rectangular patio with square tiles. Each square tile has an area of 1 square yard. The figure shows the part of the patio that has already been covered with square tiles.',
                'Exams/Texas/TX21G3M/media/7a.jpg',
                'What is the area of the entire patio in square yards?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': '105 square yards',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the area of (amount of space covered by) the entire patio in square yards, the student should have determined the number of rows and the number of squares in each row of the figure representing the patio. The figure covers 7 rows, and each row is 15 squares long. The student then could have multiplied 15 by 7 (15 × 7 = 105). Because the figure can be filled with 105 squares, it represents an area of 105 square yards.'
                    }
                },
                'B': {
                    'Choice': '90 square yards',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely miscounted the number of rows and multiplied 6 × 15 to get 90 square yards. The student needs to focus on understanding how to interpret area models accurately.'
                    }
                },
                'C': {
                    'Choice': '98 square yards',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely miscounted the number of squares in each row and multiplied 7 × 14 to get 98 square yards. The student needs to focus on understanding how to interpret area models accurately.'
                    }
                },
                'D': {
                    'Choice': '84 square yards',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely miscounted the number of rows and miscounted the number of squares in each row and multiplied 6 × 14 to get 84 square yards. The student needs to focus on understanding how to interpret area models accurately.'
                    }
                }
            }
        },
        8: {
            'Number': 8,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Number & Operations',
            'SubTopic': 'Round to the nearest 10 or 100 or use compatible numbers to estimate solutions to addition and subtraction problems',
            'Content': [
                'The table shows the number of snow cones sold at a shop on each of three days.',
                'Exams/Texas/TX21G3M/media/8a.jpg',
                'Which answer choice is the best estimate of the total number of snow cones sold on these three days?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': '600',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely rounded the number of snow cones sold each day to the nearest hundred but rounded 273 down to 200 instead of up to 300. The student then added 200 + 300 + 100 to get an estimate of 600. The student needs to focus on understanding how to round a number to the nearest hundred.'
                    }
                },
                'G': {
                    'Choice': '700',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the best estimate of the total number of snow cones sold on the three days, the student could have rounded the number of snow cones sold each day to the nearest hundred. When rounded to the nearest hundred, the numbers are as follows: 273 rounds to 300; 123 rounds to 100; and 305 rounds to 300. Then the student should have added the rounded amounts, resulting in 700 (300 + 100 + 300 = 700). This is an efficient way to solve the problem; however, other methods could be used to solve the problem correctly.'
                    }
                },
                'H': {
                    'Choice': '900',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely rounded the number of snow cones sold each day to the nearest hundred but rounded 123 up to 200 instead of down to 100 and 305 up to 400 instead of down to 300. The student then added 300 + 200 + 400 to get an estimate of 900. The student needs to focus on understanding how to round a number to the nearest hundred.'
                    }
                },
                'J': {
                    'Choice': '800',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely rounded the number of snow cones sold each day to the nearest hundred but rounded 305 up to 400 instead of down to 300. The student then added 300 + 100 + 400 to get an estimate of 800. The student needs to focus on understanding how to round a number to the nearest hundred.'
                    }
                }
            }
        },
        9: {
            'Number': 9,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Geometry & Measurement',
            'SubTopic': 'Determine the perimeter of a polygon or a missing length when given perimeter and remaining side lengths in problems',
            'Content': [
                'The side lengths of a rectangular mirror are shown in inches.',
                'Exams/Texas/TX21G3M/media/9a.jpg',
                'What is the perimeter of the mirror in inches?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': '72 in.',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely added the side lengths together (18 + 28) but did not regroup to the tens place (second digit from the right), resulting in 36 instead of 46. Then the student added 36 + 36 to find the perimeter (36 + 36 = 72). The student needs to focus on adding numbers accurately.'
                    }
                },
                'B': {
                    'Choice': '46 in.',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely added the given side lengths (18 + 28 = 46). The student needs to focus on understanding perimeter and how to calculate it.'
                    }
                },
                'C': {
                    'Choice': '74 in.',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely added only three of the side lengths instead of all four of the side lengths (18 + 28 + 28 = 74). The student needs to focus on understanding perimeter and how to calculate it.'
                    }
                },
                'D': {
                    'Choice': '92 in.',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the perimeter (the distance around the outside) of the rectangular mirror, the student should have first recognized that both sides of the mirror are 28 inches long and both the top and bottom sides are 18 inches wide. Then the student could have added all of the side lengths (18 + 28 + 18 + 28 = 92). This is an efficient way to solve the problem; however, other methods could be used to solve the problem correctly.'
                    }
                }
            }
        },
        10: {
            'Number': 10,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Number & Operations',
            'SubTopic': 'Solve one-step and two-step problems involving multiplication and division within 100 using strategies based on objects; pictorial models, including arrays, area models, and equal groups; properties of operations; or recall of facts',
            'Content': [
                'Miriam had 63 flowers and 9 vases.',
                '•  She threw away 9 flowers that had broken stems.',
                '•  She put an equal number of all the flowers she had left into each vase.',
                'What is the greatest number of flowers Miriam put into each vase?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': '2',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely realized that division and subtraction were needed to solve the problem but divided first and then subtracted (63 ÷ 9 = 7; 9−− 7 = 2). The student needs to focus on understanding problem situations and the mathematical operations (+, −−, ×, ÷) needed to solve them.'
                    }
                },
                'G': {
                    'Choice': '7',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely disregarded the fact that Miriam did not use 9 flowers with broken stems and divided all of the flowers (63) by the number of vases (9) (63 ÷ 9 = 7). The student needs to focus on understanding problem situations and the mathematical operations (+, −, ×, ÷) needed to solve them.'
                    }
                },
                'H': {
                    'Choice': '8',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely added 9 to 63 instead of subtracting (63 + 9 = 72). The student then divided 72 by 9 to find the number of flowers in each vase (8). The student needs to focus on understanding problem situations and the mathematical operations (+, −, ×, ÷) needed to solve them.'
                    }
                },
                'J': {
                    'Choice': '6',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the greatest number of flowers Miriam put into each vase, the student could have subtracted the number of flowers with broken stems from the total number of flowers (63 − 9) to get the total number of flowers Miriam put into vases (54). Then the student could have divided the 54 flowers left by the number of vases, 9, to get the number of flowers in each vase (54 ÷ 9 = 6). This is an efficient way to solve the problem; however, other methods could be used to solve the problem correctly.'
                    }
                }
            }
        },
        11: {
            'Number': 11,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Data Analysis',
            'SubTopic': 'Solve one- and two-step problems using categorical data represented with a frequency table, dot plot, pictograph, or bar graph with scaled intervals',
            'Content': [
                'The bar graph shows the number of each different type of drink that was ordered in a restaurant one day.',
                'Exams/Texas/TX21G3M/media/11a.jpg',
                'What was the total number of drinks ordered?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': '205',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely made an addition error when adding in the tens place, thinking the sum in the tens place was 20 tens instead of 21 tens. The student needs to focus on how to add three or more two-digit numbers.'
                    }
                },
                'B': {
                    'Choice': '75',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely misunderstood the question, identifying the value of the tallest bar (tea) instead of finding the total number of drinks ordered. The student needs to focus on attending to the details of a question and accurately interpreting the graph when solving two-step problems involving bar graphs.'
                    }
                },
                'C': {
                    'Choice': '215',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the total number of drinks ordered, the student should have determined the value of each bar for each type of drink ordered. The student should have determined that water was ordered 50 times, lemonade was ordered 30 times, tea was ordered 75 times (since the bar falls on the unlabeled increment line above 70), and soda was ordered 60 times. The student then should have added the number of each type of drink ordered to get the total number of drinks ordered (50+30+75+60 = 215).'
                    }
                },
                'D': {
                    'Choice': '210',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely misread the value of the bar for tea as 70 since it landed on an unlabeled grid line (50 + 30 + 70 + 60 = 210). The student needs to focus on understanding how to accurately interpret data on a bar graph when the values fall on unlabeled grid lines.'
                    }
                }
            }
        },
        12: {
            'Number': 12,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Number & Operations',
            'SubTopic': 'Explain that two fractions are equivalent if and only if they are both represented by the same point on the number line or represent the same portion of a same size whole for an area model',
            'Content': [
                'Each strip of the diagram is shaded to represent a fraction of 1 whole.',
                '1 whole',
                'Exams/Texas/TX21G3M/media/12a.jpg',
                'The fractions represented are —'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': 'equivalent, because the shaded area of Strip B is greater than the shaded area of Strip A',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely recognized that the strips represent equivalent fractions but did not understand that the equivalence is not related to the number of shaded parts. The student needs to focus on understanding how to interpret area models accurately.'
                    }
                },
                'G': {
                    'Choice': 'not equivalent, because Strip A has 4 parts in all and Strip B has 8 parts in all',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely recognized that Strip A represents fourths and Strip B represents eighths and determined that since the strips represent fractions with different denominators (bottom numbers), the shaded part of the strips cannot represent fractions that are equivalent. The student needs to focus on understanding how to interpret area models accurately.'
                    }
                },
                'H': {
                    'Choice': 'equivalent, because the shaded area of Strip A is the same as the shaded area of Strip B',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine which statement is true, the student should have recognized that since the strip diagrams are the same size and the shaded area of Strip A is the same as the shaded area of Strip B, the fractions represented are equivalent.'
                    }
                },
                'J': {
                    'Choice': 'not equivalent, because Strip A has 3 shaded parts and Strip B has 6 shaded parts',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely noticed that Strip A has 3 shaded parts and Strip B has 6 shaded parts and determined that since the number of shaded parts in the two strips is different, the strips cannot represent equivalent fractions. The student needs to focus on understanding how to interpret area models accurately.'
                    }
                }
            }
        },
        13: {
            'Number': 13,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Algebraic Reasoning',
            'SubTopic': 'Represent real-world relationships using number pairs in a table and verbal descriptions',
            'Content': [
                'The table shows the numbers of baseball cards in different numbers of packages.',
                'Exams/Texas/TX21G3M/media/13a.jpg',
                'Based on the relationship shown in the table, which statement is true?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': 'The number of packages times 1 equals the number of baseball cards.',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely noticed a “plus 1” relationship between consecutive values in the first column (1 + 1 = 2; 2 + 1 = 3; 3 + 1 = 4; 4 + 1 = 5) and did not find a relationship to each corresponding number of baseball cards. The student also likely confused the operation of addition with multiplication, thinking that the “plus 1” relationship was the same as a “times 1” relationship. The student needs to focus on the details of verbal descriptions of relationships between numbers paired in a table.'
                    }
                },
                'B': {
                    'Choice': 'The number of packages plus 1 equals the number of baseball cards.',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely noticed a “plus 1” relationship between consecutive values in the first column (1 + 1 = 2; 2 + 1 = 3; 3 + 1 = 4; 4 + 1 = 5) and did not find a relationship to each corresponding'
                    }
                },
                'C': {
                    'Choice': 'The number of packages plus 11 equals the number of baseball cards.',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely noticed a “plus 11” relationship between consecutive values in the second column (22 + 11 = 33; 33 + 11 = 44; 44 + 11 = 55) and did not find a relationship to each corresponding number of packages. The student needs to focus on the details of verbal descriptions of relationships between numbers paired in a table.'
                    }
                },
                'D': {
                    'Choice': 'The number of packages times 11 equals the number of baseball cards.',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine which statement is true, the student should have found the relationship between each number of packages and each corresponding (paired) number of baseball cards in the table. The student should have seen that each number of baseball cards is 11 times the number of packages, so each package must have 11 baseball cards in it (2 × 11 = 22; 3 × 11 = 33; 4 × 11 = 44; 5 × 11 = 55).'
                    }
                }
            }
        },
        14: {
            'Number': 14,
            'Type': 'FR',
            'NumChoices': 0,
            'Topic': 'Number & Operations',
            'SubTopic': 'Recall facts to multiply up to 10 by 10 with automaticity and recall the corresponding division facts',
            'Content': [
                'There are 4 erasers on each table in a classroom. There are 5 tables in the classroom.',
                'What is the total number of erasers on all of the tables in this classroom?'
            ],
            'AnswerChoices': {
                'Key': {
                    'Choice': '20',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'To determine a number that is equivalent to the expression, the student should have put the digits from the expression in place-value order. From left to right‚ the place-value order is hundreds place‚ tens place‚ and ones place. The student should have used a 9 in the hundreds place for the 900 in the expression, a 7 in the tens place for the 70 in the expression, and a 2 in the ones place for the 2 in the expression (972). This is an efficient way to solve the problem; however‚ other methods could be used to solve the problem correctly.'
                    }
                }
            }
        },
        15: {
            'Number': 15,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Geometry & Measurement',
            'SubTopic': 'Determine when it is appropriate to use measurements of liquid volume (capacity) or weight',
            'Content': [
                'After a soccer game Isaac drank a bottle of water. Which unit of measurement can be used to measure the volume of the water in the bottle?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': 'Fluid ounces',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine which unit of measurement can be used to measure the volume of the water in the bottle, the student should have recalled the different possibilities for measuring liquid volume (amount of space taken up by a liquid). The student could have referred to the units shown in the Volume and Capacity section of the STAAR Grade 3 Mathematics Reference Materials page within the student’s test booklet for help.'
                    }
                },
                'B': {
                    'Choice': 'Grams',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely considered a unit used to measure mass to be a unit used to measure liquid volume. The student needs to focus on distinguishing between units used for measuring liquid volume and units used for measuring mass.'
                    }
                },
                'C': {
                    'Choice': 'Inches',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely considered a unit used to measure length to be a unit used to measure liquid volume. The student needs to focus on distinguishing between units used for measuring liquid volume and units used for measuring length.'
                    }
                },
                'D': {
                    'Choice': 'Square centimeters',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely considered a unit used to measure area to be a unit used to measure liquid volume. The student needs to focus on distinguishing between units used for measuring liquid volume and units used for measuring area.'
                    }
                }
            }
        },
        16: {
            'Number': 16,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Number & Operations',
            'SubTopic': 'Determine the total number of objects when equally sized groups of objects are combined or arranged in arrays up to 10 by 10',
            'Content': [
                'The electrical panel shown has 4 outlets.',
                'Exams/Texas/TX21G3M/media/16a.jpg',
                'How many outlets do 6 of these electrical panels have?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': '28',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely made an error when skip counting by 4; the last number after 6 skips was 28 instead of 24 (8, 12, 16, 20, 24, 28). The student needs to focus on how to determine the total number of objects when equal-size groups of objects are combined or arranged in arrays up to 10 by 10.'
                    }
                },
                'G': {
                    'Choice': '20',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely understood that multiplication should be used to solve the problem but confused the product (answer) of 4 × 6 (24) with the product of 4 × 5 (20). The student needs to focus on multiplying numbers accurately.'
                    }
                },
                'H': {
                    'Choice': '24',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the total number of outlets 6 electrical panels have, the student could have multiplied the 4 outlets on each panel by 6 panels (4 × 6 = 24). This is an efficient way to solve the problem; however, other methods could be used to solve the problem correctly.'
                    }
                },
                'J': {
                    'Choice': '10',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely added 4 to 6 instead of multiplying 4 by 6. The student needs to focus on understanding the mathematical operations (+, −−, ×, ÷) needed to solve real-world problems.'
                    }
                }
            }
        },
        17: {
            'Number': 17,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Number & Operations',
            'SubTopic': 'Compare two fractions having the same numerator or denominator in problems by reasoning about their sizes and justifying the conclusion using symbols, words, objects, and pictorial models',
            'Content': [
                'Fraction strips are shown.',
                'Exams/Texas/TX21G3M/media/17a.jpg',
                'Which comparison is true?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': '1/6 < 1/4',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine which comparison is true, the student could have colored in 1 of the 6 parts of the bottom row of the fraction strip model to represent 1/6 and 1 of the 4 parts in the fourth row of the model to represent 1/4 . The student also could have recognized that the parts in the bottom row of the model (sixths) are smaller than the parts in the fourth row of the model (fourths), so 1/6 < 1/4 , because sixths are smaller than fourths. This is an efficient way to solve the problem; however‚ other methods could be used to solve the problem correctly.'
                    }
                },
                'B': {
                    'Choice': '1/3 < 1/8',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely compared the 3 and 8 in the denominators (bottom numbers) of the fractions, found that 3 is less than (<) 8, and made the incorrect assumption that thirds are smaller than eighths. The student likely did not use the model to compare thirds to eighths. The student needs to focus on understanding how to compare fractions with the same numerator (top number) but different denominators.'
                    }
                },
                'C': {
                    'Choice': '1/4 > 1/2',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely compared the 4 and 2 in the denominators (bottom numbers) of the fractions, found that 4 is greater than (>) 2, and made the incorrect assumption that fourths are greater than halves. The student likely did not use the model to compare fourths to halves. The student needs to focus on understanding how to compare fractions with the same numerator (top number) but different denominators.'
                    }
                },
                'D': {
                    'Choice': '1/8 = 2/8',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely noticed that the denominators (bottom numbers) of the fractions were the same and assumed that the fractions were equivalent. The student needs to focus on understanding how to compare fractions with different numerators (top numbers) but the same denominator.'
                    }
                }
            }
        },
        18: {
            'Number': 18,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Geometry & Measurement',
            'SubTopic': 'Determine the area of rectangles with whole number side lengths in problems using multiplication related to the number of rows times the number of unit squares in each row',
            'Content': [
                'Heidi is making a rectangular card. The shaded rectangle on the grid represents the card.',
                'Exams/Texas/TX21G3M/media/18a.jpg',
                'What is the area of this card in square centimeters?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': '18 square centimeters',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely determined that there are 9 rows with 9 squares in each row in the shaded area but added 9 and 9 instead of multiplying 9 by 9 (9 + 9 = 18). The student needs to focus on understanding area and how to calculate it.'
                    }
                },
                'G': {
                    'Choice': '36 square centimeters',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely determined that there are 9 squares along each side of the shaded figure but calculated the perimeter (distance around the outside) of the shaded figure instead of the area of the shaded figure (9 + 9 + 9 + 9 = 36). The student needs to focus on understanding area and how to calculate it.'
                    }
                },
                'H': {
                    'Choice': '90 square centimeters',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely determined the number of squares in each row incorrectly, counting 10 instead of 9, and then multiplied (9 × 10 = 90) for the area of the blanket. The student needs to focus on understanding how to interpret area models accurately.'
                    }
                },
                'J': {
                    'Choice': '81 square centimeters',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the area of (amount of space covered by) the card, the student should have determined the number of rows and the number of squares in each row of the shaded figure representing the card. The shaded figure covers 9 rows, and each row is 9 squares long. The student then could have multiplied 9 by 9 or could have counted the number of squares covered by the shaded figure (81). Because the shaded figure covers 81 squares, it represents an area of 81 square centimeters.'
                    }
                }
            }
        },
        19: {
            'Number': 19,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Geometry & Measurement',
            'SubTopic': 'Represent fractions of halves, fourths, and eighths as distances from zero on a number line',
            'Content': [
                'An ant crawled 2/8 yard from an ant mound. On which number line does point A represent the ant’s position after crawling 2/8 yard?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': 'Exams/Texas/TX21G3M/media/19a.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely realized that point A should be two same-size sections from 0 but disregarded the total number of same-size sections in the number line. The student needs to focus on understanding that a fraction is composed of a numerator (top number) and a denominator (bottom number) and that when representing a fraction on a number line that goes from 0 to 1, the denominator is represented by the total number of same-size sections.'
                    }
                },
                'B': {
                    'Choice': 'Exams/Texas/TX21G3M/media/19b.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely realized that point A should be two same-size sections from 0 but counted tick marks by starting with the tick mark at 0. The student needs to focus on understanding how to move to the left and to the right on a number line when representing fractions.'
                    }
                },
                'C': {
                    'Choice': 'Exams/Texas/TX21G3M/media/19c.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely realized that point A would be two same-size sections from 0 but chose a number line with 8 tick marks after point A rather than 8 same-size sections from 0 to 1 yard. The student needs to focus on understanding that a fraction is composed of a numerator (top number) and a denominator (bottom number) and that when representing a fraction on a number line that goes from 0 to 1, the denominator is represented by the total number of same-size sections.'
                    }
                },
                'D': {
                    'Choice': 'Exams/Texas/TX21G3M/media/19d.jpg',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'The student likely realized that point A should be two same-size sections from 0 but counted tick marks by starting with the tick mark at 0. The student needs to focus on understanding how to move to the left and to the right on a number line when representing fractions.'
                    }
                }
            }
        },
        20: {
            'Number': 20,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Number & Operations',
            'SubTopic': 'Solve with fluency one-step and two-step problems involving addition and subtraction within 1,000 using strategies based on place value, properties of operations, and the relationship between addition and subtraction',
            'Content': [
                'There are two lions at a zoo. The weight of the younger lion is 379 pounds. The weight of the older lion is 514 pounds.',
                'What is the difference in pounds between these two weights?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': '235 lb',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely subtracted the values but did not regroup in the hundreds place (leftmost digit). The student needs to focus on understanding how to regroup when subtracting.'
                    }
                },
                'G': {
                    'Choice': '135 lb',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the difference between the two weights, the student should have interpreted that the word “difference” in the question meant that subtraction was necessary. The student should have subtracted 379 from 514 (514 − 379 = 135).'
                    }
                },
                'H': {
                    'Choice': '265 lb',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely found the difference by subtracting the smaller digit from the larger digit in each place value instead of regrouping (514 − 379 → 265). The student needs to focus on understanding how to regroup when subtracting.'
                    }
                },
                'J': {
                    'Choice': '145 lb',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely found the difference by subtracting the smaller digit from the larger digit in the ones place (rightmost digit) instead of regrouping (514 − 379 → 145). The student needs to focus on understanding how to regroup when subtracting.'
                    }
                }
            }
        },
        21: {
            'Number': 21,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Number & Operations',
            'SubTopic': 'Represent equivalent fractions with denominators of 2, 3, 4, 6, and 8 using a variety of objects and pictorial models, including number lines',
            'Content': [
                'Irene has a group of counters, as shown.',
                'Exams/Texas/TX21G3M/media/21a.jpg',
                'Which two fractions can represent the black counters in the group?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': '2/6 and 2/8',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely determined that 2/8 represents the black counters in the group but incorrectly thought that equivalent fractions needed to have the same numerator (top number). The student needs to focus on understanding how to compare fractions represented by area models.'
                    }
                },
                'B': {
                    'Choice': '1/3 and 2/6',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely counted the total number of black counters (2) and the total number of white counters (6) and concluded that 6/2 of the counters were black and recognized that 1/3 and 6/2 are equivalent. The student needs to focus on understanding how to compare fractions represented by area models.'
                    }
                },
                'C': {
                    'Choice': '1/4 and 2/8',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine which two fractions can represent the black counters in the group, the student could have counted the total number of counters (8) and the total number of black counters (2), concluding that 2/8 of the counters were black. Then the student could have counted the number of columns (4) and the number of columns with black counters (1), concluding that 1/4 of the counters were black. This is an efficient way to solve the problem; however, other methods could be used to solve the problem correctly.'
                    }
                },
                'D': {
                    'Choice': '1/4 and 2/4',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely counted the number of columns (4) and the number of columns with black counters (1) and concluded that 1/4 of the counters were black. The student then likely determined that equivalent fractions need to have the same denominator (bottom number). The student needs to focus on understanding how to compare fractions represented by area models.'
                    }
                }
            }
        },
        22: {
            'Number': 22,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Algebraic Reasoning',
            'SubTopic': 'Represent one- and two-step problems involving addition and subtraction of whole numbers to 1,000 using pictorial models, number lines, and equations',
            'Content': [
                'A cafeteria sold a total of 513 drinks on Wednesday. The table shows the number of each type of drink that was sold. The number of bottles of milk is missing from the table.',
                'Exams/Texas/TX21G3M/media/22a.jpg',
                'Which set of equations can be used to find the number of bottles of milk sold?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': 'Exams/Texas/TX21G3M/media/22b.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely realized that addition was needed to find the number of bottles of apple juice and bottles of water that were sold but then determined that this sum needed to be added to the total drinks sold on Wednesday (513) instead of subtracted from it. The student needs to focus on understanding problem situations and the mathematical operations (+, −, ×, ÷) needed to solve them.'
                    }
                },
                'G': {
                    'Choice': 'Exams/Texas/TX21G3M/media/22c.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely realized that subtraction was needed to find the number of bottles of milk that was missing from the table but then determined that the number of bottles of apple juice should be subtracted from the number of bottles of water rather than adding the numbers. The student needs to focus on understanding problem situations and the mathematical operations (+, −, ×, ÷) needed to solve them.'
                    }
                },
                'H': {
                    'Choice': 'Exams/Texas/TX21G3M/media/22d.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely realized that the number of bottles of apple juice could be subtracted from the total number of drinks sold to find the missing number of bottles of milk but then added instead of subtracting in the second step. The student needs to focus on understanding problem situations and the mathematical operations (+, −, ×, ÷) needed to solve them.'
                    }
                },
                'J': {
                    'Choice': 'Exams/Texas/TX21G3M/media/22e.jpg',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the set of equations that can be used to find the number of bottles of milk sold, the student should have first identified the set of equations that shows the addition ( + ) of the number of bottles of apple juice and the number of bottles of water sold (172 + 263 = 435). Then the student should have chosen the set of equations that shows subtracting ( − ) the sum (total) of the bottles of apple juice and the bottles of water (435) from the total number of drinks sold (513 − 435 = ).'
                    }
                }
            }
        },
        23: {
            'Number': 23,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Data Analysis',
            'SubTopic': 'Summarize a data set with multiple categories using a frequency table, dot plot, pictograph, or bar graph with scaled intervals',
            'Content': [
                'The pictograph shows the number of each type of balloon animal a clown made on Tuesday.',
                'Exams/Texas/TX21G3M/media/23a.jpg',
                'Which table correctly represents the data?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': 'Exams/Texas/TX21G3M/media/23b.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely counted each icon as 1 animal, disregarding the key, and then miscounted the number of icons for rabbits. The student needs to focus on understanding how to use a key in a pictograph to accurately represent data and how to represent data shown in a pictograph with accuracy.'
                    }
                },
                'B': {
                    'Choice': 'Exams/Texas/TX21G3M/media/23c.jpg',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine which table represents the data in the pictograph (graph that uses picture icons to represent numbers), the student should have multiplied the number of whole icons shown in each row by the number (2) shown in the key (sentence below each pictograph telling the value of each icon). The student should have identified the table that shows 8 dogs (4 × 2), 4 monkeys (2 × 2), 12 rabbits (6 × 2), and 6 bears (3 × 2).'
                    }
                },
                'D': {
                    'Choice': 'Exams/Texas/TX21G3M/media/23d.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely used the key to determine the number of each type of balloon animal but miscounted the number of icons for rabbits. The student needs to focus on understanding how to represent data shown in a pictograph with accuracy.'
                    }
                },
                'C': {
                    'Choice': 'Exams/Texas/TX21G3M/media/23e.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely counted each icon as 1 animal, disregarding the key. The student needs to focus on understanding how to use a key in a pictograph to accurately represent data.'
                    }
                }
            }
        },
        24: {
            'Number': 24,
            'Type': 'FR',
            'NumChoices': 0,
            'Topic': 'Geometry & Measurement',
            'SubTopic': 'Determine the perimeter of a polygon or a missing length when given perimeter and remaining side lengths in problems',
            'Content': [
                'The perimeter of the rectangular floor of Mr. Bryan’s cabin is 46 feet. The width of the floor is 10 feet, as shown.',
                'Exams/Texas/TX21G3M/media/24a.jpg',
                'What is the length of the floor of Mr. Bryan’s cabin in feet?'
            ],
            'AnswerChoices': {
                'Key': {
                    'Choice': '13',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'To determine the length of the rectangular floor, the student should have first recognized that the perimeter (distance around the outside) is 46 feet and the width of the floor is 10 feet and that the perimeter can be found by adding all the side lengths. Then the student could have subtracted the width of two sides of the floor from the perimeter (46 − 10 − 10 = 26). Then the student could have divided 26 feet by 2 since 26 is the length of 2 sides of the floor (26 ÷ 2 = 13) to find the length of one side. This is an efficient way to solve the problem; however, other methods could be used to solve the problem correctly.'
                    }
                }
            }
        },
        25: {
            'Number': 25,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Number & Operations',
            'SubTopic': 'Use strategies and algorithms, including the standard algorithm, to multiply a two-digit number by a one-digit number. Strategies may include mental math, partial products, and the commutative, associative, and distributive properties',
            'Content': [
                'A softball team played in 6 tournaments last year. The team paid $95 to play in each tournament.',
                'What was the total amount the softball team paid to play in these 6 tournaments?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': '$570',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the total amount the softball team paid to play in 6 tournaments, the student could have multiplied the $95 by the 6 tournaments (95 × 6 = 570). This is an efficient way to solve the problem; however, other methods could be used to solve the problem correctly.'
                    }
                },
                'B': {
                    'Choice': '$540',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely multiplied but did not regroup to the tens place (95 × 6 → 540). The student needs to focus on understanding how to regroup when multiplying.'
                    }
                },
                'C': {
                    'Choice': '$101',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely added 95 and 6 instead of multiplying (95 + 6 = 101). The student needs to focus on understanding the mathematical operations (+, −, ×, ÷) needed to solve real-world problems.'
                    }
                },
                'D': {
                    'Choice': '$480',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely understood that multiplication should be used to solve the problem but multiplied 90 by 6 instead of 95 by 6. The student then made a fact error resulting in a product of 480 instead of 540. The student needs to focus on understanding the mathematical operations ( +, −, ×, ÷) needed to solve real-world problems.'
                    }
                }
            }
        },
        26: {
            'Number': 26,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Number & Operations',
            'SubTopic': 'Compare two fractions having the same numerator or denominator in problems by reasoning about their sizes and justifying the conclusion using symbols, words, objects, and pictorial models',
            'Content': [
                'The models shown are the same size. Each model is divided into equal-size parts and is shaded to represent a fraction.',
                'Exams/Texas/TX21G3M/media/26a.jpg',
                'Exams/Texas/TX21G3M/media/26b.jpg',
                'Which statement is true?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': '6/8 < 8/8, because sixths are smaller parts than eighths',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely recognized that 6/8 is less than 8/8 but compared the shaded parts (numerators) in the explanation instead of comparing the total number of parts (denominators). The student needs to focus on understanding how to compare fractions with the same denominator but different numerators.'
                    }
                },
                'G': {
                    'Choice': ' 6/8 < 8/8, because 6 out of 8 parts is less than 8 out of 8 parts',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the true statement, the student should have first written the fraction represented by each model. The top model has 6 shaded parts (numerator, or top number) out of a total of 8 equal-size parts (denominator, or bottom number), representing the fraction 6/8 . The bottom model has 8 shaded parts (numerator) out of a total of 8 equal-size parts (denominator), representing the fraction 8/8. The student should have seen that the shaded part of the top model is smaller than the shaded part of the bottom model and determined that 6/8 < 8/8 , or 6/8 is less than 8/8.'
                    }
                },
                'H': {
                    'Choice': '6/8 > 8/8, because sixths are larger parts than eighths',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely recognized the explanation to be true but did not pay attention to the comparison and likely did not use the models to compare 6/8 to 8/8. The student needs to focus on understanding how to compare fractions with the same denominator but different numerators.'
                    }
                },
                'J': {
                    'Choice': '6/8 > 8/8, because 6 out of 8 parts is greater than 8 oout of 8 parts',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely confused “greater than” (>) with “less than” (<). The student needs to focus on correctly identifying the less than symbol when comparing fractions using models.”'
                    }
                }
            }
        },
        27: {
            'Number': 27,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Algebraic Reasoning',
            'SubTopic': 'Represent real-world relationships using number pairs in a table and verbal descriptions',
            'Content': [
                'Each day a bakery makes cookies and muffins. The number of cookies the bakery makes is always 12 more than the number of muffins it makes.',
                'Which table shows the relationship between the number of muffins and the number of cookies this bakery makes?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': 'Exams/Texas/TX21G3M/media/27a.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely chose the table that shows the number of muffins increasing by 12 and the number of cookies increasing by 12 added to the previous value and did not consider the relationship between each number of muffins and each number of cookies in the table. The student needs to focus on understanding the relationship between numbers paired in a table.'
                    }
                },
                'B': {
                    'Choice': 'Exams/Texas/TX21G3M/media/27b.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely reversed the relationship, choosing the table that shows that there were 12 more muffins than cookies rather than 12 more cookies than muffins. The student needs to focus on understanding the relationship between numbers paired in a table.'
                    }
                },
                'C': {
                    'Choice': 'Exams/Texas/TX21G3M/media/27c.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely confused addition with multiplication, thinking that the number of cookies was 12 times the number of muffins instead of 12 more than the number of muffins, and chose the table showing this relationship between the numbers in some of the pairs in the table but did not look at all of the pairs of the numbers in the table. The student needs to focus on understanding the relationship between numbers paired in a table.'
                    }
                },
                'D': {
                    'Choice': 'Exams/Texas/TX21G3M/media/27d.jpg',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the table that shows the relationship between the number of muffins and the number of cookies the bakery makes, the student should have added 12 to each number of muffins and then used the result to confirm each number of cookies listed in the table (12 + 12 = 24; 24 + 12 = 36; 48+12 = 60).'
                    }
                }
            }
        },
        28: {
            'Number': 28,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Geometry & Measurement',
            'SubTopic': 'Determine the solutions to problems involving addition and subtraction of time intervals in minutes using pictorial models or tools such as a 15-minute event plus a 30-minute event equals 45 minutes',
            'Content': [
                'On Saturday afternoon Marcus went to a swimming pool. The clock shows the time he arrived at the pool.',
                'Exams/Texas/TX21G3M/media/28a.jpg',
                'He left the pool 45 minutes later. At what time did Marcus leave the pool?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': '2:20 P.M.',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the time Marcus left the pool, the student should have determined that the time Marcus arrived at the pool shown on the clock was 1:35. Then the student could have added 45 minutes to that time by counting in 5-minute intervals. The student should have noticed that 45 minutes after 1:35 would be 20 minutes after 2 and selected 2:20. This is an efficient way to solve the problem; however, other methods could be used to solve the problem correctly.'
                    }
                },
                'G': {
                    'Choice': '7:55 P.M.',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely reversed the hour and minute hands, reading the time as 7:10 instead of 1:35. The student then added 45 minutes to 7:10 to get 7:55. The student needs to focus on understanding how to tell time on an analog clock.'
                    }
                },
                'H': {
                    'Choice': '2:15 P.M.',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely misread the time on the clock as 1:30 instead of 1:35. The student then added 45 minutes to 1:30 to get 2:15. The student needs to focus on understanding how to tell time on an analog clock.'
                    }
                },
                'J': {
                    'Choice': '3:20 P.M.',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely misread the time on the clock as 2:35 rather than 1:35. The student then added 45 minutes to 2:35 to get 3:20. The student needs to focus on understanding how to tell time accurately on an analog clock.'
                    }
                }
            }
        },
        29: {
            'Number': 29,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Algebraic Reasoning',
            'SubTopic': 'Represent and solve one- and two-step multiplication and division problems within 100 using arrays, strip diagrams, and equations',
            'Content': [
                'Cassandra used all the balloons in 11 packages to decorate for a party.',
                '•  There were 6 balloons in each package.',
                '•  Half of the balloons in each package were red.',
                'Which equation can be used to find the total number of red balloons Cassandra used?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': '11 × 6 - 3 = 63',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely realized that it was necessary to multiply the number of packages by the number of balloons in each package to find the total number of balloons. The student also likely realized that each package had 3 non-red balloons. However, the student then only subtracted one set of 3 non-red balloons from the total and did not consider the need to do this for all 11 packages. The student needs to focus on understanding the mathematical operations (+, −, ×, ÷) needed to solve multi-step, real-world problems.'
                    }
                },
                'B': {
                    'Choice': '11 × 6 ÷ 2 = 33',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine which equation can be used to find the total number of red balloons Cassandra used (33), the student should have multiplied the number of packages (11) by the number of balloons in each package (6) and then divided that amount in half (by 2).'
                    }
                },
                'C': {
                    'Choice': '11 - 6 + 2 = 7',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely misread the information in the problem and thought that it was necessary to subtract the number of balloons in each package and then add 2. The student needs to focus on the details in multi-step, real-world problems and understanding the mathematical operations (+, −, ×, ÷) needed to solve these problems.'
                    }
                },
                'D': {
                    'Choice': '11 × 6 ÷ 3 = 22',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely realized that it was necessary to multiply 11 by 6 to find the total number of balloons in all of the packages and that division was necessary to find the number of red balloons. However, the student divided the number of balloons in each package (6) by 2 to find the number of red balloons in each package and then divided the total number of balloons by that number (3) instead of by 2, choosing 11 × 6 ÷ 3 = 22. The student needs to focus on understanding the mathematical operations (+, −, ×, ÷) needed to solve multi-step, real-world problems.'
                    }
                }
            }
        },
        30: {
            'Number': 30,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Geometry & Measurement',
            'SubTopic': 'Classify and sort two- and three-dimensional figures, including cones, cylinders, spheres, triangular and rectangular prisms, and cubes, based on attributes using formal geometric language',
            'Content': [
                'The objects shown can be classified into groups based on their shape.',
                'Exams/Texas/TX21G3M/media/30a.jpg',
                'Which table best represents the classifications for these objects?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': 'Exams/Texas/TX21G3M/media/30b.jpg',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the correct way to group the objects, the student should have classified each figure according to its attributes (characteristics). The first and fourth figures are cylinders because they are round and have top and bottom bases in the shape of a circle; the bases are congruent and are parallel to each other. The second and third figures are rectangular prisms because they each have six faces that are rectangles.'
                    }
                },
                'G': {
                    'Choice': 'Exams/Texas/TX21G3M/media/30c.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely confused cubes (special prisms in which all of the faces are the same-size square) with rectangular prisms, determining that the eraser and the toolbox were cubes. The student needs to focus on understanding the attributes of prisms and cubes.'
                    }
                },
                'H': {
                    'Choice': 'Exams/Texas/TX21G3M/media/30d.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely confused spheres (round figures that look like a ball) with cylinders, determining that the can and the drum were spheres. The student needs to focus on understanding the attributes of cylinders and spheres.'
                    }
                },
                'J': {
                    'Choice': 'Exams/Texas/TX21G3M/media/30e.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely chose the correct group names but associated the objects to the incorrect groups. The student needs to focus on the details of problems involving attributes of objects.'
                    }
                }
            }
        },
        31: {
            'Number': 31,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Number & Operations',
            'SubTopic': 'Solve one-step and two-step problems involving multiplication and division within 100 using strategies based on objects; pictorial models, including arrays, area models, and equal groups; properties of operations; or recall of facts',
            'Content': [
                'Hector played a game 14 times. Each time he played, he threw 4 red balls and 3 green balls at a target.',
                'What was the total number of balls Hector threw at the target?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': '21',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely added the numbers in the problem (14 + 4 + 3 = 21). The student needs to focus on understanding the mathematical operations (+, −, ×, ÷) needed to solve multi-step, real-world problems.'
                    }
                },
                'B': {
                    'Choice': '68',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely added the number of green balls thrown (3) to the number of games (14) to get 17 and then multiplied that sum by 4 (14 + 3 = 17; 17 × 4 = 68). The student needs to focus on understanding the mathematical operations (+, −, ×, ÷) needed to solve multi-step, real-world problems.'
                    }
                },
                'C': {
                    'Choice': '98',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the total number of balls Hector threw at the target, the student could have added together the number of red balls (4) and the number of green balls (3) and then multiplied the number of games by the sum (4 + 3 = 7; 14 × 7 = 98). This is an efficient way to solve the problem; however, other methods could be used to solve the problem correctly.'
                    }
                },
                'D': {
                    'Choice': '46',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely multiplied 14 by 3 and then added the 4 red balls (14 × 3 = 42; 42 + 4 = 46). The student needs to focus on understanding the mathematical operations (+, −, ×, ÷) needed to solve multi-step, real-world problems.'
                    }
                }
            }
        },
        32: {
            'Number': 32,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Number & Operations',
            'SubTopic': 'Compare and order whole numbers up to 100,000 and represent comparisons using the symbols >, <, or =',
            'Content': [
                'Which comparison is NOT true?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': '17,090 > 2,984',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student chose a comparison that was true instead of a comparison that was not true, as directed. The comparison is true because 17,090 has 5 digits and 2,984 has 4 digits, so 17,090 must be greater than (>) 2,984. The student needs to focus on understanding place values of digits and how to compare them.'
                    }
                },
                'G': {
                    'Choice': '34,162 < 3,986',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the comparison that is NOT true (false), the student should have compared the digits in each place value of the two numbers in each comparison, starting with the greatest place value. Since 34,162 has 5 digits and 3,986 only has 4 digits, 34,162 must be greater than 3,986. The symbol < in the given comparison indicates 34,162 is less than 3,986, which makes the comparison not true.'
                    }
                },
                'H': {
                    'Choice': '16,538 > 15,981',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely compared only the digit in the hundreds place (digit to the right of the comma) and determined that since 5 is less than 9, 16,538 is less than (<) 15,981. The student needs to focus on understanding place values of digits and how to compare them.'
                    }
                },
                'J': {
                    'Choice': '2,438 < 3,438',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely disregarded the digits in the thousands place (digit to the left of the comma), and, since 438 = 438, determined that the numbers were equal. The student needs to focus on understanding place values of digits and how to compare them.'
                    }
                }
            }
        }
    };

    exam_key: string[] = ['B', 'H', 'A', 'H', '972', 'H', 'A', 'G', 'D', 'J', 'C', 'H', 'D', '20', 'A', 'H', 'A', 'J', 'D', 'G', 'C', 'J', 'B', '13', 'A', 'G', 'D', 'F', 'B', 'F', 'C', 'G']

    problem_number = 1;
    problem_selection = '';
    problem_attempts = 0;
    attempt_path: string[] = [];
    attempt_response = '';
    exam_submission: { [key: number]: { 'Number': number, 'Topic': string, 'Choice': string, 'Correct': string, 'Rationale': string, 'Attempts': number, 'Path': string[], 'Time': string } } = {
        1: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        2: {

            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        3: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        4: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        5: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        6: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        7: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        8: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        9: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        10: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        11: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        12: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        13: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        14: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        15: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        16: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        17: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        18: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        19: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        20: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        21: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        22: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        23: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        24: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        25: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        26: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        27: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        28: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        29: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        30: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        31: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        },
        32: {
            'Number': 0,
            'Topic': '',
            'Choice': '',
            'Correct': '',
            'Rationale': '',
            'Attempts': 0,
            'Path': [],
            'Time': ''
        }
    };

    exam_submission_list: any[] = [];
    number_correct = 0;
    correct_percent = 0;
    sub_form = '';
    parent_select = false;
    teacher_select = false;

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

    next_problem(choice: string) {
        for (const [num, prob] of Object.entries(this.exam_dump)) {
            if (this.problem_number == +num) {
                for (const [num2, sub] of Object.entries(this.exam_submission)) {
                    if (this.problem_number == +num2) {
                        sub.Time = this.pt_minutes.toString() + 'm ' + (this.pt_counter%60).toString() + 's';
                        sub.Number = this.problem_number;
                        sub.Topic = prob.Topic;
                        sub.Choice = choice;
                        sub.Attempts = this.problem_attempts;
                        sub.Path = this.attempt_path;
                        for (const [ch, key] of Object.entries(prob.AnswerChoices)) {
                            if (choice == ch) {
                                if (key.Key.Correct == true) {
                                    sub.Correct = '✅';
                                    this.number_correct += 1;
                                }
                                else {
                                    sub.Correct = this.exam_key[this.problem_number - 1];
                                }
                                sub.Rationale = key.Key.Rationale;
                            }
                            else if (prob.Type == 'FR') {
                                if (choice == key.Choice) {
                                    sub.Correct = '✅';
                                    this.number_correct += 1;
                                    sub.Rationale = key.Key.Rationale;
                                }
                                else {
                                    sub.Correct = this.exam_key[this.problem_number - 1];
                                    sub.Rationale = 'No rationale provided. The number submitted was not right';
                                }
                            }
                        }
                    }
                }
            }
        }
        if (this.problem_number == this.exam_length) {
            for (let i: number = 1; i <= this.exam_length; i++) {
                this.exam_submission_list.push(this.exam_submission[i]);
            }
        }
        this.correct_percent = Math.round(this.number_correct / this.problem_number * 100);
        this.problem_number += 1;
        this.problem_selection = '';
        this.problem_attempts = 0;
        this.attempt_path = [];
        this.clearProblemTimer();
        this.toggleProblemTimer();
        if (this.problem_number > this.exam_length) {
            this.toggleExamTimer();
        }
    }

    toggleExamTimer() {
        this.et_running = !this.et_running;
        if (this.et_running) {
            const startTime = Date.now() - (this.et_counter || 0);
            this.et_timer = setInterval(() => {
                this.et_counter = Math.round((Date.now() - startTime)/1000);
                this.et_minutes = Math.floor(this.et_counter/60);
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
                this.pt_counter = Math.round((Date.now() - startTime)/1000);
                this.pt_minutes = Math.floor(this.pt_counter/60);
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

    scroll(el: HTMLElement) {
        el.scrollIntoView({ behavior: 'smooth' });
    }

    scroll2(el: HTMLElement) {
        window.scrollTo({ left: 0, top: el.getBoundingClientRect().top - 80, behavior: 'smooth' });
    }

    ngOnInit() {
        this.toggleExamTimer();
        this.toggleProblemTimer();
    }
}
