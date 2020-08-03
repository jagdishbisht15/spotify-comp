import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment'
import { Search } from '../search';

    

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  public authTokenStale: string = 'stale_auth_token';
  public authTokenNew: string = 'new_auth_token';
  public currentToken: string;
  
  searchUrl = environment.apiUrl+'search';
  constructor(private http: HttpClient){}

  /* GET songs whose name contains search term */
  searchSongs(value: string): Observable<Search> {
    value = value.trim();
    if (value) {
      const params = new HttpParams().set('q', value).set('type', "track");

      return this.http.get<Search>(this.searchUrl, {params})
    }else{
      return ;
    }
  }

  async fetchData(value: string){
    value = value.trim();
    const params = new HttpParams().set('q', value).set('type', "track");
    
    const promise = this.http.get<Search>(this.searchUrl, {params}).toPromise()
    promise.then((data)=>{});
    return promise;
  }
  
  


}
