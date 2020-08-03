import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from  './material.module'
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { SongComponent } from './song/song.component';
import { CompareComponent } from './compare/compare.component';
import { ComparisonlistComponent } from './comparisonlist/comparisonlist.component';
import { HttpErrorInterceptor } from './_helpers/http-error.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidenavComponent,
    SearchresultComponent,
    SongComponent,
    CompareComponent,
    ComparisonlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
