import { Component, OnInit, Injectable } from '@angular/core';
// import * as fs from 'fs';
// import * as path from 'path';

// function syncReadFile(filename: string) {
//   const result = fs.readFile(path.join(__dirname, filename), 'utf8');
//   console.log(result);
//   return result;
// }

@Component({
    selector: 'app-problems',
    templateUrl: './TX19G3M.component.html',
    styleUrls: ['./TX19G3M.component.css']
})

@Injectable()
export class TX19G3MComponent implements OnInit {
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
    exam_year = '2019';
    exam_length = 32;

    exam_dump: { [key: number]: {'Number': number, 'Type': string, 'NumChoices': number, 'Topic': string, 'SubTopic': string, 'Content': string[], 'AnswerChoices': { [key: string]: {'Choice': string, 'Key': {'Correct': boolean, 'Rationale': string} } } } } = {
        1: {
            'Number': 1,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Number & Operations',
            'SubTopic': 'Describe the mathematical relationships found in the base-10 place value system through the hundred thousands place',
            'Content': [
                'Which list shows the numbers in order from greatest to least value?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': '38,945 9,052 9,181',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely understood that because 38,945 has five digits and 9,052 and 9,181 each have only four digits, 38,945 is the greatest number and should come first in the list. The student likely then compared the digits in the ones place (rightmost digits) for 9,052 and 9,181, concluding that 9,052 should come second in the list. The student should have started comparing the digits in the thousands place (leftmost digits) for 9,052 and 9,181 and then used the same method to compare the digits in the hundreds place (second digits from the left). The student needs to focus on understanding how to order whole numbers from greatest to least value.'
                    }
                },
                'B': {
                    'Choice': '6,912 29,013 34,987',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student identified a list of numbers in order from least to greatest instead of from greatest to least as directed. The student needs to focus on attending to the details of the question in problems that order whole numbers.'
                    }
                },
                'C': {
                    'Choice': '58,702 50,716 581',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the list that shows the numbers in order from greatest (largest) to least (smallest), the student should have compared the digits in each place value for each number. Since 58,702 and 50,716 both have five digits and 581 only has three digits, 581 must be the number with the least value, making its correct position in the list last. Next the student should have compared the digits in the ten-thousands place (leftmost digits) in 58,702 and 50,716 and determined that the digits represented the same value. Then the student should have compared the digits in the thousands place (second digits from the left) in 58,702 and 50,716 and determined that, since 8 is greater than 0, the number 58,702 is the greatest number and should come first in the list. The student should have determined that the list in order from greatest to least has 58,702 first, 50,716 second, and 581 last.'
                    }
                },
                'D': {
                    'Choice': '6,092 60,019 5,005',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely compared the leftmost digits in 6,092 and 60,019, incorrectly thinking that both digits were in the ten-thousands place. Then the student likely compared the values of the last three digits in each number. The student should have understood that the digit 6 in 6,092 is in the thousands place, the digit 6 in 60,019 is in the ten-thousands place, and 6 thousands is less than 6 ten-thousands, making 60,019 the number that should come first in the list. The student needs to focus on understanding how to order whole numbers from greatest to least value.'
                    }
                }
            }
        },
        2: {
            'Number': 2,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Number & Operations',
            'SubTopic': 'Solve one-step and two-step problems involving multiplication and division within 100 using strategies based on objects; pictorial models, including arrays, area models, and equal groups; properties of operations; or recall of facts',
            'Content': [
                'Gerardo bought 3 packages of mint gum and 2 packages of bubble gum. Each package had 8 pieces of gum.',
                'How many pieces of gum did Gerardo buy?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': '26',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely determined the number of pieces of mint gum correctly by multiplying 3 times 8 (3 × 8 = 24). Then the student likely added the 2 packages of mint gum to 24, resulting in 26. The student needs to focus on understanding the steps needed to find the answer to a two-step problem.'
                    }
                },
                'G': {
                    'Choice': '40',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the number of pieces of gum Gerardo bought (40), the student could have added the number of packages of mint gum (3) and the number of packages of bubble gum (2) and then multiplied that total (5) by the 8 pieces of gum in each package (3 + 2 5= ; 5 × 8 = 40). This is an efficient way to solve the problem; however, other methods could be used to solve the problem correctly.'
                    }
                },
                'H': {
                    'Choice': '12',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely multiplied 3 times 8 and then divided the answer by 2 (3 × 8 2= 4; 24 ÷ 2 = 12) .The student needs to focus on understanding problem situations and the mathematical operations (+, −, ×, ÷) needed to solve them.'}
                },
                'J': {
                    'Choice': '48',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely multiplied 3 times 2 and then multiplied the answer by 8 (3 × 2 6= ; 6 × 8 = 48). The student needs to focus on understanding problem situations and the mathematical operations (+, −, ×, ÷) needed to solve them.'}
                }
            }
        },
        3: {
            'Number': 3,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Data Analysis',
            'SubTopic': 'Summarize a data set with multiple categories using a frequency table, dot plot, pictograph, or bar graph with scaled intervals',
            'Content': [
                'Alberto ran for exercise every day for 16 days. The table shows how many days he ran each distance.',
                'Exams/Texas/TX19G3M/media/3a.jpg',
                'Which dot plot represents these data?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': 'Exams/Texas/TX19G3M/media/3b.jpg',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the correct dot plot (graph that uses dots to display data), the student should have chosen the dot plot that has dots matching the number of tally marks for each distance (two dots for 1 mile, five dots for 1 1/2 miles, three dots for 2 miles, four dots for 2 1/2 miles, and two dots for 3 miles).'
                    }
                },
                'B': {
                    'Choice': 'Exams/Texas/TX19G3M/media/3c.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely miscounted the numbers of dots on the dot plot for 1 1/2 miles and 2 1/2 miles. The student needs to focus on understanding how to accurately represent data in a dot plot.'
                    }
                },
                'C': {
                    'Choice': 'Exams/Texas/TX19G3M/media/3d.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student reversed the data for 1 1/2 miles and 2 1/2 miles, choosing the dot plot with four instead of five dots for 1 1/2 miles and five instead of four dots for 2 1/2 miles. The student needs to focus on understanding how to accurately represent data in a dot plot.'
                    }
                },
                'D': {
                    'Choice': 'Exams/Texas/TX19G3M/media/3e.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student chose a dot plot with one dot for each unique value instead of a dot plot with a dot for each occurrence of a value in the table. The student needs to focus on understanding that each number in a set of data should be represented with one dot on a dot plot.'
                    }
                }
            }
        },
        4: {
            'Number': 4,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Number & Operations',
            'SubTopic': 'Compose and decompose numbers up to 100,000 as a sum of so many ten thousands, so many thousands, so many hundreds, so many tens, and so many ones using objects, pictorial models, and numbers, including expanded notation as appropriate',
            'Content': [
                'The expanded form of a number is shown.',
                '90,000 + 200 + 40 + 1',
                'What is the standard form of this number?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': '9,241',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely confused 90,000 with 9,000 and placed the digit 9 in the thousands place instead of the ten-thousands place. The student needs to focus on understanding how to write numbers presented in expanded form as numerals.'
                    }
                },
                'G': {
                    'Choice': '92,041',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely confused 200 with 2,000 and placed the digit 2 in the thousands place instead of the hundreds place. The student needs to focus on understanding how to write numbers presented in expanded form as numerals.'
                    }
                },
                'H': {
                    'Choice': '90,241',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the standard form of the number (90,241), the student should have put the digits from the expanded form in place-value order. From left to right, the place-value order is ten-thousands place, thousands place, hundreds place, tens place, and ones place. The student should have used a 9 in the ten-thousands place for the 90,000 in the expanded form, a 0 in the thousands place because the expanded form has no indication of value for the thousands place, a 2 in the hundreds place for the 200 in the expanded form, a 4 in the tens place for the 40 in the expanded form, and a 1 in the ones place for the 1 in the expanded form.'
                    }
                },
                'J': {
                    'Choice': '90,421',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student reversed the digits in the hundreds place (2) and the tens place (4). The student needs to focus on understanding how to write numbers presented in expanded form as numerals.'
                    }
                }
            }
        },
        5: {
            'Number': 5,
            'Type': 'FR',
            'NumChoices': 0,
            'Topic': 'Number & Operations',
            'SubTopic': 'Recall facts to multiply up to 10 by 10 with automaticity and recall the corresponding division facts',
            'Content': [
                'Serafina put a total of 42 cupcakes into packages. She put 6 cupcakes into each package.',
                'What is the total number of packages Serafina used for these cupcakes?'
            ],
            'AnswerChoices': {
                'Key': {
                    'Choice': '7',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the total number of packages Serafina used, the student should have recognized that a values are correct total of 42 cupcakes with 6 cupcakes in “each package” indicates division (42 ÷ 6 = 7) .'
                    }
                }
            }
        },
        6: {
            'Number': 6,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Number & Operations',
            'SubTopic': 'Determine if a number is even or odd using divisibility rules',
            'Content': [
                'Which number is odd?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': '205',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine which number is odd (cannot be divided evenly by 2), the student should have looked at the digit in the ones place (rightmost digit). The digit 5 is odd, so the number 205 is also odd.'
                    }
                },
                'G': {
                    'Choice': '350',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely considered a number with a 0 in the ones place to be odd. The student needs to focus on understanding that numbers that have zeros in the ones place are even (can be evenly divided by 2).'
                    }
                },
                'H': {
                    'Choice': '168',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely looked at the digit 1 in the hundreds place (leftmost digit) instead of the digit 8 in the ones place. The student needs to focus on understanding how to determine whether a number is even or odd using divisibility rules.'
                    }
                },
                'J': {
                    'Choice': '514',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely looked at the digit 5 in the hundreds place (leftmost digit) and the digit 1 in the tens place (second digit to the left) instead of the digit 4 in the ones place. The student needs to focus on understanding how to determine whether a number is even or odd using divisibility rules.'
                    }
                }
            }
        },
        7: {
            'Number': 7,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Algebraic Reasoning',
            'SubTopic': 'Represent one- and two-step problems involving addition and subtraction of whole numbers to 1,000 using pictorial models, number lines, and equations',
            'Content': [
                'Freddie had $256 in his bank account.',
                '•  On Monday he put $50 more into his account.',
                '•  On Tuesday he took out $87 to buy a bicycle.',
                'Which equation can be used to find the amount of money Freddie had in his bank account after he took out money on Tuesday?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': 'Exams/Texas/TX19G3M/media/7a.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely thought that subtraction should be used instead of addition for the $50 Freddie put into his account. The student needs to focus on understanding problem situations and the mathematical operations (+, −, ×, ÷) needed to solve them.'
                    }
                },
                'B': {
                    'Choice': 'Exams/Texas/TX19G3M/media/7b.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely thought that addition should be used instead of subtraction for the $87 Freddie took out of his account. The student needs to focus on understanding problem situations and the mathematical operations (+, −, ×, ÷) needed to solve them.'
                    }
                },
                'C': {
                    'Choice': 'Exams/Texas/TX19G3M/media/7c.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student chose an equation that incorrectly has $250 as Freddie’s starting amount. The student then likely thought that subtraction should be used instead of addition for the $50 Freddie put into his account and that addition should be used instead of subtraction for the $87 Freddie took out of the account. The student needs to focus on attending to details and understanding the mathematical operations (+, −, ×, ÷) needed to solve problem situations.'
                    }
                },
                'D': {
                    'Choice': 'Exams/Texas/TX19G3M/media/7d.jpg',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the equation that can be used to find the amount of money Freddie had in his bank account after taking out money on Tuesday, the student should have first identified the equations that began with Freddie’s starting amount of $256. Then the student should have chosen the equation using addition ( + ) for the $50 Freddie put into his account and subtraction ( )− for the $87 Freddietook out of his account (256 + 50 − 87 = _).'
                    }
                }
            }
        },
        8: {
            'Number': 8,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Geometry & Measurement',
            'SubTopic': 'Decompose two congruent two-dimensional figures into parts with equal areas and express the area of each part as a unit fraction of the whole and recognize that equal shares of identical wholes need not have the same shape',
            'Content': [
                'Brandon drew the two congruent squares shown.',
                'Exams/Texas/TX19G3M/media/8a.jpg',
                '•  He divided one square into 2 congruent triangular parts.',
                '•  He divided the other square into 2 congruent rectangular parts.',
                'Which statement is true?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': 'Each triangular part and each rectangular part represents 1/2 the area of one square.',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine which statement is true, the student should have understood that dividing a square into 2 congruent (same size and shape) triangular parts results in parts that are each 1/2 the area of (amount of space covered by) the whole square. The student should have also understood thatdividing a square into 2 congruent rectangular parts also results in parts that are each 1/2 of the are of the whole square.'
                    }
                },
                'G': {
                    'Choice': 'Each triangular part has an area that is greater than the area of each rectangular part.',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely thought that the triangular parts looked bigger than the rectangular parts. The student needs to focus on understanding that figures can be divided in different ways to represent the same fraction.'
                    }
                },
                'H': {
                    'Choice': 'Each triangular part and each rectangular part represents 1/4 the area of one square.',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely understood that figures can be divided in different ways to represent the same fraction but confused the fraction represented when each square was divided into 2 congruent parts. The student needs to focus on understanding how to express the area of a part of a whole figure as a fraction.'
                    }
                },
                'J': {
                    'Choice': 'Each rectangular part has an area that is greater than the area of each triangular part.',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely thought that the rectangular parts looked bigger than the triangular parts. The student needs to focus on understanding that figures can be divided in different ways to represent the same fraction.'
                    }
                }
            }
        },
        9: {
            'Number': 9,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Geometry & Measurement',
            'SubTopic': 'Determine the solutions to problems involving addition and subtraction of time intervals in minutes using pictorial models or tools such as a 15-minute event plus a 30-minute event equals 45 minutes',
            'Content': [
                'Felix swam, rode his bike, and ran in a race.',
                '•',
                '•  He spent 19 minutes swimming.',
                '•  He spent 21 minutes riding his bike.',
                '•  He spent 30 minutes running.',
                'Exams/Texas/TX19G3M/media/9a.jpg',
                'What was the total amount of time Felix spent swimming, riding his bike, and running in this race?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': '1 hour 20 minutes',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely added correctly to get a total of 70 minutes but then made an error when finding the same amount of time represented in hours and minutes. The student needs to focus on understanding how to determine solutions to problems involving addition of time intervals when the solutions are greater (more) than 1 hour.'
                    }
                },
                'B': {
                    'Choice': '40 minutes',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely only added 19 minutes and 21 minutes and did not pay attention to the 30 minutes Felix spent running. The student needs to focus on attending to details in questions.'
                    }
                },
                'C': {
                    'Choice': '1 hour 10 minutes',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the total amount of time Felix spent swimming, riding his bike, and running in the race, the student should have added 19 minutes, 21 minutes, and 30 minutes, resulting in 70 minutes. Then the student should have understood that since 60 minutes is equal to 1 hour, 70 minutes is equal to 1 hour 10 minutes. The student could have also used the clock face provided to determine the total amount of time by counting the spaces between the 60 marks that go around the clock face (19 spaces + 21 spaces + 30 spaces = 70 spaces). Using this method, the student should have understood that once all 60 spaces on the clock face had been counted, an hour had been represented. The student should also have understood that the extra 10 spaces counted represent 10 minutes in a new hour.'
                    }
                },
                'D': {
                    'Choice': '1 hour',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely attempted to add 19 minutes, 21 minutes, and 30 minutes but did not regroup to the tens place when doing so (19+ 2 1+ 3 0 → 60)an d converted (changed) 60 minutes to 1 hour.'
                    }
                }
            }
        },
        10: {
            'Number': 10,
            'Type': 'MC',
            'NumChoices': 8,
            'Topic': 'Algebraic Reasoning',
            'SubTopic': 'Represent real-world relationships using number pairs in a table and verbal descriptions',
            'Content': [
                'There are 8 oranges in each bag for sale at a store. Which table shows the relationship between the number of bags and the number of oranges in the bags?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': 'Exams/Texas/TX19G3M/media/10a.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely chose the table with multiples of 8 (numbers like 8, 16, 24, and 32 that can be found when multiplying by 8) but did not consider the relationship between each number of bags and each number of oranges in the table. The student needs to focus on understanding the relationship between numbers paired in a table.'
                    }
                },
                'G': {
                    'Choice': 'Exams/Texas/TX19G3M/media/10b.jpg',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the table that shows the relationship between the number of bags and the number of oranges in the bags, the student should have multiplied each number of bags by 8 and then used the result to confirm each number of oranges listed in the table (2 × 8 = 16, 3 × 8 = 24, 4 × 8 = 32, and 5 × 8 = 40).'
                    }
                },
                'H': {
                    'Choice': 'Exams/Texas/TX19G3M/media/10c.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely added 8 to each number of bags instead of multiplying by 8. The student needs to focus on understanding the mathematical operations (+, −−, ×, ÷) needed to solve real-world problems.'
                    }
                },
                'J': {
                    'Choice': 'Exams/Texas/TX19G3M/media/10d.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely chose the table showing the correct relationship between the numbers in the first pair in the table but did not look at the remaining pairs of numbers in the table. The student needs to focus on understanding the relationship between numbers paired in a table.'
                    }
                }
            }
        },
        11: {
            'Number': 11,
            'Type': 'MC',
            'NumChoices': 6,
            'Topic': 'Geometry & Measurement',
            'SubTopic': 'Classify and sort two- and three-dimensional figures, including cones, cylinders, spheres, triangular and rectangular prisms, and cubes, based on attributes using formal geometric language',
            'Content': [
                'Which figure CANNOT be classified as a prism?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': 'Exams/Texas/TX19G3M/media/11a.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely did not recognize that a cube is a special prism in which all of the faces are the same-size square. The student needs to focus on understanding the characteristics of prisms.'
                    }
                },
                'B': {
                    'Choice': 'Exams/Texas/TX19G3M/media/11b.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely did not recognize that a prism could have triangular bases. The student needs to focus on understanding the characteristics of prisms.'
                    }
                },
                'C': {
                    'Choice': 'Exams/Texas/TX19G3M/media/11c.jpg',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the figure that CANNOT be classified as a prism, the student should have identified the characteristics of a prism (1. bases (sides) that are polygons (closed shapes with at least three sides), 2. bases that are the same size and shape, 3. bases that are parallel to each other (never touch), and 4. bases that are connected by rectangles). The first figure is a prism because it has square bases that are parallel to each other, are the same size, and are connected by rectangles. The second figure is a prism because it has triangular bases that are parallel to each other, are the same size and shape, and are connected by rectangles. The fourth figure is a prism because it has rectangular bases that are parallel to each other, are the same size and shape, and are connected by rectangles. The student should have recognized that the third figure is a cylinder and CANNOT be classified as a prism because the bases are circles and circles are not polygons.'
                    }
                },
                'D': {
                    'Choice': 'Exams/Texas/TX19G3M/media/11d.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely did not understand the characteristics of a prism. The student needs to focus on understanding the characteristics of prisms.'
                    }
                }
            }
        },
        12: {
            'Number': 12,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Algebraic Reasoning',
            'SubTopic': 'Represent and solve one- and two-step multiplication and division problems within 100 using arrays, strip diagrams, and equations',
            'Content': [
                'Stacy used 21 feet of ribbon to make bows. She used 3 feet of ribbon for each bow.',
                'Which equation can be used to find the number of bows Stacy made with this ribbon?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': '21 × 3 = 63',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely thought the values should be multiplied instead of divided. The student needs to focus on understanding the mathematical operations (+, −−, ×, ÷) needed to solve real-world'
                    }
                },
                'G': {
                    'Choice': '21 ÷ 3 = 7',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the equation that can be used to find the number of bows Stacy made with the ribbon (7), the student should have divided the total amount of ribbon (21 feet) by the same amount of ribbon used for each bow (3 feet).'
                    }
                },
                'H': {
                    'Choice': '21 + 3 = 24',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely thought the values should be added instead of divided. The student needs to focus on understanding the mathematical operations (+, −−, ×, ÷) needed to solve real-world problems.'
                    }
                },
                'J': {
                    'Choice': '21 - 3 = 18',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely thought the values should be subtracted instead of divided. The student needs to focus on understanding the mathematical operations (+, −−, ×, ÷) needed to solve real-world'
                    }
                }
            }
        },
        13: {
            'Number': 13,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Number & Operations',
            'SubTopic': 'Compare two fractions having the same numerator or denominator in problems by reasoning about their sizes and justifying the conclusion using symbols, words, objects, and pictorial models',
            'Content': [
                'Fraction strips are shown.',
                'Exams/Texas/TX19G3M/media/13a.jpg',
                'Which comparison and explanation are true?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': '5/6 < 5/8, because eighths are larger than sixths',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely compared the 8 and 6 in the denominators (bottom numbers) of the fractions, found that 6 is less than ( < ) 8, and made the incorrect assumption that eighths are larger than sixths. The student likely did not use the fraction strip model to compare eighths to sixths. The student needs to focus on understanding how to compare fractions with the same numerator (top number) but different denominators.'
                    }
                },
                'B': {
                    'Choice': '5/6 < 5/8, because sixths are larger than eighths',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely confused the comparison symbol for greater than ( )> with the comparison symbol for less than ( )< when comparing 5/6 and 5/8 . The student needs to focus on understanding how to use comparison symbols to compare fractions.'
                    }
                },
                'C': {
                    'Choice': '5/6 > 5/8, because eighths are larger than sixths',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely used the comparison symbol correctly to compare 5/6 and 5/8 but did not pay attention to the explanation of why the comparison is true. The student needs to focus on using words to describe why comparisons of fractions are true.'
                    }
                },
                'D': {
                    'Choice': '5/6 > 5/8, because sixths are larger than eighths',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine which comparison and explanation are true, the student could have colored in 5 of the 6 parts in the second row of the fraction strip model to represent 5/6 and 5 of the 8 parts in the third row of the model to represent 5/8 . The student should have recognized that 5/6 of a row is greater than ( > ) 5/8 of a row. The student also should have recognized that the parts in the second row of the model (sixths) are larger than the parts in the third row of the model (eighths), so 5/6 > 5/8 , because sixths are larger than eighths.'
                    }
                }
            }
        },
        14: {
            'Number': 14,
            'Type': 'FR',
            'NumChoices': 0,
            'Topic': '',
            'SubTopic': '',
            'Content': [
                'Gina’s journal has a square cover with the side length shown.',
                'Exams/Texas/TX19G3M/media/14a.jpg',
                'What is the perimeter of the cover of Gina’s journal in centimeters?'
            ],
            'AnswerChoices': {
                'Key': {
                    'Choice': '96',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the perimeter of (distance around) the cover of Gina’s journal, the student should have values are correct first recognized that each side of the square is the same length (24 centimeters). Then the student could have added all of the side lengths (24+ 2 4+ 2 4+ 2 4 = 96). The student could have also multiplied the given side length (24 cm) by the 4 sides (24 × 4 = 96).'
                    }
                } 
            }
        },
        15: {
            'Number': 15,
            'Type': 'MC',
            'NumChoices': 3,
            'Topic': 'Geometry & Measurement',
            'SubTopic': 'Determine the perimeter of a polygon or a missing length when given perimeter and remaining side lengths in problems',
            'Content': [
                'Roger has two boxes of nails. One box has 438 nails, and the other box has 375 nails.',
                'How many nailes does Roger have in these two boxes?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': '813',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the number of nails Roger has in these two boxes, the student should have added 438 to 375 (438 + 375 = 813).'
                    }
                },
                'B': {
                    'Choice': '703',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely added the values but did not regroup to the tens place (second digit from the right) and the hundreds place (leftmost digit). The student needs to focus on understanding how to regroup when adding.'
                    }
                },
                'C': {
                    'Choice': '814',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely attempted to add the values but made an error when adding the digits 8 and 5 in the ones place (rightmost digit), resulting in 8 + 5 → 14. The student needs to focus on adding numbers accurately.'
                    }
                },
                'D': {
                    'Choice': '713',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely added the values but did not regroup to the hundreds place (leftmost digit). The student needs to focus on understanding how to regroup when adding.'
                    }
                }
            }
        },
        16: {
            'Number': 16,
            'Type': 'MC',
            'NumChoices': 3,
            'Topic': 'Number & Operations',
            'SubTopic': 'Solve with fluency one-step and two-step problems involving addition and subtraction within 1,000 using strategies based on place value, properties of operations, and the relationship between addition and subtraction',
            'Content': [
                'The shaded figure on the grid represents Erin’s rectangular lawn.',
                'Exams/Texas/TX19G3M/media/16a.jpg',
                'What is the area in square meters of Erin\'s lawn?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': '18 square meters',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely determined that there are 12 squares along each long side of the shaded figure and 6 squares along each short side of the shaded figure but added 12 and 6 instead of multiplying 12 by (6 12 + 6 = 18). The student needs to focus on understanding area and how to calculate it.'
                    }
                },
                'G': {
                    'Choice': '36 square meters',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely determined that there are 12 squares along each long side of the shaded figure and 6 squares along each short side of the shaded figure but calculated the perimeter (distance around the outside) of the shaded figure instead of the area of the shaded figure (1 + 12 + 62 + 6 = 36). The student needs to focus on understanding area and how to calculate it.'
                    }
                },
                'H': {
                    'Choice': '62 square meters',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely did not regroup to the tens place (leftmost digit) when multiplying 12 times 6 (12 × 6 → 62). The student needs to focus on understanding how to regroup when multiplying.'
                    }
                },
                'J': {
                    'Choice': '72 square meters',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the area of (amount of space covered by) Erin’s lawn, the student should have determined the number of rows and the number of squares in each row of the shaded figure representing Erin’s lawn. The shaded figure covers 6 rows, and each row is 12 squares long. The student then could have multiplied 12 by 6 or could have counted the number of squares covered by the shaded figure (72). Because the shaded figure covers 72 squares, it represents an area of 72 square meters.'
                    }
                }
            }
        },
        17: {
            'Number': 17,
            'Type': 'MC',
            'NumChoices': 2,
            'Topic': 'Number & Operations',
            'SubTopic': 'Explain that the unit fraction 1/b represents the quantity formed by one part of a whole that has been partitioned into b equal parts where b is a non-zero whole number',
            'Content': [
                'Models R and T are shown.',
                'Exams/Texas/TX19G3M/media/17a.jpg',
                'Which statement is true?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': 'The shaded parts of Model R and Model T are different sizes, but each model represents the same fraction of the whole.',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely did not consider that the shaded parts of Model R and Model T must be the same size to represent the same fraction of the whole (1/5). The student needs to focus on understanding that the parts of a fraction model must be equal in size to represent a fraction of the total number of pieces.'
                    }
                },
                'B': {
                    'Choice': 'The shaded part of Model R cannot be written as the fraction 1/5 , because the parts are not all equal in size.',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine which statement is true, the student should have identified the shaded part of Model R as larger than the other parts. Then the student should have understood that, in order for 1/5 of the model to be shaded, 1 of 5 equal-size parts would have to be shaded.'
                    }
                },
                'C': {
                    'Choice': 'The shaded part of Model T is 1/4 , because the parts are all equal in size.',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely considered the denominator (bottom number) of the fraction represented by Model T to be 4 because there are 4 unshaded parts. The student needs to focus on understanding that a fraction is composed of a numerator (top number) represented by designated parts (shaded parts in this problem) and a denominator that is equal to the total number of parts in a whole.'
                    }
                },
                'D': {
                    'Choice': 'The total number of parts in Model R is 5, so 1/5 of Model R is shaded.',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely did not consider that the shaded part of Model R is not 1 of 5 equal-size parts and composed the fraction represented by Model R as 1 shaded part out of a total of 5 parts. The student needs to focus on understanding that the parts of a fraction model must be equal in size to represent a fraction of the total number of pieces.'
                    }
                }
            }
        },
        18: {
            'Number': 18,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Number & Operations',
            'SubTopic': 'Determine the number of objects in each group when a set of objects is partitioned into equal shares or a set of objects is shared equally',
            'Content': [
                'A group of 27 students played a game with the hoops shown. An equal number of the students shared each hoop.',
                'Exams/Texas/TX19G3M/media/18a.jpg',
                'How many students shared each hoop?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': '3',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the number of students who shared each hoop, the student should have divided the 27 students in the problem by 9 hoops, resulting in 3 students sharing each hoop (27 ÷ 9 = 3).'
                    }
                },
                'G': {
                    'Choice': '18',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely subtracted 9 from 27 instead of dividing 27 by 9. The student needs to focus on understanding the mathematical operations (+, −−, ×, ÷) needed to solve real-world problems.'
                    }
                },
                'H': {
                    'Choice': '9',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student chose the number of hoops given in the problem. The student needs to focus on understanding the mathematical operations (+, −−, ×, ÷) needed to solve real-world problems.'
                    }
                },
                'J': {
                    'Choice': '36',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely added 9 to 27 instead of dividing 27 by 9. The student needs to focus on understanding the mathematical operations (+, −−, ×, ÷) needed to solve real-world problems.'
                    }
                }
            }
        },
        19: {
            'Number': 19,
            'Type': 'MC',
            'NumChoices': 3,
            'Topic': 'Number & Operations',
            'SubTopic': 'Represent equivalent fractions with denominators of 2, 3, 4, 6, and 8 using a variety of objects and pictorial models, including number lines',
            'Content': [
                'Point P on the number line represents two equivalent fractions.',
                'Exams/Texas/TX19G3M/media/19a.jpg',
                'Which two equivalent fractions can point P represent?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': '1/4 and 1/8',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely identified that point P can represent 1/4 but did not know how to find the equivalent fraction with a denominator (bottom number) of 8. The student likely chose 1/4 and another fraction with the same numerator (top number) of 1. The student needs to focus on understanding how to represent equivalent fractions on number lines.'
                    }
                },
                'B': {
                    'Choice': '1/3 and 2/6',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely identified that point P is located at the end of the first section from 0 on the number line, identified that there are three sections between point P and 1, and thought the fraction represented was 1/3 instead of 1/4 . Then the student likely found the midpoints of the sections on the number line, counted the number of sections between 0 and point P (2), and counted the number of sections between point P and 1 (6) to determine that the fraction 2/6 is equivalent to 1/3 . The studentneeds to focus on understanding that a fraction is composed of a numerator (top number) and adenominator (bottom number) and that, when representing a fraction on a number line that goesfrom 0 to 1, the denominator is represented by the total number of sections.'
                    }
                },
                'C': {
                    'Choice': '1/4 and 2/8',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the equivalent fractions that point P can represent, the student could have first dentified that point P was located at the end of the first section of 4 same-size sections between 0 and 1 on the number line, or 1/4 of the way from 0 to 1. Then the student could have added marks at the midpoints (halfway points) of each section to divide the number line into eighths and recognized that point P can also represent a location that is 2/8 of the way from 0 to 1.'
                    }
                },
                'D': {
                    'Choice': '1/4 and 3/4',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely identified that point P can represent 1/4 but did not understand how to find an equivalent fraction. The student likely chose 1/4 and another fraction with the same denominator (bottom number) of 4. The student needs to focus on understanding how to represent equivalent fractions on number lines.'
                    }
                },
            }
        },
        20: {
            'Number': 20,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Number & Operations',
            'SubTopic': 'Determine the total number of objects when equally sized groups of objects are combined or arranged in arrays up to 10 by 10',
            'Content': [
                'There are 6 photographs on each page of an album. One page of the album is shown.',
                'Exams/Texas/TX19G3M/media/20a.jpg',
                'How many photographs are on 9 pages of the album?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': '48',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely multiplied 6 by the additional 8 pages of photographs that are not shown, omitting the photographs on the page already shown in the problem (6 × 8 = 48). The student needs to focus'
                    }
                },
                'G': {
                    'Choice': '45',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely understood that multiplication should be used to solve the problem but confused the product (answer) of 6 × 9 (54) with the product of 5 × 9 (45). The student needs to focus on'
                    }
                },
                'H': {
                    'Choice': '15',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely added 6 to 9 instead of multiplying 6 by 9. The student needs to focus on understanding the mathematical operations (+, −−, ×, ÷) needed to solve real-world problems.'
                    }
                },
                'J': {
                    'Choice': '54',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the number of photographs on 9 pages of the album, the student could have multiplied the 6 photographs on each page by 9 pages (6 × 9 = 54).'
                    }
                }
            }
        },
        21: {
            'Number': 21,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Algebraic Reasoning',
            'SubTopic': 'Represent real-world relationships using number pairs in a table and verbal descriptions',
            'Content': [
                'Four people at a snack bar each bought a drink. The table shows the amount of money each person gave the cashier and the amount of money each person got back in change.',
                'Exams/Texas/TX19G3M/media/21a.jpg',
                'Based on the relationship shown in the table, which statement is true?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': 'A drink at the snack bar costs 52 cents, because the amount given to the cashier minus 52 equals the amount of change.',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine which statement is true, the student should have found the relationship between each amount of money given to the cashier and each corresponding (paired) amount of change in the table. The student should have seen that each amount of money given to the cashier is 52 cents more than each amount of change received, so each drink must cost 52 cents (55 − 3 = 52, 60 − 8 = 52, 75 − 23 = 52, and 100 − 48 = 52).'
                    }
                },
                'B': {
                    'Choice': 'A drink at the snack bar costs 52 cents, because the amount given to the cashier plus 52 equals the amount of change.',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely looked at the corresponding numbers from right to left in the table and saw an additive ( + ) relationship (3 + 52 = 55, 8 + 52 = 60, 23 + 52 = 73, and 48 + 52 = 100) but did not consider that this relationship does not match the wording “amount given to the cashier plus 52 equals the amount of change” in the answer choice. The student needs to focus on attending to the details of verbal descriptions of relationships between numbers paired in a table.'
                    }
                },
                'C': {
                    'Choice': 'A drink at the snack bar costs 48 cents, because the amount given to the cashier minus 48 equals the amount of change.',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely understood that when an amount of money is given to a cashier, subtraction (−− ) is used to find the amount of change. The student likely only looked at the last pair of numbers in the table and made an error in subtracting (100 − 48 → 48). The student needs to focus on subtracting numbers accurately.'
                    }
                },
                'D': {
                    'Choice': 'A drink at the snack bar costs 48 cents, because the amount given to the cashier plus 48 equals the amount of change.',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely looked at the corresponding numbers from right to left in the table and saw an additive ( + ) relationship but did not consider that this relationship does not match the wording “amount given to the cashier plus 48 equals the amount of change.” The student likely only looked at the last pair of numbers in the table and made an error in adding (48 + 48 → 100). The studentneeds to focus on understanding relationships between numbers paired in a table and addingnumbers accurately.'
                    }
                }
            }
        },
        22: {
            'Number': 22,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Data Analysis',
            'SubTopic': 'Summarize a data set with multiple categories using a frequency table, dot plot, pictograph, or bar graph with scaled intervals',
            'Content': [
                'A school keeps boxes of paper of different colors in a room. The table shows how many boxes of each color are in the room.',
                'Exams/Texas/TX19G3M/media/22a.jpg',
                'Which answer choice does NOT represent the information in the table?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': 'Exams/Texas/TX19G3M/media/22b.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student chose an answer choice that does represent the information in the table instead of one that does NOT, or the student made an error in counting the bundles of tally marks (groups of 5 tally marks) in the table. The student needs to focus on attending to the details of the question and/or the student needs to focus on understanding how tally marks are used to represent data in tables.'
                    }
                },
                'G': {
                    'Choice': 'Exams/Texas/TX19G3M/media/22c.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student chose an answer choice that does represent the information in the table instead of one that does NOT, or the student made an error in using the key of the pictograph (graph that uses picture icons to represent numbers) to understand that each icon represents 12 boxes and each half icon represents 6 (half of 12). The student needs to focus on attending to the details of the question and/or the student needs to focus on understanding how icons and half icons are used to represent data in a pictograph.'
                    }
                },
                'J': {
                    'Choice': 'Exams/Texas/TX19G3M/media/22d.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student chose an answer choice that does represent the information in the table instead of one that does NOT, or the student made an error in using the key of the pictograph (graph that uses picture icons to represent numbers) to understand that each icon represents 6 boxes. The student needs to focus on attending to the details of the question and/or the student needs to focus on understanding how icons are used to represent data in a pictograph.'
                    }
                },
                'H': {
                    'Choice': 'Exams/Texas/TX19G3M/media/22e.jpg',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the answer choice that does NOT represent the information in the table, the student should have seen that the first, second, and fourth answer choices represent the values 48 for White, 24 for Yellow, 42 for Blue, and 18 for Red. While the bar graph in this third answer choice does represent 48 for White and 24 for Yellow, it incorrectly represents the value for Blue as 46 and the value for Red as 16.'
                    }
                }
            }
        },
        23: {
            'Number': 23,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Personal Financial Literacy',
            'SubTopic': 'Explain the connection between human capital/labor and income',
            'Content': [
                'Ms. Patterson works for a company. Which factor would most likely affect the amount of money Ms. Patterson gets paid by the company?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': 'The amount of money Ms. Patterson has to pay in bills',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely understood that Ms. Patterson would need money to pay bills but did not realize that a company would probably not take this into consideration when determining the amount Ms. Patterson gets paid. The student needs to focus on understanding the factors that companies use to determine the amounts of money to pay workers.'
                    }
                },
                'B': {
                    'Choice': 'The size of Ms. Patterson’s family',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely understood that Ms. Patterson would need money to pay for family expenses but did not realize that a company would probably not take this into consideration when determining the amount Ms. Patterson gets paid. The student needs to focus on understanding the factors that companies use to determine the amounts of money to pay workers.'
                    }
                },
                'C': {
                    'Choice': 'The amount of money Ms. Patterson saves every month',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely understood that Ms. Patterson would probably save some of the money she earns but did not realize that a company would probably not take this into consideration when determining the amount Ms. Patterson gets paid. The student needs to focus on understanding the factors that companies use to determine the amounts of money to pay workers.'
                    }
                },
                'D': {
                    'Choice': 'The work experience Ms. Patterson has',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the factor that would most likely affect the amount of money Ms. Patterson gets paid by the company, the student should have recognized that certain factors like education and work experience are considered by companies when deciding the amounts of money to pay workers.'
                    }
                }
            }
        },
        24: {
            'Number': 24,
            'Type': 'FR',
            'NumChoices': 0,
            'Topic': 'Number & Operations',
            'SubTopic': 'Ssolve with fluency one-step and two-step problems involving addition and subtraction within 1,000 using strategies based on place value, properties of operations, and the relationship between addition and subtraction',
            'Content': [
                'Samantha, Gordon, and Diego each brought an ice chest to a picnic.',
                '• The weight of Samantha’s ice chest was 83 pounds.',
                '• The weight of Gordon’s ice chest was 28 pounds.',
                '• The weight of Diego’s ice chest was 37 pounds.',
                'What was the difference in pounds between the weight of Samantha’s ice chest and the combined weight of Gordon’s and Diego’s ice chests?'
            ],
            'AnswerChoices': {
                'Key': {
                    'Choice': '18',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the difference between the weight of Samantha’s ice chest and the combined weight of values are correct Gordon’s and Diego’s ice chests, the student should have interpreted that the word “difference” in the question meant that subtraction ( )− was necessary and that the word “combined” meant addition ( + ) was necessary. The student could have first added the weights of Gordon’s ice chest (28 pounds) and Diego’s ice chest (37 pounds) to get the combined weight of 65 pounds (28 + 37 = 65). Then the student could have subtracted 65 pounds from the weight of Samantha’s ice chest (83 pounds), resulting in a difference of 18 pounds (83 − 65 = 18). This is an efficient way to solve the problem; however, other methods could be used to solve the problem correctly.'
                    }
                }
            }
        },
        25: {
            'Number': 25,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Geometry & Measurement',
            'SubTopic': 'Determine the perimeter of a polygon or a missing length when given perimeter and remaining side lengths in problems',
            'Content': [
                'A model of Mr. Estrada’s rectangular calculator is shown. Use the ruler provided to measure the length and width of the calculator to the nearest centimeter.',
                'Exams/Texas/TX19G3M/media/25a.jpg',
                'Which measurement is closest to the perimeter of the calculator in centimeters?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': '10 cm',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely only measured the length of the calculator and chose the answer choice indicating the length instead of the perimeter of the calculator. The student needs to focus on attending to details in questions.'
                    }
                },
                'B': {
                    'Choice': '32 cm',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the perimeter (distance around the outside) of the calculator, the student should have used the centimeter side of the ruler provided to measure the length and width of the calculator and then added all of the side lengths together. The student should have lined up the corner of the calculator with the zero on the ruler to find the length of approximately 10 centimeters and the width of approximately 6 centimeters. The student could have found the perimeter by adding 10 + 10 + 6 + 6 = 32.'
                    }
                },
                'C': {
                    'Choice': '16 cm',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely added one 10-centimeter side length and one 6-centimeter side length of the calculator, leaving out the other two side lengths that are needed to complete the perimeter. The student needs to focus on understanding perimeter and how to calculate it.'
                    }
                },
                'D': {
                    'Choice': '36 cm',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely lined up the corner of the calculator incorrectly with the 1-centimeter mark on the ruler instead of the zero. This error would have given a length of approximately 11 centimeters and a width of approximately 7 centimeters, leading to a perimeter calculation of 11 + 11 + 7 + 7 = 36. The student needs to focus on understanding how to properly use and read measurement tools.'
                    }
                }
            }
        },
        26: {
            'Number': 26,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Number & Operations',
            'SubTopic': 'Solve one-step and two-step problems involving multiplication and division within 100 using strategies based on objects; pictorial models, including arrays, area models, and equal groups; properties of operations; or recall of facts',
            'Content': [
                'Samantha, Gordon, and Diego each brought an ice chest to a picnic.',
                '• Each team has 10 players.',
                '• All of the players are used to make 6 groups during the practice.',
                '• There is an equal number of players in each group.',
                'How many players are in each group?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': '180',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely multiplied by 6 instead of dividing by 6 in the second step of the problem (3 × 10 × 6 = 180). The student needs to focus on understanding problem situations and the mathematical operations (+, −−, ×, ÷) needed to solve them.'
                    }
                },
                'G': {
                    'Choice': '6',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely made an error when dividing 30 by 6 in the second step of the problem (30 ÷ 6 → 6). The student needs to focus on dividing numbers accurately.'
                    }
                },
                'H': {
                    'Choice': '24',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely subtracted 6 instead of dividing by 6 in the second step of the problem (3 × 10 −− 6 = 24). The student needs to focus on understanding problem situations and the mathematical operations (+, −−, ×, ÷) needed to solve them.'
                    }
                },
                'J': {
                    'Choice': '5',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the number of players in each group (5), the student could have multiplied the 3 teams by 10 players on each team to get 30 players in all, and then the student could have divided 30 by the 6 groups (3 × 10 ÷ 6 = 5). This is an efficient way to solve the problem; however, other methods could be used to solve the problem correctly.'
                    }
                }
            }
        },
        27: {
            'Number': 27,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Number & Operations',
            'SubTopic': 'Compose and decompose numbers up to 100,000 as a sum of so many ten thousands, so many thousands, so many hundreds, so many tens, and so many ones using objects, pictorial models, and numbers, including expanded notation as appropriate',
            'Content': [
                'Which answer choice does NOT describe the number 7,140?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': 'The sum of seven thousands and fourteen tens',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student chose an answer choice that does describe the number 7,140 instead of one that does NOT, or the student did not understand that 14 tens is equal to 1 hundred and 4 tens. The student needs to focus on attending to the details of a question and/or the student needs to focus on understanding how numbers can be composed (put together) and decomposed (taken apart) in different ways.'
                    }
                },
                'B': {
                    'Choice': 'The sum of seven thousands, one hundred, and forty tens',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the answer choice that does NOT describe the number 7,140, the student should have first understood that 7,140 is made up of 7 thousands, 1 hundred, 4 tens, and 0 ones. Then the student should have understood that there are many ways to add numbers to make 7,140. The first, third, and fourth answer choices are all different ways to make 7,140. This answer choice is NOT a way to make 7,140 because the sum of 7 thousands, 1 hundred, and 40 tens is 7,500.'
                    }
                },
                'C': {
                    'Choice': 'The sum of seven thousands, one hundred, and four tens',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student chose an answer choice that does describe the number 7,140 instead of one that does NOT, or the student made an error in understanding how the number 7,140 can be described in words. The student needs to focus on attending to the details of a question and/or the student needs to focus on understanding how numbers can be described in words.'
                    }
                },
                'D': {
                    'Choice': 'The sum of seven thousands, one hundred, and forty ones',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student chose an answer choice that does describe the number 7,140 instead of one that does NOT, or the student did not understand that 40 ones is equal to 4 tens. The student needs to focus on attending to the details of a question and/or the student needs to focus on understanding how numbers can be composed (put together) and decomposed (taken apart) in different ways.'
                    }
                }
            }
        },
        28: {
            'Number': 28,
            'Type': 'MC',
            'NumChoices': 3,
            'Topic': 'Algebraic Reasoning',
            'SubTopic': 'Describe a multiplication expression as a comparison such as 3 x 24 represents 3 times as much as 24',
            'Content': [
                'There are 18 spoons in a drawer. This expression represents the number of forks in the same drawer.',
                '2 × 18',
                'Which statement is true?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': 'There are 2 more spoons than forks in the drawer',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely confused the words describing addition ( + ), “more than,” with the words describing multiplication, “times as many,” and reversed the numbers of spoons and forks in the drawer. The student needs to focus on understanding how to describe a multiplication expression using words such as “times as many” or “times as much.” The student also needs to focus on understanding the greater and lesser values when using words to describe these expressions'
                    }
                },
                'G': {
                    'Choice': 'There are 2 more forks than spoons in the drawer',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely confused the words describing addition ( + ), “more than,” with the words describing multiplication, “times as many.” The student needs to focus on understanding how to describe a multiplication expression using words such as “times as many” or “times as much.”'
                    }
                },
                'H': {
                    'Choice': 'There are 2 times as many forks as spoons in the drawer.',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine which statement is true, the student should have interpreted the multiplication ( × ) symbol in the expression as “times as many.” There are 18 spoons in the drawer and 2 × 18 forks in the drawer, indicating that the number of forks is “2 times” the 18 spoons in the drawer.'
                    }
                },
                'J': {
                    'Choice': 'There are 2 times as many spoons as forks in the drawer.',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely reversed the numbers of spoons and forks in the drawer. The student needs to focus on understanding the greater and lesser values when using words to describe multiplication expressions such as “times as many” or “times as much.”'
                    }
                }
            }
        },
        29: {
            'Number': 29,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Geometry & Measurement',
            'SubTopic': 'Represent fractions of halves, fourths, and eighths as distances from zero on a number line',
            'Content': [
                'Javier rode his bike a distance of 1/2 mile from his house. On which number line does point J represent Javier’s position after riding his bike?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': 'Exams/Texas/TX19G3M/media/29a.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely considered the fraction 1/2 to be represented on a number line as a point at the end of the first section from 0 with 2 same-size sections between point J and the 1-mile mark. The student needs to focus on understanding that a fraction is composed of a numerator (top number) and a denominator (bottom number) and that, when representing a fraction on a number line that goes from 0 to 1, the denominator is represented by the total number of sections.'
                    }
                },
                'B': {
                    'Choice': 'Exams/Texas/TX19G3M/media/29b.jpg',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the number line on which point J represents a position that is 1/2 mile from 0, or Javier’s house, the student should have found the point that is at the end of the first of 2 same-size sections'
                    }
                },
                'C': {
                    'Choice': 'Exams/Texas/TX19G3M/media/29c.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely considered only the numerator (top number) of the fraction and found the number line where point J was one section back from the 1-mile mark. The student needs to focus on understanding that a fraction is composed of a numerator and a denominator (bottom number) and that, when representing a fraction on a number line that goes from 0 to 1, the denominator is represented by the total number of sections. The student also needs to focus on moving from left to right on a number line with representing fractions.'
                    }
                },
                'D': {
                    'Choice': 'Exams/Texas/TX19G3M/media/29d.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely moved from right to left on the number line and considered the fraction 1/2 to be represented on a number line as a point at the end of the first section from 1 with 2 same-size sections between point J and 0. The student needs to focus on moving from left to right on a number line when representing fractions. The student also needs to focus on understanding that a fraction is composed of a numerator (top number) and a denominator (bottom number) and that, when representing a fraction on a number line that goes from 0 to 1, the denominator is represented by the total number of sections.'
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
                'The figures shown can be sorted into groups.',
                'Exams/Texas/TX19G3M/media/30a.jpg',
                'Which list shows a correct way to group these figures?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': '1 triangle, 3 quadrilaterals, and 1 pentagon',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the correct way to group the figures, the student should have classified each figure according to its attributes (characteristics). The first figure is a pentagon because it has five sides. The second, fourth, and fifth figures are quadrilaterals because they each have four sides. The third figure is a triangle because it has three sides.'
                    }
                },
                'G': {
                    'Choice': '1 triangle and 4 quadrilaterals',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely confused the pentagon for a quadrilateral. The student needs to focus on understanding the attributes of quadrilaterals and pentagons.'
                    }
                },
                'H': {
                    'Choice': ' triangle, 3 quadrilaterals, and 1 hexagon',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely confused the pentagon for a hexagon (figure with six sides). The student needs to focus on understanding the attributes of pentagons and hexagons.'
                    }
                },
                'J': {
                    'Choice': '1 triangle, 2 quadrilaterals, and 2 pentagons',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely confused one of the quadrilaterals for a pentagon. The student needs to focus on understanding the attributes of quadrilaterals and pentagons.'
                    }
                }
            }
        },
        31: {
            'Number': 31,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Number & Operations',
            'SubTopic': 'Determine the value of a collection of coins and bills',
            'Content': [
                'Dana used the money shown to buy a snack.',
                'Exams/Texas/TX19G3M/media/31a.jpg',
                'What amount of money did Dana use to buy the snack?'
            ],
            'AnswerChoices': {
                'A': {
                    'Choice': '$1.37',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely confused the nickel for a dime and added $0.10 instead of $0.05 ($1.00 + $0.25 + $0.10 + $0.01 + $0.01 = $1.37). The student needs to focus on distinguishing between nickels and dimes and understanding the values of the coins.'
                    }
                },
                'B': {
                    'Choice': '$1.32',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the amount of money Dana used to buy the snack, the student could have added the values of the 1 dollar, 1 quarter, 1 nickel, and 2 pennies shown using dollar notation ($1.00 + $0.25 + $0.05 + $0.01 + $0.01 = $1.32). The student could have also thought about the values in terms of cents and then changed to dollar notation (100 + 25 + 5 + 1 + 1 = 132 cents = $1.32).'
                    }
                },
                'C': {
                    'Choice': '$1.40',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely confused the pennies for nickels and added $0.05 instead of $0.01 for each one ($1.00 + $0.25 + $0.05 + $0.05 + $0.05 = $1.40). The student needs to focus on distinguishing between pennies and nickels and understanding the values of the coins.'
                    }
                },
                'D': {
                    'Choice': '$1.27',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely omitted the nickel when determining the value of the dollar bill and coins ($1.00 + $0.25 + $0.01 + $0.01 = $1.27). The student needs to focus on accurately determining the value of a collection of bills and coins.'
                    }
                }
            }
        },
        32: {
            'Number': 32,
            'Type': 'MC',
            'NumChoices': 4,
            'Topic': 'Algebraic Reasoning',
            'SubTopic': 'Represent and solve one- and two-step multiplication and division problems within 100 using arrays, strip diagrams, and equations',
            'Content': [
                'Yolanda made 11 sandwiches for a picnic. She used 2 pieces of bread for each sandwich.',
                'Which strip diagram can be used to find the number of pieces of bread Yolanda used?'
            ],
            'AnswerChoices': {
                'F': {
                    'Choice': 'Exams/Texas/TX19G3M/media/32a.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely confused what the numbers labeled in each section represent and chose a strip diagram that represents 11 × 11 instead of 2 × 11. The student needs to focus on understanding how to use strip diagrams to represent multiplication problems.'
                    }
                },
                'G': {
                    'Choice': 'Exams/Texas/TX19G3M/media/32b.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely confused what the number of same-size sections represent and chose a strip diagram that represents 2 × 2 instead of 2 × 11. The student needs to focus on understanding how to use strip diagrams to represent multiplication problems.'
                    }
                },
                'H': {
                    'Choice': 'Exams/Texas/TX19G3M/media/32c.jpg',
                    'Key': {
                        'Correct': false,
                        'Rationale': 'The student likely confused a strip diagram modeling addition (2 + 11) instead of multiplication (2 × 11). The student needs to focus on understanding how to use strip diagrams to represent multiplication problems.'
                    }
                },
    
                'J': {
                    'Choice': 'Exams/Texas/TX19G3M/media/32d.jpg',
                    'Key': {
                        'Correct': true,
                        'Rationale': 'To determine the strip diagram that can be used, the student should have understood that the strip diagram should use same-size sections to model the multiplication problem 2 × 11 = ?, where “?” represents the total number of pieces of bread Yolanda used. The strip diagram shows 11 same-size sections representing the sandwiches labeled with a 2 in each section to represent the number of pieces of bread used for each sandwich.'
                    }
                }
            }
        }
    };

    exam_key: string[] = ['C', 'G', 'A', 'H', '7', 'F', 'D', 'F', 'C', 'G', 'C', 'G', 'D', '96', 'A', 'J', 'B', 'F', 'C', 'J', 'A', 'H', 'D', '18', 'B', 'J', 'B', 'H', 'B', 'F', 'B', 'J']

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
