import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent implements OnInit {




  constructor(private http: HttpClient) { }

  panelObject:object={};
  confirmationString:string = "Added to JSON";
  isAdded: boolean = false;

  addNewPanel(panel){
    this.panelObject ={
      "week": panel.id,
      "tagline": panel.tagline,
      "content": panel.content,
    }
    this.http.post("http://localhost:3000/panel", this.panelObject).subscribe((po:Response) => {console.log(po)})
    this.isAdded = true;
    location.reload(true)
  }


  ngOnInit() {


  }

}
