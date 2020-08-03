import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'

import { Song } from '../song';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  searchUrl = environment.apiUrl;

  constructor(private http: HttpClient){}

  async fetchFeatures(id: string){
    id = id.trim();

    const promise = this.http.get<Song>(this.searchUrl+"audio-features/"+id, ).toPromise()
    promise.then((data)=>{});
    return promise;
  }

  async fetchSong(id: string){
    id = id.trim();

    const promise = this.http.get<Song>(this.searchUrl+"tracks/"+id, ).toPromise()
    promise.then((data)=>{});
    return promise;
  }
  

}
