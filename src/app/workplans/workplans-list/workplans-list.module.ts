import { NgModule } from '@angular/core';
import { GlobalSharedModule } from '../../shared/modules/global.shared.module';
import { WorkplanModule } from '../workplan/workplan.module';
import { WorkplanListRoutingModule } from './workplans-list-routing.module';
import { WorkplansListComponent } from './workplans-list.component';
import { WorkplansListService } from './workplans-list.service';

@NgModule(
  {
    imports: [
      GlobalSharedModule,
      WorkplanListRoutingModule,
      WorkplanModule,
    ],
    exports: [
      WorkplansListComponent,
    ],
    declarations: [
      WorkplansListComponent,
    ],
    providers: [
      WorkplansListService,
    ],
  })

export class WorkplansListModule {
}
