import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { TaskWidgetsTypes } from '../../task-container/task-blocks-types.interface';
import { Task } from '../../task-container/task-container.model';
import { TaskContainerService } from '../../task-container/task-container.service';
import { ToolboxItem } from '../../toolbox-panel/toolbox-panel.model';
import { ToolboxPanelService } from '../../toolbox-panel/toolbox-panel.service';
import { ChildContainerModel } from '../child-container.model';
import { TextToolBoxItem } from './text-container.model';
import { TextContainerService } from './text-container.service';

@Component({
  selector: 'app-text-container',
  templateUrl: 'text-container.component.html',
  styleUrls: ['text-container.component.scss'],
})
export class TextContainerComponent implements OnInit {
  public isInitialized: boolean = false;
  public childContainerModel: ChildContainerModel = new ChildContainerModel();
  public textModel: TextToolBoxItem;
  public currentTask: Task;
  private toolbarContextItem: ToolboxItem;

  private currentTaskBlock: TextToolBoxItem;

  constructor(
    private toolboxPanelService: ToolboxPanelService,
    private textContainerService: TextContainerService,
    private taskContainerService: TaskContainerService,
    // private elementRef: ElementRef,
  ) { }

  public ngOnInit(): void {
    // const containersList: NodeListOf<HTMLElement> = this.elementRef.nativeElement.querySelectorAll('.container');
    // Array.from(containersList).forEach((container: HTMLElement) => {
    //   container.remove();
    // });
    this.setDesignerProperties();
    this.getCurrentTask();
    // this.onTextModelChange();
    this.textContainerService.clickedTaskBlock.subscribe(async (clickedTaskBlock: TextToolBoxItem) => {
      const currentTaskBlock: TextToolBoxItem = await clickedTaskBlock;
      if (currentTaskBlock) {
        this.currentTaskBlock = currentTaskBlock;
        console.log('this.currentTaskBlock on init: ', this.currentTaskBlock);
      }
    }, (error: Error) => {
      Observable.throw(new Error(`Timeout or error ${error}`));
    });

  }
  private getCurrentTask(): void {

    this.taskContainerService.currentTask.subscribe(async (currentTask: Task) => {
      const task: Task = await currentTask;
      if (task) {
        console.log('task on recived: ', task);
        this.currentTask = task;
        if (this.currentTask && this.currentTask.taskBlocks.length > 0) {

          this.toolboxPanelService.insertToolbarContextItems(this.currentTask.taskBlocks);
          console.log('this.currentTask.taskBlocks after getting current task in text: ', this.currentTask.taskBlocks);
        }
      }
    }, (error: Error) => {
      Observable.throw(new Error(`Timeout or error ${error}`));
    });
  }

  public setDesignerProperties(): void {
    this.toolboxPanelService.toolbarContextItems.subscribe(async (toolbarContextItems: ToolboxItem[]) => {
      const toolbarItems: ToolboxItem[] = await toolbarContextItems;
      if (toolbarItems) {
        const toolbarContextItem: ToolboxItem = this.getTextboxDesignerProperties(toolbarItems);
        if (toolbarContextItem) {
          console.log('toolbarContextItem aicia`: ', toolbarContextItem);
          this.toolbarContextItem = toolbarContextItem;
          TextContainerService.insertTextboxModel(this.toolbarContextItem);
          console.log('this.toolbarContextItem: ', this.toolbarContextItem);
          if (this.toolbarContextItem.designerProperties.length > 0) {
            this.textContainerService.insertDesignerProperties(this.toolbarContextItem.designerProperties);
            console.log('this.toolbarContextItem.designerProperties: ', this.toolbarContextItem.designerProperties);
          }
        }
      }
    }, (error: Error) => {
      Observable.throw(new Error(`Timeout or error ${error}`));
    });
  }

  private getTextboxDesignerProperties(toolbarContextItems: ToolboxItem[]): ToolboxItem {
    return toolbarContextItems.find((toolbarContextItem: ToolboxItem) => {
      return toolbarContextItem.displayName === this.childContainerModel.textarea ||
        toolbarContextItem.type === TaskWidgetsTypes.Text;
    });
  }

}
