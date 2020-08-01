import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError, of as observableOf} from 'rxjs';
import { catchError, retry, filter, delay, map } from 'rxjs/operators';
import { environment } from '../environments/environment'
import { Search } from './search';
/*import { HttpErrorHandler, HandleError } from '../http-error-handler.service';*/

    

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  public authTokenStale: string = 'stale_auth_token';
  public authTokenNew: string = 'new_auth_token';
  public currentToken: string;
  
  searchUrl = environment.apiUrl+'search';
  constructor(private http: HttpClient){
    this.currentToken= environment.token;
  
  }


  /* GET songs whose name contains search term */
  searchSongs(value: string): Observable<Search> {
    value = value.trim();
    const params = new HttpParams().set('q', value).set('type', "track");
    /*const headers = new HttpHeaders().append('Authorization', 'Bearer '+this.currentToken);*/

    return this.http.get<Search>(this.searchUrl, {params})}


  async fetchData(value: string){
    value = value.trim();
    const params = new HttpParams().set('q', value).set('type', "track");
    //const headers = new HttpHeaders().append('Authorization', 'Bearer '+this.currentToken);

    const promise = this.http.get<Search[]>(this.searchUrl, {params}).toPromise()
    promise.then((data)=>{});
    return promise;
  }
  
  


}
