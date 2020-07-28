import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() sideNavBarClose =  new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  sideNavClose(){
    this.sideNavBarClose.emit();

  }

}
