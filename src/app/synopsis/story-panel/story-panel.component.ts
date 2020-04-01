import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { DndDatabaseService } from 'src/app/dnd-database.service';


@Component({
  selector: 'app-story-panel',
  templateUrl: './story-panel.component.html',
  styleUrls: ['./story-panel.component.scss']
})
export class StoryPanelComponent implements OnInit {

  constructor(private dndDatabaseService: DndDatabaseService) { }

  id:number;
  private headers = ({'Content-Type': 'application/json'});

  configURL = "http://localhost:3000/panel";
  panelArr;



  removePanel(id){
    if (confirm("Are you sure?")) {
      this.dndDatabaseService.deletePanel(id).toPromise().then(()=> {this.panelArr})
    }
  }


  ngOnInit() {
    this.panelArr = this.dndDatabaseService.getPanel();

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


}
