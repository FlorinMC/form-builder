import { NgModule } from '@angular/core';
import { ContainersModule } from '../../containers/containers.module';
import { WorkplansListModule } from '../../workplans/workplans-list/workplans-list.module';
import { GlobalSharedModule } from './../../shared/modules/global.shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule(
  {
    imports: [
      GlobalSharedModule,
      HomeRoutingModule,
      ContainersModule,
      WorkplansListModule,
    ],
    declarations: [
      HomeComponent,
    ],
    providers: [
    ],
  })

export class HomeModule {
}
