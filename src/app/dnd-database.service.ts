import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { markerData } from './map-comp/markerData';

@Injectable({
  providedIn: 'root'
})
export class DndDatabaseService {

  baseURL = 'http://localhost:3000'



  constructor(private http: HttpClient) { }
  private headers = ({'Content-Type': 'application/json'});


  //Map Services
  getMapMarker(){
    return this.http.get<markerData[]>(`${this.baseURL}/mapMarker`)
  }

  deleteMapMarker(markerID){
    return this.http.delete<markerData[]>(`${this.baseURL}/mapMarker`+'/'+markerID, {headers: this.headers})
  }


  //Synopsis Services
  getPanel(){
    return this.http.get(`${this.baseURL}/panel`)
  }

  deletePanel(id){
    return this.http.delete(`${this.baseURL}/panel`+'/'+id, {headers: this.headers})
  }


  //Character Services
  getCharacters(){
    return this.http.get(`${this.baseURL}/characters`)
  }
}
