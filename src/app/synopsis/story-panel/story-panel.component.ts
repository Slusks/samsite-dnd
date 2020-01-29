import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

//https://scotch.io/courses/build-your-first-angular-website/creating-a-user-service-to-connect-to-github
//https://scotch.io/courses/build-your-first-angular-website/showing-a-list-of-github-users

@Component({
  selector: 'app-story-panel',
  templateUrl: './story-panel.component.html',
  styleUrls: ['./story-panel.component.scss']
})
export class StoryPanelComponent implements OnInit {

  constructor(private http:HttpClient) { }

  id:number;
  private headers = ({'Content-Type': 'application/json'});

  configURL = "http://localhost:3000/panel";
  panelArr;

  fetchData(){
    return this.http.get(this.configURL)
  }


  deletePanel(id){
    if (confirm("Are you sure?")) {
      const deleteItemURL = `http://localhost:3000/panel/${id}`;
      return this.http.delete(deleteItemURL, {headers: this.headers}).toPromise().then(()=> {this.panelArr = this.fetchData()})
    }
  }


  ngOnInit() {

    this.fetchData()//.subscribe(panels => { console.log(panels)}); not sure if it's bad that I'm no longer doing this
    this.panelArr = this.fetchData();
    //console.log("panelArr", this.panelArr) this only needs to be enabled for troubleshooting
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
