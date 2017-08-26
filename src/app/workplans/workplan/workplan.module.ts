import { NgModule } from '@angular/core';
import { GlobalSharedModule } from '../../shared/modules/global.shared.module';
import { WorkplanRoutingModule } from './workplan-routing.module';
import { WorkplanComponent } from './workplan.component';

@NgModule(
  {
    imports: [
      GlobalSharedModule,
      WorkplanRoutingModule,
    ],
    exports: [
      WorkplanComponent,
    ],
    declarations: [
      WorkplanComponent,
    ],
    providers: [
    ],
  })

export class WorkplanModule {
}
