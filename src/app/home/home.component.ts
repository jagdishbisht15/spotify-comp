import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment'
import {Observable} from 'rxjs';
import {map, startWith,debounceTime} from 'rxjs/operators';
import { FormBuilder, FormGroup , Validators , FormControl, NgForm } from '@angular/forms';
import {SearchService} from '../_services/search.service';
import {Router } from '@angular/router';
import { Search } from '../search';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One','Two','Three'];
  songlist: any[] = [];
  filteredOptions: Observable<Search>;


  constructor(private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
   this.myControl.valueChanges.
    pipe(
      startWith(''),
      map(value => this.searchService.searchSongs(value.toLowerCase()))
    ).subscribe(songs => this.filteredOptions = songs);
    console.log(this.filteredOptions);
  }

  onSubmit(){
    console.log(this.myControl);  
    let param = {"q":this.myControl.value}
    this.router.navigate(["search-result"], {queryParams: param});
  }

  onSongSelection(trackId){
    this.router.navigate(["song/"+trackId]);
  }


}
