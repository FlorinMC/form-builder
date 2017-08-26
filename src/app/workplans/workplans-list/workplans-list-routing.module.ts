import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkplansListComponent } from './workplans-list.component';

const routes: Routes = [
  { path: '', component: WorkplansListComponent, canActivate: [] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class WorkplanListRoutingModule {
}
