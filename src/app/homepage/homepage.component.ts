import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  imageObject: Array<object> = [
    {
    image: 'assets/pics/sectionMovement.PNG',
    thumbImage: 'assets/pics/sectionMovement.PNG',
    },
    {
      image: 'assets/pics/sectionAction.PNG',
      thumbImage: 'assets/pics/sectionAction.PNG',
    },
    {
      image: 'assets/pics/sectionBonusAction.PNG',
      thumbImage: 'assets/pics/sectionBonusAction.PNG',
    },
    {
      image: 'assets/pics/sectionReaction.PNG',
      thumbImage: 'assets/pics/sectionReaction.PNG',
    },
    {
      image: 'assets/pics/sectionCondition.PNG',
      thumbImage: 'assets/pics/sectionCondition.PNG',
    },
    {
      image: 'assets/pics/sectionEnvironmentalEffects.PNG',
      thumbImage: 'assets/pics/sectionEnvironmentalEffects.PNG',
    }
                    ];
    

                    
  constructor() { }
  
    @ViewChild('nav', {static:false}) slider: NgImageSliderComponent;
  
  
    prevImageClick() {
        this.slider.prev();
    }
    
    nextImageClick() {
        this.slider.next();
    }

  ngOnInit() { }


  }
