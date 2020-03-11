import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DndDatabaseService } from '../dnd-database.service';
import { HttpClient } from '@angular/common/http';
import { markerData } from './markerData';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
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

  
  constructor(
    private dndDatabaseService: DndDatabaseService,
    private http: HttpClient
    ){};
  
  

ngOnInit(){
      this.counter = 1;
      const iconImage = new Image();
      iconImage.src = "../assets/img/marker.jpg"
      //subscribes to the JSON file
      this.http.get<markerData[]>('http://localhost:3000/mapMarker')
      .subscribe(posts => {(this.posts = posts),
          posts.forEach(post=>{
                this.setMarker(post)})})
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
    console.log("function started", post.id)
    if (post.id > 0){
      var x = post.xPos-10;
      var y = post.yPos-80;
      var img = document.createElement("img");
      img.src = "../assets/img/marker.jpg";
      img.width = 20;
      img.height= 20;
      img.style.position="absolute";
      img.style.left= (x)+'px';
      img.style.top=(y)+'px';
      img.id = post.id // this is to attack other functions too
      img.setAttribute("class","markerIMG") // this is for the event listener specifically
      //add img to map element
      document.getElementById('mapContainer').appendChild(img);
      this.id = true;
    } 
    else {console.log ("post is undefined"); this.id = false; return;}

    console.log("counter", this.counter)
    if (this.posts.length / this.counter === 1){
      document.querySelectorAll('.markerIMG').forEach(marker => {
      marker.addEventListener('click', event => {this.showCard(marker.id)})})
    } else { this.counter = this.counter + 1}
  }



  logCursorPosition(e){
      //Get Cursor Location
      var x = e.clientX;
      this.xPosition = x;
      var y = e.clientY;
      this.yPosition = y;
      console.log("X Position "+ x + " Y Position" +y);
      //Create Temp icon with Attributes
      var img = document.createElement("img");
      img.src = "../assets/img/marker.jpg";
      img.width = 20;
      img.height= 20;
      img.style.position="absolute";
      img.style.left= (x-10)+'px';
      img.style.top=(y-80)+'px';
      document.getElementById('mapContainer').appendChild(img);
      img.id="currentMarker"
      //Open Form
      document.getElementById("myForm").style.display = "block"; //Opens the form
      document.getElementById('myForm').style.top = y +'px'; // sets the form y coordinate
      document.getElementById('myForm').style.left = x +'px'; // sets the form x coordinate
  }

//function that opens and closes the form for the icons
closeForm(elementID) {
  document.getElementById(elementID).style.display = "none";
  if (elementID == "myForm"){
  document.getElementById("currentMarker").remove()
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
    this.http.post("http://localhost:3000/mapMarker", this.iconDescription).subscribe((po:Response) => {console.log("po",po)})
    alert("Successfully Added")} else {
      alert("description is too short")
    }
    //draw markers with validation to avoid displaying existing markers
      this.http.get<markerData[]>('http://localhost:3000/mapMarker')
      .subscribe(posts => {(this.posts = posts), posts.forEach(post=>{this.postValidation(post)})})

    document.getElementById("currentMarker").remove()
    document.getElementById("myForm").style.display = "none";
}


showCard(postID) {
    this.cardDescription = this.posts[postID-1].description
    const cardXPosition = this.posts[postID-1].xPos;
    const cardYPosition = this.posts[postID-1].yPos;

    document.getElementById('markerCard').style.display = "block";
    document.getElementById('markerCard').style.top = cardYPosition +'px'; // sets the form y coordinate
    document.getElementById('markerCard').style.left = cardXPosition +'px'; // sets the form x coordinate
    console.log("description", this.cardDescription)
    return this.cardDescription;
  }

deleteMarker(){
  if (confirm("delete marker?")){
    var card = document.getElementById("cardContent").innerText
    console.log("card", card)
    console.log("posts", this.posts)
    var deleteMarkerID = this.posts.forEach( object =>{ 
      if (object.description === card){
        return object.id ;
      } else {console.log("object", object);}})
    console.log(deleteMarkerID.object.id)
    document.getElementById(deleteMarkerID.object.id).remove
    
    
  }





  // deletePanel(id){
  //   if (confirm("Are you sure?")) {
  //     const deleteItemURL = `http://localhost:3000/panel/${id}`;
  //     return this.http.delete(deleteItemURL, {headers: this.headers}).toPromise().then(()=> {this.panelArr = this.fetchData()})
  //   }
  //}
  }
  


}



     //https://stackoverflow.com/questions/50289095/trying-to-add-attribute-onclick-to-a-html-img-element-created-by-javascript


