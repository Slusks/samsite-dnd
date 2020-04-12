import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { markerData } from './map-comp/markerData';

@Injectable({
  providedIn: 'root'
})
export class DndDatabaseService {

  baseURL = 'https://samsite-dnd-c6a98.firebaseio.com'



  constructor(private http: HttpClient) { }
  private headers = ({'Content-Type': 'application/json'});


  //Map Services
  getMapMarker(){
    return this.http.get<markerData[]>(`${this.baseURL}/mapMarker`+".json")
  }

  deleteMapMarker(markerID){
    return this.http.delete<markerData[]>(`${this.baseURL}/mapMarker`+'/'+markerID+".json", {headers: this.headers})
  }


  //Synopsis Services
  getPanel(){
    return this.http.get(`${this.baseURL}/panel`+".json")
  }

  deletePanel(id){
    return this.http.delete(`${this.baseURL}/panel`+'/'+id+".json", {headers: this.headers})
  }


  //Character Services
  getCharacters(){
    return this.http.get(`${this.baseURL}/characters2`+".json")
  }
}
