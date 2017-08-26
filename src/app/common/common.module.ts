import { NgModule } from '@angular/core';
import { ProgressBarModule } from './progress-bar/progress-bar.module';
import { ProgressSpinnerModule } from './progress-spinner/progress-spinner.module';

@NgModule(
    {
        imports: [
            ProgressBarModule,
            ProgressSpinnerModule,
        ],
        exports: [
            ProgressBarModule,
            ProgressSpinnerModule,
        ],
        declarations: [],
        providers: [],
    })

export class CommonModule {
}
