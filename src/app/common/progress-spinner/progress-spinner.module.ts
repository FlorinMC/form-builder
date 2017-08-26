// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { FormsSharedModule, GlobalSharedModule } from '../../shared';
import { ProgressSpinnerService } from '../../shared/services/progress-spinner.service';
import { ProgressSpinnerComponent } from './progress-spinner.component';

@NgModule({
    imports: [
        GlobalSharedModule,
        FormsSharedModule,
    ],
    declarations: [
        ProgressSpinnerComponent,
    ],
    exports: [
        ProgressSpinnerComponent,
    ],
    providers: [
        ProgressSpinnerService,
    ],
})
export class ProgressSpinnerModule {

}
