import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute, Params, Routes} from '@angular/router';
import {SongService} from '../song.service';
import { Song } from '../song';


@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  
  track: {id: string};
  songFeatures: Song;
  songDetails: Song;

  constructor(private activatedRoute: ActivatedRoute, private songService: SongService,private router: Router ) { }


  async ngOnInit(): Promise<void> {
      this.track = {
        id: this.activatedRoute.snapshot.params['id']
      };
      
      this.songFeatures =  await this.songService.fetchFeatures(this.track.id);
      
      console.log(this.songFeatures)
      this.songDetails =  await this.songService.fetchSong(this.track.id);
      console.log(this.songDetails)
      this.songDetails['duration'] = "";
      /*this.songDetails['duration'] = this.millisToMinutesAndSeconds(this.songFeatures['duration_ms']);*/
      
  }

   millisToMinutesAndSeconds(millis) {
    let ms = millis;
    ms = 1000*Math.round(ms/1000); // round to nearest second
    var d = new Date(ms);
    return d.getUTCMinutes() + ':' + d.getUTCSeconds(); // "4:59"
  }

  goToCompare(){
    
    let param = {"first":this.track.id}
    this.router.navigate(["compare"], {queryParams: param});
  }


}
