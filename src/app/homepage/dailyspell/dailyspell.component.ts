import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import  moment  from 'moment/moment';

import { spellname} from './spellname.json';
import { spell } from './spell.model';

@Component({
  selector: 'app-dailyspell',
  templateUrl: './dailyspell.component.html',
  styleUrls: ['./dailyspell.component.scss']
})
export class DailyspellComponent implements OnInit {

  baseURL = 'api/'
  spellFacts;
  showspellClasses:Array<any>;
  loadView;
  Moment:any;
  todaySpell;
  
  


  constructor(private http: HttpClient,) {}

  ngOnInit() {
    console.log("localStorage.storedDate",localStorage.storedDate)
    console.log(this.loadView)
    
    let today = moment().format('MMMM Do YYYY')

    

    if (localStorage.storedDate !== today) {
      this.todaySpell = this.chooseSpell()
      localStorage.storedDate = today
    } else {this.todaySpell = localStorage.dailySpell}

    this.getSpell(this.todaySpell).subscribe(result =>{this.spellFacts = result})
    this.getSpell(this.todaySpell).subscribe(results => {this.showspellClasses = results["classes"]})
    
    this.loadView = true

  }

  chooseSpell(){
    let spellNum = Math.floor(Math.random()*323)
    let spellChoice = spellname[spellNum].toLowerCase()
    localStorage.dailySpell = spellChoice
    return spellChoice
  }


  getSpell(spellChoice): Observable<spell[]>{
    return this.http.get<spell[]>(`${this.baseURL}`+spellChoice)
  }

  spellClasses(){
    this.getSpell(this.todaySpell).subscribe(result => {this.showspellClasses = result["classes"]})
  }

}



