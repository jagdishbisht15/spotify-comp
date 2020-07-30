import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment'
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormBuilder, FormGroup , Validators , FormControl, NgForm } from '@angular/forms';
import {SearchService} from '../search.service';
import {Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One','Two','Three'];
  songlist: any[] = [];
  filteredOptions: Observable<string[]>;


  constructor(private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    
    const searchTerm = value.toLowerCase();
    if (searchTerm) {
       this.searchService
        .searchSongs(searchTerm)
        .subscribe(
          (songs)=>{ 
            this.songlist = songs.tracks.items;
          },
         );

         if(this.songlist){
          return this.songlist ;
         }
    }else{
      return null;
    }

  }

  onSubmit(){
    console.log(this.myControl);  
    let param = {"q":this.myControl.value}
    this.router.navigate(["search-result"], {queryParams: param});
    /*console.log(this.myControl.value);
    .tracks.items
    */

  }


}
