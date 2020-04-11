import { Component, OnInit } from '@angular/core';
import { DndDatabaseService } from 'src/app/dnd-database.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit {
  characters;
  

  constructor(private dndDatabaseService: DndDatabaseService) { }

  ngOnInit() {

   this.dndDatabaseService.getCharacters().subscribe(characters => {this.characters = characters as playerData[]})
    
  }

}

export class playerData {
  name: string;
  potrait: string;
  affiliation:string;
  class: string;
  likes: object;
  dislikes: object;
}