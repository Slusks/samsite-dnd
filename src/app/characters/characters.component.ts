import { Component, OnInit } from '@angular/core';
import  thurCharacters from './thurCharacters.json';
import { cardData } from './cardData';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  cards: cardData[];
  

  constructor(){
    console.log("thurCharacters",thurCharacters)
  }

  ngOnInit() {
    this.cards = [];
  }

  


  addCard(charId:string) {
    this.cards.length = 0
    
    var JSONObject = thurCharacters
    let charData = JSONObject[0][charId]

    this.cards.push({
      cardImage: charData["portrait"],
      cardTitle: charData["name"],
      cardAffiliation: charData["affiliation"],
      cardClass: charData["class"],
      cardLikes: charData["likes"],
      cardDislikes: charData["dislikes"],});
    console.log("card:",this.cards)

    if (charId === "clear"){
      this.cards.length =0
    }
    }
  }

