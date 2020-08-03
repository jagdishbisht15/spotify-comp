import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SongService} from '../_services/song.service';
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
      
      this.songDetails =  await this.songService.fetchSong(this.track.id);
      
  }

  goToCompare(){
    
    let param = {"first":this.track.id}
    
    this.router.navigate(["compare"], {queryParams: param});
  }


}
