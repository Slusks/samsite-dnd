import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { DndDatabaseService } from 'src/app/dnd-database.service';
import { UserService } from 'src/app/AuthenticationPackage/core/user.service';
import { SynopsisComponent } from '../synopsis.component';


@Component({
  selector: 'app-story-panel',
  templateUrl: './story-panel.component.html',
  styleUrls: ['./story-panel.component.scss']
})
export class StoryPanelComponent implements OnInit {

  currentUser;
  

  constructor(private dndDatabaseService: DndDatabaseService,
              private userService: UserService,
              private synopsis:SynopsisComponent ) { }

  id:number;
  private headers = ({'Content-Type': 'application/json'});

  configURL = "http://localhost:3000/panel";
  panelArr1=[];
  panelArr2=[];
  panelsLoaded: boolean;


    /// this removes the panel which will need to be rejiggered to get passed which array it's removing
  removePanel(id, array){
    if (confirm("Are you sure?")) {
      let panelidString = id.toString()
      if (panelidString.length === 1){
        let submitId = "week 0"+panelidString;
        this.dndDatabaseService.deletePanel(submitId).toPromise().then(res => {array})
      }else if (panelidString.length === 2){
        let submitId = "week "+panelidString;
        this.dndDatabaseService.deletePanel(submitId).toPromise().then(res => {array})
      }
    }
  }


  ngOnInit() {
        console.log("campaign selection",this.synopsis.campaignSelection)
        this.createArray(this.synopsis.campaignSelection) // this is the problem child at the moment
        
  }
  //=========================================================================================
  //functions for going back and forth between panels with button
  step = 0;
  setStep(index:number){
    this.step =index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
//===========================================================================================



createArray(campaignSelection){
    if (campaignSelection.thursdayCampaign) { 
      this.dndDatabaseService.getPanel("thursdayCampaign").subscribe(response =>{
        let responseProps = Object.keys(response);
        for (let prop of responseProps){
          this.panelArr1.push(response[prop])
        }
        console.log("PA1", this.panelArr1)});
    } else if (campaignSelection.menagerieCoast){
      this.dndDatabaseService.getPanel("menagerieCoast").subscribe(response =>{
        let responseProps = Object.keys(response);
        for (let prop of responseProps){
          this.panelArr2.push(response[prop])
        }
        console.log("PA2", this.panelArr2)});
    }

  this.panelsLoaded = true;
}
}
