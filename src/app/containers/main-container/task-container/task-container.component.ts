import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, HostListener, Inject, Input, OnInit } from '@angular/core';
import { DragDropData } from 'ng2-dnd';
import { Observable } from 'rxjs/Rx';
import { WebApiService } from '../../../shared/services';
import {
  CheckboxContainerComponent,
  ChildContainerModel,
  ImageContainerComponent,
  TextContainerComponent,
} from '../child-containers';
import { TextContainerService } from '../child-containers/text-container/text-container.service';
import { MainContainerModel } from '../main-container.model';
import { MainContainerService } from '../main-container.service';
import { ToolboxItem, Widget, WidgetsIcons, WidgetsNames } from '../toolbox-panel/toolbox-panel.model';
import { ToolboxPanelService } from '../toolbox-panel/toolbox-panel.service';
import { WorkplanContainerService } from '../workplan-container';
import { TaskWidgetsTypes } from './task-blocks-types.interface';
// import { TaskContainerPropertiesService } from './task-container-properties';
import { Task } from './task-container.model';
import { TaskContainerService } from './task-container.service';

@Component({
  selector: 'app-task-container',
  templateUrl: 'task-container.component.html',
  styleUrls: ['task-container.component.scss'],
})
export class TaskContainerComponent implements OnInit {
  // tslint:disable:no-any
  public taskDroppedHtmlBoxes: Widget[] = [];
  public childContainerModel: ChildContainerModel = new ChildContainerModel();
  public isMdCardSelected: boolean = false;
  public task: Task;
  public isAllTaskDropzone: boolean = false;

  @Input() public currentTask: Task;

  constructor(
    @Inject(MainContainerService) public mainContainerService: MainContainerService,
    private taskContainerService: TaskContainerService,
    private workplanContainerService: WorkplanContainerService,
    // private taskContainerPropertiesService: TaskContainerPropertiesService,
    private textContainerService: TextContainerService,
    private elementRef: ElementRef,
    private webApiService: WebApiService,
    private toolboxPanelService: ToolboxPanelService,
  ) { }

  public ngOnInit(): void {
    this.getTaskBoxItem();
    this.onWorkplanContainerEventEmit();
    this.setCurrentTaskBlocks();
  }
  private setCurrentTaskBlocks(): void {
    if (this.currentTask && this.currentTask.taskBlocks && this.currentTask.taskBlocks.length > 0) {
      this.toolboxPanelService.insertToolbarContextItems(this.currentTask.taskBlocks);
      console.log('this.currentTask: ', this.currentTask);
      console.log('this.currentTask.taskBlocks: ', this.currentTask.taskBlocks);

      this.currentTask.taskBlocks.forEach((currentTaskBlock: ToolboxItem) => {
        this.insertCurrentTaskBlocksItems(currentTaskBlock);
      });
    }
  }
  private insertCurrentTaskBlocksItems(taskBlock: ToolboxItem): void {
    if (!taskBlock) {
      return;
    }
    let currentTaskBlock: Widget = { id: taskBlock.id };
    switch (taskBlock.type) {
      case TaskWidgetsTypes.Text:
        currentTaskBlock = {
          ...currentTaskBlock,
          ... {
            icon: WidgetsIcons.Text,
            title: WidgetsNames.Text,
          },
        };
        this.taskDroppedHtmlBoxes = [...this.taskDroppedHtmlBoxes, currentTaskBlock];
        break;
      case TaskWidgetsTypes.Checkbox:
        currentTaskBlock = {
          ...currentTaskBlock,
          ... {
            icon: WidgetsIcons.Checkbox,
            title: WidgetsNames.Checkbox,
          },
        };
        this.taskDroppedHtmlBoxes = [...this.taskDroppedHtmlBoxes, currentTaskBlock];
        break;
      case TaskWidgetsTypes.Picture:
        currentTaskBlock = {
          ...currentTaskBlock,
          ... {
            icon: WidgetsIcons.Picture,
            title: WidgetsNames.Picture,
          },
        };
        this.taskDroppedHtmlBoxes = [...this.taskDroppedHtmlBoxes, currentTaskBlock];
        break;
      default:
        break;
    }
  }
  public onDropSuccess(event: DragDropData): void {
    if (!event && !event.dragData) {
      return;
    }
    const title: string = event.dragData;
    const widget: Widget = { title };
    this.getWidgetWithIcon(widget);
    this.isAllTaskDropzone = this.taskDroppedHtmlBoxes.length > 0;
    this.insertCurrentToolBoxItem(widget);
    console.log('widget on drop: ', widget);
    this.taskContainerService.insertCurrentTask(this.currentTask);
  }

