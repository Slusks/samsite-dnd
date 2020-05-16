import { Component, OnInit, AfterViewInit } from '@angular/core';
import { gsap, TweenMax, TweenLite } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';


gsap.registerPlugin(Draggable);




@Component({
  selector: 'app-factions2',
  templateUrl: './factions2.component.html',
  styleUrls: ['./factions2.component.scss']
})
export class Factions2Component implements OnInit {

	cardArray$;

	cardObject: Object = {
		EmeraldEnclave:{
			name: "The Emerald Enclave",
			description: "Coming soon",
			img: "assets/pics/emerald-enclave-crest.png"
		},
		Harpers:{
			name: "The Harpers",
			description: "Coming soon",
			img: "assets/pics/the-harpers-crest.png"
		},
		lordsalliance:{
			name: "The Lords Alliance",
			description: "Coming soon",
			img: "assets/pics/lords-alliance-crest.png"
		},
	}

	





  constructor(  ) { }

  ngOnInit(){

	Draggable.create("#test-card", {
		type: "x,y",
		onThrowUpdate: this.throwFunction
		})
	



  }

  ngAfterViewInit(){
	Draggable.create("#card", {type: "x,y"})
  }

  throwFunction(){}

  }


