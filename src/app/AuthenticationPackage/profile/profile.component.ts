import { Component, OnInit, Inject, Input } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import { ProfileResolver } from './profile.resolver';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

 
  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder,
  ) {

  }

  ngOnInit(): void {  
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      console.log(data)
      if (data) {
        this.user = data;
        console.log("user",this.user)
        this.createForm(this.user.name, this.user.thursdayCampaign, this.user.menagerieCoast);
        //console.log("grabbed user data");
      }
      //else {console.log("didn't grab data")}
    })
  }

  createForm(name, thursdayCampaign, menagerieCoast) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required ],
      thursdayCampaign: [thursdayCampaign],
      menagerieCoast: [menagerieCoast]
    });
  }

  save(value){
    this.userService.updateCurrentUser(value)
    .then(res => {
      console.log(res);
    }, err => console.log(err))
  }

  logout(){
    this.authService.signOut()
    .then((res) => {
      this.location.back();
    }, (error) => {
      console.log("Logout error", error);
    });
  }
}
