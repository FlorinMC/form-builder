import { NgModule } from '@angular/core';
import { GlobalSharedModule } from './../../shared/modules/global.shared.module';
import { NoContentComponent } from './no-content.component';

@NgModule(
    {
        imports: [
            GlobalSharedModule,
        ],
        exports: [
            NoContentComponent,
        ],
        declarations: [
            NoContentComponent,
        ],
        providers: [],
    })

export class NoContentModule {
}
