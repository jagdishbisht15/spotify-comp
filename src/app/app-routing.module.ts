import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {SearchresultComponent} from './searchresult/searchresult.component';
import {SongComponent} from './song/song.component';
import {CompareComponent} from './compare/compare.component';
import {ComparisonlistComponent} from './comparisonlist/comparisonlist.component';

 
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search-result', component: SearchresultComponent},
  {path: 'song/:id', component: SongComponent},
  {path: 'compare', component: CompareComponent},
  {path: 'mycomparison', component: ComparisonlistComponent}

]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
