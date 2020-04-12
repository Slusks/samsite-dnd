import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { spellname} from './spellname.json'
import { MatRadioChange } from '@angular/material';

@Component({
  selector: 'app-dailyspell',
  templateUrl: './dailyspell.component.html',
  styleUrls: ['./dailyspell.component.scss']
})
export class DailyspellComponent implements OnInit, AfterViewInit {

  baseURL = 'api/'
  spellFacts;
  spellClass;
  


  constructor(private http: HttpClient) { }

  ngOnInit() {
  this.getSpell()
  }

  ngAfterViewInit(){
    
    this.spellClass = this.spellFacts.classes

  }

  

  getSpell(){
    let spellNum = Math.floor(Math.random()*475)
    let spellChoice = spellname[spellNum].toLowerCase()

    return this.http.get(`${this.baseURL}`+spellChoice).subscribe(spellObservable => {this.spellFacts = spellObservable})
  }

}


