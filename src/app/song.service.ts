import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError, of as observableOf} from 'rxjs';
import { catchError, retry, filter, delay, map } from 'rxjs/operators';
import { environment } from '../environments/environment'

import { Song } from './song';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  searchUrl = environment.apiUrl;
  public authTokenStale: string = 'stale_auth_token';
  public authTokenNew: string = 'new_auth_token';
  public currentToken: string;

  constructor(private http: HttpClient){
    this.currentToken= environment.token;
  
  }

  async fetchFeatures(id: string){
    id = id.trim();
    //const headers = new HttpHeaders().append('Authorization', 'Bearer '+this.currentToken);

    const promise = this.http.get<Song>(this.searchUrl+"audio-features/"+id, ).toPromise()
    promise.then((data)=>{});
    return promise;
  }

  async fetchSong(id: string){
    id = id.trim();
    //const headers = new HttpHeaders().append('Authorization', 'Bearer '+this.currentToken);

    const promise = this.http.get<Song>(this.searchUrl+"tracks/"+id, ).toPromise()
    promise.then((data)=>{});
    return promise;
  }
  

}
