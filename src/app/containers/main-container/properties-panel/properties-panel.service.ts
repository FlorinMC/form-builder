import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PropertiesPanelService {
    // Observable string source
    public config: BehaviorSubject<{}> = new BehaviorSubject<{}>({});
    public checkboxConfig: Observable<{}> = this.config.asObservable();

    // tslint:disable-next-line:no-any
    public insertData(data: any): void {
        this.config.next(data);
    }
}
