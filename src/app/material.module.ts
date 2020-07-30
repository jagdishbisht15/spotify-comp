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
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import {MatSliderModule} from '@angular/material/slider';
import {MatTooltipModule} from '@angular/material/tooltip';



@NgModule({
    imports: [MatToolbarModule,
            MatSidenavModule,
            MatIconModule,
            MatButtonModule,
            MatMenuModule,
            MatListModule,
            MatAutocompleteModule,
            MatInputModule,
            MatFormFieldModule,
            MatCardModule,
            MatDividerModule,
            MatProgressBarModule,
            MatTableModule,
            CdkTableModule,
            MatSliderModule,
            MatTooltipModule
        ],
    exports: [MatToolbarModule,
            MatSidenavModule,
            MatIconModule,
            MatButtonModule,
            MatMenuModule,
            MatListModule,
            MatAutocompleteModule,
            MatInputModule,
            MatFormFieldModule,
            MatCardModule,
            MatDividerModule,
            MatProgressBarModule,
            MatTableModule,
            CdkTableModule,
            MatSliderModule,
            MatTooltipModule
    ],
})

export class MaterialModule {}