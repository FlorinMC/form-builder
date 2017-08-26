import { NgModule } from '@angular/core';
import { GlobalSharedModule } from '../../../../shared/index';
import { WorkplanContainerPropertiesComponent } from './workplan-container-properties.component';
import { WorkplanContainerPropertiesService } from './workplan-container-properties.service';

@NgModule({
    imports: [
        GlobalSharedModule,
    ],
    exports: [
        WorkplanContainerPropertiesComponent,
    ],
    declarations: [
        WorkplanContainerPropertiesComponent,
    ],
    providers: [
        WorkplanContainerPropertiesService,
    ],
})
export class WorkplanContainerPropertiesModule { }
