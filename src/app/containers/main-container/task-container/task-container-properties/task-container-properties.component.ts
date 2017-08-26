import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { WebApiService } from '../../../../shared/services';
import { Task } from '../task-container.model';
import { Tool } from './task-container-properties.model';
import { TaskContainerPropertiesService } from './task-container-properties.service';

@Component({
  selector: 'app-task-container-properties',
  templateUrl: 'task-container-properties.component.html',
  styleUrls: ['task-container-properties.component.scss'],
})
export class TaskContainerPropertiesComponent implements OnInit {
  public task: Task;
  public taskTools: Tool[] = [];

  constructor(
    private taskContainerPropertiesService: TaskContainerPropertiesService,
    private webApiService: WebApiService,
  ) {
  }

  public ngOnInit(): void {
    this.onTaskboxModelChanged();
  }

  public onInputChanged(event: Event): void {
    const name: string = event && (((event as MouseEvent).target) as HTMLTextAreaElement).value;
    this.task = { ...this.task, ...{ name } };
    this.taskContainerPropertiesService.insertTaskboxModel(this.task);

  }
  public onTextareaChanged(event: Event): void {
    const description: string = event && (((event as MouseEvent).target) as HTMLTextAreaElement).value;
    this.task = { ...this.task, ...{ description } };
    this.taskContainerPropertiesService.insertTaskboxModel(this.task);

  }

  private onTaskboxModelChanged(): void {
    this.taskContainerPropertiesService.taskboxContainerPropertiesModelData.subscribe(
      (model: Task) => {
        this.task = { ...this.task, ...model };

        this.getTaskTools(this.task);
      }, (err: Error) => {
        this.webApiService.checkErrorFault(err);
      });
  }

  private getTaskTools(task: Task): Tool[] {

    if (!task.tools || task.tools.length === 0) {
      return null;
    }
    return this.taskTools = task.tools.map((tool: Tool) => {
      return tool;
    });
  }

  public saveIt(): void {

    // tslint:disable:no-any
    const task: Observable<void | HttpResponse<any>>

      = Observable.fromPromise(this.webApiService.postService('http://localhost:3000/task', {
        'level': 0,
        'name': 'Clean insides of the laptop',
        'description': 'Inspect the insides of the laptop for dust and dirt and clean them up using vacuum cleaner and pressurized air.',
        'duration': '3m',
        'taskBlocks': [],
        'descriptionFiles': [],
        'tools': [{
          'quantity': 1,
          'toolId': '59672691473ffb0001ac4f6a',
          'id': 'asxsa',
        }, {
          'quantity': 1,
          'toolId': '59672691473ffb0001ac4f6b',
          'id': 'asxasxas',
        }],
        'spareParts': [{
          'quantity': 1,
          'sparePartId': '59672691473ffb0001ac4f6c',
          'id': 'xasxas',
        }, {
          'quantity': 2,
          'sparePartId': '52423432423491473ffb0001ac4f6c',
          'id': 'saxsax',
        }],
        'id': 'xasxas',
      }));
    task.subscribe(
      (result: any) => console.log('result after post: ', result),
      (error: Error) => {
        this.webApiService.checkErrorFault(error);
      });
  }
}
