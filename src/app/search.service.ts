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
    const headers = new HttpHeaders().append('Authorization', 'Bearer '+this.currentToken);

    return this.http.get<Search>(this.searchUrl, {headers, params})
    .pipe(
      map(res => res ),
      catchError(this.handleError),
      retry(1)
    );
    }

    
    


  handleError(error) {
    let errorMessage = 'token wali problem';
    if(error.status==401){
      /*console.log(errorMessage);*/
      const headers = new HttpHeaders().append('Authorization', 'Bearer '+this.currentToken);
    
    }
    /*if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }*/
    
    return throwError(errorMessage);
   
  }

  refreshToken(): Observable<string> {
    /*
        The call that goes in here will use the existing refresh token to call
        a method on the oAuth server (usually called refreshToken) to get a new
        authorization token for the API calls.
    */
    this.authTokenNew = "BQCtOnbnih90iz4NokDNdP4Ik0WhNWGdWmlv91Hf4SHc0QaOG63lHd-ldx7fcs8PVFFueI2tFj9BRxAj0aw";
    this.currentToken = this.authTokenNew;

    return observableOf(this.authTokenNew).pipe(delay(200));
  }

  async fetchData(value: string){
    value = value.trim();
    const params = new HttpParams().set('q', value).set('type', "track");
    const headers = new HttpHeaders().append('Authorization', 'Bearer '+this.currentToken);

    const promise = this.http.get<Search[]>(this.searchUrl, {headers, params}).toPromise()
    promise.then((data)=>{
      
      
     /* console.log("Promise resolved with: " + JSON.stringify(data));*/
     
    });
    return promise;
  }
  
  


}
