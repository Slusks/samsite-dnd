import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { DndDatabaseService } from '../dnd-database.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserService } from '../AuthenticationPackage/core/user.service';
import { AuthService } from '../AuthenticationPackage/core/auth.service';


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
  menageriePanels: number;
  currentUser;
  campaignSelection;


  constructor(private http: HttpClient,
              private dndDatabaseService: DndDatabaseService,
              public userService: UserService,
              public authService: AuthService) {   
              this.authService.user$.subscribe(res => {
                  console.log("current user res",res)
                  if (res.role == "admin"){
                    this.currentUser = true
                  }
                  else {this.currentUser = false}
                })


               }
  

  panelObject:object={};
  confirmationString:string = "Adventure Chronicled!";
  isAdded: boolean = false;

  addNewPanel(panel){
    this.panelObject = {
      "tagline": panel.tagline,
      "content": panel.content,
      "id": panel.id
      }
      let panelidString = panel.id.toString()
          if (panelidString.length === 1){
            let submitId = "week 0"+panelidString;
            this.dndDatabaseService.addMCPanel(submitId, this.panelObject)
          }else if (panelidString.length === 2){
            let submitId = "week "+panelidString;
            this.dndDatabaseService.addMCPanel(submitId, this.panelObject)
          }
    this.isAdded = true;
    
  }


  ngOnInit() {

/*
    this.http.get("https://samsite-dnd-c6a98.firebaseio.com/thursdayCampaign/panel.json").subscribe(panels => {
      this.thursdayPanels = Object.keys(panels).length+1})
      */
    this.http.get("https://samsite-dnd-c6a98.firebaseio.com/menagerieCoast/panel.json").subscribe(panels => {
      this.menageriePanels = Object.keys(panels).length+1})

  }




}
