import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ToolboxItem } from './';

@Injectable()
export class ToolboxPanelService {
    // Observable string source
    public items: BehaviorSubject<ToolboxItem[]> = new BehaviorSubject<ToolboxItem[]>([]);
    public toolbarContextItems: Observable<ToolboxItem[]> = this.items.asObservable();

    // tslint:disable-next-line:no-any
    public insertToolbarContextItems(toolboxItems: ToolboxItem[]): void {
        this.items.next(toolboxItems);
    }
}
