import { Component, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DragDropData } from 'ng2-dnd';
import { WebApiService } from '../../shared/services';
import { Workplan } from '../../workplans/workplan/workplan.model';
import { Task } from '../main-container/task-container/task-container.model';
import { MainContainerService } from './main-container.service';
import { TaskContainerComponent, TaskContainerPropertiesComponent, TaskContainerService } from './task-container';
import { WidgetsNames } from './toolbox-panel/toolbox-panel.model';
import { WorkplanContainerPropertiesComponent, WorkplanContainerService } from './workplan-container';
import { WorkplanContainerPropertiesService } from './workplan-container/workplan-container-properties';

@Component({
  selector: 'app-main-container',
  templateUrl: 'main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
})

export class MainContainerComponent implements OnInit {
  // tslint:disable:no-any
  public droppedTaskBoxes: string[] = [];
  public isNewWorkplanTemplate: boolean = true;
  @ViewChild('dynamicTaskbarComponent', { read: ViewContainerRef }) public dynamicTaskbarComponent: ViewContainerRef;
  @ViewChild('dynamicPropertiesComponent', { read: ViewContainerRef }) public dynamicPropertiesComponent: ViewContainerRef;

  constructor(
    @Inject(MainContainerService) public mainContainerService: MainContainerService,
    private taskContainerService: TaskContainerService,
    private workplanContainerService: WorkplanContainerService,
    private activatedRoute: ActivatedRoute,
    private webApiService: WebApiService,
    private workplanContainerPropertiesService: WorkplanContainerPropertiesService,

  ) { }

  public ngOnInit(): void {
    this.onTaskboxEventEmit();
    this.onWorkplanContainerEventEmit();
    this.insertWorkplanPropertiesPanel(false);
    this.getWorkplanTemplateToEdit();
    this.getWorkplanById();
  }

  private getWorkplanTemplateToEdit(): void {
    this.mainContainerService.workplanToEdit.subscribe(async (workplan: Workplan) => {
      const workplanToEdit: Workplan = await workplan;

      this.isNewWorkplanTemplate = workplanToEdit ? false : true;
      if (workplanToEdit && workplanToEdit.taskItems.length > 0) {
        this.workplanContainerPropertiesService.insertInputData(workplanToEdit.name);
        this.workplanContainerPropertiesService.insertTextareaData(workplanToEdit.description);

        workplanToEdit.taskItems.forEach((taskItem: Task): void => {
          this.insertBoxConfigPanel(WidgetsNames.Task, taskItem);

        });
      }
    }, (err: Error) => {
      this.webApiService.checkErrorFault(err);
    });
  }

  private getWorkplanById(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log('params: ', params);
    });
  }

  private onWorkplanContainerEventEmit(): void {
    this.workplanContainerService.isClickedEvent.subscribe(
      (isClickEvent: boolean) => {
        if (isClickEvent) {
          this.insertWorkplanPropertiesPanel(true);
        }
      });
  }

  private onTaskboxEventEmit(): void {
    this.taskContainerService.isDroppedEvent.subscribe(
      (isDropEvent: boolean) => {
        if (isDropEvent) {
          this.initialSetupOfDynamicPropertiesComponentPanel();
          this.removePreviousPropertiesPanelComponent();
        }
      });

    this.taskContainerService.isClickedEvent.subscribe(
      (isClickEvent: boolean) => {
        if (isClickEvent) {
          this.insertTaskboxPropertiesPanel(true);
        }
      });
  }

  private initialSetupOfDynamicPropertiesComponentPanel(): void {
    this.mainContainerService.setRootViewContainerRef(this.dynamicPropertiesComponent);
  }

  private removePreviousPropertiesPanelComponent(): void {
    this.mainContainerService.removePreviousComponent();
  }

  private insertTaskboxPropertiesPanel(isTaskboxClicked: boolean = true): void {

    this.initialSetupOfDynamicPropertiesComponentPanel();
    if (isTaskboxClicked) {
      this.removePreviousPropertiesPanelComponent();
    }
    this.mainContainerService.addDynamicComponent(TaskContainerPropertiesComponent);
  }

  private insertWorkplanPropertiesPanel(isWorkplanBoxClicked: boolean = true): void {

    this.initialSetupOfDynamicPropertiesComponentPanel();
    if (isWorkplanBoxClicked) {
      this.removePreviousPropertiesPanelComponent();
    }
    this.mainContainerService.addDynamicComponent(WorkplanContainerPropertiesComponent);
  }

  public onDropSuccess($event: DragDropData): void {
    if (!$event && !$event.dragData) {
      return;
    }
    this.droppedTaskBoxes = [...this.droppedTaskBoxes, ...[$event.dragData]];
    this.insertBoxConfigPanel($event.dragData);
  }
  private insertBoxConfigPanel(displayBoxName: string, taskItem?: Task): void {
    if (!displayBoxName || displayBoxName !== WidgetsNames.Task) {
      return;
    }
    this.mainContainerService.setRootViewContainerRef(this.dynamicTaskbarComponent);
    this.mainContainerService.addDynamicComponent(TaskContainerComponent, taskItem);
    if (!taskItem) {
      this.insertTaskboxPropertiesPanel(true);
    }
  }
}
