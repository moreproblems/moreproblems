import { Component, OnInit, AfterViewInit, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from "../../shared/services/auth.service";
import { DumpService } from "../../shared/services/dump.service";
import { serverTimestamp } from "firebase/database";
import printJS from 'print-js';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})

@Injectable()
export class ExamsComponent implements OnInit, AfterViewInit {
  // title = 'More Problems';

  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  mobileWidth = 1000;
  blank = " ";
  menuOpen = false;

  user_data: any = {};
  data_loaded = false;

  favorite_set: string[] = [];

  selected_state: string = 'All';
  selected_grade = '';
  selected_subject = '';

  assign_e = false;
  all_students: string[] = [];
  all_students_data: any = {};
  my_students: string[] = [];
  my_students_data: any = {};
  new_assignments: string[] = [];
  my_class_metadata: any[] = [];
  class_data: any = {};

  exam_id = '';
  exam_dl = 0;
  exam_name = '';
  exam_url = '';
  exam_fav = false;
  file_source = '';
  file_page = 1;
  file_zoom = 85;

  profileUploadURL: any = null;
  edit_e_list: any = {};

  viewerWidth = Math.round(window.innerWidth * .99).toString() + "px";
  viewerHeight = Math.round(window.innerHeight * .95).toString() + "px";

  constructor(public router: Router, private titleService: Title, private meta: Meta, public authService: AuthService, public dumpService: DumpService, private http: HttpClient) { }

  width_change2() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    if (this.screenWidth <= this.mobileWidth) {
      this.file_zoom = 95;
    }
    else {
      this.file_zoom = 75;
    }
  }

  can_assign_s(std: string) {
    return (!Object.keys(this.all_students_data[std].exams.history).includes(this.exam_id));
  }

  can_assign_c(clss: string) {
    return (!this.my_class_metadata[this.authService.userData.classes.indexOf(clss) - 1].exams.includes(this.exam_id));
  }

  select_state(st: string) {
    this.favorite_set = [];
    if (this.authService.userData) {
      for (let exm of this.authService.userData.exams.favorites.slice(1)) {
        this.favorite_set.push(exm as string);
      }
    }
    if (this.selected_state == st) {
      this.selected_state = '';
    }
    else {
      this.selected_state = st;
    }
    this.exam_id = '';
    this.exam_name = '';
    this.exam_url = '';
    this.file_source = '';
    this.file_page = 1;
  }

  select_grade(gr: string) {
    if (this.selected_grade == gr) {
      this.selected_grade = '';
    }
    else {
      this.selected_grade = gr;
    }
    this.exam_id = '';
    this.exam_name = '';
    this.exam_url = '';
    this.file_source = '';
    this.file_page = 1;
  }

  select_subject(sb: string) {
    if (this.selected_subject == sb) {
      this.selected_subject = '';
    }
    else {
      this.selected_subject = sb;
    }
    this.exam_id = '';
    this.exam_name = '';
    this.exam_url = '';
    this.file_source = '';
    this.file_page = 1;
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
      this.exam_name = this.dumpService.exam_names[ex];
      if (this.authService.userData) {
        for (let exm of this.authService.userData.exams.favorites) {
          if (ex == exm) {
            this.exam_fav = true;
          }
        }
      }
    }, 250);
    this.scroll_top();
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
      if (!['', 'Student', 'Parent'].includes(this.authService.userData.role)) {
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
    this.assign_e = !this.assign_e;
  }

  toggle_new_exam(target: string) {
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

  add_assign_exam() {
    for (let ass of this.new_assignments) {
      if (ass.length < 10) {
        const class_ass_ref = 'classes/' + ass + '/exams';
        var class_ass_set: any = [];
        var edit_c_list: any = {};
        for (let exam of this.my_class_metadata[this.authService.userData.classes.indexOf(ass) - 1].exams) {
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

  toggle_favorite() {
    if (this.authService.userData) {
      this.favorite_set = [];
      for (let exm of this.authService.userData.exams.favorites) {
        this.favorite_set.push(exm as string);
      }
      if (this.favorite_set.includes(this.exam_id)) {
        if (this.favorite_set.indexOf(this.exam_id) != -1) {
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
  }

  assert_favorite() {
    if (this.authService.userData) {
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
    this.edit_e_list[exam_ref] = this.exam_dl + 1;
    this.authService.UpdateDatabase({ exam_ref: {} });
    this.authService.UpdateDatabase(this.edit_e_list);
    this.edit_e_list = {};
    this.assert_favorite();
    this.exam_dl = (this.authService.searchExamId(this.exam_id)).downloads;
    setTimeout(() => {
      this.exam_dl = (this.authService.searchExamId(this.exam_id)).downloads;
    }, 250);
  }

  print_exam() {
    printJS({ printable: this.file_source, type: 'pdf', showModal: true });
    this.assert_favorite();
  }

  take_exam() {
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

  zoom_out() {
    this.file_zoom = Math.max(75, this.file_zoom - 5);
  }

  zoom_in() {
    this.file_zoom = Math.min(125, this.file_zoom + 5);
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

  ngAfterViewInit() {

  }

  ngOnInit() {
    this.titleService.setTitle("MoreProblems.Org | U.S. K-12 State Testing Practice Exams");
    this.meta.updateTag({ name: 'description', content: "Access released practice problems & solutions to prepare for end-of-year tests - including Florida FSA, Illinois IAR, New York NYSTP, North Carolina EOG, Pennsylvania PSSA, and Texas STAAR. Choose from more 400 assessments across math, English language, science, & social studies for elementary, middle, & high school students." });
    this.favorite_set = []; 
    setTimeout(() => {
      if (this.authService.userData) {
        this.authService.getProfilePic(this.authService.userData);
        this.user_data = this.authService.userData;
        setTimeout(() => {
          console.log(this.authService.pp_url);
          this.profileUploadURL = this.authService.pp_url;
          if (this.authService.userData.state != undefined && this.authService.userData.state != '' && Object.values(this.dumpService.state_labels).includes(this.authService.userData.state)) {
            for (let state of Object.keys(this.dumpService.state_labels)) {
              if (this.dumpService.state_labels[state] == this.authService.userData.state) {
                this.select_state(state);
              }
            }
            if (this.authService.userData.grade != undefined && this.authService.userData.grade != '' && Object.values(this.dumpService.grade_labels).includes(this.authService.userData.grade)) {
              for (let grade of Object.keys(this.dumpService.grade_labels)) {
                if (this.dumpService.grade_labels[grade] == this.authService.userData.grade) {
                  this.select_grade(grade);
                }
              }
            }
          }
        }, 150);
        for (let exm of this.authService.userData.exams.favorites.slice(1)) {
          this.favorite_set.push(exm as string);
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
          if (!['', 'Student', 'Parent'].includes(this.authService.userData.role)) {
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
      }
      if (this.authService.userData) {
        setTimeout(() => {
          this.width_change2();
          this.data_loaded = true;
        }, 250);
      }
      else {
        this.width_change2();
        this.data_loaded = true;
      }
    }, 500);
    // location.reload();
  }
}