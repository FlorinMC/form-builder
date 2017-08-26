import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkplanComponent } from './workplan.component';

const routes: Routes = [
  { path: '', component: WorkplanComponent, canActivate: [] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class WorkplanRoutingModule {
}
