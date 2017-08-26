import { NgModule } from '@angular/core';
import { GlobalSharedModule } from '../../../shared/index';
import { WorkplanContainerComponent } from './workplan-container.component';
import { WorkplanContainerService } from './workplan-container.service';

@NgModule({
    imports: [
        GlobalSharedModule,
    ],
    exports: [
        WorkplanContainerComponent,
    ],
    declarations: [
        WorkplanContainerComponent,
    ],
    providers: [
        WorkplanContainerService,
    ],
})
export class WorkplanContainerModule { }
