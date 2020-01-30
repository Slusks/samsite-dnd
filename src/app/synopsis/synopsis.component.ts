import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http'

// For this to work, in terminal, navigate to C:\USers\sam\webdev\samsite-dnd and run 'json-server --watch db.json'
// the json file is located in samsite-dnd
// utilizing: https://github.com/typicode/json-server

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent implements OnInit {


  constructor(private http: HttpClient) { }

  panelObject:object={};
  confirmationString:string = "Adventure Chronicled!";
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
