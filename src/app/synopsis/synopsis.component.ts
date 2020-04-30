import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { DndDatabaseService } from '../dnd-database.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserService } from '../AuthenticationPackage/core/user.service';


// For this to work, in terminal, navigate to samsite-dnd and run 'json-server --watch db.json'
// the json file is located in samsite-dnd
// utilizing: https://github.com/typicode/json-server

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent implements OnInit {
  
  thursdayPanels: number;
  currentUser;
  campaignSelection;
  currentUserAdmin:boolean = false;

  constructor(private http: HttpClient,
              private dndDatabaseService: DndDatabaseService,
              public userService: UserService) { }
  

  panelObject:object={};
  confirmationString:string = "Adventure Chronicled!";
  isAdded: boolean = false;

  addNewPanel(panel){
    this.panelObject = {
      //"week": panel.week,
      "tagline": panel.tagline,
      "content": panel.content,
      "id": panel.id
      }
      let panelidString = panel.id.toString()
          if (panelidString.length === 1){
            let submitId = "week 0"+panelidString;
            this.dndDatabaseService.addPanel(submitId, this.panelObject)
          }else if (panelidString.length === 2){
            let submitId = "week "+panelidString;
            this.dndDatabaseService.addPanel(submitId, this.panelObject)
          }
        
    
    //this.http.post("http://localhost:3000/thursdayCampaign/panel.json", this.panelObject).subscribe((po:Response) => {console.log("po",po)})
    this.isAdded = true;
    //location.reload(true)
  }


  ngOnInit() {
    this.userService.getCurrentUser().then(currentUser =>{(this.currentUser = currentUser), console.log("currentUser",currentUser), this.getUserCampaigns(currentUser.uid)},
      err => console.log(err))

    this.http.get("https://samsite-dnd-c6a98.firebaseio.com/thursdayCampaign/panel.json").subscribe(panels => {
      this.thursdayPanels = Object.keys(panels).length+1}) 
  }

  getUserCampaigns(userID:string){
    this.dndDatabaseService.getUserCampaign(userID).subscribe(campaigns => {this.campaignSelection = campaigns, console.log("campaignSelection", this.campaignSelection)})
  }




}
