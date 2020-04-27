import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DndDatabaseService } from '../dnd-database.service';
import { HttpClient } from '@angular/common/http';
import { markerData } from './markerData';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../AuthenticationPackage/core/user.service';
@Component({
  selector: 'app-map-comp',
  templateUrl: './map-comp.component.html',
  styleUrls: ['./map-comp.component.scss']
})
export class MapCompComponent implements OnInit {
  title = 'map-app';
  iconDescription:Object={};
  xPosition:number;
  yPosition:number;
  id:boolean;
  posts;
  counter:number;
  cardDescription:string;
  mousePos;

  //campaign Selection variables
  thursdayCampaign: Boolean;
  menagerieCoast: Boolean;
  

  
  constructor(
    private dndDatabaseService: DndDatabaseService,
    private http: HttpClient,
    private userService: UserService
    ){};

    private headers = ({'Content-Type': 'application/json'});
  
  

ngOnInit(){
    //Campaign Selection:
    this.userService.getCurrentUser().then(currentUser =>{this.getUserCampaigns(currentUser.uid)},
    err => console.log(err))//// This is how we get our campaign selection





      this.counter = 1;

      const iconImage = new Image();
      iconImage.src = "../assets/img/marker.jpg"

      const mapImage = new Image();
      mapImage.src = "../assets/img/dessarinValley.jpg"

      //subscribes to the JSON file
      this.dndDatabaseService.getMapMarker()
      .subscribe(posts => {(this.posts = posts),
          posts.forEach(post=>{
                this.setMarker(post)})})

      
      }

   //campaign Selection:
   getUserCampaigns(userID:string){
    this.dndDatabaseService.getUserCampaign(userID).subscribe(campaigns => {this.thursdayCampaign = campaigns["thursdayCampaign"],
                                                                            this.menagerieCoast = campaigns["menagerieCoast"] 
                                                                            console.log("TC:",campaigns["thursdayCampaign"])
                                                                            console.log("MC:",campaigns["menagerieCoast"])})
  }   


  // Prevents the set marker function from loading a marker that already exists
  postValidation(post){
    var docElementId = document.getElementById(post.id)
    var postElementId = post.id
    if (docElementId || postElementId){
      this.setMarker(post)
    } else { return; }
}

  // Creates map markers from db with attributes
   setMarker(post){
    if (post.id > 0){
      var x = post.xPos;
      var y = post.yPos;
      var img = document.createElement("img");
      img.src = "../assets/img/marker.jpg";
      img.width = 20;
      img.height= 20;
      img.style.position="absolute";
      img.style.left= (x-10)+'px';
      img.style.top=(y-85)+'px';
      img.id = post.id // this is to attack other functions too
      img.setAttribute("class","markerIMG") // this is for the event listener specifically
      //add img to map element
      document.getElementById('mapContainer').appendChild(img);
      this.id = true;
    } 
    else {console.log ("post is undefined"); this.id = false; return;}

    if (this.posts.length / this.counter === 1){
      document.querySelectorAll('.markerIMG').forEach(marker => {
      marker.addEventListener('click', event => {this.showCard(marker.id)})})
    } else { this.counter = this.counter + 1}
  }



  logCursorPosition(e){
      //Get Cursor Location
      var x = e.pageX;
      this.xPosition = x;
      var y = e.pageY;
      this.yPosition = y;
      //Create Temp icon with Attributes
      var img = document.createElement("img");
      img.src = "../assets/img/marker.jpg";
      img.width = 20;
      img.height= 20;
      img.style.position="absolute";
      img.style.left= (x-10)+'px';
      img.style.top=(y-85)+'px';
      document.getElementById('mapContainer').appendChild(img);
      img.id="currentMarker"
      //Open Form
      document.getElementById("myForm").style.display = "block"; //Opens the form
      document.getElementById('myForm').style.top = y +'px'; // sets the form y coordinate
      document.getElementById('myForm').style.left = x-10 +'px'; // sets the form x coordinate
  }

//function that opens and closes the form for the icons, the if statement is there so that it will also delete the marker if 
// the form being closed is the input form.
closeForm(elementID) {
  document.getElementById(elementID).style.display = "none";
  if (elementID == "myForm"){
  document.getElementById("currentMarker").remove();
  var formReset = <HTMLFormElement>document.getElementById("formContainer")
  formReset.reset()
  } else {return;}
}


//Form that submits marker data to db
markerFormSubmit(marker){
      this.iconDescription ={
        "description": marker.description,
        "yPos":this.yPosition,
        "xPos":this.xPosition,
      };
      if (this.id != true){
        this.iconDescription["id"]=1
        this.id = true;
      }
    //only post new icon info of sufficient length
    if (marker.description.length >= 3){
    this.http.post("http://localhost:3000/thursdayCampaign/mapMarker", this.iconDescription).subscribe((po:Response) => {console.log("po",po)}) ////////SERVICE HERE
    alert("Successfully Added")} else {
      alert("description is too short")
    }
    //draw markers with validation to avoid displaying existing markers
    this.dndDatabaseService.getMapMarker()
      .subscribe(posts => {(this.posts = posts), posts.forEach(post=>{this.postValidation(post)})}) ////////SERVICE HERE

    document.getElementById("currentMarker").remove()
    document.getElementById("myForm").style.display = "none";
    var formReset = <HTMLFormElement>document.getElementById("formContainer")
    formReset.reset()
    


}


showCard(postID) {
    for (var item of this.posts){
      if (item.id == postID){
        this.cardDescription = item.description;
        var cardXPosition = item.xPos;
        var cardYPosition = item.yPos;
      }
    }
    document.getElementById('markerCard').style.display = "block";
    document.getElementById('markerCard').style.top = cardYPosition/2 +'px'; // sets the card y coordinate
    document.getElementById('markerCard').style.left = cardXPosition +'px'; // sets the card x coordinate
    return this.cardDescription;
  }

deleteMarker(){
  let deleteMarkerID = 0;
  if (confirm("delete marker?")){
    var card = document.getElementById("cardContent").innerText
    this.posts.forEach( (object) =>{ 
      if (object.description === card){
        return deleteMarkerID = object.id ;
      } else {return;}})


   
    this.dndDatabaseService.deleteMapMarker(deleteMarkerID).subscribe()

    document.getElementById('markerCard').style.display="none"
    document.getElementById(deleteMarkerID.toString()).remove()
    
    
  }
  }
  }
