import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Task } from './task-container.model';

@Injectable()
export class TaskContainerService {
  public droppedEvent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isDroppedEvent: Observable<boolean> = this.droppedEvent.asObservable();
  public clickedEvent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isClickedEvent: Observable<boolean> = this.clickedEvent.asObservable();

  public task: BehaviorSubject<Task> = new BehaviorSubject<Task>(null);
  public currentTask: Observable<Task> = this.task.asObservable();

  public insertDropData(data: boolean): void {
    this.droppedEvent.next(data);
  }
  public insertClickData(data: boolean): void {
    this.clickedEvent.next(data);
  }

  public insertCurrentTask(currentTask: Task): void {
    this.task.next(currentTask);
  }
}
