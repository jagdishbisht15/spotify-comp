import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'
import { HttpClient,HttpParams,HttpHeaders,HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError, of as observableOf} from 'rxjs';
import { catchError, retry, filter, delay, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentToken: string ;
  constructor(private http:HttpClient ) { }

  getAuthToken(){
    return localStorage.getItem("api-token");
  }

}