  private getWidgetWithIcon(widget: Widget): Widget[] {
    if (widget.title === WidgetsNames.Text) {
      return this.taskDroppedHtmlBoxes = [
        ...this.taskDroppedHtmlBoxes,
        ...[{ ...widget, ...{ icon: WidgetsIcons.Text } }]];
    }
    if (widget.title === WidgetsNames.Checkbox) {
      return this.taskDroppedHtmlBoxes = [
        ...this.taskDroppedHtmlBoxes,
        ...[{ ...widget, ...{ icon: WidgetsIcons.Checkbox } }]];

    }
    if (widget.title === WidgetsNames.Picture) {
      return this.taskDroppedHtmlBoxes = [
        ...this.taskDroppedHtmlBoxes,
        ...[{ ...widget, ...{ icon: WidgetsIcons.Picture } }]];

    }
    return this.taskDroppedHtmlBoxes = [
      ...this.taskDroppedHtmlBoxes,
      ...[{ ...widget, ...{ icon: WidgetsIcons.Default } }]];
  }

  private async getTaskBoxItem(): Promise<void> {
    const toolbar: Observable<HttpResponse<MainContainerModel>>
      = Observable.fromPromise(this.mainContainerService.getToolbarContextModel());
    toolbar.subscribe(async (resp: HttpResponse<MainContainerModel>) => {
      const response: HttpResponse<MainContainerModel> = await resp;
      this.task = response && response.body && response.body.task;
    }, (err: Error) => {
      this.webApiService.checkErrorFault(err);
    });
  }
  public insertCurrentToolBoxItem(widget: Widget, event?: Event): void {

    console.log('item: ', widget);
    if (!widget) {
      return;
    }
    if (event && (event as MouseEvent)) {
      event.stopPropagation();
    }
    this.taskContainerService.insertCurrentTask(this.currentTask);
    this.taskContainerService.insertDropData(true);
    switch (widget.title) {
      case this.childContainerModel.textarea:
        this.mainContainerService.addDynamicComponent(TextContainerComponent);
        console.log('this.currentTask on click: ', this.currentTask);
        this.textContainerService.insertClickedTaskBlock(widget);
        break;
      case this.childContainerModel.checkbox:
        this.mainContainerService.addDynamicComponent(CheckboxContainerComponent);
        break;
      case this.childContainerModel.image:
        this.mainContainerService.addDynamicComponent(ImageContainerComponent);
        break;
      default:
        break;
    }
  }

  @HostListener('document:click', ['$event'])
  public onTaskboxClick(event: Event): void {
    if (document.activeElement.classList[0] !== 'TaskContainer') {
      return;
    }
    if ((event && event.target) &&
      (this.elementRef && this.elementRef.nativeElement.contains(event.target))) {
      this.isMdCardSelected = true;
      this.taskContainerService.insertClickData(true);
      if (this.currentTask) {
        this.task = this.currentTask;
      }
      // this.taskContainerPropertiesService.insertTaskboxModel(this.task);

    } else {
      this.isMdCardSelected = false;
    }
  }

  private onWorkplanContainerEventEmit(): void {
    this.workplanContainerService.isClickedEvent.subscribe(
      (isClickEvent: boolean) => {
        if (isClickEvent) {
          this.isMdCardSelected = false;
        }
      });
  }
}
