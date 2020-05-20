import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { DndDatabaseService } from 'src/app/dnd-database.service';
import { UserService } from 'src/app/AuthenticationPackage/core/user.service';
import { SynopsisComponent } from '../synopsis.component';

import { AuthService } from 'src/app/AuthenticationPackage/core/auth.service';


@Component({
  selector: 'app-story-panel',
  templateUrl: './story-panel.component.html',
  styleUrls: ['./story-panel.component.scss']
})
export class StoryPanelComponent implements OnInit {

  currentUser;
  

  constructor(private dndDatabaseService: DndDatabaseService,
              private userService: UserService,
              public authService: AuthService,
              private synopsis:SynopsisComponent,
              ) { }

  id:number;
  private headers = ({'Content-Type': 'application/json'});

  configURL = "http://localhost:3000/panel";
  panelArr1=[];
  panelArr2=[];
  TCisLoaded: boolean;
  MCisLoaded: boolean;


    /// this removes the panel which will need to be rejiggered to get passed which array it's removing
  removePanel_tc(id){
    if (confirm("Are you sure?")) {
      let panelidString = id.toString()
      if (panelidString.length === 1){
        let submitId = "week 0"+panelidString;
        this.dndDatabaseService.deletePanel(submitId).toPromise()
      }else if (panelidString.length === 2){
        let submitId = "week "+panelidString;
        this.dndDatabaseService.deletePanel(submitId).toPromise()
      }
    }
  }

  removePanel_mc(id){
    if (confirm("Are you sure?")) {
      let panelidString = id.toString()
      if (panelidString.length === 1){
        let submitId = "week 0"+panelidString;
        this.dndDatabaseService.deletePanel(submitId).toPromise()
      }else if (panelidString.length === 2){
        let submitId = "week "+panelidString;
        this.dndDatabaseService.deletePanel(submitId).toPromise()
      }
    }
  }


  ngOnInit() {
    this.authService.user$.subscribe(res => {this.createArray(res), console.log("res", res)})
        console.log("user$:", this.authService.user$)

        
  }
  //=========================================================================================
  //functions for going back and forth between panels with button
  tc_step = 0;
  setStep_tc(index:number){
    this.tc_step =index;
  }
  nextStep_tc() {
    this.tc_step++;
  }
  prevStep_tc() {
    this.tc_step--;
  }
//===========================================================================================
  //=========================================================================================
  //functions for going back and forth between panels with button
  mc_step = 0;
  setStep_mc(index:number){
    this.mc_step =index;
  }
  nextStep_mc() {
    this.mc_step++;
  }
  prevStep_mc() {
    this.mc_step--;
  }
//===========================================================================================



createArray(campaignSelection){
  console.log("array in work")
    if (campaignSelection.thursdayCampaign == true) { 
      this.dndDatabaseService.getPanel("thursdayCampaign").subscribe(response =>{
        let responseProps = Object.keys(response);
        for (let prop of responseProps){
          if (this.panelArr1.length !== responseProps.length){
          this.panelArr1.push(response[prop])
        }
      }
        //console.log("PA1", this.panelArr1)});
       });
        this.TCisLoaded = true;
    }
     if (campaignSelection.menagerieCoast == true){
      this.dndDatabaseService.getPanel("menagerieCoast").subscribe(response =>{
        let responseProps = Object.keys(response);
        for (let prop of responseProps){
          if (this.panelArr2.length !== responseProps.length){
          this.panelArr2.push(response[prop])
          }
        }
        //console.log("PA2", this.panelArr2)});
      });
      this.MCisLoaded = true;
    }


}
}
