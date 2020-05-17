import { Component, OnInit, AfterViewInit } from '@angular/core';
import { gsap, TweenMax, TweenLite } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { AuthService } from 'src/app/AuthenticationPackage/core/auth.service'


gsap.registerPlugin(Draggable);




@Component({
  selector: 'app-factions2',
  templateUrl: './factions2.component.html',
  styleUrls: ['./factions2.component.scss']
})
export class Factions2Component implements OnInit {

	cardArray$;

	TCcardObject: Object = {
		EmeraldEnclave:{
			name: "The Emerald Enclave",
			description: "Coming soon",
			img: "assets/pics/emerald-enclave-crest.png",
		},
		harpers:{
			name: "The Harpers",
			description: "Coming soon",
			img: "assets/pics/the-harpers-crest.png",
		},
		lordsalliance:{
			name: "The Lords Alliance",
			description: "Coming soon",
			img: "assets/pics/lords-alliance-crest.png",
		},
		orderofthegauntlet:{
			name: "The Order of the Gauntlet",
			description: "Coming soon",
			img: "assets/pics/order-of-gauntlet-crest.png",
		},
		zhentarim:{
			name: "The Zhentarim",
			description: "Coming soon",
			img: "assets/pics/zhentarim-crest.png",
		},
	}

	MCcardObject: Object = {
		dwendalianempire:{
			name: "The Dwendalian Empire",
			description: "Coming soon",
			img: "assets/pics/dwendalian-empire-crest.png",
		},
		kryndynasty:{
			name: "The Kryn Dynasty",
			description: "Coming soon",
			img: "assets/pics/kryn-dynasty-crest.png",
		},
		clovisconcord:{
			name: "The Clovis Concord",
			description: "Coming soon",
			img: "assets/pics/clovis-concord-crest.png",
		},
		myriad:{
			name: "The Myriad",
			description: "Coming soon",
			img: "assets/pics/the-myriad-crest.png",
		},
		revelry:{
			name: "The Revelry",
			description: "Coming soon",
			img: "assets/pics/the-revelry-crest.png",
		},
	}


	





  constructor( public authService: AuthService ) { }

  ngOnInit(){  }

}

