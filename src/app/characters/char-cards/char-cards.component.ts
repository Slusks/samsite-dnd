import { Component, OnInit, Input } from '@angular/core';
import { cardData } from '../cardData';

@Component({
  selector: 'app-char-cards',
  templateUrl: './char-cards.component.html',
  styleUrls: ['./char-cards.component.scss']
})
export class CharCardsComponent implements OnInit {

  @Input() cardData: cardData;

  constructor() { }

  
  ngOnInit() {
    
    let character = this.cardData[0]

    console.log("char-cards", this.cardData)
    console.log(character.cardTitle)



  }

}
