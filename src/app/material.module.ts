import {NgModule} from '@angular/core'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
    imports: [MatToolbarModule,
            MatSidenavModule,
            MatIconModule,
            MatButtonModule,
            MatMenuModule,
            MatListModule,
            MatAutocompleteModule,
            MatInputModule,
            MatFormFieldModule
        ],
    exports: [MatToolbarModule,
            MatSidenavModule,
            MatIconModule,
            MatButtonModule,
            MatMenuModule,
            MatListModule,
            MatAutocompleteModule,
            MatInputModule,
            MatFormFieldModule
    ],
})

export class MaterialModule {}