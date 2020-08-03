import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {  FormControl } from '@angular/forms';
import {SearchService} from '../_services/search.service';
import {Router, ActivatedRoute} from '@angular/router';
import {SongService} from '../_services/song.service';
import { Song } from '../song';
import {Location} from '@angular/common'; 
import {MatSnackBar} from '@angular/material/snack-bar';
import { Search } from '../search';


@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  firstsong: string;
  secondsong: string;
  songFeatures: Song;
  songDetails: Song;
  secondSongFeatures: Song;
  secondSongDetails: Song;
  myControl = new FormControl();
  myControlSecond = new FormControl();
  options: string[] = ['One','Two','Three'];
  songlist: any[] = [];
  songlistSecond: any[] = [];
  filteredOptions: Observable<Search>;
  filteredOptionsSecond: Observable<Search>;
  
  constructor(private location: Location, 
              private activatedRoute: ActivatedRoute, 
              private songService: SongService,
              private router: Router, 
              private searchService: SearchService,
              private _snackBar: MatSnackBar ) { }


  async ngOnInit(): Promise<void> {
    this.activatedRoute.queryParams.subscribe(params => {
      
      this.firstsong = params['first'];
      this.secondsong = params['second'];
    });
    
    this.myControl.valueChanges.
    pipe(
      startWith(''),
      map(value => this.searchService.searchSongs(value.toLowerCase()))
    ).subscribe(songs => this.filteredOptions = songs);
   

    this.myControlSecond.valueChanges.
    pipe(
      startWith(''),
      map(value => this.searchService.searchSongs(value.toLowerCase()))
    ).subscribe(songs => this.filteredOptionsSecond = songs);
    console.log(this.filteredOptions);

    
    if(this.firstsong){
      this.songFeatures =  await this.songService.fetchFeatures(this.firstsong);
      this.songDetails =  await this.songService.fetchSong(this.firstsong);
    }
    
    if(this.secondsong){
      this.secondSongFeatures =  await this.songService.fetchFeatures(this.secondsong);
      this.secondSongDetails =  await this.songService.fetchSong(this.secondsong);
    }
    
   
  }

  async onSubmit(id, term){
    console.log('for submitted');
    console.log(term);
    let param :any;
    
    if(term=='first'){
      this.firstsong = id; 
      this.songFeatures =  await this.songService.fetchFeatures(id);
      this.songDetails =  await this.songService.fetchSong(id);
      let url = "compare?first="+id+"&&second="+this.secondsong;
      this.location.replaceState(url);
      
    }else{
      this.secondsong = id; 
      this.secondSongFeatures =  await this.songService.fetchFeatures(id);
      this.secondSongDetails =  await this.songService.fetchSong(id);
      let url = "compare?first="+this.firstsong+"&&second="+id;
      this.location.replaceState(url);
    }
    
    
  }



  saveCompare(){
    
      if ((this.firstsong+"&"+this.secondsong in localStorage) || (this.secondsong+"&"+this.firstsong in localStorage)) {
        this._snackBar.open("This comparison is already saved", "Error", {
          duration: 2000,
        });
      }else{
        let songsID :any = {
          "firstId" : this.firstsong,
          "secondId" : this.secondsong,
          "firstSong" : this.songDetails.name,
          "secondSong" : this.secondSongDetails.name,
  
        };
        
        localStorage.setItem(this.firstsong+"&"+this.secondsong,JSON.stringify(songsID));
        this._snackBar.open("Comparison saved successfully", "Saved", {
          duration: 2000,
        });

      }
      
     
  }

  
}
