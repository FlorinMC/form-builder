import { NgModule } from '@angular/core';
import { GlobalSharedModule } from '../../../../shared';
import { TaskContainerPropertiesComponent } from './task-container-properties.component';
import { TaskContainerPropertiesService } from './task-container-properties.service';

@NgModule({
    imports: [
        GlobalSharedModule,
    ],
    exports: [
        TaskContainerPropertiesComponent,
    ],
    declarations: [
        TaskContainerPropertiesComponent,
    ],
    providers: [
        TaskContainerPropertiesService,
    ],
})
export class TaskContainerPropertiesModule { }
