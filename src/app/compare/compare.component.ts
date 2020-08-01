import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormBuilder, FormGroup , Validators , FormControl, NgForm } from '@angular/forms';
import {SearchService} from '../search.service';
import {Router, ActivatedRoute, Params, Routes} from '@angular/router';
import {SongService} from '../song.service';
import { Song } from '../song';
import {Location} from '@angular/common'; 
import {MatSnackBar} from '@angular/material/snack-bar';


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
  filteredOptions: Observable<string[]>;
  filteredOptionsSecond: Observable<string[]>;
  
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
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.filteredOptionsSecond = this.myControlSecond.valueChanges.pipe(
      startWith(''),
      map(value => this._secondfilter(value))
    );
    if(this.firstsong){
      this.songFeatures =  await this.songService.fetchFeatures(this.firstsong);
    
      this.songDetails =  await this.songService.fetchSong(this.firstsong);
    }
    
    /*this.songDetails['duration'] = "";*/
    if(this.secondsong){
      this.secondSongFeatures =  await this.songService.fetchFeatures(this.secondsong);
      this.secondSongDetails =  await this.songService.fetchSong(this.secondsong);

    }
    
    console.log(this.songFeatures );
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

  private _secondfilter(value: string): string[] {
      
    const searchTerm = value.toLowerCase();
    if (searchTerm) {
      this.searchService
        .searchSongs(searchTerm)
        .subscribe(
          (songs)=>{ 
            this.songlistSecond = songs.tracks.items;
          },
        );

        if(this.songlistSecond){
          return this.songlistSecond ;
        }
    }else{
      return null;
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


  millisToMinutesAndSeconds(millis) {
    let ms = millis;
    ms = 1000*Math.round(ms/1000); // round to nearest second
    var d = new Date(ms);
    return d.getUTCMinutes() + ':' + d.getUTCSeconds(); // "4:59"
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
