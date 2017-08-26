import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import { Task } from '../task-container.model';

@Injectable()
export class TaskContainerPropertiesService {
  public taskboxContainerPropertiesModel: BehaviorSubject<Task> = new BehaviorSubject<Task>(null);
  public taskboxContainerPropertiesModelData: Observable<Task> = this.taskboxContainerPropertiesModel.asObservable();
  public insertTaskboxModel(model: Task): void {
    this.taskboxContainerPropertiesModel.next(model);
  }
}
