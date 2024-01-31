import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from "../../shared/services/auth.service";
// import * as fs from 'fs';
// import * as path from 'path';
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
import * as HSMNStandards from "src/assets/standards/CC/HS-M-N.json";
import * as HSMMStandards from "src/assets/standards/CC/HS-M-M.json";
import * as HSMSStandards from "src/assets/standards/CC/HS-M-S.json";

// function syncReadFile(filename: string) {
//   const result = fs.readFile(path.join(__dirname, filename), 'utf8');
//   console.log(result);
//   return result;
// }

@Component({
  selector: 'app-template-standards',
  templateUrl: './template-standards.component.html',
  styleUrls: ['./template-standards.component.css']
})

@Injectable()
export class TemplateStandardsComponent implements OnInit {
  title = 'More Problems';

  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  mobileWidth = 1000;
  menuOpen = false;

  key: string = "";
  online_subjects: string[] = ["KE", "KM", "G1E", "G1M", "G2E", "G2M", "G3E", "G3M", "G4E", "G4M", "G5E", "G5M", "G6E", "G6M", "G7E", "G7M", "G8E", "G8M", "HSE1", "HSE2", "HSM-A", "HSM-F", "HSM-G", "HSM-N", "HSM-S"];

  KE_standards_dump: any = KEStandards;
  KM_standards_dump: any = KMStandards;
  G1E_standards_dump: any = G1EStandards;
  G1M_standards_dump: any = G1MStandards;
  G2E_standards_dump: any = G2EStandards;
  G2M_standards_dump: any = G2MStandards;
  G3E_standards_dump: any = G3EStandards;
  G3M_standards_dump: any = G3MStandards;
  G4E_standards_dump: any = G4EStandards;
  G4M_standards_dump: any = G4MStandards;
  G5E_standards_dump: any = G5EStandards;
  G5M_standards_dump: any = G5MStandards;
  G6E_standards_dump: any = G6EStandards;
  G6M_standards_dump: any = G6MStandards;
  G7E_standards_dump: any = G7EStandards;
  G7M_standards_dump: any = G7MStandards;
  G8E_standards_dump: any = G8EStandards;
  G8M_standards_dump: any = G8MStandards;
  HSE1_standards_dump: any = HSE1Standards;
  HSE2_standards_dump: any = HSE2Standards;
  HSMA_standards_dump: any = HSMAStandards;
  HSMF_standards_dump: any = HSMFStandards;
  HSMG_standards_dump: any = HSMGStandards;
  HSMM_standards_dump: any = HSMMStandards;
  HSMN_standards_dump: any = HSMNStandards;
  HSMS_standards_dump: any = HSMSStandards;
  standards_dump: any = {};

  dump_dict: any = {
    "KE": this.KE_standards_dump,
    "KM": this.KM_standards_dump,
    "G1E": this.G1E_standards_dump,
    "G1M": this.G1M_standards_dump,
    "G2E": this.G2E_standards_dump,
    "G2M": this.G2M_standards_dump,
    "G3E": this.G3E_standards_dump,
    "G3M": this.G3M_standards_dump,
    "G4E": this.G4E_standards_dump,
    "G4M": this.G4M_standards_dump,
    "G5E": this.G5E_standards_dump,
    "G5M": this.G5M_standards_dump,
    "G6E": this.G6E_standards_dump,
    "G6M": this.G6M_standards_dump,
    "G7E": this.G7E_standards_dump,
    "G7M": this.G7M_standards_dump,
    "G8E": this.G8E_standards_dump,
    "G8M": this.G8M_standards_dump, 
    "HSE1": this.HSE2_standards_dump,
    "HSE2": this.HSE2_standards_dump, 
    "HSM-A": this.HSMA_standards_dump,
    "HSM-F": this.HSMF_standards_dump,
    "HSM-G": this.HSMG_standards_dump,
    "HSM-N": this.HSMN_standards_dump,
    "HSM-S": this.HSMS_standards_dump,
  };


  domain_state: {[key: string]: boolean} = {}

  constructor(public router: Router, private aRoute: ActivatedRoute, public authService: AuthService, private http: HttpClient) { }

  sub: any;

  width_change2() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    for (let domain of this.standards_dump.Standards) {
      if (this.screenWidth <= this.mobileWidth) {
        this.domain_state[domain.Key] = false;
      }
      else {
        this.domain_state[domain.Key] = true;
      }
    }
  }

  // public onChange(file: File): void {
  //   let fileReader: FileReader = new FileReader();
  //   let self = this;
  //   fileReader.onloadend = function(x) {
  //     self.exam_data = fileReader.result;
  //   }
  //   fileReader.readAsText(file);
  // }

  toggle_domain(dmn: string) {
    this.domain_state[dmn] = !this.domain_state[dmn];
  }

  scroll(el: HTMLElement) {
    setTimeout(function(){
      el.scrollIntoView({behavior: 'smooth'});
    }, 250);
  }

  scroll2(el: HTMLElement) {
    setTimeout(function(){
      window.scrollTo({left: 0, top: el.getBoundingClientRect().top-120, behavior: 'smooth'});
    }, 250);
  }

  scroll_top() {
    setTimeout(function(){
      window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
    }, 250);
  }

  scroll_bottom() {
    setTimeout(function(){
      window.scrollTo({left: 0, top: document.body.scrollHeight, behavior: 'smooth'});
    }, 250);
  }

  ngOnInit() {
    this.sub = this.aRoute.paramMap.subscribe((params) => {
        console.log(params);
        this.key = (params.get('subjectKey') as string);
        if (!this.online_subjects.includes(this.key)) {
            this.router.navigate(['standards']);
        }
    });
    this.standards_dump = this.dump_dict[this.key];
    for (let domain of this.standards_dump.Standards) {
      if (this.screenWidth <= this.mobileWidth) {
        this.domain_state[domain.Key] = false;
      }
      else {
        this.domain_state[domain.Key] = true;
      }
    }
  }
}
