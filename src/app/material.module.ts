import {NgModule} from '@angular/core'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';


@NgModule({
    imports: [MatToolbarModule,MatSidenavModule,MatIconModule,MatButtonModule,MatMenuModule,MatListModule],
    exports: [MatToolbarModule,MatSidenavModule,MatIconModule,MatButtonModule,MatMenuModule,MatListModule],
})

export class MaterialModule {}