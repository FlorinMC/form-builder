import { NgModule } from '@angular/core';
import { GlobalSharedModule } from '../../../shared/index';
import { TaskService } from './shared/task.service';
import { TaskContainerComponent } from './task-container.component';
import { TaskContainerService } from './task-container.service';

@NgModule({
    imports: [
        GlobalSharedModule,
    ],
    exports: [
        TaskContainerComponent,
    ],
    declarations: [
        TaskContainerComponent,
    ],
    providers: [
        TaskContainerService,
        TaskService,
    ],
})
export class TaskContainerModule { }
