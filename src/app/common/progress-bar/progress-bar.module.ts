import { NgModule } from '@angular/core';
import { FormsSharedModule, GlobalSharedModule } from '../../shared';
import { ProgressBarService } from '../../shared/services';
import { ProgressBarComponent } from './progress-bar.component';

@NgModule({
    imports: [
        GlobalSharedModule,
        FormsSharedModule,
    ],
    declarations: [
        ProgressBarComponent,
    ],
    exports: [
        ProgressBarComponent,
    ],
    providers: [
        ProgressBarService,
    ],
})
export class ProgressBarModule {

}
