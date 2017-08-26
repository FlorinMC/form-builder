import { NgModule } from '@angular/core';
import { GlobalSharedModule } from '../../shared';
import { MainContainerComponent } from './index';
import {
  CheckboxContainerComponent,
  CheckboxContainerModule,
  ImageContainerComponent,
  ImageContainerModule,
  TaskContainerComponent,
  TaskContainerPropertiesComponent,
  TaskContainerPropertiesModule,
  TextContainerComponent,
  TextContainerModule,
  ToolboxPanelModule,
  WorkplanContainerComponent,
  WorkplanContainerModule,
  WorkplanContainerPropertiesComponent,
  WorkplanContainerPropertiesModule,
} from './index';
import { MainContainerRoutingModule } from './main-container-routing.module';
import { MainContainerService } from './main-container.service';
import { PropertiesPanelModule } from './properties-panel';

import { TaskContainerModule } from './task-container/task-container.module';

@NgModule({
  imports: [
    GlobalSharedModule,
    CheckboxContainerModule,
    TextContainerModule,
    ImageContainerModule,
    PropertiesPanelModule,
    TaskContainerModule,
    TaskContainerPropertiesModule,
    WorkplanContainerModule,
    WorkplanContainerPropertiesModule,
    ToolboxPanelModule,
    MainContainerRoutingModule,
  ],
  exports: [
    MainContainerComponent,
  ],
  declarations: [
    MainContainerComponent,
  ],
  providers: [
    MainContainerService,
  ],
  entryComponents: [
    CheckboxContainerComponent,
    TextContainerComponent,
    ImageContainerComponent,
    TaskContainerComponent,
    TaskContainerPropertiesComponent,
    WorkplanContainerComponent,
    WorkplanContainerPropertiesComponent,
  ],
})
export class MainContainerModule { }
