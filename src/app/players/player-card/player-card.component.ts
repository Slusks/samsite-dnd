import { Component, OnInit } from '@angular/core';
import { DndDatabaseService } from 'src/app/dnd-database.service';
import { UserService } from 'src/app/AuthenticationPackage/core/user.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit {
  characters;
  characters2;
  isDataAvailable:boolean = false;
  campaignSelection;
  

  constructor(private dndDatabaseService: DndDatabaseService,
              public userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser().then(currentUser =>{this.getUserCampaigns(currentUser.uid)},
      err => console.log(err))



   this.dndDatabaseService.getCharacters("thursdayCampaign").subscribe(characters => {this.characters = characters as playerData[]})
   this.dndDatabaseService.getCharacters("menagerieCoast").subscribe(characters2 => {(this.characters2 = characters2 as playerData[])}) 
   this.isDataAvailable = true;
    
  }
  getUserCampaigns(userID:string){
    this.dndDatabaseService.getUserCampaign(userID).subscribe(campaigns => {this.campaignSelection = campaigns, console.log("campaignSelection", this.campaignSelection)})
  }

  //New Card Code to try out for expanding JS cards
  //

  // Code By Webdevtrick (https://webdevtrick.com)








}

export class playerData {
  name: string;
  potrait: string;
  affiliation:string;
  class: string;
  list1: object;
  list2: object;
  campaign: string;
  index: number;
  title1a:string;
  title1b: string;
  title2a:string;
  title2b: string;
  title3a:string;
  title3b: string;
}