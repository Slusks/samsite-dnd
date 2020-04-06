import { Component, OnInit } from '@angular/core';
import { DndDatabaseService } from '../dnd-database.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
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
