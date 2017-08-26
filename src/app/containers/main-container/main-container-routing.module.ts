import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContainerComponent } from './main-container.component';

const routes: Routes = [
  { path: 'workplan/edit/:id', component: MainContainerComponent, canActivate: [] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class MainContainerRoutingModule {
}
