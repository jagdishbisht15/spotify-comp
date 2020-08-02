import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormBuilder, FormGroup , Validators , FormControl, NgForm } from '@angular/forms';
import {SearchService} from '../search.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {
  song: string;
  songlist: any;

  constructor(private searchService: SearchService, private router: Router, private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {

    this.activatedRoute.queryParams.subscribe(params => {
      this.song = params['q'];
      if(params['q']==''){
        this.router.navigate(["/"]);
      }
      
    });

    this.songlist =  await this.searchService.fetchData(this.song);
      
    console.log(this.songlist)
  }


  goToCompare(trackId){
    
    let param = {"first":trackId}
    
    this.router.navigate(["compare"], {queryParams: param});
  }

   

}
