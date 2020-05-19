import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-factiondialog',
  templateUrl: './factiondialog.component.html',
  styleUrls: ['./factiondialog.component.scss']
})
export class FactiondialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    console.log("data", this.data)
  }

}
