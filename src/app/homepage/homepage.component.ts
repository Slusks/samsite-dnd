import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { UserService } from '../AuthenticationPackage/core/user.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  
  currentUser;


                    
  constructor(private userService: UserService) { }


  ngOnInit() {

    this.userService.getCurrentUser().then(currentUser =>{(this.currentUser = currentUser), console.log(currentUser)},
      err => console.log(err))
    console.log("currentUser", this.currentUser)
  

  }
}
