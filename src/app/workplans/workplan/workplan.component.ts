import { Component, ElementRef, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { MainContainerService } from '../../containers/main-container/main-container.service';
import { Task } from '../../containers/main-container/task-container/task-container.model';
import { Workplan } from './workplan.model';

@Component({
  selector: 'app-workplan',
  templateUrl: 'workplan.component.html',
  styleUrls: ['./workplan.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class WorkplanComponent implements OnInit {
  public isWorkPlanExpanded: boolean = false;
  public workplanTasks: Task[] = [];
  @Input() public workplan: Workplan;

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private mainContainerService: MainContainerService,
  ) { }

  public ngOnInit(): void {
    this.getWorkplanTasks(this.workplan);
  }

  public getWorkplanTasks(workplan: Workplan): void {
    if (!workplan || workplan.taskItems.length === 0) {
      return;
    }
    this.workplanTasks = workplan.taskItems.map((taskItem: Task) => {
      return taskItem;
    });
  }

  @HostListener('document:click', ['$event'])
  public onWorkplanClick(event: Event): void {
    this.isWorkPlanExpanded = (event && event.target) && (this.elementRef && this.elementRef.nativeElement.contains(event.target));
  }

  public onWorkplanButtonClick(workplan: Workplan): void {
    this.mainContainerService.insertWorkplanToEdit(workplan);
    console.log('workplan when clicked: ', workplan);
    const workplanId: string = workplan && workplan.id;
    this.router.navigate(['workplan', 'edit', workplanId]);
  }
}
