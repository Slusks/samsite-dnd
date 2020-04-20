import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { markerData } from './map-comp/markerData';

@Injectable({
  providedIn: 'root'
})
export class DndDatabaseService {

  baseURL = 'https://samsite-dnd-c6a98.firebaseio.com'
  baseURL1 = 'http://localhost:3000'



  constructor(private http: HttpClient) { }
  private headers = ({'Content-Type': 'application/json'});


  //Map Services
  getMapMarker(){
    return this.http.get<markerData[]>(`${this.baseURL}/thursdayCampaign/mapMarker`+".json")
  }

  deleteMapMarker(markerID){
    return this.http.delete<markerData[]>(`${this.baseURL}/thursdayCampaign/mapMarker`+'/'+markerID+".json", {headers: this.headers})
  }


  //Synopsis Services
  getPanel(){
    return this.http.get(`${this.baseURL}/thursdayCampaign/panel`+".json")
  }

  deletePanel(id){
    return this.http.delete(`${this.baseURL}/thursdayCampaign/panel`+'/'+id+".json", {headers: this.headers})
  }


  //Character Services
  getCharacters(campaign){
    return this.http.get(`${this.baseURL}/`+`${campaign}`+"/characters.json") //+".json"
  }

   //Character Services
   getCharacters2(campaign){
    return this.http.get(`${this.baseURL}/`+`${campaign}`+"/characters.json") //+".json"
  }
}
