import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WorkplanContainerService {
    public clickedEvent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isClickedEvent: Observable<boolean> = this.clickedEvent.asObservable();

    public insertClickData(data: boolean): void {
        this.clickedEvent.next(data);
    }
}
