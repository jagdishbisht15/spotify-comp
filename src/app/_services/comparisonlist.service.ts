import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ComparisonlistService {

  constructor() { }

  
  /* GET all the saved comparison */
  async getSavedComparison(): Promise<any> {
    let promise =   this.allStorage();
    return promise;
  }


  allStorage() {
    
    var archive = [], 
        keys = Object.keys(localStorage),
        i = keys.length;
    let j = 0
    while ( i-- ) {
      //remove the api-token key
      if(keys[i]!='api-token'){
        console.log(keys[i]);
        archive[j] = JSON.parse(localStorage.getItem(keys[i]));
        j = j +1;
      }
      
     
       
    }
    console.log(archive);

    return archive;
}
}
