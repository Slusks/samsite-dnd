import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dailyspell',
  templateUrl: './dailyspell.component.html',
  styleUrls: ['./dailyspell.component.scss']
})
export class DailyspellComponent implements OnInit {

  baseURL = 'http://dnd5eapi.co/api/spell/'
  randomSpellName


  constructor(private http: HttpClient) { }

  ngOnInit() {

      




  }

  getSpell(spellname:string){

    return this.http.get(`${this.baseURL}`+spellname)

    
          
  }

}
