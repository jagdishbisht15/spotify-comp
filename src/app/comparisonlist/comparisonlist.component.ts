import { Component, OnInit,ViewChild } from '@angular/core';
import {ComparisonlistService} from '../_services/comparisonlist.service';

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-comparisonlist',
  templateUrl: './comparisonlist.component.html',
  styleUrls: ['./comparisonlist.component.css']
})
export class ComparisonlistComponent implements OnInit {
  songlist : string[];
  displayedColumns: any = ['firstId', 'firstSong', 'secondSong','secondId'];
  dataSource : any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
      
  
  constructor(private comparisonListService: ComparisonlistService) { }
  
   async ngOnInit(): Promise<void> {
    
    const data: any  = await this.comparisonListService.getSavedComparison();
    this.dataSource = new MatTableDataSource<any>(data);

    
    this.dataSource.paginator = this.paginator;
    
  }

}
