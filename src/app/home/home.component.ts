import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment'
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormBuilder, FormGroup , Validators , FormControl,NgForm } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One','Two','Three'];
  filteredOptions: Observable<string[]>;


  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit(form: NgForm){
    /*console.log(form)*/

  }

}
