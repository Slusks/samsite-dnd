import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { markerData } from './map-comp/markerData';
import { UserService } from './AuthenticationPackage/core/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DndDatabaseService {

  baseURL = 'https://samsite-dnd-c6a98.firebaseio.com'
  baseURL1 = 'http://localhost:3000'



  constructor(private http: HttpClient,
              private userService: UserService) { }
  private headers = ({'Content-Type': 'application/json'});

  //User Campaign Service
  getUserCampaign(userID){
    return this.http.get(`${this.baseURL}/userID/`+userID+".json")
  }

  updateUserCampaign(userID, campaign, value){
    return this.http.post(`${this.baseURL}/userID/`+userID+"/"+campaign+".json", value)
  }



  //Map Services
  getMapMarker(){
    return this.http.get<markerData[]>(`${this.baseURL}/thursdayCampaign/mapMarker`+".json")
  }

  deleteMapMarker(markerID){
    return this.http.delete<markerData[]>(`${this.baseURL}/thursdayCampaign/mapMarker`+'/'+markerID+".json", {headers: this.headers})
  }


  //Synopsis Services
  getPanel(campaign){
    return this.http.get(`${this.baseURL}/`+`${campaign}`+"/panel.json")
  }

  addPanel(submitId, panel){
    return this.http.put(`${this.baseURL}/thursdayCampaign/panel/`+submitId+".json", panel).subscribe((po:Response) => {console.log("po",po)})
  }

  deletePanel(id){
    return this.http.delete(`${this.baseURL}/thursdayCampaign/panel`+'/'+id+".json", {headers: this.headers})
  }


  //Character Services
  getCharacters(campaign){
    return this.http.get(`${this.baseURL}/`+`${campaign}`+"/characters.json") 
  }

   //Character Services
   getCharacters2(campaign){
    return this.http.get(`${this.baseURL}/`+`${campaign}`+"/characters.json") 
  }
}
