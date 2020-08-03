import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpHeaders,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable,BehaviorSubject, throwError, of as observableOf} from 'rxjs';
import { catchError, retry, filter, delay, map,switchMap,take, finalize,mergeMap  } from 'rxjs/operators';
import { environment } from '../../environments/environment'

import {AuthService} from '../_services/auth.service'

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  constructor(private authService:AuthService,private http: HttpClient) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
      let token = this.authService.getAuthToken()
      //for all api other than token
      if (req.url!=environment.tokenUrl+"token"){
        req = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token
          }
        } );
      }else{
        //for token api only
        req = req.clone({
          setHeaders: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        } );
      }
            
        

        return  <any>next.handle(req).pipe(
          catchError((err: HttpErrorResponse)  => {
          
          if (err.status === 401 &&  req.url!=environment.tokenUrl+"token") {
                  //Genrate params for token refreshing
                  let body = 'grant_type=client_credentials';
                  const headers = new HttpHeaders().append('Authorization', "Basic "+environment.key);

                return this.http.post(environment.tokenUrl+"token",body,{headers}).pipe(mergeMap(
                  (data: any) => {
                    console.log(data);
                    //If reload successful update tokens
                    if (data.access_token) {
                      //Update tokens
                      localStorage.setItem("api-token", data.access_token);
                      //Clone our fieled request ant try to resend it
                      req = req.clone({
                        setHeaders: {
                          Authorization: 'Bearer ' + data.access_token
                        }
                      });
                      
                      return next.handle(req);
                    }
                  }
                ));
              
          }
          return throwError(err);
      }));

       
    }

}
